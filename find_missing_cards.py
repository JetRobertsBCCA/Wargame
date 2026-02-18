import re, json

core_path = 'data/core.js'
faction_files = [
    'data/factions/emberclaw-warpack.js',
    'data/factions/iron-dominion.js',
    'data/factions/nightfang-dominion.js',
    'data/factions/thornweft-matriarchy.js',
    'data/factions/veilbound-shogunate.js',
]

with open(core_path, 'r', encoding='utf-8') as f:
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
        m2 = re.match(r'\s*(\w[\w\s]*\w|\w):\s*\{', line)
        if m2 and m2.group(1).strip() not in ('type','cp','timing','effect','card_library','description'):
            name = m2.group(1).strip()
            if len(name) > 3:
                lib_cards.add(name)

print(f'Library cards found: {len(lib_cards)}')

referenced = {}
for fpath in faction_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for m in re.finditer(r'name:\s*"([^"]+)".*?level_1_deck:\s*\{(.*?)\}\s*,', content, re.DOTALL):
        cmd_name = m.group(1)
        deck = m.group(2)
        current_cat = 'unknown'
        for line in deck.split('\n'):
            cat_match = re.match(r'\s*(command|tech|fragment|tactical)\s*:', line)
            if cat_match:
                current_cat = cat_match.group(1)
            for card_m in re.finditer(r'"([^"]+)"', line):
                card = card_m.group(1)
                if card not in ('command','tech','fragment','tactical'):
                    if card not in referenced:
                        referenced[card] = {'type': current_cat, 'commanders': []}
                    referenced[card]['commanders'].append(cmd_name)

missing = {c: info for c, info in referenced.items() if c not in lib_cards}
found = {c: info for c, info in referenced.items() if c in lib_cards}
print(f'Total referenced cards: {len(referenced)}')
print(f'Found in library: {len(found)}')
print(f'MISSING from library: {len(missing)}')
print()
for card in sorted(missing.keys()):
    info = missing[card]
    print(f'  [{info["type"]}] {card} -- used by: {", ".join(info["commanders"])}')
