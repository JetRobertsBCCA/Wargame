#!/usr/bin/env python3
"""
Generate map sprites for Shardborne TRPG from Dungeon Crawl Stone Soup tiles.

Each unit type per faction gets a thematically appropriate 32x32 DCSS tile.
This script:
  1. Copies the chosen tile as-is into imagese/sprites/{faction}/
  2. Tints it with the faction accent color
  3. Creates a 64x32 combined sprite (alive | dead frames)

Tile source: Dungeon Crawl Stone Soup 32x32 tiles (CC0)
  https://opengameart.org/content/dungeon-crawl-32x32-tiles
  https://opengameart.org/content/dungeon-crawl-32x32-tiles-supplemental
Download and extract into: imagese/dcss/Dungeon Crawl Stone Soup Full/

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
#
# Tile fallbacks: each entry is a list tried in order; first existing file wins.
# This handles both the main pack and the supplemental pack having slightly
# different naming conventions (_new suffix, etc.).

SPRITE_MAP = {
    # ── Emberclaw Warpack ── fire / dragon / tribal warriors ──────────────────
    "emberclaw": {
        "INFANTRY":    ["monster/demons/efreet.png",
                        "monster/demons/efreet_new.png"],
        "CAVALRY":     ["monster/dragons/wyvern.png",          # dragon-mount riders
                        "monster/dragons/wyvern_new.png",
                        "monster/animals/hell_hound_new.png"],
        "SUPPORT":     ["monster/nonliving/fire_elemental_new.png",
                        "monster/nonliving/fire_elemental.png"],
        "SCOUT":       ["monster/animals/fire_bat.png",
                        "monster/animals/fire_bat_new.png"],
        "ARTILLERY":   ["monster/nonliving/fire_vortex.png",
                        "monster/nonliving/fire_vortex_new.png",
                        "monster/animals/fire_crab.png"],
        "SPECIALIST":  ["monster/demons/balrug_new.png",
                        "monster/demons/balrug.png"],
        "WAR_MACHINE": ["monster/dragons/dragon.png",
                        "monster/dragons/fire_dragon.png",
                        "monster/dragons/dragon_new.png"],
    },

    # ── Iron Dominion ── steampunk / clockwork / aether-powered ───────────────
    "iron_dominion": {
        "INFANTRY":    ["monster/nonliving/iron_golem.png",
                        "monster/nonliving/iron_golem_new.png"],
        "CAVALRY":     ["monster/nonliving/clockwork_bee.png",      # mechanical insect
                        "monster/nonliving/clockwork_bee_inert.png",
                        "monster/nonliving/metal_gargoyle.png"],
        "SUPPORT":     ["monster/nonliving/walking_alembic.png",    # steampunk apparatus
                        "monster/nonliving/clay_golem.png"],
        "SCOUT":       ["monster/nonliving/metal_gargoyle.png",
                        "monster/nonliving/gargoyle.png"],
        "ARTILLERY":   ["monster/nonliving/crystal_guardian.png",
                        "monster/nonliving/battlesphere.png"],
        "SPECIALIST":  ["monster/nonliving/iron_elemental.png",
                        "monster/nonliving/electric_golem.png"],
        "WAR_MACHINE": ["monster/humanoids/ironbound_thunderhulk.png",  # massive mech
                        "monster/nonliving/stone_golem.png"],
    },

    # ── Nightfang Dominion ── vampiric / undead / plague / gothic ─────────────
    "nightfang": {
        "INFANTRY":    ["monster/undead/ghoul.png",
                        "monster/undead/necrophage.png"],
        "CAVALRY":     ["monster/undead/vampire_knight_new.png",
                        "monster/undead/vampire_knight.png"],
        "SUPPORT":     ["monster/undead/lich.png",
                        "monster/undead/ancient_lich.png"],
        "SCOUT":       ["monster/undead/shadow_new.png",
                        "monster/undead/shadow.png",
                        "monster/undead/wraith.png"],
        "ARTILLERY":   ["monster/undead/curse_skull.png",
                        "monster/undead/revenant.png"],
        "SPECIALIST":  ["monster/undead/vampire_new.png",
                        "monster/undead/vampire.png",
                        "monster/undead/vampire_mage.png"],
        "WAR_MACHINE": ["monster/undead/bone_dragon_new.png",
                        "monster/undead/bone_dragon.png"],
    },

    # ── Thornweft Matriarchy ── spider / silk / organic / nature ──────────────
    "thornweft": {
        "INFANTRY":    ["monster/animals/spider.png"],
        "CAVALRY":     ["monster/animals/wolf_spider_new.png",
                        "monster/animals/wolf_spider.png"],
        "SUPPORT":     ["monster/animals/orb_spider.png",
                        "monster/animals/orb_spider_new.png"],
        "SCOUT":       ["monster/animals/jumping_spider_new.png",
                        "monster/animals/jumping_spider.png"],
        "ARTILLERY":   ["monster/animals/tarantella.png",          # silk spinner
                        "monster/animals/tarantella_new.png",
                        "monster/animals/redback_new.png"],
        "SPECIALIST":  ["monster/fungi_plants/thorn_hunter.png",
                        "monster/aberrations/ugly_thing.png"],     # organic construct
        "WAR_MACHINE": ["monster/animals/emperor_scorpion.png",
                        "monster/animals/emperor_scorpion_new.png"],
    },

    # ── Veilbound Shogunate ── East Asian / samurai / ninja / mystical ─────────
    # Note: previously used holy/angel tiles — replaced with Japanese-themed tiles
    "veilbound": {
        "INFANTRY":    ["monster/humanoids/oni.png",               # Japanese demon warrior
                        "monster/humanoids/oni_new.png",
                        "monster/holy/paladin.png"],               # fallback
        "CAVALRY":     ["monster/dragons/swamp_dragon.png",        # serpentine Eastern dragon mount
                        "monster/dragons/swamp_dragon_new.png",
                        "monster/holy/centaur_paladin.png"],
        "SUPPORT":     ["monster/demons/rakshasa.png",             # Hindu/Buddhist demon, mystical
                        "monster/demons/rakshasa_new.png",
                        "monster/holy/angel_new.png"],
        "SCOUT":       ["monster/demons/nekomata.png",             # Japanese cat-spirit, ninja-like
                        "monster/demons/nekomata_new.png",
                        "monster/holy/cherub.png"],
        "ARTILLERY":   ["monster/nonliving/lightning_spire.png",   # mystical ranged
                        "monster/nonliving/lightning_spire_new.png",
                        "monster/holy/ophan.png"],
        "SPECIALIST":  ["monster/humanoids/oni_incarcerator.png",  # armored oni variant
                        "monster/demons/rakshasa.png",
                        "monster/holy/apis.png"],
        "WAR_MACHINE": ["monster/holy/eastern_dragon.png",         # Eastern dragon — perfect fit
                        "monster/dragons/swamp_dragon.png"],
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


def resolve_path(candidates) -> Path | None:
    """Return the first existing path from a list of candidates (or single string)."""
    if isinstance(candidates, str):
        candidates = [candidates]
    for rel in candidates:
        p = DCSS / rel
        if p.exists():
            return p
    return None


def main():
    if not DCSS.exists():
        print(f"ERROR: DCSS tile pack not found at {DCSS}")
        print("Download from:")
        print("  https://opengameart.org/content/dungeon-crawl-32x32-tiles")
        print("  https://opengameart.org/content/dungeon-crawl-32x32-tiles-supplemental")
        print("Extract both zips into: imagese/dcss/Dungeon Crawl Stone Soup Full/")
        exit(1)

    os.makedirs(OUT, exist_ok=True)
    total = 0
    missing = 0

    for faction, type_map in SPRITE_MAP.items():
        faction_dir = OUT / faction
        os.makedirs(faction_dir, exist_ok=True)

        for unit_type, candidates in type_map.items():
            src_path = resolve_path(candidates)
            if src_path is None:
                tried = candidates if isinstance(candidates, list) else [candidates]
                print(f"  WARNING: No tile found for {faction}/{unit_type}  (tried: {tried})")
                missing += 1
                continue

            # Save the combined map sprite
            out_name = f"{unit_type.lower()}.png"
            out_path = faction_dir / out_name
            sprite = create_map_sprite(src_path, faction)
            sprite.save(out_path, "PNG")
            print(f"  {faction}/{unit_type} → {src_path.name}")

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
