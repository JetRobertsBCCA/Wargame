import re, json

faction_files = [
    ('emberclaw-warpack', 'data/factions/emberclaw-warpack.js'),
    ('iron-dominion', 'data/factions/iron-dominion.js'),
    ('nightfang-dominion', 'data/factions/nightfang-dominion.js'),
    ('thornweft-matriarchy', 'data/factions/thornweft-matriarchy.js'),
    ('veilbound-shogunate', 'data/factions/veilbound-shogunate.js'),
]

# Read card library keys from core.js
with open('data/core.js', 'r', encoding='utf-8') as f:
    core = f.read()

lib_cards = set()
in_lib = False
for line in core.split('\n'):
    if 'card_library:' in line:
        in_lib = True
        continue
    if in_lib:
        m = re.match(r'\s*"([^"]+)":\s*\{', line)
        if m:
            lib_cards.add(m.group(1))
        m2 = re.match(r'\s*(\w+):\s*\{', line)
        if m2 and m2.group(1).strip() not in ('type','cp','timing','effect','card_library','description'):
            name = m2.group(1).strip()
            if len(name) > 3:
                lib_cards.add(name)

print(f'Library cards: {len(lib_cards)}')

# Parse each faction file to extract commander names + their level_1_deck
all_missing = {}  # faction -> [{commander, card, card_type}]

for faction_id, fpath in faction_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all gameData.commanders.push blocks
    # Each commander starts with { name: "..." and has a level_1_deck
    # Use a more careful approach: find commanders by looking for patterns
    
    # Find all commander blocks by looking for the pattern:
    # name: "Commander Name",
    # faction: "faction-id",
    # ... 
    # level_1_deck: { ... }
    
    cmds = []
    # Split by commander entries - look for name/faction pairs
    cmd_pattern = re.compile(
        r'\{\s*\n\s*name:\s*"([^"]+)",\s*\n\s*faction:\s*"([^"]+)".*?level_1_deck:\s*\{(.*?)\}\s*,\s*\n\s*skill_tree',
        re.DOTALL
    )
    
    for m in cmd_pattern.finditer(content):
        cmd_name = m.group(1)
        cmd_faction = m.group(2)
        deck_block = m.group(3)
        
        # Parse cards from deck block
        current_cat = 'unknown'
        for line in deck_block.split('\n'):
            cat_match = re.match(r'\s*(command|tech|fragment|tactical)\s*:', line)
            if cat_match:
                current_cat = cat_match.group(1)
            for card_m in re.finditer(r'"([^"]+)"', line):
                card = card_m.group(1)
                if card not in ('command','tech','fragment','tactical'):
                    if card not in lib_cards:
                        if faction_id not in all_missing:
                            all_missing[faction_id] = []
                        all_missing[faction_id].append({
                            'commander': cmd_name,
                            'card': card,
                            'type': current_cat
                        })

# Print by faction
total = 0
for faction_id, entries in sorted(all_missing.items()):
    print(f'\n=== {faction_id.upper()} ({len(entries)} missing) ===')
    for e in entries:
        print(f'  [{e["type"]}] "{e["card"]}" -- {e["commander"]}')
        total += 1

print(f'\n\nTotal missing: {total}')
