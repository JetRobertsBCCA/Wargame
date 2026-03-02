#!/usr/bin/env python3
"""
Generate map sprites for Shardborne TRPG from Dungeon Crawl Stone Soup tiles.

Each unit type per faction gets a thematically appropriate 32x32 DCSS tile.
This script:
  1. Copies the chosen tile as-is into imagese/sprites/{faction}/
  2. Tints it with the faction accent color
  3. Creates a 64x32 combined sprite (alive | dead frames)

Run from the shardborne-trpg/ directory:
    python generate_sprites.py
"""

import os
import shutil
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
except ImportError:
    print("Pillow not installed. Run: pip install Pillow")
    exit(1)

ROOT = Path(__file__).parent
DCSS = ROOT / "imagese" / "dcss" / "Dungeon Crawl Stone Soup Full"
OUT  = ROOT / "imagese" / "sprites"

# ── Faction × UnitType → DCSS sprite path (relative to DCSS root) ──
# UnitType enum: COMMANDER(0), INFANTRY(1), CAVALRY(2), SUPPORT(3),
#                SCOUT(4), ARTILLERY(5), SPECIALIST(6), WAR_MACHINE(7)

SPRITE_MAP = {
    "emberclaw": {
        "INFANTRY":    "monster/demons/efreet.png",
        "CAVALRY":     "monster/animals/hell_hound_new.png",
        "SUPPORT":     "monster/nonliving/fire_elemental_new.png",
        "SCOUT":       "monster/animals/fire_bat.png",
        "ARTILLERY":   "monster/nonliving/fire_vortex.png",
        "SPECIALIST":  "monster/demons/balrug_new.png",
        "WAR_MACHINE": "monster/dragons/dragon.png",
    },
    "iron_dominion": {
        "INFANTRY":    "monster/nonliving/iron_golem.png",
        "CAVALRY":     "monster/nonliving/gargoyle.png",
        "SUPPORT":     "monster/nonliving/clay_golem.png",
        "SCOUT":       "monster/nonliving/metal_gargoyle.png",
        "ARTILLERY":   "monster/nonliving/crystal_guardian.png",
        "SPECIALIST":  "monster/nonliving/iron_elemental.png",
        "WAR_MACHINE": "monster/nonliving/stone_golem.png",
    },
    "nightfang": {
        "INFANTRY":    "monster/undead/ghoul.png",
        "CAVALRY":     "monster/undead/vampire_knight_new.png",
        "SUPPORT":     "monster/undead/lich.png",
        "SCOUT":       "monster/undead/shadow_new.png",
        "ARTILLERY":   "monster/undead/curse_skull.png",
        "SPECIALIST":  "monster/undead/vampire_new.png",
        "WAR_MACHINE": "monster/undead/bone_dragon_new.png",
    },
    "thornweft": {
        "INFANTRY":    "monster/animals/spider.png",
        "CAVALRY":     "monster/animals/wolf_spider_new.png",
        "SUPPORT":     "monster/animals/orb_spider.png",
        "SCOUT":       "monster/animals/jumping_spider_new.png",
        "ARTILLERY":   "monster/animals/redback_new.png",
        "SPECIALIST":  "monster/fungi_plants/thorn_hunter.png",
        "WAR_MACHINE": "monster/animals/emperor_scorpion.png",
    },
    "veilbound": {
        "INFANTRY":    "monster/holy/paladin.png",
        "CAVALRY":     "monster/holy/centaur_paladin.png",
        "SUPPORT":     "monster/holy/angel_new.png",
        "SCOUT":       "monster/holy/cherub.png",
        "ARTILLERY":   "monster/holy/ophan.png",
        "SPECIALIST":  "monster/holy/apis.png",
        "WAR_MACHINE": "monster/holy/eastern_dragon.png",
    },
}

# Faction tint colors (RGBA, matching FACTION_ACCENT in sprite_generator.gd)
FACTION_TINTS = {
    "emberclaw":      (255, 191, 51, 80),   # Gold/amber, 80 alpha for tint
    "iron_dominion":  (191, 204, 217, 80),   # Light steel
    "nightfang":      (217, 38, 77, 80),     # Blood red
    "thornweft":      (153, 217, 77, 80),    # Bright lime
    "veilbound":      (153, 217, 255, 80),   # Light cyan
}


def create_dead_frame(img: Image.Image) -> Image.Image:
    """Convert a sprite to grayscale with 50% opacity and an X mark."""
    gray = img.convert("LA").convert("RGBA")
    # Reduce alpha by half
    r, g, b, a = gray.split()
    a = a.point(lambda p: p // 2)
    gray = Image.merge("RGBA", (r, g, b, a))

    # Draw X mark
    draw = ImageDraw.Draw(gray)
    w, h = gray.size
    dark = (30, 30, 30, 200)
    draw.line([(2, 2), (w - 3, h - 3)], fill=dark, width=2)
    draw.line([(2, h - 3), (w - 3, 2)], fill=dark, width=2)

    return gray


def tint_sprite(img: Image.Image, tint_color: tuple) -> Image.Image:
    """Apply a subtle faction color tint overlay."""
    overlay = Image.new("RGBA", img.size, tint_color)
    # Composite: only tint where the sprite has content (alpha > 0)
    r, g, b, a = img.split()
    # Create tint mask from original alpha
    tinted = Image.composite(
        Image.alpha_composite(img, overlay), img,
        a.point(lambda p: 255 if p > 30 else 0)
    )
    return tinted


def create_map_sprite(src_path: Path, faction: str) -> Image.Image:
    """Create a 64x32 combined sprite (alive | dead) from a DCSS 32x32 tile."""
    src = Image.open(src_path).convert("RGBA")

    # Resize to 32x32 if not already
    if src.size != (32, 32):
        src = src.resize((32, 32), Image.LANCZOS)

    # Apply faction tint
    tint = FACTION_TINTS.get(faction, (128, 128, 128, 60))
    alive = tint_sprite(src, tint)

    # Create dead frame
    dead = create_dead_frame(alive)

    # Combine into 64x32
    result = Image.new("RGBA", (64, 32), (0, 0, 0, 0))
    result.paste(alive, (0, 0))
    result.paste(dead, (32, 0))

    return result


def main():
    os.makedirs(OUT, exist_ok=True)
    total = 0
    missing = 0

    for faction, type_map in SPRITE_MAP.items():
        faction_dir = OUT / faction
        os.makedirs(faction_dir, exist_ok=True)

        for unit_type, rel_path in type_map.items():
            src_path = DCSS / rel_path
            if not src_path.exists():
                print(f"  WARNING: Missing {src_path}")
                missing += 1
                continue

            # Save the combined map sprite
            out_name = f"{unit_type.lower()}.png"
            out_path = faction_dir / out_name
            sprite = create_map_sprite(src_path, faction)
            sprite.save(out_path, "PNG")

            # Also save just the 32x32 icon version
            icon_dir = faction_dir / "icons"
            os.makedirs(icon_dir, exist_ok=True)
            src_img = Image.open(src_path).convert("RGBA")
            if src_img.size != (32, 32):
                src_img = src_img.resize((32, 32), Image.LANCZOS)
            tinted_icon = tint_sprite(src_img, FACTION_TINTS.get(faction, (128, 128, 128, 60)))
            tinted_icon.save(icon_dir / out_name, "PNG")

            total += 1

    print(f"\nGenerated {total} sprite sets ({missing} missing source files)")
    print(f"Output: {OUT}")


if __name__ == "__main__":
    main()
