# Shardborne — Tabletop Simulator Mod Guide

## Installation

### Step 1: Generate the Save File
```
cd Wargame
python tts_generator.py
```
This creates `Shardborne.json` in the project directory.

### Step 2: Install in TTS
Copy `Shardborne.json` to your TTS Saves folder:
```
%USERPROFILE%\Documents\My Games\Tabletop Simulator\Saves\
```
If TTS is installed and the Saves directory exists, the generator will also auto-copy for you.

### Step 3: Load in TTS
1. Open Tabletop Simulator
2. Go to **Games → Save & Load**
3. Click **Shardborne**
4. The mod loads with all components, scripting, and UI

---

## What's Included

| Component | Description | Count |
|-----------|-------------|-------|
| **Faction Bags** | One bag per faction containing all commanders, units, and fragments | 5 |
| **Commander Tokens** | Figurine-style standing tokens with full stat blocks and skill trees | 65 |
| **Unit Tokens** | Flat disc tokens with stats, specials, and abilities | 277 |
| **Fragment Tokens** | Purple tokens for fragment items | 75 |
| **Card Library** | All command, tech, fragment, and tactical cards | 394 |
| **Combat Dice** | White d6 dice for attacks | 10 |
| **Morale Dice** | Red d6 dice for morale tests | 2 |
| **Damage Tokens** | Red stackable tokens (1-damage and 5-damage) | 40 |
| **Objective Markers** | Gold tokens for scoring objectives | 5 |
| **Terrain Tokens** | Forest, Ruins, Hill, River, Burning terrain pieces | 15 |
| **VP Counters** | Click-adjustable victory point counters | 2 |
| **Round Counter** | Track current game round | 1 |
| **Quick Reference** | Rules summary notecard | 1 |
| **Deployment Zones** | Scripting zones for player deployment areas | 2 |

---

## Table Layout

```
         Player 2 (Red) Side
  ┌──────────────────────────────┐
  │  [Deploy Zone 2]             │
  │                              │
  │     ★ Objective Markers      │   ← Terrain Bag
  │        on battlefield        │   ← Damage Tokens
  │                              │   ← Dice Bag
  │  [Deploy Zone 1]             │   ← Counters
  └──────────────────────────────┘
         Player 1 (White) Side

  Left side: Faction Bags, Card Library
  Right side: Dice, Counters, Tokens
  Far left: Quick Reference, Ruler
```

---

## How to Play

### Setup
1. **Click "Next Phase"** in the UI panel to start the game (initializes Turn 1)
2. Each player picks a faction bag and pulls it to their side
3. Open the bag (hover + press `L` or click `Search`) to see contents
4. Build your army:
   - Pick 1 Commander (pull from Commanders sub-bag)
   - Pick units up to your agreed point limit
   - Place on the table in your deployment zone
5. Each player draws 5 cards from the Card Library bag to form their starting hand
   - Hold cards in your **hand zone** (bottom of screen) to hide them from opponents

### Battle Sizes
| Size | Points | Units | War Machines | Table | Turns |
|------|--------|-------|-------------|-------|-------|
| Skirmish | 50–100 | 5–20 | 1 max | 30"×30" | 5 |
| Standard | 200–300 | 15–30 | 3 max | 48"×48" | 6 |
| Epic | 500+ | 30–60 | 6 max | 60"×72" | 7 |

> **Scale:** 1 TTS grid unit = 1 inch. Use TTS right-click → Measure for exact distances.

### Turn Structure

The UI panel (top-right) shows the current phase. Click **"Next Phase ▶"** to advance:

#### 1. Command Phase
- Both players gain **+3 CP** automatically
- Draw 2 cards (hand limit 7)
- Play Command and Tech cards by spending CP
- Activate Fragment abilities

#### 2. Movement Phase
- Move each unit up to its **MOV** stat in inches
- Difficult terrain = half movement
- Flying units ignore terrain
- Units within 1" of an enemy are **engaged** (can't freely leave)

#### 3. Combat Phase
- Declare attacks (check unit's **RNG** stat for range)
- Roll ATK dice: each die ≥ target's **DEF** = 1 hit
- Rolling a **6** = Critical Hit (deals 2 damage)
- Subtract total damage from target's **HP**
- Play Tactical cards to modify combat

#### 4. End Phase
- Units at half HP or below: roll **2d6 ≤ MOR** to pass morale
- Failed morale = unit flees (remove from play)
- Score objectives (1 VP per controlled marker)
- Click **"Next Turn ⟳"** to begin the next turn

---

## UI Panel Guide

The scripted UI panel appears in the **top-right corner**:

| Control | Function |
|---------|----------|
| **Next Phase ▶** | Advance to the next phase (or start game) |
| **Next Turn ⟳** | Begin the next turn (resets phases, gains CP) |
| **CP +/-** | Adjust Command Points for each player |
| **Frags +/-** | Track Fragment charges for each player |
| **🎲 Roll ATK** | Shows attack rolling instructions |
| **🎲 Morale** | Auto-rolls 2d6 morale test |
| **Minimize ▲** | Collapse/expand the panel |

---

## Chat Commands

Type these in the TTS chat box (press Enter):

| Command | Example | Description |
|---------|---------|-------------|
| `!atk <dice> vs <DEF>` | `!atk 6 vs 4` | Auto-rolls attack: 6 ATK dice vs DEF 4 |
| `!morale <MOR>` | `!morale 8` | Morale test: rolls 2d6, pass if ≤ MOR |
| `!roll XdY` | `!roll 3d6` | Generic dice roll |
| `!phase` | `!phase` | Shows current turn/phase/CP |
| `!help` | `!help` | Lists all commands |

### Attack Resolution Example
```
> !atk 6 vs 4
⚔️ ATTACK: 6 dice vs DEF 4
Rolls: [2, 4, 6, 1, 5, 3]
Hits: 3 | Crits: 1 | Total Damage: 4
```
- Die results 4, 5, 6 all hit (≥ DEF 4)
- The 6 is a crit (2 damage instead of 1)
- Total: 2 normal hits + 1 crit = 4 damage

---

## Reading Unit Tokens

### Hovering / Right-Clicking
Hover over any token to see its tooltip. The **Description** field contains:

```
[b]Ashborn Infantry[/b]
Type: Infantry | Role: Core troops
Points: 2
─────────────────
ATK:6 | DEF:3 | HP:3 | MOV:7 | RNG:1 | MOR:6
─────────────────
• Fire Resistant

"Unbonded warriors wielding flame-forged spears"
```

### Commander Tokens
Commander tokens are **standing figurines** (taller) marked with ⭐. They include:
- Base stats (Command, Knowledge, Leadership, Agility, Health)
- Battle stats (ATK, DEF, HP, MOV, RNG, MOR)
- **GM Notes** contain the full skill tree and evolution paths (right-click → Notes)

### Stat Reference
| Stat | Meaning |
|------|---------|
| **ATK** | Number of attack dice rolled |
| **DEF** | Target number to hit (die must ≥ DEF) |
| **HP** | Hit points before destruction |
| **MOV** | Movement in inches per turn |
| **RNG** | Maximum attack range in inches |
| **MOR** | Morale threshold (2d6 ≤ MOR to pass) |

---

## Card System

Cards are sorted into 4 type decks inside the **Card Library** bag:

| Type | Color | Deck | Usage |
|------|-------|------|-------|
| **Command** | 🟢 Green | CMD | Movement orders, army-wide buffs |
| **Tech** | 🔵 Blue | TECH | Equipment upgrades, constructs |
| **Fragment** | 🟣 Purple | FRAG | Powerful but risky abilities |
| **Tactical** | 🟠 Orange | TAC | Combat tricks, reactions |

### Card Drawing
- Draw **2 cards per turn** during Command Phase
- **Hand limit: 7** cards
- Only your **Commander** can play cards
- Cards have a **CP cost** that must be paid
- Cards played within Commander's communication range

### Using Cards
1. Pull a card from your hand zone
2. Read the timing (which phase it can be played)
3. Spend the CP cost (adjust the counter)
4. Place the card face-up and announce its effect
5. Resolve, then discard

---

## Damage Tracking

### Using Damage Tokens
1. Open the **❤️ Damage Tokens** bag
2. Pull out **1-damage** (red, marked "1") or **5-damage** (dark red, marked "5") tokens
3. Stack damage tokens **on top of** the unit token
4. When damage ≥ unit's HP, the unit is destroyed (remove both)

### Example
A unit with 9 HP takes 7 damage:
- Place one 5-damage token and two 1-damage tokens on it
- The unit has 2 HP remaining
- At End Phase, it's below half HP → roll morale (2d6 ≤ MOR)

---

## Terrain

Pull terrain tokens from the **🗺️ Terrain** bag and place before the game starts:

| Terrain | Effect |
|---------|--------|
| 🌲 **Forest** | Half movement. +1 DEF (cover). |
| 🏚️ **Ruins** | +1 DEF (cover). Wall sections block Line of Sight. |
| ⛰️ **Hill** | +2 RNG for units on top. Cover for units behind. |
| 🌊 **River** | Half movement. No cover. |
| 🔥 **Burning** | 1 damage to non-Fire-Immune units entering. Emberclaw ignores. |

Place 4–8 terrain pieces for a standard game. Agree on placement with your opponent.

---

## Images

Unit tokens for **Emberclaw Warpack** and **Iron Dominion** include artwork from the project's GitHub repo. Other factions display colored placeholder images. As new art is added to the repo and pushed to `main`, re-run `tts_generator.py` to update the image URLs.

### Regenerating the Save File
After any game data changes:
```
python tts_generator.py
```
This regenerates `Shardborne.json` with the latest stats, cards, and images.

---

## Tips & Tricks

- **Right-click tokens** for options: Flip, Lock, Tooltip, Copy, etc.
- **Press `R`** while hovering over dice to roll them
- **Middle-click** to peek at a face-down card
- **Lock terrain** (right-click → Lock) so it doesn't get knocked around
- **Clone units** (Ctrl+C / Ctrl+V) to field multiple copies of the same unit
- **Number keys (1-9)** set the quantity when cloning
- **Tab** flips the camera to the other side
- Use **TTS ruler** (right-click empty space → Measure) for movement and range

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Save file not appearing in TTS | Check the Saves folder path — it must be in `Documents\My Games\Tabletop Simulator\Saves\` |
| UI panel not showing | Wait a few seconds after loading — it initializes with a short delay |
| Images not loading | Ensure the GitHub repo is public and images are pushed to `main` |
| Parser errors | Check that the JS data files haven't changed their export pattern |
| Missing units/commanders | Re-run `tts_generator.py` — it reads fresh from the data files |

---

## File Structure

```
Wargame/
├── tts_generator.py          ← Run this to generate the TTS save
├── Shardborne.json           ← Generated TTS save file
├── TTS_GUIDE.md              ← This guide
├── data/
│   ├── core.js               ← Card library, core rules
│   └── factions/
│       ├── emberclaw-warpack.js
│       ├── iron-dominion.js
│       ├── nightfang-dominion.js
│       ├── thornweft-matriarchy.js
│       ├── veilbound-shogunate.js
│       └── Images/
│           ├── Emberclaw/     ← Unit artwork (22 webp)
│           └── IronDominion/  ← Unit artwork (35 webp)
```

---

*Generated for Shardborne v0.9 — Tabletop Simulator Edition*
