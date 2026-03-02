extends Node2D
## Floating HP bar + side-colored outline drawn around each unit on the battle map.
## Names are ONLY shown on hover/active — prevents text overlap on the grid.
## Attach as child of a combatant's Sprite2D.

var combatant: Dictionary = {}
var side_color: Color = Color.WHITE

## Whether this unit is the active (current turn) unit
var is_active: bool = false

## Whether the mouse is hovering over this unit's tile
var is_hovered: bool = false

## Cached values to avoid redundant redraws
var _last_hp: int = -1
var _last_shaken: bool = false
var _last_alive: bool = true
var _last_active: bool = false
var _last_hovered: bool = false

func _ready():
	z_index = 10
	queue_redraw()

func _process(_delta):
	if combatant.is_empty():
		return
	var hp: int = combatant.get("hp", -1)
	var shaken: bool = combatant.get("shaken", false)
	var alive: bool = combatant.get("alive", true)
	if hp != _last_hp or shaken != _last_shaken or alive != _last_alive \
		or is_active != _last_active or is_hovered != _last_hovered:
		_last_hp = hp
		_last_shaken = shaken
		_last_alive = alive
		_last_active = is_active
		_last_hovered = is_hovered
		queue_redraw()

func mark_dirty():
	queue_redraw()

func _draw():
	if combatant.is_empty():
		return

	var alive: bool = combatant.get("alive", false)
	var font = ThemeDB.fallback_font

	if not alive:
		# Dead unit: just draw a subtle X over the tile
		var dark := Color(0.0, 0.0, 0.0, 0.45)
		draw_rect(Rect2(-16, -16, 32, 32), dark)
		return

	# ── Side-colored border around the tile ──
	var border_color := side_color
	var border_width := 1.0
	if is_active:
		border_color = Color.WHITE
		border_width = 2.0
	# Draw border rectangle around the 32x32 tile
	var r := Rect2(-15, -15, 30, 30)
	draw_rect(r, border_color, false, border_width)

	# ── HP bar at the bottom of the tile ──
	var hp: int = combatant.get("hp", 1)
	var max_hp: int = combatant.get("max_hp", 1)
	var ratio: float = clampf(float(hp) / float(max(max_hp, 1)), 0.0, 1.0)
	var bar_w := 26.0
	var bar_h := 3.0
	var bar_x := -bar_w / 2.0
	var bar_y := 12.0  # Near bottom of tile

	# Background
	draw_rect(Rect2(bar_x - 1, bar_y - 1, bar_w + 2, bar_h + 2), Color(0.0, 0.0, 0.0, 0.75))
	# Missing HP (dark)
	draw_rect(Rect2(bar_x, bar_y, bar_w, bar_h), Color(0.25, 0.05, 0.05))
	# Current HP — color shifts from green → yellow → red
	var hp_color := Color(0.2, 0.85, 0.2) if ratio > 0.5 else (Color(0.9, 0.8, 0.1) if ratio > 0.25 else Color(0.9, 0.15, 0.1))
	draw_rect(Rect2(bar_x, bar_y, bar_w * ratio, bar_h), hp_color)

	# ── Shaken indicator — small orange triangle ──
	if combatant.get("shaken", false):
		var tri_x := bar_x + bar_w + 2
		var tri_y := bar_y
		draw_colored_polygon(
			PackedVector2Array([
				Vector2(tri_x, tri_y + bar_h),
				Vector2(tri_x + 4, tri_y + bar_h),
				Vector2(tri_x + 2, tri_y - 1),
			]),
			Color(1.0, 0.6, 0.1)
		)

	# ── Name tooltip — only shown on hover or active ──
	if is_hovered or is_active:
		var name_text: String = combatant.get("name", "?")
		var font_size := 7
		var text_size = font.get_string_size(name_text, HORIZONTAL_ALIGNMENT_CENTER, -1, font_size)
		var x_offset = -text_size.x / 2.0
		var y_top = -17.0  # Above the tile

		# Name background
		var bg = Rect2(x_offset - 3, y_top - font_size - 2, text_size.x + 6, font_size + 5)
		draw_rect(bg, Color(0.0, 0.0, 0.0, 0.85))
		draw_rect(bg, side_color * Color(1, 1, 1, 0.4), false, 1.0)
		# Name text
		draw_string(font, Vector2(x_offset, y_top), name_text, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size, Color.WHITE)

		# HP text (e.g. "3/5")
		var hp_text := "%d/%d" % [hp, max_hp]
		var hp_size = font.get_string_size(hp_text, HORIZONTAL_ALIGNMENT_CENTER, -1, font_size)
		draw_string(font, Vector2(-hp_size.x / 2.0, bar_y - 2), hp_text, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size, Color(0.9, 0.9, 0.9, 0.9))
