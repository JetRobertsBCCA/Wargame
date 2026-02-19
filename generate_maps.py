#!/usr/bin/env python3
"""
Shardborne: Battle Map Image Generator
=======================================
Generates themed battle map images for use as TTS board surfaces.
Uses Pillow to create procedural terrain maps with grid overlays.

Output:
    data/factions/Images/Maps/*.png
"""

import os
import random
import math
from PIL import Image, ImageDraw, ImageFilter

# Map size in pixels (high-res for TTS)
MAP_W, MAP_H = 2048, 2048

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                          "data", "factions", "Images", "Maps")

# ─── Color Utilities ────────────────────────────────────────────────────────────

def lerp_color(c1, c2, t):
    """Linear interpolate between two RGB tuples."""
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))

def add_noise(color, amount=15):
    """Add random noise to a color."""
    return tuple(max(0, min(255, c + random.randint(-amount, amount))) for c in color)

def darken(color, factor=0.7):
    return tuple(int(c * factor) for c in color)

def lighten(color, factor=1.3):
    return tuple(min(255, int(c * factor)) for c in color)


# ─── Noise Generators ───────────────────────────────────────────────────────────

def value_noise_2d(width, height, scale=64):
    """Generate simple value noise for terrain variation."""
    # Create low-res noise and upscale
    small_w = max(2, width // scale)
    small_h = max(2, height // scale)
    
    noise = [[random.random() for _ in range(small_w + 1)] for _ in range(small_h + 1)]
    
    result = [[0.0] * width for _ in range(height)]
    
    for y in range(height):
        for x in range(width):
            fx = (x / width) * small_w
            fy = (y / height) * small_h
            
            ix = int(fx)
            iy = int(fy)
            tx = fx - ix
            ty = fy - iy
            
            ix = min(ix, small_w - 1)
            iy = min(iy, small_h - 1)
            
            # Bilinear interpolation
            v00 = noise[iy][ix]
            v10 = noise[iy][ix + 1]
            v01 = noise[iy + 1][ix]
            v11 = noise[iy + 1][ix + 1]
            
            v0 = v00 + (v10 - v00) * tx
            v1 = v01 + (v11 - v01) * tx
            
            result[y][x] = v0 + (v1 - v0) * ty
    
    return result


def multi_octave_noise(width, height, octaves=4):
    """Combine multiple noise octaves for more natural-looking terrain."""
    result = [[0.0] * width for _ in range(height)]
    amplitude = 1.0
    total_amp = 0.0
    
    for octave in range(octaves):
        scale = 32 * (2 ** octave)
        n = value_noise_2d(width, height, max(4, MAP_W // scale))
        
        for y in range(height):
            for x in range(width):
                result[y][x] += n[y][x] * amplitude
        
        total_amp += amplitude
        amplitude *= 0.5
    
    # Normalize
    for y in range(height):
        for x in range(width):
            result[y][x] /= total_amp
    
    return result


# ─── Grid Overlay ────────────────────────────────────────────────────────────────

def draw_grid(draw, width, height, grid_size_px, color=(255, 255, 255, 30)):
    """Draw a subtle grid overlay. grid_size_px = pixels per inch."""
    for x in range(0, width, grid_size_px):
        draw.line([(x, 0), (x, height)], fill=color, width=1)
    for y in range(0, height, grid_size_px):
        draw.line([(0, y), (width, y)], fill=color, width=1)


def draw_deployment_zones(draw, width, height, zone_depth_px, color1=(50, 80, 200, 40), color2=(200, 50, 50, 40)):
    """Draw deployment zone indicators at top and bottom."""
    # Player 1 (bottom)
    for y in range(height - zone_depth_px, height):
        alpha = int(40 * (1 - (height - y) / zone_depth_px))
        draw.line([(0, y), (width, y)], fill=(*color1[:3], alpha), width=1)
    
    # Player 2 (top)
    for y in range(0, zone_depth_px):
        alpha = int(40 * (1 - y / zone_depth_px))
        draw.line([(0, y), (width, y)], fill=(*color2[:3], alpha), width=1)


def draw_center_mark(draw, width, height):
    """Draw a subtle center mark on the map."""
    cx, cy = width // 2, height // 2
    size = 20
    color = (255, 255, 255, 50)
    draw.line([(cx - size, cy), (cx + size, cy)], fill=color, width=2)
    draw.line([(cx, cy - size), (cx, cy + size)], fill=color, width=2)


# ─── Map Generators ─────────────────────────────────────────────────────────────

def generate_volcanic_wastes():
    """Emberclaw theme: lava flows, scorched earth, volcanic rock."""
    print("  Generating Volcanic Wastes...")
    img = Image.new("RGBA", (MAP_W, MAP_H))
    pixels = img.load()
    
    noise1 = multi_octave_noise(MAP_W, MAP_H, 4)
    noise2 = value_noise_2d(MAP_W, MAP_H, 128)
    
    base_dark = (45, 30, 25)      # Dark volcanic rock
    base_mid = (80, 50, 35)       # Brown scorched earth
    base_light = (120, 70, 40)    # Lighter rock
    lava_glow = (220, 80, 20)     # Lava orange
    lava_hot = (255, 160, 40)     # Bright lava
    ash = (55, 50, 48)            # Ash gray
    
    for y in range(MAP_H):
        for x in range(MAP_W):
            n = noise1[y][x]
            n2 = noise2[y][x]
            
            if n < 0.3:
                # Dark volcanic rock
                color = lerp_color(base_dark, ash, n / 0.3)
            elif n < 0.55:
                # Scorched earth
                t = (n - 0.3) / 0.25
                color = lerp_color(ash, base_mid, t)
            elif n < 0.72:
                # Lighter terrain
                t = (n - 0.55) / 0.17
                color = lerp_color(base_mid, base_light, t)
            elif n < 0.82:
                # Lava cracks
                t = (n - 0.72) / 0.1
                color = lerp_color(base_light, lava_glow, t * n2)
            else:
                # Hot lava pools
                t = (n - 0.82) / 0.18
                color = lerp_color(lava_glow, lava_hot, t)
            
            color = add_noise(color, 8)
            pixels[x, y] = (*color, 255)
    
    # Blur slightly for smoother look
    img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
    
    # Overlay
    overlay = Image.new("RGBA", (MAP_W, MAP_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    px_per_inch = MAP_W // 48
    draw_grid(draw, MAP_W, MAP_H, px_per_inch, (255, 100, 50, 20))
    draw_deployment_zones(draw, MAP_W, MAP_H, px_per_inch * 8)
    draw_center_mark(draw, MAP_W, MAP_H)
    
    img = Image.alpha_composite(img, overlay)
    return img


def generate_dark_forest():
    """Thornweft theme: dense canopy, undergrowth, clearings."""
    print("  Generating Dark Forest...")
    img = Image.new("RGBA", (MAP_W, MAP_H))
    pixels = img.load()
    
    noise1 = multi_octave_noise(MAP_W, MAP_H, 4)
    noise2 = value_noise_2d(MAP_W, MAP_H, 64)
    
    deep_green = (20, 45, 18)
    forest_green = (35, 70, 28)
    moss = (50, 85, 35)
    clearing = (65, 95, 45)
    dirt_path = (75, 60, 40)
    dark_undergrowth = (15, 30, 12)
    
    for y in range(MAP_H):
        for x in range(MAP_W):
            n = noise1[y][x]
            n2 = noise2[y][x]
            
            if n < 0.25:
                color = lerp_color(dark_undergrowth, deep_green, n / 0.25)
            elif n < 0.45:
                t = (n - 0.25) / 0.2
                color = lerp_color(deep_green, forest_green, t)
            elif n < 0.65:
                t = (n - 0.45) / 0.2
                color = lerp_color(forest_green, moss, t)
            elif n < 0.8:
                t = (n - 0.65) / 0.15
                if n2 > 0.6:
                    color = lerp_color(moss, dirt_path, t)
                else:
                    color = lerp_color(moss, clearing, t)
            else:
                t = (n - 0.8) / 0.2
                color = lerp_color(clearing, dirt_path, t * 0.5)
            
            color = add_noise(color, 6)
            pixels[x, y] = (*color, 255)
    
    img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
    
    overlay = Image.new("RGBA", (MAP_W, MAP_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    px_per_inch = MAP_W // 48
    draw_grid(draw, MAP_W, MAP_H, px_per_inch, (100, 255, 100, 18))
    draw_deployment_zones(draw, MAP_W, MAP_H, px_per_inch * 8)
    draw_center_mark(draw, MAP_W, MAP_H)
    
    img = Image.alpha_composite(img, overlay)
    return img


def generate_iron_fortress():
    """Iron Dominion theme: industrial, metal plating, gears."""
    print("  Generating Iron Fortress...")
    img = Image.new("RGBA", (MAP_W, MAP_H))
    pixels = img.load()
    
    noise1 = multi_octave_noise(MAP_W, MAP_H, 4)
    noise2 = value_noise_2d(MAP_W, MAP_H, 32)
    
    dark_metal = (50, 50, 55)
    steel = (100, 100, 110)
    light_steel = (140, 140, 150)
    rust = (120, 70, 45)
    dark_grate = (35, 35, 40)
    rivet = (160, 160, 170)
    
    for y in range(MAP_H):
        for x in range(MAP_W):
            n = noise1[y][x]
            n2 = noise2[y][x]
            
            # Create plate-like patterns
            plate_x = (x % (MAP_W // 6)) / (MAP_W // 6)
            plate_y = (y % (MAP_H // 6)) / (MAP_H // 6)
            edge = min(plate_x, 1 - plate_x, plate_y, 1 - plate_y)
            
            if edge < 0.03:
                # Seams between plates
                color = dark_grate
            elif n < 0.3:
                color = lerp_color(dark_metal, dark_grate, n / 0.3)
            elif n < 0.5:
                t = (n - 0.3) / 0.2
                color = lerp_color(dark_metal, steel, t)
            elif n < 0.7:
                t = (n - 0.5) / 0.2
                if n2 > 0.7:
                    color = lerp_color(steel, rust, t)
                else:
                    color = lerp_color(steel, light_steel, t)
            else:
                t = (n - 0.7) / 0.3
                color = lerp_color(light_steel, rivet, t * 0.3)
            
            color = add_noise(color, 5)
            pixels[x, y] = (*color, 255)
    
    img = img.filter(ImageFilter.GaussianBlur(radius=1))
    
    overlay = Image.new("RGBA", (MAP_W, MAP_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    px_per_inch = MAP_W // 48
    draw_grid(draw, MAP_W, MAP_H, px_per_inch, (200, 200, 220, 22))
    draw_deployment_zones(draw, MAP_W, MAP_H, px_per_inch * 8)
    draw_center_mark(draw, MAP_W, MAP_H)
    
    img = Image.alpha_composite(img, overlay)
    return img


def generate_shadow_ruins():
    """Nightfang theme: purple moonlight, ancient ruins, shadows."""
    print("  Generating Shadow Ruins...")
    img = Image.new("RGBA", (MAP_W, MAP_H))
    pixels = img.load()
    
    noise1 = multi_octave_noise(MAP_W, MAP_H, 4)
    noise2 = value_noise_2d(MAP_W, MAP_H, 96)
    
    deep_shadow = (18, 12, 30)
    dark_purple = (40, 25, 55)
    stone = (65, 55, 70)
    moonlit = (90, 80, 110)
    ruin_stone = (75, 70, 65)
    glow = (120, 60, 160)
    
    for y in range(MAP_H):
        for x in range(MAP_W):
            n = noise1[y][x]
            n2 = noise2[y][x]
            
            # Radial moonlight effect from center
            cx, cy = MAP_W // 2, MAP_H // 2
            dist = math.sqrt((x - cx)**2 + (y - cy)**2) / (MAP_W // 2)
            moonlight = max(0, 1.0 - dist * 0.6)
            
            if n < 0.3:
                color = lerp_color(deep_shadow, dark_purple, n / 0.3)
            elif n < 0.5:
                t = (n - 0.3) / 0.2
                color = lerp_color(dark_purple, stone, t)
            elif n < 0.7:
                t = (n - 0.5) / 0.2
                if n2 > 0.5:
                    color = lerp_color(stone, ruin_stone, t)
                else:
                    color = lerp_color(stone, moonlit, t * moonlight)
            elif n < 0.85:
                t = (n - 0.7) / 0.15
                color = lerp_color(moonlit, glow, t * 0.3 * moonlight)
            else:
                color = lerp_color(moonlit, glow, 0.4 * moonlight)
            
            color = add_noise(color, 6)
            pixels[x, y] = (*color, 255)
    
    img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
    
    overlay = Image.new("RGBA", (MAP_W, MAP_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    px_per_inch = MAP_W // 48
    draw_grid(draw, MAP_W, MAP_H, px_per_inch, (150, 100, 200, 20))
    draw_deployment_zones(draw, MAP_W, MAP_H, px_per_inch * 8)
    draw_center_mark(draw, MAP_W, MAP_H)
    
    img = Image.alpha_composite(img, overlay)
    return img


def generate_sacred_grounds():
    """Veilbound theme: temple grounds, zen gardens, red accents."""
    print("  Generating Sacred Grounds...")
    img = Image.new("RGBA", (MAP_W, MAP_H))
    pixels = img.load()
    
    noise1 = multi_octave_noise(MAP_W, MAP_H, 4)
    noise2 = value_noise_2d(MAP_W, MAP_H, 80)
    
    dark_wood = (50, 35, 25)
    sand = (160, 140, 110)
    light_sand = (190, 170, 130)
    stone_path = (90, 80, 70)
    red_accent = (160, 40, 40)
    moss_green = (50, 70, 40)
    
    for y in range(MAP_H):
        for x in range(MAP_W):
            n = noise1[y][x]
            n2 = noise2[y][x]
            
            if n < 0.2:
                color = lerp_color(dark_wood, stone_path, n / 0.2)
            elif n < 0.4:
                t = (n - 0.2) / 0.2
                color = lerp_color(stone_path, sand, t)
            elif n < 0.65:
                t = (n - 0.4) / 0.25
                color = lerp_color(sand, light_sand, t)
            elif n < 0.8:
                t = (n - 0.65) / 0.15
                if n2 > 0.65:
                    color = lerp_color(light_sand, moss_green, t * 0.5)
                else:
                    color = lerp_color(light_sand, sand, t)
            else:
                t = (n - 0.8) / 0.2
                if n2 > 0.8:
                    color = lerp_color(sand, red_accent, t * 0.3)
                else:
                    color = lerp_color(sand, stone_path, t * 0.4)
            
            color = add_noise(color, 5)
            pixels[x, y] = (*color, 255)
    
    img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
    
    overlay = Image.new("RGBA", (MAP_W, MAP_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    px_per_inch = MAP_W // 48
    draw_grid(draw, MAP_W, MAP_H, px_per_inch, (200, 50, 50, 18))
    draw_deployment_zones(draw, MAP_W, MAP_H, px_per_inch * 8)
    draw_center_mark(draw, MAP_W, MAP_H)
    
    img = Image.alpha_composite(img, overlay)
    return img


def generate_open_plains():
    """Neutral map: open grasslands with gentle hills."""
    print("  Generating Open Plains...")
    img = Image.new("RGBA", (MAP_W, MAP_H))
    pixels = img.load()
    
    noise1 = multi_octave_noise(MAP_W, MAP_H, 4)
    noise2 = value_noise_2d(MAP_W, MAP_H, 96)
    
    dark_grass = (55, 75, 35)
    grass = (75, 100, 45)
    light_grass = (100, 125, 55)
    dry_grass = (130, 120, 70)
    dirt = (100, 85, 60)
    wild_flowers = (90, 110, 50)
    
    for y in range(MAP_H):
        for x in range(MAP_W):
            n = noise1[y][x]
            n2 = noise2[y][x]
            
            if n < 0.25:
                color = lerp_color(dark_grass, grass, n / 0.25)
            elif n < 0.45:
                t = (n - 0.25) / 0.2
                color = lerp_color(grass, light_grass, t)
            elif n < 0.6:
                t = (n - 0.45) / 0.15
                color = lerp_color(light_grass, wild_flowers, t * n2)
            elif n < 0.75:
                t = (n - 0.6) / 0.15
                color = lerp_color(light_grass, dry_grass, t)
            else:
                t = (n - 0.75) / 0.25
                if n2 > 0.6:
                    color = lerp_color(dry_grass, dirt, t)
                else:
                    color = lerp_color(dry_grass, light_grass, t * 0.3)
            
            color = add_noise(color, 6)
            pixels[x, y] = (*color, 255)
    
    img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
    
    overlay = Image.new("RGBA", (MAP_W, MAP_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    px_per_inch = MAP_W // 48
    draw_grid(draw, MAP_W, MAP_H, px_per_inch, (255, 255, 255, 18))
    draw_deployment_zones(draw, MAP_W, MAP_H, px_per_inch * 8)
    draw_center_mark(draw, MAP_W, MAP_H)
    
    img = Image.alpha_composite(img, overlay)
    return img


# ─── Template Generators ────────────────────────────────────────────────────────

def generate_blast_template(radius_inches, color=(255, 50, 50, 100)):
    """Generate a circular blast template image."""
    # Image size proportional to radius (64px per inch)
    px_per_inch = 64
    size = int(radius_inches * px_per_inch * 2)
    size = max(size, 64)
    
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Outer circle (fill)
    draw.ellipse([2, 2, size - 3, size - 3], fill=color)
    # Edge ring
    edge_color = (color[0], color[1], color[2], min(255, color[3] + 80))
    draw.ellipse([2, 2, size - 3, size - 3], outline=edge_color, width=3)
    # Center dot
    cx, cy = size // 2, size // 2
    draw.ellipse([cx - 4, cy - 4, cx + 4, cy + 4], fill=(255, 255, 255, 200))
    
    return img


def generate_cone_template(length_inches, angle_degrees=45, color=(255, 150, 50, 100)):
    """Generate a cone (breath weapon) template image."""
    px_per_inch = 64
    size = int(length_inches * px_per_inch * 2)
    size = max(size, 128)
    
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Cone from bottom-center pointing up
    cx = size // 2
    cy = size  # Start from bottom
    length_px = int(length_inches * px_per_inch)
    
    half_angle = math.radians(angle_degrees / 2)
    
    # Calculate cone triangle points
    tip = (cx, cy - 10)  # Origin point
    left = (cx - int(math.sin(half_angle) * length_px), 
            cy - 10 - int(math.cos(half_angle) * length_px))
    right = (cx + int(math.sin(half_angle) * length_px),
             cy - 10 - int(math.cos(half_angle) * length_px))
    
    # Draw filled cone
    draw.polygon([tip, left, right], fill=color)
    edge_color = (color[0], color[1], color[2], min(255, color[3] + 80))
    draw.polygon([tip, left, right], outline=edge_color)
    
    # Origin marker
    draw.ellipse([cx - 5, cy - 15, cx + 5, cy - 5], fill=(255, 255, 255, 200))
    
    return img


# ─── Range Ring Generator ───────────────────────────────────────────────────────

def generate_range_ring(radius_inches, color=(100, 200, 255, 60)):
    """Generate a range indicator ring image."""
    px_per_inch = 64
    size = int(radius_inches * px_per_inch * 2) + 20
    size = max(size, 64)
    
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Ring (transparent center, colored edge)
    ring_color = (color[0], color[1], color[2], min(255, color[3] + 60))
    r = size // 2 - 5
    cx, cy = size // 2, size // 2
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=ring_color, width=4)
    
    # Subtle fill
    draw.ellipse([cx - r + 4, cy - r + 4, cx + r - 4, cy + r - 4], fill=color)
    
    return img


# ─── Main ────────────────────────────────────────────────────────────────────────

def main():
    print("╔══════════════════════════════════════════╗")
    print("║  Shardborne Battle Map Generator         ║")
    print("╚══════════════════════════════════════════╝\n")
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Generate battlefield maps
    maps = {
        "VolcanicWastes": generate_volcanic_wastes,
        "DarkForest": generate_dark_forest,
        "IronFortress": generate_iron_fortress,
        "ShadowRuins": generate_shadow_ruins,
        "SacredGrounds": generate_sacred_grounds,
        "OpenPlains": generate_open_plains,
    }
    
    for name, generator in maps.items():
        img = generator()
        path = os.path.join(OUTPUT_DIR, f"{name}.png")
        img = img.convert("RGB")  # Remove alpha for smaller file
        img.save(path, "PNG", optimize=True)
        file_size = os.path.getsize(path) / 1024
        print(f"    ✓ {name}.png ({file_size:.0f} KB)")
    
    # Generate blast templates
    templates_dir = os.path.join(OUTPUT_DIR, "Templates")
    os.makedirs(templates_dir, exist_ok=True)
    
    print("\n  Generating templates...")
    
    blast_sizes = [
        (3, "Blast3", (255, 50, 50, 80)),
        (6, "Blast6", (255, 100, 30, 80)),
    ]
    for radius, bname, bcolor in blast_sizes:
        img = generate_blast_template(radius, bcolor)
        path = os.path.join(templates_dir, f"{bname}.png")
        img.save(path, "PNG")
        print(f"    ✓ {bname}.png ({os.path.getsize(path) / 1024:.0f} KB)")
    
    cone_sizes = [
        (6, "Cone6", (255, 150, 50, 80)),
        (8, "Cone8", (255, 100, 30, 80)),
        (10, "Cone10", (255, 80, 20, 80)),
    ]
    for length, cname, ccolor in cone_sizes:
        img = generate_cone_template(length, 45, ccolor)
        path = os.path.join(templates_dir, f"{cname}.png")
        img.save(path, "PNG")
        print(f"    ✓ {cname}.png ({os.path.getsize(path) / 1024:.0f} KB)")
    
    range_sizes = [
        (1, "Range1", (255, 255, 100, 40)),
        (3, "Range3", (100, 255, 100, 40)),
        (6, "Range6", (100, 200, 255, 40)),
        (8, "Range8", (100, 150, 255, 40)),
        (10, "Range10", (200, 100, 255, 40)),
    ]
    for radius, rname, rcolor in range_sizes:
        img = generate_range_ring(radius, rcolor)
        path = os.path.join(templates_dir, f"{rname}.png")
        img.save(path, "PNG")
        print(f"    ✓ {rname}.png ({os.path.getsize(path) / 1024:.0f} KB)")
    
    print(f"\n✅ All maps and templates generated in: {OUTPUT_DIR}")
    print(f"   Don't forget to push these to GitHub so TTS can access them!")


if __name__ == "__main__":
    main()
