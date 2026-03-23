extends CanvasLayer
## SceneTransition — Global autoload for animated scene changes.
## Fades to black, changes scene, then new scene fades in.
## Usage: SceneTransition.go("res://scenes/main_menu.tscn")
##        SceneTransition.go("res://scenes/game.tscn", 0.3)  # custom duration

const DEFAULT_DURATION := 0.45

var _overlay: ColorRect
var _busy := false

func _ready():
	layer = 100  # Always on top
	process_mode = Node.PROCESS_MODE_ALWAYS

	_overlay = ColorRect.new()
	_overlay.color = Color.BLACK
	_overlay.set_anchors_preset(Control.PRESET_FULL_RECT)
	_overlay.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_overlay.modulate.a = 0.0
	add_child(_overlay)


## Fade out → change scene → new scene fades in via its own _ready() logic.
## If a fade is already in progress, the call is ignored to prevent double-transitions.
func go(scene_path: String, duration: float = DEFAULT_DURATION) -> void:
	if _busy:
		return
	_busy = true
	_overlay.mouse_filter = Control.MOUSE_FILTER_STOP  # block input during fade
	var tween = create_tween()
	tween.tween_property(_overlay, "modulate:a", 1.0, duration)
	tween.tween_callback(func():
		_busy = false
		_overlay.modulate.a = 0.0
		_overlay.mouse_filter = Control.MOUSE_FILTER_IGNORE
		get_tree().change_scene_to_file(scene_path)
	)
