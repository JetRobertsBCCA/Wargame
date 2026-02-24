import fs from "fs";
import path from "path";
import vm from "vm";

// Simple converter: evaluates the existing JS data files and emits JSON for the Godot client.
const repoRoot = path.resolve(process.cwd(), "..");
const corePath = path.join(repoRoot, "data", "core.js");
const factionDir = path.join(repoRoot, "data", "factions");
const outDir = path.join(repoRoot, "shardborne-godot", "Data");
const outFile = path.join(outDir, "game_data.json");

if (!fs.existsSync(corePath)) {
  console.error(`Cannot find ${corePath}`);
  process.exit(1);
}

const context = vm.createContext({ console, gameData: undefined });
const coreSource = fs.readFileSync(corePath, "utf8");
vm.runInContext(`${coreSource}\n;globalThis.gameData = gameData;`, context, {
  filename: "core.js",
});

if (fs.existsSync(factionDir)) {
  for (const file of fs.readdirSync(factionDir)) {
    if (!file.endsWith(".js")) continue;
    const src = fs.readFileSync(path.join(factionDir, file), "utf8");
    vm.runInContext(src, context, { filename: file });
  }
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(context.gameData, null, 2));
console.log(`Exported game_data.json with ${context.gameData?.factions?.length ?? 0} factions to ${outFile}`);
