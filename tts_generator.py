#!/usr/bin/env python3
"""
Shardborne: Tabletop Simulator Save File Generator
===================================================
Reads game data from JS files and generates a TTS-compatible JSON save file
with unit tokens, card decks, dice, counters, game board, and Lua scripting.

Usage:
    python tts_generator.py

Output:
    Shardborne.json  (copy to %USERPROFILE%\\Documents\\My Games\\Tabletop Simulator\\Saves\\)
"""

import json
import re
import os
import uuid
import math
import hashlib

# ─── Configuration ──────────────────────────────────────────────────────────────

GITHUB_RAW = "https://raw.githubusercontent.com/JetRobertsBCCA/Wargame/main"
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
MAPS_DIR = os.path.join(DATA_DIR, "factions", "Images", "Maps")
TEMPLATES_DIR = os.path.join(MAPS_DIR, "Templates")

# Faction image folder mapping
FACTION_IMAGE_DIRS = {
    "emberclaw-warpack": "Emberclaw",
    "iron-dominion": "IronDominion",
    "nightfang-dominion": "NightFang",
    "thornweft-matriarchy": "Thornweft",
    "veilbound-shogunate": "veilboundShogunate",
}

# Faction color mapping (RGB 0-1 for TTS)
FACTION_COLORS = {
    "emberclaw-warpack":     {"r": 1.0,  "g": 0.42, "b": 0.21},  # #ff6b35
    "iron-dominion":         {"r": 0.55, "g": 0.55, "b": 0.60},  # #8c8c99
    "nightfang-dominion":    {"r": 0.38, "g": 0.15, "b": 0.60},  # #612699
    "thornweft-matriarchy":  {"r": 0.18, "g": 0.65, "b": 0.32},  # #2ea652
    "veilbound-shogunate":   {"r": 0.80, "g": 0.20, "b": 0.20},  # #cc3333
}

# Faction display names
FACTION_NAMES = {
    "emberclaw-warpack": "Emberclaw Warpack",
    "iron-dominion": "Iron Dominion",
    "nightfang-dominion": "Nightfang Dominion",
    "thornweft-matriarchy": "Thornweft Matriarchy",
    "veilbound-shogunate": "Veilbound Shogunate",
}

# Card type colors (RGB 0-1)
CARD_TYPE_COLORS = {
    "command":  {"r": 0.2, "g": 0.7, "b": 0.2},  # Green
    "tech":     {"r": 0.2, "g": 0.4, "b": 0.8},  # Blue
    "fragment": {"r": 0.6, "g": 0.2, "b": 0.8},  # Purple
    "tactical": {"r": 0.9, "g": 0.5, "b": 0.1},  # Orange
}

# ─── GUID Generator ─────────────────────────────────────────────────────────────

_guid_counter = 0

def make_guid():
    """Generate a 6-char hex GUID for TTS objects."""
    global _guid_counter
    _guid_counter += 1
    return hashlib.md5(f"shardborne_{_guid_counter}".encode()).hexdigest()[:6]

# ─── JS Data Parser ─────────────────────────────────────────────────────────────

def read_js_file(path):
    """Read a JS file and return its content."""
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def extract_js_objects(text, pattern):
    """
    Extract JS object literals from array push calls.
    Handles two patterns:
      1. gameData.X.push({...}, {...}, ...)
      2. const X = [{...}, {...}, ...]; X.forEach(x => gameData.X.push(x))
    Returns a list of dictionaries.
    """
    results = []
    
    def extract_objects_from_block(block_content):
        """Extract top-level objects from a block of JS code."""
        found = []
        obj_depth = 0
        obj_start = None
        in_string = False
        string_char = None
        
        for j, ch in enumerate(block_content):
            # Track strings to avoid counting braces inside strings
            if not in_string:
                if ch in ('"', "'") and (j == 0 or block_content[j-1] != '\\'):
                    in_string = True
                    string_char = ch
                elif ch == '{' and obj_depth == 0:
                    obj_start = j
                    obj_depth = 1
                elif ch == '{':
                    obj_depth += 1
                elif ch == '}':
                    obj_depth -= 1
                    if obj_depth == 0 and obj_start is not None:
                        obj_str = block_content[obj_start:j+1]
                        try:
                            obj = parse_js_object(obj_str)
                            found.append(obj)
                        except Exception as e:
                            name_match = re.search(r'name:\s*["\']([^"\']+)["\']', obj_str)
                            if name_match:
                                print(f"  Warning: Could not fully parse '{name_match.group(1)}': {e}")
                        obj_start = None
            else:
                if ch == string_char and (j == 0 or block_content[j-1] != '\\'):
                    in_string = False
        return found
    
    # Pattern 1: gameData.X.push({...}, {...}, ...)
    push_pattern = rf"gameData\.{pattern}\.push\("
    for push_match in re.finditer(push_pattern, text):
        start = push_match.end()
        depth = 1
        i = start
        while i < len(text) and depth > 0:
            if text[i] == '(':
                depth += 1
            elif text[i] == ')':
                depth -= 1
            i += 1
        push_content = text[start:i-1]
        results.extend(extract_objects_from_block(push_content))
    
    # Pattern 2: const X = [{...}, {...}, ...];
    const_pattern = rf"const\s+{pattern}\s*=\s*\["
    for const_match in re.finditer(const_pattern, text):
        start = const_match.end()
        depth = 1
        i = start
        while i < len(text) and depth > 0:
            if text[i] == '[':
                depth += 1
            elif text[i] == ']':
                depth -= 1
            i += 1
        array_content = text[start:i-1]
        results.extend(extract_objects_from_block(array_content))
    
    return results

def parse_js_object(js_str):
    """
    Convert a JS object literal to a Python dict.
    Handles single quotes, unquoted keys, trailing commas, template literals, etc.
    """
    s = js_str.strip()
    
    # Remove single-line comments
    s = re.sub(r'//.*$', '', s, flags=re.MULTILINE)
    
    # Remove multi-line comments
    s = re.sub(r'/\*.*?\*/', '', s, flags=re.DOTALL)
    
    # Replace single quotes with double quotes (being careful with apostrophes in text)
    # First, handle strings: find all quoted strings and standardize
    result = []
    i = 0
    in_string = False
    string_char = None
    
    while i < len(s):
        ch = s[i]
        if not in_string:
            if ch in ('"', "'"):
                in_string = True
                string_char = ch
                result.append('"')
            else:
                result.append(ch)
        else:
            if ch == '\\' and i + 1 < len(s):
                next_ch = s[i+1]
                if string_char == "'" and next_ch == "'":
                    result.append("'")
                    i += 2
                    continue
                elif next_ch == '"' and string_char == '"':
                    result.append('\\"')
                    i += 2
                    continue
                else:
                    result.append(ch)
                    result.append(next_ch)
                    i += 2
                    continue
            elif ch == string_char:
                in_string = False
                result.append('"')
            elif ch == '"' and string_char == "'":
                # A double quote inside single-quoted string needs escaping
                result.append('\\"')
            else:
                result.append(ch)
        i += 1
    
    s = ''.join(result)
    
    # Quote unquoted keys: word characters before colons  
    s = re.sub(r'(?<=[{,\n])\s*(\w+)\s*:', r'"\1":', s)
    
    # Remove trailing commas before } or ]
    s = re.sub(r',\s*([}\]])', r'\1', s)
    
    # Handle special JS values
    s = s.replace('undefined', 'null')
    s = s.replace('Infinity', '999999')
    
    try:
        return json.loads(s)
    except json.JSONDecodeError:
        # More aggressive cleanup attempt
        # Fix any remaining issues with escaped quotes
        s = re.sub(r'(?<!\\)"(?=[^:,\[\]{}\s])', '\\"', s)
        return json.loads(s)


def extract_card_library(text):
    """Extract the card_library object from core.js."""
    cards = {}
    # Find card_library: {
    match = re.search(r'card_library:\s*\{', text)
    if not match:
        return cards
    
    start = match.end()
    # Find matching closing brace
    depth = 1
    i = start
    while i < len(text) and depth > 0:
        if text[i] == '{':
            depth += 1
        elif text[i] == '}':
            depth -= 1
        i += 1
    
    library_str = text[start:i-1]
    
    # Extract individual cards: "Card Name": { ... }
    card_pattern = r'"([^"]+)":\s*\{'
    for card_match in re.finditer(card_pattern, library_str):
        card_name = card_match.group(1)
        card_start = card_match.end()
        
        # Find closing brace
        d = 1
        j = card_start
        while j < len(library_str) and d > 0:
            if library_str[j] == '{':
                d += 1
            elif library_str[j] == '}':
                d -= 1
            j += 1
        
        card_obj_str = '{' + library_str[card_start:j] 
        try:
            card_data = parse_js_object(card_obj_str)
            cards[card_name] = card_data
        except:
            # Fallback: extract type and effect with regex
            type_m = re.search(r'type:\s*["\'](\w+)["\']', library_str[card_start:j])
            cp_m = re.search(r'cp:\s*(\d+)', library_str[card_start:j])
            effect_m = re.search(r'effect:\s*["\'](.+?)["\']', library_str[card_start:j], re.DOTALL)
            if type_m:
                cards[card_name] = {
                    "type": type_m.group(1),
                    "cp": int(cp_m.group(1)) if cp_m else 0,
                    "effect": effect_m.group(1) if effect_m else "",
                }
    
    return cards


# ─── Image URL Builder ───────────────────────────────────────────────────────────

def get_image_url(faction_id, unit_name):
    """Build raw GitHub URL for a unit image. Returns URL or placeholder."""
    folder = FACTION_IMAGE_DIRS.get(faction_id, "")
    if not folder:
        return get_placeholder_image(faction_id)
    
    # Check if image exists locally
    filename = f"{unit_name}.webp"
    local_path = os.path.join(DATA_DIR, "factions", "Images", folder, filename)
    
    if os.path.exists(local_path):
        encoded = filename.replace(" ", "%20")
        return f"{GITHUB_RAW}/data/factions/Images/{folder}/{encoded}"
    
    return get_placeholder_image(faction_id)


def get_faction_logo_url(faction_id):
    """Get faction logo URL."""
    folder = FACTION_IMAGE_DIRS.get(faction_id, "")
    local_path = os.path.join(DATA_DIR, "factions", "Images", folder, "FactionLogo.webp")
    if os.path.exists(local_path):
        return f"{GITHUB_RAW}/data/factions/Images/{folder}/FactionLogo.webp"
    return get_placeholder_image(faction_id)


def get_placeholder_image(faction_id):
    """Return a solid color placeholder URL via placeholder services."""
    colors = {
        "emberclaw-warpack": "ff6b35",
        "iron-dominion": "8c8c99",
        "nightfang-dominion": "612699",
        "thornweft-matriarchy": "2ea652",
        "veilbound-shogunate": "cc3333",
    }
    color = colors.get(faction_id, "666666")
    return f"https://placehold.co/256x256/{color}/white?text={faction_id.split('-')[0].title()}"


# ─── TTS Object Builders ────────────────────────────────────────────────────────

def make_transform(x=0, y=1.5, z=0, rot_y=0, scale=1.0):
    """Create a TTS Transform dict."""
    return {
        "posX": round(x, 4),
        "posY": round(y, 4),
        "posZ": round(z, 4),
        "rotX": 0, "rotY": round(rot_y, 4), "rotZ": 0,
        "scaleX": round(scale, 4),
        "scaleY": round(scale, 4),
        "scaleZ": round(scale, 4),
    }


def make_unit_token(unit, x=0, y=1.5, z=0, is_commander=False):
    """
    Create a Figurine_Custom or Custom_Token for a unit.
    Commanders get Figurine_Custom (stands upright), units get Custom_Token (flat).
    """
    faction_id = unit.get("faction", "")
    name = unit.get("name", "Unknown")
    stats = unit.get("stats", unit.get("battle_stats", {}))
    
    # Build stat block description
    stat_line = " | ".join([
        f"ATK:{stats.get('ATK', 0)}",
        f"DEF:{stats.get('DEF', 0)}",
        f"HP:{stats.get('HP', 0)}",
        f"MOV:{stats.get('MOV', 0)}",
        f"RNG:{stats.get('RNG', 0)}",
        f"MOR:{stats.get('MOR', 0)}",
    ])
    
    specials = unit.get("special", [])
    special_str = "\n".join([f"• {s}" for s in specials]) if specials else ""
    
    pts = unit.get("points_cost", 0)
    role = unit.get("role", unit.get("title", ""))
    unit_type = unit.get("type", "Commander" if is_commander else "")
    
    description = f"[b]{name}[/b]\n"
    description += f"Type: {unit_type} | Role: {role}\n"
    description += f"Points: {pts}\n"
    description += f"─────────────────\n"
    description += f"{stat_line}\n"
    if special_str:
        description += f"─────────────────\n"
        description += f"{special_str}\n"
    
    flavor = unit.get("flavor_text", "")
    if flavor:
        description += f"\n[i]{flavor}[/i]"
    
    image_url = get_image_url(faction_id, name)
    color = FACTION_COLORS.get(faction_id, {"r": 0.5, "g": 0.5, "b": 0.5})
    
    # Commander skill tree in GM Notes
    gm_notes = ""
    if is_commander:
        skill_tree = unit.get("skill_tree", {})
        if skill_tree:
            gm_notes = f"=== SKILL TREE: {name} ===\n\n"
            for level, paths in sorted(skill_tree.items(), key=lambda x: x[0]):
                gm_notes += f"{level.upper()}:\n"
                if isinstance(paths, dict):
                    for path_name, desc in paths.items():
                        gm_notes += f"  [{path_name}] {desc}\n"
                gm_notes += "\n"
        
        evo = unit.get("evolution_paths", {})
        if evo:
            gm_notes += "\n=== EVOLUTION PATHS ===\n\n"
            for path_name, path_data in evo.items():
                if isinstance(path_data, dict):
                    gm_notes += f"[{path_name.upper()}] {path_data.get('name', '')}\n"
                    gm_notes += f"  {path_data.get('description', '')}\n"
                    abilities = path_data.get('abilities', [])
                    if abilities:
                        gm_notes += f"  Abilities: {', '.join(abilities)}\n"
                    gm_notes += "\n"
        
        # Commander base stats
        base_stats = unit.get("base_stats", {})
        if base_stats:
            base_line = " | ".join([f"{k}:{v}" for k, v in base_stats.items()])
            description = f"[b]{name}[/b] — {unit.get('title', '')}\n"
            description += f"Commander Base: {base_line}\n"
            description += f"─────────────────\n"
            description += f"Battle: {stat_line}\n"
            description += f"Points: {pts}\n"
            if special_str:
                description += f"─────────────────\n{special_str}\n"
            if flavor:
                description += f"\n[i]{flavor}[/i]"
        
        # Level 1 deck info
        deck = unit.get("level_1_deck", {})
        if deck:
            gm_notes += "\n=== STARTING DECK ===\n"
            for card_type, card_list in deck.items():
                if isinstance(card_list, list):
                    gm_notes += f"  {card_type}: {', '.join(card_list)}\n"
    
    if is_commander:
        # Figurine_Custom for commanders — stands upright
        obj = {
            "GUID": make_guid(),
            "Name": "Figurine_Custom",
            "Transform": make_transform(x, y, z, scale=1.2),
            "Nickname": f"⭐ {name}",
            "Description": description,
            "GMNotes": gm_notes,
            "ColorDiffuse": color,
            "CustomImage": {
                "ImageURL": image_url,
                "ImageSecondaryURL": image_url,
            },
            "Locked": False,
            "Grid": True,
            "Snap": True,
            "Tooltip": True,
            "Tags": [faction_id, "commander", "unit"],
        }
    else:
        # Custom_Token for regular units — flat disc
        obj = {
            "GUID": make_guid(),
            "Name": "Custom_Token",
            "Transform": make_transform(x, y, z, scale=0.8 if unit_type != "War Machine" else 1.5),
            "Nickname": name,
            "Description": description,
            "GMNotes": gm_notes,
            "ColorDiffuse": color,
            "CustomImage": {
                "ImageURL": image_url,
                "CustomToken": {
                    "Thickness": 0.2,
                    "MergeDistancePixels": 15.0,
                    "StandUp": False,
                    "Stackable": True,
                },
            },
            "Locked": False,
            "Grid": True,
            "Snap": True,
            "Tooltip": True,
            "Tags": [faction_id, unit_type.lower() if unit_type else "unit"],
        }
    
    return obj


def make_die(x=0, y=2, z=0, color=None):
    """Create a standard d6."""
    if color is None:
        color = {"r": 1.0, "g": 1.0, "b": 1.0}
    return {
        "GUID": make_guid(),
        "Name": "Die_6",
        "Transform": make_transform(x, y, z, scale=1.0),
        "Nickname": "Combat Die",
        "Description": "ATK die ≥ DEF = hit. Roll 6 = crit (2 damage).",
        "ColorDiffuse": color,
        "Locked": False,
        "Tooltip": True,
    }


def make_counter(name, x=0, y=1.5, z=0, value=0, color=None):
    """Create a TTS Counter object."""
    if color is None:
        color = {"r": 0.8, "g": 0.8, "b": 0.2}
    return {
        "GUID": make_guid(),
        "Name": "Counter",
        "Transform": make_transform(x, y, z, scale=1.2),
        "Nickname": name,
        "Description": f"Track {name}. Click +/- to adjust.",
        "ColorDiffuse": color,
        "Counter": {"value": value},
        "Locked": False,
        "Tooltip": True,
    }


def make_notecard(title, body, x=0, y=1.5, z=0, color=None):
    """Create a Notecard with text."""
    if color is None:
        color = {"r": 1.0, "g": 0.95, "b": 0.8}
    return {
        "GUID": make_guid(),
        "Name": "Notecard",
        "Transform": make_transform(x, y, z, scale=1.5),
        "Nickname": title,
        "Description": body,
        "ColorDiffuse": color,
        "Locked": False,
        "Tooltip": True,
    }


def make_bag(name, x=0, y=1.5, z=0, color=None, contents=None):
    """Create a Bag that holds other objects."""
    if color is None:
        color = {"r": 0.5, "g": 0.5, "b": 0.5}
    bag = {
        "GUID": make_guid(),
        "Name": "Bag",
        "Transform": make_transform(x, y, z, scale=1.5),
        "Nickname": name,
        "Description": f"Contains {name} components",
        "ColorDiffuse": color,
        "Locked": False,
        "Tooltip": True,
        "Bag": {"Order": 0},
    }
    if contents:
        bag["ContainedObjects"] = contents
    return bag


def make_card(card_name, card_data, x=0, y=1.5, z=0):
    """Create a Card object representing a game card."""
    card_type = card_data.get("type", "command")
    cp = card_data.get("cp", 0)
    timing = card_data.get("timing", "")
    effect = card_data.get("effect", "")
    
    color = CARD_TYPE_COLORS.get(card_type, {"r": 0.5, "g": 0.5, "b": 0.5})
    
    # Build description
    desc = f"[b]{card_name}[/b]\n"
    desc += f"Type: {card_type.title()} | CP Cost: {cp}\n"
    desc += f"Timing: {timing}\n"
    desc += f"─────────────────\n"
    desc += f"{effect}"
    
    # Use a colored token to represent the card
    # Card type determines color
    type_label = {"command": "CMD", "tech": "TECH", "fragment": "FRAG", "tactical": "TAC"}.get(card_type, "?")
    
    card_obj = {
        "GUID": make_guid(),
        "Name": "Card",
        "Transform": make_transform(x, y, z),
        "Nickname": f"[{type_label}] {card_name} (CP:{cp})",
        "Description": desc,
        "ColorDiffuse": color,
        "CardID": 100,  # placeholder
        "Locked": False,
        "Tooltip": True,
        "Tags": ["card", card_type],
    }
    return card_obj


def make_card_deck(cards_list, deck_name, x=0, y=1.5, z=0, color=None):
    """
    Create a Deck from a list of card objects.
    In TTS, a Deck is a container that holds Card objects.
    """
    if color is None:
        color = {"r": 0.3, "g": 0.3, "b": 0.5}
    
    if len(cards_list) == 0:
        return None
    
    if len(cards_list) == 1:
        # Single card - just return the card itself
        cards_list[0]["Transform"] = make_transform(x, y, z)
        return cards_list[0]
    
    deck = {
        "GUID": make_guid(),
        "Name": "Deck",
        "Transform": make_transform(x, y, z),
        "Nickname": deck_name,
        "Description": f"{deck_name} — {len(cards_list)} cards",
        "ColorDiffuse": color,
        "DeckIDs": [],
        "CustomDeck": {},
        "ContainedObjects": [],
        "Locked": False,
        "Tooltip": True,
        "Tags": ["deck"],
    }
    
    # TTS Deck uses CardIDs where the first digits are the custom deck ID
    # and the last two digits are the card index
    deck_id = abs(hash(deck_name)) % 9000 + 1000
    
    # Create a simple custom deck (using solid color back)
    type_color_hex = "333355"
    
    deck["CustomDeck"][str(deck_id)] = {
        "FaceURL": f"https://placehold.co/750x1050/333355/white?text={deck_name.replace(' ', '+')}",
        "BackURL": f"https://placehold.co/750x1050/222222/white?text=Shardborne",
        "NumWidth": 1,
        "NumHeight": 1,
        "BackIsHidden": True,
        "UniqueBack": False,
    }
    
    for idx, card in enumerate(cards_list):
        card_id = deck_id * 100 + idx
        card["CardID"] = card_id
        deck["DeckIDs"].append(card_id)
        deck["ContainedObjects"].append(card)
    
    return deck


def make_fragment_token(fragment, x=0, y=1.5, z=0):
    """Create a token for a Fragment."""
    name = fragment.get("name", "Unknown Fragment")
    faction_id = fragment.get("faction", "")
    effects = fragment.get("effects", "")
    risk = fragment.get("risk_instability", "Low")
    cost = fragment.get("activation_cost", 1)
    evo = fragment.get("interaction_evolution", "")
    
    desc = f"[b]{name}[/b]\n"
    desc += f"Activation Cost: {cost} | Instability: {risk}\n"
    desc += f"─────────────────\n"
    desc += f"{effects}\n"
    if evo:
        desc += f"\nEvolution: {evo}"
    
    color = FACTION_COLORS.get(faction_id, {"r": 0.6, "g": 0.2, "b": 0.8})
    
    return {
        "GUID": make_guid(),
        "Name": "Custom_Token",
        "Transform": make_transform(x, y, z, scale=0.5),
        "Nickname": f"💎 {name}",
        "Description": desc,
        "ColorDiffuse": {"r": 0.6, "g": 0.2, "b": 0.8},
        "CustomImage": {
            "ImageURL": f"https://placehold.co/128x128/7722cc/white?text={name.replace(' ', '+')}",
            "CustomToken": {
                "Thickness": 0.15,
                "MergeDistancePixels": 15.0,
                "StandUp": False,
                "Stackable": True,
            },
        },
        "Locked": False,
        "Tooltip": True,
        "Tags": [faction_id, "fragment"],
    }


def make_zone(name, x=0, y=0.5, z=0, scale_x=10, scale_z=10, color=None):
    """Create a Scripting Zone for deployment areas, etc."""
    if color is None:
        color = {"r": 0.5, "g": 0.5, "b": 0.5}
    return {
        "GUID": make_guid(),
        "Name": "ScriptingTrigger",
        "Transform": {
            "posX": round(x, 4), "posY": 1.0, "posZ": round(z, 4),
            "rotX": 0, "rotY": 0, "rotZ": 0,
            "scaleX": round(scale_x, 4),
            "scaleY": 3.0,
            "scaleZ": round(scale_z, 4),
        },
        "Nickname": name,
        "Description": name,
        "ColorDiffuse": color,
        "Locked": True,
        "Tooltip": True,
    }


# ─── Board Builder ───────────────────────────────────────────────────────────────

def make_game_board(map_name="OpenPlains", nickname="Shardborne Battlefield"):
    """Create the main game board using a generated map image."""
    map_file = os.path.join(MAPS_DIR, f"{map_name}.png")
    if os.path.exists(map_file):
        image_url = f"{GITHUB_RAW}/data/factions/Images/Maps/{map_name}.png"
    else:
        image_url = f"https://placehold.co/1024x1024/5a6b4a/3d4a32?text=Shardborne+Battlefield"
    
    return {
        "GUID": make_guid(),
        "Name": "Custom_Board",
        "Transform": make_transform(0, 0.5, 0, scale=2.0),
        "Nickname": nickname,
        "Description": "Large 64\" × 64\" battlefield. 1 TTS unit = 1 inch.\nGrid overlay shows 1\" squares.\nScaled 2x for comfortable play.",
        "ColorDiffuse": {"r": 1.0, "g": 1.0, "b": 1.0},
        "CustomImage": {
            "ImageURL": image_url,
            "WidthScale": 0.0,
        },
        "Locked": True,
        "Grid": True,
        "Tooltip": True,
    }


def make_map_variant_bag():
    """Create a bag containing multiple map board variants for players to swap."""
    map_variants = [
        ("VolcanicWastes", "🌋 Volcanic Wastes", "Emberclaw homeland — lava flows and scorched rock"),
        ("DarkForest", "🌲 Dark Forest", "Thornweft territory — dense canopy and undergrowth"),
        ("IronFortress", "⚙️ Iron Fortress", "Iron Dominion stronghold — metal plating and industry"),
        ("ShadowRuins", "🌙 Shadow Ruins", "Nightfang domain — moonlit ancient ruins"),
        ("SacredGrounds", "⛩️ Sacred Grounds", "Veilbound temple — zen gardens and red accents"),
        ("OpenPlains", "🌾 Open Plains", "Neutral terrain — grasslands and gentle hills"),
    ]
    
    boards = []
    for map_name, nickname, desc in map_variants:
        board = make_game_board(map_name, nickname)
        board["Description"] = desc + "\n\nTo use: drag this onto the table to replace the current board."
        board["Locked"] = False  # Unlocked so they can be placed
        boards.append(board)
    
    return make_bag("🗺️ Map Variants", x=-45, y=1.5, z=4,
                    color={"r": 0.3, "g": 0.5, "b": 0.3},
                    contents=boards)


def make_blast_template(size_inches, x=0, y=1.5, z=0):
    """Create a blast radius template token."""
    template_file = os.path.join(TEMPLATES_DIR, f"Blast{size_inches}.png")
    if os.path.exists(template_file):
        image_url = f"{GITHUB_RAW}/data/factions/Images/Maps/Templates/Blast{size_inches}.png"
    else:
        image_url = f"https://placehold.co/256x256/ff3333/ffffff?text={size_inches}%22"
    
    return {
        "GUID": make_guid(),
        "Name": "Custom_Token",
        "Transform": make_transform(x, y, z, scale=size_inches * 0.32),
        "Nickname": f"💥 {size_inches}\" Blast Template",
        "Description": f"Blast radius: {size_inches}\"\nPlace centered on target point.\nAll units within the circle are affected.",
        "ColorDiffuse": {"r": 1.0, "g": 0.3, "b": 0.2},
        "CustomImage": {
            "ImageURL": image_url,
            "CustomToken": {
                "Thickness": 0.05,
                "MergeDistancePixels": 15.0,
                "StandUp": False,
                "Stackable": False,
            },
        },
        "Locked": False,
        "Tooltip": True,
        "Tags": ["template", "blast"],
    }


def make_cone_template(size_inches, x=0, y=1.5, z=0):
    """Create a cone (breath weapon) template token."""
    template_file = os.path.join(TEMPLATES_DIR, f"Cone{size_inches}.png")
    if os.path.exists(template_file):
        image_url = f"{GITHUB_RAW}/data/factions/Images/Maps/Templates/Cone{size_inches}.png"
    else:
        image_url = f"https://placehold.co/256x512/ff9922/ffffff?text=Cone+{size_inches}%22"
    
    return {
        "GUID": make_guid(),
        "Name": "Custom_Token",
        "Transform": make_transform(x, y, z, scale=size_inches * 0.25),
        "Nickname": f"🔥 {size_inches}\" Cone Template",
        "Description": f"Cone length: {size_inches}\" (45° spread)\nPlace point at attacking unit.\nAll units within the cone are affected.\nRotate to aim.",
        "ColorDiffuse": {"r": 1.0, "g": 0.6, "b": 0.2},
        "CustomImage": {
            "ImageURL": image_url,
            "CustomToken": {
                "Thickness": 0.05,
                "MergeDistancePixels": 15.0,
                "StandUp": False,
                "Stackable": False,
            },
        },
        "Locked": False,
        "Tooltip": True,
        "Tags": ["template", "cone"],
    }


def make_range_ring(radius_inches, x=0, y=1.5, z=0):
    """Create a range indicator ring token."""
    template_file = os.path.join(TEMPLATES_DIR, f"Range{radius_inches}.png")
    if os.path.exists(template_file):
        image_url = f"{GITHUB_RAW}/data/factions/Images/Maps/Templates/Range{radius_inches}.png"
    else:
        image_url = f"https://placehold.co/256x256/66aaff/ffffff?text={radius_inches}%22"
    
    return {
        "GUID": make_guid(),
        "Name": "Custom_Token",
        "Transform": make_transform(x, y, z, scale=radius_inches * 0.32),
        "Nickname": f"📏 {radius_inches}\" Range Ring",
        "Description": f"Range indicator: {radius_inches}\"\nPlace centered on a unit to visualize its range/threat radius.\nTransparent — units visible through it.",
        "ColorDiffuse": {"r": 0.4, "g": 0.7, "b": 1.0},
        "CustomImage": {
            "ImageURL": image_url,
            "CustomToken": {
                "Thickness": 0.03,
                "MergeDistancePixels": 15.0,
                "StandUp": False,
                "Stackable": False,
            },
        },
        "Locked": False,
        "Tooltip": True,
        "Tags": ["template", "range"],
    }


def make_ruler():
    """Create a measuring tool notecard with scale reference."""
    return make_notecard(
        "📏 Scale Reference",
        "1 TTS unit = 1 inch\n"
        "Use TTS built-in ruler (right-click → Measure)\n"
        "─────────────────\n"
        "Common Ranges:\n"
        "  Melee: 1\"\n"
        "  Short: 6-8\"\n"
        "  Medium: 10-14\"\n"
        "  Long: 22-32\"\n"
        "  Artillery: up to 32\"",
        x=-45, y=1.5, z=0,
        color={"r": 0.9, "g": 0.9, "b": 0.5}
    )


# ─── Lua Script Builder ─────────────────────────────────────────────────────────

def build_lua_script():
    """Build the comprehensive Lua global script for game automation."""
    return r'''--[[
    ╔══════════════════════════════════════════════╗
    ║     SHARDBORNE — Tabletop Simulator Mod      ║
    ║     Global Script v3.1                       ║
    ╚══════════════════════════════════════════════╝
    
    Features:
    - Guided Setup Wizard (battle size → map → scenario → factions → army build → deploy)
    - Turn phase management (Command → Movement → Combat → End)
    - Auto-combat resolver with modifiers (charge/flank/rear/cover/stance)
    - Morale testing (2d6 vs MOR)
    - Card draw mechanics (draw 2/turn, hand limit 7)
    - CP / Fragment / VP tracking per player
    - Faction mechanic pools: Heat, Hunger, Flow, Fate-Threads, Anchors, Fragment Charges
    - Veilbound Stance tracking (Honor / Revelation)
    - HP damage tracking via right-click context menus
    - Kill counter per player (feeds Hunger Pool)
    - Distance measurement between objects
    - Faction-specific phase reminders & auto-triggers
    - Army point validation (!army command)
    - Overheat / Flow threshold / Hunger threshold auto-detection
    - Round timer & combat log
    - Scenario/objective management
--]]

-- ════════════════════════════════════════
-- GAME STATE
-- ════════════════════════════════════════

GameState = {
    turn = 0,
    phase = "Setup",
    phases = {"Command", "Movement", "Combat", "End"},
    phase_index = 0,
    active_player = "White",
    players = {"White", "Red"},
    player_cp = {White = 0, Red = 0},
    player_fragments = {White = 0, Red = 0},
    player_vp = {White = 0, Red = 0},
    cards_drawn_this_turn = {White = 0, Red = 0},
    hand_limit = 7,
    draw_per_turn = 2,
    game_started = false,
    max_turns = 6,
    combat_log = {},
    timer_start = 0,
    timer_enabled = false,
    -- Faction mechanic pools
    faction_pools = {
        heat = 0,              -- Emberclaw Heat Pool (max 15, overheat triggers above)
        hunger = 0,            -- Nightfang Hunger Pool (kill counter -> thresholds)
        flow = 0,              -- Veilbound Ritual Flow (max 40)
        fate_threads = 0,      -- Thornweft Fate-Thread Pool (finite, no regen)
        anchors = 0,           -- Thornweft Web-Anchors placed
        fragment_charges = 0,  -- Iron Dominion Fragment Charges
        stance = "none",       -- Veilbound stance: none / honor / revelation
    },
    kills = {White = 0, Red = 0},   -- Kill counter per player
    unit_hp = {},                     -- HP tracking keyed by object GUID
    unit_statuses = {},               -- Status effects keyed by object GUID
    game_start_time = 0,              -- os.time() when game started
    total_attacks = {White = 0, Red = 0},
    total_damage_dealt = {White = 0, Red = 0},
    first_player = "White",            -- Player who goes first each turn (alternates)
    -- Setup wizard state
    setup = {
        step = 0,               -- 0=not started, 1=battle_size, 2=map, 3=scenario, 4=p1_faction, 5=p2_faction, 6=army_build, 7=deploy
        battle_size = "standard",  -- skirmish / standard / epic
        points_limit = 250,
        map_choice = "",
        scenario_name = "",
        p1_faction = "",
        p2_faction = "",
        p1_ready = false,
        p2_ready = false,
    },
}

-- Measurement tracking
local lastPickedUp = {}

-- Setup wizard step names
local SETUP_STEPS = {
    [0] = "Press Setup to Begin",
    [1] = "Select Battle Size",
    [2] = "Select Map",
    [3] = "Select Scenario",
    [4] = "Player 1: Choose Faction",
    [5] = "Player 2: Choose Faction",
    [6] = "Army Building",
    [7] = "Deployment",
}

-- ════════════════════════════════════════
-- INITIALIZATION
-- ════════════════════════════════════════

function onLoad(save_state)
    if save_state ~= "" then
        local loaded = JSON.decode(save_state)
        if loaded then
            GameState = loaded
            -- Ensure new fields exist for saves from older versions
            if not GameState.faction_pools then
                GameState.faction_pools = {heat=0, hunger=0, flow=0, fate_threads=0, anchors=0, fragment_charges=0, stance="none"}
            end
            if not GameState.kills then GameState.kills = {White=0, Red=0} end
            if not GameState.unit_hp then GameState.unit_hp = {} end
            if not GameState.setup then
                GameState.setup = {step=0, battle_size="standard", points_limit=250, map_choice="", scenario_name="", p1_faction="", p2_faction="", p1_ready=false, p2_ready=false}
            end
            if not GameState.unit_statuses then GameState.unit_statuses = {} end
            if not GameState.game_start_time then GameState.game_start_time = 0 end
            if not GameState.total_attacks then GameState.total_attacks = {White=0, Red=0} end
            if not GameState.total_damage_dealt then GameState.total_damage_dealt = {White=0, Red=0} end
            if not GameState.first_player then GameState.first_player = "White" end
        end
    end
    
    createUI()
    
    -- Add context menus to all existing objects
    Wait.time(function()
        for _, obj in ipairs(getAllObjects()) do
            addHPContextMenu(obj)
        end
    end, 1)
    
    broadcastToAll("═══ SHARDBORNE v3.2 ═══\nTabletop Simulator Edition\n\nWelcome, Commanders!\nClick ⚙ SETUP GAME to begin guided setup.\nOr type !help for manual commands.", {1, 0.8, 0.2})
    printToAll("[Phase: " .. GameState.phase .. "] Turn " .. GameState.turn, {0.8, 0.8, 0.8})
end

function onSave()
    return JSON.encode(GameState)
end

-- ════════════════════════════════════════
-- UI CREATION
-- ════════════════════════════════════════

function createUI()
    UI.setXml("")
    
    Wait.time(function()
        local xml = [[
<Defaults>
    <Button fontSize="13" fontStyle="Bold" />
    <Text fontSize="12" color="#FFFFFF" />
</Defaults>

<Panel position="0 0 -50" rotation="0 0 0" width="300" height="780" 
       color="rgba(0,0,0,0.88)" padding="6" id="mainPanel"
       anchorMin="1 1" anchorMax="1 1" offsetXY="-160 -10"
       active="true">

    <VerticalLayout spacing="3" padding="6 6 6 6">
        <Text id="titleText" fontSize="17" fontStyle="Bold" 
              color="#FFD700" alignment="MiddleCenter">⚔ SHARDBORNE ⚔</Text>
        
        <Text id="turnText" fontSize="13" color="#AAAAAA" 
              alignment="MiddleCenter">Turn 0 — Setup</Text>
        
        <Text id="phaseText" fontSize="15" fontStyle="Bold" 
              color="#44FF44" alignment="MiddleCenter">Setup Phase</Text>
        
        <Text id="timerText" fontSize="11" color="#666666"
              alignment="MiddleCenter">⏱ --:--</Text>
        
        <HorizontalLayout spacing="3" preferredHeight="32">
            <Button id="btnNextPhase" onClick="nextPhase" 
                    color="#335533" textColor="#FFFFFF"
                    tooltip="Advance to next phase">Next Phase ▶</Button>
            <Button id="btnNextTurn" onClick="nextTurn" 
                    color="#553333" textColor="#FFFFFF"
                    tooltip="Start next turn">Next Turn ⟳</Button>
        </HorizontalLayout>
        
        <Text fontSize="11" color="#555555" alignment="MiddleCenter">──── Player 1 (White) ────</Text>
        <HorizontalLayout spacing="3" preferredHeight="28">
            <Text id="cpWhite" fontSize="13" color="#FFDD44">CP: 0</Text>
            <Button onClick="addCPWhite" color="#444422" textColor="#FFFF00" preferredWidth="28">+</Button>
            <Button onClick="subCPWhite" color="#442222" textColor="#FF4444" preferredWidth="28">-</Button>
            <Text preferredWidth="8"> </Text>
            <Text id="fragWhite" fontSize="13" color="#BB66FF">F: 0</Text>
            <Button onClick="addFragWhite" color="#332244" textColor="#BB66FF" preferredWidth="28">+</Button>
            <Button onClick="subFragWhite" color="#442222" textColor="#FF4444" preferredWidth="28">-</Button>
        </HorizontalLayout>
        <HorizontalLayout spacing="3" preferredHeight="28">
            <Text id="vpWhite" fontSize="13" color="#44FF44">VP: 0</Text>
            <Button onClick="addVPWhite" color="#224422" textColor="#44FF44" preferredWidth="28">+</Button>
            <Button onClick="subVPWhite" color="#442222" textColor="#FF4444" preferredWidth="28">-</Button>
        </HorizontalLayout>
        
        <Text fontSize="11" color="#555555" alignment="MiddleCenter">──── Player 2 (Red) ────</Text>
        <HorizontalLayout spacing="3" preferredHeight="28">
            <Text id="cpRed" fontSize="13" color="#FFDD44">CP: 0</Text>
            <Button onClick="addCPRed" color="#444422" textColor="#FFFF00" preferredWidth="28">+</Button>
            <Button onClick="subCPRed" color="#442222" textColor="#FF4444" preferredWidth="28">-</Button>
            <Text preferredWidth="8"> </Text>
            <Text id="fragRed" fontSize="13" color="#BB66FF">F: 0</Text>
            <Button onClick="addFragRed" color="#332244" textColor="#BB66FF" preferredWidth="28">+</Button>
            <Button onClick="subFragRed" color="#442222" textColor="#FF4444" preferredWidth="28">-</Button>
        </HorizontalLayout>
        <HorizontalLayout spacing="3" preferredHeight="28">
            <Text id="vpRed" fontSize="13" color="#44FF44">VP: 0</Text>
            <Button onClick="addVPRed" color="#224422" textColor="#44FF44" preferredWidth="28">+</Button>
            <Button onClick="subVPRed" color="#442222" textColor="#FF4444" preferredWidth="28">-</Button>
        </HorizontalLayout>
        
        <Text fontSize="11" color="#555555" alignment="MiddleCenter">──── Faction Mechanics ────</Text>
        <HorizontalLayout spacing="2" preferredHeight="26">
            <Text id="poolHeat" fontSize="11" color="#FF6600" preferredWidth="90">Heat: 0/15</Text>
            <Button onClick="addHeat" color="#442200" textColor="#FF6600" preferredWidth="25">+</Button>
            <Button onClick="subHeat" color="#332200" textColor="#AA4400" preferredWidth="25">-</Button>
            <Text id="poolHunger" fontSize="11" color="#CC0000" preferredWidth="85">Hunger: 0</Text>
            <Button onClick="addHunger" color="#440000" textColor="#CC0000" preferredWidth="25">+</Button>
        </HorizontalLayout>
        <HorizontalLayout spacing="2" preferredHeight="26">
            <Text id="poolFlow" fontSize="11" color="#6699FF" preferredWidth="90">Flow: 0/40</Text>
            <Button onClick="addFlow" color="#222244" textColor="#6699FF" preferredWidth="25">+</Button>
            <Button onClick="subFlow" color="#222233" textColor="#4466AA" preferredWidth="25">-</Button>
            <Text id="poolFate" fontSize="11" color="#44DDAA" preferredWidth="85">Fate: 0</Text>
            <Button onClick="subFate" color="#223333" textColor="#44DDAA" preferredWidth="25">-</Button>
        </HorizontalLayout>
        <HorizontalLayout spacing="2" preferredHeight="26">
            <Text id="poolAnchors" fontSize="11" color="#33CC88" preferredWidth="90">Anchors: 0</Text>
            <Button onClick="addAnchors" color="#223322" textColor="#33CC88" preferredWidth="25">+</Button>
            <Button onClick="subAnchors" color="#222222" textColor="#228855" preferredWidth="25">-</Button>
            <Text id="poolFragCharges" fontSize="11" color="#8888FF" preferredWidth="85">F.Charges: 0</Text>
            <Button onClick="addFragCharges" color="#222244" textColor="#8888FF" preferredWidth="25">+</Button>
        </HorizontalLayout>
        <HorizontalLayout spacing="2" preferredHeight="26">
            <Text id="stanceText" fontSize="11" color="#AAAAAA" preferredWidth="110">Stance: None</Text>
            <Button onClick="setStanceHonor" color="#334455" textColor="#66AADD" preferredWidth="55">Honor</Button>
            <Button onClick="setStanceRevelation" color="#553322" textColor="#FF8844" preferredWidth="55">Revel.</Button>
        </HorizontalLayout>
        
        <Text fontSize="11" color="#555555" alignment="MiddleCenter">──── Kill Tracker ────</Text>
        <HorizontalLayout spacing="3" preferredHeight="26">
            <Text id="killsWhite" fontSize="11" color="#CCCCCC" preferredWidth="90">W Kills: 0</Text>
            <Button onClick="addKillWhite" color="#333333" textColor="#CCCCCC" preferredWidth="25">+</Button>
            <Text id="killsRed" fontSize="11" color="#FF8888" preferredWidth="85">R Kills: 0</Text>
            <Button onClick="addKillRed" color="#442222" textColor="#FF8888" preferredWidth="25">+</Button>
        </HorizontalLayout>
        
        <Text fontSize="11" color="#555555" alignment="MiddleCenter">──── Combat Tools ────</Text>
        <HorizontalLayout spacing="3" preferredHeight="32">
            <Button onClick="rollAttack" color="#553322" textColor="#FFFFFF" 
                    tooltip="Open combat resolver">⚔ Combat</Button>
            <Button onClick="rollMorale" color="#335555" textColor="#FFFFFF"
                    tooltip="Roll 2d6 morale">🎲 Morale</Button>
            <Button onClick="rollGeneric" color="#333355" textColor="#FFFFFF"
                    tooltip="Roll generic dice">🎲 d6</Button>
        </HorizontalLayout>
        
        <HorizontalLayout spacing="3" preferredHeight="32">
            <Button onClick="toggleTimer" color="#444444" textColor="#AAAAAA"
                    tooltip="Start/stop turn timer">⏱ Timer</Button>
            <Button onClick="undoLastCombat" color="#442233" textColor="#AAAAAA"
                    tooltip="Show last combat result">📋 Log</Button>
            <Button onClick="togglePanel" color="#222222" textColor="#666666">▲ Min</Button>
        </HorizontalLayout>
        
        <Button id="btnSetup" onClick="openSetupWizard" color="#225522" textColor="#44FF88"
                preferredHeight="36" fontSize="14" fontStyle="Bold"
                tooltip="Launch guided game setup wizard">⚙ SETUP GAME</Button>
    </VerticalLayout>
</Panel>

<Panel position="0 0 -50" rotation="0 0 0" width="280" height="160"
       color="rgba(0,0,0,0.9)" padding="6" id="combatPanel"
       anchorMin="0.5 0.5" anchorMax="0.5 0.5" offsetXY="0 0"
       active="false">
    <VerticalLayout spacing="3" padding="6 6 6 6">
        <Text fontSize="15" fontStyle="Bold" color="#FF6644" alignment="MiddleCenter">⚔ COMBAT RESOLVER ⚔</Text>
        <HorizontalLayout spacing="4" preferredHeight="30">
            <Text fontSize="12" color="#AAAAAA" preferredWidth="80">ATK Dice:</Text>
            <InputField id="atkInput" fontSize="14" color="#FFFFFF" preferredWidth="60"
                        text="4" characterLimit="2" onEndEdit="onCombatInput"/>
            <Text fontSize="12" color="#AAAAAA" preferredWidth="50">vs DEF:</Text>
            <InputField id="defInput" fontSize="14" color="#FFFFFF" preferredWidth="60"
                        text="4" characterLimit="2" onEndEdit="onCombatInput"/>
        </HorizontalLayout>
        <HorizontalLayout spacing="4" preferredHeight="34">
            <Button onClick="resolveCombat" color="#663322" textColor="#FFFFFF">⚔ RESOLVE</Button>
            <Button onClick="closeCombatPanel" color="#333333" textColor="#888888">Cancel</Button>
        </HorizontalLayout>
        <Text id="combatResult" fontSize="12" color="#FFAA44" alignment="MiddleCenter"> </Text>
    </VerticalLayout>
</Panel>

<!-- ═══ SETUP WIZARD PANEL ═══ -->
<Panel position="0 0 -50" rotation="0 0 0" width="380" height="520"
       color="rgba(0,0,0,0.92)" padding="8" id="setupPanel"
       anchorMin="0.5 0.5" anchorMax="0.5 0.5" offsetXY="0 20"
       active="false">
    <VerticalLayout spacing="4" padding="8 8 8 8">
        <Text fontSize="18" fontStyle="Bold" color="#FFD700" alignment="MiddleCenter">⚙ GAME SETUP WIZARD ⚙</Text>
        <Text id="setupStepText" fontSize="13" color="#88FF88" alignment="MiddleCenter">Step 1 of 7: Select Battle Size</Text>
        <Text id="setupDesc" fontSize="11" color="#AAAAAA" alignment="MiddleCenter">Choose the scale of your battle.</Text>
        
        <!-- Step 1: Battle Size -->
        <Panel id="setupStep1" active="true">
            <VerticalLayout spacing="4" padding="4 4 4 4">
                <Button onClick="setupSelectBattleSize" id="btnSkirmish"
                        color="#334433" textColor="#88FF88" preferredHeight="48" fontSize="13">
                    ⚔ SKIRMISH\n50-100 pts | 30x30 | 5 Turns | 1 Commander</Button>
                <Button onClick="setupSelectBattleSize" id="btnStandard"
                        color="#334455" textColor="#88BBFF" preferredHeight="48" fontSize="13">
                    ⚔ STANDARD\n200-300 pts | 48x48 | 6 Turns | 1-2 Commanders</Button>
                <Button onClick="setupSelectBattleSize" id="btnEpic"
                        color="#553333" textColor="#FF8888" preferredHeight="48" fontSize="13">
                    ⚔ EPIC\n500+ pts | 60x72 | 7 Turns | Unlimited</Button>
            </VerticalLayout>
        </Panel>
        
        <!-- Step 2: Map Selection -->
        <Panel id="setupStep2" active="false">
            <VerticalLayout spacing="3" padding="4 4 4 4">
                <HorizontalLayout spacing="3" preferredHeight="40">
                    <Button onClick="setupSelectMap" id="mapOpenPlains"
                            color="#445533" textColor="#CCDDAA" fontSize="11">🌾 Open Plains</Button>
                    <Button onClick="setupSelectMap" id="mapVolcanicWastes"
                            color="#553322" textColor="#FFAA66" fontSize="11">🌋 Volcanic Wastes</Button>
                </HorizontalLayout>
                <HorizontalLayout spacing="3" preferredHeight="40">
                    <Button onClick="setupSelectMap" id="mapDarkForest"
                            color="#223322" textColor="#66CC66" fontSize="11">🌲 Dark Forest</Button>
                    <Button onClick="setupSelectMap" id="mapIronFortress"
                            color="#333344" textColor="#AABBDD" fontSize="11">🏰 Iron Fortress</Button>
                </HorizontalLayout>
                <HorizontalLayout spacing="3" preferredHeight="40">
                    <Button onClick="setupSelectMap" id="mapShadowRuins"
                            color="#332233" textColor="#BB88CC" fontSize="11">🏚 Shadow Ruins</Button>
                    <Button onClick="setupSelectMap" id="mapSacredGrounds"
                            color="#444422" textColor="#DDDDAA" fontSize="11">⛩ Sacred Grounds</Button>
                </HorizontalLayout>
                <Button onClick="setupSelectMap" id="mapRandom"
                        color="#333333" textColor="#AAAAAA" preferredHeight="32" fontSize="11">🎲 Random Map</Button>
            </VerticalLayout>
        </Panel>
        
        <!-- Step 3: Scenario Selection -->
        <Panel id="setupStep3" active="false">
            <VerticalLayout spacing="3" padding="4 4 4 4">
                <HorizontalLayout spacing="3" preferredHeight="36">
                    <Button onClick="setupSelectScenario" id="scenKingOfTheHill"
                            color="#444433" textColor="#FFDD88" fontSize="10">👑 King of the Hill</Button>
                    <Button onClick="setupSelectScenario" id="scenShardstorm"
                            color="#333344" textColor="#88CCFF" fontSize="10">💎 Shardstorm</Button>
                </HorizontalLayout>
                <HorizontalLayout spacing="3" preferredHeight="36">
                    <Button onClick="setupSelectScenario" id="scenTheLastStand"
                            color="#443333" textColor="#FF8888" fontSize="10">🛡 The Last Stand</Button>
                    <Button onClick="setupSelectScenario" id="scenTotalWar"
                            color="#443322" textColor="#FF6644" fontSize="10">💀 Total War</Button>
                </HorizontalLayout>
                <HorizontalLayout spacing="3" preferredHeight="36">
                    <Button onClick="setupSelectScenario" id="scenSupplyLines"
                            color="#334433" textColor="#88DD88" fontSize="10">📦 Supply Lines</Button>
                    <Button onClick="setupSelectScenario" id="scenBrokenGround"
                            color="#333333" textColor="#AAAAAA" fontSize="10">💥 Broken Ground</Button>
                </HorizontalLayout>
                <Button onClick="setupSelectScenario" id="scenRandom"
                        color="#333333" textColor="#CCCCCC" preferredHeight="32" fontSize="11">🎲 Random Scenario</Button>
            </VerticalLayout>
        </Panel>
        
        <!-- Step 4 & 5: Faction Selection -->
        <Panel id="setupStep4" active="false">
            <VerticalLayout spacing="3" padding="4 4 4 4">
                <Button onClick="setupSelectFaction" id="facEmberclaw"
                        color="#442200" textColor="#FF8833" preferredHeight="38" fontSize="12">🔥 Emberclaw Warpack</Button>
                <Button onClick="setupSelectFaction" id="facIronDominion"
                        color="#222233" textColor="#8899BB" preferredHeight="38" fontSize="12">⚙ Iron Dominion</Button>
                <Button onClick="setupSelectFaction" id="facNightfang"
                        color="#330022" textColor="#CC4488" preferredHeight="38" fontSize="12">🦇 Nightfang Dominion</Button>
                <Button onClick="setupSelectFaction" id="facThornweft"
                        color="#223311" textColor="#77BB44" preferredHeight="38" fontSize="12">🌿 Thornweft Matriarchy</Button>
                <Button onClick="setupSelectFaction" id="facVeilbound"
                        color="#332244" textColor="#9977CC" preferredHeight="38" fontSize="12">👁 Veilbound Shogunate</Button>
            </VerticalLayout>
        </Panel>
        
        <!-- Step 6: Army Building -->
        <Panel id="setupStep6" active="false">
            <VerticalLayout spacing="4" padding="4 4 4 4">
                <Text id="armyBuildTitle" fontSize="14" fontStyle="Bold" color="#FFD700" alignment="MiddleCenter">
                    ARMY BUILDING PHASE</Text>
                <Text id="armyBuildInfo" fontSize="12" color="#AAAAAA" alignment="MiddleCenter">
                    Pull units from your faction bag.\nStay within your point budget.</Text>
                <Text id="armyP1Status" fontSize="13" color="#FFFFFF" alignment="MiddleLeft">
                    Player 1 (White): 0 / 250 pts</Text>
                <Text id="armyP2Status" fontSize="13" color="#FF8888" alignment="MiddleLeft">
                    Player 2 (Red): 0 / 250 pts</Text>
                <HorizontalLayout spacing="4" preferredHeight="36">
                    <Button onClick="setupScanArmy" color="#334455" textColor="#88BBFF" fontSize="12">
                        🔄 Scan Points</Button>
                    <Button onClick="setupValidateArmy" color="#334433" textColor="#88FF88" fontSize="12">
                        ✅ Validate</Button>
                </HorizontalLayout>
                <HorizontalLayout spacing="4" preferredHeight="36">
                    <Button onClick="setupPlayerReady" id="btnP1Ready"
                            color="#335533" textColor="#44FF88" fontSize="12">P1 Ready ✔</Button>
                    <Button onClick="setupPlayerReady" id="btnP2Ready"
                            color="#553333" textColor="#FF8844" fontSize="12">P2 Ready ✔</Button>
                </HorizontalLayout>
            </VerticalLayout>
        </Panel>
        
        <!-- Step 7: Deployment -->
        <Panel id="setupStep7" active="false">
            <VerticalLayout spacing="4" padding="4 4 4 4">
                <Text fontSize="14" fontStyle="Bold" color="#FFD700" alignment="MiddleCenter">
                    DEPLOYMENT PHASE</Text>
                <Text fontSize="11" color="#AAAAAA" alignment="MiddleCenter">
                    Place units in your deployment zone.\nAlternate placing 1 unit at a time.\nCommanders deploy last.</Text>
                <Text id="deployStatus" fontSize="12" color="#88FF88" alignment="MiddleCenter">
                    Both players deploying...</Text>
                <Button onClick="setupBeginGame" color="#225522" textColor="#44FF88" 
                        preferredHeight="42" fontSize="14" fontStyle="Bold">
                    ⚔ BEGIN GAME ⚔</Button>
            </VerticalLayout>
        </Panel>
        
        <!-- Setup Summary (always visible at bottom) -->
        <Text id="setupSummary" fontSize="10" color="#666666" alignment="MiddleCenter">
            Size: -- | Map: -- | Scenario: --</Text>
        
        <HorizontalLayout spacing="4" preferredHeight="30">
            <Button onClick="setupGoBack" color="#333333" textColor="#888888" fontSize="11">◀ Back</Button>
            <Button onClick="closeSetupWizard" color="#442222" textColor="#FF6666" fontSize="11">✖ Cancel</Button>
        </HorizontalLayout>
    </VerticalLayout>
</Panel>
        ]]
        UI.setXml(xml)
        Wait.time(updateUI, 0.5)
    end, 0.2)
end

-- ════════════════════════════════════════
-- UI UPDATE
-- ════════════════════════════════════════

function updateUI()
    if not UI then return end
    
    pcall(function()
        UI.setAttribute("turnText", "text", "Turn " .. GameState.turn .. " — " .. GameState.active_player .. "'s Turn")
        UI.setAttribute("phaseText", "text", GameState.phase .. " Phase")
        UI.setAttribute("cpWhite", "text", "CP: " .. (GameState.player_cp.White or 0))
        UI.setAttribute("cpRed", "text", "CP: " .. (GameState.player_cp.Red or 0))
        UI.setAttribute("fragWhite", "text", "F: " .. (GameState.player_fragments.White or 0))
        UI.setAttribute("fragRed", "text", "F: " .. (GameState.player_fragments.Red or 0))
        UI.setAttribute("vpWhite", "text", "VP: " .. (GameState.player_vp.White or 0))
        UI.setAttribute("vpRed", "text", "VP: " .. (GameState.player_vp.Red or 0))
        
        -- Faction pools
        local fp = GameState.faction_pools or {}
        local heat = fp.heat or 0
        local heat_color = heat > 12 and "#FF0000" or (heat > 8 and "#FF6600" or "#FF6600")
        UI.setAttribute("poolHeat", "text", "Heat: " .. heat .. "/15")
        UI.setAttribute("poolHeat", "color", heat_color)
        UI.setAttribute("poolHunger", "text", "Hunger: " .. (fp.hunger or 0))
        UI.setAttribute("poolFlow", "text", "Flow: " .. (fp.flow or 0) .. "/40")
        UI.setAttribute("poolFate", "text", "Fate: " .. (fp.fate_threads or 0))
        UI.setAttribute("poolAnchors", "text", "Anchors: " .. (fp.anchors or 0))
        UI.setAttribute("poolFragCharges", "text", "F.Charges: " .. (fp.fragment_charges or 0))
        
        -- Stance display
        local stance = fp.stance or "none"
        local stance_labels = {none = "None", honor = "Honor (+1 DEF, -1 ATK)", revelation = "Revelation (+1 ATK, -1 DEF)"}
        local stance_colors = {none = "#AAAAAA", honor = "#66AADD", revelation = "#FF8844"}
        UI.setAttribute("stanceText", "text", "Stance: " .. (stance_labels[stance] or "None"))
        UI.setAttribute("stanceText", "color", stance_colors[stance] or "#AAAAAA")
        
        -- Kill tracker
        UI.setAttribute("killsWhite", "text", "W Kills: " .. (GameState.kills and GameState.kills.White or 0))
        UI.setAttribute("killsRed", "text", "R Kills: " .. (GameState.kills and GameState.kills.Red or 0))
        
        local phase_colors = {
            Setup = "#888888",
            Command = "#FFD700",
            Movement = "#44AAFF",
            Combat = "#FF4444",
            ["End"] = "#44FF44",
        }
        UI.setAttribute("phaseText", "color", phase_colors[GameState.phase] or "#FFFFFF")
        
        -- Timer update
        if GameState.timer_enabled and GameState.timer_start > 0 then
            local elapsed = os.time() - GameState.timer_start
            local mins = math.floor(elapsed / 60)
            local secs = elapsed % 60
            UI.setAttribute("timerText", "text", string.format("⏱ %d:%02d", mins, secs))
            UI.setAttribute("timerText", "color", elapsed > 180 and "#FF4444" or "#AAAAAA")
        end
    end)
end

-- Timer coroutine
function startTimerUpdate()
    Wait.time(function()
        if GameState.timer_enabled then
            updateUI()
        end
    end, 1, -1)
end

-- ════════════════════════════════════════
-- PHASE & TURN MANAGEMENT
-- ════════════════════════════════════════

function nextPhase(player, value, id)
    if not GameState.game_started then
        startGame()
        return
    end
    
    GameState.phase_index = GameState.phase_index + 1
    
    if GameState.phase_index > #GameState.phases then
        nextTurn()
        return
    end
    
    GameState.phase = GameState.phases[GameState.phase_index]
    
    local phase_desc = {
        Command = "Play cards, activate abilities, spend CP. Draw 2 cards (hand limit 7).",
        Movement = "Move each unit up to its MOV stat. Difficult terrain = half speed.",
        Combat = "Declare attacks, resolve dice, apply damage. Use !atk X vs Y.",
        ["End"] = "Morale checks (half HP), score objectives, clean up effects.",
    }
    
    broadcastToAll("═══ " .. string.upper(GameState.phase) .. " PHASE ═══\n" .. 
                   (phase_desc[GameState.phase] or ""), {1, 0.8, 0.2})
    
    if GameState.phase == "Command" then
        onCommandPhase()
    elseif GameState.phase == "End" then
        onEndPhase()
    end
    
    -- Reset timer for new phase
    if GameState.timer_enabled then
        GameState.timer_start = os.time()
    end
    
    updateUI()
end

function nextTurn(player, value, id)
    GameState.turn = GameState.turn + 1
    GameState.phase_index = 0
    GameState.phase = "Command"
    GameState.cards_drawn_this_turn = {White = 0, Red = 0}
    
    -- Clear all Activated markers at start of new turn
    clearAllActivated()
    
    -- Alternate first player each turn
    if GameState.first_player == "White" then
        GameState.first_player = "Red"
    else
        GameState.first_player = "White"
    end
    GameState.active_player = GameState.first_player
    
    if GameState.turn > GameState.max_turns then
        -- ═══ GAME OVER — Comprehensive Summary ═══
        local wVP = GameState.player_vp.White or 0
        local rVP = GameState.player_vp.Red or 0
        local winner = "TIE"
        if wVP > rVP then winner = "Player 1 (White)" 
        elseif rVP > wVP then winner = "Player 2 (Red)" end
        
        -- Calculate game duration
        local duration = ""
        if GameState.game_start_time and GameState.game_start_time > 0 then
            local elapsed = os.time() - GameState.game_start_time
            local mins = math.floor(elapsed / 60)
            local secs = elapsed % 60
            duration = mins .. "m " .. secs .. "s"
        end
        
        -- Combat stats from log
        local total_hits = 0
        local total_crits = 0
        local total_dmg_log = 0
        local total_combats = #GameState.combat_log
        for _, e in ipairs(GameState.combat_log) do
            total_hits = total_hits + (e.hits or 0)
            total_crits = total_crits + (e.crits or 0)
            total_dmg_log = total_dmg_log + (e.dmg or 0)
        end
        
        -- Count surviving units (any object with HP tracking still alive)
        local alive_white = 0
        local alive_red = 0
        local dead_count = 0
        for guid, data in pairs(GameState.unit_hp) do
            if data.current_hp and data.current_hp <= 0 then
                dead_count = dead_count + 1
            else
                -- Try to determine owner by position (z < 0 = White, z > 0 = Red)
                local obj = getObjectFromGUID(guid)
                if obj then
                    local pos = obj.getPosition()
                    if pos.z < 0 then alive_white = alive_white + 1
                    else alive_red = alive_red + 1 end
                end
            end
        end
        
        broadcastToAll("\\n══════════════════════════════════════\\n" ..
                       "           ⚔ GAME OVER ⚔\\n" ..
                       "══════════════════════════════════════\\n\\n" ..
                       "🏆 " .. (winner == "TIE" and "IT'S A TIE!" or winner .. " WINS!") .. "\\n\\n" ..
                       "── Victory Points ──\\n" ..
                       "  ⬜ White: " .. wVP .. " VP\\n" ..
                       "  🟥 Red:   " .. rVP .. " VP\\n\\n" ..
                       "── Kill Tally ──\\n" ..
                       "  ⬜ White kills: " .. (GameState.kills.White or 0) .. "\\n" ..
                       "  🟥 Red kills:   " .. (GameState.kills.Red or 0) .. "\\n\\n" ..
                       "── Battle Statistics ──\\n" ..
                       "  ⚔ Total combats resolved: " .. total_combats .. "\\n" ..
                       "  🎯 Total hits landed: " .. total_hits .. "\\n" ..
                       "  💥 Critical hits (6s): " .. total_crits .. "\\n" ..
                       "  💀 Total damage dealt: " .. total_dmg_log .. "\\n" ..
                       "  🗡 Units destroyed: " .. dead_count .. "\\n\\n" ..
                       (duration ~= "" and ("⏱ Game duration: " .. duration .. "\\n") or "") ..
                       "\\n══════════════════════════════════════\\n" ..
                       "Type !reset to start a new game.", {1, 0.8, 0.2})
        
        GameState.phase = "Game Over"
        updateUI()
        return
    end
    
    broadcastToAll("═══════════════════════\\n   TURN " .. GameState.turn .. " BEGINS\\n" ..
                   "   First Player: " .. GameState.first_player ..
                   "\\n═══════════════════════", {0.2, 1, 0.4})
    
    if GameState.timer_enabled then
        GameState.timer_start = os.time()
    end
    
    onCommandPhase()
    updateUI()
end

function startGame()
    GameState.game_started = true
    GameState.turn = 1
    GameState.phase = "Command"
    GameState.phase_index = 1
    GameState.player_cp = {White = 3, Red = 3}
    GameState.player_fragments = {White = 0, Red = 0}
    GameState.player_vp = {White = 0, Red = 0}
    GameState.game_start_time = os.time()
    GameState.first_player = "White"
    GameState.active_player = "White"
    
    broadcastToAll("═══════════════════════\n   SHARDBORNE BEGINS!\n   Turn 1 — Command Phase\n═══════════════════════\n\nBoth players start with 3 CP.\nDraw your starting hand of 5 cards.\n\nType !help for all commands.", {1, 0.8, 0.2})
    if GameState.timer_enabled then
        GameState.timer_start = os.time()
    end
    updateUI()
end

-- ════════════════════════════════════════
-- SETUP WIZARD
-- ════════════════════════════════════════

-- Helper: find object by nickname
function findObjectByName(name)
    for _, obj in ipairs(getAllObjects()) do
        if obj.getName() == name then return obj end
    end
    return nil
end

-- Helper: find objects by tag
function findObjectsByTag(tag)
    local results = {}
    for _, obj in ipairs(getAllObjects()) do
        if obj.hasTag and obj.hasTag(tag) then
            table.insert(results, obj)
        end
    end
    return results
end

-- Map names available in the Map Variants bag
local MAP_NAMES = {"OpenPlains", "VolcanicWastes", "DarkForest", "IronFortress", "ShadowRuins", "SacredGrounds"}

local MAP_DISPLAY = {
    OpenPlains = "🌾 Open Plains",
    VolcanicWastes = "🌋 Volcanic Wastes",
    DarkForest = "🌲 Dark Forest",
    IronFortress = "🏰 Iron Fortress",
    ShadowRuins = "🏚 Shadow Ruins",
    SacredGrounds = "⛩ Sacred Grounds",
}

-- Faction IDs mapped to bag names and display names
local SETUP_FACTIONS = {
    {id = "emberclaw-warpack",    bag = "🏴 Emberclaw Warpack",    display = "🔥 Emberclaw Warpack"},
    {id = "iron-dominion",        bag = "🏴 Iron Dominion",        display = "⚙ Iron Dominion"},
    {id = "nightfang-dominion",   bag = "🏴 Nightfang Dominion",   display = "🦇 Nightfang Dominion"},
    {id = "thornweft-matriarchy", bag = "🏴 Thornweft Matriarchy", display = "🌿 Thornweft Matriarchy"},
    {id = "veilbound-shogunate",  bag = "🏴 Veilbound Shogunate",  display = "👁 Veilbound Shogunate"},
}

-- Scenario data for the wizard
local SETUP_SCENARIOS = {
    {id = "KingOfTheHill", name = "King of the Hill",  desc = "Control the center for 2 VP/turn."},
    {id = "Shardstorm",    name = "Shardstorm",        desc = "Fragment shards rain each turn."},
    {id = "TheLastStand",  name = "The Last Stand",    desc = "Defender holds, attacker captures."},
    {id = "TotalWar",      name = "Total War",         desc = "All-out combat. Kill = VP."},
    {id = "SupplyLines",   name = "Supply Lines",      desc = "Control supply caches for bonus CP."},
    {id = "BrokenGround",  name = "Broken Ground",     desc = "Devastated field, 5 objectives."},
}

function openSetupWizard(player, value, id)
    if GameState.game_started then
        printToAll("⚠ Game already in progress! Use !reset to start over.", {1, 0.5, 0.2})
        return
    end
    
    GameState.setup.step = 1
    GameState.setup.p1_ready = false
    GameState.setup.p2_ready = false
    
    showSetupStep(1)
    UI.setAttribute("setupPanel", "active", "true")
    broadcastToAll("⚙ Setup Wizard started! Player 1 (White) leads the setup.\nAll players can see choices.", {0.5, 1, 0.5})
end

function closeSetupWizard(player, value, id)
    UI.setAttribute("setupPanel", "active", "false")
    GameState.setup.step = 0
    printToAll("⚙ Setup Wizard closed.", {0.7, 0.7, 0.7})
end

function showSetupStep(step)
    GameState.setup.step = step
    
    -- Hide all step panels
    for i = 1, 7 do
        local panelId = "setupStep" .. i
        pcall(function() UI.setAttribute(panelId, "active", "false") end)
    end
    -- Also hide step 4 (used for both P1 and P2 faction)
    
    -- Show current step panel
    local panel_map = {
        [1] = "setupStep1",
        [2] = "setupStep2",
        [3] = "setupStep3",
        [4] = "setupStep4",
        [5] = "setupStep4",  -- Reuse faction panel for P2
        [6] = "setupStep6",
        [7] = "setupStep7",
    }
    
    local activePanel = panel_map[step]
    if activePanel then
        UI.setAttribute(activePanel, "active", "true")
    end
    
    -- Update step text and description
    local step_titles = {
        [1] = "Step 1 of 7: Select Battle Size",
        [2] = "Step 2 of 7: Select Map",
        [3] = "Step 3 of 7: Select Scenario",
        [4] = "Step 4 of 7: Player 1 — Choose Faction",
        [5] = "Step 5 of 7: Player 2 — Choose Faction",
        [6] = "Step 6 of 7: Army Building",
        [7] = "Step 7 of 7: Deployment",
    }
    
    local step_descs = {
        [1] = "Choose the scale of your battle.",
        [2] = "Select the battlefield map.",
        [3] = "Choose a scenario or pick randomly.",
        [4] = "Player 1 (White): Choose your faction.",
        [5] = "Player 2 (Red): Choose your faction.",
        [6] = "Pull units from your faction bag. Stay within point budget.",
        [7] = "Deploy units to your deployment zone, then begin!",
    }
    
    UI.setAttribute("setupStepText", "text", step_titles[step] or ("Step " .. step))
    UI.setAttribute("setupDesc", "text", step_descs[step] or "")
    
    -- Update summary bar
    local s = GameState.setup
    local size_str = s.battle_size and s.battle_size:sub(1,1):upper() .. s.battle_size:sub(2) or "--"
    local map_str = s.map_choice ~= "" and s.map_choice or "--"
    local scen_str = s.scenario_name ~= "" and s.scenario_name or "--"
    UI.setAttribute("setupSummary", "text", 
        "Size: " .. size_str .. " (" .. s.points_limit .. "pts) | Map: " .. map_str .. " | Scenario: " .. scen_str)
    
    -- If step 5, disable the faction P1 already picked
    if step == 5 then
        local faction_buttons = {
            ["emberclaw-warpack"] = "facEmberclaw",
            ["iron-dominion"] = "facIronDominion",
            ["nightfang-dominion"] = "facNightfang",
            ["thornweft-matriarchy"] = "facThornweft",
            ["veilbound-shogunate"] = "facVeilbound",
        }
        -- Re-enable all first
        for _, btnId in pairs(faction_buttons) do
            UI.setAttribute(btnId, "interactable", "true")
            UI.setAttribute(btnId, "color", UI.getAttribute(btnId, "color") or "#333333")
        end
        -- Disable the one P1 picked
        local disableBtn = faction_buttons[s.p1_faction]
        if disableBtn then
            UI.setAttribute(disableBtn, "interactable", "false")
            UI.setAttribute(disableBtn, "color", "#222222")
        end
    elseif step == 4 then
        -- Re-enable all faction buttons for P1
        local faction_buttons = {"facEmberclaw", "facIronDominion", "facNightfang", "facThornweft", "facVeilbound"}
        for _, btnId in ipairs(faction_buttons) do
            UI.setAttribute(btnId, "interactable", "true")
        end
    end
    
    -- If step 6, update point displays
    if step == 6 then
        updateArmyBuildDisplay()
    end
end

function setupGoBack(player, value, id)
    local step = GameState.setup.step
    if step <= 1 then
        closeSetupWizard()
        return
    end
    showSetupStep(step - 1)
end

-- ── Step 1: Battle Size ──

function setupSelectBattleSize(player, value, id)
    local sizes = {
        btnSkirmish = {name = "skirmish", points = 75,  max_turns = 5, desc = "Skirmish (50-100 pts)"},
        btnStandard = {name = "standard", points = 250, max_turns = 6, desc = "Standard (200-300 pts)"},
        btnEpic     = {name = "epic",     points = 500, max_turns = 7, desc = "Epic (500+ pts)"},
    }
    
    local selected = sizes[id]
    if not selected then return end
    
    GameState.setup.battle_size = selected.name
    GameState.setup.points_limit = selected.points
    GameState.max_turns = selected.max_turns
    
    broadcastToAll("⚙ Battle Size: " .. selected.desc .. "\nPoint Budget: " .. selected.points .. " pts | " .. selected.max_turns .. " turns", {0.5, 1, 0.5})
    
    showSetupStep(2)
end

-- ── Step 2: Map Selection ──

function setupSelectMap(player, value, id)
    local map_lookup = {
        mapOpenPlains = "OpenPlains",
        mapVolcanicWastes = "VolcanicWastes",
        mapDarkForest = "DarkForest",
        mapIronFortress = "IronFortress",
        mapShadowRuins = "ShadowRuins",
        mapSacredGrounds = "SacredGrounds",
        mapRandom = "random",
    }
    
    local mapName = map_lookup[id]
    if not mapName then return end
    
    -- Handle random
    if mapName == "random" then
        mapName = MAP_NAMES[math.random(#MAP_NAMES)]
        broadcastToAll("🎲 Random map selected!", {0.7, 0.7, 1})
    end
    
    GameState.setup.map_choice = mapName
    local display = MAP_DISPLAY[mapName] or mapName
    broadcastToAll("⚙ Map: " .. display, {0.5, 1, 0.5})
    
    -- Attempt to swap the game board
    swapGameBoard(mapName)
    
    showSetupStep(3)
end

function swapGameBoard(mapName)
    local mapBag = findObjectByName("🗺️ Map Variants")
    if not mapBag then
        printToAll("⚠ Map Variants bag not found. Place map manually.", {1, 0.5, 0.2})
        return
    end
    
    -- Search inside the map bag for the map
    local objects = mapBag.getObjects()
    local targetIdx = nil
    for i, entry in ipairs(objects) do
        if entry.name == mapName or entry.nickname == mapName then
            targetIdx = entry.index
            break
        end
    end
    
    if not targetIdx then
        -- Try partial match
        for i, entry in ipairs(objects) do
            if (entry.name and entry.name:find(mapName)) or (entry.nickname and entry.nickname:find(mapName)) then
                targetIdx = entry.index
                break
            end
        end
    end
    
    if not targetIdx then
        printToAll("⚠ Map '" .. mapName .. "' not found in Map Variants bag.", {1, 0.5, 0.2})
        return
    end
    
    -- Find and remove the current game board
    local currentBoard = findObjectByName("Game Board")
    if currentBoard then
        currentBoard.destruct()
    end
    
    -- Pull the new map from the bag
    mapBag.takeObject({
        index = targetIdx,
        position = {0, 1, 0},
        rotation = {0, 180, 0},
        smooth = true,
        callback_function = function(obj)
            obj.setLock(true)
            obj.setName("Game Board")
            obj.setScale({2.0, 1.0, 2.0})
            printToAll("🗺️ Map placed: " .. (MAP_DISPLAY[mapName] or mapName), {0.5, 1, 0.5})
        end
    })
end

-- ── Step 3: Scenario Selection ──

function setupSelectScenario(player, value, id)
    local scen_lookup = {
        scenKingOfTheHill = "King of the Hill",
        scenShardstorm = "Shardstorm",
        scenTheLastStand = "The Last Stand",
        scenTotalWar = "Total War",
        scenSupplyLines = "Supply Lines",
        scenBrokenGround = "Broken Ground",
        scenRandom = "random",
    }
    
    local scenName = scen_lookup[id]
    if not scenName then return end
    
    if scenName == "random" then
        local names = {"King of the Hill", "Shardstorm", "The Last Stand", "Total War", "Supply Lines", "Broken Ground"}
        scenName = names[math.random(#names)]
        broadcastToAll("🎲 Random scenario selected!", {0.7, 0.7, 1})
    end
    
    GameState.setup.scenario_name = scenName
    
    -- Find and display scenario details
    local scen_details = {
        ["King of the Hill"] = "Control the center objective for 2 VP per turn. Side objectives worth 1 VP each.",
        ["Shardstorm"] = "Fragment shards rain from the sky! Collect fragments for bonus VP.",
        ["The Last Stand"] = "Player 1 defends 3 objectives. Player 2 must capture 2 of 3 by Turn 5.",
        ["Total War"] = "All-out conflict. Unit kill = 1 VP, Commander kill = 5 VP.",
        ["Supply Lines"] = "4 supply caches. Each controlled = +1 CP per turn.",
        ["Broken Ground"] = "Devastated battlefield. 5 objectives, 1 VP each per turn controlled.",
    }
    
    broadcastToAll("⚙ Scenario: " .. scenName .. "\n" .. (scen_details[scenName] or ""), {0.5, 1, 0.5})
    
    showSetupStep(4)
end

-- ── Step 4 & 5: Faction Selection ──

function setupSelectFaction(player, value, id)
    local fac_lookup = {
        facEmberclaw = "emberclaw-warpack",
        facIronDominion = "iron-dominion",
        facNightfang = "nightfang-dominion",
        facThornweft = "thornweft-matriarchy",
        facVeilbound = "veilbound-shogunate",
    }
    
    local fac_display_lookup = {
        facEmberclaw = "Emberclaw Warpack",
        facIronDominion = "Iron Dominion",
        facNightfang = "Nightfang Dominion",
        facThornweft = "Thornweft Matriarchy",
        facVeilbound = "Veilbound Shogunate",
    }
    
    local factionId = fac_lookup[id]
    local factionDisplay = fac_display_lookup[id]
    if not factionId then return end
    
    local step = GameState.setup.step
    
    if step == 4 then
        -- Player 1 picks
        GameState.setup.p1_faction = factionId
        broadcastToAll("⚙ Player 1 (White): " .. factionDisplay, {0.5, 1, 0.5})
        
        -- Move faction bag to P1 side
        moveFactionBagToPlayer(factionId, 1)
        
        showSetupStep(5)
    elseif step == 5 then
        -- Player 2 picks  
        if factionId == GameState.setup.p1_faction then
            printToAll("⚠ That faction is already taken by Player 1!", {1, 0.5, 0.2})
            return
        end
        
        GameState.setup.p2_faction = factionId
        broadcastToAll("⚙ Player 2 (Red): " .. factionDisplay, {0.5, 1, 0.5})
        
        -- Move faction bag to P2 side
        moveFactionBagToPlayer(factionId, 2)
        
        showSetupStep(6)
    end
end

function moveFactionBagToPlayer(factionId, playerNum)
    -- Find the faction bag by name
    local fac_bag_names = {
        ["emberclaw-warpack"] = "🏴 Emberclaw Warpack",
        ["iron-dominion"] = "🏴 Iron Dominion",
        ["nightfang-dominion"] = "🏴 Nightfang Dominion",
        ["thornweft-matriarchy"] = "🏴 Thornweft Matriarchy",
        ["veilbound-shogunate"] = "🏴 Veilbound Shogunate",
    }
    
    local bagName = fac_bag_names[factionId]
    if not bagName then return end
    
    local bag = findObjectByName(bagName)
    if not bag then
        printToAll("⚠ Faction bag '" .. bagName .. "' not found.", {1, 0.5, 0.2})
        return
    end
    
    -- Move to player side
    local positions = {
        [1] = {x = -25, y = 2, z = -35},   -- Player 1 (White) side
        [2] = {x = 25, y = 2, z = -35},    -- Player 2 (Red) side
    }
    
    local pos = positions[playerNum]
    bag.setPositionSmooth(pos)
    
    printToAll("📦 " .. bagName .. " moved to Player " .. playerNum .. "'s area.", {0.5, 0.8, 1})
end

-- ── Step 6: Army Building ──

function updateArmyBuildDisplay()
    local limit = GameState.setup.points_limit
    local p1pts, p2pts = scanPlayerPoints()
    
    local p1_color = p1pts > limit and "#FF4444" or "#88FF88"
    local p2_color = p2pts > limit and "#FF4444" or "#FF8888"
    
    UI.setAttribute("armyP1Status", "text", "Player 1 (White): " .. p1pts .. " / " .. limit .. " pts")
    UI.setAttribute("armyP1Status", "color", p1_color)
    UI.setAttribute("armyP2Status", "text", "Player 2 (Red): " .. p2pts .. " / " .. limit .. " pts")
    UI.setAttribute("armyP2Status", "color", p2_color)
    
    UI.setAttribute("armyBuildInfo", "text", 
        "Pull units from your faction bag.\\nStay within " .. limit .. " point budget.")
    
    -- Update ready button states
    if GameState.setup.p1_ready then
        UI.setAttribute("btnP1Ready", "color", "#224422")
        UI.setAttribute("btnP1Ready", "textColor", "#44AA44")
    else
        UI.setAttribute("btnP1Ready", "color", "#335533")
        UI.setAttribute("btnP1Ready", "textColor", "#44FF88")
    end
    
    if GameState.setup.p2_ready then
        UI.setAttribute("btnP2Ready", "color", "#442222")
        UI.setAttribute("btnP2Ready", "textColor", "#AA4444")
    else
        UI.setAttribute("btnP2Ready", "color", "#553333")
        UI.setAttribute("btnP2Ready", "textColor", "#FF8844")
    end
end

function scanPlayerPoints()
    local p1_points = 0
    local p2_points = 0
    local p1_faction = GameState.setup.p1_faction
    local p2_faction = GameState.setup.p2_faction
    
    for _, obj in ipairs(getAllObjects()) do
        local desc = obj.getDescription() or ""
        local tags = obj.getTags and obj.getTags() or {}
        
        -- Check if it's a game piece with points
        local pts = desc:match("Points:%s*(%d+)")
        if pts then
            pts = tonumber(pts)
            local obj_faction = ""
            for _, tag in ipairs(tags) do
                if tag:match("warpack") or tag:match("dominion") or tag:match("matriarchy") or tag:match("shogunate") then
                    obj_faction = tag
                end
            end
            
            -- Determine which player owns it based on faction
            if obj_faction == p1_faction then
                p1_points = p1_points + pts
            elseif obj_faction == p2_faction then
                p2_points = p2_points + pts
            end
        end
    end
    
    return p1_points, p2_points
end

function setupScanArmy(player, value, id)
    updateArmyBuildDisplay()
    
    local limit = GameState.setup.points_limit
    local p1pts, p2pts = scanPlayerPoints()
    
    printToAll("🔄 Army Point Scan:", {0.5, 0.8, 1})
    printToAll("  Player 1: " .. p1pts .. " / " .. limit .. " pts" .. (p1pts > limit and " ⚠ OVER BUDGET!" or " ✅"), 
              p1pts > limit and {1, 0.3, 0.3} or {0.3, 1, 0.3})
    printToAll("  Player 2: " .. p2pts .. " / " .. limit .. " pts" .. (p2pts > limit and " ⚠ OVER BUDGET!" or " ✅"), 
              p2pts > limit and {1, 0.3, 0.3} or {0.3, 1, 0.3})
end

function setupValidateArmy(player, value, id)
    -- Trigger full army validation via the existing validate function
    validateArmy()
    updateArmyBuildDisplay()
end

function setupPlayerReady(player, value, id)
    if id == "btnP1Ready" then
        GameState.setup.p1_ready = not GameState.setup.p1_ready
        local state = GameState.setup.p1_ready and "READY" or "NOT READY"
        broadcastToAll("Player 1 (White): " .. state, {0.5, 1, 0.5})
    elseif id == "btnP2Ready" then
        GameState.setup.p2_ready = not GameState.setup.p2_ready
        local state = GameState.setup.p2_ready and "READY" or "NOT READY"
        broadcastToAll("Player 2 (Red): " .. state, {1, 0.5, 0.5})
    end
    
    updateArmyBuildDisplay()
    
    -- If both ready, advance to deployment
    if GameState.setup.p1_ready and GameState.setup.p2_ready then
        local limit = GameState.setup.points_limit
        local p1pts, p2pts = scanPlayerPoints()
        
        -- Warn but don't block if over budget
        if p1pts > limit then
            printToAll("⚠ Player 1 is over budget! (" .. p1pts .. "/" .. limit .. ")", {1, 0.5, 0.2})
        end
        if p2pts > limit then
            printToAll("⚠ Player 2 is over budget! (" .. p2pts .. "/" .. limit .. ")", {1, 0.5, 0.2})
        end
        
        broadcastToAll("✅ Both players ready! Moving to Deployment Phase.", {0.3, 1, 0.3})
        showSetupStep(7)
    end
end

-- ── Step 7: Deployment & Game Start ──

function setupBeginGame(player, value, id)
    -- Close setup panel
    UI.setAttribute("setupPanel", "active", "false")
    
    -- Hide setup button on main panel
    UI.setAttribute("btnSetup", "active", "false")
    
    -- Configure game state from setup choices
    local s = GameState.setup
    
    -- Set faction-specific pools based on selected factions
    initFactionPools(s.p1_faction, s.p2_faction)
    
    -- Start the game
    GameState.game_started = true
    GameState.turn = 1
    GameState.phase = "Command"
    GameState.phase_index = 1
    GameState.player_cp = {White = 3, Red = 3}
    GameState.player_fragments = {White = 0, Red = 0}
    GameState.player_vp = {White = 0, Red = 0}
    
    local p1pts, p2pts = scanPlayerPoints()
    
    broadcastToAll(
        "═══════════════════════════════════\n" ..
        "    ⚔ SHARDBORNE BEGINS! ⚔\n" ..
        "═══════════════════════════════════\n\n" ..
        "Battle: " .. s.battle_size:sub(1,1):upper() .. s.battle_size:sub(2) .. " (" .. s.points_limit .. " pts)\n" ..
        "Map: " .. (MAP_DISPLAY[s.map_choice] or s.map_choice) .. "\n" ..
        "Scenario: " .. s.scenario_name .. "\n\n" ..
        "P1 (" .. getFactionDisplayName(s.p1_faction) .. "): " .. p1pts .. " pts\n" ..
        "P2 (" .. getFactionDisplayName(s.p2_faction) .. "): " .. p2pts .. " pts\n\n" ..
        "Turn 1 — Command Phase\n" ..
        "Both players start with 3 CP.\n" ..
        "Draw your starting hand of 5 cards.\n\n" ..
        "Type !help for all commands.",
        {1, 0.8, 0.2})
    
    if GameState.timer_enabled then
        GameState.timer_start = os.time()
    end
    updateUI()
end

function initFactionPools(p1_faction, p2_faction)
    local fp = GameState.faction_pools
    
    -- Reset all pools
    fp.heat = 0
    fp.hunger = 0
    fp.flow = 0
    fp.fate_threads = 0
    fp.anchors = 0
    fp.fragment_charges = 0
    fp.stance = "none"
    
    -- Initialize based on factions in play
    local factions_in_play = {p1_faction, p2_faction}
    for _, fac in ipairs(factions_in_play) do
        if fac == "emberclaw-warpack" then
            printToAll("🔥 Emberclaw: Heat pool initialized (0/15). Overheat at >15!", {1, 0.5, 0})
        elseif fac == "nightfang-dominion" then
            printToAll("🦇 Nightfang: Hunger pool initialized. Feed to empower!", {0.8, 0, 0.3})
        elseif fac == "thornweft-matriarchy" then
            fp.flow = 5
            printToAll("🌿 Thornweft: Flow pool initialized at 5/40.", {0.3, 0.8, 0.2})
        elseif fac == "veilbound-shogunate" then
            fp.stance = "honor"
            printToAll("👁 Veilbound: Stance set to Honor. Fate Threads: 0.", {0.6, 0.4, 0.8})
        elseif fac == "iron-dominion" then
            printToAll("⚙ Iron Dominion: Anchors and Fragment Charges ready.", {0.5, 0.6, 0.7})
        end
    end
end

function getFactionDisplayName(factionId)
    local names = {
        ["emberclaw-warpack"] = "Emberclaw Warpack",
        ["iron-dominion"] = "Iron Dominion",
        ["nightfang-dominion"] = "Nightfang Dominion",
        ["thornweft-matriarchy"] = "Thornweft Matriarchy",
        ["veilbound-shogunate"] = "Veilbound Shogunate",
    }
    return names[factionId] or factionId
end

-- ════════════════════════════════════════
-- PHASE TRIGGERS
-- ════════════════════════════════════════

function onCommandPhase()
    local cp_gain = 3
    for _, p in ipairs(GameState.players) do
        GameState.player_cp[p] = (GameState.player_cp[p] or 0) + cp_gain
    end
    printToAll("⚡ Both players gain +" .. cp_gain .. " CP", {1, 0.85, 0.3})
    printToAll("📋 Play cards, activate abilities, draw 2 cards (hand limit 7)", {0.7, 0.7, 0.7})
    
    -- Faction-specific Command Phase triggers
    local fp = GameState.faction_pools
    
    -- Emberclaw: Heat cools then generates
    if fp.heat > 0 then
        local old_heat = fp.heat
        fp.heat = math.max(0, fp.heat - 3)
        printToAll("🔥 Emberclaw: Heat cools -3 (" .. old_heat .. " → " .. fp.heat .. ")", {1, 0.5, 0})
        printToAll("   Generate Heat: +1 per Fire unit, +2 per Breath Weapon, +1 per Drake Bond pair within 8\"", {0.7, 0.5, 0.3})
    end
    
    -- Veilbound: Flow generation + stance reminder
    if fp.flow > 0 or fp.stance ~= "none" then
        printToAll("🌀 Veilbound: Generate Ritual Flow from units. Switch stances now (free action).", {0.4, 0.6, 1})
        local flow_tier = "Below Stirring"
        if fp.flow >= 30 then flow_tier = "ASCENDANT"
        elseif fp.flow >= 20 then flow_tier = "Overflowing"
        elseif fp.flow >= 12 then flow_tier = "Surging"
        elseif fp.flow >= 5 then flow_tier = "Stirring" end
        printToAll("   Flow Pool: " .. fp.flow .. "/40 (" .. flow_tier .. ")", {0.4, 0.5, 0.8})
    end
    
    -- Thornweft: Web-Anchor placement
    if fp.anchors > 0 or fp.fate_threads > 0 then
        printToAll("🕸 Thornweft: Place 1 Web-Anchor within 8\" of a friendly unit. Anchors: " .. fp.anchors, {0.3, 0.8, 0.6})
        printToAll("   Fate-Threads remaining: " .. fp.fate_threads .. " | Web-Spinners may place 1 extra Anchor", {0.3, 0.6, 0.5})
    end
    
    -- Iron Dominion: Grid Cohesion + Fragment Charges
    if fp.fragment_charges > 0 then
        printToAll("⚙ Iron Dominion: Calculate Grid Cohesion (count allies within 4\" of each unit).", {0.6, 0.6, 0.8})
        printToAll("   Fragment Charges: " .. fp.fragment_charges .. " | Generate +1 per unit within 8\" of War Machine", {0.5, 0.5, 0.7})
    end
    
    -- Nightfang: Hunger Pool status
    if fp.hunger > 0 then
        local hunger_tier = "Below Peckish"
        if fp.hunger >= 15 then hunger_tier = "GORGED"
        elseif fp.hunger >= 10 then hunger_tier = "Ravenous"
        elseif fp.hunger >= 5 then hunger_tier = "Peckish" end
        printToAll("🩸 Nightfang Hunger: " .. fp.hunger .. " kills (" .. hunger_tier .. ")", {0.7, 0, 0})
    end
end

function onEndPhase()
    printToAll("🏁 End Phase Checklist:", {0.9, 0.9, 0.5})
    printToAll("  ✓ Morale test for units at half HP or below (roll 2d6, pass if ≤ MOR)", {0.7, 0.7, 0.7})
    printToAll("  ✓ Score objectives (1 VP per controlled objective)", {0.7, 0.7, 0.7})
    printToAll("  ✓ Remove destroyed units, discard temp effects", {0.7, 0.7, 0.7})
    printToAll("  ✓ Check victory conditions", {0.7, 0.7, 0.7})
    
    -- Faction-specific End Phase reminders
    local fp = GameState.faction_pools
    
    if fp.heat > 0 then
        printToAll("  🔥 Emberclaw: Check for Overheat if Heat > 15", {1, 0.5, 0})
    end
    
    if fp.hunger > 0 then
        printToAll("  🩸 Nightfang: Non-NF units with Corruption that were NOT damaged remove 1 token (Natural Resistance)", {0.7, 0, 0})
    end
    
    if fp.anchors > 0 then
        printToAll("  🕸 Thornweft: Check Web-Anchor proximity. Severed units (0 Anchors within 8\") get -1 ATK, -1 MOR", {0.3, 0.8, 0.6})
    end
end

-- ════════════════════════════════════════
-- CP, FRAGMENT & VP TRACKING
-- ════════════════════════════════════════

function addCPWhite()  GameState.player_cp.White = (GameState.player_cp.White or 0) + 1; updateUI() end
function subCPWhite()  GameState.player_cp.White = math.max(0, (GameState.player_cp.White or 0) - 1); updateUI() end
function addCPRed()    GameState.player_cp.Red = (GameState.player_cp.Red or 0) + 1; updateUI() end
function subCPRed()    GameState.player_cp.Red = math.max(0, (GameState.player_cp.Red or 0) - 1); updateUI() end
function addFragWhite() GameState.player_fragments.White = (GameState.player_fragments.White or 0) + 1; updateUI() end
function subFragWhite() GameState.player_fragments.White = math.max(0, (GameState.player_fragments.White or 0) - 1); updateUI() end
function addFragRed()   GameState.player_fragments.Red = (GameState.player_fragments.Red or 0) + 1; updateUI() end
function subFragRed()   GameState.player_fragments.Red = math.max(0, (GameState.player_fragments.Red or 0) - 1); updateUI() end
function addVPWhite()   GameState.player_vp.White = (GameState.player_vp.White or 0) + 1; updateUI() end
function subVPWhite()   GameState.player_vp.White = math.max(0, (GameState.player_vp.White or 0) - 1); updateUI() end
function addVPRed()     GameState.player_vp.Red = (GameState.player_vp.Red or 0) + 1; updateUI() end
function subVPRed()     GameState.player_vp.Red = math.max(0, (GameState.player_vp.Red or 0) - 1); updateUI() end

-- ════════════════════════════════════════
-- COMBAT RESOLVER
-- ════════════════════════════════════════

function rollAttack(player)
    -- Open the combat panel
    UI.setAttribute("combatPanel", "active", "true")
    UI.setAttribute("combatResult", "text", " ")
end

function closeCombatPanel(player)
    UI.setAttribute("combatPanel", "active", "false")
end

function onCombatInput(player, value, id)
    -- Just store the values, resolved when button clicked
end

function resolveCombat(player)
    local atk_str = UI.getAttribute("atkInput", "text") or "4"
    local def_str = UI.getAttribute("defInput", "text") or "4"
    local atk = tonumber(atk_str) or 4
    local def = tonumber(def_str) or 4
    
    atk = math.min(atk, 30)
    
    local hits = 0
    local crits = 0
    local results = {}
    for i = 1, atk do
        local r = math.random(1, 6)
        table.insert(results, tostring(r))
        if r == 6 then
            crits = crits + 1
            hits = hits + 1
        elseif r >= def then
            hits = hits + 1
        end
    end
    local total_dmg = hits + crits
    
    local result_text = atk .. " dice vs DEF " .. def .. ": [" .. table.concat(results, ",") .. "]\n" ..
                        hits .. " hits, " .. crits .. " crits → " .. total_dmg .. " total damage"
    
    UI.setAttribute("combatResult", "text", result_text)
    
    broadcastToAll("⚔️ COMBAT: " .. atk .. " ATK dice vs DEF " .. def ..
                   "\nRolls: [" .. table.concat(results, ", ") .. "]" ..
                   "\nHits: " .. hits .. " | Crits (6s): " .. crits ..
                   " | Total Damage: " .. total_dmg, {1, 0.4, 0.3})
    
    -- Save to combat log
    table.insert(GameState.combat_log, {
        turn = GameState.turn,
        phase = GameState.phase,
        atk = atk, def = def,
        hits = hits, crits = crits,
        dmg = total_dmg,
        rolls = table.concat(results, ",")
    })
end

function rollMorale(player)
    local d1 = math.random(1, 6)
    local d2 = math.random(1, 6)
    local total = d1 + d2
    broadcastToAll("🎲 Morale Roll: " .. d1 .. " + " .. d2 .. " = " .. total ..
                   "\n  Pass if ≤ MOR   |   Fail by <3 → ⚡SHAKEN   |   Fail by 3+ → 💀ROUTED" ..
                   "\n  (Right-click a unit for auto Morale Test, or use !morale <MOR>)", {0.4, 0.8, 1})
end

function rollGeneric(player)
    local r = math.random(1, 6)
    broadcastToAll("🎲 " .. (player and player.steam_name or "Player") .. " rolls d6: " .. r, {0.8, 0.8, 1})
end

-- ════════════════════════════════════════
-- TIMER
-- ════════════════════════════════════════

function toggleTimer(player)
    GameState.timer_enabled = not GameState.timer_enabled
    if GameState.timer_enabled then
        GameState.timer_start = os.time()
        broadcastToAll("⏱ Turn timer ENABLED", {0.7, 0.7, 0.7})
        startTimerUpdate()
    else
        broadcastToAll("⏱ Turn timer DISABLED", {0.7, 0.7, 0.7})
        UI.setAttribute("timerText", "text", "⏱ --:--")
        UI.setAttribute("timerText", "color", "#666666")
    end
end

-- ════════════════════════════════════════
-- COMBAT LOG
-- ════════════════════════════════════════

function undoLastCombat(player)
    if #GameState.combat_log == 0 then
        printToAll("📋 No combat results logged yet.", {0.7, 0.7, 0.7})
        return
    end
    
    printToAll("═══ COMBAT LOG ═══", {1, 0.8, 0.3})
    local start = math.max(1, #GameState.combat_log - 4)
    for i = start, #GameState.combat_log do
        local c = GameState.combat_log[i]
        printToAll(string.format("  T%d %s: %dATK vs %dDEF → %d hits, %d crits, %d dmg [%s]",
            c.turn, c.phase, c.atk, c.def, c.hits, c.crits, c.dmg, c.rolls), {0.8, 0.8, 0.8})
    end
end

-- ════════════════════════════════════════
-- PANEL TOGGLE
-- ════════════════════════════════════════

local panelMinimized = false

function togglePanel(player)
    panelMinimized = not panelMinimized
    if panelMinimized then
        UI.setAttribute("mainPanel", "height", "60")
    else
        UI.setAttribute("mainPanel", "height", "780")
    end
end

-- ════════════════════════════════════════
-- FACTION MECHANIC POOLS
-- ════════════════════════════════════════

-- Heat Pool (Emberclaw) — max 15, overheat if exceeds
function addHeat()
    local fp = GameState.faction_pools
    fp.heat = fp.heat + 1
    checkOverheat()
    updateUI()
end
function subHeat()
    local fp = GameState.faction_pools
    fp.heat = math.max(0, fp.heat - 1)
    updateUI()
end

-- Hunger Pool (Nightfang) — grows from kills, never decreases
function addHunger()
    local fp = GameState.faction_pools
    fp.hunger = fp.hunger + 1
    checkHungerThresholds()
    updateUI()
end

-- Ritual Flow (Veilbound) — max 40
function addFlow()
    local fp = GameState.faction_pools
    fp.flow = math.min(40, fp.flow + 1)
    checkFlowThresholds()
    updateUI()
end
function subFlow()
    local fp = GameState.faction_pools
    fp.flow = math.max(0, fp.flow - 1)
    updateUI()
end

-- Fate-Threads (Thornweft) — finite, no regen
function subFate()
    local fp = GameState.faction_pools
    fp.fate_threads = math.max(0, fp.fate_threads - 1)
    printToAll("🕸 Fate-Thread spent! Remaining: " .. fp.fate_threads, {0.3, 0.8, 0.6})
    updateUI()
end

-- Web-Anchors (Thornweft)
function addAnchors()
    local fp = GameState.faction_pools
    fp.anchors = fp.anchors + 1
    printToAll("🕸 Web-Anchor placed! Total: " .. fp.anchors, {0.3, 0.8, 0.6})
    updateUI()
end
function subAnchors()
    local fp = GameState.faction_pools
    fp.anchors = math.max(0, fp.anchors - 1)
    printToAll("🕸 Web-Anchor removed! Total: " .. fp.anchors, {0.8, 0.3, 0.3})
    updateUI()
end

-- Fragment Charges (Iron Dominion)
function addFragCharges()
    local fp = GameState.faction_pools
    fp.fragment_charges = fp.fragment_charges + 1
    updateUI()
end

-- Veilbound Stances
function setStanceHonor()
    local fp = GameState.faction_pools
    if fp.stance == "honor" then
        fp.stance = "none"
        broadcastToAll("⚔ Stance cleared", {0.7, 0.7, 0.7})
    else
        fp.stance = "honor"
        broadcastToAll("🛡 HONOR STANCE activated\n+1 DEF, -1 ATK die, cannot be flanked", {0.4, 0.7, 0.9})
    end
    updateUI()
end

function setStanceRevelation()
    local fp = GameState.faction_pools
    if fp.stance == "revelation" then
        fp.stance = "none"
        broadcastToAll("⚔ Stance cleared", {0.7, 0.7, 0.7})
    else
        fp.stance = "revelation"
        broadcastToAll("⚔ REVELATION STANCE activated\n+1 ATK die, -1 DEF, +1 Ritual Flow this turn", {1, 0.5, 0.2})
    end
    updateUI()
end

-- Kill Counter
function addKillWhite()
    GameState.kills.White = GameState.kills.White + 1
    printToAll("⚰ White records a kill! Total: " .. GameState.kills.White, {0.8, 0.8, 0.8})
    updateUI()
end
function addKillRed()
    GameState.kills.Red = GameState.kills.Red + 1
    printToAll("⚰ Red records a kill! Total: " .. GameState.kills.Red, {1, 0.5, 0.5})
    updateUI()
end

-- ════════════════════════════════════════
-- FACTION THRESHOLD CHECKS
-- ════════════════════════════════════════

function checkOverheat()
    local fp = GameState.faction_pools
    if fp.heat > 15 then
        fp.heat = 10
        broadcastToAll("💥🔥 OVERHEAT! Heat exceeds 15!\n• Heat reduced to 10\n• All Emberclaw units suffer 1 damage\n• No Fragment cards next turn\n• Fire attacks deal +1 damage next turn", {1, 0.2, 0})
    elseif fp.heat >= 13 then
        printToAll("⚠ Heat at " .. fp.heat .. "/15 — Overheat danger!", {1, 0.5, 0})
    end
end

function checkHungerThresholds()
    local h = GameState.faction_pools.hunger
    -- Standard battle size thresholds (most common)
    if h == 5 then
        broadcastToAll("🩸 PECKISH (5 kills)\nAll Nightfang units gain +1 MOV!\nThe hunt begins...", {0.8, 0, 0})
    elseif h == 10 then
        broadcastToAll("🩸 RAVENOUS (10 kills)\nAll Nightfang units gain +1 ATK die!\nBlood frenzy spreads!", {0.8, 0, 0})
    elseif h == 15 then
        broadcastToAll("🩸 GORGED (15 kills)\nCommander heals 3 HP!\nAll units gain Blood Drain!", {0.8, 0, 0})
    end
end

function checkFlowThresholds()
    local f = GameState.faction_pools.flow
    if f == 5 then
        broadcastToAll("🌀 STIRRING (Flow: 5)\nTier 1 Flow abilities unlocked!", {0.4, 0.6, 1})
    elseif f == 12 then
        broadcastToAll("🌀 SURGING (Flow: 12)\nTier 2 unlocked! All Veilbound +1 MOR!", {0.4, 0.6, 1})
    elseif f == 20 then
        broadcastToAll("🌀 OVERFLOWING (Flow: 20)\nTier 3 unlocked! Commander plays 1 free card/turn!", {0.4, 0.6, 1})
    elseif f == 30 then
        broadcastToAll("🌀 ASCENDANT (Flow: 30)\nTier 4 unlocked! All Veilbound +1 ATK! Transformations!", {0.4, 0.6, 1})
    end
end

-- ════════════════════════════════════════
-- HP TRACKING (Right-Click Context Menus)
-- ════════════════════════════════════════

function onObjectSpawn(obj)
    Wait.frames(function()
        addHPContextMenu(obj)
    end, 3)
end

function addHPContextMenu(obj)
    if obj == nil then return end
    local desc = obj.getDescription() or ""
    local hp_str = desc:match("HP:%s*(%d+)")
    if not hp_str then return end
    
    local guid = obj.getGUID()
    local hp = tonumber(hp_str)
    
    -- Initialize HP tracking if not already tracked
    if not GameState.unit_hp[guid] then
        GameState.unit_hp[guid] = {
            max_hp = hp,
            current_hp = hp,
            name = obj.getName() or "Unknown"
        }
    end
    
    -- Add right-click context menu items
    obj.addContextMenuItem("Deal 1 Damage", function(pc) dealDamage(obj, 1) end)
    obj.addContextMenuItem("Deal 2 Damage", function(pc) dealDamage(obj, 2) end)
    obj.addContextMenuItem("Deal 3 Damage", function(pc) dealDamage(obj, 3) end)
    obj.addContextMenuItem("Heal 1 HP", function(pc) healUnit(obj, 1) end)
    obj.addContextMenuItem("Heal 2 HP", function(pc) healUnit(obj, 2) end)
    obj.addContextMenuItem("Show HP", function(pc) showHP(obj) end)
    obj.addContextMenuItem("Blood Tithe (-1HP +1ATK)", function(pc) bloodTithe(obj) end)
    obj.addContextMenuItem("Toggle ⚡Shaken", function(pc) toggleStatus(obj, "Shaken") end)
    obj.addContextMenuItem("Toggle ⚔Engaged", function(pc) toggleStatus(obj, "Engaged") end)
    obj.addContextMenuItem("Toggle 👁Stealthed", function(pc) toggleStatus(obj, "Stealthed") end)
    obj.addContextMenuItem("Toggle ✓Activated", function(pc) toggleStatus(obj, "Activated") end)
    obj.addContextMenuItem("Morale Test", function(pc) contextMoraleTest(obj) end)
    obj.addContextMenuItem("Show Full Stats", function(pc) showFullStats(obj) end)
end

-- ─── Status Effect Toggles ──────────────────────

function toggleStatus(obj, status)
    local guid = obj.getGUID()
    if not GameState.unit_statuses[guid] then
        GameState.unit_statuses[guid] = {}
    end
    local statuses = GameState.unit_statuses[guid]
    local name = obj.getName() or "Unit"
    
    if statuses[status] then
        statuses[status] = nil
        broadcastToAll("➖ " .. name .. ": " .. status .. " REMOVED", {0.5, 1, 0.5})
    else
        statuses[status] = true
        local effect_desc = {
            Shaken = "(-1 ATK die, must rally in Command Phase)",
            Engaged = "(cannot shoot, cannot move away freely)",
            Stealthed = "(hidden from ranged attacks >8\")",
            Activated = "(has acted this turn)",
        }
        broadcastToAll("➕ " .. name .. ": " .. status .. " " .. (effect_desc[status] or ""), {1, 0.7, 0.3})
    end
end

function getUnitStatuses(obj)
    local guid = obj.getGUID()
    if not GameState.unit_statuses[guid] then return "" end
    local parts = {}
    for status, _ in pairs(GameState.unit_statuses[guid]) do
        table.insert(parts, status)
    end
    if #parts == 0 then return "" end
    return table.concat(parts, ", ")
end

function clearAllActivated()
    for guid, statuses in pairs(GameState.unit_statuses) do
        if statuses then statuses["Activated"] = nil end
    end
    printToAll("✓ All Activated markers cleared for new turn.", {0.6, 0.8, 0.6})
end

-- ─── Context Menu Morale Test ──────────────────────

function contextMoraleTest(obj)
    local desc = obj.getDescription() or ""
    local mor = tonumber(desc:match("MOR:%s*(%d+)"))
    if not mor then
        printToAll("⚠ Cannot find MOR stat in this unit's description. Use !morale <MOR> instead.", {1, 0.5, 0.3})
        return
    end
    local name = obj.getName() or "Unit"
    local d1 = math.random(1, 6)
    local d2 = math.random(1, 6)
    local total = d1 + d2
    
    -- Check if Shaken already (affects result)
    local guid = obj.getGUID()
    local is_shaken = GameState.unit_statuses[guid] and GameState.unit_statuses[guid]["Shaken"]
    
    if total <= mor then
        if is_shaken then
            -- rallied
            GameState.unit_statuses[guid]["Shaken"] = nil
            broadcastToAll("🎲 MORALE: " .. name .. " rolls " .. d1 .. "+" .. d2 .. "=" .. total .. 
                           " vs MOR " .. mor .. "\n✅ RALLIED! Shaken status removed!", {0.3, 1, 0.3})
        else
            broadcastToAll("🎲 MORALE: " .. name .. " rolls " .. d1 .. "+" .. d2 .. "=" .. total .. 
                           " vs MOR " .. mor .. "\n✅ PASSED — unit holds firm!", {0.3, 1, 0.3})
        end
    else
        local margin = total - mor
        if margin < 3 then
            -- Shaken
            if not GameState.unit_statuses[guid] then GameState.unit_statuses[guid] = {} end
            GameState.unit_statuses[guid]["Shaken"] = true
            broadcastToAll("🎲 MORALE: " .. name .. " rolls " .. d1 .. "+" .. d2 .. "=" .. total .. 
                           " vs MOR " .. mor .. " (failed by " .. margin .. ")\n⚡ SHAKEN — -1 ATK die, must rally next Command Phase!", {1, 0.8, 0.2})
        else
            -- Routed
            broadcastToAll("🎲 MORALE: " .. name .. " rolls " .. d1 .. "+" .. d2 .. "=" .. total .. 
                           " vs MOR " .. mor .. " (failed by " .. margin .. ")\n💀 ROUTED — unit is DESTROYED! Remove from play!", {1, 0, 0})
        end
    end
end

-- ─── Show Full Stats ──────────────────────

function showFullStats(obj)
    local name = obj.getName() or "Unknown"
    local desc = obj.getDescription() or "No description"
    local guid = obj.getGUID()
    
    printToAll("═══ " .. name .. " ═══", {1, 0.8, 0.3})
    printToAll(desc, {0.8, 0.8, 0.8})
    
    -- HP status
    if GameState.unit_hp[guid] then
        local unit = GameState.unit_hp[guid]
        local pct = math.floor((unit.current_hp / unit.max_hp) * 100)
        local bar = ""
        local filled = math.floor(pct / 10)
        for i = 1, 10 do bar = bar .. (i <= filled and "█" or "░") end
        printToAll("❤ HP: " .. unit.current_hp .. "/" .. unit.max_hp .. " [" .. bar .. "] " .. pct .. "%", {0.8, 0.4, 0.4})
    end
    
    -- Active statuses
    local statuses = getUnitStatuses(obj)
    if statuses ~= "" then
        printToAll("🏷️ Status: " .. statuses, {1, 0.7, 0.3})
    end
end

function dealDamage(obj, amount)
    local guid = obj.getGUID()
    if not GameState.unit_hp[guid] then
        local desc = obj.getDescription() or ""
        local hp = tonumber(desc:match("HP:%s*(%d+)")) or 1
        GameState.unit_hp[guid] = {max_hp = hp, current_hp = hp, name = obj.getName() or "Unknown"}
    end
    
    local unit = GameState.unit_hp[guid]
    unit.current_hp = math.max(0, unit.current_hp - amount)
    local name = unit.name or obj.getName() or "Unit"
    
    broadcastToAll("💥 " .. name .. " takes " .. amount .. " damage! (" ..
                    unit.current_hp .. "/" .. unit.max_hp .. " HP)", {1, 0.4, 0.3})
    
    if unit.current_hp <= 0 then
        broadcastToAll("💀 " .. name .. " is DESTROYED!", {1, 0, 0})
        printToAll("   Use kill tracker (+) buttons to record kills", {0.6, 0.6, 0.6})
    elseif unit.current_hp <= math.floor(unit.max_hp / 2) then
        broadcastToAll("⚠ " .. name .. " at half HP or below — morale test required in End Phase!", {1, 0.7, 0.2})
    end
end

function healUnit(obj, amount)
    local guid = obj.getGUID()
    if not GameState.unit_hp[guid] then return end
    
    local unit = GameState.unit_hp[guid]
    unit.current_hp = math.min(unit.max_hp, unit.current_hp + amount)
    broadcastToAll("💚 " .. (unit.name or obj.getName()) .. " heals " .. amount ..
                    " HP! (" .. unit.current_hp .. "/" .. unit.max_hp .. " HP)", {0.3, 1, 0.3})
end

function showHP(obj)
    local guid = obj.getGUID()
    if not GameState.unit_hp[guid] then
        printToAll("No HP tracked for this object.", {0.7, 0.7, 0.7})
        return
    end
    local unit = GameState.unit_hp[guid]
    local pct = math.floor((unit.current_hp / unit.max_hp) * 100)
    local bar = ""
    local filled = math.floor(pct / 10)
    for i = 1, 10 do
        bar = bar .. (i <= filled and "█" or "░")
    end
    printToAll("❤ " .. (unit.name or "Unit") .. ": " .. unit.current_hp .. "/" .. unit.max_hp .. " HP [" .. bar .. "] " .. pct .. "%", {0.8, 0.8, 0.8})
end

function bloodTithe(obj)
    local guid = obj.getGUID()
    if not GameState.unit_hp[guid] then return end
    local unit = GameState.unit_hp[guid]
    if unit.current_hp <= 1 then
        printToAll("Cannot Blood Tithe — unit must have HP to spare (cannot drop below 1).", {1, 0.3, 0.3})
        return
    end
    unit.current_hp = unit.current_hp - 1
    broadcastToAll("🩸 BLOOD TITHE: " .. (unit.name or "Unit") .. " sacrifices 1 HP (" ..
                    unit.current_hp .. "/" .. unit.max_hp .. ")\n→ Gains +1 ATK die for next attack this turn!", {0.7, 0, 0.3})
end

-- ════════════════════════════════════════
-- DISTANCE MEASUREMENT
-- ════════════════════════════════════════

function onObjectPickUp(color, obj)
    table.insert(lastPickedUp, {obj = obj, pos = obj.getPosition(), name = obj.getName() or "Object"})
    if #lastPickedUp > 2 then
        table.remove(lastPickedUp, 1)
    end
end

function measureDistance()
    if #lastPickedUp < 2 then
        printToAll("📏 Pick up 2 objects first, then use !measure", {0.7, 0.7, 0.7})
        return
    end
    local a = lastPickedUp[#lastPickedUp - 1]
    local b = lastPickedUp[#lastPickedUp]
    local p1 = a.obj.getPosition()
    local p2 = b.obj.getPosition()
    local dx = p2.x - p1.x
    local dz = p2.z - p1.z
    local dist = math.sqrt(dx*dx + dz*dz)
    broadcastToAll(string.format("📏 Distance: %.1f\" between %s and %s", dist, a.name, b.name), {0.5, 0.8, 1})
    
    -- Check common ranges
    if dist <= 1 then
        printToAll("   → Within melee / engagement range (1\")", {0.7, 0.7, 0.7})
    elseif dist <= 4 then
        printToAll("   → Within Grid Cohesion range (4\") / Web-Anchor range (4\")", {0.7, 0.7, 0.7})
    elseif dist <= 8 then
        printToAll("   → Within Commander Aura (8\") / Drake Bond range (8\")", {0.7, 0.7, 0.7})
    end
end

-- ════════════════════════════════════════
-- ARMY VALIDATION
-- ════════════════════════════════════════

function validateArmy(player_color)
    local all_objs = getAllObjects()
    local total_points = 0
    local commanders = 0
    local units = 0
    local war_machines = 0
    local fragments = 0
    local faction_counts = {}
    
    for _, obj in ipairs(all_objs) do
        local tags = obj.getTags()
        local desc = obj.getDescription() or ""
        local name = obj.getName() or ""
        
        -- Check if object is on the table (not in bags)
        local pos = obj.getPosition()
        if pos.y > 0.5 and pos.y < 10 then
            -- Parse points from description
            local pts = desc:match("Points:%s*(%d+)")
            if pts then
                total_points = total_points + tonumber(pts)
                
                -- Count types
                if name:match("⭐") then
                    commanders = commanders + 1
                elseif name:match("💎") then
                    fragments = fragments + 1
                else
                    -- Check for unit types
                    local utype = desc:match("Type:%s*(%w+)")
                    if utype == "War" then
                        war_machines = war_machines + 1
                    end
                    units = units + 1
                end
                
                -- Track factions
                for _, tag in ipairs(tags) do
                    if tag:match("warpack") or tag:match("dominion") or tag:match("matriarchy") or tag:match("shogunate") then
                        faction_counts[tag] = (faction_counts[tag] or 0) + 1
                    end
                end
            end
        end
    end
    
    -- Determine battle size
    local size = "Unknown"
    local valid = true
    local issues = {}
    
    if total_points <= 100 then
        size = "Skirmish (50-100pts)"
        if war_machines > 0 then table.insert(issues, "No War Machines in Skirmish!") ; valid = false end
        if commanders > 1 then table.insert(issues, "Skirmish: max 1 commander") ; valid = false end
    elseif total_points <= 300 then
        size = "Standard (200-300pts)"
        if war_machines > 2 then table.insert(issues, "Standard: max 2 War Machines") ; valid = false end
        if commanders > 2 then table.insert(issues, "Standard: max 2 commanders") ; valid = false end
    else
        size = "Epic (500+pts)"
        if war_machines > 4 then table.insert(issues, "Epic: max 4 War Machines") ; valid = false end
    end
    
    if commanders == 0 then
        table.insert(issues, "Must include at least 1 Commander!")
        valid = false
    end
    
    local result = "═══ ARMY VALIDATION ═══\n"
    result = result .. "Total Points: " .. total_points .. "\n"
    result = result .. "Battle Size: " .. size .. "\n"
    result = result .. "Commanders: " .. commanders .. " | Units: " .. units .. "\n"
    result = result .. "War Machines: " .. war_machines .. " | Fragments: " .. fragments .. "\n"
    
    for fac, count in pairs(faction_counts) do
        result = result .. "  " .. fac .. ": " .. count .. " models\n"
    end
    
    if valid then
        result = result .. "\n✅ Army is VALID for " .. size
    else
        result = result .. "\n❌ INVALID:"
        for _, issue in ipairs(issues) do
            result = result .. "\n  • " .. issue
        end
    end
    
    printToAll(result, valid and {0.3, 1, 0.3} or {1, 0.3, 0.3})
end

-- ════════════════════════════════════════
-- CHAT COMMANDS
-- ════════════════════════════════════════

function onChat(message, player)
    local msg = string.lower(message)
    
    -- !roll XdY
    local count, sides = msg:match("!roll%s+(%d+)d(%d+)")
    if count and sides then
        count = tonumber(count)
        sides = tonumber(sides)
        local results = {}
        local total = 0
        for i = 1, math.min(count, 30) do
            local r = math.random(1, sides)
            table.insert(results, r)
            total = total + r
        end
        broadcastToAll("🎲 " .. player.steam_name .. " rolls " .. count .. "d" .. sides .. ": [" .. 
                       table.concat(results, ", ") .. "] = " .. total, {0.8, 0.8, 1})
        return false
    end
    
    -- !atk <ATK_dice> vs <DEF> [modifiers: charge flank rear cover heavy_cover elevated honor revelation]
    local atk_match, def_match, mods_match = msg:match("!atk%s+(%d+)%s+vs%s+(%d+)(.*)")
    if atk_match and def_match then
        atk = tonumber(atk_match)
        def = tonumber(def_match)
        local mod_text = {}
        
        -- Apply combat modifiers
        if mods_match then
            if mods_match:match("charge") then 
                atk = atk + 1
                table.insert(mod_text, "+1 ATK (Charge)")
            end
            if mods_match:match("flank") then
                atk = atk + 1
                table.insert(mod_text, "+1 ATK (Flank)")
            end
            if mods_match:match("rear") then
                atk = atk + 2
                table.insert(mod_text, "+2 ATK (Rear)")
            end
            if mods_match:match("elevated") then
                atk = atk + 1
                table.insert(mod_text, "+1 ATK (Elevated)")
            end
            if mods_match:match("dive") then
                atk = atk + 2
                table.insert(mod_text, "+2 ATK (Diving Charge)")
            end
            if mods_match:match("heavy_cover") then
                def = def + 2
                table.insert(mod_text, "+2 DEF (Heavy Cover)")
            elseif mods_match:match("cover") then
                def = def + 1
                table.insert(mod_text, "+1 DEF (Cover)")
            end
            if mods_match:match("honor") then
                def = def + 1
                atk = math.max(1, atk - 1)
                table.insert(mod_text, "Honor: +1 DEF, -1 ATK")
            end
            if mods_match:match("revelation") then
                atk = atk + 1
                def = math.max(1, def - 1)
                table.insert(mod_text, "Revelation: +1 ATK, -1 DEF")
            end
            if mods_match:match("grid_active") then
                atk = atk + 1
                table.insert(mod_text, "+1 ATK (Grid Active)")
            end
            if mods_match:match("grid_fortified") then
                atk = atk + 1
                def = def + 1
                table.insert(mod_text, "+1 ATK +1 DEF (Grid Fortified)")
            end
            if mods_match:match("isolated") then
                atk = math.max(1, atk - 1)
                table.insert(mod_text, "-1 ATK (Isolated)")
            end
            if mods_match:match("superheated") then
                table.insert(mod_text, "+1 dmg per hit (Superheated Strikes)")
            end
        end
        
        local hits = 0
        local crits = 0
        local results = {}
        for i = 1, math.min(atk, 30) do
            local r = math.random(1, 6)
            table.insert(results, r)
            if r == 6 then
                crits = crits + 1
                hits = hits + 1
            elseif r >= def then
                hits = hits + 1
            end
        end
        local total_dmg = hits + crits
        
        -- Superheated adds +1 per hit
        local superheated = mods_match and mods_match:match("superheated")
        if superheated then
            total_dmg = total_dmg + hits  -- +1 per hit (crits already counted in hits)
        end
        
        local mod_str = ""
        if #mod_text > 0 then
            mod_str = "\nModifiers: " .. table.concat(mod_text, ", ")
        end
        
        broadcastToAll("⚔️ ATTACK: " .. atk .. " dice vs DEF " .. def .. mod_str ..
                       "\nRolls: [" .. table.concat(results, ", ") .. "]" ..
                       "\nHits: " .. hits .. " | Crits (6s): " .. crits ..
                       " | Total Damage: " .. total_dmg, {1, 0.4, 0.3})
        
        table.insert(GameState.combat_log, {
            turn = GameState.turn, phase = GameState.phase,
            atk = atk, def = def, hits = hits, crits = crits,
            dmg = total_dmg, rolls = table.concat(results, ",")
        })
        return false
    end
    
    -- !morale <MOR>
    local mor = msg:match("!morale%s+(%d+)")
    if mor then
        mor = tonumber(mor)
        local d1 = math.random(1, 6)
        local d2 = math.random(1, 6)
        local total = d1 + d2
        if total <= mor then
            broadcastToAll("🎲 Morale Test vs MOR " .. mor .. ": " .. d1 .. "+" .. d2 .. "=" .. total .. 
                           "\n✅ PASSED — unit holds firm!", {0.3, 1, 0.3})
        else
            local margin = total - mor
            if margin < 3 then
                broadcastToAll("🎲 Morale Test vs MOR " .. mor .. ": " .. d1 .. "+" .. d2 .. "=" .. total ..
                               " (failed by " .. margin .. ")\n⚡ SHAKEN — -1 ATK die next activation. Must rally in Command Phase!", {1, 0.8, 0.2})
            else
                broadcastToAll("🎲 Morale Test vs MOR " .. mor .. ": " .. d1 .. "+" .. d2 .. "=" .. total ..
                               " (failed by " .. margin .. ")\n💀 ROUTED — unit is DESTROYED! Remove from play!", {1, 0, 0})
            end
        end
        return false
    end
    
    -- !army — validate army on table
    if msg:match("^!army") then
        validateArmy(player.color)
        return false
    end
    
    -- !vp <player> <amount> — set VP
    local vp_player, vp_amount = msg:match("!vp%s+(%w+)%s+([+-]?%d+)")
    if vp_player and vp_amount then
        vp_amount = tonumber(vp_amount)
        local key = vp_player:sub(1,1):upper() .. vp_player:sub(2):lower()
        if GameState.player_vp[key] then
            GameState.player_vp[key] = math.max(0, GameState.player_vp[key] + vp_amount)
            printToAll("🏆 " .. key .. " VP: " .. GameState.player_vp[key], {0.4, 1, 0.4})
            updateUI()
        end
        return false
    end
    
    -- !cp <player> <amount> — set CP
    local cp_player, cp_amount = msg:match("!cp%s+(%w+)%s+([+-]?%d+)")
    if cp_player and cp_amount then
        cp_amount = tonumber(cp_amount)
        local key = cp_player:sub(1,1):upper() .. cp_player:sub(2):lower()
        if GameState.player_cp[key] then
            GameState.player_cp[key] = math.max(0, GameState.player_cp[key] + cp_amount)
            printToAll("⚡ " .. key .. " CP: " .. GameState.player_cp[key], {1, 0.85, 0.3})
            updateUI()
        end
        return false
    end
    
    -- !scenario — generate random scenario
    if msg:match("^!scenario") then
        generateScenario()
        return false
    end
    
    -- !initiative — roll off for first player
    if msg:match("^!initiative") then
        local w = math.random(1, 6)
        local r = math.random(1, 6)
        while w == r do
            w = math.random(1, 6)
            r = math.random(1, 6)
        end
        local first = w > r and "White" or "Red"
        GameState.first_player = first
        GameState.active_player = first
        broadcastToAll("🎲 INITIATIVE ROLL\\n" ..
                       "  ⬜ White: " .. w .. "  |  🟥 Red: " .. r ..
                       "\\n  → " .. first .. " goes first this turn!", 
                       first == "White" and {0.8, 0.8, 1} or {1, 0.5, 0.5})
        updateUI()
        return false
    end
    
    -- !statuses — show all tracked unit statuses
    if msg:match("^!statuses") then
        printToAll("═══ UNIT STATUS EFFECTS ═══", {1, 0.8, 0.3})
        local any_found = false
        for guid, statuses in pairs(GameState.unit_statuses) do
            local parts = {}
            for status, _ in pairs(statuses) do
                table.insert(parts, status)
            end
            if #parts > 0 then
                local obj = getObjectFromGUID(guid)
                local name = obj and obj.getName() or (GameState.unit_hp[guid] and GameState.unit_hp[guid].name or guid)
                printToAll("  " .. name .. ": " .. table.concat(parts, ", "), {0.8, 0.7, 0.3})
                any_found = true
            end
        end
        if not any_found then
            printToAll("  No active status effects.", {0.6, 0.6, 0.6})
        end
        return false
    end
    
    -- !measure — distance between last 2 picked-up objects
    if msg:match("^!measure") then
        measureDistance()
        return false
    end
    
    -- !heat <+/-N> — adjust Heat Pool
    local heat_adj = msg:match("!heat%s+([+-]?%d+)")
    if heat_adj then
        heat_adj = tonumber(heat_adj)
        GameState.faction_pools.heat = math.max(0, GameState.faction_pools.heat + heat_adj)
        if heat_adj > 0 then checkOverheat() end
        printToAll("🔥 Heat Pool: " .. GameState.faction_pools.heat .. "/15", {1, 0.5, 0})
        updateUI()
        return false
    end
    
    -- !hunger <+/-N> — adjust Hunger Pool
    local hunger_adj = msg:match("!hunger%s+([+-]?%d+)")
    if hunger_adj then
        hunger_adj = tonumber(hunger_adj)
        GameState.faction_pools.hunger = math.max(0, GameState.faction_pools.hunger + hunger_adj)
        if hunger_adj > 0 then checkHungerThresholds() end
        printToAll("🩸 Hunger Pool: " .. GameState.faction_pools.hunger, {0.7, 0, 0})
        updateUI()
        return false
    end
    
    -- !flow <+/-N> — adjust Ritual Flow
    local flow_adj = msg:match("!flow%s+([+-]?%d+)")
    if flow_adj then
        flow_adj = tonumber(flow_adj)
        GameState.faction_pools.flow = math.max(0, math.min(40, GameState.faction_pools.flow + flow_adj))
        if flow_adj > 0 then checkFlowThresholds() end
        printToAll("🌀 Ritual Flow: " .. GameState.faction_pools.flow .. "/40", {0.4, 0.6, 1})
        updateUI()
        return false
    end
    
    -- !fate <+/-N> — adjust Fate-Threads (usually negative; set positive at game start)
    local fate_adj = msg:match("!fate%s+([+-]?%d+)")
    if fate_adj then
        fate_adj = tonumber(fate_adj)
        GameState.faction_pools.fate_threads = math.max(0, GameState.faction_pools.fate_threads + fate_adj)
        printToAll("🕸 Fate-Threads: " .. GameState.faction_pools.fate_threads, {0.3, 0.8, 0.6})
        updateUI()
        return false
    end
    
    -- !anchors <+/-N> — adjust Web-Anchors
    local anchor_adj = msg:match("!anchors%s+([+-]?%d+)")
    if anchor_adj then
        anchor_adj = tonumber(anchor_adj)
        GameState.faction_pools.anchors = math.max(0, GameState.faction_pools.anchors + anchor_adj)
        printToAll("🕸 Web-Anchors: " .. GameState.faction_pools.anchors, {0.3, 0.8, 0.6})
        updateUI()
        return false
    end
    
    -- !charges <+/-N> — adjust Fragment Charges (Iron Dominion)
    local charge_adj = msg:match("!charges%s+([+-]?%d+)")
    if charge_adj then
        charge_adj = tonumber(charge_adj)
        GameState.faction_pools.fragment_charges = math.max(0, GameState.faction_pools.fragment_charges + charge_adj)
        printToAll("⚙ Fragment Charges: " .. GameState.faction_pools.fragment_charges, {0.6, 0.6, 0.8})
        updateUI()
        return false
    end
    
    -- !stance <honor/revelation/none> — set Veilbound stance
    local stance_val = msg:match("!stance%s+(%w+)")
    if stance_val then
        if stance_val == "honor" then
            setStanceHonor()
        elseif stance_val == "revelation" or stance_val == "revel" then
            setStanceRevelation()
        else
            GameState.faction_pools.stance = "none"
            broadcastToAll("⚔ Stance cleared", {0.7, 0.7, 0.7})
            updateUI()
        end
        return false
    end
    
    -- !kill <white/red> — record a kill
    local kill_player = msg:match("!kill%s+(%w+)")
    if kill_player then
        local key = kill_player:sub(1,1):upper() .. kill_player:sub(2):lower()
        if GameState.kills[key] then
            GameState.kills[key] = GameState.kills[key] + 1
            printToAll("⚰ " .. key .. " records a kill! Total: " .. GameState.kills[key], {0.8, 0.8, 0.8})
            updateUI()
        end
        return false
    end
    
    -- !instability — roll d6 for Iron Dominion fragment instability
    local instab_thresh = msg:match("!instability%s*(%d*)")
    if msg:match("^!instability") then
        local threshold = tonumber(instab_thresh) or 2
        local r = math.random(1, 6)
        local backfire = r <= threshold
        if backfire then
            broadcastToAll("⚙💥 INSTABILITY BACKFIRE! Rolled " .. r .. " (threshold: ≤" .. threshold .. ")\n→ Deal 1 damage to activating unit and all units within 2\"!", {1, 0.3, 0})
        else
            broadcastToAll("⚙✓ Instability check PASSED. Rolled " .. r .. " (threshold: ≤" .. threshold .. ")", {0.4, 0.8, 0.4})
        end
        return false
    end
    
    -- !corruption <amount> — roll to see corruption token effects
    local corrupt_tokens = msg:match("!corruption%s+(%d+)")
    if corrupt_tokens then
        corrupt_tokens = tonumber(corrupt_tokens)
        local effect = "Clean — no effects"
        if corrupt_tokens >= 9 then
            local r = math.random(1, 6)
            local can_act = r > 2
            effect = "CONSUMED (-3 ATK, -2 DEF, -3 MOR)" ..
                     "\nRolled " .. r .. " → " .. (can_act and "Unit CAN act" or "Unit CANNOT act this turn!")
        elseif corrupt_tokens >= 6 then
            effect = "Corrupted (-2 ATK, -1 DEF, -2 MOR)"
        elseif corrupt_tokens >= 3 then
            effect = "Tainted (-1 ATK, -1 MOR)"
        end
        broadcastToAll("☠ Corruption (" .. corrupt_tokens .. " tokens): " .. effect, {0.5, 0, 0.3})
        return false
    end
    
    -- !breath <dice> — Breath Weapon attack (hits all in cone, ignores cover)
    local breath_dice = msg:match("!breath%s+(%d+)")
    if breath_dice then
        breath_dice = tonumber(breath_dice)
        local hits = 0
        local results = {}
        for i = 1, math.min(breath_dice, 20) do
            local r = math.random(1, 6)
            table.insert(results, r)
            if r >= 4 then hits = hits + 1 end  -- DEF 4 baseline, ignores cover
        end
        broadcastToAll("🔥 BREATH WEAPON: " .. breath_dice .. " dice (ignores cover, DEF 4)\nRolls: [" .. 
                       table.concat(results, ", ") .. "]\nHits: " .. hits .. " | Generates +2 Heat", {1, 0.5, 0})
        GameState.faction_pools.heat = GameState.faction_pools.heat + 2
        checkOverheat()
        updateUI()
        return false
    end
    
    -- !pools — show all faction mechanic pools
    if msg:match("^!pools") then
        local fp = GameState.faction_pools
        printToAll("═══ FACTION MECHANIC POOLS ═══", {1, 0.8, 0.3})
        printToAll("  🔥 Heat Pool (Emberclaw): " .. fp.heat .. "/15", {1, 0.5, 0})
        printToAll("  🩸 Hunger Pool (Nightfang): " .. fp.hunger, {0.7, 0, 0})
        printToAll("  🌀 Ritual Flow (Veilbound): " .. fp.flow .. "/40", {0.4, 0.6, 1})
        printToAll("  🕸 Fate-Threads (Thornweft): " .. fp.fate_threads, {0.3, 0.8, 0.6})
        printToAll("  🕸 Web-Anchors (Thornweft): " .. fp.anchors, {0.3, 0.8, 0.6})
        printToAll("  ⚙ Fragment Charges (Iron Dominion): " .. fp.fragment_charges, {0.6, 0.6, 0.8})
        printToAll("  ⚔ Stance (Veilbound): " .. (fp.stance or "none"), {0.8, 0.8, 0.8})
        printToAll("  ⚰ Kills — White: " .. (GameState.kills.White or 0) .. " | Red: " .. (GameState.kills.Red or 0), {0.8, 0.8, 0.8})
        return false
    end
    
    -- !reset — reset game state
    if msg:match("^!reset") then
        GameState.game_started = false
        GameState.turn = 0
        GameState.phase = "Setup"
        GameState.phase_index = 0
        GameState.player_cp = {White = 0, Red = 0}
        GameState.player_fragments = {White = 0, Red = 0}
        GameState.player_vp = {White = 0, Red = 0}
        GameState.combat_log = {}
        GameState.kills = {White = 0, Red = 0}
        GameState.faction_pools = {heat=0, hunger=0, flow=0, fate_threads=0, anchors=0, fragment_charges=0, stance="none"}
        GameState.unit_hp = {}
        GameState.unit_statuses = {}
        GameState.game_start_time = 0
        GameState.total_attacks = {White=0, Red=0}
        GameState.total_damage_dealt = {White=0, Red=0}
        GameState.first_player = "White"
        GameState.active_player = "White"
        broadcastToAll("🔄 Game state RESET (all pools, kills, HP, statuses cleared).\nPress 'Next Phase' to start or use ⚙ Setup Game.", {1, 0.5, 0.2})
        updateUI()
        return false
    end
    
    -- !phase
    if msg:match("^!phase") then
        local fp = GameState.faction_pools
        printToAll("Turn " .. GameState.turn .. " — " .. GameState.phase .. " Phase\n" ..
                   "White: CP=" .. (GameState.player_cp.White or 0) .. " VP=" .. (GameState.player_vp.White or 0) ..
                   " Kills=" .. (GameState.kills.White or 0) ..
                   " | Red: CP=" .. (GameState.player_cp.Red or 0) .. " VP=" .. (GameState.player_vp.Red or 0) ..
                   " Kills=" .. (GameState.kills.Red or 0) ..
                   "\nPools: Heat=" .. fp.heat .. " Hunger=" .. fp.hunger ..
                   " Flow=" .. fp.flow .. " Fate=" .. fp.fate_threads ..
                   " Anchors=" .. fp.anchors .. " Charges=" .. fp.fragment_charges,
                   {0.8, 0.8, 0.2})
        return false
    end
    
    -- !help
    if msg:match("^!help") then
        printToAll("═══ SHARDBORNE v3.2 COMMANDS ═══", {1, 0.8, 0.3})
        printToAll("── Combat ──", {0.8, 0.6, 0.3})
        printToAll("  !atk <dice> vs <DEF> [mods]  — Attack roll with optional modifiers", {0.8, 0.8, 0.2})
        printToAll("    Modifiers: charge flank rear cover heavy_cover elevated", {0.6, 0.6, 0.6})
        printToAll("    Stances: honor revelation | Grid: grid_active grid_fortified isolated", {0.6, 0.6, 0.6})
        printToAll("    Example: !atk 6 vs 4 charge flank", {0.5, 0.5, 0.5})
        printToAll("  !morale <MOR>         — Morale test (pass/shaken/routed)", {0.8, 0.8, 0.2})
        printToAll("  !roll XdY             — Roll any dice (e.g., !roll 2d6)", {0.8, 0.8, 0.2})
        printToAll("  !breath <dice>        — Breath Weapon attack (ignores cover, +2 Heat)", {0.8, 0.8, 0.2})
        printToAll("  !measure              — Distance between last 2 picked-up objects", {0.8, 0.8, 0.2})
        printToAll("── Faction Mechanics ──", {0.8, 0.6, 0.3})
        printToAll("  !heat <+/-N>          — Adjust Emberclaw Heat Pool", {0.8, 0.8, 0.2})
        printToAll("  !hunger <+/-N>        — Adjust Nightfang Hunger Pool", {0.8, 0.8, 0.2})
        printToAll("  !flow <+/-N>          — Adjust Veilbound Ritual Flow", {0.8, 0.8, 0.2})
        printToAll("  !fate <+/-N>          — Adjust Thornweft Fate-Threads", {0.8, 0.8, 0.2})
        printToAll("  !anchors <+/-N>       — Adjust Thornweft Web-Anchors", {0.8, 0.8, 0.2})
        printToAll("  !charges <+/-N>       — Adjust Iron Dominion Fragment Charges", {0.8, 0.8, 0.2})
        printToAll("  !stance <type>        — Set Veilbound stance (honor/revelation/none)", {0.8, 0.8, 0.2})
        printToAll("  !instability [thresh] — Roll Iron Dominion instability (default thresh 2)", {0.8, 0.8, 0.2})
        printToAll("  !corruption <tokens>  — Check Corruption effect for token count", {0.8, 0.8, 0.2})
        printToAll("  !pools                — Show all faction mechanic pools", {0.8, 0.8, 0.2})
        printToAll("── Tracking ──", {0.8, 0.6, 0.3})
        printToAll("  !kill <white/red>     — Record a kill for a player", {0.8, 0.8, 0.2})
        printToAll("  !vp <player> <+/-N>   — Adjust VP (e.g., !vp white +2)", {0.8, 0.8, 0.2})
        printToAll("  !cp <player> <+/-N>   — Adjust CP (e.g., !cp red -3)", {0.8, 0.8, 0.2})
        printToAll("  !army                 — Validate army composition", {0.8, 0.8, 0.2})
        printToAll("  !statuses             — Show all active unit status effects", {0.8, 0.8, 0.2})
        printToAll("── Game ──", {0.8, 0.6, 0.3})
        printToAll("  !initiative           — Roll off for first player", {0.8, 0.8, 0.2})
        printToAll("  !scenario  !phase  !reset  !help", {0.8, 0.8, 0.2})
        printToAll("── Right-Click Units ──", {0.8, 0.6, 0.3})
        printToAll("  Deal 1/2/3 Damage | Heal 1/2 HP | Show HP | Blood Tithe", {0.8, 0.8, 0.2})
        printToAll("  Toggle ⚡Shaken | ⚔Engaged | 👁Stealthed | ✓Activated", {0.8, 0.8, 0.2})
        printToAll("  Morale Test (auto-reads MOR) | Show Full Stats", {0.8, 0.8, 0.2})
        return false
    end
    
    return true
end

-- ════════════════════════════════════════
-- SCENARIO GENERATOR
-- ════════════════════════════════════════

function generateScenario()
    local scenarios = {
        {
            name = "King of the Hill",
            desc = "Control the center objective for 2 VP per turn. Side objectives worth 1 VP each.",
            objectives = "Center: 2 VP/turn, Sides: 1 VP/turn",
        },
        {
            name = "Shardstorm",
            desc = "Fragment shards rain from the sky! At the start of each turn, place a Fragment token on a random objective. Collect fragments for bonus VP.",
            objectives = "Kill: 1 VP, Fragments collected: 2 VP each",
        },
        {
            name = "The Last Stand",
            desc = "Player 1 defends 3 objectives. Player 2 must capture 2 of 3 by Turn 5 to win.",
            objectives = "Defender: hold 2+, Attacker: capture 2+",
        },
        {
            name = "Total War",
            desc = "All-out conflict. Score VP for destroying enemy units. Commander kill = 5 VP.",
            objectives = "Unit kill: 1 VP, Commander kill: 5 VP",
        },
        {
            name = "Supply Lines",
            desc = "4 supply caches along the centerline. Each cache controlled = +1 CP per turn for controlling player.",
            objectives = "Control caches for bonus CP, most VP wins",
        },
        {
            name = "Broken Ground",
            desc = "The battlefield is devastated. Place 2 additional hazard terrain tokens. Difficult terrain everywhere except roads.",
            objectives = "5 objectives, 1 VP each per turn controlled",
        },
    }
    
    local scenario = scenarios[math.random(#scenarios)]
    broadcastToAll("═══ SCENARIO: " .. scenario.name .. " ═══\n\n" ..
                   scenario.desc .. "\n\nObjectives: " .. scenario.objectives, {1, 0.85, 0.3})
end

-- ════════════════════════════════════════
-- UTILITY
-- ════════════════════════════════════════

function printStats(obj)
    if obj and obj.getDescription() then
        printToAll(obj.getDescription(), {0.8, 0.8, 0.8})
    end
end
'''


# ─── Quick Reference Card Builder ───────────────────────────────────────────────

def build_quick_reference():
    """Create a notecard with the full quick reference rules."""
    return make_notecard(
        "📖 SHARDBORNE QUICK REFERENCE v3.2",
        """═══ TURN STRUCTURE ═══
1. COMMAND PHASE
   • Gain CP (3 + Commander's Command bonus)
   • Draw 2 cards (hand limit 7)
   • Play Command/Tech cards (spend CP)
   • Activate Fragment abilities
   • Faction: Generate Heat/Flow/Charges, place Anchors, switch Stances

2. MOVEMENT PHASE
   • Move each unit up to its MOV stat (inches)
   • Terrain: Difficult = half speed, Impassable = blocked
   • Fly: ignore terrain
   • Engagement: within 1" of enemy = engaged (no free movement)
   • Charge: 5"+ straight move into melee = +1 ATK

3. COMBAT PHASE
   • Declare attacks (check RNG stat for range)
   • Roll ATK dice: each die >= target's DEF = 1 hit
   • Roll of 6 = CRIT (2 damage instead of 1)
   • Apply damage to HP (right-click units to track!)
   • Modifiers: charge/flank/rear/cover/elevated/stance

4. END PHASE
   • Morale test for units at half HP or below: 2d6 <= MOR
     Pass: holds firm | Fail by <3: SHAKEN | Fail by 3+: ROUTED (destroyed)
   • Score objectives, remove destroyed, clean up effects
   • Corruption: undamaged units remove 1 token (Natural Resistance)
   • Remove all Activated markers (automatic)

═══ COMBAT MODIFIERS ═══
Charge (+5" straight): +1 ATK | Flank: +1 ATK | Rear: +2 ATK
Cover: +1 DEF | Heavy Cover: +2 DEF | Elevated: +1 ATK ranged
Diving Charge: +2 ATK | Superheated: +1 dmg/hit
Honor Stance: +1 DEF, -1 ATK | Revelation: +1 ATK, -1 DEF
Grid Active (2+ allies in 4"): +1 ATK | Grid Fortified: +1 ATK +1 DEF
Isolated (0 allies in 4"): -1 ATK
Usage: !atk 6 vs 4 charge flank

═══ FACTION MECHANICS ═══
Emberclaw: Heat Pool (max 15, Overheat at 16+, -3/turn start)
  !heat +N | Spend Heat for abilities | !breath <dice>
Nightfang: Hunger Pool (kills track; 5/10/15 thresholds)
  !hunger +N | Blood Tithe: right-click unit | !corruption <tokens>
Veilbound: Ritual Flow (max 40; 5/12/20/30 thresholds)
  !flow +N | !stance honor/revelation/none
Thornweft: Fate-Threads (finite) + Web-Anchors
  !fate -1 | !anchors +1 | Teleport within 4" of Anchors
Iron Dominion: Grid Cohesion + Fragment Charges
  !charges +N | !instability [threshold]

═══ CHAT COMMANDS ═══
!atk <dice> vs <DEF> [mods] — Attack with modifiers
!morale <MOR>  !roll XdY  !breath <dice>  !measure
!heat/!hunger/!flow/!fate/!anchors/!charges <+/-N>
!stance <type>  !instability  !corruption <tokens>
!kill <white/red>  !pools  !vp/!cp <player> <+/-N>
!initiative  !statuses  !army  !scenario  !phase  !reset  !help

═══ RIGHT-CLICK UNITS ═══
Deal 1/2/3 Damage | Heal 1/2 HP | Show HP | Blood Tithe
Toggle: ⚡Shaken | ⚔Engaged | 👁Stealthed | ✓Activated
Morale Test (auto-reads MOR) | Show Full Stats

═══ STATUS EFFECTS ═══
⚡ Shaken: -1 ATK die, must rally (2d6 <= MOR) in Command Phase
⚔ Engaged: no ranged attacks, cannot move away without Disengaging
👁 Stealthed: hidden from ranged attacks >8"
✓ Activated: unit has acted this turn

═══ KEY RULES ═══
• Commander death = no more cards for that player
• Cards played within Commander's 8" aura (+1 MOR)
• War Machines: huge, powerful, limited per army
• Fragments: powerful items with instability risk""",
        x=-45, y=1.5, z=-20,
        color={"r": 0.95, "g": 0.9, "b": 0.7}
    )


# ─── Main Generator ─────────────────────────────────────────────────────────────

def main():
    print("╔══════════════════════════════════════════╗")
    print("║  SHARDBORNE TTS Save File Generator      ║")
    print("╚══════════════════════════════════════════╝")
    print()
    
    # ── Step 1: Read all data files ──
    print("📂 Reading game data files...")
    
    core_path = os.path.join(DATA_DIR, "core.js")
    faction_files = [
        os.path.join(DATA_DIR, "factions", f) for f in [
            "emberclaw-warpack.js",
            "iron-dominion.js",
            "nightfang-dominion.js",
            "thornweft-matriarchy.js",
            "veilbound-shogunate.js",
        ]
    ]
    
    core_text = read_js_file(core_path)
    print(f"  ✓ core.js ({len(core_text):,} chars)")
    
    faction_texts = {}
    for fp in faction_files:
        fid = os.path.basename(fp).replace(".js", "")
        faction_texts[fid] = read_js_file(fp)
        print(f"  ✓ {os.path.basename(fp)} ({len(faction_texts[fid]):,} chars)")
    
    # ── Step 2: Parse data ──
    print("\n🔍 Parsing game data...")
    
    # Extract card library from core.js
    card_library = extract_card_library(core_text)
    print(f"  ✓ Card Library: {len(card_library)} cards")
    
    # Extract commanders, units, fragments from each faction
    all_commanders = []
    all_units = []
    all_fragments = []
    
    for fid, text in faction_texts.items():
        commanders = extract_js_objects(text, "commanders")
        units = extract_js_objects(text, "units")
        fragments = extract_js_objects(text, "fragments")
        
        all_commanders.extend(commanders)
        all_units.extend(units)
        all_fragments.extend(fragments)
        
        fname = FACTION_NAMES.get(fid, fid)
        print(f"  ✓ {fname}: {len(commanders)} commanders, {len(units)} units, {len(fragments)} fragments")
    
    print(f"\n  TOTALS: {len(all_commanders)} commanders, {len(all_units)} units, "
          f"{len(all_fragments)} fragments, {len(card_library)} cards")
    
    # ── Step 3: Build TTS Objects ──
    print("\n🔨 Building TTS objects...")
    
    all_objects = []
    
    # --- Game Board (default: Open Plains) ---
    all_objects.append(make_game_board("OpenPlains", "🗺️ Battlefield — Open Plains"))
    print("  ✓ Game board (Open Plains)")
    
    # --- Map Variants Bag ---
    all_objects.append(make_map_variant_bag())
    print("  ✓ Map variants bag (6 themed battlefields)")
    
    # --- Blast & Cone Templates Bag ---
    template_bag_contents = []
    for size in [3, 6]:
        template_bag_contents.append(make_blast_template(size))
    for size in [6, 8, 10]:
        template_bag_contents.append(make_cone_template(size))
    template_bag = make_bag("📐 Blast & Cone Templates", x=-45, y=1.5, z=12,
                            color={"r": 0.8, "g": 0.4, "b": 0.1},
                            contents=template_bag_contents)
    all_objects.append(template_bag)
    print("  ✓ Templates bag (2 blasts + 3 cones)")
    
    # --- Range Rings Bag ---
    range_bag_contents = []
    for radius in [1, 3, 6, 8, 10]:
        range_bag_contents.append(make_range_ring(radius))
    range_bag = make_bag("📏 Range Rings", x=-45, y=1.5, z=20,
                         color={"r": 0.2, "g": 0.6, "b": 0.8},
                         contents=range_bag_contents)
    all_objects.append(range_bag)
    print("  ✓ Range rings bag (1\", 3\", 6\", 8\", 10\")")
    
    # --- Quick Reference ---
    all_objects.append(build_quick_reference())
    all_objects.append(make_ruler())
    print("  ✓ Quick reference & ruler")
    
    # --- Dice (10 white combat dice + 2 red morale dice) ---
    dice_bag_contents = []
    for i in range(10):
        dice_bag_contents.append(make_die(x=0, y=1 + i*0.3, z=0))
    morale_d1 = make_die(color={"r": 0.8, "g": 0.2, "b": 0.2})
    morale_d1["Nickname"] = "Morale Die 1"
    morale_d1["Description"] = "Roll 2d6 ≤ MOR to pass morale test"
    dice_bag_contents.append(morale_d1)
    morale_d2 = make_die(color={"r": 0.8, "g": 0.2, "b": 0.2})
    morale_d2["Nickname"] = "Morale Die 2"
    morale_d2["Description"] = "Roll 2d6 ≤ MOR to pass morale test"
    dice_bag_contents.append(morale_d2)
    
    dice_bag = make_bag("🎲 Dice", x=45, y=1.5, z=0, 
                        color={"r": 0.8, "g": 0.8, "b": 0.8},
                        contents=dice_bag_contents)
    all_objects.append(dice_bag)
    print(f"  ✓ Dice bag (10 combat + 2 morale)")
    
    # --- Counters ---
    all_objects.append(make_counter("VP Player 1", x=45, y=1.5, z=-10, color={"r": 0.9, "g": 0.9, "b": 0.2}))
    all_objects.append(make_counter("VP Player 2", x=45, y=1.5, z=-16, color={"r": 0.9, "g": 0.2, "b": 0.2}))
    all_objects.append(make_counter("Round Counter", x=45, y=1.5, z=-22, color={"r": 0.4, "g": 0.7, "b": 0.4}))
    print("  ✓ Counters (VP x2, Round)")
    
    # --- Card Library Deck ---
    print("  Building card library deck...")
    card_objects_by_type = {"command": [], "tech": [], "fragment": [], "tactical": []}
    for card_name, card_data in card_library.items():
        card_type = card_data.get("type", "command")
        card_obj = make_card(card_name, card_data)
        if card_type in card_objects_by_type:
            card_objects_by_type[card_type].append(card_obj)
        else:
            card_objects_by_type["command"].append(card_obj)
    
    card_deck_x = -45
    card_deck_z = -10
    card_bag_contents = []
    for ctype, cards in card_objects_by_type.items():
        if cards:
            type_name = {"command": "Command", "tech": "Tech", "fragment": "Fragment", "tactical": "Tactical"}.get(ctype, ctype)
            deck = make_card_deck(cards, f"{type_name} Cards", 
                                 x=card_deck_x, y=1.5, z=card_deck_z,
                                 color=CARD_TYPE_COLORS.get(ctype))
            if deck:
                card_bag_contents.append(deck)
            card_deck_z += 5
    
    card_bag = make_bag("📋 Card Library", x=-45, y=1.5, z=-10,
                        color={"r": 0.3, "g": 0.3, "b": 0.6},
                        contents=card_bag_contents)
    all_objects.append(card_bag)
    print(f"  ✓ Card library ({len(card_library)} cards in {len(card_bag_contents)} type decks)")
    
    # --- Faction Bags (one per faction) ---
    factions_processed = set()
    faction_x_start = -30
    
    for faction_idx, faction_id in enumerate(FACTION_COLORS.keys()):
        fname = FACTION_NAMES.get(faction_id, faction_id)
        f_color = FACTION_COLORS[faction_id]
        
        # Collect this faction's data
        f_commanders = [c for c in all_commanders if c.get("faction") == faction_id]
        f_units = [u for u in all_units if u.get("faction") == faction_id]
        f_fragments = [f for f in all_fragments if f.get("faction") == faction_id]
        
        faction_contents = []
        
        # Commander tokens
        cmd_bag_contents = []
        for ci, cmd in enumerate(f_commanders):
            token = make_unit_token(cmd, x=0, y=1 + ci * 0.5, z=0, is_commander=True)
            cmd_bag_contents.append(token)
        
        if cmd_bag_contents:
            cmd_bag = make_bag(f"⭐ {fname} Commanders ({len(cmd_bag_contents)})", 
                              x=0, y=1.5, z=0, color=f_color, contents=cmd_bag_contents)
            faction_contents.append(cmd_bag)
        
        # Unit tokens organized by type
        unit_types = {}
        for unit in f_units:
            utype = unit.get("type", "Other")
            if utype not in unit_types:
                unit_types[utype] = []
            unit_types[utype].append(unit)
        
        for utype, units_of_type in sorted(unit_types.items()):
            type_bag_contents = []
            for ui, unit in enumerate(units_of_type):
                token = make_unit_token(unit, x=0, y=1 + ui * 0.3, z=0, is_commander=False)
                type_bag_contents.append(token)
            
            if type_bag_contents:
                type_bag = make_bag(f"{utype} ({len(type_bag_contents)})",
                                   x=0, y=1.5, z=0, color=f_color, contents=type_bag_contents)
                faction_contents.append(type_bag)
        
        # Fragment tokens
        if f_fragments:
            frag_bag_contents = []
            for fi, frag in enumerate(f_fragments):
                frag_token = make_fragment_token(frag, x=0, y=1 + fi * 0.3, z=0)
                frag_bag_contents.append(frag_token)
            
            frag_bag = make_bag(f"💎 Fragments ({len(frag_bag_contents)})",
                               x=0, y=1.5, z=0,
                               color={"r": 0.6, "g": 0.2, "b": 0.8},
                               contents=frag_bag_contents)
            faction_contents.append(frag_bag)
        
        # Faction roster notecard
        roster_text = f"═══ {fname.upper()} ROSTER ═══\n\n"
        roster_text += f"Commanders ({len(f_commanders)}):\n"
        for c in f_commanders:
            bs = c.get("battle_stats", {})
            roster_text += f"  {c['name']} ({c.get('points_cost', 0)}pts) — ATK:{bs.get('ATK',0)} DEF:{bs.get('DEF',0)} HP:{bs.get('HP',0)}\n"
        roster_text += f"\nUnits ({len(f_units)}):\n"
        for u in sorted(f_units, key=lambda x: x.get("type", "")):
            s = u.get("stats", {})
            roster_text += f"  [{u.get('type', '?')[:3]}] {u['name']} ({u.get('points_cost', 0)}pts) — ATK:{s.get('ATK',0)} DEF:{s.get('DEF',0)} HP:{s.get('HP',0)}\n"
        
        roster_card = make_notecard(f"📋 {fname} Roster", roster_text, color=f_color)
        faction_contents.append(roster_card)
        
        # Main faction bag
        bag_x = faction_x_start + (faction_idx * 15)
        faction_bag = make_bag(f"🏴 {fname}", x=bag_x, y=1.5, z=38,
                              color=f_color, contents=faction_contents)
        all_objects.append(faction_bag)
        
        print(f"  ✓ {fname}: {len(f_commanders)} commanders, {len(f_units)} units, "
              f"{len(f_fragments)} fragments → faction bag")
    
    # --- Deployment Zones ---
    all_objects.append(make_zone("Player 1 Deploy Zone", x=0, y=0.5, z=-28, 
                                scale_x=70, scale_z=12,
                                color={"r": 0.2, "g": 0.4, "b": 0.8}))
    all_objects.append(make_zone("Player 2 Deploy Zone", x=0, y=0.5, z=28, 
                                scale_x=70, scale_z=12,
                                color={"r": 0.8, "g": 0.2, "b": 0.2}))
    print("  ✓ Deployment zones")
    
    # --- Objective Markers (5) ---
    obj_positions = [(0, 0), (-18, -12), (18, -12), (-18, 12), (18, 12)]
    obj_bag_contents = []
    for oi, (ox, oz) in enumerate(obj_positions):
        obj_marker = {
            "GUID": make_guid(),
            "Name": "Custom_Token",
            "Transform": make_transform(ox, 1.5, oz, scale=0.6),
            "Nickname": f"Objective {oi + 1}",
            "Description": f"Objective marker #{oi + 1}\nControl with a unit within 3\".\nScore VP at end of each turn.",
            "ColorDiffuse": {"r": 1.0, "g": 0.85, "b": 0.0},
            "CustomImage": {
                "ImageURL": "https://placehold.co/128x128/FFD700/000000?text=OBJ",
                "CustomToken": {
                    "Thickness": 0.3,
                    "MergeDistancePixels": 15.0,
                    "StandUp": False,
                    "Stackable": False,
                },
            },
            "Locked": False,
            "Tooltip": True,
            "Tags": ["objective"],
        }
        obj_bag_contents.append(obj_marker)
    
    obj_bag = make_bag("🎯 Objective Markers", x=45, y=1.5, z=10,
                       color={"r": 1.0, "g": 0.85, "b": 0.0},
                       contents=obj_bag_contents)
    all_objects.append(obj_bag)
    print("  ✓ Objective markers (5)")
    
    # ─── TERRAIN SYSTEM ─────────────────────────────────────────────────────────
    # Comprehensive terrain pieces with 3D blocks, area tiles, and faction markers
    
    # --- Helper: Create a 3D terrain block (TTS BlockSquare) ---
    def make_terrain_block(name, desc, hex_color, sx=4.0, sy=1.0, sz=4.0, tags=None):
        """Create a 3D block terrain piece."""
        return {
            "GUID": make_guid(),
            "Name": "BlockSquare",
            "Transform": make_transform(0, 1, 0, scale=1.0),
            "Nickname": name,
            "Description": desc,
            "ColorDiffuse": {
                "r": int(hex_color[0:2], 16) / 255,
                "g": int(hex_color[2:4], 16) / 255,
                "b": int(hex_color[4:6], 16) / 255,
            },
            "Locked": False,
            "Tooltip": True,
            "Tags": tags or ["terrain"],
            "Transform": {
                "posX": 0, "posY": 1, "posZ": 0,
                "rotX": 0, "rotY": 0, "rotZ": 0,
                "scaleX": sx, "scaleY": sy, "scaleZ": sz,
            },
        }
    
    # --- Helper: Create a rectangular wall/barricade block ---
    def make_terrain_wall(name, desc, hex_color, sx=6.0, sy=2.0, sz=0.5, tags=None):
        """Create a wall/barricade terrain piece."""
        return {
            "GUID": make_guid(),
            "Name": "BlockRectangle",
            "Transform": {
                "posX": 0, "posY": 1, "posZ": 0,
                "rotX": 0, "rotY": 0, "rotZ": 0,
                "scaleX": sx, "scaleY": sy, "scaleZ": sz,
            },
            "Nickname": name,
            "Description": desc,
            "ColorDiffuse": {
                "r": int(hex_color[0:2], 16) / 255,
                "g": int(hex_color[2:4], 16) / 255,
                "b": int(hex_color[4:6], 16) / 255,
            },
            "Locked": False,
            "Tooltip": True,
            "Tags": tags or ["terrain"],
        }
    
    # --- Helper: Create area terrain tile ---
    def make_terrain_tile(name, desc, hex_color, icon, tile_scale=3.0, tags=None):
        """Create a flat area terrain tile (Custom_Tile)."""
        return {
            "GUID": make_guid(),
            "Name": "Custom_Tile",
            "Transform": {
                "posX": 0, "posY": 1, "posZ": 0,
                "rotX": 0, "rotY": 0, "rotZ": 0,
                "scaleX": tile_scale, "scaleY": 1.0, "scaleZ": tile_scale,
            },
            "Nickname": name,
            "Description": desc,
            "ColorDiffuse": {
                "r": int(hex_color[0:2], 16) / 255,
                "g": int(hex_color[2:4], 16) / 255,
                "b": int(hex_color[4:6], 16) / 255,
            },
            "CustomImage": {
                "ImageURL": f"https://placehold.co/400x400/{hex_color}/ffffff?text={icon}",
                "ImageSecondaryURL": "",
                "WidthScale": 0.0,
                "CustomTile": {
                    "Type": 0,  # Square tile
                    "Thickness": 0.05,
                    "Stackable": False,
                },
            },
            "Locked": False,
            "Tooltip": True,
            "Tags": tags or ["terrain"],
        }
    
    # --- Helper: Create a faction terrain marker (smaller token) ---
    def make_faction_terrain_marker(name, desc, hex_color, icon, tags=None):
        """Create a small faction-specific terrain marker."""
        return {
            "GUID": make_guid(),
            "Name": "Custom_Token",
            "Transform": make_transform(0, 1, 0, scale=1.5),
            "Nickname": name,
            "Description": desc,
            "ColorDiffuse": {
                "r": int(hex_color[0:2], 16) / 255,
                "g": int(hex_color[2:4], 16) / 255,
                "b": int(hex_color[4:6], 16) / 255,
            },
            "CustomImage": {
                "ImageURL": f"https://placehold.co/200x200/{hex_color}/ffffff?text={icon}",
                "CustomToken": {
                    "Thickness": 0.1,
                    "MergeDistancePixels": 15.0,
                    "StandUp": False,
                    "Stackable": True,
                },
            },
            "Locked": False,
            "Tooltip": True,
            "Tags": tags or ["terrain"],
        }
    
    terrain_all = []
    
    # ══════════════════════════════════════════
    # AREA TERRAIN — Large flat tiles (4" zones)
    # ══════════════════════════════════════════
    
    # Forest (Difficult + Light Cover)
    for i in range(4):
        terrain_all.append(make_terrain_tile(
            "🌲 Forest", 
            "DIFFICULT TERRAIN + LIGHT COVER\n─────────────────\nMovement: Costs 2\" per 1\" moved\nDefense: +1 DEF vs ranged attacks\nBlocks LoS through center\n─────────────────\n4\" area zone",
            "2d5a1f", "🌲+Forest", tile_scale=3.5))
    
    # Swamp / Mud (Difficult Terrain)
    for i in range(3):
        terrain_all.append(make_terrain_tile(
            "🟤 Swamp",
            "DIFFICULT TERRAIN\n─────────────────\nMovement: Costs 2\" per 1\" moved\nNo combat modifiers\n─────────────────\n4\" area zone",
            "4a3a2a", "🟤+Swamp", tile_scale=3.0))
    
    # Dangerous Ground (lava, toxic waste)
    for i in range(2):
        terrain_all.append(make_terrain_tile(
            "☢ Dangerous Ground",
            "DANGEROUS TERRAIN\n─────────────────\nAny unit entering or starting its turn here\nrolls 1d6: on a 1, takes 1 damage\n─────────────────\n4\" area zone",
            "6b2a1a", "☢+Danger", tile_scale=2.5))
    
    # Crater / Rubble (Light Cover + Difficult)
    for i in range(2):
        terrain_all.append(make_terrain_tile(
            "💥 Crater",
            "DIFFICULT TERRAIN + LIGHT COVER\n─────────────────\nMovement: Costs 2\" per 1\" moved\nDefense: +1 DEF vs ranged\nGood as impact sites or ruined areas\n─────────────────\n3\" area zone",
            "5a5550", "💥+Crater", tile_scale=2.5))
    
    # Open Ground marker (reference only)
    for i in range(2):
        terrain_all.append(make_terrain_tile(
            "🟩 Open Ground",
            "OPEN GROUND\n─────────────────\nNo modifiers. Full movement.\nUse to mark designated open areas\n─────────────────\n4\" area zone",
            "557744", "🟩+Open", tile_scale=3.0))
    
    # ══════════════════════════════════════════
    # 3D TERRAIN — Blocks and structures
    # ══════════════════════════════════════════
    
    # Hills (Elevated Ground) — wide flat platforms
    for i in range(3):
        terrain_all.append(make_terrain_block(
            "⛰️ Hill",
            "ELEVATED GROUND\n─────────────────\n+1 ATK die for ranged attacks targeting lower ground\n+1 DEF vs melee from units on lower ground\nPlace units on top\n─────────────────\nPlatform: ~4\"×4\"",
            "8b7b5b", sx=4.0, sy=0.6, sz=4.0))
    
    # Tall Hill / Mesa — steeper, smaller
    for i in range(2):
        terrain_all.append(make_terrain_block(
            "🏔️ Tall Hill",
            "ELEVATED GROUND (STEEP)\n─────────────────\n+1 ATK die for ranged attacks at lower ground\n+1 DEF vs melee from below\nDifficult Terrain to climb\n─────────────────\nPlatform: ~3\"×3\", ~1.5\" tall",
            "7a6a4a", sx=3.0, sy=1.5, sz=3.0))
    
    # Ruins (Heavy Cover) — broken walls
    for i in range(3):
        terrain_all.append(make_terrain_block(
            "🏚️ Ruins",
            "HEAVY COVER\n─────────────────\n+2 DEF vs ranged attacks\nBlocks LoS for models fully behind it\nNormal movement through\n─────────────────\nRuined structure ~4\"×3\"",
            "6b6b6b", sx=4.0, sy=1.8, sz=3.0))
    
    # Building (Impassable) — solid block
    for i in range(2):
        terrain_all.append(make_terrain_block(
            "🏢 Building",
            "IMPASSABLE TERRAIN\n─────────────────\nCannot be entered by non-Fly units\nBlocks line of sight completely\n─────────────────\nSolid structure ~3\"×3\"",
            "555566", sx=3.0, sy=2.5, sz=3.0))
    
    # Wall Section (Heavy Cover, blocks LoS)
    for i in range(4):
        terrain_all.append(make_terrain_wall(
            "🧱 Wall Section",
            "HEAVY COVER\n─────────────────\n+2 DEF vs ranged attacks\nBlocks LoS completely\nUnits can be placed behind for cover\n─────────────────\nWall: ~6\" long, ~2\" tall",
            "7a6a5a", sx=6.0, sy=2.0, sz=0.4))
    
    # Barricade (Light Cover)
    for i in range(4):
        terrain_all.append(make_terrain_wall(
            "🪵 Barricade",
            "LIGHT COVER\n─────────────────\n+1 DEF vs ranged attacks\nDoes NOT block LoS\nQuick deployable cover\n─────────────────\nBarricade: ~4\" long, ~1\" tall",
            "6b5533", sx=4.0, sy=1.0, sz=0.3))
    
    # Rock Outcrop (Light Cover + Elevated edge)
    for i in range(3):
        terrain_all.append(make_terrain_block(
            "🪨 Rock Outcrop",
            "LIGHT COVER\n─────────────────\n+1 DEF vs ranged attacks\nPartially blocks LoS\nClimbable (Difficult Terrain to mount)\n─────────────────\nRocky formation ~2\"×2\"",
            "6a6a6a", sx=2.0, sy=1.2, sz=2.0))
    
    # Bridge (Open Ground, elevated passage)
    terrain_all.append(make_terrain_wall(
        "🌉 Bridge",
        "OPEN GROUND (ELEVATED)\n─────────────────\nNormal movement across\nProvides passage over Rivers/Chasms\n+1 ATK die ranged vs lower ground\n─────────────────\nBridge: ~8\" long, ~2\" wide",
        "8a7a5a", sx=8.0, sy=0.8, sz=2.0))
    
    # Tower / Watchtower (Impassable, elevated)
    terrain_all.append(make_terrain_block(
        "🗼 Watchtower",
        "IMPASSABLE + ELEVATED\n─────────────────\nCannot be entered (garrison inside abstracted)\nBlocks LoS completely\nUnits adjacent gain Light Cover\n─────────────────\nTower: ~2\"×2\", ~3\" tall",
        "776655", sx=2.0, sy=3.0, sz=2.0))
    
    # ══════════════════════════════════════════
    # FACTION-SPECIFIC TERRAIN MARKERS
    # ══════════════════════════════════════════
    
    faction_terrain = []
    
    # 🔥 Emberclaw — Burning Terrain (max 6 in rules)
    for i in range(6):
        faction_terrain.append(make_faction_terrain_marker(
            "🔥 Burning Terrain",
            "EMBERCLAW — BURNING TERRAIN\n─────────────────\nCreated by Breath Weapons, Firestorm, or abilities\nLasts 2 turns, then burns out\n• Non-Emberclaw: 1 damage + -1 MOV on enter/start\n• Emberclaw: Open Ground, +1 Heat\n• Blocks Stealth\n─────────────────\nMax 6 on table. Oldest removed if 7th placed.",
            "cc3300", "🔥", tags=["terrain", "emberclaw-warpack", "burning"]))
    
    # 🌿 Thornweft — Web-Anchors (max up to 10 in Epic)
    for i in range(10):
        faction_terrain.append(make_faction_terrain_marker(
            "🕸️ Web-Anchor",
            "THORNWEFT — WEB-ANCHOR\n─────────────────\nPlaced during deployment (2 starting) or Command Phase\nTeleport: Thornweft units within 4\" can teleport to another Anchor\nNetwork bonuses by proximity:\n• Severed (0 nearby): -1 ATK, -1 MOR\n• Threaded (1): No bonus\n• Woven (2): +1 DEF\n• Enthroned (3+): +1 DEF, +1 ATK\n─────────────────\nEnemy can spend full activation adjacent to remove.\nMax: 4 Skirmish / 6 Standard / 10 Epic",
            "44aa44", "🕸️", tags=["terrain", "thornweft-matriarchy", "web-anchor"]))
    
    # 🌿 Thornweft — Gossamer Traps (max 8 in Epic)
    for i in range(8):
        faction_terrain.append(make_faction_terrain_marker(
            "🪤 Gossamer Trap",
            "THORNWEFT — GOSSAMER TRAP\n─────────────────\n4\" radius terrain zone\n• Enemies: Impassable Terrain (cannot enter)\n• Thornweft: Open Ground + 1 DEF (Silk Shroud)\n• Enemies within 1\" of edge: -2\" MOV\n─────────────────\nEnemy can spend full activation to destroy.\nMax: 3 Skirmish / 5 Standard / 8 Epic",
            "33bb55", "🪤", tags=["terrain", "thornweft-matriarchy", "gossamer-trap"]))
    
    # 🦇 Nightfang — Shadow Zones
    for i in range(4):
        faction_terrain.append(make_faction_terrain_marker(
            "🌑 Shadow Zone",
            "NIGHTFANG — SHADOW ZONE\n─────────────────\nCreated by abilities or nightfall effects\n• Nightfang units in shadow: +1 DEF (Shadow Dominion)\n• Counts as cover for Stealth purposes\n• Non-Nightfang: -1 RNG for ranged attacks through\n─────────────────\n4\" radius zone",
            "220033", "🌑", tags=["terrain", "nightfang-dominion", "shadow"]))
    
    # ⚙ Iron Dominion — Fragment Deposits
    for i in range(3):
        faction_terrain.append(make_faction_terrain_marker(
            "💎 Fragment Deposit",
            "FRAGMENT DEPOSIT\n─────────────────\nIron Dominion units within 4\" generate\n+1 Fragment Charge per turn\nVeilbound units treat as Difficult Terrain\n─────────────────\nNeutral terrain (place during setup)",
            "2255aa", "💎", tags=["terrain", "fragment-deposit"]))
    
    # 👁 Veilbound — Spirit Wells
    for i in range(3):
        faction_terrain.append(make_faction_terrain_marker(
            "🌀 Spirit Well",
            "SPIRIT WELL\n─────────────────\nVeilbound units within 4\" generate\n+2 Ritual Flow per turn\nIron Dominion units treat as Dangerous Terrain\n─────────────────\nNeutral terrain (place during setup)",
            "7733bb", "🌀", tags=["terrain", "spirit-well"]))
    
    # ══════════════════════════════════════════
    # PACK INTO BAGS
    # ══════════════════════════════════════════
    
    # Main terrain bag with sub-bags for organization
    area_terrain = [t for t in terrain_all if t["Name"] == "Custom_Tile"]
    block_terrain = [t for t in terrain_all if t["Name"] in ("BlockSquare", "BlockRectangle")]
    
    area_bag = make_bag("🌍 Area Terrain", x=0, y=1, z=0,
                       color={"r": 0.3, "g": 0.5, "b": 0.2},
                       contents=area_terrain)
    
    structures_bag = make_bag("🏗️ Structures & Blocks", x=0, y=1, z=0,
                             color={"r": 0.5, "g": 0.5, "b": 0.5},
                             contents=block_terrain)
    
    faction_bag = make_bag("⚔ Faction Terrain", x=0, y=1, z=0,
                          color={"r": 0.6, "g": 0.3, "b": 0.3},
                          contents=faction_terrain)
    
    terrain_master_bag = make_bag("🗺️ Terrain", x=45, y=1.5, z=22,
                                color={"r": 0.4, "g": 0.5, "b": 0.3},
                                contents=[area_bag, structures_bag, faction_bag])
    all_objects.append(terrain_master_bag)
    
    print(f"  ✓ Terrain system: {len(area_terrain)} area tiles, {len(block_terrain)} structures, {len(faction_terrain)} faction markers")
    
    # --- HP/Damage Tokens ---
    hp_bag_contents = []
    for i in range(30):
        hp_token = {
            "GUID": make_guid(),
            "Name": "Custom_Token",
            "Transform": make_transform(0, 1 + i * 0.1, 0, scale=0.3),
            "Nickname": "1 Damage",
            "Description": "Place on a unit to track damage taken.",
            "ColorDiffuse": {"r": 0.8, "g": 0.1, "b": 0.1},
            "CustomImage": {
                "ImageURL": "https://placehold.co/64x64/cc1111/white?text=1",
                "CustomToken": {
                    "Thickness": 0.1,
                    "MergeDistancePixels": 15.0,
                    "StandUp": False,
                    "Stackable": True,
                },
            },
            "Locked": False,
            "Tooltip": True,
            "Tags": ["damage"],
        }
        hp_bag_contents.append(hp_token)
    
    # Add 5-damage tokens
    for i in range(10):
        hp5_token = {
            "GUID": make_guid(),
            "Name": "Custom_Token",
            "Transform": make_transform(0, 1 + i * 0.1, 0, scale=0.35),
            "Nickname": "5 Damage",
            "Description": "Place on a unit to track 5 damage taken.",
            "ColorDiffuse": {"r": 0.6, "g": 0.0, "b": 0.0},
            "CustomImage": {
                "ImageURL": "https://placehold.co/64x64/990000/white?text=5",
                "CustomToken": {
                    "Thickness": 0.15,
                    "MergeDistancePixels": 15.0,
                    "StandUp": False,
                    "Stackable": True,
                },
            },
            "Locked": False,
            "Tooltip": True,
            "Tags": ["damage"],
        }
        hp_bag_contents.append(hp5_token)
    
    hp_bag = make_bag("❤️ Damage Tokens", x=45, y=1.5, z=30,
                      color={"r": 0.7, "g": 0.1, "b": 0.1},
                      contents=hp_bag_contents)
    all_objects.append(hp_bag)
    print(f"  ✓ Damage tokens (30 × 1dmg, 10 × 5dmg)")
    
    # --- Status Effect Tokens ---
    def make_status_token(name, desc, hex_color, icon, tags=None):
        return {
            "GUID": make_guid(),
            "Name": "Custom_Token",
            "Transform": make_transform(0, 1, 0, scale=1.0),
            "Nickname": name,
            "Description": desc,
            "ColorDiffuse": {
                "r": int(hex_color[0:2], 16) / 255,
                "g": int(hex_color[2:4], 16) / 255,
                "b": int(hex_color[4:6], 16) / 255,
            },
            "CustomImage": {
                "ImageURL": f"https://placehold.co/128x128/{hex_color}/ffffff?text={icon}",
                "CustomToken": {
                    "Thickness": 0.08,
                    "MergeDistancePixels": 15.0,
                    "StandUp": False,
                    "Stackable": True,
                },
            },
            "Locked": False,
            "Tooltip": True,
            "Tags": tags or ["status"],
        }
    
    status_tokens = []
    
    # Shaken — failed morale by <3
    for i in range(8):
        status_tokens.append(make_status_token(
            "⚡ Shaken",
            "SHAKEN\n─────────────────\n-1 ATK die next activation\nMust rally (roll 2d6 ≤ MOR) in Command Phase\nor remain Shaken.\nRemove after rallying.",
            "ddaa00", "⚡Shaken"))
    
    # Engaged — within 1" of enemy
    for i in range(10):
        status_tokens.append(make_status_token(
            "⚔ Engaged",
            "ENGAGED IN MELEE\n─────────────────\nCannot make ranged attacks.\nCannot voluntarily move away without\nDisengaging (forfeit all attacks this turn).\nPlace between combatants.",
            "cc3333", "⚔Engaged"))
    
    # Stealthed — hidden from targeting
    for i in range(6):
        status_tokens.append(make_status_token(
            "👁 Stealthed",
            "STEALTHED\n─────────────────\nCannot be targeted by ranged attacks\nfrom more than 8\" away.\nRemoved when unit attacks, takes damage,\nor enters Burning Terrain.",
            "334466", "👁Stealth"))
    
    # Charging — declared charge this turn
    for i in range(6):
        status_tokens.append(make_status_token(
            "🔺 Charging",
            "CHARGING\n─────────────────\n+1 ATK die on the charge attack.\nUnit must move in a straight line\ninto base contact with target.\nRemove at end of Combat Phase.",
            "ff6622", "🔺Charge"))
    
    # Overwatch — holding fire
    for i in range(4):
        status_tokens.append(make_status_token(
            "🎯 Overwatch",
            "OVERWATCH\n─────────────────\nUnit skips its attack this turn.\nMay make a free ranged attack against\nany enemy unit that moves within RNG\nduring the opponent's Movement Phase.\nRemove after firing or at end of turn.",
            "2266aa", "🎯Watch"))
    
    # Corrupted — Blight infection
    for i in range(6):
        status_tokens.append(make_status_token(
            "☠ Corrupted",
            "CORRUPTED (Blight)\n─────────────────\n-1 MOR permanently while corrupted.\nRoll 1d6 at start of each turn:\n1-2: Take 1 damage from spreading infection.\nRemove only via healing or purify ability.",
            "662288", "☠Blight"))
    
    # Inspired / Buffed
    for i in range(6):
        status_tokens.append(make_status_token(
            "✦ Inspired",
            "INSPIRED\n─────────────────\n+1 to Morale (MOR) tests.\nGranted by Commander auras,\ncards, or special abilities.\nRemove at end of turn unless stated otherwise.",
            "44bb44", "✦Buff"))
    
    # Stunned — cannot act
    for i in range(4):
        status_tokens.append(make_status_token(
            "💫 Stunned",
            "STUNNED\n─────────────────\nCannot move, attack, or use abilities\nthis turn. Skip this unit's activation.\nRemove at end of turn.\nCaused by critical hits or special effects.",
            "8888aa", "💫Stun"))
    
    # Activated — already acted this turn
    for i in range(10):
        status_tokens.append(make_status_token(
            "✓ Activated",
            "ACTIVATED\n─────────────────\nThis unit has already acted this turn.\nPlace after unit completes its activation.\nRemove all at start of next turn.\nHelps track which units have gone.",
            "555555", "✓Done"))
    
    status_bag = make_bag("🏷️ Status Tokens", x=-45, y=1.5, z=28,
                         color={"r": 0.7, "g": 0.6, "b": 0.2},
                         contents=status_tokens)
    all_objects.append(status_bag)
    print(f"  ✓ Status effect tokens ({len(status_tokens)})")
    
    # --- Discard Pile Zones ---
    # Player 1 discard tile
    p1_discard = {
        "GUID": make_guid(),
        "Name": "Custom_Tile",
        "Transform": {
            "posX": -24, "posY": 1.01, "posZ": -45,
            "rotX": 0, "rotY": 0, "rotZ": 0,
            "scaleX": 3.0, "scaleY": 1.0, "scaleZ": 4.0,
        },
        "Nickname": "📥 P1 Discard Pile",
        "Description": "Player 1 (White) — Place played and discarded cards here.",
        "ColorDiffuse": {"r": 0.2, "g": 0.2, "b": 0.25},
        "CustomImage": {
            "ImageURL": "https://placehold.co/300x400/333344/aaaaaa?text=P1+DISCARD",
            "ImageSecondaryURL": "",
            "WidthScale": 0.0,
            "CustomTile": {
                "Type": 0,
                "Thickness": 0.02,
                "Stackable": False,
            },
        },
        "Locked": True,
        "Tooltip": True,
        "Tags": ["discard"],
    }
    all_objects.append(p1_discard)
    
    # Player 2 discard tile
    p2_discard = {
        "GUID": make_guid(),
        "Name": "Custom_Tile",
        "Transform": {
            "posX": 24, "posY": 1.01, "posZ": -45,
            "rotX": 0, "rotY": 0, "rotZ": 0,
            "scaleX": 3.0, "scaleY": 1.0, "scaleZ": 4.0,
        },
        "Nickname": "📥 P2 Discard Pile",
        "Description": "Player 2 (Red) — Place played and discarded cards here.",
        "ColorDiffuse": {"r": 0.25, "g": 0.15, "b": 0.15},
        "CustomImage": {
            "ImageURL": "https://placehold.co/300x400/443333/aaaaaa?text=P2+DISCARD",
            "ImageSecondaryURL": "",
            "WidthScale": 0.0,
            "CustomTile": {
                "Type": 0,
                "Thickness": 0.02,
                "Stackable": False,
            },
        },
        "Locked": True,
        "Tooltip": True,
        "Tags": ["discard"],
    }
    all_objects.append(p2_discard)
    print("  ✓ Discard pile zones (P1 + P2)")
    
    # ── Step 4: Build Save File ──
    print("\n📄 Building TTS save file...")
    
    save_data = {
        "SaveName": "Shardborne",
        "GameMode": "",
        "Gravity": 0.5,
        "PlayArea": 1.0,
        "Date": "",
        "Table": "Table_RPG",
        "Sky": "Sky_Museum",
        "Note": "Shardborne — Tabletop Wargame\nv2.0 — Enhanced with maps, templates & automation\n\nUse !help in chat for commands.",
        "Rules": "",
        "XmlUI": "",
        "LuaScript": build_lua_script(),
        "LuaScriptState": "",
        "Grid": {
            "Type": 0,
            "Lines": True,
            "Color": {"r": 0.3, "g": 0.3, "b": 0.3},
            "Opacity": 0.25,
            "ThickLines": False,
            "Snapping": True,
            "Offset": False,
            "BothSnapping": False,
            "xSize": 1.0,
            "ySize": 1.0,
            "PosOffset": {"x": 0, "y": 1, "z": 0},
        },
        "Lighting": {
            "LightIntensity": 0.54,
            "LightColor": {"r": 1.0, "g": 0.97, "b": 0.9},
            "AmbientIntensity": 1.3,
            "AmbientType": 0,
            "AmbientSkyColor": {"r": 0.5, "g": 0.5, "b": 0.5},
            "AmbientEquatorColor": {"r": 0.5, "g": 0.5, "b": 0.5},
            "AmbientGroundColor": {"r": 0.5, "g": 0.5, "b": 0.5},
            "ReflectionIntensity": 0.0,
            "LutIndex": 0,
            "LutContribution": 1.0,
            "LutURL": "",
        },
        "Hands": {
            "Enable": True,
            "DisableUnused": False,
            "Hiding": 0,
            "HandTransforms": [
                {
                    "Color": "White",
                    "Transform": {
                        "posX": 0, "posY": 5, "posZ": -50,
                        "rotX": 0, "rotY": 0, "rotZ": 0,
                        "scaleX": 18, "scaleY": 5, "scaleZ": 8,
                    },
                },
                {
                    "Color": "Red",
                    "Transform": {
                        "posX": 0, "posY": 5, "posZ": 50,
                        "rotX": 0, "rotY": 180, "rotZ": 0,
                        "scaleX": 18, "scaleY": 5, "scaleZ": 8,
                    },
                },
            ],
        },
        "Turns": {
            "Enable": True,
            "Type": 1,
            "TurnOrder": ["White", "Red"],
            "Reverse": False,
            "SkipEmpty": False,
            "DisableInteractions": False,
            "PassTurns": True,
            "TurnColor": "",
        },
        "DecalPallet": [],
        "TabStates": {},
        "VersionNumber": "v13.3.0",
        "ObjectStates": all_objects,
    }
    
    # ── Step 5: Write Output ──
    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Shardborne.json")
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(save_data, f, indent=2, ensure_ascii=False)
    
    file_size = os.path.getsize(output_path)
    
    print(f"\n✅ Save file written: {output_path}")
    print(f"   Size: {file_size:,} bytes ({file_size / 1024:.1f} KB)")
    print(f"\n📋 Summary:")
    print(f"   {len(all_objects)} top-level objects")
    print(f"   {len(all_commanders)} commanders")
    print(f"   {len(all_units)} units")
    print(f"   {len(all_fragments)} fragments")
    print(f"   {len(card_library)} cards")
    print(f"\n📁 To install:")
    print(f"   Copy Shardborne.json to:")
    print(f"   %USERPROFILE%\\Documents\\My Games\\Tabletop Simulator\\Saves\\")
    print(f"   Then in TTS: Games → Save & Load → Shardborne")
    
    # Also write to TTS saves directory if it exists
    tts_saves = os.path.join(os.path.expanduser("~"), "Documents", "My Games", 
                             "Tabletop Simulator", "Saves")
    if os.path.exists(tts_saves):
        tts_output = os.path.join(tts_saves, "Shardborne.json")
        with open(tts_output, "w", encoding="utf-8") as f:
            json.dump(save_data, f, indent=2, ensure_ascii=False)
        print(f"\n🎮 Also copied to TTS Saves: {tts_output}")
    
    return save_data


if __name__ == "__main__":
    main()
