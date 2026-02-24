using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using Jint;

namespace Shardborne
{
    public static class DataLoader
    {
        private static readonly JsonSerializerOptions JsonOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            NumberHandling = JsonNumberHandling.AllowReadingFromString,
        };

        public static GameDefinition LoadFromRepo(string repoRoot)
        {
            try
            {
                var engine = new Engine(cfg => cfg.Strict());

                var corePath = Path.Combine(repoRoot, "data", "core.js");
                if (!File.Exists(corePath))
                    throw new FileNotFoundException("core.js not found", corePath);

                var coreSource = File.ReadAllText(corePath);
                // Expose const gameData to globalThis so faction files can mutate it.
                engine.Execute(coreSource + "\n;globalThis.gameData = gameData;");

                var factionDir = Path.Combine(repoRoot, "data", "factions");
                if (Directory.Exists(factionDir))
                {
                    foreach (var file in Directory.GetFiles(factionDir, "*.js"))
                    {
                        var src = File.ReadAllText(file);
                        engine.Execute(src);
                    }
                }

                var raw = engine.GetValue("gameData").ToObject();
                var json = JsonSerializer.Serialize(raw, JsonOptions);
                var definition = JsonSerializer.Deserialize<GameDefinition>(json, JsonOptions) ?? new GameDefinition();

                // Keep raw faction dictionaries for any fields we don't map yet.
                if (raw is IDictionary<string, object?> dict && dict.TryGetValue("factions", out var factionsObj) && factionsObj is IEnumerable<object?> list)
                {
                    var factions = list.ToList();
                    for (var i = 0; i < definition.Factions.Count && i < factions.Count; i++)
                    {
                        if (factions[i] is IDictionary<string, object?> facDict)
                        {
                            definition.Factions[i].Raw = new Dictionary<string, object?>(facDict);
                        }
                    }
                }

                return definition;
            }
            catch (Exception ex)
            {
                return new GameDefinition
                {
                    Version = "fallback",
                    Rules = new Rules
                    {
                        Overview = "Failed to load full data. See log for details.",
                        Version = ex.Message
                    },
                    Factions = new List<Faction>()
                };
            }
        }
    }
}
