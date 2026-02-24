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

                // Parse the JSON document for manual extraction
                using var doc = JsonDocument.Parse(json);
                var root = doc.RootElement;

                var definition = new GameDefinition();

                // ── Rules ──
                if (root.TryGetProperty("rules", out var rulesEl))
                {
                    definition.Rules = new Rules
                    {
                        Version = GetString(rulesEl, "version"),
                        Overview = GetString(rulesEl, "overview")
                    };
                    definition.Version = definition.Rules.Version;

                    // Extract sample army lists
                    if (rulesEl.TryGetProperty("army_building", out var ab) &&
                        ab.TryGetProperty("sample_army_lists", out var sal) &&
                        sal.TryGetProperty("lists", out var lists))
                    {
                        foreach (var listEl in lists.EnumerateArray())
                        {
                            definition.SampleArmies.Add(new SampleArmyList
                            {
                                Faction = GetString(listEl, "faction"),
                                Commander = GetString(listEl, "commander"),
                                TotalPoints = GetInt(listEl, "total_points"),
                                Units = GetString(listEl, "units"),
                                Strategy = GetString(listEl, "strategy")
                            });
                        }
                    }
                }

                // ── Factions ──
                if (root.TryGetProperty("factions", out var factionsEl))
                {
                    foreach (var fEl in factionsEl.EnumerateArray())
                    {
                        definition.Factions.Add(new Faction
                        {
                            Id = GetString(fEl, "id"),
                            Name = GetString(fEl, "name"),
                            Icon = GetString(fEl, "icon"),
                            Color = GetString(fEl, "color")
                        });
                    }
                }

                // ── Commanders ──
                if (root.TryGetProperty("commanders", out var cmdrsEl))
                {
                    foreach (var cEl in cmdrsEl.EnumerateArray())
                    {
                        var cmd = new Commander
                        {
                            Name = GetString(cEl, "name"),
                            Faction = GetString(cEl, "faction"),
                            Title = GetString(cEl, "title"),
                            PointsCost = GetInt(cEl, "points_cost")
                        };

                        if (cEl.TryGetProperty("battle_stats", out var bs))
                        {
                            cmd.Atk = GetInt(bs, "ATK");
                            cmd.Def = GetInt(bs, "DEF");
                            cmd.Hp = GetInt(bs, "HP");
                            cmd.Mov = GetInt(bs, "MOV");
                            cmd.Rng = GetInt(bs, "RNG");
                            cmd.Mor = GetInt(bs, "MOR");
                        }

                        if (cEl.TryGetProperty("base_stats", out var bss))
                        {
                            cmd.Command = GetInt(bss, "Command");
                        }

                        definition.Commanders.Add(cmd);
                    }
                }

                // ── Units ──
                if (root.TryGetProperty("units", out var unitsEl))
                {
                    foreach (var uEl in unitsEl.EnumerateArray())
                    {
                        var unit = new UnitTemplate
                        {
                            Name = GetString(uEl, "name"),
                            Faction = GetString(uEl, "faction"),
                            PointsCost = GetInt(uEl, "points_cost"),
                            Type = GetString(uEl, "type"),
                            Description = GetString(uEl, "description")
                        };

                        if (uEl.TryGetProperty("stats", out var st))
                        {
                            unit.Atk = GetInt(st, "ATK");
                            unit.Def = GetInt(st, "DEF");
                            unit.Hp = GetInt(st, "HP");
                            unit.Mov = GetInt(st, "MOV");
                            unit.Rng = GetInt(st, "RNG");
                            unit.Mor = GetInt(st, "MOR");
                        }

                        if (uEl.TryGetProperty("special", out var specEl) && specEl.ValueKind == JsonValueKind.Array)
                        {
                            foreach (var s in specEl.EnumerateArray())
                                unit.Special.Add(s.GetString() ?? "");
                        }

                        definition.UnitTemplates.Add(unit);
                    }
                }

                // ── Fragments ──
                if (root.TryGetProperty("fragments", out var fragsEl))
                {
                    foreach (var fEl in fragsEl.EnumerateArray())
                    {
                        definition.Fragments.Add(new Fragment
                        {
                            Name = GetString(fEl, "name"),
                            Faction = GetString(fEl, "faction"),
                            Effects = GetString(fEl, "effects"),
                            ActivationCost = GetInt(fEl, "activation_cost")
                        });
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
                        Overview = "Failed to load. " + ex.Message,
                        Version = ex.Message
                    }
                };
            }
        }

        private static string GetString(JsonElement el, string prop)
        {
            if (el.TryGetProperty(prop, out var v) && v.ValueKind == JsonValueKind.String)
                return v.GetString() ?? "";
            return "";
        }

        private static int GetInt(JsonElement el, string prop)
        {
            if (!el.TryGetProperty(prop, out var v)) return 0;
            if (v.ValueKind == JsonValueKind.Number) return v.GetInt32();
            if (v.ValueKind == JsonValueKind.String && int.TryParse(v.GetString(), out var n)) return n;
            return 0;
        }
    }
}
