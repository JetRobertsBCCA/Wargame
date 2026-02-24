using System;
using System.Collections.Generic;

namespace Shardborne
{
    public enum Phase
    {
        Setup,
        Command,
        Movement,
        Combat,
        End,
        GameOver
    }

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
            if (Phase == Phase.GameOver)
                return;

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
                if (Turn > MaxTurns)
                {
                    Phase = Phase.GameOver;
                    Log.Add("Game over — reached max turns.");
                }
                else
                {
                    ActivePlayer = ActivePlayer == "White" ? "Red" : "White";
                    Turn += ActivePlayer == "White" ? 1 : 0;
                    AddCommandPoints();
                }
            }
        }

        public void NextTurn()
        {
            if (Phase == Phase.GameOver)
                return;

            Phase = Phase.Command;
            Turn += 1;
            ActivePlayer = Turn % 2 == 1 ? "White" : "Red";
            AddCommandPoints();
        }

        private void AddCommandPoints()
        {
            White.CommandPoints += 3;
            Red.CommandPoints += 3;
            Log.Add($"CP refreshed: White {White.CommandPoints}, Red {Red.CommandPoints}");
        }
    }

    public sealed class GameDefinition
    {
        public string Version { get; set; } = "unknown";
        public Rules Rules { get; set; } = new();
        public List<Faction> Factions { get; set; } = new();
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
        public int Morale { get; set; }
        public int Range { get; set; }
        public string Type { get; set; } = string.Empty;
        public Dictionary<string, object?> Raw { get; set; } = new();
    }
}
