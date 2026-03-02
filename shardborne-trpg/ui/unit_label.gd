extends Node2D
## Floating name label + HP bar drawn above each unit on the battle map.
## Attach as child of a combatant's Sprite2D.
## Call mark_dirty() after HP/status changes instead of redrawing every frame.

var combatant: Dictionary = {}
var side_color: Color = Color.WHITE

## Cached values to avoid redundant redraws
var _last_hp: int = -1
var _last_shaken: bool = false
var _last_alive: bool = true

func _ready():
	z_index = 10
	# Initial draw
	queue_redraw()

func _process(_delta):
	# Only redraw when tracked values actually change
	if combatant.is_empty():
		return
	var hp: int = combatant.get("hp", -1)
	var shaken: bool = combatant.get("shaken", false)
	var alive: bool = combatant.get("alive", true)
	if hp != _last_hp or shaken != _last_shaken or alive != _last_alive:
		_last_hp = hp
		_last_shaken = shaken
		_last_alive = alive
		queue_redraw()

func mark_dirty():
	queue_redraw()

func _draw():
	if combatant.is_empty():
		return
	if not combatant.get("alive", false):
		return

	var font = ThemeDB.fallback_font
	var font_size := 6
	var name_text: String = combatant.get("name", "?")

	# Truncate long names
	if name_text.length() > 14:
		name_text = name_text.left(12) + ".."

	var text_size = font.get_string_size(name_text, HORIZONTAL_ALIGNMENT_CENTER, -1, font_size)
	var x_offset = -text_size.x / 2.0
	var y_top = -20.0  # Above the sprite center

	# Name background
	var bg = Rect2(x_offset - 2, y_top - font_size - 1, text_size.x + 4, font_size + 4)
	draw_rect(bg, Color(0.0, 0.0, 0.0, 0.7))
	# Name text
	draw_string(font, Vector2(x_offset, y_top), name_text, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size, side_color)

	# HP bar below sprite
	var hp: int = combatant.get("hp", 1)
	var max_hp: int = combatant.get("max_hp", 1)
	var ratio: float = clampf(float(hp) / float(max(max_hp, 1)), 0.0, 1.0)
	var bar_w := 24.0
	var bar_h := 2.0
	var bar_x := -bar_w / 2.0
	var bar_y := 14.0  # Below sprite center

	# Background
	draw_rect(Rect2(bar_x - 1, bar_y - 1, bar_w + 2, bar_h + 2), Color(0.0, 0.0, 0.0, 0.6))
	# Missing HP (dark red)
	draw_rect(Rect2(bar_x, bar_y, bar_w, bar_h), Color(0.3, 0.05, 0.05))
	# Current HP
	var hp_color := Color(0.2, 0.85, 0.2) if ratio > 0.5 else (Color(0.9, 0.8, 0.1) if ratio > 0.25 else Color(0.9, 0.15, 0.1))
	draw_rect(Rect2(bar_x, bar_y, bar_w * ratio, bar_h), hp_color)

	# Shaken indicator
	if combatant.get("shaken", false):
		draw_string(font, Vector2(bar_x + bar_w + 3, bar_y + bar_h), "!", HORIZONTAL_ALIGNMENT_LEFT, -1, 6, Color(1.0, 0.6, 0.1))
