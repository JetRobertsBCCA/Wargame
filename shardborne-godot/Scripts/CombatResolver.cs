using System;
using System.Collections.Generic;
using System.Linq;

namespace Shardborne
{
    /// <summary>
    /// Resolves combat between units using Shardborne rules:
    /// Roll ATK dice, each >= DEF is a hit, 6 = crit (always hits, 2 damage).
    /// Also handles morale checks (2d6 <= MOR to pass).
    /// </summary>
    public static class CombatResolver
    {
        private static readonly Random Rng = new();

        /// <summary>
        /// Resolve an attack from attacker → defender.
        /// Applies damage to defender. Returns result summary.
        /// </summary>
        public static CombatResult ResolveAttack(UnitInstance attacker, UnitInstance defender,
            bool isCharging = false, bool isFlanking = false, bool isRearAttack = false)
        {
            var result = new CombatResult();

            // Calculate attack dice
            int atkDice = attacker.EffectiveAtk;

            // Combat modifiers
            if (isCharging) atkDice += 1;
            if (isFlanking) atkDice += 1;
            if (isRearAttack) atkDice += 2;

            atkDice = Math.Max(1, atkDice);
            int defTarget = defender.EffectiveDef;

            result.DiceRolled = atkDice;
            result.DefenseTarget = defTarget;

            // Roll dice
            for (int i = 0; i < atkDice; i++)
            {
                int roll = Rng.Next(1, 7);
                result.Rolls.Add(roll);

                if (roll == 6)
                {
                    // Critical: always hits, 2 damage
                    result.Crits++;
                    result.Hits++;
                }
                else if (roll >= defTarget)
                {
                    result.Hits++;
                }
            }

            // Calculate total damage: normal hits = 1 dmg each, crits = 2 dmg each
            result.TotalDamage = (result.Hits - result.Crits) + (result.Crits * 2);

            // Apply damage to defender
            defender.CurrentHp -= result.TotalDamage;
            if (defender.CurrentHp < 0) defender.CurrentHp = 0;
            defender.DamagedThisTurn = true;

            result.TargetDestroyed = !defender.IsAlive;

            // Build summary
            var rollsStr = string.Join(",", result.Rolls);
            result.Summary = $"{attacker.Name} attacks {defender.Name}: " +
                $"{atkDice}d6 vs DEF {defTarget} → [{rollsStr}] = " +
                $"{result.Hits} hits ({result.Crits} crits), {result.TotalDamage} damage" +
                (result.TargetDestroyed ? " — DESTROYED!" : $" ({defender.CurrentHp}/{defender.MaxHp} HP)");

            return result;
        }

        /// <summary>
        /// Perform a morale check for a unit that took damage this turn.
        /// 2d6 <= MOR to pass. Fail by <3 = Shaken, fail by 3+ = Routed (destroyed).
        /// </summary>
        public static MoraleResult CheckMorale(UnitInstance unit)
        {
            var result = new MoraleResult();
            result.Roll1 = Rng.Next(1, 7);
            result.Roll2 = Rng.Next(1, 7);
            result.Total = result.Roll1 + result.Roll2;
            result.MoraleTarget = unit.BaseMor;

            if (result.Total <= result.MoraleTarget)
            {
                result.Passed = true;
                result.Summary = $"{unit.Name} morale check: {result.Roll1}+{result.Roll2}={result.Total} vs MOR {result.MoraleTarget} — PASSED";
            }
            else
            {
                int failBy = result.Total - result.MoraleTarget;
                if (failBy >= 3)
                {
                    result.Routed = true;
                    unit.CurrentHp = 0; // Destroyed
                    result.Summary = $"{unit.Name} morale check: {result.Roll1}+{result.Roll2}={result.Total} vs MOR {result.MoraleTarget} — ROUTED! (destroyed)";
                }
                else
                {
                    result.Shaken = true;
                    unit.IsShaken = true;
                    result.Summary = $"{unit.Name} morale check: {result.Roll1}+{result.Roll2}={result.Total} vs MOR {result.MoraleTarget} — Shaken! (-1 ATK)";
                }
            }

            return result;
        }

        /// <summary>
        /// Rally attempt for a Shaken unit that wasn't damaged this turn.
        /// 2d6 <= MOR removes Shaken.
        /// </summary>
        public static MoraleResult AttemptRally(UnitInstance unit)
        {
            var result = new MoraleResult();
            result.Roll1 = Rng.Next(1, 7);
            result.Roll2 = Rng.Next(1, 7);
            result.Total = result.Roll1 + result.Roll2;
            result.MoraleTarget = unit.BaseMor;

            if (result.Total <= result.MoraleTarget)
            {
                result.Passed = true;
                unit.IsShaken = false;
                result.Summary = $"{unit.Name} rallies: {result.Roll1}+{result.Roll2}={result.Total} vs MOR {result.MoraleTarget} — Rallied!";
            }
            else
            {
                result.Passed = false;
                result.Summary = $"{unit.Name} rally failed: {result.Roll1}+{result.Roll2}={result.Total} vs MOR {result.MoraleTarget} — Still Shaken";
            }

            return result;
        }

        /// <summary>
        /// Calculate Manhattan distance between two grid positions.
        /// </summary>
        public static int Distance(int x1, int y1, int x2, int y2)
        {
            return Math.Abs(x1 - x2) + Math.Abs(y1 - y2);
        }

        /// <summary>
        /// Calculate Chebyshev distance (diagonal movement allowed).
        /// </summary>
        public static int ChebyshevDistance(int x1, int y1, int x2, int y2)
        {
            return Math.Max(Math.Abs(x1 - x2), Math.Abs(y1 - y2));
        }

        /// <summary>
        /// Check if a target is within attack range of an attacker.
        /// </summary>
        public static bool InRange(UnitInstance attacker, UnitInstance target)
        {
            int dist = ChebyshevDistance(attacker.X, attacker.Y, target.X, target.Y);
            return dist <= attacker.RangeCells;
        }

        /// <summary>
        /// Get all valid cells a unit can move to.
        /// </summary>
        public static List<(int x, int y)> GetValidMoves(UnitInstance unit, MatchState state)
        {
            var moves = new List<(int x, int y)>();
            int range = unit.MoveCells;

            for (int x = 0; x < state.BoardWidth; x++)
            {
                for (int y = 0; y < state.BoardHeight; y++)
                {
                    if (x == unit.X && y == unit.Y) continue;
                    int dist = ChebyshevDistance(unit.X, unit.Y, x, y);
                    if (dist <= range && !state.IsOccupied(x, y))
                    {
                        moves.Add((x, y));
                    }
                }
            }

            return moves;
        }

        /// <summary>
        /// Get all valid attack targets for a unit.
        /// </summary>
        public static List<UnitInstance> GetValidTargets(UnitInstance attacker, MatchState state)
        {
            var targets = new List<UnitInstance>();
            int enemyId = 1 - attacker.PlayerId;

            foreach (var unit in state.GetPlayerUnits(enemyId))
            {
                if (InRange(attacker, unit))
                {
                    targets.Add(unit);
                }
            }

            return targets;
        }
    }
}
