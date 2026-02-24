using System;
using System.Collections.Generic;
using System.Linq;

namespace Shardborne
{
    // ───── Enums ─────

    public enum Phase
    {
        Setup, Command, Movement, Combat, End, GameOver
    }

    public enum GameMode { VsAI, VsFriend }

    public enum MatchPhase
    {
        FactionSelect, Deployment, Command, Movement, Combat, EndPhase, GameOver
    }

    public enum InputMode
    {
        None, SelectUnit, SelectMoveTarget, SelectAttackTarget
    }

    // ───── Legacy State (kept for faction browser) ─────

    public sealed class ResourcePools
    {
        public int Heat { get; set; }
        public int Hunger { get; set; }
        public int Flow { get; set; }
        public int FateThreads { get; set; }
        public int Anchors { get; set; }
        public int FragmentCharges { get; set; }
        public string Stance { get; set; } = "none";
    }

    public sealed class PlayerState
    {
        public string Name { get; set; } = string.Empty;
        public int CommandPoints { get; set; }
        public int Fragments { get; set; }
        public int VictoryPoints { get; set; }
        public int Kills { get; set; }
    }

    public sealed class GameState
    {
        public int Turn { get; set; } = 1;
        public Phase Phase { get; set; } = Phase.Setup;
        public string ActivePlayer { get; set; } = "White";
        public int MaxTurns { get; set; } = 6;
        public PlayerState White { get; } = new() { Name = "White" };
        public PlayerState Red { get; } = new() { Name = "Red" };
        public ResourcePools Pools { get; } = new();
        public List<string> Log { get; } = new();

        public void NextPhase()
        {
            if (Phase == Phase.GameOver) return;
            Phase = Phase switch
            {
                Phase.Setup => Phase.Command,
                Phase.Command => Phase.Movement,
                Phase.Movement => Phase.Combat,
                Phase.Combat => Phase.End,
                Phase.End => Phase.Command,
                _ => Phase
            };
            if (Phase == Phase.Command)
            {
                if (Turn > MaxTurns) { Phase = Phase.GameOver; Log.Add("Game over."); }
                else { ActivePlayer = ActivePlayer == "White" ? "Red" : "White"; Turn += ActivePlayer == "White" ? 1 : 0; AddCommandPoints(); }
            }
        }

        public void NextTurn()
        {
            if (Phase == Phase.GameOver) return;
            Phase = Phase.Command; Turn += 1;
            ActivePlayer = Turn % 2 == 1 ? "White" : "Red";
            AddCommandPoints();
        }

        private void AddCommandPoints()
        {
            White.CommandPoints += 3; Red.CommandPoints += 3;
            Log.Add($"CP refreshed: White {White.CommandPoints}, Red {Red.CommandPoints}");
        }
    }

    // ───── Data Models (deserialized from game data JS files) ─────

    public sealed class GameDefinition
    {
        public string Version { get; set; } = "unknown";
        public Rules Rules { get; set; } = new();
        public List<Faction> Factions { get; set; } = new();
        public List<Commander> Commanders { get; set; } = new();
        public List<UnitTemplate> UnitTemplates { get; set; } = new();
        public List<Fragment> Fragments { get; set; } = new();
        public List<SampleArmyList> SampleArmies { get; set; } = new();

        public List<Commander> GetCommandersForFaction(string factionId)
            => Commanders.Where(c => c.Faction == factionId).ToList();
        public List<UnitTemplate> GetUnitsForFaction(string factionId)
            => UnitTemplates.Where(u => u.Faction == factionId).ToList();
        public UnitTemplate? FindUnit(string factionId, string name)
            => UnitTemplates.FirstOrDefault(u =>
                u.Faction == factionId &&
                u.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
        public Commander? FindCommander(string factionId, string partialName)
            => Commanders.FirstOrDefault(c =>
                c.Faction == factionId &&
                c.Name.Contains(partialName, StringComparison.OrdinalIgnoreCase));
    }

    public sealed class Rules
    {
        public string Overview { get; set; } = string.Empty;
        public string Version { get; set; } = string.Empty;
    }

    public sealed class Faction
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public List<Unit> Units { get; set; } = new();
        public Dictionary<string, object?> Raw { get; set; } = new();
    }

    public sealed class Unit
    {
        public string Name { get; set; } = string.Empty;
        public int Points { get; set; }
        public int Atk { get; set; }
        public int Def { get; set; }
        public int Hp { get; set; }
        public int Mov { get; set; }
        public int Morale { get; set; }
        public int Range { get; set; }
        public string Type { get; set; } = string.Empty;
        public Dictionary<string, object?> Raw { get; set; } = new();
    }

    public sealed class Commander
    {
        public string Name { get; set; } = string.Empty;
        public string Faction { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public int PointsCost { get; set; }
        public int Atk { get; set; }
        public int Def { get; set; }
        public int Hp { get; set; }
        public int Mov { get; set; }
        public int Rng { get; set; }
        public int Mor { get; set; }
        public int Command { get; set; }
    }

    public sealed class UnitTemplate
    {
        public string Name { get; set; } = string.Empty;
        public string Faction { get; set; } = string.Empty;
        public int PointsCost { get; set; }
        public string Type { get; set; } = string.Empty;
        public int Atk { get; set; }
        public int Def { get; set; }
        public int Hp { get; set; }
        public int Mov { get; set; }
        public int Rng { get; set; }
        public int Mor { get; set; }
        public List<string> Special { get; set; } = new();
        public string Description { get; set; } = string.Empty;
    }

    public sealed class Fragment
    {
        public string Name { get; set; } = string.Empty;
        public string Faction { get; set; } = string.Empty;
        public string Effects { get; set; } = string.Empty;
        public int ActivationCost { get; set; }
    }

    public sealed class SampleArmyList
    {
        public string Faction { get; set; } = string.Empty;
        public string Commander { get; set; } = string.Empty;
        public int TotalPoints { get; set; }
        public string Units { get; set; } = string.Empty;
        public string Strategy { get; set; } = string.Empty;
    }

    // ───── Match Runtime Models ─────

    public sealed class UnitInstance
    {
        public string InstanceId { get; set; } = Guid.NewGuid().ToString("N")[..8];
        public string Name { get; set; } = string.Empty;
        public string FactionId { get; set; } = string.Empty;
        public string UnitType { get; set; } = string.Empty;
        public int PlayerId { get; set; }
        public int X { get; set; }
        public int Y { get; set; }

        // Base stats
        public int BaseAtk { get; set; }
        public int BaseDef { get; set; }
        public int MaxHp { get; set; }
        public int BaseMov { get; set; }
        public int BaseRng { get; set; }
        public int BaseMor { get; set; }
        public int PointsCost { get; set; }

        // Current state
        public int CurrentHp { get; set; }
        public bool IsCommander { get; set; }
        public int CommandStat { get; set; }
        public bool MovedThisTurn { get; set; }
        public bool AttackedThisTurn { get; set; }
        public bool IsShaken { get; set; }
        public bool DamagedThisTurn { get; set; }
        public List<string> Specials { get; set; } = new();

        // Computed
        public bool IsAlive => CurrentHp > 0;
        public bool IsMelee => BaseRng <= 4;
        public int MoveCells => Math.Max(1, BaseMov / 3);
        public int RangeCells => BaseRng <= 1 ? 1 : Math.Max(1, BaseRng / 3);
        public int EffectiveAtk => Math.Max(1, BaseAtk + (IsShaken ? -1 : 0));
        public int EffectiveDef => BaseDef;

        public string ShortLabel
        {
            get
            {
                if (IsCommander) return "★";
                return (UnitType?.ToLowerInvariant() ?? "") switch
                {
                    "infantry" => "In",
                    "cavalry" => "Cv",
                    "support" => "Sp",
                    "artillery" => "Ar",
                    "scout" => "Sc",
                    "specialist" => "Sx",
                    "war machine" => "WM",
                    _ => Name.Length >= 2 ? Name[..2] : "??"
                };
            }
        }

        public static UnitInstance FromTemplate(UnitTemplate t, int playerId)
        {
            return new UnitInstance
            {
                Name = t.Name, FactionId = t.Faction, UnitType = t.Type,
                PlayerId = playerId,
                BaseAtk = t.Atk, BaseDef = t.Def, MaxHp = t.Hp, CurrentHp = t.Hp,
                BaseMov = t.Mov, BaseRng = t.Rng, BaseMor = t.Mor,
                PointsCost = t.PointsCost,
                Specials = new List<string>(t.Special),
                IsCommander = false
            };
        }

        public static UnitInstance FromCommander(Commander c, int playerId)
        {
            return new UnitInstance
            {
                Name = c.Name, FactionId = c.Faction, UnitType = "Commander",
                PlayerId = playerId,
                BaseAtk = c.Atk, BaseDef = c.Def, MaxHp = c.Hp, CurrentHp = c.Hp,
                BaseMov = c.Mov, BaseRng = c.Rng, BaseMor = c.Mor,
                PointsCost = c.PointsCost,
                IsCommander = true, CommandStat = c.Command
            };
        }
    }

    public sealed class MatchPlayer
    {
        public int PlayerId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string FactionId { get; set; } = string.Empty;
        public string FactionName { get; set; } = string.Empty;
        public string FactionIcon { get; set; } = string.Empty;
        public Godot.Color FactionColor { get; set; } = new(0.5f, 0.5f, 0.5f);
        public int CommandPoints { get; set; }
        public int VictoryPoints { get; set; }
        public int Kills { get; set; }
        public bool IsAI { get; set; }
        public Commander? Commander { get; set; }
    }

    public sealed class CombatResult
    {
        public int DiceRolled { get; set; }
        public int DefenseTarget { get; set; }
        public List<int> Rolls { get; set; } = new();
        public int Hits { get; set; }
        public int Crits { get; set; }
        public int TotalDamage { get; set; }
        public bool TargetDestroyed { get; set; }
        public string Summary { get; set; } = string.Empty;
    }

    public sealed class MoraleResult
    {
        public int Roll1 { get; set; }
        public int Roll2 { get; set; }
        public int Total { get; set; }
        public int MoraleTarget { get; set; }
        public bool Passed { get; set; }
        public bool Shaken { get; set; }
        public bool Routed { get; set; }
        public string Summary { get; set; } = string.Empty;
    }

    public sealed class MatchState
    {
        public GameMode Mode { get; set; }
        public MatchPhase Phase { get; set; } = MatchPhase.FactionSelect;
        public InputMode Input { get; set; } = InputMode.None;
        public int Turn { get; set; } = 1;
        public int MaxTurns { get; set; } = 5;
        public int ActivePlayerId { get; set; } = 0;
        public int BoardWidth { get; set; } = 12;
        public int BoardHeight { get; set; } = 10;

        public MatchPlayer[] Players { get; set; } = new MatchPlayer[2];
        public List<UnitInstance> AllUnits { get; set; } = new();
        public UnitInstance? SelectedUnit { get; set; }
        public List<(int x, int y)> ValidMoves { get; set; } = new();
        public List<UnitInstance> ValidTargets { get; set; } = new();
        public List<string> Log { get; set; } = new();
        public string? Winner { get; set; }

        public MatchPlayer ActivePlayer => Players[ActivePlayerId];
        public MatchPlayer InactivePlayer => Players[1 - ActivePlayerId];

        public MatchState()
        {
            Players[0] = new MatchPlayer { PlayerId = 0, Name = "Player 1" };
            Players[1] = new MatchPlayer { PlayerId = 1, Name = "Player 2" };
        }

        public UnitInstance? GetUnitAt(int x, int y)
            => AllUnits.FirstOrDefault(u => u.IsAlive && u.X == x && u.Y == y);
        public List<UnitInstance> GetPlayerUnits(int playerId)
            => AllUnits.Where(u => u.IsAlive && u.PlayerId == playerId).ToList();
        public List<UnitInstance> GetLivingUnits()
            => AllUnits.Where(u => u.IsAlive).ToList();
        public bool IsOccupied(int x, int y)
            => AllUnits.Any(u => u.IsAlive && u.X == x && u.Y == y);
        public bool InBounds(int x, int y)
            => x >= 0 && x < BoardWidth && y >= 0 && y < BoardHeight;

        public void AddLog(string msg)
        {
            Log.Add($"[T{Turn}] {msg}");
            if (Log.Count > 200) Log.RemoveAt(0);
        }
    }
}
