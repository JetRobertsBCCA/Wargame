using System;
using System.Collections.Generic;
using System.Linq;

namespace Shardborne
{
    /// <summary>
    /// Simple AI controller that makes tactical decisions during its turn.
    /// Strategy: move toward nearest enemy, attack best available target.
    /// </summary>
    public sealed class AIController
    {
        private readonly Random _rng = new();

        /// <summary>
        /// Execute the full AI turn: movement phase then combat phase.
        /// Returns a list of log messages describing actions taken.
        /// </summary>
        public List<string> ExecuteMovementPhase(MatchState state, int playerId)
        {
            var logs = new List<string>();
            var units = state.GetPlayerUnits(playerId)
                .Where(u => !u.MovedThisTurn)
                .OrderByDescending(u => u.IsCommander) // Move commander last (protect)
                .ThenByDescending(u => u.BaseAtk)
                .ToList();

            foreach (var unit in units)
            {
                var action = DecideMoveTarget(unit, state);
                if (action.HasValue)
                {
                    var (tx, ty) = action.Value;
                    unit.X = tx;
                    unit.Y = ty;
                    unit.MovedThisTurn = true;
                    logs.Add($"AI moves {unit.Name} to ({tx},{ty})");
                }
                else
                {
                    unit.MovedThisTurn = true;
                    logs.Add($"AI holds {unit.Name} at ({unit.X},{unit.Y})");
                }
            }

            return logs;
        }

        public List<string> ExecuteCombatPhase(MatchState state, int playerId)
        {
            var logs = new List<string>();
            var units = state.GetPlayerUnits(playerId)
                .Where(u => !u.AttackedThisTurn)
                .OrderByDescending(u => u.BaseAtk)
                .ToList();

            foreach (var unit in units)
            {
                var targets = CombatResolver.GetValidTargets(unit, state);
                if (targets.Count == 0)
                {
                    unit.AttackedThisTurn = true;
                    continue;
                }

                // Priority: commander > low HP > highest value
                var target = PickBestTarget(targets);
                var result = CombatResolver.ResolveAttack(unit, target);
                unit.AttackedThisTurn = true;
                logs.Add(result.Summary);

                if (result.TargetDestroyed)
                {
                    state.Players[playerId].Kills++;
                    state.Players[playerId].VictoryPoints += target.IsCommander ? 10 : 1;
                    logs.Add($"  → {target.Name} destroyed! +{(target.IsCommander ? 10 : 1)} VP");
                }
            }

            return logs;
        }

        public (int x, int y)? DecideMoveTarget(UnitInstance unit, MatchState state)
        {
            int enemyId = 1 - unit.PlayerId;
            var enemies = state.GetPlayerUnits(enemyId);
            if (enemies.Count == 0) return null;

            // Find nearest enemy
            UnitInstance? nearest = null;
            int bestDist = int.MaxValue;
            foreach (var e in enemies)
            {
                int d = CombatResolver.ChebyshevDistance(unit.X, unit.Y, e.X, e.Y);
                if (d < bestDist || (d == bestDist && e.IsCommander))
                {
                    bestDist = d;
                    nearest = e;
                }
            }

            if (nearest == null) return null;

            // If already in attack range, don't move (unless melee and not adjacent)
            if (CombatResolver.InRange(unit, nearest) && !unit.IsMelee)
                return null;
            if (unit.IsMelee && bestDist <= 1)
                return null;

            // Move toward nearest enemy
            var validMoves = CombatResolver.GetValidMoves(unit, state);
            if (validMoves.Count == 0) return null;

            // Pick the move that gets closest to the nearest enemy
            (int x, int y) bestMove = validMoves[0];
            int bestMoveDist = int.MaxValue;

            foreach (var (mx, my) in validMoves)
            {
                int d = CombatResolver.ChebyshevDistance(mx, my, nearest.X, nearest.Y);

                // For ranged units, try to stay at range (not too close)
                if (!unit.IsMelee && d >= 1 && d <= unit.RangeCells)
                {
                    // In range — prefer this
                    if (d < bestMoveDist || bestMoveDist > unit.RangeCells)
                    {
                        bestMoveDist = d;
                        bestMove = (mx, my);
                    }
                }
                else if (d < bestMoveDist)
                {
                    bestMoveDist = d;
                    bestMove = (mx, my);
                }
            }

            // Only move if it improves position
            if (bestMoveDist < bestDist)
                return bestMove;

            // Commander: stay back if possible
            if (unit.IsCommander && bestDist > 3)
                return null;

            return bestMove;
        }

        public UnitInstance PickBestTarget(List<UnitInstance> targets)
        {
            // Priority: low HP killable > commander > highest point value
            var killable = targets
                .Where(t => t.CurrentHp <= 3)
                .OrderBy(t => t.CurrentHp)
                .FirstOrDefault();
            if (killable != null) return killable;

            var commander = targets.FirstOrDefault(t => t.IsCommander);
            if (commander != null) return commander;

            return targets.OrderByDescending(t => t.PointsCost).First();
        }
    }
}
