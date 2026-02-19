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
        "Transform": make_transform(0, 0.5, 0, scale=1.0),
        "Nickname": nickname,
        "Description": "Standard 48\" × 48\" battlefield. 1 TTS unit = 1 inch.\nGrid overlay shows 1\" squares.",
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
    
    return make_bag("🗺️ Map Variants", x=-28, y=1.5, z=4,
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
        x=-28, y=1.5, z=0,
        color={"r": 0.9, "g": 0.9, "b": 0.5}
    )


# ─── Lua Script Builder ─────────────────────────────────────────────────────────

def build_lua_script():
    """Build the comprehensive Lua global script for game automation."""
    return r'''--[[
    ╔══════════════════════════════════════════════╗
    ║     SHARDBORNE — Tabletop Simulator Mod      ║
    ║     Global Script v2.0                       ║
    ╚══════════════════════════════════════════════╝
    
    Features:
    - Turn phase management (Command → Movement → Combat → End)
    - Auto-combat resolver (ATK dice vs DEF with crit tracking)
    - Morale testing (2d6 vs MOR)
    - Card draw mechanics (draw 2/turn, hand limit 7)
    - CP / Fragment tracking per player
    - Army point validation (!army command)
    - HP damage tracking via context menu buttons
    - Round timer
    - Unit stat lookup
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
}

-- ════════════════════════════════════════
-- INITIALIZATION
-- ════════════════════════════════════════

function onLoad(save_state)
    if save_state ~= "" then
        local loaded = JSON.decode(save_state)
        if loaded then
            GameState = loaded
        end
    end
    
    createUI()
    broadcastToAll("═══ SHARDBORNE v2.0 ═══\nTabletop Simulator Edition\n\nWelcome, Commanders!\nType !help for commands.", {1, 0.8, 0.2})
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

<Panel position="0 0 -50" rotation="0 0 0" width="300" height="580" 
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
    
    if GameState.turn > GameState.max_turns then
        local winner = "TIE"
        local wVP = GameState.player_vp.White or 0
        local rVP = GameState.player_vp.Red or 0
        if wVP > rVP then winner = "Player 1 (White)" 
        elseif rVP > wVP then winner = "Player 2 (Red)" end
        
        broadcastToAll("═══ GAME OVER ═══\nWhite VP: " .. wVP .. " | Red VP: " .. rVP ..
                       "\n" .. (winner == "TIE" and "It's a TIE!" or winner .. " WINS!"), {1, 0.2, 0.2})
        GameState.phase = "Game Over"
        updateUI()
        return
    end
    
    broadcastToAll("═══════════════════════\n   TURN " .. GameState.turn .. " BEGINS\n═══════════════════════", {0.2, 1, 0.4})
    
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
    
    broadcastToAll("═══════════════════════\n   SHARDBORNE BEGINS!\n   Turn 1 — Command Phase\n═══════════════════════\n\nBoth players start with 3 CP.\nDraw your starting hand of 5 cards.\n\nType !help for all commands.", {1, 0.8, 0.2})
    if GameState.timer_enabled then
        GameState.timer_start = os.time()
    end
    updateUI()
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
end

function onEndPhase()
    printToAll("🏁 End Phase Checklist:", {0.9, 0.9, 0.5})
    printToAll("  ✓ Morale test for units at ≤ half HP (roll 2d6 ≤ MOR)", {0.7, 0.7, 0.7})
    printToAll("  ✓ Score objectives (1 VP per controlled objective)", {0.7, 0.7, 0.7})
    printToAll("  ✓ Remove destroyed units, discard temp effects", {0.7, 0.7, 0.7})
    printToAll("  ✓ Check victory conditions", {0.7, 0.7, 0.7})
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
    broadcastToAll("🎲 Morale Test: " .. d1 .. " + " .. d2 .. " = " .. total ..
                   "\n(Unit passes if " .. total .. " ≤ its MOR stat)", {0.4, 0.8, 1})
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
        UI.setAttribute("mainPanel", "height", "580")
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
    
    -- !atk <ATK_dice> vs <DEF>
    local atk, def = msg:match("!atk%s+(%d+)%s+vs%s+(%d+)")
    if atk and def then
        atk = tonumber(atk)
        def = tonumber(def)
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
        broadcastToAll("⚔️ ATTACK: " .. atk .. " dice vs DEF " .. def .. 
                       "\nRolls: [" .. table.concat(results, ", ") .. "]" ..
                       "\nHits: " .. hits .. " | Crits: " .. crits .. 
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
        local passed = total <= mor
        broadcastToAll("🎲 Morale Test vs MOR " .. mor .. ": " .. d1 .. "+" .. d2 .. "=" .. total .. 
                       " → " .. (passed and "✅ PASSED" or "❌ FAILED — unit flees!"), 
                       passed and {0.3, 1, 0.3} or {1, 0.3, 0.3})
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
        broadcastToAll("🔄 Game state RESET. Press 'Next Phase' to start.", {1, 0.5, 0.2})
        updateUI()
        return false
    end
    
    -- !phase
    if msg:match("^!phase") then
        printToAll("Turn " .. GameState.turn .. " — " .. GameState.phase .. " Phase\n" ..
                   "White: CP=" .. (GameState.player_cp.White or 0) .. " VP=" .. (GameState.player_vp.White or 0) ..
                   " | Red: CP=" .. (GameState.player_cp.Red or 0) .. " VP=" .. (GameState.player_vp.Red or 0),
                   {0.8, 0.8, 0.2})
        return false
    end
    
    -- !help
    if msg:match("^!help") then
        printToAll("═══ SHARDBORNE COMMANDS ═══\n" ..
                   "!atk <dice> vs <DEF>  — Attack roll (e.g., !atk 6 vs 4)\n" ..
                   "!morale <MOR>         — Morale test (e.g., !morale 8)\n" ..
                   "!roll XdY             — Roll any dice (e.g., !roll 2d6)\n" ..
                   "!army                 — Validate army points & composition\n" ..
                   "!vp <player> <+/-N>   — Adjust VP (e.g., !vp white +2)\n" ..
                   "!cp <player> <+/-N>   — Adjust CP (e.g., !cp red -3)\n" ..
                   "!scenario             — Generate random scenario\n" ..
                   "!phase                — Show current game state\n" ..
                   "!reset                — Reset game to setup\n" ..
                   "!help                 — Show this help", {0.8, 0.8, 0.2})
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
        "📖 SHARDBORNE QUICK REFERENCE",
        """═══ TURN STRUCTURE ═══
1. COMMAND PHASE
   • Gain CP (3 + Commander's Command bonus)
   • Draw 2 cards (hand limit 7)
   • Play Command/Tech cards (spend CP)
   • Activate Fragment abilities

2. MOVEMENT PHASE
   • Move each unit up to its MOV stat (inches)
   • Terrain: Difficult = half speed, Impassable = blocked
   • Fly: ignore terrain
   • Engagement: within 1" of enemy = engaged (no free movement)

3. COMBAT PHASE
   • Declare attacks (check RNG stat for range)
   • Roll ATK dice: each die ≥ target's DEF = 1 hit
   • Roll of 6 = CRIT (2 damage instead of 1)
   • Apply damage to HP
   • Play Tactical cards during combat

4. END PHASE
   • Morale test for units at half HP or below: roll 2d6 ≤ MOR to pass
   • Failed morale = unit flees (remove or retreat)
   • Score objectives
   • Discard temporary effects

═══ CHAT COMMANDS ═══
!atk <dice> vs <DEF>  — Auto-resolve attack
!morale <MOR>         — Auto-resolve morale test
!roll XdY             — Roll any dice
!phase                — Show current phase
!help                 — Show all commands

═══ CARD TYPES ═══
[CMD]  Command  (green)  — Movement & army-wide orders
[TECH] Tech     (blue)   — Equipment & upgrades
[FRAG] Fragment (purple) — Powerful but risky abilities
[TAC]  Tactical (orange) — Combat tricks & reactions

═══ KEY RULES ═══
• Commander death = no more cards for that player
• Cards can only be played within Commander's range
• War Machines: huge, powerful, limited per army
• Fragments: powerful items with instability risk
• Cover: +1 DEF
• Elevated: +2 RNG
• Flanking: ignore 1 DEF""",
        x=-28, y=1.5, z=-12,
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
    template_bag = make_bag("📐 Blast & Cone Templates", x=-26, y=1.5, z=8,
                            color={"r": 0.8, "g": 0.4, "b": 0.1},
                            contents=template_bag_contents)
    all_objects.append(template_bag)
    print("  ✓ Templates bag (2 blasts + 3 cones)")
    
    # --- Range Rings Bag ---
    range_bag_contents = []
    for radius in [1, 3, 6, 8, 10]:
        range_bag_contents.append(make_range_ring(radius))
    range_bag = make_bag("📏 Range Rings", x=-26, y=1.5, z=14,
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
    
    dice_bag = make_bag("🎲 Dice", x=26, y=1.5, z=0, 
                        color={"r": 0.8, "g": 0.8, "b": 0.8},
                        contents=dice_bag_contents)
    all_objects.append(dice_bag)
    print(f"  ✓ Dice bag (10 combat + 2 morale)")
    
    # --- Counters ---
    all_objects.append(make_counter("VP Player 1", x=26, y=1.5, z=-8, color={"r": 0.9, "g": 0.9, "b": 0.2}))
    all_objects.append(make_counter("VP Player 2", x=26, y=1.5, z=-12, color={"r": 0.9, "g": 0.2, "b": 0.2}))
    all_objects.append(make_counter("Round Counter", x=26, y=1.5, z=-16, color={"r": 0.4, "g": 0.7, "b": 0.4}))
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
    
    card_deck_x = -26
    card_deck_z = -20
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
    
    card_bag = make_bag("📋 Card Library", x=-26, y=1.5, z=-20,
                        color={"r": 0.3, "g": 0.3, "b": 0.6},
                        contents=card_bag_contents)
    all_objects.append(card_bag)
    print(f"  ✓ Card library ({len(card_library)} cards in {len(card_bag_contents)} type decks)")
    
    # --- Faction Bags (one per faction) ---
    factions_processed = set()
    faction_x_start = -20
    
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
        bag_x = faction_x_start + (faction_idx * 10)
        faction_bag = make_bag(f"🏴 {fname}", x=bag_x, y=1.5, z=20,
                              color=f_color, contents=faction_contents)
        all_objects.append(faction_bag)
        
        print(f"  ✓ {fname}: {len(f_commanders)} commanders, {len(f_units)} units, "
              f"{len(f_fragments)} fragments → faction bag")
    
    # --- Deployment Zones ---
    all_objects.append(make_zone("Player 1 Deploy Zone", x=0, y=0.5, z=-20, 
                                scale_x=48, scale_z=8,
                                color={"r": 0.2, "g": 0.4, "b": 0.8}))
    all_objects.append(make_zone("Player 2 Deploy Zone", x=0, y=0.5, z=20, 
                                scale_x=48, scale_z=8,
                                color={"r": 0.8, "g": 0.2, "b": 0.2}))
    print("  ✓ Deployment zones")
    
    # --- Objective Markers (5) ---
    obj_positions = [(0, 0), (-12, -8), (12, -8), (-12, 8), (12, 8)]
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
    
    obj_bag = make_bag("🎯 Objective Markers", x=26, y=1.5, z=8,
                       color={"r": 1.0, "g": 0.85, "b": 0.0},
                       contents=obj_bag_contents)
    all_objects.append(obj_bag)
    print("  ✓ Objective markers (5)")
    
    # --- Terrain Tokens ---
    terrain_types = [
        ("Forest (Difficult)", "🌲", "4a6b2a", "Difficult terrain: half movement. Provides cover (+1 DEF)."),
        ("Ruins (Cover)", "🏚️", "6b6b6b", "Provides cover (+1 DEF). Blocks LoS if wall section."),
        ("Hill (Elevated)", "⛰️", "8b7b5b", "Elevated: +2 RNG for units on top. Provides cover to units behind."),
        ("River (Difficult)", "🌊", "2a4a6b", "Difficult terrain: half movement. No cover."),
        ("Burning (Hazard)", "🔥", "8b2a1a", "Hazardous: 1 damage to non-Fire-Immune units entering. Emberclaw units ignore."),
    ]
    terrain_bag_contents = []
    for tname, icon, hex_color, tdesc in terrain_types:
        for copy in range(3):
            terrain_token = {
                "GUID": make_guid(),
                "Name": "Custom_Token",
                "Transform": make_transform(0, 1 + copy * 0.2, 0, scale=2.0),
                "Nickname": f"{icon} {tname}",
                "Description": tdesc,
                "ColorDiffuse": {
                    "r": int(hex_color[0:2], 16) / 255,
                    "g": int(hex_color[2:4], 16) / 255,
                    "b": int(hex_color[4:6], 16) / 255,
                },
                "CustomImage": {
                    "ImageURL": f"https://placehold.co/256x256/{hex_color}/white?text={icon}",
                    "CustomToken": {
                        "Thickness": 0.1,
                        "MergeDistancePixels": 15.0,
                        "StandUp": False,
                        "Stackable": True,
                    },
                },
                "Locked": False,
                "Tooltip": True,
                "Tags": ["terrain"],
            }
            terrain_bag_contents.append(terrain_token)
    
    terrain_bag = make_bag("🗺️ Terrain", x=26, y=1.5, z=16,
                          color={"r": 0.4, "g": 0.5, "b": 0.3},
                          contents=terrain_bag_contents)
    all_objects.append(terrain_bag)
    print(f"  ✓ Terrain tokens ({len(terrain_bag_contents)})")
    
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
    
    hp_bag = make_bag("❤️ Damage Tokens", x=26, y=1.5, z=20,
                      color={"r": 0.7, "g": 0.1, "b": 0.1},
                      contents=hp_bag_contents)
    all_objects.append(hp_bag)
    print(f"  ✓ Damage tokens (30 × 1dmg, 10 × 5dmg)")
    
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
                        "posX": 0, "posY": 5, "posZ": -30,
                        "rotX": 0, "rotY": 0, "rotZ": 0,
                        "scaleX": 12, "scaleY": 5, "scaleZ": 5,
                    },
                },
                {
                    "Color": "Red",
                    "Transform": {
                        "posX": 0, "posY": 5, "posZ": 30,
                        "rotX": 0, "rotY": 180, "rotZ": 0,
                        "scaleX": 12, "scaleY": 5, "scaleZ": 5,
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
