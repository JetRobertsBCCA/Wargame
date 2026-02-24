using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Godot;

namespace Shardborne
{
    /// <summary>
    /// Main game scene — handles board rendering, player input, game phases,
    /// army setup, and AI turns. This is where the full match is played.
    /// </summary>
    public partial class GameScene : Control
    {
        // ── Constants ──
        private const int CellSize = 52;
        private const int BoardOffsetX = 280;
        private const int BoardOffsetY = 60;

        // ── State ──
        private MatchState _match = new();
        private GameDefinition _data = new();
        private AIController _ai = new();
        private int _factionSelectPlayer = 0; // Which player is selecting
        private bool _aiProcessing = false;
        private float _aiTimer = 0f;
        private Queue<Action> _pendingAiActions = new(); // queued actions with visual updates

        // ── UI References (built in _Ready) ──
        private Label? _statusLabel;
        private Label? _phaseLabel;
        private RichTextLabel? _unitInfoLabel;
        private RichTextLabel? _logLabel;
        private Button? _endPhaseBtn;
        private Button? _endTurnBtn;
        private Button? _backBtn;
        private VBoxContainer? _factionSelectPanel;
        private Control? _boardControl;
        private Label? _instructionLabel;
        private VBoxContainer? _factionButtonsP1;
        private VBoxContainer? _factionButtonsP2;
        private Label? _p1SelectLabel;
        private Label? _p2SelectLabel;
        private Button? _startGameBtn;
        private Button? _playAgainBtn;
        private string _p1Faction = "";
        private string _p2Faction = "";

        // ── Hover state ──
        private UnitInstance? _hoveredUnit;
        private Vector2 _mousePos;

        // ── Board Colors ──
        private static readonly Color CellLight = new(0.18f, 0.20f, 0.22f);
        private static readonly Color CellDark = new(0.14f, 0.16f, 0.18f);
        private static readonly Color P1Color = new(0.2f, 0.4f, 0.9f);
        private static readonly Color P2Color = new(0.9f, 0.25f, 0.2f);
        private static readonly Color P1CmdrColor = new(0.3f, 0.5f, 1.0f);
        private static readonly Color P2CmdrColor = new(1.0f, 0.35f, 0.3f);
        private static readonly Color SelectedColor = new(1.0f, 0.85f, 0.0f);
        private static readonly Color MoveHighlight = new(0.0f, 0.8f, 0.2f, 0.35f);
        private static readonly Color AttackHighlight = new(1.0f, 0.0f, 0.0f, 0.35f);
        private static readonly Color DeployZoneP1 = new(0.2f, 0.3f, 0.6f, 0.15f);
        private static readonly Color DeployZoneP2 = new(0.6f, 0.2f, 0.2f, 0.15f);

        public override void _Ready()
        {
            // Load game data
            var projectRoot = ProjectSettings.GlobalizePath("res://");
            var repoRoot = Path.GetFullPath(Path.Combine(projectRoot, ".."));
            _data = DataLoader.LoadFromRepo(repoRoot);

            BuildUI();
            ShowFactionSelect();
        }

        public override void _Process(double delta)
        {
            // Process AI actions with a small delay for readability
            if (_aiProcessing)
            {
                _aiTimer -= (float)delta;
                if (_aiTimer <= 0 && _pendingAiActions.Count > 0)
                {
                    var action = _pendingAiActions.Dequeue();
                    action.Invoke();
                    UpdateUI();
                    QueueRedraw();
                    _aiTimer = 0.2f;
                }
                else if (_pendingAiActions.Count == 0)
                {
                    _aiProcessing = false;
                    FinishAiTurn();
                }
            }
        }

        // ═══════════════════════════════════════════
        //  UI CONSTRUCTION
        // ═══════════════════════════════════════════

        private void BuildUI()
        {
            // Background
            var bg = new ColorRect();
            bg.Color = new Color(0.08f, 0.09f, 0.10f);
            bg.SetAnchorsPreset(LayoutPreset.FullRect);
            AddChild(bg);

            // ── Top Bar ──
            var topBar = new HBoxContainer();
            topBar.Position = new Vector2(10, 8);
            topBar.AddThemeConstantOverride("separation", 20);
            AddChild(topBar);

            _statusLabel = new Label { Text = "SHARDBORNE" };
            _statusLabel.AddThemeFontSizeOverride("font_size", 20);
            topBar.AddChild(_statusLabel);

            _phaseLabel = new Label { Text = "" };
            _phaseLabel.AddThemeFontSizeOverride("font_size", 16);
            topBar.AddChild(_phaseLabel);

            // ── Board area (custom draw) ──
            _boardControl = new Control();
            _boardControl.Position = new Vector2(BoardOffsetX, BoardOffsetY);
            _boardControl.Size = new Vector2(_match.BoardWidth * CellSize + 2, _match.BoardHeight * CellSize + 2);
            AddChild(_boardControl);

            // ── Left Panel (Unit Info + Actions) ──
            var leftPanel = new VBoxContainer();
            leftPanel.Position = new Vector2(10, BoardOffsetY);
            leftPanel.Size = new Vector2(260, 500);
            leftPanel.AddThemeConstantOverride("separation", 8);
            AddChild(leftPanel);

            _instructionLabel = new Label { Text = "" };
            _instructionLabel.AddThemeFontSizeOverride("font_size", 13);
            _instructionLabel.AutowrapMode = TextServer.AutowrapMode.WordSmart;
            _instructionLabel.CustomMinimumSize = new Vector2(255, 40);
            leftPanel.AddChild(_instructionLabel);

            _unitInfoLabel = new RichTextLabel();
            _unitInfoLabel.BbcodeEnabled = true;
            _unitInfoLabel.FitContent = true;
            _unitInfoLabel.CustomMinimumSize = new Vector2(255, 200);
            _unitInfoLabel.ScrollActive = true;
            leftPanel.AddChild(_unitInfoLabel);

            var btnRow = new HBoxContainer();
            btnRow.AddThemeConstantOverride("separation", 6);
            leftPanel.AddChild(btnRow);

            _endPhaseBtn = new Button { Text = "End Phase" };
            _endPhaseBtn.Pressed += OnEndPhase;
            _endPhaseBtn.CustomMinimumSize = new Vector2(120, 36);
            btnRow.AddChild(_endPhaseBtn);

            _endTurnBtn = new Button { Text = "End Turn" };
            _endTurnBtn.Pressed += OnEndTurn;
            _endTurnBtn.CustomMinimumSize = new Vector2(120, 36);
            btnRow.AddChild(_endTurnBtn);

            _backBtn = new Button { Text = "← Back to Menu" };
            _backBtn.Pressed += OnBackToMenu;
            _backBtn.CustomMinimumSize = new Vector2(250, 32);
            leftPanel.AddChild(_backBtn);

            _playAgainBtn = new Button { Text = "⟳ Play Again" };
            _playAgainBtn.Pressed += OnPlayAgain;
            _playAgainBtn.CustomMinimumSize = new Vector2(250, 36);
            _playAgainBtn.Visible = false;
            leftPanel.AddChild(_playAgainBtn);

            // ── Log Panel (bottom) ──
            _logLabel = new RichTextLabel();
            _logLabel.BbcodeEnabled = true;
            _logLabel.ScrollActive = true;
            _logLabel.ScrollFollowing = true;
            _logLabel.Position = new Vector2(10, BoardOffsetY + _match.BoardHeight * CellSize + 20);
            _logLabel.Size = new Vector2(BoardOffsetX + _match.BoardWidth * CellSize + 10,
                                         160);
            AddChild(_logLabel);

            // ── Faction Selection Panel (overlay) ──
            BuildFactionSelectPanel();
        }

        private void BuildFactionSelectPanel()
        {
            _factionSelectPanel = new VBoxContainer();
            _factionSelectPanel.Position = new Vector2(60, 60);
            _factionSelectPanel.Size = new Vector2(900, 500);
            _factionSelectPanel.AddThemeConstantOverride("separation", 12);
            AddChild(_factionSelectPanel);

            var title = new Label { Text = "SELECT FACTIONS" };
            title.AddThemeFontSizeOverride("font_size", 24);
            title.HorizontalAlignment = HorizontalAlignment.Center;
            _factionSelectPanel.AddChild(title);

            var row = new HBoxContainer();
            row.AddThemeConstantOverride("separation", 40);
            _factionSelectPanel.AddChild(row);

            // P1 Column
            var p1Col = new VBoxContainer();
            p1Col.AddThemeConstantOverride("separation", 6);
            p1Col.CustomMinimumSize = new Vector2(380, 0);
            row.AddChild(p1Col);

            _p1SelectLabel = new Label { Text = "Player 1 — Pick a Faction:" };
            _p1SelectLabel.AddThemeFontSizeOverride("font_size", 16);
            p1Col.AddChild(_p1SelectLabel);

            _factionButtonsP1 = new VBoxContainer();
            _factionButtonsP1.AddThemeConstantOverride("separation", 4);
            p1Col.AddChild(_factionButtonsP1);

            // P2 Column
            var p2Col = new VBoxContainer();
            p2Col.AddThemeConstantOverride("separation", 6);
            p2Col.CustomMinimumSize = new Vector2(380, 0);
            row.AddChild(p2Col);

            _p2SelectLabel = new Label { Text = "Player 2 — Pick a Faction:" };
            _p2SelectLabel.AddThemeFontSizeOverride("font_size", 16);
            p2Col.AddChild(_p2SelectLabel);

            _factionButtonsP2 = new VBoxContainer();
            _factionButtonsP2.AddThemeConstantOverride("separation", 4);
            p2Col.AddChild(_factionButtonsP2);

            // Start button
            _startGameBtn = new Button { Text = "START GAME", Disabled = true };
            _startGameBtn.CustomMinimumSize = new Vector2(300, 48);
            _startGameBtn.Pressed += OnStartGame;
            _factionSelectPanel.AddChild(_startGameBtn);

            // Populate faction buttons
            foreach (var fac in _data.Factions)
            {
                var cmdrs = _data.GetCommandersForFaction(fac.Id);
                var units = _data.GetUnitsForFaction(fac.Id);
                var label = $"{fac.Icon} {fac.Name} ({cmdrs.Count} cmdrs, {units.Count} units)";

                var btn1 = new Button { Text = label };
                var facId = fac.Id;
                var facName = fac.Name;
                var facIcon = fac.Icon;
                var facColor = fac.Color;
                btn1.Pressed += () => OnFactionPicked(0, facId, facName, facIcon, facColor);
                btn1.CustomMinimumSize = new Vector2(370, 36);
                _factionButtonsP1?.AddChild(btn1);

                var btn2 = new Button { Text = label };
                btn2.Pressed += () => OnFactionPicked(1, facId, facName, facIcon, facColor);
                btn2.CustomMinimumSize = new Vector2(370, 36);
                _factionButtonsP2?.AddChild(btn2);
            }
        }

        // ═══════════════════════════════════════════
        //  FACTION SELECTION
        // ═══════════════════════════════════════════

        private void ShowFactionSelect()
        {
            if (_factionSelectPanel != null) _factionSelectPanel.Visible = true;
            if (_endPhaseBtn != null) _endPhaseBtn.Visible = false;
            if (_endTurnBtn != null) _endTurnBtn.Visible = false;
            _match.Phase = MatchPhase.FactionSelect;

            if (_match.Mode == GameMode.VsAI && _p2SelectLabel != null)
            {
                _p2SelectLabel.Text = "AI Faction:";
            }
        }

        private void OnFactionPicked(int playerId, string facId, string facName, string facIcon, string facColorHex)
        {
            if (playerId == 0)
            {
                _p1Faction = facId;
                _match.Players[0].FactionId = facId;
                _match.Players[0].FactionName = facName;
                _match.Players[0].FactionIcon = facIcon;
                _match.Players[0].FactionColor = ParseColor(facColorHex);
                if (_p1SelectLabel != null) _p1SelectLabel.Text = $"Player 1: {facIcon} {facName} ✓";
            }
            else
            {
                _p2Faction = facId;
                _match.Players[1].FactionId = facId;
                _match.Players[1].FactionName = facName;
                _match.Players[1].FactionIcon = facIcon;
                _match.Players[1].FactionColor = ParseColor(facColorHex);
                if (_p2SelectLabel != null) _p2SelectLabel.Text = $"Player 2: {facIcon} {facName} ✓";
            }

            if (_startGameBtn != null)
                _startGameBtn.Disabled = string.IsNullOrEmpty(_p1Faction) || string.IsNullOrEmpty(_p2Faction);
        }

        // ═══════════════════════════════════════════
        //  GAME START & ARMY BUILDING
        // ═══════════════════════════════════════════

        private void OnStartGame()
        {
            if (_factionSelectPanel != null) _factionSelectPanel.Visible = false;
            if (_endPhaseBtn != null) _endPhaseBtn.Visible = true;
            if (_endTurnBtn != null) _endTurnBtn.Visible = true;

            // Build armies from sample lists or auto-generate
            BuildArmy(0, _p1Faction);
            BuildArmy(1, _p2Faction);

            // Deploy units
            AutoDeploy();

            // Start game
            _match.Phase = MatchPhase.Command;
            _match.Turn = 1;
            _match.ActivePlayerId = 0;

            // Generate initial CP
            var p1Cmdr = _match.AllUnits.FirstOrDefault(u => u.PlayerId == 0 && u.IsCommander);
            var p2Cmdr = _match.AllUnits.FirstOrDefault(u => u.PlayerId == 1 && u.IsCommander);
            _match.Players[0].CommandPoints = p1Cmdr?.CommandStat ?? 5;
            _match.Players[1].CommandPoints = p2Cmdr?.CommandStat ?? 5;

            _match.AddLog($"=== GAME START ===");
            _match.AddLog($"P1: {_match.Players[0].FactionIcon} {_match.Players[0].FactionName} ({_match.GetPlayerUnits(0).Count} units)");
            _match.AddLog($"P2: {_match.Players[1].FactionIcon} {_match.Players[1].FactionName} ({_match.GetPlayerUnits(1).Count} units)");
            _match.AddLog($"Turn 1 — Command Phase — {_match.ActivePlayer.Name}'s turn");
            _match.Input = InputMode.None;

            UpdateUI();
            QueueRedraw();
        }

        private void BuildArmy(int playerId, string factionId)
        {
            _match.Players[playerId].FactionId = factionId;

            // Try to find a sample army list
            var sample = _data.SampleArmies.FirstOrDefault(s =>
                s.Faction.Contains(GetFactionDisplayName(factionId), StringComparison.OrdinalIgnoreCase));

            if (sample != null)
            {
                BuildArmyFromSample(playerId, factionId, sample);
            }
            else
            {
                BuildDefaultArmy(playerId, factionId);
            }
        }

        private void BuildArmyFromSample(int playerId, string factionId, SampleArmyList sample)
        {
            // Parse commander name from "Ashborn Ryx (18 pts)" format
            var cmdrName = sample.Commander.Split('(')[0].Trim();
            var cmdr = _data.FindCommander(factionId, cmdrName);
            if (cmdr != null)
            {
                _match.Players[playerId].Commander = cmdr;
                var cmdrUnit = UnitInstance.FromCommander(cmdr, playerId);
                _match.AllUnits.Add(cmdrUnit);
            }

            // Parse units from "Flameborn Guard ×2, Emberforged Blades, ..." format
            var unitEntries = sample.Units.Split(',').Select(s => s.Trim()).ToList();
            foreach (var entry in unitEntries)
            {
                // Skip war machine markers and parse count
                var clean = entry.Replace("(WM)", "").Trim();
                int count = 1;
                if (clean.Contains("×"))
                {
                    var parts = clean.Split('×');
                    clean = parts[0].Trim();
                    if (parts.Length > 1 && int.TryParse(parts[1].Trim(), out var c))
                        count = c;
                }

                var template = _data.FindUnit(factionId, clean);
                if (template != null)
                {
                    for (int i = 0; i < count; i++)
                    {
                        _match.AllUnits.Add(UnitInstance.FromTemplate(template, playerId));
                    }
                }
            }

            // If we got too few units, fill with basic infantry
            var playerUnits = _match.GetPlayerUnits(playerId);
            if (playerUnits.Count < 5)
            {
                FillWithBasicUnits(playerId, factionId, 8 - playerUnits.Count);
            }
        }

        private void BuildDefaultArmy(int playerId, string factionId)
        {
            // Pick first commander
            var cmdrs = _data.GetCommandersForFaction(factionId);
            if (cmdrs.Count > 0)
            {
                var cmdr = cmdrs[0];
                _match.Players[playerId].Commander = cmdr;
                _match.AllUnits.Add(UnitInstance.FromCommander(cmdr, playerId));
            }

            // Pick a balanced army: infantry first, then mixed
            var allUnits = _data.GetUnitsForFaction(factionId);
            int budget = 55; // after commander ~20pts, total ~75
            int spent = 0;

            // Infantry first
            var infantry = allUnits.Where(u => u.Type.Equals("Infantry", StringComparison.OrdinalIgnoreCase))
                .OrderBy(u => u.PointsCost).ToList();
            foreach (var u in infantry)
            {
                if (spent + u.PointsCost > budget) continue;
                _match.AllUnits.Add(UnitInstance.FromTemplate(u, playerId));
                spent += u.PointsCost;
                // Maybe add a second copy of cheap units
                if (u.PointsCost <= 3 && spent + u.PointsCost <= budget)
                {
                    _match.AllUnits.Add(UnitInstance.FromTemplate(u, playerId));
                    spent += u.PointsCost;
                }
            }

            // Support
            var support = allUnits.Where(u => u.Type.Equals("Support", StringComparison.OrdinalIgnoreCase))
                .OrderBy(u => u.PointsCost).Take(2).ToList();
            foreach (var u in support)
            {
                if (spent + u.PointsCost <= budget)
                {
                    _match.AllUnits.Add(UnitInstance.FromTemplate(u, playerId));
                    spent += u.PointsCost;
                }
            }

            // Cavalry/scouts
            var fast = allUnits.Where(u =>
                u.Type.Equals("Cavalry", StringComparison.OrdinalIgnoreCase) ||
                u.Type.Equals("Scout", StringComparison.OrdinalIgnoreCase))
                .OrderBy(u => u.PointsCost).Take(2).ToList();
            foreach (var u in fast)
            {
                if (spent + u.PointsCost <= budget)
                {
                    _match.AllUnits.Add(UnitInstance.FromTemplate(u, playerId));
                    spent += u.PointsCost;
                }
            }

            // Fill remaining with cheapest
            FillWithBasicUnits(playerId, factionId, Math.Max(0, 8 - _match.GetPlayerUnits(playerId).Count));
        }

        private void FillWithBasicUnits(int playerId, string factionId, int count)
        {
            var cheapest = _data.GetUnitsForFaction(factionId)
                .Where(u => u.Type.Equals("Infantry", StringComparison.OrdinalIgnoreCase))
                .OrderBy(u => u.PointsCost)
                .FirstOrDefault();

            if (cheapest != null)
            {
                for (int i = 0; i < count; i++)
                    _match.AllUnits.Add(UnitInstance.FromTemplate(cheapest, playerId));
            }
        }

        private void AutoDeploy()
        {
            // P1 deploys in bottom rows (y = boardHeight-3 to boardHeight-1)
            // P2 deploys in top rows (y = 0 to 2)
            var p1Units = _match.AllUnits.Where(u => u.PlayerId == 0).ToList();
            var p2Units = _match.AllUnits.Where(u => u.PlayerId == 1).ToList();

            DeployUnits(p1Units, _match.BoardHeight - 3, _match.BoardHeight - 1);
            DeployUnits(p2Units, 0, 2);
        }

        private void DeployUnits(List<UnitInstance> units, int minY, int maxY)
        {
            int idx = 0;
            // Place commander in center
            var cmdr = units.FirstOrDefault(u => u.IsCommander);
            if (cmdr != null)
            {
                cmdr.X = _match.BoardWidth / 2;
                cmdr.Y = (minY + maxY) / 2;
                idx++;
            }

            var nonCmdrs = units.Where(u => !u.IsCommander).ToList();
            int placed = 0;
            for (int y = minY; y <= maxY && placed < nonCmdrs.Count; y++)
            {
                for (int x = 0; x < _match.BoardWidth && placed < nonCmdrs.Count; x++)
                {
                    if (!_match.IsOccupied(x, y))
                    {
                        nonCmdrs[placed].X = x;
                        nonCmdrs[placed].Y = y;
                        placed++;
                    }
                }
            }
        }

        // ═══════════════════════════════════════════
        //  GAME PHASE MANAGEMENT
        // ═══════════════════════════════════════════

        private void OnEndPhase()
        {
            if (_match.Phase == MatchPhase.GameOver) return;
            if (_aiProcessing) return;

            switch (_match.Phase)
            {
                case MatchPhase.Command:
                    StartMovementPhase();
                    break;
                case MatchPhase.Movement:
                    StartCombatPhase();
                    break;
                case MatchPhase.Combat:
                    StartEndPhase();
                    break;
                case MatchPhase.EndPhase:
                    StartNextTurn();
                    break;
            }
        }

        private void OnEndTurn()
        {
            if (_match.Phase == MatchPhase.GameOver || _aiProcessing) return;
            StartEndPhase();
        }

        private void StartMovementPhase()
        {
            _match.Phase = MatchPhase.Movement;
            _match.Input = InputMode.SelectUnit;
            _match.SelectedUnit = null;
            _match.ValidMoves.Clear();
            _match.ValidTargets.Clear();

            // Reset movement flags
            foreach (var u in _match.GetPlayerUnits(_match.ActivePlayerId))
                u.MovedThisTurn = false;

            _match.AddLog($"— Movement Phase —");

            // If AI turn, auto-execute
            if (_match.ActivePlayer.IsAI)
            {
                ExecuteAiPhase();
                return;
            }

            UpdateUI();
            QueueRedraw();
        }

        private void StartCombatPhase()
        {
            _match.Phase = MatchPhase.Combat;
            _match.Input = InputMode.SelectUnit;
            _match.SelectedUnit = null;
            _match.ValidMoves.Clear();
            _match.ValidTargets.Clear();

            // Reset attack flags
            foreach (var u in _match.GetPlayerUnits(_match.ActivePlayerId))
                u.AttackedThisTurn = false;

            _match.AddLog($"— Combat Phase —");

            if (_match.ActivePlayer.IsAI)
            {
                ExecuteAiPhase();
                return;
            }

            UpdateUI();
            QueueRedraw();
        }

        private void StartEndPhase()
        {
            _match.Phase = MatchPhase.EndPhase;
            _match.Input = InputMode.None;
            _match.SelectedUnit = null;
            _match.ValidMoves.Clear();
            _match.ValidTargets.Clear();

            _match.AddLog($"— End Phase —");

            // Morale checks for damaged units
            var activeUnits = _match.GetPlayerUnits(_match.ActivePlayerId);
            foreach (var unit in activeUnits.ToList())
            {
                // Skip dead units
                if (!unit.IsAlive) continue;

                // Morale check for units damaged this turn
                if (unit.DamagedThisTurn)
                {
                    var result = CombatResolver.CheckMorale(unit);
                    _match.AddLog(result.Summary);
                    if (result.Routed)
                    {
                        _match.Players[1 - _match.ActivePlayerId].Kills++;
                    }
                }
                // Rally attempt for shaken units not damaged
                else if (unit.IsShaken)
                {
                    var result = CombatResolver.AttemptRally(unit);
                    _match.AddLog(result.Summary);
                }
            }

            // Also check morale for defending player's damaged units
            var defendingUnits = _match.GetPlayerUnits(1 - _match.ActivePlayerId);
            foreach (var unit in defendingUnits.ToList())
            {
                if (!unit.IsAlive) continue;
                if (unit.DamagedThisTurn)
                {
                    var result = CombatResolver.CheckMorale(unit);
                    _match.AddLog(result.Summary);
                    if (result.Routed)
                    {
                        _match.Players[_match.ActivePlayerId].Kills++;
                    }
                }
                else if (unit.IsShaken)
                {
                    var result = CombatResolver.AttemptRally(unit);
                    _match.AddLog(result.Summary);
                }
            }

            // Reset damage flags
            foreach (var u in _match.AllUnits)
                u.DamagedThisTurn = false;

            // Check victory conditions
            CheckVictory();

            UpdateUI();
            QueueRedraw();
        }

        private void StartNextTurn()
        {
            if (_match.Phase == MatchPhase.GameOver) return;

            // Switch active player
            _match.ActivePlayerId = 1 - _match.ActivePlayerId;

            // If switching back to player 0, increment turn
            if (_match.ActivePlayerId == 0)
                _match.Turn++;

            if (_match.Turn > _match.MaxTurns)
            {
                EndGame();
                return;
            }

            // Command phase — generate CP
            _match.Phase = MatchPhase.Command;
            _match.Input = InputMode.None;

            var cmdr = _match.AllUnits.FirstOrDefault(u =>
                u.PlayerId == _match.ActivePlayerId && u.IsCommander && u.IsAlive);
            int cpGain = cmdr?.CommandStat ?? 3;
            _match.ActivePlayer.CommandPoints = cpGain; // CP doesn't carry over

            _match.AddLog($"=== Turn {_match.Turn} — {_match.ActivePlayer.Name} ({_match.ActivePlayer.FactionIcon} {_match.ActivePlayer.FactionName}) ===");
            _match.AddLog($"Command Phase: +{cpGain} CP");

            // Reset per-turn flags
            foreach (var u in _match.GetPlayerUnits(_match.ActivePlayerId))
            {
                u.MovedThisTurn = false;
                u.AttackedThisTurn = false;
            }

            UpdateUI();
            QueueRedraw();

            // If AI turn, auto-advance through phases
            if (_match.ActivePlayer.IsAI)
            {
                // Small delay then start movement
                var timer = GetTree().CreateTimer(0.5f);
                timer.Timeout += StartMovementPhase;
            }
        }

        private void CheckVictory()
        {
            // Check if any commander is dead
            for (int p = 0; p < 2; p++)
            {
                var cmdr = _match.AllUnits.FirstOrDefault(u => u.PlayerId == p && u.IsCommander);
                if (cmdr != null && !cmdr.IsAlive)
                {
                    _match.Winner = _match.Players[1 - p].Name;
                    EndGame();
                    return;
                }

                // Check if all units are dead
                if (_match.GetPlayerUnits(p).Count == 0)
                {
                    _match.Winner = _match.Players[1 - p].Name;
                    EndGame();
                    return;
                }
            }
        }

        private void EndGame()
        {
            _match.Phase = MatchPhase.GameOver;
            _match.Input = InputMode.None;

            if (_match.Winner == null)
            {
                // Determine winner by VP, then kills
                if (_match.Players[0].VictoryPoints > _match.Players[1].VictoryPoints)
                    _match.Winner = _match.Players[0].Name;
                else if (_match.Players[1].VictoryPoints > _match.Players[0].VictoryPoints)
                    _match.Winner = _match.Players[1].Name;
                else if (_match.Players[0].Kills > _match.Players[1].Kills)
                    _match.Winner = _match.Players[0].Name;
                else if (_match.Players[1].Kills > _match.Players[0].Kills)
                    _match.Winner = _match.Players[1].Name;
                else
                    _match.Winner = "Draw";
            }

            _match.AddLog($"");
            _match.AddLog($"═══════════════════════════");
            _match.AddLog($"  GAME OVER — {_match.Winner} wins!");
            _match.AddLog($"  P1: {_match.Players[0].Kills} kills, {_match.Players[0].VictoryPoints} VP");
            _match.AddLog($"  P2: {_match.Players[1].Kills} kills, {_match.Players[1].VictoryPoints} VP");
            _match.AddLog($"═══════════════════════════");

            UpdateUI();
            QueueRedraw();
        }

        // ═══════════════════════════════════════════
        //  AI EXECUTION
        // ═══════════════════════════════════════════

        private void ExecuteAiPhase()
        {
            _aiProcessing = true;
            _aiTimer = 0.3f;

            if (_match.Phase == MatchPhase.Movement)
            {
                // Queue individual move actions for animated playback
                var units = _match.GetPlayerUnits(_match.ActivePlayerId)
                    .Where(u => !u.MovedThisTurn)
                    .OrderByDescending(u => u.IsCommander)
                    .ThenByDescending(u => u.BaseAtk)
                    .ToList();

                foreach (var unit in units)
                {
                    var u = unit; // capture
                    var action = _ai.DecideMoveTarget(u, _match);
                    if (action.HasValue)
                    {
                        var (tx, ty) = action.Value;
                        _pendingAiActions.Enqueue(() =>
                        {
                            _match.AddLog($"AI moves {u.Name} ({u.X},{u.Y}) → ({tx},{ty})");
                            u.X = tx;
                            u.Y = ty;
                            u.MovedThisTurn = true;
                        });
                    }
                    else
                    {
                        _pendingAiActions.Enqueue(() =>
                        {
                            u.MovedThisTurn = true;
                        });
                    }
                }
            }
            else if (_match.Phase == MatchPhase.Combat)
            {
                // Queue individual attack actions
                var units = _match.GetPlayerUnits(_match.ActivePlayerId)
                    .Where(u => !u.AttackedThisTurn)
                    .OrderByDescending(u => u.BaseAtk)
                    .ToList();

                foreach (var unit in units)
                {
                    var u = unit;
                    _pendingAiActions.Enqueue(() =>
                    {
                        var targets = CombatResolver.GetValidTargets(u, _match);
                        if (targets.Count == 0)
                        {
                            u.AttackedThisTurn = true;
                            return;
                        }
                        var target = _ai.PickBestTarget(targets);
                        var result = CombatResolver.ResolveAttack(u, target);
                        u.AttackedThisTurn = true;
                        _match.AddLog(result.Summary);
                        if (result.TargetDestroyed)
                        {
                            _match.Players[_match.ActivePlayerId].Kills++;
                            _match.Players[_match.ActivePlayerId].VictoryPoints += target.IsCommander ? 10 : 1;
                            _match.AddLog($"  → {target.Name} destroyed! +{(target.IsCommander ? 10 : 1)} VP");
                        }
                    });
                }
            }
        }

        private void FinishAiTurn()
        {
            if (_match.Phase == MatchPhase.Movement)
            {
                StartCombatPhase();
            }
            else if (_match.Phase == MatchPhase.Combat)
            {
                StartEndPhase();
                // Auto advance to next turn after end phase
                if (_match.Phase != MatchPhase.GameOver)
                {
                    var timer = GetTree().CreateTimer(0.8f);
                    timer.Timeout += StartNextTurn;
                }
            }
        }

        // ═══════════════════════════════════════════
        //  INPUT HANDLING
        // ═══════════════════════════════════════════

        public override void _Input(InputEvent @event)
        {
            if (@event is InputEventMouseButton mb && mb.Pressed && mb.ButtonIndex == MouseButton.Left)
            {
                HandleBoardClick(mb.GlobalPosition);
            }
            if (@event is InputEventMouseButton mb2 && mb2.Pressed && mb2.ButtonIndex == MouseButton.Right)
            {
                // Right click deselects
                DeselectUnit();
            }
            // Escape key deselects
            if (@event is InputEventKey key && key.Pressed && key.Keycode == Key.Escape)
            {
                DeselectUnit();
            }
            // Track mouse position for hover tooltips
            if (@event is InputEventMouseMotion mm)
            {
                _mousePos = mm.GlobalPosition;
                UpdateHoveredUnit();
            }
        }

        private void DeselectUnit()
        {
            _match.SelectedUnit = null;
            _match.ValidMoves.Clear();
            _match.ValidTargets.Clear();
            _match.Input = _match.Phase == MatchPhase.Movement || _match.Phase == MatchPhase.Combat
                ? InputMode.SelectUnit : InputMode.None;
            UpdateUI();
            QueueRedraw();
        }

        private void UpdateHoveredUnit()
        {
            var boardPos = _mousePos - new Vector2(BoardOffsetX, BoardOffsetY);
            int cellX = (int)(boardPos.X / CellSize);
            int cellY = (int)(boardPos.Y / CellSize);

            UnitInstance? newHovered = null;
            if (_match.InBounds(cellX, cellY))
                newHovered = _match.GetUnitAt(cellX, cellY);

            if (newHovered != _hoveredUnit)
            {
                _hoveredUnit = newHovered;
                // Update unit info panel when hovering (if nothing selected)
                if (_match.SelectedUnit == null)
                    UpdateUI();
                QueueRedraw();
            }
        }

        private void HandleBoardClick(Vector2 globalPos)
        {
            if (_match.Phase == MatchPhase.FactionSelect || _match.Phase == MatchPhase.GameOver) return;
            if (_aiProcessing) return;
            if (_match.ActivePlayer.IsAI) return;

            // Convert to board coordinates
            var boardPos = globalPos - new Vector2(BoardOffsetX, BoardOffsetY);
            int cellX = (int)(boardPos.X / CellSize);
            int cellY = (int)(boardPos.Y / CellSize);

            if (!_match.InBounds(cellX, cellY)) return;

            switch (_match.Input)
            {
                case InputMode.SelectUnit:
                    HandleSelectUnit(cellX, cellY);
                    break;
                case InputMode.SelectMoveTarget:
                    HandleSelectMoveTarget(cellX, cellY);
                    break;
                case InputMode.SelectAttackTarget:
                    HandleSelectAttackTarget(cellX, cellY);
                    break;
            }
        }

        private void HandleSelectUnit(int x, int y)
        {
            var unit = _match.GetUnitAt(x, y);
            if (unit == null || unit.PlayerId != _match.ActivePlayerId) return;

            _match.SelectedUnit = unit;

            if (_match.Phase == MatchPhase.Movement && !unit.MovedThisTurn)
            {
                _match.ValidMoves = CombatResolver.GetValidMoves(unit, _match);
                _match.Input = InputMode.SelectMoveTarget;
            }
            else if (_match.Phase == MatchPhase.Combat && !unit.AttackedThisTurn)
            {
                _match.ValidTargets = CombatResolver.GetValidTargets(unit, _match);
                _match.Input = InputMode.SelectAttackTarget;
            }

            UpdateUI();
            QueueRedraw();
        }

        private void HandleSelectMoveTarget(int x, int y)
        {
            // Check if clicking own unit to re-select
            var clickedUnit = _match.GetUnitAt(x, y);
            if (clickedUnit != null && clickedUnit.PlayerId == _match.ActivePlayerId)
            {
                HandleSelectUnit(x, y);
                return;
            }

            if (_match.SelectedUnit == null) return;

            if (_match.ValidMoves.Contains((x, y)))
            {
                var unit = _match.SelectedUnit;
                _match.AddLog($"{unit.Name} moves ({unit.X},{unit.Y}) → ({x},{y})");
                unit.X = x;
                unit.Y = y;
                unit.MovedThisTurn = true;

                _match.SelectedUnit = null;
                _match.ValidMoves.Clear();
                _match.Input = InputMode.SelectUnit;
            }
            else
            {
                // Deselect
                _match.SelectedUnit = null;
                _match.ValidMoves.Clear();
                _match.Input = InputMode.SelectUnit;
            }

            UpdateUI();
            QueueRedraw();
        }

        private void HandleSelectAttackTarget(int x, int y)
        {
            // Check if clicking own unit to re-select
            var clickedUnit = _match.GetUnitAt(x, y);
            if (clickedUnit != null && clickedUnit.PlayerId == _match.ActivePlayerId)
            {
                _match.SelectedUnit = clickedUnit;
                if (!clickedUnit.AttackedThisTurn)
                {
                    _match.ValidTargets = CombatResolver.GetValidTargets(clickedUnit, _match);
                }
                else
                {
                    _match.ValidTargets.Clear();
                }
                UpdateUI();
                QueueRedraw();
                return;
            }

            if (_match.SelectedUnit == null) return;

            var target = _match.GetUnitAt(x, y);
            if (target != null && _match.ValidTargets.Contains(target))
            {
                var attacker = _match.SelectedUnit;
                var result = CombatResolver.ResolveAttack(attacker, target);
                attacker.AttackedThisTurn = true;
                _match.AddLog(result.Summary);

                if (result.TargetDestroyed)
                {
                    _match.ActivePlayer.Kills++;
                    _match.ActivePlayer.VictoryPoints += target.IsCommander ? 10 : 1;
                    _match.AddLog($"  → +{(target.IsCommander ? 10 : 1)} VP for {_match.ActivePlayer.Name}");
                }

                _match.SelectedUnit = null;
                _match.ValidTargets.Clear();
                _match.Input = InputMode.SelectUnit;

                // Check victory after each kill
                if (result.TargetDestroyed)
                    CheckVictory();
            }
            else
            {
                // Deselect
                _match.SelectedUnit = null;
                _match.ValidTargets.Clear();
                _match.Input = InputMode.SelectUnit;
            }

            UpdateUI();
            QueueRedraw();
        }

        // ═══════════════════════════════════════════
        //  RENDERING
        // ═══════════════════════════════════════════

        public override void _Draw()
        {
            if (_match.Phase == MatchPhase.FactionSelect) return;
            DrawBoard();
            DrawHoverTooltip();
        }

        private void DrawBoard()
        {
            float ox = BoardOffsetX;
            float oy = BoardOffsetY;

            // Draw grid cells
            for (int x = 0; x < _match.BoardWidth; x++)
            {
                for (int y = 0; y < _match.BoardHeight; y++)
                {
                    var rect = new Rect2(ox + x * CellSize, oy + y * CellSize, CellSize - 1, CellSize - 1);
                    var cellColor = (x + y) % 2 == 0 ? CellLight : CellDark;
                    DrawRect(rect, cellColor);

                    // Deployment zone highlights
                    if (y >= _match.BoardHeight - 3)
                        DrawRect(rect, DeployZoneP1);
                    else if (y <= 2)
                        DrawRect(rect, DeployZoneP2);
                }
            }

            // Draw valid moves
            foreach (var (mx, my) in _match.ValidMoves)
            {
                var rect = new Rect2(ox + mx * CellSize, oy + my * CellSize, CellSize - 1, CellSize - 1);
                DrawRect(rect, MoveHighlight);
            }

            // Draw valid attack targets
            foreach (var target in _match.ValidTargets)
            {
                var rect = new Rect2(ox + target.X * CellSize, oy + target.Y * CellSize, CellSize - 1, CellSize - 1);
                DrawRect(rect, AttackHighlight);
            }

            // Draw units
            foreach (var unit in _match.GetLivingUnits())
            {
                DrawUnit(unit, ox, oy);
            }

            // Draw selection highlight
            if (_match.SelectedUnit != null && _match.SelectedUnit.IsAlive)
            {
                var su = _match.SelectedUnit;
                var rect = new Rect2(ox + su.X * CellSize - 1, oy + su.Y * CellSize - 1, CellSize + 1, CellSize + 1);
                DrawRect(rect, SelectedColor, false, 3.0f);
            }

            // Draw hover highlight
            if (_hoveredUnit != null && _hoveredUnit.IsAlive && _hoveredUnit != _match.SelectedUnit)
            {
                var hu = _hoveredUnit;
                var rect = new Rect2(ox + hu.X * CellSize - 1, oy + hu.Y * CellSize - 1, CellSize + 1, CellSize + 1);
                DrawRect(rect, new Color(1.0f, 1.0f, 1.0f, 0.5f), false, 2.0f);
            }

            // Draw grid border
            var boardRect = new Rect2(ox - 1, oy - 1, _match.BoardWidth * CellSize + 2, _match.BoardHeight * CellSize + 2);
            DrawRect(boardRect, new Color(0.4f, 0.4f, 0.4f), false, 2.0f);

            // Draw axis labels
            for (int x = 0; x < _match.BoardWidth; x++)
            {
                var pos = new Vector2(ox + x * CellSize + CellSize / 2 - 4, oy - 14);
                DrawString(ThemeDB.FallbackFont, pos, x.ToString(), HorizontalAlignment.Center, -1, 11,
                    new Color(0.5f, 0.5f, 0.5f));
            }
            for (int y = 0; y < _match.BoardHeight; y++)
            {
                var pos = new Vector2(ox - 16, oy + y * CellSize + CellSize / 2 + 4);
                DrawString(ThemeDB.FallbackFont, pos, y.ToString(), HorizontalAlignment.Center, -1, 11,
                    new Color(0.5f, 0.5f, 0.5f));
            }
        }

        private void DrawUnit(UnitInstance unit, float ox, float oy)
        {
            float cx = ox + unit.X * CellSize;
            float cy = oy + unit.Y * CellSize;
            float padding = 3;

            // Unit background
            Color bgColor;
            if (unit.IsCommander)
                bgColor = unit.PlayerId == 0 ? P1CmdrColor : P2CmdrColor;
            else
                bgColor = unit.PlayerId == 0 ? P1Color : P2Color;

            // Dim if already acted
            bool hasActed = ((_match.Phase == MatchPhase.Movement && unit.MovedThisTurn) ||
                 (_match.Phase == MatchPhase.Combat && unit.AttackedThisTurn)) &&
                unit.PlayerId == _match.ActivePlayerId;
            if (hasActed)
            {
                bgColor = bgColor.Darkened(0.4f);
            }

            var unitRect = new Rect2(cx + padding, cy + padding, CellSize - padding * 2 - 1, CellSize - padding * 2 - 1);
            DrawRect(unitRect, bgColor);

            // Border for units
            DrawRect(unitRect, bgColor.Lightened(0.3f), false, 1.0f);

            // Shaken indicator
            if (unit.IsShaken)
            {
                DrawRect(unitRect, new Color(1, 1, 0, 0.15f));
            }

            // Unit label
            var label = unit.ShortLabel;
            var labelPos = new Vector2(cx + CellSize / 2 - 6, cy + CellSize / 2 - 2);
            DrawString(ThemeDB.FallbackFont, labelPos, label, HorizontalAlignment.Center, CellSize - 8, 13,
                Colors.White);

            // HP bar
            float hpFrac = Math.Clamp((float)unit.CurrentHp / unit.MaxHp, 0, 1);
            float barW = CellSize - padding * 2 - 1;
            float barH = 4;
            float barY = cy + CellSize - padding - barH - 1;

            // HP bar background
            DrawRect(new Rect2(cx + padding, barY, barW, barH), new Color(0.2f, 0.0f, 0.0f));
            // HP bar fill
            Color hpColor = hpFrac > 0.5f ? new Color(0.0f, 0.8f, 0.0f) :
                            hpFrac > 0.25f ? new Color(0.9f, 0.7f, 0.0f) :
                            new Color(0.9f, 0.1f, 0.0f);
            DrawRect(new Rect2(cx + padding, barY, barW * hpFrac, barH), hpColor);
        }

        // ═══════════════════════════════════════════
        //  HOVER TOOLTIP
        // ═══════════════════════════════════════════

        private void DrawHoverTooltip()
        {
            if (_hoveredUnit == null || !_hoveredUnit.IsAlive) return;
            if (_match.SelectedUnit == _hoveredUnit) return; // Already shown in panel

            var u = _hoveredUnit;
            float tx = _mousePos.X + 16;
            float ty = _mousePos.Y - 10;

            // Clamp to screen
            float tooltipW = 210;
            float tooltipH = 78;
            if (tx + tooltipW > Size.X) tx = _mousePos.X - tooltipW - 8;
            if (ty + tooltipH > Size.Y) ty = Size.Y - tooltipH - 4;
            if (ty < 0) ty = 4;

            // Background
            DrawRect(new Rect2(tx - 4, ty - 4, tooltipW, tooltipH), new Color(0.05f, 0.05f, 0.08f, 0.92f));
            DrawRect(new Rect2(tx - 4, ty - 4, tooltipW, tooltipH),
                u.PlayerId == 0 ? P1Color : P2Color, false, 2.0f);

            // Text
            var font = ThemeDB.FallbackFont;
            int fs = 12;
            DrawString(font, new Vector2(tx, ty + 10), $"{u.Name}", HorizontalAlignment.Left, (int)tooltipW - 8, fs + 1, Colors.White);
            DrawString(font, new Vector2(tx, ty + 26), $"HP: {u.CurrentHp}/{u.MaxHp}  {u.UnitType}", HorizontalAlignment.Left, (int)tooltipW - 8, fs, new Color(0.8f, 0.8f, 0.8f));
            DrawString(font, new Vector2(tx, ty + 42), $"ATK:{u.EffectiveAtk} DEF:{u.BaseDef} MOR:{u.BaseMor}{(u.IsShaken ? " ⚠" : "")}", HorizontalAlignment.Left, (int)tooltipW - 8, fs, new Color(0.7f, 0.7f, 0.9f));
            DrawString(font, new Vector2(tx, ty + 58), $"MOV:{u.MoveCells} RNG:{u.RangeCells} ({u.PointsCost}pts)", HorizontalAlignment.Left, (int)tooltipW - 8, fs, new Color(0.6f, 0.7f, 0.6f));
        }

        // ═══════════════════════════════════════════
        //  UI UPDATE
        // ═══════════════════════════════════════════

        private void UpdateUI()
        {
            // Status bar
            if (_statusLabel != null)
            {
                if (_match.Phase == MatchPhase.FactionSelect)
                    _statusLabel.Text = "SHARDBORNE — Select Factions";
                else if (_match.Phase == MatchPhase.GameOver)
                    _statusLabel.Text = $"GAME OVER — {_match.Winner} wins!";
                else
                    _statusLabel.Text = $"SHARDBORNE — Turn {_match.Turn}/{_match.MaxTurns}";
            }

            // Phase info
            if (_phaseLabel != null)
            {
                if (_match.Phase == MatchPhase.FactionSelect || _match.Phase == MatchPhase.GameOver)
                    _phaseLabel.Text = "";
                else
                {
                    var p = _match.ActivePlayer;
                    _phaseLabel.Text = $"{p.FactionIcon} {p.Name} • {_match.Phase} • CP:{p.CommandPoints} • VP:{p.VictoryPoints} • Kills:{p.Kills}";
                }
            }

            // Instructions
            if (_instructionLabel != null)
            {
                _instructionLabel.Text = GetInstructions();
            }

            // Unit info panel
            if (_unitInfoLabel != null)
            {
                var displayUnit = _match.SelectedUnit ?? _hoveredUnit;
                if (displayUnit != null)
                {
                    var u = displayUnit;
                    var specials = u.Specials.Count > 0 ? string.Join("\n", u.Specials.Take(3)) : "(none)";
                    var owner = _match.Players[u.PlayerId];
                    _unitInfoLabel.Text =
                        $"[b]{u.Name}[/b]{(_match.SelectedUnit == u ? " [color=yellow]SELECTED[/color]" : "")}\n" +
                        $"Type: {u.UnitType} ({u.PointsCost} pts)\n" +
                        $"HP: {u.CurrentHp}/{u.MaxHp}\n" +
                        $"ATK: {u.EffectiveAtk} ({u.BaseAtk})  DEF: {u.BaseDef}\n" +
                        $"MOV: {u.BaseMov} ({u.MoveCells} cells)  RNG: {u.BaseRng} ({u.RangeCells} cells)\n" +
                        $"MOR: {u.BaseMor}{(u.IsShaken ? " [color=yellow]SHAKEN[/color]" : "")}\n" +
                        $"Owner: {owner.FactionIcon} {owner.Name}\n" +
                        $"\n[b]Specials:[/b]\n{specials}";
                }
                else
                {
                    // Show army overview
                    var p = _match.ActivePlayer;
                    var uCount = _match.GetPlayerUnits(p.PlayerId).Count;
                    var eCount = _match.GetPlayerUnits(1 - p.PlayerId).Count;
                    _unitInfoLabel.Text =
                        $"[b]{p.FactionIcon} {p.FactionName}[/b]\n" +
                        $"Units alive: {uCount}\n" +
                        $"Enemy alive: {eCount}\n" +
                        $"CP: {p.CommandPoints}\n" +
                        $"VP: {p.VictoryPoints}\n" +
                        $"Kills: {p.Kills}\n" +
                        $"\nClick a unit to select it.";
                }
            }

            // Button states
            if (_endPhaseBtn != null)
            {
                _endPhaseBtn.Disabled = _match.Phase == MatchPhase.GameOver || _aiProcessing;
                _endPhaseBtn.Text = _match.Phase switch
                {
                    MatchPhase.Command => "Start Movement →",
                    MatchPhase.Movement => "Start Combat →",
                    MatchPhase.Combat => "End Phase →",
                    MatchPhase.EndPhase => "Next Turn →",
                    MatchPhase.GameOver => "Game Over",
                    _ => "End Phase"
                };
            }

            if (_endTurnBtn != null)
            {
                _endTurnBtn.Disabled = _match.Phase == MatchPhase.GameOver ||
                                       _match.Phase == MatchPhase.Command ||
                                       _aiProcessing;
            }

            if (_playAgainBtn != null)
            {
                _playAgainBtn.Visible = _match.Phase == MatchPhase.GameOver;
            }

            // Log
            if (_logLabel != null)
            {
                var logText = "[b]Game Log[/b]\n";
                var recentLogs = _match.Log.TakeLast(30);
                logText += string.Join("\n", recentLogs);
                _logLabel.Text = logText;
            }
        }

        private string GetInstructions()
        {
            if (_match.Phase == MatchPhase.GameOver)
                return $"Game Over! {_match.Winner} wins!\nClick 'Play Again' or 'Back to Menu'.";

            if (_match.ActivePlayer.IsAI)
                return "AI is thinking...";

            return _match.Input switch
            {
                InputMode.SelectUnit when _match.Phase == MatchPhase.Movement =>
                    "Click one of your units to move.\nESC or Right-click to deselect.",
                InputMode.SelectUnit when _match.Phase == MatchPhase.Combat =>
                    "Click one of your units to attack.\nESC or Right-click to deselect.",
                InputMode.SelectMoveTarget =>
                    $"Moving: {_match.SelectedUnit?.Name}\nClick a green cell to move.\nESC to cancel.",
                InputMode.SelectAttackTarget =>
                    $"Attacking: {_match.SelectedUnit?.Name}\nClick a red-highlighted enemy.\nESC to cancel.",
                _ when _match.Phase == MatchPhase.Command =>
                    $"Command Phase — +{_match.ActivePlayer.CommandPoints} CP\nClick 'Start Movement' to begin.",
                _ when _match.Phase == MatchPhase.EndPhase =>
                    "End Phase — Morale resolved.\nClick 'Next Turn' to continue.",
                _ => "Hover over units for info."
            };
        }

        // ═══════════════════════════════════════════
        //  NAVIGATION
        // ═══════════════════════════════════════════

        private void OnBackToMenu()
        {
            GetTree().ChangeSceneToFile("res://Scenes/Main.tscn");
        }

        private void OnPlayAgain()
        {
            // Reset match state
            var mode = _match.Mode;
            _match = new MatchState { Mode = mode };
            if (mode == GameMode.VsAI)
            {
                _match.Players[1].IsAI = true;
                _match.Players[1].Name = "AI";
            }
            _p1Faction = "";
            _p2Faction = "";
            _hoveredUnit = null;
            _pendingAiActions.Clear();
            _aiProcessing = false;

            // Show faction select again
            ShowFactionSelect();
            if (_startGameBtn != null) _startGameBtn.Disabled = true;

            // Reset faction button labels
            if (_p1SelectLabel != null) _p1SelectLabel.Text = "Player 1 — Pick a Faction:";
            if (_p2SelectLabel != null) _p2SelectLabel.Text = _match.Mode == GameMode.VsAI ? "AI Faction:" : "Player 2 — Pick a Faction:";

            UpdateUI();
            QueueRedraw();
        }

        public void SetGameMode(GameMode mode)
        {
            _match.Mode = mode;
            if (mode == GameMode.VsAI)
            {
                _match.Players[1].IsAI = true;
                _match.Players[1].Name = "AI";
            }
            else
            {
                _match.Players[1].IsAI = false;
                _match.Players[1].Name = "Player 2";
            }
        }

        // ═══════════════════════════════════════════
        //  HELPERS
        // ═══════════════════════════════════════════

        private string GetFactionDisplayName(string factionId)
        {
            var fac = _data.Factions.FirstOrDefault(f => f.Id == factionId);
            return fac?.Name ?? factionId;
        }

        private static Color ParseColor(string hex)
        {
            if (string.IsNullOrEmpty(hex)) return new Color(0.5f, 0.5f, 0.5f);
            try { return new Color(hex); }
            catch { return new Color(0.5f, 0.5f, 0.5f); }
        }
    }
}
