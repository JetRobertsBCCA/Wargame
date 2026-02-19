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

GITHUB_RAW = "https://raw.githubusercontent.com/NJRoberts-Cspire/Wargame/main"
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

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

def make_game_board():
    """Create the main game board (48x48 for Standard)."""
    return {
        "GUID": make_guid(),
        "Name": "Custom_Board",
        "Transform": make_transform(0, 0.5, 0, scale=1.0),
        "Nickname": "Shardborne Battlefield",
        "Description": "Standard 48\" × 48\" battlefield. 1 TTS unit = 1 inch.",
        "ColorDiffuse": {"r": 0.35, "g": 0.4, "b": 0.3},
        "CustomImage": {
            "ImageURL": f"https://placehold.co/1024x1024/5a6b4a/3d4a32?text=Shardborne+Battlefield",
            "WidthScale": 0.0,
        },
        "Locked": True,
        "Grid": True,
        "Tooltip": True,
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
    ║     Global Script v1.0                       ║
    ╚══════════════════════════════════════════════╝
    
    Core Rules Engine:
    - Turn phase management (Command → Movement → Combat → End)
    - Dice rolling with hit/crit calculation
    - Morale testing (2d6 vs MOR)
    - Card draw mechanics (draw 2/turn, hand limit 7)
    - CP tracking per player
    - HP tracking via tokens
    
    Controls:
    - UI buttons for phase advancement
    - Right-click context menu on units for stat checks
    - Dice auto-resolve on landing
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
    cards_drawn_this_turn = {White = 0, Red = 0},
    hand_limit = 7,
    draw_per_turn = 2,
    game_started = false,
    max_turns = 6,
}

-- ════════════════════════════════════════
-- INITIALIZATION
-- ════════════════════════════════════════

function onLoad(save_state)
    -- Restore state if saved
    if save_state ~= "" then
        local loaded = JSON.decode(save_state)
        if loaded then
            GameState = loaded
        end
    end
    
    createUI()
    broadcastToAll("═══ SHARDBORNE ═══\nTabletop Simulator Edition\n\nWelcome, Commanders!", {1, 0.8, 0.2})
    printToAll("[Phase: " .. GameState.phase .. "] Turn " .. GameState.turn, {0.8, 0.8, 0.8})
end

function onSave()
    return JSON.encode(GameState)
end

-- ════════════════════════════════════════
-- UI CREATION
-- ════════════════════════════════════════

function createUI()
    -- Clear existing UI
    UI.setXml("")
    
    Wait.time(function()
        local xml = [[
<Defaults>
    <Button fontSize="14" fontStyle="Bold" />
    <Text fontSize="13" color="#FFFFFF" />
</Defaults>

<Panel position="0 0 -50" rotation="0 0 0" width="320" height="480" 
       color="rgba(0,0,0,0.85)" padding="8" id="mainPanel"
       anchorMin="1 1" anchorMax="1 1" offsetXY="-170 -10"
       active="true">

    <VerticalLayout spacing="4" padding="6 6 6 6">
        <Text id="titleText" fontSize="18" fontStyle="Bold" 
              color="#FFD700" alignment="MiddleCenter">SHARDBORNE</Text>
        
        <Text id="turnText" fontSize="14" color="#AAAAAA" 
              alignment="MiddleCenter">Turn 0 — Setup</Text>
        
        <Text id="phaseText" fontSize="16" fontStyle="Bold" 
              color="#44FF44" alignment="MiddleCenter">Setup Phase</Text>
        
        <HorizontalLayout spacing="4" preferredHeight="36">
            <Button id="btnNextPhase" onClick="nextPhase" 
                    color="#335533" textColor="#FFFFFF"
                    tooltip="Advance to next phase">Next Phase ▶</Button>
            <Button id="btnNextTurn" onClick="nextTurn" 
                    color="#553333" textColor="#FFFFFF"
                    tooltip="Start next turn">Next Turn ⟳</Button>
        </HorizontalLayout>
        
        <Text fontSize="12" color="#888888" alignment="MiddleCenter">──── Player 1 (White) ────</Text>
        <HorizontalLayout spacing="4" preferredHeight="30">
            <Text id="cpWhite" fontSize="14" color="#FFDD44">CP: 0</Text>
            <Button onClick="addCPWhite" color="#444422" 
                    textColor="#FFFF00" preferredWidth="30">+</Button>
            <Button onClick="subCPWhite" color="#442222" 
                    textColor="#FF4444" preferredWidth="30">-</Button>
        </HorizontalLayout>
        <HorizontalLayout spacing="4" preferredHeight="30">
            <Text id="fragWhite" fontSize="14" color="#BB66FF">Frags: 0</Text>
            <Button onClick="addFragWhite" color="#332244" 
                    textColor="#BB66FF" preferredWidth="30">+</Button>
            <Button onClick="subFragWhite" color="#442222" 
                    textColor="#FF4444" preferredWidth="30">-</Button>
        </HorizontalLayout>
        
        <Text fontSize="12" color="#888888" alignment="MiddleCenter">──── Player 2 (Red) ────</Text>
        <HorizontalLayout spacing="4" preferredHeight="30">
            <Text id="cpRed" fontSize="14" color="#FFDD44">CP: 0</Text>
            <Button onClick="addCPRed" color="#444422" 
                    textColor="#FFFF00" preferredWidth="30">+</Button>
            <Button onClick="subCPRed" color="#442222" 
                    textColor="#FF4444" preferredWidth="30">-</Button>
        </HorizontalLayout>
        <HorizontalLayout spacing="4" preferredHeight="30">
            <Text id="fragRed" fontSize="14" color="#BB66FF">Frags: 0</Text>
            <Button onClick="addFragRed" color="#332244" 
                    textColor="#BB66FF" preferredWidth="30">+</Button>
            <Button onClick="subFragRed" color="#442222" 
                    textColor="#FF4444" preferredWidth="30">-</Button>
        </HorizontalLayout>
        
        <Text fontSize="12" color="#888888" alignment="MiddleCenter">──── Dice Tools ────</Text>
        <HorizontalLayout spacing="4" preferredHeight="36">
            <Button onClick="rollAttack" color="#553322" 
                    textColor="#FFFFFF" tooltip="Roll dice pool">🎲 Roll ATK</Button>
            <Button onClick="rollMorale" color="#335555" 
                    textColor="#FFFFFF" tooltip="Roll 2d6 morale">🎲 Morale</Button>
        </HorizontalLayout>
        
        <HorizontalLayout spacing="4" preferredHeight="36">
            <Button onClick="togglePanel" color="#222222" 
                    textColor="#888888">Minimize ▲</Button>
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
        UI.setAttribute("fragWhite", "text", "Frags: " .. (GameState.player_fragments.White or 0))
        UI.setAttribute("fragRed", "text", "Frags: " .. (GameState.player_fragments.Red or 0))
        
        -- Color phase text
        local phase_colors = {
            Setup = "#888888",
            Command = "#FFD700",
            Movement = "#44AAFF",
            Combat = "#FF4444",
            ["End"] = "#44FF44",
        }
        UI.setAttribute("phaseText", "color", phase_colors[GameState.phase] or "#FFFFFF")
    end)
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
        -- End of turn phases, wrap around
        nextTurn()
        return
    end
    
    GameState.phase = GameState.phases[GameState.phase_index]
    
    local phase_desc = {
        Command = "Play cards, activate abilities, spend CP",
        Movement = "Move units up to their MOV stat",
        Combat = "Declare attacks, roll dice, resolve damage",
        ["End"] = "Check morale, score objectives, clean up",
    }
    
    broadcastToAll("═══ " .. string.upper(GameState.phase) .. " PHASE ═══\n" .. 
                   (phase_desc[GameState.phase] or ""), {1, 0.8, 0.2})
    
    -- Phase-specific triggers
    if GameState.phase == "Command" then
        onCommandPhase()
    elseif GameState.phase == "End" then
        onEndPhase()
    end
    
    updateUI()
end

function nextTurn(player, value, id)
    GameState.turn = GameState.turn + 1
    GameState.phase_index = 0
    GameState.phase = "Command"
    GameState.cards_drawn_this_turn = {White = 0, Red = 0}
    
    if GameState.turn > GameState.max_turns then
        broadcastToAll("═══ GAME OVER ═══\nFinal scoring!", {1, 0.2, 0.2})
        GameState.phase = "Game Over"
        updateUI()
        return
    end
    
    broadcastToAll("═══════════════════════\n   TURN " .. GameState.turn .. " BEGINS\n═══════════════════════", {0.2, 1, 0.4})
    
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
    
    broadcastToAll("═══════════════════════\n   SHARDBORNE BEGINS!\n   Turn 1 — Command Phase\n═══════════════════════\n\nBoth players start with 3 CP.\nDraw your starting hand of 5 cards.", {1, 0.8, 0.2})
    updateUI()
end

-- ════════════════════════════════════════
-- PHASE TRIGGERS
-- ════════════════════════════════════════

function onCommandPhase()
    -- Each player gains CP based on their commander's Command stat
    -- Default: +3 CP per turn (can be modified)
    local cp_gain = 3
    
    for _, p in ipairs(GameState.players) do
        GameState.player_cp[p] = (GameState.player_cp[p] or 0) + cp_gain
    end
    
    printToAll("⚡ Both players gain +" .. cp_gain .. " CP", {1, 0.85, 0.3})
    printToAll("📋 Play Command cards, activate abilities, draw cards (2/turn, hand limit 7)", {0.7, 0.7, 0.7})
end

function onEndPhase()
    printToAll("🏁 End Phase: Check morale for units below half HP", {0.7, 0.7, 0.7})
    printToAll("🏁 Score objectives, remove destroyed units, reset temporary effects", {0.7, 0.7, 0.7})
end

-- ════════════════════════════════════════
-- CP & FRAGMENT TRACKING
-- ════════════════════════════════════════

function addCPWhite()  GameState.player_cp.White = (GameState.player_cp.White or 0) + 1; updateUI() end
function subCPWhite()  GameState.player_cp.White = math.max(0, (GameState.player_cp.White or 0) - 1); updateUI() end
function addCPRed()    GameState.player_cp.Red = (GameState.player_cp.Red or 0) + 1; updateUI() end
function subCPRed()    GameState.player_cp.Red = math.max(0, (GameState.player_cp.Red or 0) - 1); updateUI() end
function addFragWhite() GameState.player_fragments.White = (GameState.player_fragments.White or 0) + 1; updateUI() end
function subFragWhite() GameState.player_fragments.White = math.max(0, (GameState.player_fragments.White or 0) - 1); updateUI() end
function addFragRed()   GameState.player_fragments.Red = (GameState.player_fragments.Red or 0) + 1; updateUI() end
function subFragRed()   GameState.player_fragments.Red = math.max(0, (GameState.player_fragments.Red or 0) - 1); updateUI() end

-- ════════════════════════════════════════
-- DICE ROLLING
-- ════════════════════════════════════════

function rollAttack(player)
    -- Prompt: enter ATK dice count and target DEF
    broadcastToAll("🎲 ATK Roll — Use the dice on the table!\nHit: die ≥ target DEF | Crit: roll 6 (2 damage)\n\nRight-click a unit token to see its stats.", {1, 0.7, 0.3})
end

function rollMorale(player)
    -- Roll 2d6 for morale test
    local d1 = math.random(1, 6)
    local d2 = math.random(1, 6)
    local total = d1 + d2
    
    broadcastToAll("🎲 Morale Test: " .. d1 .. " + " .. d2 .. " = " .. total .. 
                   "\n(Unit passes if " .. total .. " ≤ its MOR stat)", {0.4, 0.8, 1})
end

-- ════════════════════════════════════════
-- PANEL TOGGLE
-- ════════════════════════════════════════

local panelMinimized = false

function togglePanel(player)
    panelMinimized = not panelMinimized
    if panelMinimized then
        UI.setAttribute("mainPanel", "height", "60")
        UI.setAttribute("mainPanel", "offsetXY", "-170 -10")
    else
        UI.setAttribute("mainPanel", "height", "480")
        UI.setAttribute("mainPanel", "offsetXY", "-170 -10")
    end
end

-- ════════════════════════════════════════
-- OBJECT CONTEXT MENUS
-- ════════════════════════════════════════

function onObjectMenuAction(obj, player_color, index)
    -- Custom right-click menu items are not auto-created;
    -- this handles if users add custom menu items via scripting
end

-- Tooltip enhancement: when hovering over tokens, show stat summary
function onObjectHover(player_color, obj)
    -- TTS shows Nickname + Description automatically
    -- No additional action needed
end

-- ════════════════════════════════════════
-- COMBAT HELPER (chat commands)
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
        local total_dmg = hits + crits  -- crits deal 2 damage (1 hit + 1 bonus)
        broadcastToAll("⚔️ ATTACK: " .. atk .. " dice vs DEF " .. def .. 
                       "\nRolls: [" .. table.concat(results, ", ") .. "]" ..
                       "\nHits: " .. hits .. " | Crits: " .. crits .. 
                       " | Total Damage: " .. total_dmg, {1, 0.4, 0.3})
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
    
    -- !help
    if msg:match("^!help") then
        printToAll("═══ SHARDBORNE COMMANDS ═══\n" ..
                   "!roll XdY — Roll X dice with Y sides\n" ..
                   "!atk <dice> vs <DEF> — Attack roll (e.g. !atk 6 vs 4)\n" ..
                   "!morale <MOR> — Morale test (e.g. !morale 8)\n" ..
                   "!phase — Show current phase\n" ..
                   "!help — Show this help", {0.8, 0.8, 0.2})
        return false
    end
    
    -- !phase
    if msg:match("^!phase") then
        printToAll("Turn " .. GameState.turn .. " — " .. GameState.phase .. " Phase\n" ..
                   "Active: " .. GameState.active_player .. "\n" ..
                   "White CP: " .. (GameState.player_cp.White or 0) .. " | Red CP: " .. (GameState.player_cp.Red or 0),
                   {0.8, 0.8, 0.2})
        return false
    end
    
    return true
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
    
    # --- Game Board ---
    all_objects.append(make_game_board())
    print("  ✓ Game board")
    
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
        "Note": "Shardborne — Tabletop Wargame\nv1.0 — Generated from game data\n\nUse !help in chat for commands.",
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
