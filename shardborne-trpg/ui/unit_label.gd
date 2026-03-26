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

const STATUS_DOT_COLORS := {
	"engaged":    Color(0.9, 0.1, 0.1),
	"stealthed":  Color(0.45, 0.0, 0.75),
	"burning":    Color(1.0, 0.4, 0.0),
	"poisoned":   Color(0.2, 0.85, 0.2),
}

## Cached values to avoid redundant redraws
var _last_hp: int = -1
var _last_shaken: bool = false
var _last_alive: bool = true
var _last_active: bool = false
var _last_hovered: bool = false
var _last_corruption: int = -1

## Floating damage number state
var _damage_display: int = 0
var _damage_timer: float = 0.0

## Show a floating damage number above this unit for 0.75 s.
func show_damage(dmg: int) -> void:
	_damage_display = dmg
	_damage_timer = 0.75

func _ready():
	z_index = 10
	queue_redraw()

func _process(delta: float):
	if combatant.is_empty():
		return
	# Tick down floating damage timer
	if _damage_timer > 0.0:
		_damage_timer -= delta
		queue_redraw()
		return
	var hp: int = combatant.get("hp", -1)
	var shaken: bool = combatant.get("shaken", false)
	var alive: bool = combatant.get("alive", true)
	var corruption: int = combatant.get("corruption_tokens", 0)
	var low_hp: bool = alive and hp > 0 and hp * 4 <= combatant.get("max_hp", 4)
	# Animated states: always redraw each frame for smooth animation
	if is_active or low_hp:
		queue_redraw()
		return
	# Static states: only redraw when a value changes
	if hp != _last_hp or shaken != _last_shaken or alive != _last_alive \
		or is_active != _last_active or is_hovered != _last_hovered \
		or corruption != _last_corruption:
		_last_hp = hp
		_last_shaken = shaken
		_last_alive = alive
		_last_active = is_active
		_last_hovered = is_hovered
		_last_corruption = corruption
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

	# ── Corruption tint overlay — purple haze scales with token count ──
	var corruption_tokens: int = combatant.get("corruption_tokens", 0)
	if corruption_tokens > 0:
		var ca := minf(corruption_tokens * 0.07, 0.4)
		draw_rect(Rect2(-15, -15, 30, 30), Color(0.5, 0.05, 0.85, ca))

	# ── Side-colored border around the tile ──
	var border_color := side_color
	var border_width := 1.0
	if is_active:
		# Pulsing gold border for the active unit
		var t := fmod(Time.get_ticks_msec() / 800.0, 1.0)
		var pulse := 0.55 + 0.45 * sin(t * TAU)
		border_color = Color(1.0, pulse, 0.05)
		border_width = 2.5
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
	# Current HP — color shifts green → yellow → pulsing red at critical
	var hp_color: Color
	if ratio > 0.5:
		hp_color = Color(0.2, 0.85, 0.2)
	elif ratio > 0.25:
		hp_color = Color(0.9, 0.8, 0.1)
	else:
		var t := fmod(Time.get_ticks_msec() / 500.0, 1.0)
		hp_color = Color(0.9, 0.12 + 0.18 * abs(sin(t * TAU)), 0.08)
	draw_rect(Rect2(bar_x, bar_y, bar_w * ratio, bar_h), hp_color)

	# ── Shaken indicator — orange triangle + subtle tint overlay ──
	if combatant.get("shaken", false):
		draw_rect(Rect2(-15, -15, 30, 30), Color(0.9, 0.5, 0.0, 0.12))
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

	# ── Status effect dots — colored pips above the HP bar ──
	var status_effects: Array = combatant.get("status_effects", [])
	var dot_offset := 0.0
	var dot_y := bar_y - 6.0
	for effect in status_effects:
		if dot_offset >= bar_w:
			break
		var dc: Color = STATUS_DOT_COLORS.get(effect, Color(0.65, 0.65, 0.65))  # grey for unknown
		draw_circle(Vector2(bar_x + dot_offset + 2.0, dot_y), 2.0, dc)
		dot_offset += 6.0
	# Overwatch pip (yellow) at fixed right-side position
	if combatant.get("overwatch_active", false):
		draw_circle(Vector2(bar_x + bar_w - 3.0, dot_y), 2.5, Color(1.0, 0.9, 0.05))

	# ── Floating damage number ──
	if _damage_timer > 0.0:
		var t := _damage_timer / 0.75
		var fy := -14.0 - (1.0 - t) * 22.0
		var fa := minf(t * 2.0, 1.0)
		draw_string(font, Vector2(-6.0, fy), "-%d" % _damage_display,
			HORIZONTAL_ALIGNMENT_LEFT, -1, 10, Color(1.0, 0.3, 0.08, fa))

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
