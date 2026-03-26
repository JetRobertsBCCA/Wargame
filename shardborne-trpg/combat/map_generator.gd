extends RefCounted
class_name MapGenerator

## MapGenerator — Procedural battlefield terrain for Shardborne TRPG.
##
## Fills the TileMap with diverse terrain each battle:
##   Mountains  — impassable ridges blocking LoS (row-5 tiles, alt 1, cost 99)
##   Forest     — difficult terrain, light cover  (row-4 tiles, cost 2)
##   Rubble     — broken war gear, heavy cover    (row-5 tiles, alt 0, cost 3)
##
## Called from CController._ready() after A* grid is configured.
## Returns a flavor description String for the battle log.

const SOURCE_ID := 0

## Solid grass tile used for the base fill (fully grass-center, no transitions)
const GRASS_BASE := Vector2i(4, 1)

## Forest tiles — atlas row 4, cost 2 (set in terrain.tscn)
const FOREST_TILES: Array = [
	Vector2i(0, 4), Vector2i(1, 4), Vector2i(2, 4),
	Vector2i(3, 4), Vector2i(4, 4), Vector2i(5, 4),
]

## Ruin/rubble tiles — atlas row 5, cost 3 (alt 0) or cost 99 (alt 1 = mountain)
const RUIN_TILES: Array = [
	Vector2i(0, 5), Vector2i(1, 5), Vector2i(2, 5),
	Vector2i(3, 5), Vector2i(4, 5), Vector2i(5, 5),
]
const RUIN_ALT     := 0  ## Heavy cover, passable (cost 3)
const MOUNTAIN_ALT := 1  ## Impassable cliff face (cost 99)

## Flavor text pools for the battle log
const _MOUNTAIN_FLAVOR: Array = [
	"Broken ridgelines carve chokepoints across the field.",
	"Shattered crags force troops through narrow defiles.",
	"Impassable stone formations divide the battlefield.",
	"Ancient rock walls loom between the armies.",
]
const _FOREST_FLAVOR: Array = [
	"Scorched groves offer cover amid the carnage.",
	"Tangled thickets slow any advance through the midfield.",
	"Twisted wood looms where armies once camped.",
	"Charred tree-stands break line of sight across the center.",
]
const _RUIN_FLAVOR: Array = [
	"Shattered war machines and crumbled walls litter the ground.",
	"The wreckage of a prior engagement — heavy rubble for cover.",
	"Broken fortifications anchor strongpoints across the terrain.",
	"Crushed siege engines and scattered armour form dense rubble.",
	"The hulks of war constructs rust in heaps — perfect cover.",
]


## Generate a fresh procedural battlefield map.
##
## @param tile_map      TileMap node to populate
## @param map_size      Vector2i(width, height) in tiles
## @param deploy_end_x  Right edge of player deployment zone (cols 0..deploy_end_x are safe)
## @param terrain_meta  Dictionary to fill: Vector2i → terrain type String
## @param impassable    Array to fill with positions of impassable (mountain) tiles
## @return              Flavor description string for the battle log
static func generate(
	tile_map: TileMap,
	map_size: Vector2i,
	deploy_end_x: int,
	terrain_meta: Dictionary,
	impassable: Array,
) -> String:

	var rng := RandomNumberGenerator.new()
	rng.randomize()

	var w := map_size.x
	var h := map_size.y

	# Wipe the existing baked tile data and metadata
	tile_map.clear()
	terrain_meta.clear()
	impassable.clear()

	# Fill every cell with solid grass
	_fill_grass(tile_map, w, h)

	# Safe margins: keep deployment zones free of obstacles
	# Player deploys cols 0..deploy_end_x; enemy mirrors on right
	var safe_l := deploy_end_x + 2
	var safe_r := w - deploy_end_x - 2
	if safe_l >= safe_r:
		return ""  # Map too small for terrain features

	# Scale feature count with map area (1.0 = standard 36×21)
	var t: float = clampf(float(w * h) / (36.0 * 21.0), 0.6, 2.0)

	var log_parts: Array[String] = []

	# ── 1. Mountain ridges ────────────────────────────────────────
	var num_ridges := 1 if t < 1.0 else rng.randi_range(1, 2)
	if _place_ridges(tile_map, rng, w, h, safe_l, safe_r, terrain_meta, impassable, num_ridges) > 0:
		log_parts.append(_MOUNTAIN_FLAVOR[rng.randi() % _MOUNTAIN_FLAVOR.size()])

	# ── 2. Forest clusters ────────────────────────────────────────
	var num_forests := rng.randi_range(2, roundi(3.0 * t))
	if _place_clusters(tile_map, rng, w, h, safe_l, safe_r,
			terrain_meta, "forest", FOREST_TILES, RUIN_ALT, num_forests, 3, 8) > 0:
		log_parts.append(_FOREST_FLAVOR[rng.randi() % _FOREST_FLAVOR.size()])

	# ── 3. Ruin / rubble clusters ─────────────────────────────────
	var num_ruins := rng.randi_range(2, roundi(3.0 * t))
	if _place_clusters(tile_map, rng, w, h, safe_l, safe_r,
			terrain_meta, "rubble", RUIN_TILES, RUIN_ALT, num_ruins, 2, 6) > 0:
		log_parts.append(_RUIN_FLAVOR[rng.randi() % _RUIN_FLAVOR.size()])

	# ── 4. Guarantee at least one passable path across the map ───
	_ensure_connectivity(tile_map, w, h, terrain_meta, impassable)

	return "\n".join(log_parts)


# ── Internal helpers ──────────────────────────────────────────────────────────

static func _fill_grass(tile_map: TileMap, w: int, h: int) -> void:
	for x in range(w):
		for y in range(h):
			tile_map.set_cell(0, Vector2i(x, y), SOURCE_ID, GRASS_BASE)


## Place `count` vertical mountain ridges in the playfield.
## Each ridge spans 40–65 % of map height, leaving gaps at top and/or bottom.
static func _place_ridges(
	tile_map: TileMap, rng: RandomNumberGenerator,
	w: int, h: int, safe_l: int, safe_r: int,
	meta: Dictionary, impassable: Array, count: int
) -> int:
	var placed := 0
	var zone_w := safe_r - safe_l

	for i in range(count):
		# Space ridges evenly across the playfield, with a little jitter
		var cx: int = safe_l + zone_w * (i + 1) / (count + 1)
		cx = clampi(cx + rng.randi_range(-2, 2), safe_l + 1, safe_r - 2)

		# Span 40–65 % of the height; start position leaves gaps
		var ridge_h := rng.randi_range(h * 40 / 100, h * 65 / 100)
		var start_y := rng.randi_range(1, maxi(1, h - ridge_h - 1))

		var x := cx
		for y in range(start_y, start_y + ridge_h):
			# Occasional 1-tile horizontal drift for a natural look
			if rng.randf() < 0.15:
				x = clampi(x + (1 if rng.randi_range(0, 1) == 0 else -1), safe_l, safe_r - 1)

			# Center column is always placed; flanking tiles added with 35 % chance
			for dx in [-1, 0, 1]:
				var px := x + dx
				if px < safe_l or px >= safe_r:
					continue
				var prob := 1.0 if dx == 0 else 0.35
				if rng.randf() < prob:
					var pos := Vector2i(px, y)
					var col := rng.randi_range(0, RUIN_TILES.size() - 1)
					tile_map.set_cell(0, pos, SOURCE_ID, RUIN_TILES[col], MOUNTAIN_ALT)
					meta[pos] = "mountain"
					if pos not in impassable:
						impassable.append(pos)
					placed += 1

	return placed


## Place `count` random terrain clusters (forest or rubble) in the playfield.
## Clusters are spread evenly with ±3-tile jitter, sized min_sz..max_sz tiles.
static func _place_clusters(
	tile_map: TileMap, rng: RandomNumberGenerator,
	w: int, h: int, safe_l: int, safe_r: int,
	meta: Dictionary, type_name: String,
	atlas_tiles: Array, atlas_alt: int,
	count: int, min_sz: int, max_sz: int
) -> int:
	var placed := 0
	var zone_w := safe_r - safe_l

	for i in range(count):
		# Spread clusters across the playfield
		var cx: int = safe_l + zone_w * (i + 1) / (count + 1)
		cx = clampi(cx + rng.randi_range(-3, 3), safe_l, safe_r - 1)
		var cy: int = rng.randi_range(2, h - 3)

		var size := rng.randi_range(min_sz, max_sz)
		for _s in range(size):
			var dx := rng.randi_range(-2, 2)
			var dy := rng.randi_range(-2, 2)
			var pos := Vector2i(
				clampi(cx + dx, 0, w - 1),
				clampi(cy + dy, 0, h - 1)
			)
			# Never overwrite mountains
			if meta.get(pos, "") == "mountain":
				continue
			var tile := atlas_tiles[rng.randi_range(0, atlas_tiles.size() - 1)]
			tile_map.set_cell(0, pos, SOURCE_ID, tile, atlas_alt)
			meta[pos] = type_name
			placed += 1

	return placed


## BFS from left edge to right edge (skipping impassable tiles).
## If no path exists, cut a 2-tile wide corridor through the middle rows.
static func _ensure_connectivity(
	tile_map: TileMap, w: int, h: int,
	meta: Dictionary, impassable: Array
) -> void:
	# Build fast lookup set
	var imp_set := {}
	for pos in impassable:
		imp_set[pos] = true

	# BFS: start from all passable left-edge tiles
	var queue: Array = []
	var visited := {}
	for y in range(h):
		var s := Vector2i(0, y)
		if not (s in imp_set):
			queue.append(s)
			visited[s] = true

	var reached := false
	var qi := 0
	while qi < queue.size():
		var cur: Vector2i = queue[qi]
		qi += 1
		if cur.x >= w - 1:
			reached = true
			break
		for dir in [Vector2i.RIGHT, Vector2i.LEFT, Vector2i.UP, Vector2i.DOWN]:
			var nxt := cur + dir
			if nxt.x < 0 or nxt.y < 0 or nxt.x >= w or nxt.y >= h:
				continue
			if (nxt in visited) or (nxt in imp_set):
				continue
			visited[nxt] = true
			queue.append(nxt)

	if not reached:
		# Punch a 2-tile wide corridor through the vertical center
		var mid_y := h / 2
		for x in range(w):
			for dy in [0, 1]:
				var pos := Vector2i(x, mid_y + dy)
				if pos in imp_set:
					tile_map.set_cell(0, pos, SOURCE_ID, GRASS_BASE)
					impassable.erase(pos)
					meta.erase(pos)
					imp_set.erase(pos)
