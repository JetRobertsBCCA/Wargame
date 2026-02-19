"""
Comprehensive Balance Audit for Shardborne Universe — v2
Uses a more robust JS parser to handle all faction file formats.
"""
import re
import json
import os
from collections import defaultdict

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

FACTION_FILES = [
    "data/factions/emberclaw-warpack.js",
    "data/factions/iron-dominion.js",
    "data/factions/nightfang-dominion.js",
    "data/factions/thornweft-matriarchy.js",
    "data/factions/veilbound-shogunate.js",
]

def js_to_json_ish(text):
    """Convert JS object literals to something closer to JSON for regex extraction."""
    # We won't do full conversion — instead use targeted regex extraction per unit object.
    pass

def extract_all_units(filepath):
    """Extract unit objects from a JS file using regex-per-field approach."""
    fullpath = os.path.join(BASE_DIR, filepath)
    with open(fullpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    units = []
    
    # Strategy: find all unit object blocks that contain stats: { ATK:..., DEF:..., HP:..., MOV:..., RNG:..., MOR:... }
    # and also have name: and points_cost:
    # This covers both compact (single-line) and multi-line formats.
    
    # Find all occurrences of stats blocks with name and points_cost nearby
    # We'll scan for each stats: { ... } block and then look backwards/forwards for other fields
    
    # Find each unit by looking for objects with stats: { ATK:
    # Use a broad pattern to find unit object boundaries
    
    # Pattern: find { ... stats: { ATK: N, DEF: N, HP: N, MOV: N, RNG: N, MOR: N } ... }
    # Negative lookbehind to exclude battle_stats and base_stats (commander fields)
    stats_pattern = r'(?<!battle_)(?<!base_)stats:\s*\{\s*ATK:\s*(\d+)\s*,\s*DEF:\s*(\d+)\s*,\s*HP:\s*(\d+)\s*,\s*MOV:\s*(\d+)\s*,\s*RNG:\s*(\d+)\s*,\s*MOR:\s*(\d+)\s*\}'
    
    for m in re.finditer(stats_pattern, content):
        atk, def_, hp, mov, rng, mor = [int(x) for x in m.groups()]
        
        # Now find the enclosing object block for this stats match
        # Go backwards to find the opening { for this unit
        pos = m.start()
        # Find the nearest name: "..." before this position
        # Search a reasonable window before the stats
        window_start = max(0, pos - 2000)
        window = content[window_start:pos]
        
        # Find the last name: "..." in this window
        name_matches = list(re.finditer(r'name:\s*"([^"]+)"', window))
        if not name_matches:
            continue
        name = name_matches[-1].group(1)
        
        # Find faction
        faction_matches = list(re.finditer(r'faction:\s*"([^"]+)"', window))
        faction = faction_matches[-1].group(1) if faction_matches else "unknown"
        
        # Find points_cost
        cost_matches = list(re.finditer(r'points_cost:\s*(\d+)', window))
        cost = int(cost_matches[-1].group(1)) if cost_matches else 0
        
        # Find role
        role_matches = list(re.finditer(r'role:\s*"([^"]*)"', window))
        role = role_matches[-1].group(1) if role_matches else ""
        
        # Find type
        type_matches = list(re.finditer(r'type:\s*"([^"]*)"', window))
        unit_type = type_matches[-1].group(1) if type_matches else ""
        
        # Find special array after the stats
        # Look forward from stats match end
        after_stats = content[m.end():m.end()+3000]
        special_match = re.search(r'special:\s*\[(.*?)\]', after_stats, re.DOTALL)
        specials = []
        if special_match:
            specials = re.findall(r'"([^"]*)"', special_match.group(1))
            # Also get single-quoted strings
            specials += re.findall(r"'([^']*)'", special_match.group(1))
        else:
            # Maybe special is before stats (compact format)
            before_stats = content[max(0, pos-500):pos]
            special_match2 = re.search(r'special:\s*\[(.*?)\]', before_stats, re.DOTALL)
            if special_match2:
                specials = re.findall(r'"([^"]*)"', special_match2.group(1))
                specials += re.findall(r"'([^']*)'", special_match2.group(1))
        
        # Skip if this looks like a commander (has battle_stats instead of stats, or base_stats)
        # Check if "battle_stats" or "base_stats" is in the window
        if 'battle_stats' in window[-200:]:
            continue
        
        # Skip entries with 0 cost — likely parsing artifact
        if cost <= 0:
            continue
        
        units.append({
            'name': name,
            'faction': faction,
            'points_cost': cost,
            'role': role,
            'type': unit_type,
            'stats': {'ATK': atk, 'DEF': def_, 'HP': hp, 'MOV': mov, 'RNG': rng, 'MOR': mor},
            'special': specials,
            'source': filepath
        })
    
    return units


def extract_commanders(filepath):
    """Extract commander objects."""
    fullpath = os.path.join(BASE_DIR, filepath)
    with open(fullpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    commanders = []
    
    # Find battle_stats patterns
    stats_pattern = r'battle_stats:\s*\{\s*ATK:\s*(\d+)\s*,\s*DEF:\s*(\d+)\s*,\s*HP:\s*(\d+)\s*,\s*MOV:\s*(\d+)\s*,\s*RNG:\s*(\d+)\s*,\s*MOR:\s*(\d+)\s*\}'
    
    for m in re.finditer(stats_pattern, content):
        atk, def_, hp, mov, rng, mor = [int(x) for x in m.groups()]
        
        pos = m.start()
        window_start = max(0, pos - 2000)
        window = content[window_start:pos]
        
        name_matches = list(re.finditer(r'name:\s*"([^"]+)"', window))
        if not name_matches:
            continue
        name = name_matches[-1].group(1)
        
        faction_matches = list(re.finditer(r'faction:\s*"([^"]+)"', window))
        faction = faction_matches[-1].group(1) if faction_matches else "unknown"
        
        cost_matches = list(re.finditer(r'points_cost:\s*(\d+)', window))
        cost = int(cost_matches[-1].group(1)) if cost_matches else 0
        
        commanders.append({
            'name': name,
            'faction': faction,
            'points_cost': cost,
            'stats': {'ATK': atk, 'DEF': def_, 'HP': hp, 'MOV': mov, 'RNG': rng, 'MOR': mor},
            'type': 'Commander',
            'source': filepath
        })
    
    return commanders


def stat_sum(u):
    s = u['stats']
    return s['ATK'] + s['DEF'] + s['HP'] + s['MOV'] + s['RNG'] + s['MOR']

def stat_line(u):
    s = u['stats']
    return (s['ATK'], s['DEF'], s['HP'], s['MOV'], s['RNG'], s['MOR'])

def stat_str(u):
    s = u['stats']
    return f"ATK:{s['ATK']} DEF:{s['DEF']} HP:{s['HP']} MOV:{s['MOV']} RNG:{s['RNG']} MOR:{s['MOR']}"

def faction_short(f):
    mapping = {
        'emberclaw-warpack': 'Emberclaw',
        'iron-dominion': 'Iron Dominion',
        'nightfang-dominion': 'Nightfang',
        'thornweft-matriarchy': 'Thornweft',
        'veilbound-shogunate': 'Veilbound',
    }
    return mapping.get(f, f)


def main():
    all_units = []
    all_commanders = []
    
    for fp in FACTION_FILES:
        units = extract_all_units(fp)
        commanders = extract_commanders(fp)
        all_units.extend(units)
        all_commanders.extend(commanders)
        print(f"  Loaded {len(units)} units, {len(commanders)} commanders from {os.path.basename(fp)}")
    
    print(f"\nTotal: {len(all_units)} units, {len(all_commanders)} commanders\n")
    
    # Deduplicate (just in case)
    seen = set()
    deduped = []
    for u in all_units:
        key = (u['name'], u['faction'])
        if key not in seen:
            seen.add(key)
            deduped.append(u)
        else:
            pass  # skip dupe from parsing overlap
    all_units = deduped
    
    # Group by faction
    by_faction = defaultdict(list)
    for u in all_units:
        by_faction[u['faction']].append(u)
    
    issues = []

    # =====================================================
    # 1. DUPLICATE UNIT NAMES
    # =====================================================
    print("=" * 80)
    print("CHECK 1: DUPLICATE UNIT NAMES")
    print("=" * 80)
    
    for faction, units in sorted(by_faction.items()):
        names = defaultdict(list)
        for u in units:
            names[u['name']].append(u)
        for name, dupes in names.items():
            if len(dupes) > 1:
                print(f"  [{faction_short(faction)}] DUPLICATE: '{name}' appears {len(dupes)} times")
                issues.append(('1', faction, name))
    
    all_names = defaultdict(list)
    for u in all_units:
        all_names[u['name']].append(u['faction'])
    for name, facs in all_names.items():
        if len(set(facs)) > 1:
            print(f"  CROSS-FACTION: '{name}' in {', '.join(faction_short(f) for f in set(facs))}")
            issues.append(('1', 'cross-faction', name))
    
    if not any(i[0] == '1' for i in issues):
        print("  No duplicates found.")

    # =====================================================
    # 2. STAT CLONES
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 2: STAT CLONES (identical stat lines within same faction)")
    print("=" * 80)
    
    for faction, units in sorted(by_faction.items()):
        stat_groups = defaultdict(list)
        for u in units:
            stat_groups[stat_line(u)].append(u)
        for stats, group in stat_groups.items():
            if len(group) > 1:
                names = [f"'{u['name']}' ({u['points_cost']}pts)" for u in group]
                print(f"  [{faction_short(faction)}] {', '.join(names)}")
                print(f"        Stats: ATK:{stats[0]} DEF:{stats[1]} HP:{stats[2]} MOV:{stats[3]} RNG:{stats[4]} MOR:{stats[5]}")
                issues.append(('2', faction, [u['name'] for u in group]))

    if not any(i[0] == '2' for i in issues):
        print("  No stat clones found.")

    # =====================================================
    # 3. STRICT DOMINANCE
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 3: STRICT DOMINANCE (cheaper unit >= costlier in ALL stats)")
    print("=" * 80)
    
    stat_keys = ['ATK', 'DEF', 'HP', 'MOV', 'RNG', 'MOR']
    
    for faction, units in sorted(by_faction.items()):
        for i, a in enumerate(units):
            for j, b in enumerate(units):
                if i == j:
                    continue
                if a['points_cost'] < b['points_cost']:
                    dominates = all(a['stats'][k] >= b['stats'][k] for k in stat_keys)
                    if dominates:
                        strictly = any(a['stats'][k] > b['stats'][k] for k in stat_keys)
                        marker = " *** STRICTLY BETTER ***" if strictly else " (equal stats, different cost)"
                        print(f"  [{faction_short(faction)}] '{a['name']}' ({a['points_cost']}pts) dominates '{b['name']}' ({b['points_cost']}pts){marker}")
                        print(f"        Cheaper:  {stat_str(a)}")
                        print(f"        Costlier: {stat_str(b)}")
                        issues.append(('3', faction, (a['name'], b['name'])))

    if not any(i[0] == '3' for i in issues):
        print("  No strict dominance found.")

    # =====================================================
    # 4. COST OUTLIERS (non-WM)
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 4: COST OUTLIERS (non-WM, >50% above or <30% below faction avg efficiency)")
    print("=" * 80)
    
    for faction, units in sorted(by_faction.items()):
        non_wm = [u for u in units if 0 < u['points_cost'] < 60]
        if not non_wm:
            continue
        
        effs = [(u, stat_sum(u) / u['points_cost']) for u in non_wm if u['points_cost'] > 0]
        avg = sum(e for _, e in effs) / len(effs)
        
        flagged = []
        for u, eff in sorted(effs, key=lambda x: -x[1]):
            ratio = eff / avg
            if ratio > 1.50:
                flagged.append(f"    OVER:  '{u['name']}' eff={eff:.2f} ({ratio:.0%} of avg) cost={u['points_cost']} sum={stat_sum(u)}")
            elif ratio < 0.70:
                flagged.append(f"    UNDER: '{u['name']}' eff={eff:.2f} ({ratio:.0%} of avg) cost={u['points_cost']} sum={stat_sum(u)}")
        
        if flagged:
            print(f"\n  [{faction_short(faction)}] avg efficiency = {avg:.2f}")
            for f in flagged:
                print(f)
                issues.append(('4', faction, ''))

    if not any(i[0] == '4' for i in issues):
        print("  No cost outliers found.")

    # =====================================================
    # 5. WAR MACHINE COST OUTLIERS
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 5: WAR MACHINE COST OUTLIERS (±30% from faction WM avg)")
    print("=" * 80)
    
    for faction, units in sorted(by_faction.items()):
        wm = [u for u in units if u['points_cost'] >= 60]
        if len(wm) < 2:
            continue
        
        effs = [(u, stat_sum(u) / u['points_cost']) for u in wm]
        avg = sum(e for _, e in effs) / len(effs)
        
        flagged = []
        for u, eff in sorted(effs, key=lambda x: -x[1]):
            ratio = eff / avg
            if ratio > 1.30:
                flagged.append(f"    OVER:  '{u['name']}' eff={eff:.2f} ({ratio:.0%} of avg) cost={u['points_cost']} sum={stat_sum(u)}")
            elif ratio < 0.70:
                flagged.append(f"    UNDER: '{u['name']}' eff={eff:.2f} ({ratio:.0%} of avg) cost={u['points_cost']} sum={stat_sum(u)}")
        
        if flagged:
            print(f"\n  [{faction_short(faction)}] WM avg efficiency = {avg:.2f}")
            for f in flagged:
                print(f)
                issues.append(('5', faction, ''))

    if not any(i[0] == '5' for i in issues):
        print("  No WM cost outliers found.")

    # =====================================================
    # 6. NON-COMBATANT CONTRADICTIONS
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 6: NON-COMBATANT CONTRADICTIONS")
    print("=" * 80)
    
    found = False
    for u in all_units:
        specials_lower = [s.lower() for s in u.get('special', [])]
        if any('non-combatant' in s or 'noncombatant' in s for s in specials_lower):
            if u['stats']['ATK'] > 0:
                print(f"  [{faction_short(u['faction'])}] '{u['name']}' Non-Combatant but ATK={u['stats']['ATK']}")
                issues.append(('6', u['faction'], u['name']))
                found = True
    if not found:
        print("  No contradictions found.")

    # =====================================================
    # 7. KEYWORD INCONSISTENCIES
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 7: KEYWORD INCONSISTENCIES")
    print("=" * 80)
    
    all_specials = defaultdict(list)
    for u in all_units:
        for s in u.get('special', []):
            base = re.split(r'\s*\(', s)[0].strip()
            all_specials[base].append((u['faction'], u['name']))
    
    keyword_groups = {
        'Fire Resistance': ['Fire Resistant', 'Fire Immune', 'Fire Immunity', 'Fireproof'],
        'Flying': ['Fly', 'Flying', 'Flight'],
        'Fearless': ['Fearless', 'Fear Immune'],
        'Immobility': ['Immovable', 'Immobile', 'Slow'],
        'Stubbornness': ['Stubborn', 'Unyielding', 'Immovable'],
        'Stealth': ['Stealth', 'Hidden', 'Invisible', 'Camouflage'],
        'Regeneration': ['Regeneration', 'Regenerate', 'Regen'],
        'Terror': ['Terror', 'Terrifying', 'Dread', 'Horrifying'],
        'Poison': ['Poison', 'Venom', 'Toxic'],
        'Grid': ['Grid Node', 'Grid Anchor'],
    }
    
    for group_name, variants in keyword_groups.items():
        found_variants = {v: all_specials.get(v, []) for v in variants if v in all_specials}
        if len(found_variants) > 1:
            print(f"\n  INCONSISTENCY: '{group_name}' has multiple keyword forms:")
            for variant, users in found_variants.items():
                unit_names = [u[1] for u in users[:4]]
                extra = f" (+{len(users)-4} more)" if len(users) > 4 else ""
                print(f"    '{variant}' — {len(users)} units: {', '.join(unit_names)}{extra}")
            issues.append(('7', 'all', group_name))
    
    if not any(i[0] == '7' for i in issues):
        print("  No keyword inconsistencies found.")

    # =====================================================
    # 8. MISSING FIELDS
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 8: MISSING FIELDS")
    print("=" * 80)
    
    required_fields = ['name', 'faction', 'points_cost', 'role', 'type', 'stats', 'special']
    required_stats = ['ATK', 'DEF', 'HP', 'MOV', 'RNG', 'MOR']
    
    found = False
    for u in all_units:
        missing = []
        for f in required_fields:
            val = u.get(f)
            if val is None or val == '' or val == []:
                missing.append(f)
        if 'stats' in u and u['stats']:
            for s in required_stats:
                if s not in u['stats']:
                    missing.append(f'stats.{s}')
        if missing:
            print(f"  [{faction_short(u['faction'])}] '{u['name']}' missing: {', '.join(missing)}")
            issues.append(('8', u['faction'], u['name']))
            found = True
    
    if not found:
        print("  No missing fields found.")

    # =====================================================
    # 9. REMAINING 1-POINT UNITS
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 9: REMAINING 1-POINT UNITS")
    print("=" * 80)
    
    found = False
    for u in all_units:
        if u['points_cost'] == 1:
            print(f"  [{faction_short(u['faction'])}] '{u['name']}' cost=1")
            issues.append(('9', u['faction'], u['name']))
            found = True
    if not found:
        print("  No 1-point units found.")

    # =====================================================
    # 10. WAR MACHINES BELOW 60 POINTS
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 10: WAR MACHINES BELOW 60 POINTS")
    print("=" * 80)
    
    found = False
    for u in all_units:
        if u.get('type', '').lower() == 'war machine' and u['points_cost'] < 60:
            print(f"  [{faction_short(u['faction'])}] '{u['name']}' type=War Machine, cost={u['points_cost']}")
            issues.append(('10', u['faction'], u['name']))
            found = True
    if not found:
        print("  No War Machines below 60 points found.")

    # =====================================================
    # 11. IDENTICAL SPECIAL ABILITIES + SAME STATS
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 11: IDENTICAL SPECIAL ABILITIES AND STATS (true duplicates)")
    print("=" * 80)
    
    found = False
    for faction, units in sorted(by_faction.items()):
        for i, a in enumerate(units):
            for j, b in enumerate(units):
                if i >= j:
                    continue
                if stat_line(a) == stat_line(b):
                    a_sp = sorted(a.get('special', []))
                    b_sp = sorted(b.get('special', []))
                    if a_sp == b_sp and a_sp:  # only flag if they have specials
                        print(f"  [{faction_short(faction)}] TRUE DUPLICATE: '{a['name']}' & '{b['name']}'")
                        print(f"        Stats: {stat_str(a)} | Costs: {a['points_cost']} vs {b['points_cost']}")
                        print(f"        Specials: {a_sp}")
                        issues.append(('11', faction, (a['name'], b['name'])))
                        found = True
    if not found:
        print("  No true duplicates found.")

    # =====================================================
    # 12. UNUSUAL STAT VALUES
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 12: UNUSUAL STAT VALUES")
    print("=" * 80)
    
    non_wm_limits = {'ATK': 21, 'DEF': 6, 'HP': 15, 'MOV': 12, 'RNG': 24, 'MOR': 10}
    wm_limits = {'ATK': 30, 'DEF': 8, 'HP': 60, 'MOR': 10}
    
    found = False
    for u in all_units:
        is_wm = u['points_cost'] >= 60 or u.get('type', '').lower() == 'war machine'
        limits = wm_limits if is_wm else non_wm_limits
        
        violations = []
        for stat, limit in limits.items():
            if u['stats'].get(stat, 0) > limit:
                violations.append(f"{stat}={u['stats'][stat]} (limit {limit})")
        
        if violations:
            label = "WM" if is_wm else "non-WM"
            print(f"  [{faction_short(u['faction'])}] '{u['name']}' ({label}, {u['points_cost']}pts): {', '.join(violations)}")
            issues.append(('12', u['faction'], u['name']))
            found = True
    
    if not found:
        print("  No unusual stat values found.")

    # =====================================================
    # SUMMARY
    # =====================================================
    print("\n" + "=" * 80)
    print("AUDIT SUMMARY")
    print("=" * 80)
    
    category_counts = defaultdict(int)
    for issue in issues:
        category_counts[issue[0]] += 1
    
    check_names = {
        '1': 'Duplicate Unit Names',
        '2': 'Stat Clones',
        '3': 'Strict Dominance',
        '4': 'Cost Outliers (non-WM)',
        '5': 'WM Cost Outliers',
        '6': 'Non-Combatant Contradictions',
        '7': 'Keyword Inconsistencies',
        '8': 'Missing Fields',
        '9': 'Remaining 1-Point Units',
        '10': 'War Machines Below 60pts',
        '11': 'Identical Special+Stats',
        '12': 'Unusual Stat Values',
    }
    
    total = 0
    for num in ['1','2','3','4','5','6','7','8','9','10','11','12']:
        count = category_counts.get(num, 0)
        status = f"{count} issues" if count > 0 else "PASS"
        print(f"  Check {num:>2}: {check_names[num]:<35} — {status}")
        total += count
    
    print(f"\n  TOTAL ISSUES FOUND: {total}")
    
    # Print unit count per faction
    print(f"\n  Units per faction:")
    for f in sorted(by_faction.keys()):
        print(f"    {faction_short(f)}: {len(by_faction[f])} units")


if __name__ == '__main__':
    main()
