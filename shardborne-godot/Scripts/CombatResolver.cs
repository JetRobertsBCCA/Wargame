using System;
using System.Collections.Generic;
using System.Linq;

namespace Shardborne
{
    /// <summary>
    /// Full combat resolver implementing Shardborne rules:
    /// Engagement, charging, flanking, cover, keywords, morale, commander aura, etc.
    /// </summary>
    public static class CombatResolver
    {
        private static readonly Random Rng = new();

        // 
        //  ATTACK RESOLUTION
        // 

        /// <summary>
        /// Resolve a full attack from attacker to defender with all modifiers.
        /// </summary>
        public static CombatResult ResolveAttack(UnitInstance attacker, UnitInstance defender,
            MatchState state, bool isCharging = false)
        {
            var result = new CombatResult();
            int atkDice = attacker.EffectiveAtk;
            int defTarget = defender.EffectiveDef;
            bool isRanged = ChebyshevDistance(attacker.X, attacker.Y, defender.X, defender.Y) > 1;
            bool isFirstTurn = state.IsFirstTurn[attacker.PlayerId];
            int critThreshold = 6; // default: only 6 is crit

            //  Attack Modifiers 

            // Charging: moved 2+ cells toward target into melee
            if (isCharging && !isRanged)
            {
                if (attacker.HasSpecial("Devastating Charge"))
                {
                    atkDice += 2;
                    result.Modifiers.Add("Devastating Charge +2");
                }
                else
                {
                    atkDice += 1;
                    result.Modifiers.Add("Charge +1");
                }
            }

            // First turn: ranged attacks get -1 ATK die (not Artillery)
            if (isFirstTurn && isRanged && attacker.UnitType?.ToLowerInvariant() != "artillery")
            {
                atkDice -= 1;
                result.Modifiers.Add("Turn 1 fog -1");
            }

            // First turn: no charging allowed
            if (isFirstTurn && isCharging)
            {
                // Remove the charge bonus we just added
                if (attacker.HasSpecial("Devastating Charge"))
                    atkDice -= 2;
                else
                    atkDice -= 1;
                result.Modifiers.RemoveAll(m => m.Contains("Charge"));
                result.Modifiers.Add("T1 no charge");
            }

            // Veteran: will reroll 1 failed die (handled below)
            bool hasVeteran = attacker.HasSpecial("Veteran");

            // Sharpshot: crits on 5+
            if (attacker.HasSpecial("Sharpshot"))
            {
                critThreshold = 5;
                result.Modifiers.Add("Sharpshot 5+");
            }

            // Spotter: +1 ATK if friendly Artillery also targeting same enemy
            if (attacker.HasSpecial("Spotter"))
            {
                // Check if any friendly artillery has this target in range
                var friendlyArt = state.GetPlayerUnits(attacker.PlayerId)
                    .Where(u => u != attacker && u.UnitType?.ToLowerInvariant() == "artillery" && InRange(u, defender));
                if (friendlyArt.Any())
                {
                    atkDice += 1;
                    result.Modifiers.Add("Spotter +1");
                }
            }

            // Pack Tactics: 2+ Pack Tactics units attacking same enemy
            if (attacker.HasSpecial("Pack Tactics"))
            {
                var packAllies = state.GetPlayerUnits(attacker.PlayerId)
                    .Where(u => u != attacker && u.HasSpecial("Pack Tactics") && InRange(u, defender));
                if (packAllies.Any())
                {
                    atkDice += 1;
                    result.Modifiers.Add("Pack Tactics +1");
                }
            }

            // Anti-Air: +1 ATK vs Fly targets
            if (attacker.HasSpecial("Anti-Air") && defender.HasSpecial("Fly") && !defender.IsGrounded)
            {
                atkDice += 1;
                result.Modifiers.Add("Anti-Air +1");
            }

            // Elevation: +1 ATK for ranged from elevated terrain
            if (isRanged && state.GetTerrain(attacker.X, attacker.Y) == TerrainType.Elevated)
            {
                atkDice += 1;
                result.Modifiers.Add("Elevated +1");
            }

            //  Defense Modifiers 

            // Cover: +1 DEF vs ranged if defender in cover/forest/ruins terrain
            if (isRanged)
            {
                var defTerrain = state.GetTerrain(defender.X, defender.Y);
                if (defTerrain == TerrainType.Cover || defTerrain == TerrainType.Forest || defTerrain == TerrainType.Ruins)
                {
                    defTarget += 1;
                    result.Modifiers.Add("Cover +1 DEF");
                }
            }

            // Anti-Air: Fly targets -1 DEF vs this unit's ranged
            if (isRanged && attacker.HasSpecial("Anti-Air") && defender.HasSpecial("Fly") && !defender.IsGrounded)
            {
                defTarget -= 1;
                result.Modifiers.Add("Fly exposed -1 DEF");
            }

            // Armor Piercing: -1 DEF
            if (attacker.HasSpecial("Armor Piercing"))
            {
                defTarget -= 1;
                result.Modifiers.Add("Armor Pierce -1 DEF");
            }

            // Elevated defender: +1 DEF in melee
            if (!isRanged && state.GetTerrain(defender.X, defender.Y) == TerrainType.Elevated)
            {
                defTarget += 1;
                result.Modifiers.Add("Elevated DEF +1");
            }

            // Hold Ground: +1 DEF if unit didn't move
            if (defender.DidNotMoveThisTurn && defender.HasSpecial("Hold Ground"))
            {
                defTarget += 1;
                result.Modifiers.Add("Hold Ground +1 DEF");
            }

            // DEF cap
            if (defender.UnitType?.ToLowerInvariant() != "war machine")
                defTarget = Math.Min(defTarget, 6);

            atkDice = Math.Max(1, atkDice);
            defTarget = Math.Max(2, defTarget);

            result.DiceRolled = atkDice;
            result.DefenseTarget = defTarget;

            //  Roll Dice 
            bool veteranUsed = false;
            for (int i = 0; i < atkDice; i++)
            {
                int roll = Rng.Next(1, 7);

                // Veteran: reroll 1 failed die
                if (hasVeteran && !veteranUsed && roll < defTarget && roll < critThreshold)
                {
                    roll = Rng.Next(1, 7);
                    veteranUsed = true;
                    result.Modifiers.Add("Veteran reroll");
                }

                result.Rolls.Add(roll);

                if (roll >= critThreshold)
                {
                    result.Crits++;
                    result.Hits++;
                }
                else if (roll >= defTarget)
                {
                    result.Hits++;
                }
            }

            // Calculate damage: normal hits=1, crits=2
            result.TotalDamage = (result.Hits - result.Crits) + (result.Crits * 2);

            // Heavy Armor: reduce damage by 1 (min 1)
            if (defender.HasSpecial("Heavy Armor") && result.TotalDamage > 1)
            {
                result.TotalDamage -= 1;
                result.Modifiers.Add("Heavy Armor -1 dmg");
            }

            // Swarm: takes only 1 dmg from any single source
            if (defender.HasSpecial("Swarm") && result.TotalDamage > 1)
            {
                result.TotalDamage = 1;
                result.Modifiers.Add("Swarm: max 1 dmg");
            }

            // Dodge: melee, 5+ on d6 = miss once per attack
            if (!isRanged && defender.HasSpecial("Dodge") && result.TotalDamage > 0)
            {
                int dodgeRoll = Rng.Next(1, 7);
                if (dodgeRoll >= 5)
                {
                    result.TotalDamage = Math.Max(0, result.TotalDamage - 1);
                    result.Modifiers.Add($"Dodge! (rolled {dodgeRoll})");
                }
            }

            // Apply damage
            defender.CurrentHp -= result.TotalDamage;
            if (defender.CurrentHp < 0) defender.CurrentHp = 0;
            defender.DamagedThisTurn = true;
            result.TargetDestroyed = !defender.IsAlive;

            // Blood Drain: heal 1 HP on melee kill
            if (!isRanged && result.TargetDestroyed && attacker.HasSpecial("Blood Drain"))
            {
                if (attacker.CurrentHp < attacker.MaxHp)
                {
                    attacker.CurrentHp++;
                    result.Modifiers.Add("Blood Drain +1 HP");
                }
            }

            // Build summary
            var rollsStr = string.Join(",", result.Rolls);
            var modsStr = result.Modifiers.Count > 0 ? $" [{string.Join(", ", result.Modifiers)}]" : "";
            result.Summary = $"{attacker.Name} attacks {defender.Name}: " +
                $"{atkDice}d6 vs DEF {defTarget} [{rollsStr}] = " +
                $"{result.Hits} hits ({result.Crits} crits), {result.TotalDamage} dmg" +
                (result.TargetDestroyed ? " DESTROYED!" : $" ({defender.CurrentHp}/{defender.MaxHp})") +
                modsStr;

            return result;
        }

        /// <summary>
        /// Simplified overload for backward compatibility (no state context).
        /// </summary>
        public static CombatResult ResolveAttack(UnitInstance attacker, UnitInstance defender)
        {
            // Create a minimal state context
            var tempState = new MatchState();
            return ResolveAttack(attacker, defender, tempState, false);
        }

        // 
        //  MORALE
        // 

        /// <summary>
        /// Morale check: 2d6, if > MOR = Shaken, if > MOR+3 = Routed.
        /// Commander aura gives +1 MOR. Fearless auto-passes.
        /// </summary>
        public static MoraleResult CheckMorale(UnitInstance unit, MatchState state)
        {
            var result = new MoraleResult();

            // Fearless/Thrall auto-pass
            if (unit.IsFearless || unit.HasSpecial("Thrall"))
            {
                result.Passed = true;
                result.Summary = $"{unit.Name} morale: auto-pass (Fearless)";
                return result;
            }

            result.Roll1 = Rng.Next(1, 7);
            result.Roll2 = Rng.Next(1, 7);
            result.Total = result.Roll1 + result.Roll2;

            int mor = unit.BaseMor;

            // Commander Aura: +1 MOR if within 3 cells of own commander
            if (state.InCommanderAura(unit))
                mor += 1;

            // Terror Aura: -1 MOR if enemy with Terror Aura within ~2 cells
            int enemyId = 1 - unit.PlayerId;
            foreach (var e in state.GetPlayerUnits(enemyId))
            {
                if (e.HasSpecial("Terror Aura") || e.HasSpecial("Terrifying"))
                {
                    int dist = ChebyshevDistance(unit.X, unit.Y, e.X, e.Y);
                    if (dist <= 2)
                    {
                        mor -= 1;
                        break;
                    }
                }
            }

            // Commander dead: -2 MOR for this check
            if (state.Players[unit.PlayerId].CommanderDead)
                mor -= 2;

            // Last Stand Protocol: 3 or fewer units remaining = +1 MOR
            if (state.GetPlayerUnits(unit.PlayerId).Count <= 3)
                mor += 1;

            result.MoraleTarget = mor;

            if (result.Total <= mor)
            {
                result.Passed = true;
                result.Summary = $"{unit.Name} morale: {result.Roll1}+{result.Roll2}={result.Total} vs MOR {mor} PASSED";
            }
            else
            {
                int failBy = result.Total - mor;

                // Stubborn: reroll once
                if (unit.HasSpecial("Stubborn"))
                {
                    result.Roll1 = Rng.Next(1, 7);
                    result.Roll2 = Rng.Next(1, 7);
                    result.Total = result.Roll1 + result.Roll2;
                    failBy = result.Total - mor;
                    if (result.Total <= mor)
                    {
                        result.Passed = true;
                        result.Summary = $"{unit.Name} morale: Stubborn reroll {result.Roll1}+{result.Roll2}={result.Total} vs MOR {mor} PASSED";
                        return result;
                    }
                }

                if (failBy >= 3)
                {
                    result.Routed = true;
                    unit.CurrentHp = 0;
                    result.Summary = $"{unit.Name} morale: {result.Roll1}+{result.Roll2}={result.Total} vs MOR {mor} ROUTED!";
                }
                else
                {
                    result.Shaken = true;
                    unit.IsShaken = true;
                    result.Summary = $"{unit.Name} morale: {result.Roll1}+{result.Roll2}={result.Total} vs MOR {mor} Shaken!";
                }
            }

            return result;
        }

        /// <summary>
        /// Legacy overload for backward compat.
        /// </summary>
        public static MoraleResult CheckMorale(UnitInstance unit)
        {
            return CheckMorale(unit, new MatchState());
        }

        /// <summary>
        /// Rally check: 2d6 <= MOR to remove Shaken.
        /// </summary>
        public static MoraleResult AttemptRally(UnitInstance unit, MatchState? state = null)
        {
            var result = new MoraleResult();

            if (unit.IsFearless)
            {
                result.Passed = true;
                unit.IsShaken = false;
                result.Summary = $"{unit.Name} auto-rallies (Fearless)";
                return result;
            }

            result.Roll1 = Rng.Next(1, 7);
            result.Roll2 = Rng.Next(1, 7);
            result.Total = result.Roll1 + result.Roll2;

            int mor = unit.BaseMor;
            if (state != null && state.InCommanderAura(unit))
                mor += 1;

            result.MoraleTarget = mor;

            if (result.Total <= mor)
            {
                result.Passed = true;
                unit.IsShaken = false;
                result.Summary = $"{unit.Name} rallies: {result.Roll1}+{result.Roll2}={result.Total} vs MOR {mor} Rallied!";
            }
            else
            {
                result.Passed = false;
                result.Summary = $"{unit.Name} rally failed: {result.Roll1}+{result.Roll2}={result.Total} vs MOR {mor} Still Shaken";
            }

            return result;
        }

        // 
        //  MOVEMENT & ENGAGEMENT
        // 

        /// <summary>
        /// Get valid moves for a unit, considering terrain and engagement.
        /// </summary>
        public static List<(int x, int y)> GetValidMoves(UnitInstance unit, MatchState state)
        {
            var moves = new List<(int x, int y)>();
            int range = unit.MoveCells;

            // Immovable: cannot move
            if (unit.HasSpecial("Immovable")) return moves;

            // Engaged units: can disengage (move 1 cell away, costs full move)
            // Or if they have Phase, can move through
            bool hasPhase = unit.HasSpecial("Phase");
            bool hasFly = (unit.HasSpecial("Fly") && !unit.IsGrounded);

            if (unit.IsEngaged && !hasPhase)
            {
                // Disengage: can only move 1 cell away from enemies
                for (int dx = -1; dx <= 1; dx++)
                {
                    for (int dy = -1; dy <= 1; dy++)
                    {
                        if (dx == 0 && dy == 0) continue;
                        int nx = unit.X + dx;
                        int ny = unit.Y + dy;
                        if (!state.InBounds(nx, ny)) continue;
                        if (state.IsOccupied(nx, ny)) continue;
                        var terrain = state.GetTerrain(nx, ny);
                        if (terrain == TerrainType.Impassable) continue;
                        // Only valid if moving AWAY from all enemies
                        bool movesAway = true;
                        foreach (var e in state.GetPlayerUnits(1 - unit.PlayerId))
                        {
                            int oldDist = ChebyshevDistance(unit.X, unit.Y, e.X, e.Y);
                            int newDist = ChebyshevDistance(nx, ny, e.X, e.Y);
                            if (newDist < oldDist) { movesAway = false; break; }
                        }
                        if (movesAway) moves.Add((nx, ny));
                    }
                }
                return moves;
            }

            // Normal movement
            bool allTerrain = unit.HasSpecial("All-Terrain");

            for (int x = 0; x < state.BoardWidth; x++)
            {
                for (int y = 0; y < state.BoardHeight; y++)
                {
                    if (x == unit.X && y == unit.Y) continue;
                    int dist = ChebyshevDistance(unit.X, unit.Y, x, y);

                    var terrain = state.GetTerrain(x, y);

                    // Impassable
                    if (terrain == TerrainType.Impassable) continue;

                    // Difficult terrain: costs 2 movement per cell
                    bool isDifficult = terrain == TerrainType.DifficultTerrain ||
                                       terrain == TerrainType.Forest ||
                                       terrain == TerrainType.Ruins ||
                                       terrain == TerrainType.Water;

                    int effectiveRange = range;
                    if (isDifficult && !allTerrain && !hasFly)
                    {
                        effectiveRange = Math.Max(1, range / 2);
                    }

                    if (dist > effectiveRange) continue;
                    if (state.IsOccupied(x, y)) continue;

                    moves.Add((x, y));
                }
            }

            return moves;
        }

        /// <summary>
        /// Get valid attack targets for a unit, considering engagement and stealth.
        /// </summary>
        public static List<UnitInstance> GetValidTargets(UnitInstance attacker, MatchState state)
        {
            var targets = new List<UnitInstance>();
            int enemyId = 1 - attacker.PlayerId;

            // Non-Combatant can't attack
            if (attacker.HasSpecial("Non-Combatant")) return targets;

            // Immobile: can't move and attack same turn
            if (attacker.HasSpecial("Immobile") && attacker.MovedThisTurn) return targets;

            bool isEngaged = attacker.IsEngaged;
            bool isRanged = !attacker.IsMelee;

            foreach (var unit in state.GetPlayerUnits(enemyId))
            {
                int dist = ChebyshevDistance(attacker.X, attacker.Y, unit.X, unit.Y);

                // Engaged units can only attack adjacent (melee)
                if (isEngaged && dist > 1) continue;

                // Engaged units can't make ranged attacks
                if (isEngaged && isRanged && dist > 1) continue;

                // Normal range check
                if (dist > attacker.RangeCells) continue;

                // Stealthed targets: can't be targeted by ranged beyond 3 cells
                if (unit.IsStealthed && dist > 3 && isRanged) continue;

                // Indirect Fire: can target without LoS but not engaged units
                // (simplified - no full LoS system)

                targets.Add(unit);
            }

            return targets;
        }

        /// <summary>
        /// Detect if a move constitutes a charge (2+ cells toward an enemy, ending adjacent).
        /// </summary>
        public static bool IsChargeMove(UnitInstance unit, int toX, int toY, MatchState state)
        {
            if (unit.BaseRng > 4) return false; // Ranged units don't charge

            int moveDist = ChebyshevDistance(unit.X, unit.Y, toX, toY);
            if (moveDist < 2) return false; // Must move 2+ cells (= 5"+)

            // Check if destination is adjacent to an enemy
            int enemyId = 1 - unit.PlayerId;
            foreach (var e in state.GetPlayerUnits(enemyId))
            {
                int dist = ChebyshevDistance(toX, toY, e.X, e.Y);
                if (dist <= 1) return true;
            }
            return false;
        }

        // 
        //  DISTANCE & RANGE
        // 

        public static int Distance(int x1, int y1, int x2, int y2)
            => Math.Abs(x1 - x2) + Math.Abs(y1 - y2);

        public static int ChebyshevDistance(int x1, int y1, int x2, int y2)
            => Math.Max(Math.Abs(x1 - x2), Math.Abs(y1 - y2));

        public static bool InRange(UnitInstance attacker, UnitInstance target)
        {
            int dist = ChebyshevDistance(attacker.X, attacker.Y, target.X, target.Y);
            return dist <= attacker.RangeCells;
        }

        // 
        //  END PHASE EFFECTS
        // 

        /// <summary>
        /// Process end-phase effects: burning damage, repair/heal, status cleanup.
        /// </summary>
        public static List<string> ProcessEndPhaseEffects(MatchState state)
        {
            var logs = new List<string>();

            foreach (var unit in state.GetLivingUnits().ToList())
            {
                // Burning: 1 damage
                if (unit.IsBurning)
                {
                    if (unit.HasSpecial("Fire Resistant"))
                    {
                        logs.Add($"{unit.Name} resists fire (Fire Resistant)");
                    }
                    else if (unit.HasSpecial("Fire Immune"))
                    {
                        logs.Add($"{unit.Name} immune to fire");
                        unit.IsBurning = false;
                    }
                    else
                    {
                        unit.CurrentHp -= 1;
                        if (unit.CurrentHp < 0) unit.CurrentHp = 0;
                        logs.Add($"{unit.Name} takes 1 burning damage ({unit.CurrentHp}/{unit.MaxHp})");
                        if (!unit.IsAlive)
                            logs.Add($"  {unit.Name} destroyed by fire!");
                    }
                }

                // Repair/Heal: restore 1 HP to adjacent friendly
                if (unit.IsAlive && (unit.HasSpecial("Repair") || unit.HasSpecial("Heal")))
                {
                    var adjacent = state.GetPlayerUnits(unit.PlayerId)
                        .Where(u => u != unit && u.CurrentHp < u.MaxHp &&
                            ChebyshevDistance(unit.X, unit.Y, u.X, u.Y) <= 1)
                        .OrderBy(u => (float)u.CurrentHp / u.MaxHp)
                        .FirstOrDefault();
                    if (adjacent != null)
                    {
                        adjacent.CurrentHp = Math.Min(adjacent.MaxHp, adjacent.CurrentHp + 1);
                        logs.Add($"{unit.Name} heals {adjacent.Name} (+1 HP, now {adjacent.CurrentHp}/{adjacent.MaxHp})");
                    }
                }

                // Staggered clears at end of turn
                if (unit.IsStaggered)
                {
                    unit.IsStaggered = false;
                    logs.Add($"{unit.Name} recovers from stagger");
                }

                // Stealth: lost on attacking, but re-apply if innate and didn't attack
                if (!unit.IsStealthed && !unit.AttackedThisTurn &&
                    (unit.HasSpecial("Stealth") || unit.HasSpecial("Shadow Meld")))
                {
                    unit.IsStealthed = true;
                    logs.Add($"{unit.Name} re-enters stealth");
                }
            }

            return logs;
        }

        // 
        //  TERRAIN GENERATION
        // 

        /// <summary>
        /// Generate random terrain on the board. Places 8-12 terrain features.
        /// Avoids deployment zones (top 3 rows, bottom 3 rows).
        /// </summary>
        public static void GenerateTerrain(MatchState state)
        {
            // Clear terrain
            for (int x = 0; x < state.BoardWidth; x++)
                for (int y = 0; y < state.BoardHeight; y++)
                    state.Terrain[x, y] = TerrainType.Open;

            int numFeatures = Rng.Next(8, 13);
            var terrainTypes = new[] {
                TerrainType.Cover, TerrainType.Cover,
                TerrainType.DifficultTerrain,
                TerrainType.Elevated, TerrainType.Elevated,
                TerrainType.Forest, TerrainType.Forest,
                TerrainType.Ruins, TerrainType.Ruins,
                TerrainType.Impassable,
                TerrainType.Water
            };

            for (int i = 0; i < numFeatures; i++)
            {
                var type = terrainTypes[Rng.Next(terrainTypes.Length)];
                // Place in middle area (rows 3-6) to avoid deployment zones
                int cx = Rng.Next(1, state.BoardWidth - 1);
                int cy = Rng.Next(3, state.BoardHeight - 3);

                state.Terrain[cx, cy] = type;

                // Some terrain features are 2-3 cells
                if (Rng.Next(3) > 0)
                {
                    int dx = Rng.Next(-1, 2);
                    int dy = Rng.Next(-1, 2);
                    int nx = cx + dx;
                    int ny = cy + dy;
                    if (state.InBounds(nx, ny) && ny >= 3 && ny < state.BoardHeight - 3)
                        state.Terrain[nx, ny] = type;
                }
            }

            // Place objectives if needed
            state.Objectives.Clear();
            if (state.Victory == VictoryMode.ObjectiveControl)
            {
                state.Objectives.Add((state.BoardWidth / 4, state.BoardHeight / 2));
                state.Objectives.Add((state.BoardWidth / 2, state.BoardHeight / 2));
                state.Objectives.Add((3 * state.BoardWidth / 4, state.BoardHeight / 2));
            }
            else if (state.Victory == VictoryMode.KingOfTheHill)
            {
                state.Objectives.Add((state.BoardWidth / 2, state.BoardHeight / 2));
            }

            // Make sure objectives are on open terrain
            foreach (var (ox, oy) in state.Objectives)
            {
                if (state.InBounds(ox, oy))
                    state.Terrain[ox, oy] = TerrainType.Open;
            }
        }
    }
}