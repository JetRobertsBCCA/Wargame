extends Node
## SaveManager — Handles campaign save/load/delete across 5 persistent slots.
## Also tracks campaign completion status.
## Autoload singleton. Saves to user://saves/ as JSON.

const MAX_SLOTS := 5
const SAVE_DIR := "user://saves/"
const COMPLETION_PATH := "user://saves/completed_campaigns.json"

var _completed_campaigns: Array = []  # Array of completed campaign IDs

# ══════════════════════════════════════════════════════════════
# FILE HELPERS
# ══════════════════════════════════════════════════════════════

func _ready():
	_ensure_save_dir()
	_load_completed_campaigns()


func _ensure_save_dir():
	if not DirAccess.dir_exists_absolute(SAVE_DIR):
		DirAccess.make_dir_recursive_absolute(SAVE_DIR)


func _slot_path(slot: int) -> String:
	return SAVE_DIR + "save_slot_%d.json" % slot

# ══════════════════════════════════════════════════════════════
# SAVE
# ══════════════════════════════════════════════════════════════

func save_campaign(slot: int, campaign_manager) -> bool:
	"""Save the current campaign state to a slot (1-5). Returns true on success."""
	if slot < 1 or slot > MAX_SLOTS:
		push_error("SaveManager: Invalid slot %d (must be 1-%d)" % [slot, MAX_SLOTS])
		return false

	if campaign_manager == null:
		push_error("SaveManager: No campaign manager provided")
		return false

	var save_data := {
		"version": 1,
		"timestamp": Time.get_datetime_string_from_system(true),
		"campaign_id": campaign_manager.campaign_id,
		"campaign_title": campaign_manager.get_campaign_title(),
		"commander": campaign_manager.get_commander_name(),
		"faction_enum": campaign_manager.get_faction_enum(),
		"current_mission": campaign_manager.current_mission,
		"total_missions": campaign_manager.get_total_missions(),
		"mission_results": _serialize_results(campaign_manager.mission_results),
		"veterancy": _serialize_veterancy(campaign_manager.veterancy),
		"casualties": campaign_manager.casualties.duplicate(),
	}

	var json_string = JSON.stringify(save_data, "\t")
	var file = FileAccess.open(_slot_path(slot), FileAccess.WRITE)
	if file == null:
		push_error("SaveManager: Failed to open slot %d for writing: %s" % [slot, FileAccess.get_open_error()])
		return false

	file.store_string(json_string)
	file.close()
	print("[SaveManager] Saved campaign '%s' to slot %d" % [save_data.campaign_title, slot])
	return true

# ══════════════════════════════════════════════════════════════
# LOAD
# ══════════════════════════════════════════════════════════════

func load_save(slot: int) -> Dictionary:
	"""Load save data from a slot. Returns empty dict on failure."""
	if slot < 1 or slot > MAX_SLOTS:
		push_error("SaveManager: Invalid slot %d" % slot)
		return {}

	var path = _slot_path(slot)
	if not FileAccess.file_exists(path):
		return {}

	var file = FileAccess.open(path, FileAccess.READ)
	if file == null:
		push_error("SaveManager: Failed to open slot %d for reading" % slot)
		return {}

	var json_string = file.get_as_text()
	file.close()

	var json = JSON.new()
	var err = json.parse(json_string)
	if err != OK:
		push_error("SaveManager: Failed to parse save in slot %d: %s" % [slot, json.get_error_message()])
		return {}

	return json.data

# ══════════════════════════════════════════════════════════════
# DELETE
# ══════════════════════════════════════════════════════════════

func delete_save(slot: int) -> bool:
	"""Delete a save from a slot. Returns true on success."""
	if slot < 1 or slot > MAX_SLOTS:
		push_error("SaveManager: Invalid slot %d" % slot)
		return false

	var path = _slot_path(slot)
	if not FileAccess.file_exists(path):
		return true  # Already empty

	var err = DirAccess.remove_absolute(path)
	if err != OK:
		push_error("SaveManager: Failed to delete slot %d" % slot)
		return false

	print("[SaveManager] Deleted save in slot %d" % slot)
	return true

# ══════════════════════════════════════════════════════════════
# QUERY
# ══════════════════════════════════════════════════════════════

func has_save(slot: int) -> bool:
	"""Check if a slot has a save."""
	return FileAccess.file_exists(_slot_path(slot))


func get_all_saves() -> Array:
	"""Returns an array of 5 entries, one per slot. Each is either a save dict or an empty dict."""
	var saves := []
	for i in range(1, MAX_SLOTS + 1):
		saves.append(load_save(i))
	return saves


func has_any_saves() -> bool:
	"""Returns true if at least one save slot is occupied."""
	for i in range(1, MAX_SLOTS + 1):
		if has_save(i):
			return true
	return false

# ══════════════════════════════════════════════════════════════
# RESTORE — Applies loaded data to a CampaignManager
# ══════════════════════════════════════════════════════════════

func restore_campaign(campaign_manager, save_data: Dictionary) -> bool:
	"""Restore a campaign manager from save data. Call after start_campaign()."""
	if save_data.is_empty():
		push_error("SaveManager: Empty save data")
		return false

	# start_campaign() already loads campaign_data, faction info, etc.
	# We just need to restore the mutable state.
	campaign_manager.current_mission = save_data.get("current_mission", 0)
	campaign_manager.mission_results = _deserialize_results(save_data.get("mission_results", []))
	campaign_manager.veterancy = _deserialize_veterancy(save_data.get("veterancy", {}))
	campaign_manager.casualties = Array(save_data.get("casualties", []))
	campaign_manager.campaign_active = true

	print("[SaveManager] Restored campaign '%s' at mission %d" % [
		save_data.get("campaign_title", "?"), campaign_manager.current_mission])
	return true

# ══════════════════════════════════════════════════════════════
# SERIALIZATION HELPERS
# ══════════════════════════════════════════════════════════════

func _serialize_results(results: Array) -> Array:
	"""Deep-copy mission results for safe JSON serialization."""
	var out := []
	for r in results:
		var entry := {}
		for key in r:
			entry[key] = r[key]
		out.append(entry)
	return out


func _deserialize_results(data: Array) -> Array:
	"""Convert loaded JSON results back to the expected format."""
	var out := []
	for entry in data:
		var r := {}
		for key in entry:
			var val = entry[key]
			# JSON parses ints as floats — fix mission_index and xp
			if key in ["mission_index", "xp_gained"]:
				r[key] = int(val) if val is float else val
			elif key == "victory":
				r[key] = val  # bool stays bool in JSON
			elif key == "player_casualties":
				r[key] = Array(val) if val is Array else []
			elif key == "level_ups":
				var ups := []
				for lu in val:
					ups.append({
						"unit": lu.get("unit", ""),
						"level": int(lu.get("level", 0)),
						"bonus": lu.get("bonus", ""),
					})
				r[key] = ups
			elif key == "xp_lost_units":
				r[key] = Array(val) if val is Array else []
			else:
				r[key] = val
		out.append(r)
	return out


func _serialize_veterancy(vet: Dictionary) -> Dictionary:
	"""Deep-copy veterancy for JSON serialization."""
	var out := {}
	for unit_name in vet:
		var entry = vet[unit_name]
		out[unit_name] = {
			"xp": entry.get("xp", 0),
			"level": entry.get("level", 0),
			"bonuses": Array(entry.get("bonuses", [])).duplicate(),
		}
	return out


func _deserialize_veterancy(data: Dictionary) -> Dictionary:
	"""Convert loaded JSON veterancy back to the expected format."""
	var out := {}
	for unit_name in data:
		var entry = data[unit_name]
		out[unit_name] = {
			"xp": int(entry.get("xp", 0)),
			"level": int(entry.get("level", 0)),
			"bonuses": Array(entry.get("bonuses", [])).duplicate(),
		}
	return out

# ══════════════════════════════════════════════════════════════
# CAMPAIGN COMPLETION TRACKING
# ══════════════════════════════════════════════════════════════

func _load_completed_campaigns():
	"""Load the list of completed campaign IDs from disk."""
	if not FileAccess.file_exists(COMPLETION_PATH):
		_completed_campaigns = []
		return
	var file = FileAccess.open(COMPLETION_PATH, FileAccess.READ)
	if file == null:
		_completed_campaigns = []
		return
	var json = JSON.new()
	var err = json.parse(file.get_as_text())
	file.close()
	if err != OK:
		_completed_campaigns = []
		return
	_completed_campaigns = Array(json.data) if json.data is Array else []


func _save_completed_campaigns():
	"""Persist the completed campaign list to disk."""
	_ensure_save_dir()
	var file = FileAccess.open(COMPLETION_PATH, FileAccess.WRITE)
	if file == null:
		push_error("SaveManager: Failed to write completion file")
		return
	file.store_string(JSON.stringify(_completed_campaigns))
	file.close()


func mark_campaign_complete(campaign_id: String):
	"""Record a campaign as completed."""
	if campaign_id.is_empty():
		return
	if campaign_id not in _completed_campaigns:
		_completed_campaigns.append(campaign_id)
		_save_completed_campaigns()
		print("[SaveManager] Campaign '%s' marked complete (%d total)" % [campaign_id, _completed_campaigns.size()])


func is_campaign_completed(campaign_id: String) -> bool:
	"""Check if a campaign has been completed."""
	return campaign_id in _completed_campaigns


func get_completed_campaigns() -> Array:
	"""Return array of all completed campaign IDs."""
	return _completed_campaigns.duplicate()
