# Shardborne — Godot 4 C# scaffold

This folder contains a Godot 4 C# prototype that targets the existing rule/data files under `../data` and `../data/factions`.

## Quick start

1. Install **Godot 4.2 mono** (C# build).
2. From a terminal in `Wargame/shardborne-godot`, run the data exporter once to emit a JSON snapshot for the client:
   - `node tools/export_game_data.mjs`
   - This produces `Data/game_data.json` by evaluating `data/core.js` plus every `data/factions/*.js` file.
3. Open `project.godot` in Godot 4.2 (mono build). Godot will restore NuGet packages (Jint) on first build.
4. Press **Play** to run the prototype scene. The UI shows turn/phase controls, pools, a faction browser, and a simple auto-resolve button.

## Notes

- The C# side loads data at runtime from the repo root (`../data`). The exporter is the most reliable path; direct runtime loading will work in-editor but not in an exported build until you package the data files.
- All faction/unit/rule content stays sourced from your JS data; no manual duplication is needed.
- `Scripts/DataLoader.cs` uses Jint to execute your existing JS data files and map them into C# POCOs. Unknown fields are stored in the `Raw` dictionaries so nothing is lost while you expand the client model.
- The current UI is a thin shell: turn/phase flow, CP refresh, pool display, and an auto-resolve stub. Hook in rendering, card UI, and unit placement as you iterate.

## Next steps

- Map the `gameData` shape into richer C# models (units, cards, commander abilities) and render them in UI.
- Implement board representation (grid/measurement) and unit interactions.
- Wire the fragment/heat/hunger/flow mechanics to UI controls and animations.
- Add save/load of `GameState` for campaign play.
- Build/export templates for Windows/Linux once the above systems are in place.
