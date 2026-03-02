extends Node
## SpriteGenerator — Loads portrait images for units that have them,
## falls back to procedural placeholder sprites for the rest.

# ── Faction Colors ─────────────────────────────────────
const FACTION_COLORS = {
	CombatantDefinition.Faction.EMBERCLAW:      Color(0.85, 0.25, 0.10),  # Fiery red-orange
	CombatantDefinition.Faction.IRON_DOMINION:  Color(0.45, 0.52, 0.60),  # Steel blue-gray
	CombatantDefinition.Faction.NIGHTFANG:      Color(0.50, 0.12, 0.60),  # Dark violet
	CombatantDefinition.Faction.THORNWEFT:      Color(0.18, 0.62, 0.18),  # Forest green
	CombatantDefinition.Faction.VEILBOUND:      Color(0.15, 0.45, 0.80),  # Deep blue
}

const FACTION_ACCENT = {
	CombatantDefinition.Faction.EMBERCLAW:      Color(1.0, 0.75, 0.2),    # Gold/amber
	CombatantDefinition.Faction.IRON_DOMINION:  Color(0.75, 0.80, 0.85),  # Light steel
	CombatantDefinition.Faction.NIGHTFANG:      Color(0.85, 0.15, 0.3),   # Blood red
	CombatantDefinition.Faction.THORNWEFT:      Color(0.6, 0.85, 0.3),    # Bright lime
	CombatantDefinition.Faction.VEILBOUND:      Color(0.6, 0.85, 1.0),    # Light cyan
}

# ── Portrait System ────────────────────────────────────
const PORTRAIT_DIR = "res://imagese/portraits"

const FACTION_DIRS = {
	CombatantDefinition.Faction.EMBERCLAW:      "emberclaw",
	CombatantDefinition.Faction.IRON_DOMINION:  "iron_dominion",
	CombatantDefinition.Faction.NIGHTFANG:      "nightfang",
	CombatantDefinition.Faction.THORNWEFT:      "thornweft",
	CombatantDefinition.Faction.VEILBOUND:      "veilbound",
}

## Name overrides: GDScript unit_name → image filename (without .webp extension).
## Only needed when the in-code name differs from the image filename.
const NAME_OVERRIDES = {
	# Nightfang — Unicode / prefix mismatches
	"Thrallmaster Ghul":       "Thrallmaster Gh\u00fbl",
	"The Crimson Prophet":     "Crimson Prophet",
	# Thornweft — en-dash (U+2011) vs hyphen in image filenames
	"Thread-Cutter Nyx":       "Thread\u2011Cutter Nyx",
	"Silk-Warden Morthis":     "Silk\u2011Warden Morthis",
	"Loom-Mother Silivex":     "Loom\u2011Mother Silivex",
	# Veilbound — abbreviated ranks in code vs full names in images
	"Elite Cmdr Asagiri":      "Elite Commander Asagiri",
	"Elite Cmdr Hoshimaru":    "Elite Commander Hoshimaru",
	"Elite Cmdr Rengoku":      "Elite Commander Rengoku",
	"Elite Cmdr Yukimaru":     "Elite Commander Yukimaru",
	"Ritual Cpt Akikaze":      "Ritual Captain Akikaze",
	"Ritual Cpt Tsukihana":    "Ritual Captain Tsukihana",
	"Cmdr Hisame":             "Commander Hisame",
	"Cmdr Midorikaze":         "Commander Midorikaze",
	"Cmdr Kagero":             "Commander Kagero",
	"Cmdr Tsuyukusa":          "Commander Tsuyukusa",
	"Cmdr Hoshikami":          "Commander Hoshikami",
}

# ── Sprite Cache ───────────────────────────────────────
var _icon_cache: Dictionary = {}       # "unit_name" → ImageTexture (32x32)
var _map_sprite_cache: Dictionary = {} # "unit_name" → ImageTexture (64x32, 2 frames)
var _portrait_cache: Dictionary = {}   # "unit_name" → Image or null

const SPRITE_DIR = "res://imagese/sprites"

## Map UnitType enum → sprite filename stem
const UNIT_TYPE_FILES = {
	CombatantDefinition.UnitType.INFANTRY:    "infantry",
	CombatantDefinition.UnitType.CAVALRY:     "cavalry",
	CombatantDefinition.UnitType.SUPPORT:     "support",
	CombatantDefinition.UnitType.SCOUT:       "scout",
	CombatantDefinition.UnitType.ARTILLERY:   "artillery",
	CombatantDefinition.UnitType.SPECIALIST:  "specialist",
	CombatantDefinition.UnitType.WAR_MACHINE: "war_machine",
}

# ══════════════════════════════════════════════════════════════
# PUBLIC API
# ══════════════════════════════════════════════════════════════

## Get a 32×32 icon texture for the given CombatantDefinition.
## Priority: portrait → DCSS tile → procedural.
func get_icon(def: CombatantDefinition) -> ImageTexture:
	var key = def.unit_name.to_lower()
	if _icon_cache.has(key):
		return _icon_cache[key]

	var tex: ImageTexture = null

	# 1. Try portrait (hi-res webp)
	var portrait: Image = _try_load_portrait(def)
	if portrait != null:
		tex = _icon_from_portrait(portrait, def)

	# 2. Try DCSS tile icon
	if tex == null:
		tex = _try_load_dcss_icon(def)

	# 3. Procedural fallback
	if tex == null:
		tex = _generate_icon(def)

	_icon_cache[key] = tex
	return tex

## Get a 64×32 map sprite (2-frame: alive + dead) for the given CombatantDefinition.
## Priority: portrait → DCSS tile → procedural.
func get_map_sprite(def: CombatantDefinition) -> ImageTexture:
	var key = def.unit_name.to_lower()
	if _map_sprite_cache.has(key):
		return _map_sprite_cache[key]

	var tex: ImageTexture = null

	# 1. Try portrait (hi-res webp)
	var portrait: Image = _try_load_portrait(def)
	if portrait != null:
		tex = _map_sprite_from_portrait(portrait, def)

	# 2. Try DCSS tile map sprite
	if tex == null:
		tex = _try_load_dcss_map_sprite(def)

	# 3. Procedural fallback
	if tex == null:
		tex = _generate_map_sprite(def)

	_map_sprite_cache[key] = tex
	return tex

## Generate and assign sprites to a CombatantDefinition (called during load).
func assign_sprites(def: CombatantDefinition) -> void:
	def.icon = get_icon(def)
	def.map_sprite = get_map_sprite(def)

# ══════════════════════════════════════════════════════════════
# PORTRAIT LOADING
# ══════════════════════════════════════════════════════════════

## Attempt to load a portrait image for this unit. Returns Image or null.
func _try_load_portrait(def: CombatantDefinition) -> Image:
	var key = def.unit_name
	if _portrait_cache.has(key):
		return _portrait_cache[key]

	var faction_dir: String = FACTION_DIRS.get(def.faction, "")
	if faction_dir.is_empty():
		_portrait_cache[key] = null
		return null

	var img_name: String = NAME_OVERRIDES.get(def.unit_name, def.unit_name)
	var path: String = "%s/%s/%s.webp" % [PORTRAIT_DIR, faction_dir, img_name]

	if not FileAccess.file_exists(path):
		_portrait_cache[key] = null
		return null

	var img: Image = Image.load_from_file(path)
	if img == null:
		_portrait_cache[key] = null
		return null

	_portrait_cache[key] = img
	return img

## Create a 32×32 icon from a portrait (center-crop → resize → faction border).
func _icon_from_portrait(portrait: Image, def: CombatantDefinition) -> ImageTexture:
	var cropped: Image = _center_crop_square(portrait)
	cropped.resize(30, 30, Image.INTERPOLATE_LANCZOS)

	var result: Image = Image.create(32, 32, false, Image.FORMAT_RGBA8)
	result.fill(Color.TRANSPARENT)
	result.blit_rect(cropped, Rect2i(0, 0, 30, 30), Vector2i(1, 1))

	var accent: Color = FACTION_ACCENT.get(def.faction, Color.WHITE)
	_draw_rect_outline(result, 0, 0, 32, 32, accent)

	return ImageTexture.create_from_image(result)

## Create a 64×32 map sprite from a portrait (alive | dead frames).
func _map_sprite_from_portrait(portrait: Image, def: CombatantDefinition) -> ImageTexture:
	var img: Image = Image.create(64, 32, false, Image.FORMAT_RGBA8)
	img.fill(Color.TRANSPARENT)

	var accent: Color = FACTION_ACCENT.get(def.faction, Color.WHITE)
	var thumb: Image = _center_crop_square(portrait)
	thumb.resize(28, 28, Image.INTERPOLATE_LANCZOS)

	# ── Frame 0 (alive): portrait with faction border ──
	img.blit_rect(thumb, Rect2i(0, 0, 28, 28), Vector2i(2, 2))
	_draw_rect_outline(img, 0, 0, 32, 32, accent)

	# Ranged indicator (yellow dot in top-right corner)
	if def.rng > 1:
		_draw_circle(img, 27, 5, 3, Color(1, 1, 0.3, 0.8))

	# ── Frame 1 (dead): grayscale portrait with X ──
	var dead_thumb: Image = thumb.duplicate()
	for px in range(dead_thumb.get_width()):
		for py in range(dead_thumb.get_height()):
			var c: Color = dead_thumb.get_pixel(px, py)
			var gray: float = c.r * 0.3 + c.g * 0.59 + c.b * 0.11
			dead_thumb.set_pixel(px, py, Color(gray, gray, gray, c.a * 0.5))
	img.blit_rect(dead_thumb, Rect2i(0, 0, 28, 28), Vector2i(34, 2))

	# X mark across dead frame
	var dark: Color = Color(0.15, 0.15, 0.15, 0.85)
	for i in range(28):
		_safe_pixel(img, 34 + i, 2 + i, dark)
		_safe_pixel(img, 35 + i, 2 + i, dark)
		_safe_pixel(img, 34 + i, 29 - i, dark)
		_safe_pixel(img, 35 + i, 29 - i, dark)
	_draw_rect_outline(img, 32, 0, 32, 32, Color(0.2, 0.2, 0.2, 0.8))

	return ImageTexture.create_from_image(img)

## Center-crop an image to a square.
func _center_crop_square(src: Image) -> Image:
	var w: int = src.get_width()
	var h: int = src.get_height()
	var size: int = mini(w, h)
	var crop_x: int = (w - size) / 2
	var crop_y: int = (h - size) / 2
	return src.get_region(Rect2i(crop_x, crop_y, size, size))

# ══════════════════════════════════════════════════════════════
# DCSS TILE LOADING (fallback for units without portraits)
# ══════════════════════════════════════════════════════════════

## Try to load a pre-generated DCSS 32×32 icon for this unit's faction + type.
func _try_load_dcss_icon(def: CombatantDefinition) -> ImageTexture:
	var type_stem: String = UNIT_TYPE_FILES.get(def.unit_type, "")
	if type_stem.is_empty():
		return null
	var faction_dir: String = FACTION_DIRS.get(def.faction, "")
	if faction_dir.is_empty():
		return null
	var path: String = "%s/%s/icons/%s.png" % [SPRITE_DIR, faction_dir, type_stem]
	if not FileAccess.file_exists(path):
		return null
	var img: Image = Image.load_from_file(path)
	if img == null:
		return null
	return ImageTexture.create_from_image(img)

## Try to load a pre-generated DCSS 64×32 map sprite for this unit's faction + type.
func _try_load_dcss_map_sprite(def: CombatantDefinition) -> ImageTexture:
	var type_stem: String = UNIT_TYPE_FILES.get(def.unit_type, "")
	if type_stem.is_empty():
		return null
	var faction_dir: String = FACTION_DIRS.get(def.faction, "")
	if faction_dir.is_empty():
		return null
	var path: String = "%s/%s/%s.png" % [SPRITE_DIR, faction_dir, type_stem]
	if not FileAccess.file_exists(path):
		return null
	var img: Image = Image.load_from_file(path)
	if img == null:
		return null
	return ImageTexture.create_from_image(img)

# ══════════════════════════════════════════════════════════════
# ICON GENERATION (32×32)
# ══════════════════════════════════════════════════════════════

func _generate_icon(def: CombatantDefinition) -> ImageTexture:
	var img = Image.create(32, 32, false, Image.FORMAT_RGBA8)
	var base_color: Color = FACTION_COLORS.get(def.faction, Color(0.5, 0.5, 0.5))
	var accent: Color = FACTION_ACCENT.get(def.faction, Color.WHITE)

	# Background fill with slight transparency
	var bg = base_color
	bg.a = 0.9
	img.fill(Color.TRANSPARENT)

	# Draw unit type shape
	match def.unit_type:
		CombatantDefinition.UnitType.COMMANDER:
			_draw_diamond(img, 2, 2, 28, 28, base_color)
			_draw_diamond_outline(img, 2, 2, 28, 28, accent)
			_draw_star(img, 16, 16, 6, accent)
		CombatantDefinition.UnitType.INFANTRY:
			_draw_rect_shape(img, 4, 6, 24, 22, base_color)
			_draw_rect_outline(img, 4, 6, 24, 22, accent)
		CombatantDefinition.UnitType.CAVALRY:
			_draw_triangle(img, 16, 3, 28, 28, base_color)
			_draw_triangle_outline(img, 16, 3, 28, 28, accent)
		CombatantDefinition.UnitType.SUPPORT:
			_draw_circle(img, 16, 16, 12, base_color)
			_draw_circle_outline(img, 16, 16, 12, accent)
			_draw_cross(img, 16, 16, 5, Color.WHITE)
		CombatantDefinition.UnitType.SCOUT:
			_draw_diamond(img, 4, 4, 24, 24, base_color)
			_draw_diamond_outline(img, 4, 4, 24, 24, accent)
		CombatantDefinition.UnitType.ARTILLERY:
			_draw_rect_shape(img, 3, 8, 26, 20, base_color)
			_draw_rect_outline(img, 3, 8, 26, 20, accent)
			_draw_rect_shape(img, 12, 4, 8, 8, accent)  # cannon barrel
		CombatantDefinition.UnitType.SPECIALIST:
			_draw_hexagon(img, 16, 16, 12, base_color)
			_draw_hexagon_outline(img, 16, 16, 12, accent)
		CombatantDefinition.UnitType.WAR_MACHINE:
			_draw_rect_shape(img, 2, 4, 28, 24, base_color)
			_draw_rect_outline(img, 2, 4, 28, 24, accent)
			_draw_rect_outline(img, 5, 7, 22, 18, accent)  # double border

	# Border
	_draw_rect_outline(img, 0, 0, 32, 32, accent.darkened(0.3))

	return ImageTexture.create_from_image(img)

# ══════════════════════════════════════════════════════════════
# MAP SPRITE GENERATION (64×32, 2 frames: alive | dead)
# ══════════════════════════════════════════════════════════════

func _generate_map_sprite(def: CombatantDefinition) -> ImageTexture:
	var img = Image.create(64, 32, false, Image.FORMAT_RGBA8)
	var base_color: Color = FACTION_COLORS.get(def.faction, Color(0.5, 0.5, 0.5))
	var accent: Color = FACTION_ACCENT.get(def.faction, Color.WHITE)
	img.fill(Color.TRANSPARENT)

	# Frame 0 (left half): Alive
	_draw_alive_sprite(img, 0, def, base_color, accent)

	# Frame 1 (right half): Dead/destroyed
	_draw_dead_sprite(img, 32, def, base_color, accent)

	return ImageTexture.create_from_image(img)

func _draw_alive_sprite(img: Image, x_offset: int, def: CombatantDefinition, base: Color, accent: Color):
	# Body shape based on unit type
	match def.unit_type:
		CombatantDefinition.UnitType.COMMANDER:
			_draw_circle(img, x_offset + 16, 10, 7, base.lightened(0.2))
			_draw_rect_shape(img, x_offset + 8, 16, 16, 14, base)
			_draw_star(img, x_offset + 16, 10, 4, accent)
		CombatantDefinition.UnitType.INFANTRY:
			_draw_circle(img, x_offset + 16, 9, 6, base.lightened(0.15))
			_draw_rect_shape(img, x_offset + 9, 15, 14, 14, base)
			# Shield indicator
			_draw_rect_shape(img, x_offset + 5, 17, 5, 10, accent.darkened(0.2))
		CombatantDefinition.UnitType.CAVALRY:
			_draw_circle(img, x_offset + 16, 6, 5, base.lightened(0.15))
			_draw_triangle(img, x_offset + 16, 11, 20, 20, base)
			# Mount legs
			_draw_rect_shape(img, x_offset + 8, 26, 3, 5, base.darkened(0.3))
			_draw_rect_shape(img, x_offset + 21, 26, 3, 5, base.darkened(0.3))
		CombatantDefinition.UnitType.SUPPORT:
			_draw_circle(img, x_offset + 16, 10, 6, base.lightened(0.15))
			_draw_rect_shape(img, x_offset + 10, 16, 12, 12, base)
			_draw_cross(img, x_offset + 16, 22, 3, Color.WHITE)
		CombatantDefinition.UnitType.SCOUT:
			_draw_diamond(img, x_offset + 6, 4, 20, 24, base)
			_draw_circle(img, x_offset + 16, 9, 5, base.lightened(0.2))
		CombatantDefinition.UnitType.ARTILLERY:
			_draw_rect_shape(img, x_offset + 4, 14, 24, 16, base)
			_draw_rect_shape(img, x_offset + 11, 6, 10, 10, base.lightened(0.1))
			_draw_rect_shape(img, x_offset + 14, 2, 4, 6, accent)  # barrel
		CombatantDefinition.UnitType.SPECIALIST:
			_draw_hexagon(img, x_offset + 16, 16, 10, base)
			_draw_circle(img, x_offset + 16, 10, 5, base.lightened(0.2))
		CombatantDefinition.UnitType.WAR_MACHINE:
			_draw_rect_shape(img, x_offset + 2, 6, 28, 24, base)
			_draw_rect_shape(img, x_offset + 6, 2, 20, 8, base.lightened(0.1))
			_draw_rect_outline(img, x_offset + 2, 6, 28, 24, accent)
			_draw_rect_outline(img, x_offset + 6, 2, 20, 8, accent)

	# Ranged indicator (small dot in corner)
	if def.rng > 1:
		_draw_circle(img, x_offset + 27, 5, 3, Color(1, 1, 0.3, 0.8))

	# Outline
	_draw_rect_outline(img, x_offset, 0, 32, 32, accent.darkened(0.4))

func _draw_dead_sprite(img: Image, x_offset: int, def: CombatantDefinition, base: Color, accent: Color):
	# Grayed out version of the unit
	var gray = Color(0.35, 0.35, 0.35, 0.6)
	var dark = Color(0.2, 0.2, 0.2, 0.8)
	_draw_rect_shape(img, x_offset + 6, 6, 20, 20, gray)
	# X mark
	for i in range(20):
		var px1 = x_offset + 6 + i
		var py1 = 6 + i
		var py2 = 26 - i
		if px1 < 64 and py1 < 32:
			img.set_pixel(px1, py1, dark)
			if px1 + 1 < 64:
				img.set_pixel(px1 + 1, py1, dark)
		if px1 < 64 and py2 >= 0 and py2 < 32:
			img.set_pixel(px1, py2, dark)
			if px1 + 1 < 64:
				img.set_pixel(px1 + 1, py2, dark)
	_draw_rect_outline(img, x_offset, 0, 32, 32, dark)

# ══════════════════════════════════════════════════════════════
# DRAWING PRIMITIVES
# ══════════════════════════════════════════════════════════════

func _draw_rect_shape(img: Image, x: int, y: int, w: int, h: int, color: Color):
	for px in range(maxi(0, x), mini(img.get_width(), x + w)):
		for py in range(maxi(0, y), mini(img.get_height(), y + h)):
			img.set_pixel(px, py, color)

func _draw_rect_outline(img: Image, x: int, y: int, w: int, h: int, color: Color):
	var max_x = mini(img.get_width() - 1, x + w - 1)
	var max_y = mini(img.get_height() - 1, y + h - 1)
	for px in range(maxi(0, x), max_x + 1):
		if y >= 0 and y < img.get_height():
			img.set_pixel(px, y, color)
		if max_y >= 0 and max_y < img.get_height():
			img.set_pixel(px, max_y, color)
	for py in range(maxi(0, y), max_y + 1):
		if x >= 0 and x < img.get_width():
			img.set_pixel(x, py, color)
		if max_x >= 0 and max_x < img.get_width():
			img.set_pixel(max_x, py, color)

func _draw_circle(img: Image, cx: int, cy: int, radius: int, color: Color):
	for px in range(maxi(0, cx - radius), mini(img.get_width(), cx + radius + 1)):
		for py in range(maxi(0, cy - radius), mini(img.get_height(), cy + radius + 1)):
			var dx = px - cx
			var dy = py - cy
			if dx * dx + dy * dy <= radius * radius:
				img.set_pixel(px, py, color)

func _draw_circle_outline(img: Image, cx: int, cy: int, radius: int, color: Color):
	# Midpoint circle algorithm
	var x = radius
	var y_pos = 0
	var d = 1 - radius
	while x >= y_pos:
		_safe_pixel(img, cx + x, cy + y_pos, color)
		_safe_pixel(img, cx - x, cy + y_pos, color)
		_safe_pixel(img, cx + x, cy - y_pos, color)
		_safe_pixel(img, cx - x, cy - y_pos, color)
		_safe_pixel(img, cx + y_pos, cy + x, color)
		_safe_pixel(img, cx - y_pos, cy + x, color)
		_safe_pixel(img, cx + y_pos, cy - x, color)
		_safe_pixel(img, cx - y_pos, cy - x, color)
		y_pos += 1
		if d <= 0:
			d += 2 * y_pos + 1
		else:
			x -= 1
			d += 2 * (y_pos - x) + 1

func _draw_diamond(img: Image, x: int, y: int, w: int, h: int, color: Color):
	var cx = x + w / 2
	var cy = y + h / 2
	var hw = w / 2.0
	var hh = h / 2.0
	for px in range(maxi(0, x), mini(img.get_width(), x + w)):
		for py in range(maxi(0, y), mini(img.get_height(), y + h)):
			var dx = absf(px - cx) / hw
			var dy = absf(py - cy) / hh
			if dx + dy <= 1.0:
				img.set_pixel(px, py, color)

func _draw_diamond_outline(img: Image, x: int, y: int, w: int, h: int, color: Color):
	var cx = x + w / 2
	var cy = y + h / 2
	var hw = w / 2.0
	var hh = h / 2.0
	for px in range(maxi(0, x), mini(img.get_width(), x + w)):
		for py in range(maxi(0, y), mini(img.get_height(), y + h)):
			var dx = absf(px - cx) / hw
			var dy = absf(py - cy) / hh
			var dist = dx + dy
			if dist <= 1.05 and dist >= 0.9:
				img.set_pixel(px, py, color)

func _draw_triangle(img: Image, tip_x: int, tip_y: int, base_w: int, height: int, color: Color):
	var base_y = tip_y + height
	var left_x = tip_x - base_w / 2
	for py in range(maxi(0, tip_y), mini(img.get_height(), base_y)):
		var progress = float(py - tip_y) / float(height) if height > 0 else 0.0
		var half_w = int(progress * base_w / 2.0)
		for px in range(maxi(0, tip_x - half_w), mini(img.get_width(), tip_x + half_w + 1)):
			img.set_pixel(px, py, color)

func _draw_triangle_outline(img: Image, tip_x: int, tip_y: int, base_w: int, height: int, color: Color):
	var base_y = tip_y + height
	for py in range(maxi(0, tip_y), mini(img.get_height(), base_y)):
		var progress = float(py - tip_y) / float(height) if height > 0 else 0.0
		var half_w = int(progress * base_w / 2.0)
		_safe_pixel(img, tip_x - half_w, py, color)
		_safe_pixel(img, tip_x + half_w, py, color)
	# Bottom edge
	var half_base = base_w / 2
	for px in range(maxi(0, tip_x - half_base), mini(img.get_width(), tip_x + half_base + 1)):
		_safe_pixel(img, px, mini(img.get_height() - 1, base_y - 1), color)

func _draw_hexagon(img: Image, cx: int, cy: int, radius: int, color: Color):
	for px in range(maxi(0, cx - radius), mini(img.get_width(), cx + radius + 1)):
		for py in range(maxi(0, cy - radius), mini(img.get_height(), cy + radius + 1)):
			var dx = absf(px - cx)
			var dy = absf(py - cy)
			# Hexagonal distance approximation
			if dx + dy * 0.577 <= radius and dy <= radius * 0.866:
				img.set_pixel(px, py, color)

func _draw_hexagon_outline(img: Image, cx: int, cy: int, radius: int, color: Color):
	for px in range(maxi(0, cx - radius), mini(img.get_width(), cx + radius + 1)):
		for py in range(maxi(0, cy - radius), mini(img.get_height(), cy + radius + 1)):
			var dx = absf(px - cx)
			var dy = absf(py - cy)
			var dist = dx + dy * 0.577
			if dist <= radius and dist >= radius - 1.5 and dy <= radius * 0.866:
				img.set_pixel(px, py, color)

func _draw_star(img: Image, cx: int, cy: int, size: int, color: Color):
	# Simple 4-point star
	for i in range(-size, size + 1):
		_safe_pixel(img, cx + i, cy, color)
		_safe_pixel(img, cx, cy + i, color)
	# Diagonal rays (smaller)
	var ds = size / 2
	for i in range(-ds, ds + 1):
		_safe_pixel(img, cx + i, cy + i, color)
		_safe_pixel(img, cx + i, cy - i, color)

func _draw_cross(img: Image, cx: int, cy: int, size: int, color: Color):
	for i in range(-size, size + 1):
		_safe_pixel(img, cx + i, cy, color)
		_safe_pixel(img, cx, cy + i, color)

func _safe_pixel(img: Image, x: int, y: int, color: Color):
	if x >= 0 and x < img.get_width() and y >= 0 and y < img.get_height():
		img.set_pixel(x, y, color)

# ══════════════════════════════════════════════════════════════
# SKILL ICONS (32×32)
# ══════════════════════════════════════════════════════════════

var _skill_icon_cache: Dictionary = {}

func get_skill_icon(skill_key: String) -> ImageTexture:
	if _skill_icon_cache.has(skill_key):
		return _skill_icon_cache[skill_key]
	var tex = _generate_skill_icon(skill_key)
	_skill_icon_cache[skill_key] = tex
	return tex

func _generate_skill_icon(skill_key: String) -> ImageTexture:
	var img = Image.create(32, 32, false, Image.FORMAT_RGBA8)
	img.fill(Color.TRANSPARENT)

	match skill_key:
		"attack_melee":
			# Sword icon — diagonal line with crossguard
			var blade_color = Color(0.8, 0.85, 0.9)
			var handle_color = Color(0.55, 0.35, 0.15)
			for i in range(20):
				_safe_pixel(img, 6 + i, 26 - i, blade_color)
				_safe_pixel(img, 7 + i, 26 - i, blade_color)
			# Crossguard
			for i in range(8):
				_safe_pixel(img, 12 + i, 16 + i - 4, Color(0.7, 0.6, 0.2))
			# Handle
			for i in range(5):
				_safe_pixel(img, 3 + i, 29 - i, handle_color)
			_draw_rect_outline(img, 0, 0, 32, 32, Color(0.3, 0.3, 0.3))

		"attack_ranged":
			# Arrow icon
			var shaft_color = Color(0.6, 0.45, 0.2)
			var tip_color = Color(0.75, 0.8, 0.85)
			# Shaft
			for i in range(18):
				_safe_pixel(img, 7 + i, 23 - i, shaft_color)
			# Arrowhead
			_draw_triangle(img, 25, 5, 6, 6, tip_color)
			# Fletching
			for i in range(4):
				_safe_pixel(img, 5 + i, 25 - i + 2, Color(0.8, 0.2, 0.2))
				_safe_pixel(img, 5 + i + 2, 25 - i, Color(0.8, 0.2, 0.2))
			_draw_rect_outline(img, 0, 0, 32, 32, Color(0.3, 0.3, 0.3))

		"basic_magic":
			# Magic sparkle
			_draw_star(img, 16, 16, 8, Color(0.6, 0.3, 1.0))
			_draw_circle(img, 16, 16, 4, Color(0.8, 0.6, 1.0))
			_draw_star(img, 16, 16, 3, Color(1.0, 1.0, 1.0))
			_draw_rect_outline(img, 0, 0, 32, 32, Color(0.3, 0.2, 0.4))

		_:
			# Generic ability icon — gear/cog shape
			_draw_circle(img, 16, 16, 10, Color(0.5, 0.5, 0.55))
			_draw_circle(img, 16, 16, 6, Color(0.3, 0.3, 0.35))
			_draw_cross(img, 16, 16, 10, Color(0.5, 0.5, 0.55))
			_draw_rect_outline(img, 0, 0, 32, 32, Color(0.3, 0.3, 0.3))

	return ImageTexture.create_from_image(img)
