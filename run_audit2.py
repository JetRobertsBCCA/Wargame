import re
import os
from collections import defaultdict
from statistics import median

BASE = os.path.dirname(os.path.abspath(__file__))
FACTION_DIR = os.path.join(BASE, "data", "factions")

faction_files = [
    "emberclaw-warpack.js",
    "iron-dominion.js",
    "nightfang-dominion.js",
    "thornweft-matriarchy.js",
    "veilbound-shogunate.js",
]

FACTION_SHORT = {
    "emberclaw-warpack": "Emberclaw",
    "iron-dominion": "Iron Dom.",
    "nightfang-dominion": "Nightfang",
    "thornweft-matriarchy": "Thornweft",
    "veilbound-shogunate": "Veilbound",
}

def parse_stats(text):
    result = {}
    for stat in ["ATK", "DEF", "HP", "MOV", "RNG", "MOR"]:
        m = re.search(rf'{stat}\s*:\s*(\d+)', text)
        if m:
            result[stat] = int(m.group(1))
    return result

def parse_base_stats(text):
    result = {}
    for stat in ["Command", "Knowledge", "Leadership", "Agility", "Health"]:
        m = re.search(rf'{stat}\s*:\s*(\d+)', text)
        if m:
            result[stat] = int(m.group(1))
    return result

def extract_units(content):
    """Extract all unit entries - robust approach using individual field search within object blocks."""
    units = []
    
    # Strategy: find each object block that has name + faction + points_cost + type + stats
    # Split on opening braces that start unit objects
    # We look for objects that have stats: { ATK: ..., DEF: ..., HP: ... } which identifies combat units
    
    # Find all blocks between { and the matching } that contain both 'stats:' and 'type:'
    # Use a more flexible approach: find each 'name: "..."' followed by stats within the same object
    
    # Approach: find all occurrences of a unit-like block using markers
    # A unit must have: name, faction, points_cost, type, stats
    # But NOT battle_stats (that's commanders)
    
    # Find each object start with name:
    pattern = r'\{\s*\n?\s*name:\s*["\']([^"\']+)["\']'
    
    for m in re.finditer(pattern, content):
        start = m.start()
        name = m.group(1)
        
        # Find the end of this object block by counting braces
        depth = 0
        end = start
        for i in range(start, len(content)):
            if content[i] == '{':
                depth += 1
            elif content[i] == '}':
                depth -= 1
                if depth == 0:
                    end = i + 1
                    break
        
        block = content[start:end]
        
        # Skip if this is a commander (has battle_stats)
        if 'battle_stats:' in block:
            continue
        
        # Must have stats: { ... } with ATK
        stats_m = re.search(r'stats:\s*\{([^}]+)\}', block)
        if not stats_m:
            continue
        
        # Extract fields
        faction_m = re.search(r'faction:\s*["\']([^"\']+)["\']', block)
        pts_m = re.search(r'points_cost:\s*(\d+)', block)
        type_m = re.search(r'type:\s*["\']([^"\']+)["\']', block)
        role_m = re.search(r'role:\s*["\']([^"\']+)["\']', block)
        
        if not (faction_m and pts_m and type_m):
            continue
        
        stats = parse_stats(stats_m.group(1))
        if len(stats) < 5:
            continue
        
        # Count special abilities  
        special_m = re.search(r'special:\s*\[(.*?)\]', block, re.DOTALL)
        specials = []
        if special_m:
            specials = re.findall(r'["\']([^"\']*(?:\([^)]*\)[^"\']*)*)["\']', special_m.group(1))
            # Simpler: count items
            specials = [s for s in re.findall(r'(?:"|\')\s*([^"\']{3,})\s*(?:"|\')', special_m.group(1))]
        
        units.append({
            "name": name,
            "faction": faction_m.group(1),
            "points_cost": int(pts_m.group(1)),
            "role": role_m.group(1) if role_m else "",
            "type": type_m.group(1),
            "stats": stats,
            "special_count": len(specials),
            "specials": specials,
        })
    
    return units

def extract_commanders(content):
    commanders = []
    pattern = r'\{\s*\n?\s*name:\s*["\']([^"\']+)["\']'
    
    for m in re.finditer(pattern, content):
        start = m.start()
        name = m.group(1)
        
        depth = 0
        end = start
        for i in range(start, len(content)):
            if content[i] == '{':
                depth += 1
            elif content[i] == '}':
                depth -= 1
                if depth == 0:
                    end = i + 1
                    break
        
        block = content[start:end]
        
        # Must have battle_stats (commander marker)
        battle_m = re.search(r'battle_stats:\s*\{([^}]+)\}', block)
        base_m = re.search(r'base_stats:\s*\{([^}]+)\}', block)
        pts_m = re.search(r'points_cost:\s*(\d+)', block)
        faction_m = re.search(r'faction:\s*["\']([^"\']+)["\']', block)
        
        if not (battle_m and base_m and pts_m and faction_m):
            continue
        
        battle_stats = parse_stats(battle_m.group(1))
        base_stats = parse_base_stats(base_m.group(1))
        
        if len(battle_stats) >= 5 and len(base_stats) >= 4:
            commanders.append({
                "name": name,
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
    path = os.path.join(FACTION_DIR, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    units = extract_units(content)
    cmds = extract_commanders(content)
    all_units.extend(units)
    all_commanders.extend(cmds)

def short_faction(f):
    return FACTION_SHORT.get(f, f[:10])

def stat_total(stats):
    return sum(stats.get(s, 0) for s in ["ATK", "DEF", "HP", "MOV", "RNG", "MOR"])

def efficiency(unit):
    return stat_total(unit["stats"]) / max(unit["points_cost"], 1)

# ============= REPORT =============
W = 100

print("=" * W)
print("SHARDBORNE COMPREHENSIVE BALANCE AUDIT")
print("=" * W)

# 1. FACTION UNIT COUNTS
print("\n## 1. FACTION UNIT & COMMANDER COUNTS\n")
factions = sorted(set(u["faction"] for u in all_units))
all_factions = sorted(set(u["faction"] for u in all_units) | set(c["faction"] for c in all_commanders))

for f in all_factions:
    fu = [u for u in all_units if u["faction"] == f]
    fc = [c for c in all_commanders if c["faction"] == f]
    types = defaultdict(int)
    for u in fu:
        types[u["type"]] += 1
    type_str = ", ".join(f"{t}:{n}" for t, n in sorted(types.items()))
    print(f"  {short_faction(f):15s}  Units: {len(fu):3d}  Commanders: {len(fc):2d}  [{type_str}]")

print(f"\n  Total units: {len(all_units)}   Total commanders: {len(all_commanders)}")

# Split WMs and non-WMs
non_wm = [u for u in all_units if u["type"] != "War Machine"]
wm = [u for u in all_units if u["type"] == "War Machine"]

# 2. COST-TO-STATS EFFICIENCY BY TYPE
print("\n## 2. COST-TO-STATS EFFICIENCY BY TYPE\n")
types = sorted(set(u["type"] for u in all_units))
type_avgs = {}
for t in types:
    tu = [u for u in all_units if u["type"] == t]
    effs = [efficiency(u) for u in tu]
    avg_eff = sum(effs) / len(effs)
    type_avgs[t] = avg_eff
    print(f"  {t:15s} ({len(tu):2d} units) avg_eff={avg_eff:6.2f}  range=[{min(effs):.2f} - {max(effs):.2f}]")
    
    # Show all units sorted by efficiency
    print(f"    {'Name':<36s} {'Faction':<14s} {'Pts':>4s} {'Eff':>6s} {'ATK':>4s} {'DEF':>4s} {'HP':>4s} {'MOV':>4s} {'RNG':>4s} {'MOR':>4s} {'Total':>5s} {'#Sp':>3s}")
    for u in sorted(tu, key=lambda x: efficiency(x), reverse=True):
        s = u["stats"]
        print(f"    {u['name']:<36s} {short_faction(u['faction']):<14s} {u['points_cost']:4d} {efficiency(u):6.2f} {s.get('ATK',0):4d} {s.get('DEF',0):4d} {s.get('HP',0):4d} {s.get('MOV',0):4d} {s.get('RNG',0):4d} {s.get('MOR',0):4d} {stat_total(s):5d} {u['special_count']:3d}")
    print()

# 3. FACTION AVERAGE EFFICIENCY (non-WM)
print("\n## 3. FACTION AVERAGE EFFICIENCY (non-WM units)\n")
for f in all_factions:
    fu = [u for u in non_wm if u["faction"] == f]
    if not fu:
        print(f"  {short_faction(f):15s}  NO UNITS")
        continue
    effs = [efficiency(u) for u in fu]
    avg = sum(effs) / len(effs)
    pts = [u["points_cost"] for u in fu]
    avg_pts = sum(pts) / len(pts)
    bar = "#" * int(avg)
    print(f"  {short_faction(f):15s}  avg_eff={avg:6.2f}  avg_pts={avg_pts:5.2f}  n={len(fu):3d}  {bar}")

# 4. WITHIN-FACTION COST CURVE ISSUES
print("\n\n## 4. WITHIN-FACTION COST CURVE ISSUES")
print("  (Cheaper units that strictly dominate more expensive ones in same faction)\n")
issues_curve = []
for f in all_factions:
    fu = [u for u in non_wm if u["faction"] == f]
    for i, a in enumerate(fu):
        for j, b in enumerate(fu):
            if i >= j:
                continue
            if a["points_cost"] < b["points_cost"]:
                cheaper, costlier = a, b
            elif b["points_cost"] < a["points_cost"]:
                cheaper, costlier = b, a
            else:
                continue
            
            cs = cheaper["stats"]
            es = costlier["stats"]
            dominated = all(cs.get(s, 0) >= es.get(s, 0) for s in ["ATK", "DEF", "HP", "MOV", "RNG", "MOR"])
            if dominated:
                issues_curve.append((cheaper, costlier, f))
                print(f"  {cheaper['name']} ({cheaper['points_cost']}pts) strictly dominates {costlier['name']} ({costlier['points_cost']}pts) in {short_faction(f)}")
                cs2 = cheaper["stats"]
                es2 = costlier["stats"]
                print(f"    Cheaper: ATK={cs2.get('ATK',0)} DEF={cs2.get('DEF',0)} HP={cs2.get('HP',0)} MOV={cs2.get('MOV',0)} RNG={cs2.get('RNG',0)} MOR={cs2.get('MOR',0)}")
                print(f"    Costlier: ATK={es2.get('ATK',0)} DEF={es2.get('DEF',0)} HP={es2.get('HP',0)} MOV={es2.get('MOV',0)} RNG={es2.get('RNG',0)} MOR={es2.get('MOR',0)}")
print(f"\n  Total cost curve violations: {len(issues_curve)}")

# 5. CROSS-FACTION ROLE PARITY
print("\n\n## 5. CROSS-FACTION ROLE PARITY")
print("  (Same role across factions — largest efficiency gaps)\n")
roles = defaultdict(list)
for u in non_wm:
    if u["role"]:
        roles[u["role"].lower().strip()].append(u)

role_gaps = []
for role, units_in_role in sorted(roles.items()):
    factions_present = set(short_faction(u["faction"]) for u in units_in_role)
    if len(factions_present) < 2:
        continue
    effs = [efficiency(u) for u in units_in_role]
    gap = max(effs) / max(min(effs), 0.01)
    if gap >= 1.3:
        best = max(units_in_role, key=lambda u: efficiency(u))
        worst = min(units_in_role, key=lambda u: efficiency(u))
        role_gaps.append((role, gap, best, worst, len(units_in_role)))
        print(f"  Role '{role}' — Efficiency gap: {max(effs):.2f} vs {min(effs):.2f} ({gap:.1f}x)")
        for u in sorted(units_in_role, key=lambda x: efficiency(x), reverse=True):
            print(f"    {u['name']:<36s} {short_faction(u['faction']):<14s} {u['points_cost']:3d}pts  eff={efficiency(u):.2f}")

# 6. WAR MACHINE COMPARISON
print("\n\n## 6. WAR MACHINE COMPARISON\n")
print(f"  {'Name':<36s} {'Faction':<14s} {'Pts':>4s} {'ATK':>4s} {'DEF':>4s} {'HP':>5s} {'MOV':>4s} {'RNG':>4s} {'MOR':>4s} {'Total':>5s} {'Eff':>7s}")
print("  " + "-" * 98)
for u in sorted(wm, key=lambda x: efficiency(x), reverse=True):
    s = u["stats"]
    print(f"  {u['name']:<36s} {short_faction(u['faction']):<14s} {u['points_cost']:4d} {s.get('ATK',0):4d} {s.get('DEF',0):4d} {s.get('HP',0):5d} {s.get('MOV',0):4d} {s.get('RNG',0):4d} {s.get('MOR',0):4d} {stat_total(s):5d} {efficiency(u):7.2f}")

print(f"\n  {'Faction':<15s} {'Avg WM Eff':>10s} {'Avg WM Pts':>10s} {'WM Count':>8s}")
for f in all_factions:
    fwm = [u for u in wm if u["faction"] == f]
    if fwm:
        avg_eff = sum(efficiency(u) for u in fwm) / len(fwm)
        avg_pts = sum(u["points_cost"] for u in fwm) / len(fwm)
        print(f"  {short_faction(f):<15s} {avg_eff:10.2f} {avg_pts:10.1f} {len(fwm):8d}")

# 7. COMMANDER COMPARISON
print("\n\n## 7. COMMANDER COMPARISON\n")
print(f"  {'Name':<36s} {'Faction':<14s} {'Pts':>4s} {'ATK':>4s} {'DEF':>4s} {'HP':>5s} {'MOV':>4s} {'RNG':>4s} {'MOR':>4s} {'Total':>5s} {'Eff':>7s}")
print("  " + "-" * 98)
for c in sorted(all_commanders, key=lambda x: stat_total(x["battle_stats"]) / max(x["points_cost"], 1), reverse=True):
    s = c["battle_stats"]
    eff = stat_total(s) / max(c["points_cost"], 1)
    print(f"  {c['name']:<36s} {short_faction(c['faction']):<14s} {c['points_cost']:4d} {s.get('ATK',0):4d} {s.get('DEF',0):4d} {s.get('HP',0):5d} {s.get('MOV',0):4d} {s.get('RNG',0):4d} {s.get('MOR',0):4d} {stat_total(s):5d} {eff:7.2f}")

print(f"\n  {'Faction':<15s} {'Avg Cmd Eff':>11s} {'Avg Cmd Pts':>11s} {'Cmds':>5s}")
for f in all_factions:
    fc = [c for c in all_commanders if c["faction"] == f]
    if fc:
        avg_eff = sum(stat_total(c["battle_stats"]) / max(c["points_cost"], 1) for c in fc) / len(fc)
        avg_pts = sum(c["points_cost"] for c in fc) / len(fc)
        print(f"  {short_faction(f):<15s} {avg_eff:11.2f} {avg_pts:11.1f} {len(fc):5d}")

# 8. COMMANDER BASE STATS COMPARISON
print("\n\n## 8. COMMANDER BASE STATS COMPARISON\n")
print(f"  {'Faction':<15s} {'Avg Command':>11s} {'Avg Knowledge':>13s} {'Avg Leadership':>14s} {'Avg Agility':>11s} {'Avg Health':>10s}")
for f in all_factions:
    fc = [c for c in all_commanders if c["faction"] == f]
    if fc:
        avg_cmd = sum(c["base_stats"].get("Command", 0) for c in fc) / len(fc)
        avg_kn = sum(c["base_stats"].get("Knowledge", 0) for c in fc) / len(fc)
        avg_ld = sum(c["base_stats"].get("Leadership", 0) for c in fc) / len(fc)
        avg_ag = sum(c["base_stats"].get("Agility", 0) for c in fc) / len(fc)
        avg_hp = sum(c["base_stats"].get("Health", 0) for c in fc) / len(fc)
        print(f"  {short_faction(f):<15s} {avg_cmd:11.1f} {avg_kn:13.1f} {avg_ld:14.1f} {avg_ag:11.1f} {avg_hp:10.0f}")

# 9. SUPPORT UNIT ANALYSIS
print("\n\n## 9. SUPPORT UNIT ANALYSIS\n")
support = [u for u in non_wm if u["type"] == "Support"]
print(f"  {'Name':<36s} {'Faction':<14s} {'Pts':>4s} {'ATK':>4s} {'DEF':>4s} {'HP':>4s} {'MOV':>4s} {'RNG':>4s} {'MOR':>4s} {'Total':>5s} {'Eff':>6s} {'Combat?':>7s}")
print("  " + "-" * 103)
for u in sorted(support, key=lambda x: efficiency(x), reverse=True):
    s = u["stats"]
    combat = "Yes" if s.get("ATK", 0) > 0 else "No"
    print(f"  {u['name']:<36s} {short_faction(u['faction']):<14s} {u['points_cost']:4d} {s.get('ATK',0):4d} {s.get('DEF',0):4d} {s.get('HP',0):4d} {s.get('MOV',0):4d} {s.get('RNG',0):4d} {s.get('MOR',0):4d} {stat_total(s):5d} {efficiency(u):6.2f} {combat:>7s}")

# 10. ARTILLERY COMPARISON
print("\n\n## 10. ARTILLERY COMPARISON\n")
arty = [u for u in non_wm if u["type"] == "Artillery"]
if arty:
    print(f"  {'Name':<36s} {'Faction':<14s} {'Pts':>4s} {'ATK':>4s} {'DEF':>4s} {'HP':>4s} {'MOV':>4s} {'RNG':>4s} {'MOR':>4s} {'Total':>5s} {'Eff':>6s}")
    print("  " + "-" * 95)
    for u in sorted(arty, key=lambda x: efficiency(x), reverse=True):
        s = u["stats"]
        print(f"  {u['name']:<36s} {short_faction(u['faction']):<14s} {u['points_cost']:4d} {s.get('ATK',0):4d} {s.get('DEF',0):4d} {s.get('HP',0):4d} {s.get('MOV',0):4d} {s.get('RNG',0):4d} {s.get('MOR',0):4d} {stat_total(s):5d} {efficiency(u):6.2f}")
else:
    print("  No Artillery units found.")

# 11. SPECIALIST COMPARISON
print("\n\n## 11. SPECIALIST COMPARISON\n")
spec = [u for u in non_wm if u["type"] == "Specialist"]
if spec:
    print(f"  {'Name':<36s} {'Faction':<14s} {'Pts':>4s} {'ATK':>4s} {'DEF':>4s} {'HP':>4s} {'MOV':>4s} {'RNG':>4s} {'MOR':>4s} {'Total':>5s} {'Eff':>6s} {'#Sp':>3s}")
    print("  " + "-" * 99)
    for u in sorted(spec, key=lambda x: efficiency(x), reverse=True):
        s = u["stats"]
        print(f"  {u['name']:<36s} {short_faction(u['faction']):<14s} {u['points_cost']:4d} {s.get('ATK',0):4d} {s.get('DEF',0):4d} {s.get('HP',0):4d} {s.get('MOV',0):4d} {s.get('RNG',0):4d} {s.get('MOR',0):4d} {stat_total(s):5d} {efficiency(u):6.2f} {u['special_count']:3d}")
else:
    print("  No Specialist units found.")

# 12. EXTREME OUTLIERS
print("\n\n## 12. EXTREME OUTLIERS\n")

zero_cost = [u for u in all_units if u["points_cost"] == 0]
if zero_cost:
    print("### 0-Cost Units (potential exploits):")
    for u in zero_cost:
        print(f"  {u['name']} ({short_faction(u['faction'])}) - {u['type']}")
else:
    print("No 0-cost units found.")

print("\n### Top 10 Most Efficient Non-War-Machine Units:")
for u in sorted(non_wm, key=lambda x: efficiency(x), reverse=True)[:10]:
    s = u["stats"]
    print(f"  {u['name']:<36s} {short_faction(u['faction']):<14s} {u['points_cost']:3d}pts  eff={efficiency(u):.2f}  total={stat_total(s)}")

print("\n### Top 10 Least Efficient Non-War-Machine Units:")
for u in sorted(non_wm, key=lambda x: efficiency(x))[:10]:
    s = u["stats"]
    print(f"  {u['name']:<36s} {short_faction(u['faction']):<14s} {u['points_cost']:3d}pts  eff={efficiency(u):.2f}  total={stat_total(s)}")

# ============= TOP BALANCE ISSUES =============
print("\n\n" + "=" * W)
print("## TOP BALANCE ISSUES (RANKED BY SEVERITY)")
print("=" * W)

issues = []

# Issue type 1: Undercosted/Overcosted units (deviation from type average)
for u in all_units:
    t = u["type"]
    tu = [x for x in all_units if x["type"] == t]
    if len(tu) < 3:
        continue
    effs = [efficiency(x) for x in tu]
    avg_eff = sum(effs) / len(effs)
    e = efficiency(u)
    pct_dev = (e - avg_eff) / avg_eff * 100
    
    if pct_dev > 40:
        suggested = max(1, round(stat_total(u["stats"]) / avg_eff))
        issues.append({
            "severity": int(pct_dev),
            "type": "UNDERCOSTED",
            "desc": f"{u['name']} ({short_faction(u['faction'])}) has efficiency {e:.2f} vs type '{t}' avg {avg_eff:.2f} ({pct_dev:.0f}% above average)",
            "stats": u["stats"],
            "pts": u["points_cost"],
            "fix": f"Increase cost from {u['points_cost']} to ~{suggested} pts",
        })
    elif pct_dev < -35:
        suggested = max(1, round(stat_total(u["stats"]) / avg_eff))
        issues.append({
            "severity": int(abs(pct_dev)),
            "type": "OVERCOSTED",
            "desc": f"{u['name']} ({short_faction(u['faction'])}) has efficiency {e:.2f} vs type '{t}' avg {avg_eff:.2f} ({abs(pct_dev):.0f}% below average)",
            "stats": u["stats"],
            "pts": u["points_cost"],
            "fix": f"Decrease cost from {u['points_cost']} to ~{suggested} pts, or boost stats",
        })

# Issue type 2: Cost curve violations
for cheaper, costlier, f in issues_curve:
    issues.append({
        "severity": 20,
        "type": "COST CURVE",
        "desc": f"{cheaper['name']} ({cheaper['points_cost']}pts) strictly dominates {costlier['name']} ({costlier['points_cost']}pts) in {short_faction(f)}",
        "stats": None,
        "pts": None,
        "fix": f"Either buff {costlier['name']} stats or reduce its cost to {cheaper['points_cost']} pts",
    })

# Issue type 3: Faction WM efficiency imbalance
wm_factions = defaultdict(list)
for u in wm:
    wm_factions[u["faction"]].append(u)
if len(wm_factions) >= 2:
    wm_avgs = {}
    for f, fwm in wm_factions.items():
        wm_avgs[f] = sum(efficiency(u) for u in fwm) / len(fwm)
    best_f = max(wm_avgs, key=wm_avgs.get)
    worst_f = min(wm_avgs, key=wm_avgs.get)
    gap = wm_avgs[best_f] / max(wm_avgs[worst_f], 0.01)
    if gap > 1.15:
        issues.append({
            "severity": int((gap - 1) * 100),
            "type": "FACTION WM IMBALANCE",
            "desc": f"War Machine efficiency gap: {short_faction(best_f)} avg {wm_avgs[best_f]:.2f} vs {short_faction(worst_f)} avg {wm_avgs[worst_f]:.2f} ({gap:.2f}x)",
            "stats": None,
            "pts": None,
            "fix": f"Reduce {short_faction(worst_f)} WM costs by ~10-15% or boost their stats",
        })

# Issue type 4: Commander efficiency imbalance
cmd_factions = defaultdict(list)
for c in all_commanders:
    cmd_factions[c["faction"]].append(c)
if len(cmd_factions) >= 2:
    cmd_avgs = {}
    for f, fc in cmd_factions.items():
        cmd_avgs[f] = sum(stat_total(c["battle_stats"]) / max(c["points_cost"], 1) for c in fc) / len(fc)
    best_f = max(cmd_avgs, key=cmd_avgs.get)
    worst_f = min(cmd_avgs, key=cmd_avgs.get)
    gap = cmd_avgs[best_f] / max(cmd_avgs[worst_f], 0.01)
    if gap > 1.1:
        issues.append({
            "severity": int((gap - 1) * 100),
            "type": "FACTION CMD IMBALANCE",
            "desc": f"Commander efficiency gap: {short_faction(best_f)} avg {cmd_avgs[best_f]:.2f} vs {short_faction(worst_f)} avg {cmd_avgs[worst_f]:.2f} ({gap:.2f}x)",
            "stats": None,
            "pts": None,
            "fix": f"Boost {short_faction(worst_f)} commander battle_stats or reduce their costs",
        })

# Issue type 5: Faction non-WM unit count imbalance
faction_unit_counts = {}
for f in all_factions:
    faction_unit_counts[f] = len([u for u in non_wm if u["faction"] == f])
if faction_unit_counts:
    max_count = max(faction_unit_counts.values())
    min_count = min(faction_unit_counts.values())
    if max_count > 0 and min_count > 0:
        ratio = max_count / min_count
        if ratio > 1.3:
            max_f = max(faction_unit_counts, key=faction_unit_counts.get)
            min_f = min(faction_unit_counts, key=faction_unit_counts.get)
            issues.append({
                "severity": int((ratio - 1) * 50),
                "type": "ROSTER SIZE IMBALANCE",
                "desc": f"{short_faction(max_f)} has {max_count} non-WM units vs {short_faction(min_f)} with {min_count} ({ratio:.1f}x)",
                "stats": None,
                "pts": None,
                "fix": f"Add ~{max_count - min_count} more units to {short_faction(min_f)}, or trim {short_faction(max_f)} roster",
            })

# Sort and print top 20
issues.sort(key=lambda x: x["severity"], reverse=True)
for i, issue in enumerate(issues[:20], 1):
    print(f"\n--- Issue #{i} (Severity: {issue['severity']}) ---")
    print(f"  Type: {issue['type']}")
    print(f"  {issue['desc']}")
    if issue["stats"]:
        s = issue["stats"]
        print(f"  Stats: ATK={s.get('ATK',0)} DEF={s.get('DEF',0)} HP={s.get('HP',0)} MOV={s.get('MOV',0)} RNG={s.get('RNG',0)} MOR={s.get('MOR',0)}")
        print(f"  Points: {issue['pts']}")
    print(f"  Suggested Fix: {issue['fix']}")

# ============= SYSTEMIC PATTERNS =============
print("\n\n" + "=" * W)
print("## SYSTEMIC PATTERNS")
print("=" * W)

print("\n### Faction Average Efficiency (non-WM units):")
for f in sorted(all_factions, key=lambda f: sum(efficiency(u) for u in non_wm if u["faction"] == f) / max(len([u for u in non_wm if u["faction"] == f]), 1), reverse=True):
    fu = [u for u in non_wm if u["faction"] == f]
    if not fu:
        continue
    avg = sum(efficiency(u) for u in fu) / len(fu)
    bar = "#" * int(avg)
    print(f"  {short_faction(f):15s} {avg:6.2f}  {bar}")

print("\n### Faction Average Commander Efficiency:")
for f in sorted(all_factions, key=lambda f: sum(stat_total(c["battle_stats"]) / max(c["points_cost"], 1) for c in all_commanders if c["faction"] == f) / max(len([c for c in all_commanders if c["faction"] == f]), 1), reverse=True):
    fc = [c for c in all_commanders if c["faction"] == f]
    if not fc:
        continue
    avg = sum(stat_total(c["battle_stats"]) / max(c["points_cost"], 1) for c in fc) / len(fc)
    bar = "#" * int(avg)
    print(f"  {short_faction(f):15s} {avg:5.2f}  {bar}")

print("\n### Faction Point Cost Distribution (non-WM units):")
for f in all_factions:
    fu = [u for u in non_wm if u["faction"] == f]
    if not fu:
        continue
    pts = sorted(u["points_cost"] for u in fu)
    print(f"  {short_faction(f):15s}  min={min(pts):2d} max={max(pts):2d} avg={sum(pts)/len(pts):.1f} median={int(median(pts)):2d}")

print("\n### Faction Type Coverage:")
all_types = sorted(set(u["type"] for u in all_units))
print(f"  {'Faction':<15s}", end="")
for t in all_types:
    print(f" {t[:8]:>8s}", end="")
print()
for f in all_factions:
    print(f"  {short_faction(f):<15s}", end="")
    for t in all_types:
        count = len([u for u in all_units if u["faction"] == f and u["type"] == t])
        print(f" {count:8d}", end="")
    print()

print("\n### Special Ability Count Distribution:")
for f in all_factions:
    fu = [u for u in non_wm if u["faction"] == f]
    if not fu:
        continue
    sp_counts = [u["special_count"] for u in fu]
    avg_sp = sum(sp_counts) / len(sp_counts)
    print(f"  {short_faction(f):15s}  avg_specials={avg_sp:.1f}  max={max(sp_counts)}  min={min(sp_counts)}")

# New: Which factions lack specific types
print("\n### Faction Type Gaps:")
for f in all_factions:
    missing = []
    for t in all_types:
        if t == "War Machine":
            continue
        count = len([u for u in all_units if u["faction"] == f and u["type"] == t])
        if count == 0:
            missing.append(t)
    if missing:
        print(f"  {short_faction(f):15s}  MISSING: {', '.join(missing)}")

# New: Per-stat faction averages for non-WM
print("\n### Faction Average Stats (non-WM units, weighted by count):")
print(f"  {'Faction':<15s} {'ATK':>6s} {'DEF':>6s} {'HP':>6s} {'MOV':>6s} {'RNG':>6s} {'MOR':>6s}")
for f in all_factions:
    fu = [u for u in non_wm if u["faction"] == f]
    if not fu:
        continue
    avgs = {}
    for stat in ["ATK", "DEF", "HP", "MOV", "RNG", "MOR"]:
        avgs[stat] = sum(u["stats"].get(stat, 0) for u in fu) / len(fu)
    print(f"  {short_faction(f):<15s} {avgs['ATK']:6.1f} {avgs['DEF']:6.1f} {avgs['HP']:6.1f} {avgs['MOV']:6.1f} {avgs['RNG']:6.1f} {avgs['MOR']:6.1f}")

print("\n\nAudit complete.")
