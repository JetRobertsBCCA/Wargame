"""
Compress all PNG images to WebP (quality 85) in Wargame/data/factions/Images
and all subfolders. Removes original PNGs after successful conversion.

Usage:
    python compress_images.py
    python compress_images.py --quality 90
    python compress_images.py --dry-run
"""

import os
import argparse
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow is required. Install it with: pip install Pillow")
    raise SystemExit(1)

ROOT = Path(__file__).parent / "Wargame" / "data" / "factions" / "Images"


def compress_images(quality: int = 85, dry_run: bool = False):
    if not ROOT.exists():
        print(f"ERROR: Directory not found: {ROOT}")
        raise SystemExit(1)

    pngs = sorted(ROOT.rglob("*.png"))
    if not pngs:
        print("No PNG files found.")
        return

    print(f"Found {len(pngs)} PNG(s) in {ROOT}")
    print(f"Converting to WebP at quality {quality}{' (DRY RUN)' if dry_run else ''}\n")
    print(f"{'File':<45} {'Before':>9}  →  {'After':>9}  {'Saved':>7}")
    print("-" * 80)

    total_before = 0
    total_after = 0
    errors = []

    for png_path in pngs:
        rel = png_path.relative_to(ROOT)
        orig_size = png_path.stat().st_size
        total_before += orig_size

        webp_path = png_path.with_suffix(".webp")

        if dry_run:
            print(f"{str(rel):<45} {orig_size / 1024:>8.0f}K  →  {'(skip)':>9}       ")
            continue

        try:
            img = Image.open(png_path)
            img.save(webp_path, "WEBP", quality=quality, method=6)
            new_size = webp_path.stat().st_size
            total_after += new_size
            reduction = (1 - new_size / orig_size) * 100

            png_path.unlink()

            print(f"{str(rel):<45} {orig_size / 1024:>8.0f}K  →  {new_size / 1024:>8.0f}K  {reduction:>6.1f}%")
        except Exception as e:
            errors.append((rel, str(e)))
            print(f"{str(rel):<45} ERROR: {e}")

    print("-" * 80)

    if not dry_run and total_before > 0:
        total_reduction = (1 - total_after / total_before) * 100
        print(
            f"{'TOTAL':<45} {total_before / 1024 / 1024:>7.2f}MB  →  "
            f"{total_after / 1024 / 1024:>7.2f}MB  {total_reduction:>6.1f}%"
        )

    if errors:
        print(f"\n{len(errors)} file(s) failed:")
        for rel, msg in errors:
            print(f"  {rel}: {msg}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Compress PNGs to WebP")
    parser.add_argument("--quality", type=int, default=85, help="WebP quality (default: 85)")
    parser.add_argument("--dry-run", action="store_true", help="List files without converting")
    args = parser.parse_args()
    compress_images(quality=args.quality, dry_run=args.dry_run)
