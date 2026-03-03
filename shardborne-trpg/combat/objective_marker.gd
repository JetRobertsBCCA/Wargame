extends Node2D
## Visual marker for scenario objectives on the tilemap.
## Draws a diamond/beacon shape at the objective position with pulsing animation.

var _pulse_timer: float = 0.0

func _process(delta: float) -> void:
	_pulse_timer += delta * 2.0
	queue_redraw()

func _draw() -> void:
	var color: Color = get_meta("obj_color", Color.WHITE)
	var obj_type: String = get_meta("obj_type", "objective")

	# Pulse alpha for visibility
	var pulse = 0.6 + 0.3 * sin(_pulse_timer)
	var draw_color = Color(color.r, color.g, color.b, color.a * pulse)
	var outline_color = Color(color.r, color.g, color.b, color.a * 0.9)

	# Draw diamond shape
	var size := 10.0
	var points := PackedVector2Array([
		Vector2(0, -size),
		Vector2(size, 0),
		Vector2(0, size),
		Vector2(-size, 0),
	])
	draw_colored_polygon(points, draw_color)
	# Outline
	for i in range(points.size()):
		var next_i = (i + 1) % points.size()
		draw_line(points[i], points[next_i], outline_color, 1.5)

	# Inner icon based on type
	match obj_type:
		"center":
			# Star/crown for king of the hill
			draw_circle(Vector2.ZERO, 3.0, Color.WHITE * 0.9)
		"defend":
			# Shield shape
			draw_rect(Rect2(-3, -3, 6, 6), Color.WHITE * 0.8)
		"cache", "fragment":
			# Small circle for collectible
			draw_circle(Vector2.ZERO, 2.5, Color.WHITE * 0.9)
		_:
			# Dot
			draw_circle(Vector2.ZERO, 2.0, Color.WHITE * 0.7)

	# Label below
	var label_map := {
		"center": "HILL",
		"side": "OBJ",
		"defend": "DEF",
		"cache": "SUP",
		"objective": "OBJ",
		"fragment": "SHARD",
	}
	var label_text = label_map.get(obj_type, "OBJ")
	draw_string(ThemeDB.fallback_font, Vector2(-12, size + 12), label_text, HORIZONTAL_ALIGNMENT_CENTER, 24, 7, outline_color)
