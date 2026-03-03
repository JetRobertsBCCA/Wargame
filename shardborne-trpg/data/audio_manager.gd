extends Node
## AudioManager — Global autoload for music and SFX playback.
## Auto-discovers MP3 files from res://audio/ on startup.
## Usage:
##   AudioManager.play_music("menu")
##   AudioManager.play_faction_music(CombatantDefinition.Faction.EMBERCLAW)
##   AudioManager.play_sfx("attack_hit")
##   AudioManager.stop_music()

# ══════════════════════════════════════════════════════════════
# CONFIGURATION
# ══════════════════════════════════════════════════════════════

const MUSIC_DIR := "res://audio/music/"
const SFX_DIR := "res://audio/sfx/"
const CROSSFADE_TIME := 1.5  # seconds
const SFX_POOL_SIZE := 8     # max simultaneous SFX

## Master volumes (linear 0.0–1.0)
var music_volume := 0.7 :
	set(v):
		music_volume = clampf(v, 0.0, 1.0)
		if _music_player:
			_music_player.volume_db = linear_to_db(music_volume)
var sfx_volume := 0.8 :
	set(v):
		sfx_volume = clampf(v, 0.0, 1.0)

var music_enabled := true
var sfx_enabled := true

# ══════════════════════════════════════════════════════════════
# INTERNALS
# ══════════════════════════════════════════════════════════════

## Loaded streams: { "menu": AudioStreamMP3, "emberclaw": AudioStreamMP3, ... }
var _music_streams: Dictionary = {}
var _sfx_streams: Dictionary = {}

var _music_player: AudioStreamPlayer
var _music_fade_player: AudioStreamPlayer  # used during crossfade
var _sfx_pool: Array[AudioStreamPlayer] = []
var _sfx_pool_idx := 0

var _current_music_key := ""

# Faction enum → music key mapping
const FACTION_MUSIC_KEYS := {
	0: "emberclaw",   # CombatantDefinition.Faction.EMBERCLAW
	1: "iron_dominion",
	2: "nightfang",
	3: "thornweft",
	4: "veilbound",
}

# ══════════════════════════════════════════════════════════════
# LIFECYCLE
# ══════════════════════════════════════════════════════════════

func _ready():
	process_mode = Node.PROCESS_MODE_ALWAYS  # keep playing during pause
	_create_players()
	_scan_audio_files()
	print("[AudioManager] Ready — %d music tracks, %d SFX loaded" % [_music_streams.size(), _sfx_streams.size()])


func _create_players():
	_music_player = AudioStreamPlayer.new()
	_music_player.bus = "Master"
	_music_player.volume_db = linear_to_db(music_volume)
	add_child(_music_player)

	_music_fade_player = AudioStreamPlayer.new()
	_music_fade_player.bus = "Master"
	_music_fade_player.volume_db = linear_to_db(music_volume)
	add_child(_music_fade_player)

	for i in range(SFX_POOL_SIZE):
		var p = AudioStreamPlayer.new()
		p.bus = "Master"
		add_child(p)
		_sfx_pool.append(p)


func _scan_audio_files():
	"""Discover all .mp3 files in the audio directories."""
	# Music — flatten into single dict keyed by filename stem
	_scan_dir_recursive(MUSIC_DIR, _music_streams)
	# SFX
	_scan_dir_recursive(SFX_DIR, _sfx_streams)


func _scan_dir_recursive(path: String, target: Dictionary):
	"""Recursively scan a directory for .mp3 files and load them."""
	var dir = DirAccess.open(path)
	if dir == null:
		return

	dir.list_dir_begin()
	var file_name = dir.get_next()
	while file_name != "":
		var full_path = path + file_name
		if dir.current_is_dir():
			_scan_dir_recursive(full_path + "/", target)
		elif file_name.ends_with(".mp3") or file_name.ends_with(".mp3.import"):
			# Strip .import suffix if present (Godot imports create .import files)
			var resource_path = full_path.replace(".import", "")
			if ResourceLoader.exists(resource_path):
				var stream = ResourceLoader.load(resource_path)
				if stream:
					var key = file_name.get_basename().replace(".mp3", "")
					target[key] = stream
					print("[AudioManager]   Loaded: %s → %s" % [key, resource_path])
		file_name = dir.get_next()
	dir.list_dir_end()

# ══════════════════════════════════════════════════════════════
# MUSIC API
# ══════════════════════════════════════════════════════════════

func play_music(key: String, loop := true):
	"""Play a music track by key (e.g. 'menu', 'win', 'defeat').
	   Crossfades if another track is already playing."""
	if not music_enabled:
		return
	if key == _current_music_key and _music_player.playing:
		return  # Already playing this track

	var stream = _music_streams.get(key)
	if stream == null:
		# Silently skip — track not yet added
		return

	if stream is AudioStreamMP3:
		stream.loop = loop

	if _music_player.playing:
		_crossfade_to(stream, key)
	else:
		_music_player.stream = stream
		_music_player.volume_db = linear_to_db(music_volume)
		_music_player.play()
		_current_music_key = key


func play_faction_music(faction_enum: int, loop := true):
	"""Play the theme for a faction by its enum value."""
	var key = FACTION_MUSIC_KEYS.get(faction_enum, "")
	if key != "":
		play_music(key, loop)


func stop_music(fade_out := true):
	"""Stop current music, optionally with fade-out."""
	if not _music_player.playing:
		_current_music_key = ""
		return
	if fade_out:
		var tween = create_tween()
		tween.tween_property(_music_player, "volume_db", -40.0, CROSSFADE_TIME)
		tween.tween_callback(func():
			_music_player.stop()
			_music_player.volume_db = linear_to_db(music_volume)
			_current_music_key = "")
	else:
		_music_player.stop()
		_current_music_key = ""


func _crossfade_to(new_stream: AudioStream, new_key: String):
	"""Crossfade from current music to a new track."""
	# Move current to fade player
	_music_fade_player.stream = _music_player.stream
	_music_fade_player.volume_db = _music_player.volume_db
	_music_fade_player.play(_music_player.get_playback_position())

	# Start new track on main player, volume silent → full
	_music_player.stream = new_stream
	_music_player.volume_db = -40.0
	_music_player.play()
	_current_music_key = new_key

	var tween = create_tween()
	tween.set_parallel(true)
	tween.tween_property(_music_player, "volume_db", linear_to_db(music_volume), CROSSFADE_TIME)
	tween.tween_property(_music_fade_player, "volume_db", -40.0, CROSSFADE_TIME)
	tween.set_parallel(false)
	tween.tween_callback(func(): _music_fade_player.stop())

# ══════════════════════════════════════════════════════════════
# SFX API
# ══════════════════════════════════════════════════════════════

func play_sfx(key: String, pitch_variance := 0.0):
	"""Play a one-shot sound effect by key (e.g. 'attack_hit', 'card_play').
	   pitch_variance adds random pitch shift (0.0 = none, 0.1 = ±10%)."""
	if not sfx_enabled:
		return
	var stream = _sfx_streams.get(key)
	if stream == null:
		return  # SFX not yet added — silent skip

	var player = _sfx_pool[_sfx_pool_idx]
	_sfx_pool_idx = (_sfx_pool_idx + 1) % SFX_POOL_SIZE

	player.stream = stream
	player.volume_db = linear_to_db(sfx_volume)
	if pitch_variance > 0.0:
		player.pitch_scale = 1.0 + randf_range(-pitch_variance, pitch_variance)
	else:
		player.pitch_scale = 1.0
	player.play()


func play_sfx_random(keys: Array, pitch_variance := 0.0):
	"""Play a random SFX from an array of keys."""
	if keys.is_empty():
		return
	play_sfx(keys[randi() % keys.size()], pitch_variance)

# ══════════════════════════════════════════════════════════════
# UTILITY
# ══════════════════════════════════════════════════════════════

func get_current_music() -> String:
	return _current_music_key


func is_music_playing() -> bool:
	return _music_player.playing


func has_track(key: String) -> bool:
	return key in _music_streams or key in _sfx_streams
