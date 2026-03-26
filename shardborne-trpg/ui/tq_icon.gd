extends TextureRect

var max_hp: int = 1
var hp: int = 1
var side: int = 0  # Track side so set_active(false) restores the correct border color

@onready var shader_material: ShaderMaterial = material as ShaderMaterial

var _fill_style := StyleBoxFlat.new()

func set_max_hp(max_hp: int):
	$Deadness.max_value = max_hp
	self.max_hp = max_hp
	update_deadness()

func set_hp(hp: int):
	self.hp = hp
	update_deadness()

func update_deadness():
	var deadness_value = max_hp - hp
	$Deadness.value = deadness_value
	# Color the fill bar: green when healthy, yellow at half, red at critical
	var ratio := float(hp) / float(maxi(max_hp, 1))
	if ratio > 0.5:
		_fill_style.bg_color = Color(0.15, 0.80, 0.15)
	elif ratio > 0.25:
		_fill_style.bg_color = Color(0.92, 0.72, 0.08)
	else:
		_fill_style.bg_color = Color(0.90, 0.15, 0.10)
	$Deadness.add_theme_stylebox_override("fill", _fill_style)

func set_side(s: int):
	side = s
	match side:
		0:
			$Border.modulate = Color.DODGER_BLUE
		1:
			$Border.modulate = Color.CRIMSON

func set_turn_taken(taken: bool):
	if shader_material == null:
		return
	var color_factor = int(taken)
	shader_material.set_shader_parameter("color_factor", color_factor)

func set_active(is_active: bool):
	# Bright golden border + scale up when this unit is currently acting
	if is_active:
		$Border.modulate = Color(1.0, 0.85, 0.1)  # Gold
		scale = Vector2(1.2, 1.2)
	else:
		set_side(side)  # Restore correct color using stored side value
		scale = Vector2(1.0, 1.0)
