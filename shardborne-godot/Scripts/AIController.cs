using System;
using System.Collections.Generic;
using System.Linq;

namespace Shardborne
{
    /// <summary>
    /// Tactical AI controller with engagement awareness, charging, terrain consideration,
    /// and keyword-aware targeting. Makes intelligent decisions during its turn phases.
    /// </summary>
    public sealed class AIController
    {
        private readonly Random _rng = new();

        // 
        //  MOVEMENT PHASE
        // 

        public List<string> ExecuteMovementPhase(MatchState state, int playerId)
        {
            var logs = new List<string>();
            var units = state.GetPlayerUnits(playerId)
                .Where(u => !u.MovedThisTurn)
                .OrderByDescending(u => u.IsCommander)
                .ThenByDescending(u => u.BaseAtk)
                .ToList();

            foreach (var unit in units)
            {
                var action = DecideMoveTarget(unit, state);
                if (action.HasValue)
                {
                    var (tx, ty) = action.Value;
                    unit.PrevX = unit.X;
                    unit.PrevY = unit.Y;
                    
                    // Check for charge
                    bool charged = CombatResolver.IsChargeMove(unit, tx, ty, state);
                    
                    // Check for disengage
                    bool disengaged = unit.IsEngaged;
                    
                    unit.X = tx;
                    unit.Y = ty;
                    unit.MovedThisTurn = true;
                    unit.DidNotMoveThisTurn = false;
                    
                    if (charged && !state.IsFirstTurn[playerId])
                    {
                        unit.HasCharged = true;
                        logs.Add($"AI charges {unit.Name} to ({tx},{ty})!");
                    }
                    else if (disengaged)
                    {
                        unit.DisengagedThisTurn = true;
                        logs.Add($"AI disengages {unit.Name} to ({tx},{ty})");
                    }
                    else
                    {
                        logs.Add($"AI moves {unit.Name} to ({tx},{ty})");
                    }
                }
                else
                {
                    unit.MovedThisTurn = true;
                    unit.DidNotMoveThisTurn = true;
                    logs.Add($"AI holds {unit.Name} at ({unit.X},{unit.Y})");
                }
            }

            // Refresh engagement after all moves
            state.RefreshEngagement();
            return logs;
        }

        // 
        //  COMBAT PHASE
        // 

        public List<string> ExecuteCombatPhase(MatchState state, int playerId)
        {
            var logs = new List<string>();
            var units = state.GetPlayerUnits(playerId)
                .Where(u => !u.AttackedThisTurn)
                .OrderByDescending(u => u.BaseAtk)
                .ToList();

            foreach (var unit in units)
            {
                // Skip units that disengaged (can't attack after disengage)
                if (unit.DisengagedThisTurn) 
                {
                    unit.AttackedThisTurn = true;
                    continue;
                }

                var targets = CombatResolver.GetValidTargets(unit, state);
                if (targets.Count == 0)
                {
                    unit.AttackedThisTurn = true;
                    continue;
                }

                var target = PickBestTarget(targets);
                bool isCharging = unit.HasCharged;
                var result = CombatResolver.ResolveAttack(unit, target, state, isCharging);
                unit.AttackedThisTurn = true;
                
                // Stealth: lost on attacking
                if (unit.IsStealthed) unit.IsStealthed = false;
                
                logs.Add(result.Summary);

                // Double Strike: attack again
                if (unit.HasSpecial("Double Strike") && target.IsAlive)
                {
                    var result2 = CombatResolver.ResolveAttack(unit, target, state, false);
                    logs.Add($"  Double Strike: {result2.Summary}");
                    if (result2.TargetDestroyed)
                    {
                        state.Players[playerId].Kills++;
                        state.Players[playerId].VictoryPoints += target.PointsCost;
                    }
                }

                if (result.TargetDestroyed)
                {
                    state.Players[playerId].Kills++;
                    state.Players[playerId].VictoryPoints += target.PointsCost;
                    logs.Add($"  {target.Name} destroyed! +{target.PointsCost} VP");
                    
                    // Check if commander killed
                    if (target.IsCommander)
                        state.Players[1 - playerId].CommanderDead = true;
                }
            }

            state.RefreshEngagement();
            return logs;
        }

        // 
        //  DECISION MAKING
        // 

        public (int x, int y)? DecideMoveTarget(UnitInstance unit, MatchState state)
        {
            int enemyId = 1 - unit.PlayerId;
            var enemies = state.GetPlayerUnits(enemyId);
            if (enemies.Count == 0) return null;

            var validMoves = CombatResolver.GetValidMoves(unit, state);
            if (validMoves.Count == 0) return null;

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

            // Try to find a charge opportunity (melee units, 2+ cells to adjacent)
            if (unit.IsMelee && !state.IsFirstTurn[unit.PlayerId])
            {
                foreach (var (mx, my) in validMoves)
                {
                    if (CombatResolver.IsChargeMove(unit, mx, my, state))
                    {
                        // Check if the charge target is a good target
                        foreach (var e in enemies)
                        {
                            if (CombatResolver.ChebyshevDistance(mx, my, e.X, e.Y) <= 1)
                                return (mx, my);
                        }
                    }
                }
            }

            // Pick the move that gets closest to the nearest enemy
            (int x, int y) bestMove = validMoves[0];
            int bestMoveDist = int.MaxValue;

            foreach (var (mx, my) in validMoves)
            {
                int d = CombatResolver.ChebyshevDistance(mx, my, nearest.X, nearest.Y);

                // Prefer cover terrain for ranged units
                if (!unit.IsMelee)
                {
                    var terrain = state.GetTerrain(mx, my);
                    bool hasCover = terrain == TerrainType.Cover || terrain == TerrainType.Forest || terrain == TerrainType.Ruins;
                    
                    if (d >= 1 && d <= unit.RangeCells)
                    {
                        // In range - prefer covered positions
                        int score = d * 10 + (hasCover ? -5 : 0);
                        if (score < bestMoveDist || bestMoveDist > unit.RangeCells * 10)
                        {
                            bestMoveDist = score;
                            bestMove = (mx, my);
                        }
                        continue;
                    }
                }

                if (d < bestMoveDist)
                {
                    bestMoveDist = d;
                    bestMove = (mx, my);
                }
            }

            // Only move if it improves position
            if (bestMoveDist < bestDist || (unit.IsMelee && bestMoveDist <= bestDist))
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