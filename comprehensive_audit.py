"""
Comprehensive Balance Audit for Shardborne Universe
Checks all 12 categories of issues across all 5 factions.
"""

import re
import json
import os
from collections import defaultdict

FACTION_FILES = [
    "data/factions/emberclaw-warpack.js",
    "data/factions/iron-dominion.js",
    "data/factions/nightfang-dominion.js",
    "data/factions/thornweft-matriarchy.js",
    "data/factions/veilbound-shogunate.js",
]

CORE_FILE = "data/core.js"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def extract_units_and_commanders(filepath):
    """Extract unit and commander objects from a JS faction file."""
    with open(os.path.join(BASE_DIR, filepath), 'r', encoding='utf-8') as f:
        content = f.read()
    
    units = []
    commanders = []
    
    # Extract unit push blocks — find gameData.units.push(...) 
    unit_pattern = r'gameData\.units\.push\(([\s\S]*?)\);'
    cmd_pattern = r'gameData\.commanders\.push\(([\s\S]*?)\);'
    
    for match in re.finditer(unit_pattern, content):
        block = match.group(1)
        units.extend(parse_unit_objects(block, filepath))
    
    for match in re.finditer(cmd_pattern, content):
        block = match.group(1)
        commanders.extend(parse_commander_objects(block, filepath))
    
    return units, commanders


def parse_unit_objects(block, filepath):
    """Parse individual unit objects from a push block."""
    units = []
    # Find objects that start with { name: 
    # We need to handle both multi-line and single-line formats
    
    # First, try to find compact single-line unit objects
    compact_pattern = r'\{\s*name:\s*"([^"]+)"[^}]*?points_cost:\s*(\d+)[^}]*?(?:role:\s*"([^"]*)")?[^}]*?(?:type:\s*"([^"]*)")?[^}]*?stats:\s*\{\s*ATK:\s*(\d+)\s*,\s*DEF:\s*(\d+)\s*,\s*HP:\s*(\d+)\s*,\s*MOV:\s*(\d+)\s*,\s*RNG:\s*(\d+)\s*,\s*MOR:\s*(\d+)\s*\}[^}]*?special:\s*\[(.*?)\]'
    
    for m in re.finditer(compact_pattern, block, re.DOTALL):
        name = m.group(1)
        points_cost = int(m.group(2))
        role = m.group(3) or ""
        unit_type = m.group(4) or ""
        atk = int(m.group(5))
        defense = int(m.group(6))
        hp = int(m.group(7))
        mov = int(m.group(8))
        rng = int(m.group(9))
        mor = int(m.group(10))
        special_raw = m.group(11)
        
        # Parse special abilities
        specials = re.findall(r'"([^"]*)"', special_raw)
        
        # Get faction from the object
        faction_match = re.search(r'faction:\s*"([^"]*)"', m.group(0))
        faction = faction_match.group(1) if faction_match else filepath
        
        units.append({
            'name': name,
            'faction': faction,
            'points_cost': points_cost,
            'role': role,
            'type': unit_type,
            'stats': {'ATK': atk, 'DEF': defense, 'HP': hp, 'MOV': mov, 'RNG': rng, 'MOR': mor},
            'special': specials,
            'source': filepath
        })
    
    return units


def parse_commander_objects(block, filepath):
    """Parse commander objects from a push block."""
    commanders = []
    
    # Find commander objects with battle_stats
    cmd_pattern = r'\{\s*name:\s*"([^"]+)".*?faction:\s*"([^"]*)".*?points_cost:\s*(\d+).*?battle_stats:\s*\{\s*ATK:\s*(\d+)\s*,\s*DEF:\s*(\d+)\s*,\s*HP:\s*(\d+)\s*,\s*MOV:\s*(\d+)\s*,\s*RNG:\s*(\d+)\s*,\s*MOR:\s*(\d+)\s*\}'
    
    for m in re.finditer(cmd_pattern, block, re.DOTALL):
        commanders.append({
            'name': m.group(1),
            'faction': m.group(2),
            'points_cost': int(m.group(3)),
            'stats': {
                'ATK': int(m.group(4)), 'DEF': int(m.group(5)), 'HP': int(m.group(6)),
                'MOV': int(m.group(7)), 'RNG': int(m.group(8)), 'MOR': int(m.group(9))
            },
            'type': 'Commander',
            'source': filepath
        })
    
    return commanders


def stat_sum(unit):
    s = unit['stats']
    return s['ATK'] + s['DEF'] + s['HP'] + s['MOV'] + s['RNG'] + s['MOR']


def stat_line(unit):
    s = unit['stats']
    return (s['ATK'], s['DEF'], s['HP'], s['MOV'], s['RNG'], s['MOR'])


def stat_str(unit):
    s = unit['stats']
    return f"ATK:{s['ATK']} DEF:{s['DEF']} HP:{s['HP']} MOV:{s['MOV']} RNG:{s['RNG']} MOR:{s['MOR']}"


def main():
    all_units = []
    all_commanders = []
    
    for fp in FACTION_FILES:
        units, commanders = extract_units_and_commanders(fp)
        all_units.extend(units)
        all_commanders.extend(commanders)
        print(f"  Loaded {len(units)} units, {len(commanders)} commanders from {fp}")
    
    print(f"\nTotal: {len(all_units)} units, {len(all_commanders)} commanders\n")
    
    # Group by faction
    by_faction = defaultdict(list)
    for u in all_units:
        by_faction[u['faction']].append(u)
    
    cmdr_by_faction = defaultdict(list)
    for c in all_commanders:
        cmdr_by_faction[c['faction']].append(c)
    
    issues = []
    
    # =====================================================
    # 1. DUPLICATE UNIT NAMES
    # =====================================================
    print("=" * 80)
    print("CHECK 1: DUPLICATE UNIT NAMES")
    print("=" * 80)
    
    # Within faction
    for faction, units in by_faction.items():
        names = defaultdict(list)
        for u in units:
            names[u['name']].append(u)
        for name, dupes in names.items():
            if len(dupes) > 1:
                print(f"  DUPLICATE within {faction}: '{name}' appears {len(dupes)} times")
                issues.append(('1-Duplicate Name', faction, name))
    
    # Cross-faction
    all_names = defaultdict(list)
    for u in all_units:
        all_names[u['name']].append(u['faction'])
    for name, factions in all_names.items():
        if len(factions) > 1 and len(set(factions)) > 1:
            print(f"  CROSS-FACTION DUPLICATE: '{name}' in {', '.join(set(factions))}")
            issues.append(('1-Cross-Faction Duplicate', 'multiple', name))
    
    if not any(i[0].startswith('1') for i in issues):
        print("  No duplicate names found.")
    
    # =====================================================
    # 2. STAT CLONES
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 2: STAT CLONES (identical stat lines within same faction)")
    print("=" * 80)
    
    for faction, units in by_faction.items():
        stat_groups = defaultdict(list)
        for u in units:
            stat_groups[stat_line(u)].append(u)
        for stats, group in stat_groups.items():
            if len(group) > 1:
                names = [f"'{u['name']}' (cost:{u['points_cost']})" for u in group]
                print(f"  {faction}: STAT CLONES — {', '.join(names)}")
                print(f"    Stats: ATK:{stats[0]} DEF:{stats[1]} HP:{stats[2]} MOV:{stats[3]} RNG:{stats[4]} MOR:{stats[5]}")
                issues.append(('2-Stat Clone', faction, [u['name'] for u in group]))
    
    if not any(i[0].startswith('2') for i in issues):
        print("  No stat clones found.")
    
    # =====================================================
    # 3. STRICT DOMINANCE
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 3: STRICT DOMINANCE (cheaper unit >= costlier unit in ALL stats)")
    print("=" * 80)
    
    stat_keys = ['ATK', 'DEF', 'HP', 'MOV', 'RNG', 'MOR']
    
    for faction, units in by_faction.items():
        for i, a in enumerate(units):
            for j, b in enumerate(units):
                if i == j:
                    continue
                # a is cheaper than b
                if a['points_cost'] < b['points_cost']:
                    dominates = all(a['stats'][k] >= b['stats'][k] for k in stat_keys)
                    strictly_better = any(a['stats'][k] > b['stats'][k] for k in stat_keys)
                    if dominates:
                        print(f"  {faction}: '{a['name']}' (cost:{a['points_cost']}) DOMINATES '{b['name']}' (cost:{b['points_cost']})")
                        print(f"    Cheaper: {stat_str(a)}")
                        print(f"    Costlier: {stat_str(b)}")
                        if strictly_better:
                            print(f"    ** Strictly better AND cheaper — clear balance issue **")
                        issues.append(('3-Strict Dominance', faction, (a['name'], b['name'])))
    
    if not any(i[0].startswith('3') for i in issues):
        print("  No strict dominance found.")
    
    # =====================================================
    # 4. COST OUTLIERS (non-WM)
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 4: COST OUTLIERS (non-WM units, efficiency > ±50%/30% from faction avg)")
    print("=" * 80)
    
    for faction, units in by_faction.items():
        non_wm = [u for u in units if u['points_cost'] < 60]
        if not non_wm:
            continue
        
        efficiencies = []
        for u in non_wm:
            eff = stat_sum(u) / u['points_cost']
            efficiencies.append((u, eff))
        
        avg_eff = sum(e for _, e in efficiencies) / len(efficiencies)
        
        print(f"\n  {faction} — Avg efficiency (non-WM): {avg_eff:.2f}")
        
        for u, eff in efficiencies:
            ratio = eff / avg_eff
            if ratio > 1.50:
                print(f"    OVERTUNED: '{u['name']}' eff={eff:.2f} ({ratio:.0%} of avg, >{150}%) cost={u['points_cost']} stats_sum={stat_sum(u)}")
                issues.append(('4-Cost Outlier High', faction, u['name']))
            elif ratio < 0.70:
                print(f"    UNDERTUNED: '{u['name']}' eff={eff:.2f} ({ratio:.0%} of avg, <{70}%) cost={u['points_cost']} stats_sum={stat_sum(u)}")
                issues.append(('4-Cost Outlier Low', faction, u['name']))
    
    # =====================================================
    # 5. WAR MACHINE COST OUTLIERS
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 5: WAR MACHINE COST OUTLIERS (efficiency ±30% from faction WM avg)")
    print("=" * 80)
    
    for faction, units in by_faction.items():
        wm = [u for u in units if u['points_cost'] >= 60]
        if not wm:
            continue
        
        efficiencies = []
        for u in wm:
            eff = stat_sum(u) / u['points_cost']
            efficiencies.append((u, eff))
        
        avg_eff = sum(e for _, e in efficiencies) / len(efficiencies)
        
        print(f"\n  {faction} — Avg WM efficiency: {avg_eff:.2f}")
        
        for u, eff in efficiencies:
            ratio = eff / avg_eff
            if ratio > 1.30:
                print(f"    WM OVERTUNED: '{u['name']}' eff={eff:.2f} ({ratio:.0%} of avg) cost={u['points_cost']} stats_sum={stat_sum(u)}")
                issues.append(('5-WM Outlier High', faction, u['name']))
            elif ratio < 0.70:
                print(f"    WM UNDERTUNED: '{u['name']}' eff={eff:.2f} ({ratio:.0%} of avg) cost={u['points_cost']} stats_sum={stat_sum(u)}")
                issues.append(('5-WM Outlier Low', faction, u['name']))
    
    # =====================================================
    # 6. NON-COMBATANT CONTRADICTIONS
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 6: NON-COMBATANT CONTRADICTIONS (Non-Combatant with ATK > 0)")
    print("=" * 80)
    
    found6 = False
    for u in all_units:
        specials_lower = [s.lower() for s in u.get('special', [])]
        if any('non-combatant' in s or 'non combatant' in s or 'noncombatant' in s for s in specials_lower):
            if u['stats']['ATK'] > 0:
                print(f"  {u['faction']}: '{u['name']}' has Non-Combatant but ATK={u['stats']['ATK']}")
                issues.append(('6-Non-Combatant ATK', u['faction'], u['name']))
                found6 = True
    if not found6:
        print("  No Non-Combatant contradictions found.")
    
    # =====================================================
    # 7. KEYWORD INCONSISTENCIES
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 7: KEYWORD INCONSISTENCIES")
    print("=" * 80)
    
    # Collect all keywords/special abilities
    all_specials = defaultdict(list)
    for u in all_units:
        for s in u.get('special', []):
            # Strip parenthetical explanations for base keyword
            base = re.split(r'\s*\(', s)[0].strip()
            all_specials[base].append((u['faction'], u['name']))
    
    # Check for similar keywords
    keyword_groups = {
        'fire_resist': ['Fire Resistant', 'Fire Immune', 'Fire Immunity', 'Fireproof'],
        'flying': ['Fly', 'Flying', 'Flight'],
        'fear': ['Fearless', 'Fear Immune', 'Fear Immunity'],
        'immobile': ['Immovable', 'Immobile', 'Slow'],
        'stubborn': ['Stubborn', 'Unyielding', 'Immovable'],
        'stealth': ['Stealth', 'Hidden', 'Invisible', 'Camouflage'],
        'regen': ['Regeneration', 'Regenerate', 'Regen'],
        'terror': ['Terror', 'Terrifying', 'Dread', 'Horrifying'],
        'poison': ['Poison', 'Venom', 'Toxic'],
    }
    
    print("\n  All unique base keywords found:")
    sorted_specials = sorted(all_specials.keys())
    for s in sorted_specials:
        count = len(all_specials[s])
        if count > 0:
            pass  # skip printing all for conciseness
    
    # Check each group
    for group_name, variants in keyword_groups.items():
        found_variants = {v: all_specials.get(v, []) for v in variants if v in all_specials}
        if len(found_variants) > 1:
            print(f"\n  INCONSISTENCY GROUP '{group_name}':")
            for variant, users in found_variants.items():
                print(f"    '{variant}' used by {len(users)} units: {', '.join(u[1] for u in users[:5])}{'...' if len(users) > 5 else ''}")
            issues.append(('7-Keyword Inconsistency', 'all', group_name))
    
    # Also find any keyword that has very similar (1-2 char difference) alternate
    print("\n  Checking for near-duplicate keywords...")
    kw_list = list(all_specials.keys())
    for i, a in enumerate(kw_list):
        for j, b in enumerate(kw_list):
            if i >= j:
                continue
            # Simple check: same lowercase words in different order, or minor spelling
            a_lower = a.lower().replace('-', ' ').replace('_', ' ')
            b_lower = b.lower().replace('-', ' ').replace('_', ' ')
            if a_lower == b_lower and a != b:
                print(f"    Near-duplicate: '{a}' vs '{b}'")
                issues.append(('7-Near Duplicate KW', 'all', (a, b)))
    
    if not any(i[0].startswith('7') for i in issues):
        print("  No keyword inconsistencies found.")
    
    # =====================================================
    # 8. MISSING FIELDS
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 8: MISSING FIELDS")
    print("=" * 80)
    
    required_fields = ['name', 'faction', 'points_cost', 'role', 'type', 'stats', 'special']
    required_stats = ['ATK', 'DEF', 'HP', 'MOV', 'RNG', 'MOR']
    
    found8 = False
    for u in all_units:
        missing = []
        for f in required_fields:
            if f not in u or u[f] is None or u[f] == '':
                missing.append(f)
        if 'stats' in u and u['stats']:
            for s in required_stats:
                if s not in u['stats']:
                    missing.append(f'stats.{s}')
        if missing:
            print(f"  {u.get('faction', '?')}: '{u.get('name', '?')}' missing: {', '.join(missing)}")
            issues.append(('8-Missing Fields', u.get('faction', '?'), u.get('name', '?')))
            found8 = True
    
    if not found8:
        print("  No missing fields found.")
    
    # =====================================================
    # 9. REMAINING 1-POINT UNITS
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 9: REMAINING 1-POINT UNITS")
    print("=" * 80)
    
    found9 = False
    for u in all_units:
        if u['points_cost'] == 1:
            print(f"  {u['faction']}: '{u['name']}' has points_cost=1")
            issues.append(('9-One Point Unit', u['faction'], u['name']))
            found9 = True
    
    if not found9:
        print("  No 1-point units found.")
    
    # =====================================================
    # 10. WAR MACHINES BELOW 60 POINTS
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 10: WAR MACHINES BELOW 60 POINTS")
    print("=" * 80)
    
    found10 = False
    for u in all_units:
        if u.get('type', '').lower() == 'war machine' and u['points_cost'] < 60:
            print(f"  {u['faction']}: '{u['name']}' is War Machine with cost={u['points_cost']}")
            issues.append(('10-Cheap WM', u['faction'], u['name']))
            found10 = True
    
    if not found10:
        print("  No War Machines below 60 points found.")
    
    # =====================================================    
    # 11. IDENTICAL SPECIAL ABILITIES + SAME STATS
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 11: IDENTICAL SPECIAL ABILITIES AND STATS (true duplicates)")
    print("=" * 80)
    
    found11 = False
    for faction, units in by_faction.items():
        for i, a in enumerate(units):
            for j, b in enumerate(units):
                if i >= j:
                    continue
                if stat_line(a) == stat_line(b):
                    a_specials = sorted(a.get('special', []))
                    b_specials = sorted(b.get('special', []))
                    if a_specials == b_specials:
                        print(f"  {faction}: '{a['name']}' and '{b['name']}' are TRUE DUPLICATES")
                        print(f"    Stats: {stat_str(a)}")
                        print(f"    Specials: {a_specials}")
                        print(f"    Costs: {a['points_cost']} vs {b['points_cost']}")
                        issues.append(('11-True Duplicate', faction, (a['name'], b['name'])))
                        found11 = True
    
    if not found11:
        print("  No true duplicates found.")
    
    # =====================================================
    # 12. UNUSUAL STAT VALUES
    # =====================================================
    print("\n" + "=" * 80)
    print("CHECK 12: UNUSUAL STAT VALUES")
    print("=" * 80)
    
    non_wm_limits = {'ATK': 21, 'DEF': 6, 'HP': 15, 'MOV': 12, 'RNG': 24, 'MOR': 10}
    wm_limits = {'ATK': 30, 'DEF': 8, 'HP': 60, 'MOR': 10}
    
    found12 = False
    for u in all_units:
        is_wm = u['points_cost'] >= 60 or u.get('type', '').lower() == 'war machine'
        
        if is_wm:
            limits = wm_limits
        else:
            limits = non_wm_limits
        
        violations = []
        for stat, limit in limits.items():
            if u['stats'].get(stat, 0) > limit:
                violations.append(f"{stat}={u['stats'][stat]} (limit {limit})")
        
        if violations:
            label = "WM" if is_wm else "non-WM"
            print(f"  {u['faction']}: '{u['name']}' ({label}, cost={u['points_cost']}): {', '.join(violations)}")
            issues.append(('12-Unusual Stats', u['faction'], u['name']))
            found12 = True
    
    if not found12:
        print("  No unusual stat values found.")
    
    # =====================================================
    # SUMMARY
    # =====================================================
    print("\n" + "=" * 80)
    print("AUDIT SUMMARY")
    print("=" * 80)
    
    category_counts = defaultdict(int)
    for issue in issues:
        cat = issue[0].split('-')[0]
        category_counts[cat] += 1
    
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
    for num in sorted(check_names.keys(), key=int):
        count = category_counts.get(num, 0)
        status = f"{count} issues" if count > 0 else "PASS"
        print(f"  Check {num:>2}: {check_names[num]:<35} — {status}")
        total += count
    
    print(f"\n  TOTAL ISSUES: {total}")


if __name__ == '__main__':
    main()
