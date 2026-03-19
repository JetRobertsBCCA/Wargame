"""
Download missing skill icons from game-icons.net and apply faction-colored backgrounds.
Icons are white-on-black grayscale PNGs from game-icons.net, resized to 64x64
with faction-appropriate background colors to match the existing icon style.
"""
import urllib.request
import io
import os
from PIL import Image

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "imagese", "icon")

# Background colors per faction (dark, saturated to match existing style)
COLORS = {
    "general":    (61,  43,  0),   # dark amber
    "fire":       (122, 21,  0),   # dark red-orange (Emberclaw)
    "mechanical": (26,  39,  68),  # dark blue-gray (Iron Dominion)
    "undead":     (74,  0,   0),   # dark crimson (Nightfang)
    "nature":     (13,  51,  0),   # dark green (Thornweft)
    "spirit":     (13,  13,  68),  # dark indigo (Veilbound)
}

# Map: output filename (no .png) -> (game-icons.net path, faction color key)
ICONS = {
    # General
    "rally":             ("lorc/rally-the-troops",     "general"),
    "overwatch":         ("delapouite/eye-target",      "general"),

    # Emberclaw - fire
    "flame_burst":       ("lorc/fire-bomb",             "fire"),
    "stoke_flames":      ("delapouite/bellows",         "fire"),
    "inferno_charge":    ("lorc/dragon-breath",         "fire"),
    "heat_vent":         ("lorc/heat-haze",             "fire"),
    "pyroclasm":         ("lorc/eruption",              "fire"),

    # Iron Dominion - mechanical
    "shield_wall":       ("delapouite/roman-shield",   "mechanical"),
    "fragment_overload": ("lorc/cogsplosion",          "mechanical"),
    "coordinated_fire":  ("lorc/crosshair-arrow",      "mechanical"),
    "repair":            ("lorc/auto-repair",           "mechanical"),
    "artillery_barrage": ("lorc/cannon-shot",          "mechanical"),

    # Nightfang - undead/blood
    "corrupt_bite":      ("lorc/snake-bite",            "undead"),
    "blood_tithe":       ("lorc/sacrificial-dagger",    "undead"),
    "shadow_step":       ("lorc/spectre",               "undead"),
    "feast":             ("lorc/fanged-skull",          "undead"),
    "terror_shriek":     ("lorc/screaming",             "undead"),

    # Thornweft - nature/spider
    "web_snare":         ("lorc/spider-web",            "nature"),
    "fate_weave":        ("caro-asercion/spinning-wheel", "nature"),
    "gossamer_trap":     ("lorc/cobweb",                "nature"),
    "anchor_pulse":      ("lorc/anchor",                "nature"),
    "natures_wrath":     ("lorc/tornado",               "nature"),

    # Veilbound - spirit/samurai
    "stance_strike":     ("delapouite/katana",          "spirit"),
    "ritual_channel":    ("lorc/glowing-hands",         "spirit"),
    "phase_strike":      ("lorc/teleport",              "spirit"),
    "veil_walk":         ("delapouite/invisible",       "spirit"),
    "honor_guard":       ("lorc/spartan",               "spirit"),
}

BASE_URL = "https://game-icons.net/icons/ffffff/000000/1x1/{path}.png"
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; icon-downloader)"}


def download_icon(path: str, bg_color: tuple, out_path: str) -> bool:
    url = BASE_URL.format(path=path)
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        data = urllib.request.urlopen(req, timeout=15).read()
    except Exception as e:
        print(f"  FAILED to download {url}: {e}")
        return False

    img = Image.open(io.BytesIO(data)).convert("L")  # grayscale

    # Build RGBA: icon pixels (bright) become white, background (dark) becomes bg_color
    rgba = Image.new("RGBA", img.size)
    pixels = img.load()
    rgba_pixels = rgba.load()

    br, bg, bb = bg_color
    for y in range(img.height):
        for x in range(img.width):
            v = pixels[x, y]  # 0=black bg, 255=white icon
            # Blend: dark pixels -> bg_color, bright pixels -> white icon
            t = v / 255.0
            r = int(br + (255 - br) * t)
            g = int(bg + (255 - bg) * t)
            b = int(bb + (255 - bb) * t)
            rgba_pixels[x, y] = (r, g, b, 255)

    rgba = rgba.resize((64, 64), Image.LANCZOS)
    rgba.save(out_path, "PNG")
    return True


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    success = 0
    failed = []

    for name, (path, color_key) in ICONS.items():
        out_path = os.path.join(OUTPUT_DIR, f"{name}.png")
        if os.path.exists(out_path):
            print(f"  SKIP {name}.png (already exists)")
            success += 1
            continue

        bg = COLORS[color_key]
        print(f"  Downloading {name}.png ({color_key}) ...", end=" ", flush=True)
        if download_icon(path, bg, out_path):
            print("OK")
            success += 1
        else:
            failed.append(name)

    print(f"\nDone: {success}/{len(ICONS)} icons saved.")
    if failed:
        print(f"Failed: {failed}")


if __name__ == "__main__":
    main()
