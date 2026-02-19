import re
import json
import os

BASE = os.path.dirname(os.path.abspath(__file__))
FACTION_DIR = os.path.join(BASE, "data", "factions")

faction_files = [
    "emberclaw-warpack.js",
    "iron-dominion.js",
    "nightfang-dominion.js",
    "thornweft-matriarchy.js",
    "veilbound-shogunate.js",
]

def parse_stats(text):
    """Parse { ATK: 6, DEF: 3, HP: 3, MOV: 5, RNG: 1, MOR: 6 }"""
    result = {}
    for stat in ["ATK", "DEF", "HP", "MOV", "RNG", "MOR"]:
        m = re.search(rf'{stat}\s*:\s*(\d+)', text)
        if m:
            result[stat] = int(m.group(1))
    return result

def parse_base_stats(text):
    """Parse { Command: 8, Knowledge: 10, Leadership: 7, Agility: 5, Health: 300 }"""
    result = {}
    for stat in ["Command", "Knowledge", "Leadership", "Agility", "Health"]:
        m = re.search(rf'{stat}\s*:\s*(\d+)', text)
        if m:
            result[stat] = int(m.group(1))
    return result

def extract_units(content):
    """Extract all unit entries from gameData.units.push(...) blocks"""
    units = []
    # Find unit objects - they have name, faction, points_cost, type, stats
    # Pattern: { name: "...", faction: "...", points_cost: N, ... type: "...", stats: {...}, special: [...] }
    # Units are inline objects within gameData.units.push(...)
    
    # Find all unit-like objects with type and stats
    pattern = r'\{\s*name:\s*"([^"]+)"\s*,\s*faction:\s*"([^"]+)"\s*,\s*points_cost:\s*(\d+)\s*,\s*role:\s*"([^"]*)".*?type:\s*"([^"]+)"\s*,\s*stats:\s*(\{[^}]+\})\s*,\s*special:\s*\[([^\]]*)\]'
    
    for m in re.finditer(pattern, content, re.DOTALL):
        name = m.group(1)
        faction = m.group(2)
        pts = int(m.group(3))
        role = m.group(4)
        unit_type = m.group(5)
        stats = parse_stats(m.group(6))
        special_text = m.group(7)
        # Count special abilities
        specials = re.findall(r'"([^"]*)"', special_text)
        
        units.append({
            "name": name,
            "faction": faction,
            "points_cost": pts,
            "role": role,
            "type": unit_type,
            "stats": stats,
            "special_count": len(specials),
            "specials": specials,
        })
    
    return units

def extract_commanders(content):
    """Extract commander entries"""
    commanders = []
    
    # Find commander blocks - they have name, faction, battle_stats, base_stats, points_cost
    # Split into individual commander blocks
    # Pattern for commander entries
    blocks = re.split(r'\n\s*\{(?=\s*name:)', content)
    
    for block in blocks:
        name_m = re.search(r'name:\s*"([^"]+)"', block)
        faction_m = re.search(r'faction:\s*"([^"]+)"', block)
        pts_m = re.search(r'points_cost:\s*(\d+)', block)
        battle_m = re.search(r'battle_stats:\s*(\{[^}]+\})', block)
        base_m = re.search(r'base_stats:\s*(\{[^}]+\})', block)
        
        if name_m and faction_m and pts_m and battle_m and base_m:
            battle_stats = parse_stats(battle_m.group(1))
            base_stats = parse_base_stats(base_m.group(1))
            
            # Check this is actually a commander (has both base_stats and battle_stats)
            if len(battle_stats) >= 5 and len(base_stats) >= 4:
                commanders.append({
                    "name": name_m.group(1),
                    "faction": faction_m.group(1),
                    "points_cost": int(pts_m.group(1)),
                    "battle_stats": battle_stats,
                    "base_stats": base_stats,
                })
    
    return commanders

# Parse all files
all_units = []
all_commanders = []

for fname in faction_files:
    fpath = os.path.join(FACTION_DIR, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    units = extract_units(content)
    commanders = extract_commanders(content)
    
    all_units.extend(units)
    all_commanders.extend(commanders)
    
    print(f"\n=== {fname} ===")
    print(f"  Units found: {len(units)}")
    print(f"  Commanders found: {len(commanders)}")
    
    # Print unit type breakdown
    type_counts = {}
    for u in units:
        t = u["type"]
        type_counts[t] = type_counts.get(t, 0) + 1
    for t, c in sorted(type_counts.items()):
        print(f"    {t}: {c}")

print(f"\n\nTOTAL UNITS: {len(all_units)}")
print(f"TOTAL COMMANDERS: {len(all_commanders)}")

# ===========================
# ANALYSIS
# ===========================

def stat_total(stats):
    return sum(stats.get(k, 0) for k in ["ATK", "DEF", "HP", "MOV", "RNG", "MOR"])

def efficiency(unit):
    """Stats per point"""
    pts = unit["points_cost"]
    if pts == 0:
        return float('inf')
    return stat_total(unit["stats"]) / pts

def cmd_stat_total(cmd):
    return sum(cmd["battle_stats"].get(k, 0) for k in ["ATK", "DEF", "HP", "MOV", "RNG", "MOR"])

def cmd_efficiency(cmd):
    pts = cmd["points_cost"]
    if pts == 0:
        return float('inf')
    return cmd_stat_total(cmd) / pts

# ===========================
# REPORT
# ===========================

print("\n" + "="*80)
print("SHARDBORNE BALANCE AUDIT REPORT")
print("="*80)

# ---- TABLE 1: Unit counts per faction per type ----
print("\n## 1. UNIT COUNTS PER FACTION PER TYPE\n")

faction_names = {
    "emberclaw-warpack": "Emberclaw",
    "iron-dominion": "Iron Dom.",
    "nightfang-dominion": "Nightfang",
    "thornweft-matriarchy": "Thornweft",
    "veilbound-shogunate": "Veilbound",
}

factions = list(faction_names.keys())
types = sorted(set(u["type"] for u in all_units))

# Header
header = f"{'Type':<15}" + "".join(f"{faction_names.get(f, f):<12}" for f in factions) + "Total"
print(header)
print("-" * len(header))

for t in types:
    row = f"{t:<15}"
    total = 0
    for f in factions:
        count = len([u for u in all_units if u["faction"] == f and u["type"] == t])
        row += f"{count:<12}"
        total += count
    row += str(total)
    print(row)

# Totals row
row = f"{'TOTAL':<15}"
grand_total = 0
for f in factions:
    count = len([u for u in all_units if u["faction"] == f])
    row += f"{count:<12}"
    grand_total += count
row += str(grand_total)
print("-" * len(header))
print(row)

# Commander counts
print(f"\n{'Commanders':<15}", end="")
for f in factions:
    count = len([c for c in all_commanders if c["faction"] == f])
    print(f"{count:<12}", end="")
print()

# ---- ANALYSIS 1: Cost-to-stats ratio ----
print("\n\n## 2. COST-TO-STATS RATIO BY UNIT TYPE\n")

for t in types:
    units_of_type = [u for u in all_units if u["type"] == t]
    if not units_of_type:
        continue
    
    print(f"\n### {t}")
    print(f"{'Name':<35} {'Faction':<12} {'Pts':>4} {'ATK':>4} {'DEF':>4} {'HP':>4} {'MOV':>4} {'RNG':>4} {'MOR':>4} {'Total':>6} {'Eff':>6} {'#Sp':>4}")
    print("-" * 105)
    
    # Sort by efficiency (descending)
    sorted_units = sorted(units_of_type, key=lambda u: efficiency(u), reverse=True)
    
    for u in sorted_units:
        s = u["stats"]
        total = stat_total(s)
        eff = efficiency(u)
        fn = faction_names.get(u["faction"], u["faction"])[:11]
        print(f"{u['name'][:34]:<35} {fn:<12} {u['points_cost']:>4} {s.get('ATK',0):>4} {s.get('DEF',0):>4} {s.get('HP',0):>4} {s.get('MOV',0):>4} {s.get('RNG',0):>4} {s.get('MOR',0):>4} {total:>6} {eff:>6.2f} {u['special_count']:>4}")

# ---- ANALYSIS: Efficiency stats by faction ----
print("\n\n## 3. AVERAGE EFFICIENCY BY FACTION (non-War Machine units)\n")
print(f"{'Faction':<15} {'Avg Eff':>8} {'Min Eff':>8} {'Max Eff':>8} {'Avg Pts':>8} {'Units':>6}")
print("-" * 55)
for f in factions:
    funits = [u for u in all_units if u["faction"] == f and u["type"] != "War Machine"]
    if not funits:
        continue
    effs = [efficiency(u) for u in funits]
    pts_list = [u["points_cost"] for u in funits]
    fn = faction_names.get(f, f)
    print(f"{fn:<15} {sum(effs)/len(effs):>8.2f} {min(effs):>8.2f} {max(effs):>8.2f} {sum(pts_list)/len(pts_list):>8.1f} {len(funits):>6}")

# ---- ANALYSIS: Within-faction cost curves ----
print("\n\n## 4. WITHIN-FACTION COST CURVE ISSUES")
print("(cheaper unit that is strictly better than a more expensive unit in same faction)\n")

issues_cost_curve = []
for f in factions:
    funits = [u for u in all_units if u["faction"] == f]
    for i, u1 in enumerate(funits):
        for u2 in funits[i+1:]:
            if u1["type"] != u2["type"]:
                continue
            # Check if cheaper unit is strictly >= in all stats
            if u1["points_cost"] < u2["points_cost"]:
                cheaper, costlier = u1, u2
            elif u2["points_cost"] < u1["points_cost"]:
                cheaper, costlier = u2, u1
            else:
                continue
            
            s_cheap = cheaper["stats"]
            s_cost = costlier["stats"]
            
            # Check if cheaper is >= in all stats
            all_ge = all(s_cheap.get(k, 0) >= s_cost.get(k, 0) for k in ["ATK", "DEF", "HP", "MOV", "RNG", "MOR"])
            any_gt = any(s_cheap.get(k, 0) > s_cost.get(k, 0) for k in ["ATK", "DEF", "HP", "MOV", "RNG", "MOR"])
            
            if all_ge and any_gt:
                issues_cost_curve.append((cheaper, costlier))

if issues_cost_curve:
    for cheaper, costlier in issues_cost_curve:
        fn = faction_names.get(cheaper["faction"], cheaper["faction"])
        sc = cheaper["stats"]
        sk = costlier["stats"]
        print(f"  ISSUE: {cheaper['name']} ({cheaper['points_cost']}pts, stats={stat_total(sc)}) "
              f"strictly dominates {costlier['name']} ({costlier['points_cost']}pts, stats={stat_total(sk)}) [{fn}]")
else:
    print("  No strictly dominated units found.")

# ---- ANALYSIS: Cross-faction role parity ----
print("\n\n## 5. CROSS-FACTION ROLE PARITY (same role comparison)\n")

roles_to_compare = {}
for u in all_units:
    role_key = u["role"].lower().strip()
    if role_key not in roles_to_compare:
        roles_to_compare[role_key] = []
    roles_to_compare[role_key].append(u)

# Find roles with units from multiple factions
for role, units_in_role in sorted(roles_to_compare.items()):
    faction_set = set(u["faction"] for u in units_in_role)
    if len(faction_set) < 2 or len(units_in_role) < 2:
        continue
    
    effs = [(u, efficiency(u)) for u in units_in_role]
    effs.sort(key=lambda x: x[1], reverse=True)
    
    max_eff = effs[0][1]
    min_eff = effs[-1][1]
    
    if min_eff > 0 and max_eff / min_eff > 1.5:  # 50%+ gap
        print(f"  Role '{role}' — Efficiency gap: {max_eff:.2f} vs {min_eff:.2f} ({max_eff/min_eff:.1f}x)")
        for u, e in effs:
            fn = faction_names.get(u["faction"], u["faction"])
            print(f"    {u['name']:<35} {fn:<12} {u['points_cost']:>3}pts  eff={e:.2f}")

# ---- ANALYSIS: War Machine pricing ----
print("\n\n## 6. WAR MACHINE COMPARISON\n")
wms = [u for u in all_units if u["type"] == "War Machine"]
print(f"{'Name':<35} {'Faction':<12} {'Pts':>4} {'ATK':>4} {'DEF':>4} {'HP':>4} {'MOV':>4} {'RNG':>4} {'MOR':>4} {'Total':>6} {'Eff':>6}")
print("-" * 100)
wms_sorted = sorted(wms, key=lambda u: efficiency(u), reverse=True)
for u in wms_sorted:
    s = u["stats"]
    total = stat_total(s)
    eff = efficiency(u)
    fn = faction_names.get(u["faction"], u["faction"])[:11]
    print(f"{u['name'][:34]:<35} {fn:<12} {u['points_cost']:>4} {s.get('ATK',0):>4} {s.get('DEF',0):>4} {s.get('HP',0):>4} {s.get('MOV',0):>4} {s.get('RNG',0):>4} {s.get('MOR',0):>4} {total:>6} {eff:>6.2f}")

# Avg WM efficiency by faction
print(f"\n{'Faction':<15} {'Avg WM Eff':>10} {'Avg WM Pts':>10} {'WM Count':>8}")
for f in factions:
    fwms = [u for u in wms if u["faction"] == f]
    if not fwms:
        continue
    effs = [efficiency(u) for u in fwms]
    pts_list = [u["points_cost"] for u in fwms]
    fn = faction_names.get(f, f)
    print(f"{fn:<15} {sum(effs)/len(effs):>10.2f} {sum(pts_list)/len(pts_list):>10.1f} {len(fwms):>8}")

# ---- ANALYSIS: Commander pricing ----
print("\n\n## 7. COMMANDER COMPARISON\n")
print(f"{'Name':<35} {'Faction':<12} {'Pts':>4} {'ATK':>4} {'DEF':>4} {'HP':>4} {'MOV':>4} {'RNG':>4} {'MOR':>4} {'Total':>6} {'Eff':>6}")
print("-" * 100)
cmds_sorted = sorted(all_commanders, key=lambda c: cmd_efficiency(c), reverse=True)
for c in cmds_sorted:
    s = c["battle_stats"]
    total = cmd_stat_total(c)
    eff = cmd_efficiency(c)
    fn = faction_names.get(c["faction"], c["faction"])[:11]
    print(f"{c['name'][:34]:<35} {fn:<12} {c['points_cost']:>4} {s.get('ATK',0):>4} {s.get('DEF',0):>4} {s.get('HP',0):>4} {s.get('MOV',0):>4} {s.get('RNG',0):>4} {s.get('MOR',0):>4} {total:>6} {eff:>6.2f}")

# Avg commander efficiency by faction
print(f"\n{'Faction':<15} {'Avg Cmd Eff':>11} {'Avg Cmd Pts':>11} {'Cmds':>5}")
for f in factions:
    fcmds = [c for c in all_commanders if c["faction"] == f]
    if not fcmds:
        continue
    effs = [cmd_efficiency(c) for c in fcmds]
    pts_list = [c["points_cost"] for c in fcmds]
    fn = faction_names.get(f, f)
    print(f"{fn:<15} {sum(effs)/len(effs):>11.2f} {sum(pts_list)/len(pts_list):>11.1f} {len(fcmds):>5}")

# ---- ANALYSIS: Support unit value ----
print("\n\n## 8. SUPPORT UNIT ANALYSIS (Non-Combat vs Combat-capable)\n")
support_units = [u for u in all_units if u["type"] == "Support"]
print(f"{'Name':<35} {'Faction':<12} {'Pts':>4} {'ATK':>4} {'DEF':>4} {'HP':>4} {'MOV':>4} {'RNG':>4} {'MOR':>4} {'Total':>6} {'Eff':>6} {'Combat?':>8}")
print("-" * 110)
for u in sorted(support_units, key=lambda x: x["points_cost"]):
    s = u["stats"]
    total = stat_total(s)
    eff = efficiency(u)
    fn = faction_names.get(u["faction"], u["faction"])[:11]
    combat = "No" if s.get("ATK", 0) == 0 else "Yes"
    print(f"{u['name'][:34]:<35} {fn:<12} {u['points_cost']:>4} {s.get('ATK',0):>4} {s.get('DEF',0):>4} {s.get('HP',0):>4} {s.get('MOV',0):>4} {s.get('RNG',0):>4} {s.get('MOR',0):>4} {total:>6} {eff:>6.2f} {combat:>8}")

# ---- ANALYSIS: Artillery ----
print("\n\n## 9. ARTILLERY COMPARISON\n")
arty = [u for u in all_units if u["type"] == "Artillery"]
print(f"{'Name':<35} {'Faction':<12} {'Pts':>4} {'ATK':>4} {'DEF':>4} {'HP':>4} {'MOV':>4} {'RNG':>4} {'MOR':>4} {'Total':>6} {'Eff':>6}")
print("-" * 100)
for u in sorted(arty, key=lambda x: efficiency(x), reverse=True):
    s = u["stats"]
    total = stat_total(s)
    eff = efficiency(u)
    fn = faction_names.get(u["faction"], u["faction"])[:11]
    print(f"{u['name'][:34]:<35} {fn:<12} {u['points_cost']:>4} {s.get('ATK',0):>4} {s.get('DEF',0):>4} {s.get('HP',0):>4} {s.get('MOV',0):>4} {s.get('RNG',0):>4} {s.get('MOR',0):>4} {total:>6} {eff:>6.2f}")

# ---- ANALYSIS: Specialist value ----
print("\n\n## 10. SPECIALIST UNIT COMPARISON\n")
specs = [u for u in all_units if u["type"] == "Specialist"]
print(f"{'Name':<35} {'Faction':<12} {'Pts':>4} {'ATK':>4} {'DEF':>4} {'HP':>4} {'MOV':>4} {'RNG':>4} {'MOR':>4} {'Total':>6} {'Eff':>6} {'#Sp':>4}")
print("-" * 110)
for u in sorted(specs, key=lambda x: efficiency(x), reverse=True):
    s = u["stats"]
    total = stat_total(s)
    eff = efficiency(u)
    fn = faction_names.get(u["faction"], u["faction"])[:11]
    print(f"{u['name'][:34]:<35} {fn:<12} {u['points_cost']:>4} {s.get('ATK',0):>4} {s.get('DEF',0):>4} {s.get('HP',0):>4} {s.get('MOV',0):>4} {s.get('RNG',0):>4} {s.get('MOR',0):>4} {total:>6} {eff:>6.2f} {u['special_count']:>4}")

# ---- EXTREME OUTLIERS ----
print("\n\n## 11. EXTREME OUTLIERS\n")

# Zero cost units
zero_cost = [u for u in all_units if u["points_cost"] == 0]
if zero_cost:
    print("### Units with 0 points cost:")
    for u in zero_cost:
        print(f"  {u['name']} ({u['faction']})")
else:
    print("No 0-cost units found.")

# Extremely high efficiency (non-WM)
print("\n### Top 10 Most Efficient Non-War-Machine Units:")
non_wm = [u for u in all_units if u["type"] != "War Machine"]
non_wm_sorted = sorted(non_wm, key=lambda u: efficiency(u), reverse=True)
for u in non_wm_sorted[:10]:
    s = u["stats"]
    fn = faction_names.get(u["faction"], u["faction"])
    print(f"  {u['name']:<35} {fn:<12} {u['points_cost']:>3}pts  eff={efficiency(u):.2f}  total={stat_total(s)}")

print("\n### Top 10 Least Efficient Non-War-Machine Units:")
for u in non_wm_sorted[-10:]:
    s = u["stats"]
    fn = faction_names.get(u["faction"], u["faction"])
    print(f"  {u['name']:<35} {fn:<12} {u['points_cost']:>3}pts  eff={efficiency(u):.2f}  total={stat_total(s)}")

# ---- TOP BALANCE ISSUES ----
print("\n\n" + "="*80)
print("## TOP BALANCE ISSUES (RANKED BY SEVERITY)")
print("="*80)

# Collect all issues
issues = []

# 1. Check for units with very high efficiency vs type average
for t in types:
    units_of_type = [u for u in all_units if u["type"] == t]
    if len(units_of_type) < 3:
        continue
    effs = [efficiency(u) for u in units_of_type]
    avg_eff = sum(effs) / len(effs)
    
    for u in units_of_type:
        e = efficiency(u)
        if avg_eff > 0 and e > avg_eff * 1.5:
            severity = (e / avg_eff - 1) * 100
            issues.append({
                "severity": severity,
                "type": "UNDERCOSTED",
                "unit": u["name"],
                "faction": u["faction"],
                "pts": u["points_cost"],
                "stats": u["stats"],
                "eff": e,
                "avg_eff": avg_eff,
                "desc": f"{u['name']} ({faction_names.get(u['faction'],'')}) has efficiency {e:.2f} vs type '{t}' avg {avg_eff:.2f} ({severity:.0f}% above average)",
                "fix": f"Increase cost from {u['points_cost']} to ~{max(1, round(stat_total(u['stats']) / avg_eff))} pts"
            })
        elif avg_eff > 0 and e < avg_eff * 0.6:
            severity = (1 - e / avg_eff) * 100
            issues.append({
                "severity": severity,
                "type": "OVERCOSTED",
                "unit": u["name"],
                "faction": u["faction"],
                "pts": u["points_cost"],
                "stats": u["stats"],
                "eff": e,
                "avg_eff": avg_eff,
                "desc": f"{u['name']} ({faction_names.get(u['faction'],'')}) has efficiency {e:.2f} vs type '{t}' avg {avg_eff:.2f} ({severity:.0f}% below average)",
                "fix": f"Decrease cost from {u['points_cost']} to ~{max(1, round(stat_total(u['stats']) / avg_eff))} pts, or boost stats"
            })

# 2. Commander outliers
cmd_effs = [cmd_efficiency(c) for c in all_commanders]
if cmd_effs:
    avg_cmd_eff = sum(cmd_effs) / len(cmd_effs)
    for c in all_commanders:
        e = cmd_efficiency(c)
        if avg_cmd_eff > 0 and e > avg_cmd_eff * 1.4:
            severity = (e / avg_cmd_eff - 1) * 100
            issues.append({
                "severity": severity,
                "type": "CMD UNDERCOSTED",
                "unit": c["name"],
                "faction": c["faction"],
                "pts": c["points_cost"],
                "stats": c["battle_stats"],
                "eff": e,
                "avg_eff": avg_cmd_eff,
                "desc": f"Commander {c['name']} ({faction_names.get(c['faction'],'')}) has efficiency {e:.2f} vs commander avg {avg_cmd_eff:.2f} ({severity:.0f}% above)",
                "fix": f"Increase cost from {c['points_cost']} to ~{max(1, round(cmd_stat_total(c) / avg_cmd_eff))} pts"
            })
        elif avg_cmd_eff > 0 and e < avg_cmd_eff * 0.65:
            severity = (1 - e / avg_cmd_eff) * 100
            issues.append({
                "severity": severity,
                "type": "CMD OVERCOSTED",
                "unit": c["name"],
                "faction": c["faction"],
                "pts": c["points_cost"],
                "stats": c["battle_stats"],
                "eff": e,
                "avg_eff": avg_cmd_eff,
                "desc": f"Commander {c['name']} ({faction_names.get(c['faction'],'')}) has efficiency {e:.2f} vs commander avg {avg_cmd_eff:.2f} ({severity:.0f}% below)",
                "fix": f"Decrease cost from {c['points_cost']} to ~{max(1, round(cmd_stat_total(c) / avg_cmd_eff))} pts"
            })

# 3. Faction-wide efficiency imbalance
faction_avg_effs = {}
for f in factions:
    funits = [u for u in all_units if u["faction"] == f and u["type"] != "War Machine"]
    if funits:
        effs = [efficiency(u) for u in funits]
        faction_avg_effs[f] = sum(effs) / len(effs)

if faction_avg_effs:
    overall_avg = sum(faction_avg_effs.values()) / len(faction_avg_effs)
    for f, avg in faction_avg_effs.items():
        if overall_avg > 0:
            deviation = abs(avg - overall_avg) / overall_avg * 100
            if deviation > 15:
                direction = "OVERPERFORMING" if avg > overall_avg else "UNDERPERFORMING"
                issues.append({
                    "severity": deviation,
                    "type": f"FACTION {direction}",
                    "unit": faction_names.get(f, f),
                    "faction": f,
                    "pts": 0,
                    "stats": {},
                    "eff": avg,
                    "avg_eff": overall_avg,
                    "desc": f"{faction_names.get(f,f)} has avg efficiency {avg:.2f} vs cross-faction avg {overall_avg:.2f} ({deviation:.0f}% {'above' if avg > overall_avg else 'below'})",
                    "fix": f"Systematically {'increase costs' if avg > overall_avg else 'decrease costs or boost stats'} across {faction_names.get(f,f)} faction"
                })

# 4. Cost curve issues
for cheaper, costlier in issues_cost_curve:
    severity = (costlier["points_cost"] - cheaper["points_cost"]) * 20
    issues.append({
        "severity": severity,
        "type": "COST CURVE",
        "unit": f"{cheaper['name']} > {costlier['name']}",
        "faction": cheaper["faction"],
        "pts": 0,
        "stats": {},
        "eff": 0,
        "avg_eff": 0,
        "desc": f"{cheaper['name']} ({cheaper['points_cost']}pts) strictly dominates {costlier['name']} ({costlier['points_cost']}pts) in {faction_names.get(cheaper['faction'],'')}",
        "fix": f"Either buff {costlier['name']} stats or reduce its cost to {cheaper['points_cost']} pts"
    })

# Sort by severity
issues.sort(key=lambda x: x["severity"], reverse=True)

# Print top 20
for i, issue in enumerate(issues[:20], 1):
    fn = faction_names.get(issue["faction"], issue["faction"])
    print(f"\n--- Issue #{i} (Severity: {issue['severity']:.0f}) ---")
    print(f"  Type: {issue['type']}")
    print(f"  {issue['desc']}")
    if issue["stats"]:
        s = issue["stats"]
        print(f"  Stats: ATK={s.get('ATK',0)} DEF={s.get('DEF',0)} HP={s.get('HP',0)} MOV={s.get('MOV',0)} RNG={s.get('RNG',0)} MOR={s.get('MOR',0)}")
        print(f"  Points: {issue['pts']}")
    print(f"  Suggested Fix: {issue['fix']}")

# ---- SYSTEMIC PATTERNS ----
print("\n\n" + "="*80)
print("## SYSTEMIC PATTERNS")
print("="*80)

print("\n### Faction Average Efficiency (non-WM units):")
for f, avg in sorted(faction_avg_effs.items(), key=lambda x: x[1], reverse=True):
    fn = faction_names.get(f, f)
    bar = "#" * int(avg * 2)
    print(f"  {fn:<15} {avg:.2f}  {bar}")

print("\n### Faction Average Commander Efficiency:")
for f in factions:
    fcmds = [c for c in all_commanders if c["faction"] == f]
    if fcmds:
        avg = sum(cmd_efficiency(c) for c in fcmds) / len(fcmds)
        fn = faction_names.get(f, f)
        bar = "#" * int(avg)
        print(f"  {fn:<15} {avg:.2f}  {bar}")

print("\n### Faction Point Cost Distribution (non-WM units):")
for f in factions:
    funits = [u for u in all_units if u["faction"] == f and u["type"] != "War Machine"]
    if funits:
        pts_list = [u["points_cost"] for u in funits]
        fn = faction_names.get(f, f)
        print(f"  {fn:<15} min={min(pts_list):>2} max={max(pts_list):>2} avg={sum(pts_list)/len(pts_list):.1f} median={sorted(pts_list)[len(pts_list)//2]:>2}")

print("\n\nAudit complete.")
