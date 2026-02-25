using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Godot;

namespace Shardborne
{
	/// <summary>
	/// Tabletop board-game experience: felt background, circular unit tokens,
	/// faction-colored rings, visual terrain, dice tray, unit stat card.
	/// </summary>
	public partial class GameScene : Control
	{
		// 
		//  CONSTANTS
		// 
		private const int CellSize = 60;
		private const int Cols = 12;
		private const int Rows = 10;
		private const int BoardLeft = 8;
		private const int BoardTop = 52;
		private const int BoardW = Cols * CellSize;   // 720
		private const int BoardH = Rows * CellSize;    // 600
		private const int CardPanelX = BoardLeft + BoardW + 10; // 738
		private const int CardPanelW = 1280 - CardPanelX - 6;  // 536

		// 
		//  STATE
		// 
		private MatchState _match = new();
		private GameDefinition _data = new();
		private AIController _ai = new();
		private bool _aiProcessing = false;
		private float _aiTimer = 0f;

		// Dice tray
		private List<int> _lastRolls;
		private int _lastDefTarget;
		private string _lastRollLabel = "";
		private float _diceShowTimer = 0f;

		// Setup flow
		private string[] _setupFaction = new string[2];
		private string[] _setupFacName = new string[2];
		private string[] _setupFacIcon = new string[2];
		private string[] _setupFacColor = new string[2];

		// Army builder
		private int _armyBuildPlayer = 0;
		private Commander _abSelectedCmdr;
		private List<(UnitTemplate tmpl, int count)> _abRoster = new();
		private int _abBudget = 75;

		// Mouse / hover
		private Vector2 _mousePos;
		private Vector2I _hoverCell = new(-1, -1);

		// 
		//  UI NODES
		// 
		private Label _turnBanner, _phaseBanner, _instructionLabel;
		private RichTextLabel _logLabel;
		private Button _endPhaseBtn, _endTurnBtn, _backBtn, _playAgainBtn;

		// Setup panels
		private VBoxContainer _factionSelectPanel;
		private VBoxContainer _factionButtonsP1, _factionButtonsP2;
		private Label _p1SelectLabel, _p2SelectLabel;
		private Button _startGameBtn;
		private VBoxContainer _victorySelectPanel;
		private VBoxContainer _armyBuilderPanel;
		private Label _abTitleLabel, _abBudgetLabel;
		private VBoxContainer _abCmdrList, _abUnitList, _abRosterList;
		private RichTextLabel _abCmdrDetail;
		private Button _abConfirmBtn;

		// 
		//  TABLETOP COLOUR PALETTE
		// 
		private static readonly Color TableFelt     = new(0.12f, 0.22f, 0.10f);
		private static readonly Color CellLight     = new(0.16f, 0.25f, 0.14f);
		private static readonly Color CellDark      = new(0.13f, 0.21f, 0.11f);
		private static readonly Color GridLine      = new(0.25f, 0.35f, 0.22f, 0.4f);
		private static readonly Color DeployBlue    = new(0.15f, 0.25f, 0.55f, 0.18f);
		private static readonly Color DeployRed     = new(0.55f, 0.15f, 0.12f, 0.18f);
		private static readonly Color MoveGreen     = new(0.0f, 0.8f, 0.2f, 0.30f);
		private static readonly Color ChargeOrange  = new(1.0f, 0.6f, 0.0f, 0.40f);
		private static readonly Color AttackRed     = new(1.0f, 0.0f, 0.0f, 0.30f);
		private static readonly Color EngageRing    = new(1.0f, 0.5f, 0.0f, 0.8f);
		private static readonly Color SelectRing    = new(1.0f, 1.0f, 1.0f, 0.9f);
		private static readonly Color ObjGold       = new(1.0f, 0.85f, 0.15f);
		private static readonly Color CardBg        = new(0.10f, 0.10f, 0.08f, 0.95f);
		private static readonly Color CardBorder    = new(0.55f, 0.45f, 0.25f);
		private static readonly Color DiceBg        = new(0.14f, 0.12f, 0.08f, 0.95f);

		// 
		//  LIFECYCLE
		// 

		public override void _Ready()
		{
			var projectRoot = ProjectSettings.GlobalizePath("res://");
			var repoRoot = Path.GetFullPath(Path.Combine(projectRoot, ".."));
			_data = DataLoader.LoadFromRepo(repoRoot);
			BuildUI();
			ShowFactionSelect();
		}

		public override void _Process(double delta)
		{
			if (_diceShowTimer > 0)
			{
				_diceShowTimer -= (float)delta;
				if (_diceShowTimer <= 0) QueueRedraw();
			}
			if (_aiProcessing)
			{
				_aiTimer -= (float)delta;
				if (_aiTimer <= 0) { _aiTimer = 0; }
			}
		}

		// 
		//  BUILD UI  minimal HUD around the board
		// 

		private void BuildUI()
		{
			// Turn banner (top-left, above board)
			_turnBanner = new Label { Text = "SHARDBORNE" };
			_turnBanner.AddThemeFontSizeOverride("font_size", 16);
			_turnBanner.Position = new Vector2(BoardLeft, 4);
			_turnBanner.Size = new Vector2(500, 28);
			AddChild(_turnBanner);

			// Phase banner (top-right of board)
			_phaseBanner = new Label { Text = "" };
			_phaseBanner.AddThemeFontSizeOverride("font_size", 14);
			_phaseBanner.HorizontalAlignment = HorizontalAlignment.Right;
			_phaseBanner.Position = new Vector2(BoardLeft + BoardW - 280, 4);
			_phaseBanner.Size = new Vector2(280, 28);
			AddChild(_phaseBanner);

			// Instruction label below board
			_instructionLabel = new Label { Text = "Select your factions to begin." };
			_instructionLabel.AddThemeFontSizeOverride("font_size", 13);
			_instructionLabel.Position = new Vector2(BoardLeft, BoardTop + BoardH + 6);
			_instructionLabel.Size = new Vector2(BoardW, 24);
			AddChild(_instructionLabel);

			// Log (bottom strip)
			_logLabel = new RichTextLabel();
			_logLabel.BbcodeEnabled = true;
			_logLabel.ScrollFollowing = true;
			_logLabel.Position = new Vector2(BoardLeft, BoardTop + BoardH + 30);
			_logLabel.Size = new Vector2(BoardW, 110);
			_logLabel.AddThemeFontSizeOverride("normal_font_size", 11);
			AddChild(_logLabel);

			// Right-side buttons
			_endPhaseBtn = new Button { Text = "End Phase", Visible = false };
			_endPhaseBtn.Position = new Vector2(CardPanelX, 650);
			_endPhaseBtn.Size = new Vector2(130, 36);
			_endPhaseBtn.Pressed += OnEndPhase;
			AddChild(_endPhaseBtn);

			_endTurnBtn = new Button { Text = "End Turn", Visible = false };
			_endTurnBtn.Position = new Vector2(CardPanelX + 140, 650);
			_endTurnBtn.Size = new Vector2(130, 36);
			_endTurnBtn.Pressed += OnEndTurn;
			AddChild(_endTurnBtn);

			_backBtn = new Button { Text = "Back to Menu", Visible = false };
			_backBtn.Position = new Vector2(CardPanelX, 694);
			_backBtn.Size = new Vector2(130, 32);
			_backBtn.Pressed += OnBackToMenu;
			AddChild(_backBtn);

			_playAgainBtn = new Button { Text = "Play Again", Visible = false };
			_playAgainBtn.Position = new Vector2(CardPanelX + 140, 694);
			_playAgainBtn.Size = new Vector2(130, 32);
			_playAgainBtn.Pressed += OnPlayAgain;
			AddChild(_playAgainBtn);

			// Build setup panels (hidden until needed)
			BuildFactionSelectPanel();
			BuildVictorySelectPanel();
			BuildArmyBuilderPanel();
		}

		// 
		//  SETUP PANELS
		// 

		private void BuildFactionSelectPanel()
		{
			_factionSelectPanel = new VBoxContainer();
			_factionSelectPanel.SetAnchorsPreset(LayoutPreset.FullRect);
			_factionSelectPanel.AddThemeConstantOverride("separation", 12);
			_factionSelectPanel.Visible = false;
			AddChild(_factionSelectPanel);

			var bg = new ColorRect { Color = new Color(0.06f, 0.07f, 0.05f, 0.98f) };
			bg.SetAnchorsPreset(LayoutPreset.FullRect);
			_factionSelectPanel.AddChild(bg);

			var title = new Label { Text = "SHARDBORNE  SELECT FACTIONS" };
			title.AddThemeFontSizeOverride("font_size", 26);
			title.HorizontalAlignment = HorizontalAlignment.Center;
			_factionSelectPanel.AddChild(title);

			var row = new HBoxContainer();
			row.AddThemeConstantOverride("separation", 40);
			row.Alignment = BoxContainer.AlignmentMode.Center;
			_factionSelectPanel.AddChild(row);

			var p1Col = new VBoxContainer { CustomMinimumSize = new Vector2(400, 0) };
			p1Col.AddThemeConstantOverride("separation", 6);
			row.AddChild(p1Col);
			_p1SelectLabel = new Label { Text = "Player 1  Pick a Faction:" };
			_p1SelectLabel.AddThemeFontSizeOverride("font_size", 16);
			p1Col.AddChild(_p1SelectLabel);
			_factionButtonsP1 = new VBoxContainer();
			_factionButtonsP1.AddThemeConstantOverride("separation", 4);
			p1Col.AddChild(_factionButtonsP1);

			var p2Col = new VBoxContainer { CustomMinimumSize = new Vector2(400, 0) };
			p2Col.AddThemeConstantOverride("separation", 6);
			row.AddChild(p2Col);
			_p2SelectLabel = new Label { Text = "Player 2 (AI)  Pick a Faction:" };
			_p2SelectLabel.AddThemeFontSizeOverride("font_size", 16);
			p2Col.AddChild(_p2SelectLabel);
			_factionButtonsP2 = new VBoxContainer();
			_factionButtonsP2.AddThemeConstantOverride("separation", 4);
			p2Col.AddChild(_factionButtonsP2);

			_startGameBtn = new Button { Text = "START GAME", Disabled = true, CustomMinimumSize = new Vector2(300, 50) };
			_startGameBtn.Pressed += OnStartGame;
			_factionSelectPanel.AddChild(_startGameBtn);
		}

		private void ShowFactionSelect()
		{
			_factionSelectPanel.Visible = true;

			foreach (Node c in _factionButtonsP1.GetChildren()) c.QueueFree();
			foreach (Node c in _factionButtonsP2.GetChildren()) c.QueueFree();

			foreach (var fac in _data.Factions)
			{
				var cmdrs = _data.GetCommandersForFaction(fac.Id);
				var units = _data.GetUnitsForFaction(fac.Id);
				string label = fac.Icon + " " + fac.Name + " (" + cmdrs.Count + " cmdr, " + units.Count + " units)";
				var facId = fac.Id;
				var facName = fac.Name;
				var facIcon = fac.Icon;
				var facColor = fac.Color;

				var b1 = new Button { Text = label, CustomMinimumSize = new Vector2(390, 38) };
				b1.Pressed += () => OnFactionPicked(0, facId, facName, facIcon, facColor);
				_factionButtonsP1.AddChild(b1);

				var b2 = new Button { Text = label, CustomMinimumSize = new Vector2(390, 38) };
				b2.Pressed += () => OnFactionPicked(1, facId, facName, facIcon, facColor);
				_factionButtonsP2.AddChild(b2);
			}
		}

		private void BuildVictorySelectPanel()
		{
			_victorySelectPanel = new VBoxContainer();
			_victorySelectPanel.SetAnchorsPreset(LayoutPreset.FullRect);
			_victorySelectPanel.AddThemeConstantOverride("separation", 16);
			_victorySelectPanel.Visible = false;
			AddChild(_victorySelectPanel);

			var bg = new ColorRect { Color = new Color(0.06f, 0.07f, 0.05f, 0.98f) };
			bg.SetAnchorsPreset(LayoutPreset.FullRect);
			_victorySelectPanel.AddChild(bg);

			var title = new Label { Text = "CHOOSE VICTORY CONDITION" };
			title.AddThemeFontSizeOverride("font_size", 24);
			title.HorizontalAlignment = HorizontalAlignment.Center;
			_victorySelectPanel.AddChild(title);

			var modes = new (VictoryMode m, string t, string d)[] {
				(VictoryMode.Annihilation,     "ANNIHILATION",      "Destroy the enemy commander or all units."),
				(VictoryMode.Attrition,        "ATTRITION",         "Score VP from kills. Most VP after 6 rounds wins."),
				(VictoryMode.ObjectiveControl,  "OBJECTIVE CONTROL", "Hold objectives to score VP each turn. First to 5 VP."),
				(VictoryMode.KingOfTheHill,    "KING OF THE HILL",  "Hold the centre objective. First to 6 VP."),
			};
			foreach (var (mode, txt, desc) in modes)
			{
				var m = mode;
				var btn = new Button { Text = txt + "\n" + desc, CustomMinimumSize = new Vector2(550, 54) };
				btn.Pressed += () => OnVictoryPicked(m);
				_victorySelectPanel.AddChild(btn);
			}
		}

		private void BuildArmyBuilderPanel()
		{
			_armyBuilderPanel = new VBoxContainer();
			_armyBuilderPanel.SetAnchorsPreset(LayoutPreset.FullRect);
			_armyBuilderPanel.AddThemeConstantOverride("separation", 6);
			_armyBuilderPanel.Visible = false;
			AddChild(_armyBuilderPanel);

			var bg = new ColorRect { Color = new Color(0.06f, 0.07f, 0.05f, 0.98f) };
			bg.SetAnchorsPreset(LayoutPreset.FullRect);
			_armyBuilderPanel.AddChild(bg);

			_abTitleLabel = new Label { Text = "ARMY BUILDER" };
			_abTitleLabel.AddThemeFontSizeOverride("font_size", 22);
			_abTitleLabel.HorizontalAlignment = HorizontalAlignment.Center;
			_armyBuilderPanel.AddChild(_abTitleLabel);

			var hbox = new HBoxContainer();
			hbox.AddThemeConstantOverride("separation", 10);
			_armyBuilderPanel.AddChild(hbox);

			// Left: commanders
			var cmdCol = new VBoxContainer { CustomMinimumSize = new Vector2(340, 0) };
			hbox.AddChild(cmdCol);
			cmdCol.AddChild(new Label { Text = "Commander:" });
			var cmdScroll = new ScrollContainer { CustomMinimumSize = new Vector2(340, 200) };
			cmdCol.AddChild(cmdScroll);
			_abCmdrList = new VBoxContainer();
			_abCmdrList.AddThemeConstantOverride("separation", 3);
			cmdScroll.AddChild(_abCmdrList);
			_abCmdrDetail = new RichTextLabel { BbcodeEnabled = true, CustomMinimumSize = new Vector2(340, 60) };
			_abCmdrDetail.AddThemeFontSizeOverride("normal_font_size", 11);
			cmdCol.AddChild(_abCmdrDetail);

			// Centre: units
			var unitCol = new VBoxContainer { CustomMinimumSize = new Vector2(380, 0) };
			hbox.AddChild(unitCol);
			_abBudgetLabel = new Label { Text = "Units (0/75 pts):" };
			_abBudgetLabel.AddThemeFontSizeOverride("font_size", 14);
			unitCol.AddChild(_abBudgetLabel);
			var unitScroll = new ScrollContainer { CustomMinimumSize = new Vector2(380, 280) };
			unitCol.AddChild(unitScroll);
			_abUnitList = new VBoxContainer();
			_abUnitList.AddThemeConstantOverride("separation", 3);
			unitScroll.AddChild(_abUnitList);

			// Right: roster
			var rosterCol = new VBoxContainer { CustomMinimumSize = new Vector2(340, 0) };
			hbox.AddChild(rosterCol);
			rosterCol.AddChild(new Label { Text = "Your Roster:" });
			var rosterScroll = new ScrollContainer { CustomMinimumSize = new Vector2(340, 280) };
			rosterCol.AddChild(rosterScroll);
			_abRosterList = new VBoxContainer();
			_abRosterList.AddThemeConstantOverride("separation", 3);
			rosterScroll.AddChild(_abRosterList);

			// Bottom buttons
			var btnRow = new HBoxContainer();
			btnRow.AddThemeConstantOverride("separation", 12);
			btnRow.Alignment = BoxContainer.AlignmentMode.Center;
			_armyBuilderPanel.AddChild(btnRow);

			var autoBtn = new Button { Text = "Auto-Fill", CustomMinimumSize = new Vector2(140, 36) };
			autoBtn.Pressed += OnAbAutoFill;
			btnRow.AddChild(autoBtn);

			var clearBtn = new Button { Text = "Clear", CustomMinimumSize = new Vector2(100, 36) };
			clearBtn.Pressed += OnAbClear;
			btnRow.AddChild(clearBtn);

			_abConfirmBtn = new Button { Text = "Confirm Army", CustomMinimumSize = new Vector2(180, 40), Disabled = true };
			_abConfirmBtn.Pressed += OnAbConfirm;
			btnRow.AddChild(_abConfirmBtn);
		}

		// 
		//  SELECTION HANDLERS
		// 

		private void OnFactionPicked(int player, string facId, string facName, string facIcon, string facColor)
		{
			_setupFaction[player] = facId;
			_setupFacName[player] = facName;
			_setupFacIcon[player] = facIcon;
			_setupFacColor[player] = facColor;
			var lbl = player == 0 ? _p1SelectLabel : _p2SelectLabel;
			lbl.Text = (player == 0 ? "Player 1" : "Player 2 (AI)") + ": " + facIcon + " " + facName;
			_startGameBtn.Disabled = _setupFaction[0] == null || _setupFaction[1] == null;
		}

		private void OnStartGame()
		{
			_factionSelectPanel.Visible = false;
			_match = new MatchState();
			_match.Players[0] = new MatchPlayer
			{
				PlayerId = 0, Name = "Player 1",
				FactionId = _setupFaction[0], FactionName = _setupFacName[0],
				FactionIcon = _setupFacIcon[0], FactionColor = ParseColor(_setupFacColor[0]),
				IsAI = false
			};
			_match.Players[1] = new MatchPlayer
			{
				PlayerId = 1, Name = "AI",
				FactionId = _setupFaction[1], FactionName = _setupFacName[1],
				FactionIcon = _setupFacIcon[1], FactionColor = ParseColor(_setupFacColor[1]),
				IsAI = true
			};
			_victorySelectPanel.Visible = true;
		}

		private void OnVictoryPicked(VictoryMode mode)
		{
			_victorySelectPanel.Visible = false;
			_match.Victory = mode;
			ShowArmyBuilder(0);
		}

		// 
		//  ARMY BUILDER
		// 

		private void ShowArmyBuilder(int player)
		{
			_armyBuildPlayer = player;
			_abSelectedCmdr = null;
			_abRoster.Clear();
			_abBudget = 75;
			var mp = _match.Players[player];
			_abTitleLabel.Text = (player == 0 ? "PLAYER 1" : "PLAYER 2 (AI)") +
				" ARMY BUILDER  (" + mp.FactionIcon + " " + mp.FactionName + ")";
			PopulateAbCommanders();
			PopulateAbUnits();
			RefreshAbRoster();
			_armyBuilderPanel.Visible = true;
		}

		private void PopulateAbCommanders()
		{
			foreach (Node c in _abCmdrList.GetChildren()) c.QueueFree();
			var factionId = _match.Players[_armyBuildPlayer].FactionId;
			var cmdrs = _data.GetCommandersForFaction(factionId);
			foreach (var cmd in cmdrs.OrderBy(c => c.PointsCost))
			{
				var cc = cmd;
				var btn = new Button
				{
					Text = cc.Name + " (" + cc.PointsCost + "pts) ATK:" + cc.Atk + " DEF:" + cc.Def + " HP:" + cc.Hp,
					ToggleMode = true,
					CustomMinimumSize = new Vector2(330, 28)
				};
				btn.Pressed += () => OnAbSelectCommander(cc, btn);
				_abCmdrList.AddChild(btn);
			}
			if (_abCmdrDetail != null)
				_abCmdrDetail.Text = "[i]Select a commander above[/i]";
		}

		private void OnAbSelectCommander(Commander cmd, Button btn)
		{
			_abSelectedCmdr = cmd;
			foreach (Node c in _abCmdrList.GetChildren())
				if (c is Button b && b != btn) b.ButtonPressed = false;
			btn.ButtonPressed = true;
			if (_abCmdrDetail != null)
				_abCmdrDetail.Text = "[b]" + cmd.Name + "[/b]  " + cmd.Title + "\nATK:" + cmd.Atk +
					" DEF:" + cmd.Def + " HP:" + cmd.Hp + " MOV:" + cmd.Mov +
					" RNG:" + cmd.Rng + " MOR:" + cmd.Mor + " CMD:" + cmd.Command +
					" (" + cmd.PointsCost + "pts)";
			RefreshAbRoster();
		}

		private void PopulateAbUnits()
		{
			foreach (Node c in _abUnitList.GetChildren()) c.QueueFree();
			var factionId = _match.Players[_armyBuildPlayer].FactionId;
			var allUnits = _data.GetUnitsForFaction(factionId);
			var groups = allUnits.GroupBy(u => u.Type).OrderBy(g => g.Key);
			foreach (var group in groups)
			{
				var typeLabel = new Label { Text = " " + group.Key + " " };
				typeLabel.AddThemeFontSizeOverride("font_size", 12);
				typeLabel.AddThemeColorOverride("font_color", new Color(0.6f, 0.7f, 0.8f));
				_abUnitList.AddChild(typeLabel);

				foreach (var unit in group.OrderBy(u => u.PointsCost))
				{
					var u = unit;
					var unitRow = new HBoxContainer();
					unitRow.AddThemeConstantOverride("separation", 4);
					var addBtn = new Button { Text = "+", CustomMinimumSize = new Vector2(30, 26) };
					addBtn.Pressed += () => OnAbAddUnit(u);
					unitRow.AddChild(addBtn);

					var specials = u.Special.Count > 0 ? " [" + string.Join(", ", u.Special.Take(2)) + "]" : "";
					var info = new Label
					{
						Text = u.Name + " (" + u.PointsCost + "pts) A:" + u.Atk + " D:" + u.Def +
							   " H:" + u.Hp + " M:" + u.Mov + " R:" + u.Rng + specials
					};
					info.AddThemeFontSizeOverride("font_size", 12);
					unitRow.AddChild(info);
					_abUnitList.AddChild(unitRow);
				}
			}
		}

		private void OnAbAddUnit(UnitTemplate unit)
		{
			int spent = GetAbSpent();
			if (spent + unit.PointsCost > _abBudget) return;
			var idx = _abRoster.FindIndex(r => r.tmpl.Name == unit.Name);
			if (idx >= 0)
			{
				var (t, c) = _abRoster[idx];
				if (c >= 3) return;
				_abRoster[idx] = (t, c + 1);
			}
			else _abRoster.Add((unit, 1));
			RefreshAbRoster();
		}

		private void OnAbRemoveUnit(UnitTemplate unit)
		{
			var idx = _abRoster.FindIndex(r => r.tmpl.Name == unit.Name);
			if (idx >= 0)
			{
				var (t, c) = _abRoster[idx];
				if (c <= 1) _abRoster.RemoveAt(idx);
				else _abRoster[idx] = (t, c - 1);
			}
			RefreshAbRoster();
		}

		private int GetAbSpent()
		{
			int pts = _abSelectedCmdr?.PointsCost ?? 0;
			foreach (var (tmpl, count) in _abRoster) pts += tmpl.PointsCost * count;
			return pts;
		}

		private int GetAbUnitCount()
		{
			int n = _abSelectedCmdr != null ? 1 : 0;
			foreach (var (_, count) in _abRoster) n += count;
			return n;
		}

		private void RefreshAbRoster()
		{
			foreach (Node c in _abRosterList.GetChildren()) c.QueueFree();
			if (_abSelectedCmdr != null)
			{
				var lbl = new Label { Text = "  " + _abSelectedCmdr.Name + " (" + _abSelectedCmdr.PointsCost + "pts)" };
				lbl.AddThemeFontSizeOverride("font_size", 13);
				lbl.AddThemeColorOverride("font_color", new Color(1f, 0.9f, 0.4f));
				_abRosterList.AddChild(lbl);
			}
			foreach (var (tmpl, count) in _abRoster)
			{
				var t = tmpl;
				var rosterRow = new HBoxContainer();
				rosterRow.AddThemeConstantOverride("separation", 4);
				var rm = new Button { Text = "-", CustomMinimumSize = new Vector2(28, 24) };
				rm.Pressed += () => OnAbRemoveUnit(t);
				rosterRow.AddChild(rm);
				string txt = count > 1 ? tmpl.Name + " x" + count + " (" + (tmpl.PointsCost * count) + "pts)"
									   : tmpl.Name + " (" + tmpl.PointsCost + "pts)";
				rosterRow.AddChild(new Label { Text = txt });
				_abRosterList.AddChild(rosterRow);
			}

			int spent = GetAbSpent();
			int total = GetAbUnitCount();
			_abBudgetLabel.Text = "Budget: " + spent + " / " + _abBudget + " pts | " + total + " units";
			_abBudgetLabel.AddThemeColorOverride("font_color",
				spent > _abBudget ? new Color(1f, 0.3f, 0.3f) :
				spent > _abBudget - 5 ? new Color(1f, 0.8f, 0.3f) :
				new Color(0.3f, 1f, 0.4f));
			_abConfirmBtn.Disabled = !(_abSelectedCmdr != null && total >= 4 && spent <= _abBudget);
		}

		private void OnAbAutoFill()
		{
			_abRoster.Clear();
			_abSelectedCmdr = null;
			var factionId = _match.Players[_armyBuildPlayer].FactionId;
			var cmdrs = _data.GetCommandersForFaction(factionId);
			var rng = new Random();
			if (cmdrs.Count > 0) _abSelectedCmdr = cmdrs[rng.Next(cmdrs.Count)];
			int remaining = _abBudget - (_abSelectedCmdr?.PointsCost ?? 0);
			var shuffled = _data.GetUnitsForFaction(factionId).OrderBy(_ => rng.Next()).ToList();
			foreach (var u in shuffled)
			{
				if (remaining < u.PointsCost) continue;
				var idx = _abRoster.FindIndex(r => r.tmpl.Name == u.Name);
				if (idx >= 0) { var (t, c) = _abRoster[idx]; if (c < 2) { _abRoster[idx] = (t, c + 1); remaining -= u.PointsCost; } }
				else { _abRoster.Add((u, 1)); remaining -= u.PointsCost; }
			}
			foreach (Node c in _abCmdrList.GetChildren())
				if (c is Button b) b.ButtonPressed = _abSelectedCmdr != null && b.Text.Contains(_abSelectedCmdr.Name);
			if (_abCmdrDetail != null && _abSelectedCmdr != null)
				_abCmdrDetail.Text = "[b]" + _abSelectedCmdr.Name + "[/b]\nATK:" + _abSelectedCmdr.Atk +
					" DEF:" + _abSelectedCmdr.Def + " HP:" + _abSelectedCmdr.Hp;
			RefreshAbRoster();
		}

		private void OnAbClear()
		{
			_abSelectedCmdr = null;
			_abRoster.Clear();
			foreach (Node c in _abCmdrList.GetChildren()) if (c is Button b) b.ButtonPressed = false;
			if (_abCmdrDetail != null) _abCmdrDetail.Text = "[i]Select a commander above[/i]";
			RefreshAbRoster();
		}

		private void OnAbConfirm()
		{
			CommitArmy(_armyBuildPlayer);
			_armyBuilderPanel.Visible = false;
			if (_armyBuildPlayer == 0)
			{
				if (_match.Players[1].IsAI)
				{
					AutoBuildAIArmy(1, _match.Players[1].FactionId);
					StartMatch();
				}
				else ShowArmyBuilder(1);
			}
			else StartMatch();
		}

		private void CommitArmy(int playerId)
		{
			if (_abSelectedCmdr != null)
			{
				_match.Players[playerId].Commander = _abSelectedCmdr;
				_match.AllUnits.Add(UnitInstance.FromCommander(_abSelectedCmdr, playerId));
			}
			foreach (var (tmpl, count) in _abRoster)
				for (int i = 0; i < count; i++)
					_match.AllUnits.Add(UnitInstance.FromTemplate(tmpl, playerId));
		}

		private void AutoBuildAIArmy(int playerId, string factionId)
		{
			var rng = new Random();
			var cmdrs = _data.GetCommandersForFaction(factionId);
			Commander cmdr = null;
			if (cmdrs.Count > 0) { cmdr = cmdrs[rng.Next(cmdrs.Count)]; _match.Players[playerId].Commander = cmdr; _match.AllUnits.Add(UnitInstance.FromCommander(cmdr, playerId)); }
			int remaining = _abBudget - (cmdr?.PointsCost ?? 0);
			var shuffled = _data.GetUnitsForFaction(factionId).OrderBy(_ => rng.Next()).ToList();
			var counts = new Dictionary<string, int>();
			foreach (var u in shuffled)
			{
				if (remaining < u.PointsCost) continue;
				counts.TryGetValue(u.Name, out var cur);
				if (cur < 2) { _match.AllUnits.Add(UnitInstance.FromTemplate(u, playerId)); counts[u.Name] = cur + 1; remaining -= u.PointsCost; }
			}
		}

		// 
		//  GAME START & DEPLOYMENT
		// 

		private void StartMatch()
		{
			if (_armyBuilderPanel != null) _armyBuilderPanel.Visible = false;
			_endPhaseBtn.Visible = true;
			_endTurnBtn.Visible = true;
			_backBtn.Visible = true;

			for (int p = 0; p < 2; p++)
				_match.Players[p].StartingPoints = _match.AllUnits.Where(u => u.PlayerId == p).Sum(u => u.PointsCost);

			CombatResolver.GenerateTerrain(_match);
			AutoDeploy();
			_match.RefreshEngagement();

			_match.Phase = MatchPhase.Command;
			_match.Turn = 1;
			_match.ActivePlayerId = 0;
			_match.IsFirstTurn = new bool[] { true, true };

			var p1Cmdr = _match.GetCommander(0);
			var p2Cmdr = _match.GetCommander(1);
			_match.Players[0].CommandPoints = p1Cmdr?.CommandStat ?? 5;
			_match.Players[1].CommandPoints = p2Cmdr?.CommandStat ?? 5;

			_match.AddLog("=== GAME START ===");
			_match.AddLog("Victory: " + _match.Victory);
			_match.AddLog("P1: " + _match.Players[0].FactionIcon + " " + _match.Players[0].FactionName +
				" -- " + _match.GetPlayerUnits(0).Count + " units");
			_match.AddLog("P2: " + _match.Players[1].FactionIcon + " " + _match.Players[1].FactionName +
				" -- " + _match.GetPlayerUnits(1).Count + " units");
			_match.AddLog("Turn 1 -- " + _match.ActivePlayer.Name);
			_match.Input = InputMode.None;

			UpdateUI();
			QueueRedraw();
		}

		private void AutoDeploy()
		{
			var p1 = _match.AllUnits.Where(u => u.PlayerId == 0).ToList();
			var p2 = _match.AllUnits.Where(u => u.PlayerId == 1).ToList();
			DeployUnits(p1, Rows - 3, Rows - 1, true);
			DeployUnits(p2, 0, 2, false);
		}

		private void DeployUnits(List<UnitInstance> units, int minY, int maxY, bool isBottom)
		{
			var scouts = units.Where(u => u.HasSpecial("Scout")).ToList();
			var normals = units.Where(u => !u.HasSpecial("Scout")).ToList();

			foreach (var scout in scouts)
			{
				int sy = isBottom ? minY - 1 : maxY + 1;
				sy = Math.Clamp(sy, 0, Rows - 1);
				for (int x = 0; x < Cols; x++)
					if (!_match.IsOccupied(x, sy) && _match.GetTerrain(x, sy) != TerrainType.Impassable)
					{ scout.X = x; scout.Y = sy; break; }
			}

			var cmdr = normals.FirstOrDefault(u => u.IsCommander);
			if (cmdr != null) { cmdr.X = Cols / 2; cmdr.Y = (minY + maxY) / 2; }

			var rest = normals.Where(u => !u.IsCommander).ToList();
			int placed = 0;
			for (int y = minY; y <= maxY && placed < rest.Count; y++)
				for (int x = 0; x < Cols && placed < rest.Count; x++)
					if (!_match.IsOccupied(x, y) && _match.GetTerrain(x, y) != TerrainType.Impassable)
					{ rest[placed].X = x; rest[placed].Y = y; placed++; }
		}

		// 
		//  PHASE MANAGEMENT
		// 

		private void OnEndPhase()
		{
			if (_match.Phase == MatchPhase.GameOver || _aiProcessing) return;
			switch (_match.Phase)
			{
				case MatchPhase.Command: StartMovementPhase(); break;
				case MatchPhase.Movement: StartCombatPhase(); break;
				case MatchPhase.Combat: StartEndPhase(); break;
				case MatchPhase.EndPhase: StartNextTurn(); break;
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
			_match.RefreshEngagement();

			foreach (var u in _match.GetPlayerUnits(_match.ActivePlayerId))
			{
				u.MovedThisTurn = false;
				u.HasCharged = false;
				u.DisengagedThisTurn = false;
				u.DidNotMoveThisTurn = false;
				u.PrevX = u.X; u.PrevY = u.Y;
			}

			_match.AddLog("-- Movement Phase --");
			if (_match.ActivePlayer.IsAI) { ExecuteAiPhase(); return; }
			UpdateUI(); QueueRedraw();
		}

		private void StartCombatPhase()
		{
			_match.Phase = MatchPhase.Combat;
			_match.Input = InputMode.SelectUnit;
			_match.SelectedUnit = null;
			_match.ValidMoves.Clear();
			_match.ValidTargets.Clear();
			_match.RefreshEngagement();

			foreach (var u in _match.GetPlayerUnits(_match.ActivePlayerId))
				u.AttackedThisTurn = false;

			_match.AddLog("-- Combat Phase --");
			if (_match.ActivePlayer.IsAI) { ExecuteAiPhase(); return; }
			UpdateUI(); QueueRedraw();
		}

		private void StartEndPhase()
		{
			_match.Phase = MatchPhase.EndPhase;
			_match.Input = InputMode.None;
			_match.SelectedUnit = null;
			_match.ValidMoves.Clear();
			_match.ValidTargets.Clear();
			_match.AddLog("-- End Phase --");

			var effectLogs = CombatResolver.ProcessEndPhaseEffects(_match);
			foreach (var log in effectLogs) _match.AddLog(log);

			// Morale for active player
			foreach (var unit in _match.GetPlayerUnits(_match.ActivePlayerId).ToList())
			{
				if (!unit.IsAlive) continue;
				if (unit.DamagedThisTurn)
				{
					var r = CombatResolver.CheckMorale(unit, _match);
					_match.AddLog(r.Summary);
					if (r.Routed) _match.Players[1 - _match.ActivePlayerId].Kills++;
				}
				else if (unit.IsShaken)
				{
					var r = CombatResolver.AttemptRally(unit, _match);
					_match.AddLog(r.Summary);
				}
			}

			// Morale for defending player
			foreach (var unit in _match.GetPlayerUnits(1 - _match.ActivePlayerId).ToList())
			{
				if (!unit.IsAlive) continue;
				if (unit.DamagedThisTurn)
				{
					var r = CombatResolver.CheckMorale(unit, _match);
					_match.AddLog(r.Summary);
					if (r.Routed) _match.Players[_match.ActivePlayerId].Kills++;
				}
				else if (unit.IsShaken)
				{
					var r = CombatResolver.AttemptRally(unit, _match);
					_match.AddLog(r.Summary);
				}
			}

			// Objective scoring
			if (_match.Victory == VictoryMode.ObjectiveControl || _match.Victory == VictoryMode.KingOfTheHill)
			{
				foreach (var (ox, oy) in _match.Objectives)
				{
					var holder = _match.GetUnitAt(ox, oy);
					if (holder != null)
					{
						_match.Players[holder.PlayerId].VictoryPoints += 1;
						_match.AddLog(_match.Players[holder.PlayerId].Name + " scores 1 VP (objective)");
					}
				}
			}

			foreach (var u in _match.AllUnits) u.DamagedThisTurn = false;
			_match.RefreshEngagement();
			CheckVictory();
			UpdateUI(); QueueRedraw();
		}

		private void StartNextTurn()
		{
			_match.IsFirstTurn[_match.ActivePlayerId] = false;
			_match.ActivePlayerId = 1 - _match.ActivePlayerId;
			_match.Turn++;

			var cmdr = _match.GetCommander(_match.ActivePlayerId);
			if (cmdr != null && cmdr.IsAlive)
			{
				int cp = cmdr.CommandStat;
				_match.ActivePlayer.ReactionPoints += cp;
				_match.AddLog(_match.ActivePlayer.Name + " gains " + cp + " CP from " + cmdr.Name);
			}

			int alive = _match.GetPlayerUnits(_match.ActivePlayerId).Where(u => u.IsAlive).Sum(u => u.PointsCost);
			int total = _match.ActivePlayer.StartingPoints;
			if (total > 0 && alive <= total / 2)
			{
				_match.ActivePlayer.ReactionPoints += 1;
				_match.AddLog("Desperation Rally! +1 CP (underdog)");
			}

			_match.AddLog("=== Turn " + _match.Turn + " -- " + _match.ActivePlayer.Name + " ===");
			_match.Phase = MatchPhase.Command;
			_match.Input = InputMode.None;
			_match.SelectedUnit = null;
			_match.ValidMoves.Clear();
			_match.ValidTargets.Clear();
			StartMovementPhase();
		}

		// 
		//  VICTORY
		// 

		private void CheckVictory()
		{
			if (_match.Phase == MatchPhase.GameOver) return;
			int winner = -1;
			string reason = "";

			switch (_match.Victory)
			{
				case VictoryMode.Annihilation:
					for (int p = 0; p < 2; p++)
					{
						var c = _match.GetCommander(p);
						bool cmdDead = c == null || !c.IsAlive;
						bool allDead = _match.GetPlayerUnits(p).All(u => !u.IsAlive);
						if (cmdDead || allDead) { winner = 1 - p; reason = cmdDead ? "Commander destroyed!" : "All units destroyed!"; }
					}
					break;
				case VictoryMode.Attrition:
					if (_match.Turn > 12)
					{
						int v0 = _match.Players[0].VictoryPoints, v1 = _match.Players[1].VictoryPoints;
						winner = v0 >= v1 ? 0 : 1;
						reason = "Most VP after 6 rounds!";
					}
					for (int p = 0; p < 2; p++)
						if (_match.GetPlayerUnits(p).All(u => !u.IsAlive)) { winner = 1 - p; reason = "All enemies destroyed!"; }
					break;
				case VictoryMode.ObjectiveControl:
					for (int p = 0; p < 2; p++)
						if (_match.Players[p].VictoryPoints >= 5) { winner = p; reason = "Reached 5 VP!"; }
					if (winner < 0 && _match.Turn > 16)
					{ winner = _match.Players[0].VictoryPoints >= _match.Players[1].VictoryPoints ? 0 : 1; reason = "Most VP after 8 rounds!"; }
					break;
				case VictoryMode.KingOfTheHill:
					for (int p = 0; p < 2; p++)
						if (_match.Players[p].VictoryPoints >= 6) { winner = p; reason = "Reached 6 VP!"; }
					if (winner < 0 && _match.Turn > 16)
					{ winner = _match.Players[0].VictoryPoints >= _match.Players[1].VictoryPoints ? 0 : 1; reason = "Most VP after 8 rounds!"; }
					break;
			}
			if (winner >= 0) EndGame(winner, reason);
		}

		private void EndGame(int winnerId, string reason)
		{
			_match.Phase = MatchPhase.GameOver;
			_match.Input = InputMode.None;
			_match.Winner = _match.Players[winnerId].Name;
			_match.AddLog("*** " + _match.Players[winnerId].Name + " WINS! " + reason + " ***");
			_endPhaseBtn.Visible = false;
			_endTurnBtn.Visible = false;
			_playAgainBtn.Visible = true;
			UpdateUI(); QueueRedraw();
		}

		// 
		//  AI EXECUTION
		// 

		private async void ExecuteAiPhase()
		{
			_aiProcessing = true;
			_match.Input = InputMode.None;
			UpdateUI();

			await ToSignal(GetTree().CreateTimer(0.3), "timeout");

			List<string> logs;
			if (_match.Phase == MatchPhase.Movement)
				logs = _ai.ExecuteMovementPhase(_match, _match.ActivePlayerId);
			else
				logs = _ai.ExecuteCombatPhase(_match, _match.ActivePlayerId);

			foreach (var log in logs) _match.AddLog(log);

			QueueRedraw();
			await ToSignal(GetTree().CreateTimer(0.5), "timeout");

			FinishAiTurn();
		}

		private void FinishAiTurn()
		{
			_aiProcessing = false;
			if (_match.Phase == MatchPhase.Movement) StartCombatPhase();
			else if (_match.Phase == MatchPhase.Combat) StartEndPhase();
		}

		// 
		//  INPUT HANDLING
		// 

		public override void _Input(InputEvent ev)
		{
			if (ev is InputEventKey key && key.Pressed && key.Keycode == Key.Escape)
			{
				OnBackToMenu();
				GetViewport().SetInputAsHandled();
				return;
			}

			if (ev is InputEventMouseMotion mm)
			{
				_mousePos = mm.Position;
				int cx = (int)((mm.Position.X - BoardLeft) / CellSize);
				int cy = (int)((mm.Position.Y - BoardTop) / CellSize);
				_hoverCell = (cx >= 0 && cx < Cols && cy >= 0 && cy < Rows)
					? new Vector2I(cx, cy) : new Vector2I(-1, -1);
				QueueRedraw();
				return;
			}

			if (_match == null || _match.Phase == MatchPhase.GameOver || _aiProcessing) return;

			if (ev is InputEventMouseButton mb && mb.Pressed && mb.ButtonIndex == MouseButton.Left)
				HandleBoardClick(mb.Position);

			if (ev is InputEventMouseButton mb2 && mb2.Pressed && mb2.ButtonIndex == MouseButton.Right)
			{
				_match.SelectedUnit = null;
				_match.ValidMoves.Clear();
				_match.ValidTargets.Clear();
				_match.Input = InputMode.SelectUnit;
				UpdateUI(); QueueRedraw();
			}
		}

		private void HandleBoardClick(Vector2 pos)
		{
			int cx = (int)((pos.X - BoardLeft) / CellSize);
			int cy = (int)((pos.Y - BoardTop) / CellSize);
			if (cx < 0 || cx >= Cols || cy < 0 || cy >= Rows) return;
			switch (_match.Input)
			{
				case InputMode.SelectUnit: HandleSelectUnit(cx, cy); break;
				case InputMode.SelectMoveTarget: HandleSelectMoveTarget(cx, cy); break;
				case InputMode.SelectAttackTarget: HandleSelectAttackTarget(cx, cy); break;
			}
		}

		private void HandleSelectUnit(int col, int row)
		{
			var unit = _match.GetUnitAt(col, row);
			if (unit == null || unit.PlayerId != _match.ActivePlayerId || !unit.IsAlive) return;
			_match.SelectedUnit = unit;
			if (_match.Phase == MatchPhase.Movement)
			{
				if (unit.MovedThisTurn) { _match.AddLog(unit.Name + " already moved."); UpdateUI(); QueueRedraw(); return; }
				_match.ValidMoves = CombatResolver.GetValidMoves(unit, _match);
				_match.Input = InputMode.SelectMoveTarget;
			}
			else if (_match.Phase == MatchPhase.Combat)
			{
				if (unit.AttackedThisTurn) { _match.AddLog(unit.Name + " already attacked."); UpdateUI(); QueueRedraw(); return; }
				_match.ValidTargets = CombatResolver.GetValidTargets(unit, _match);
				_match.Input = InputMode.SelectAttackTarget;
			}
			UpdateUI(); QueueRedraw();
		}

		private void HandleSelectMoveTarget(int col, int row)
		{
			var unit = _match.SelectedUnit;
			if (unit == null) { _match.Input = InputMode.SelectUnit; return; }
			if (col == unit.X && row == unit.Y)
			{
				_match.SelectedUnit = null; _match.ValidMoves.Clear();
				_match.Input = InputMode.SelectUnit; UpdateUI(); QueueRedraw(); return;
			}
			if (!_match.ValidMoves.Any(m => m.x == col && m.y == row))
			{
				_match.SelectedUnit = null; _match.ValidMoves.Clear();
				_match.Input = InputMode.SelectUnit;
				HandleSelectUnit(col, row);
				return;
			}
			unit.PrevX = unit.X; unit.PrevY = unit.Y;
			bool wasEngaged = unit.IsEngaged;
			unit.X = col; unit.Y = row; unit.MovedThisTurn = true;
			bool isCharge = CombatResolver.IsChargeMove(unit, col, row, _match)
							&& !_match.IsFirstTurn[_match.ActivePlayerId];
			unit.HasCharged = isCharge;
			if (wasEngaged) { unit.DisengagedThisTurn = true; _match.AddLog(unit.Name + " disengages!"); }
			if (isCharge) _match.AddLog(unit.Name + " CHARGES to (" + col + "," + row + ")!");
			else _match.AddLog(unit.Name + " moves to (" + col + "," + row + ")");
			_match.RefreshEngagement();
			_match.SelectedUnit = null; _match.ValidMoves.Clear();
			_match.Input = InputMode.SelectUnit;
			UpdateUI(); QueueRedraw();
		}

		private void HandleSelectAttackTarget(int col, int row)
		{
			var attacker = _match.SelectedUnit;
			if (attacker == null) { _match.Input = InputMode.SelectUnit; return; }
			if (col == attacker.X && row == attacker.Y)
			{
				_match.SelectedUnit = null; _match.ValidTargets.Clear();
				_match.Input = InputMode.SelectUnit; UpdateUI(); QueueRedraw(); return;
			}
			var defender = _match.GetUnitAt(col, row);
			if (defender == null || !_match.ValidTargets.Any(t => t.X == col && t.Y == row))
			{
				_match.SelectedUnit = null; _match.ValidTargets.Clear();
				_match.Input = InputMode.SelectUnit;
				HandleSelectUnit(col, row);
				return;
			}
			bool isCharging = attacker.HasCharged;
			var result = CombatResolver.ResolveAttack(attacker, defender, _match, isCharging);
			_match.AddLog(result.Summary);

			_lastRolls = result.Rolls;
			_lastDefTarget = result.DefenseTarget;
			_lastRollLabel = attacker.Name + " vs " + defender.Name;
			_diceShowTimer = 4.0f;

			attacker.AttackedThisTurn = true;
			if (attacker.IsStealthed) attacker.IsStealthed = false;

			if (!defender.IsAlive && defender.IsCommander)
			{
				_match.Players[defender.PlayerId].CommanderDead = true;
				_match.AddLog("*** COMMANDER " + defender.Name + " HAS FALLEN! ***");
				foreach (var u in _match.GetPlayerUnits(defender.PlayerId).ToList())
					if (u.IsAlive && !u.IsCommander) u.CommanderDeadMoralePending = true;
			}

			if (!defender.IsAlive)
			{
				_match.Players[attacker.PlayerId].VictoryPoints += defender.PointsCost;
				_match.AddLog(attacker.Name + " earns " + defender.PointsCost + " VP");
			}

			if (attacker.HasSpecial("Double Strike") && attacker.IsAlive && defender.IsAlive)
			{
				_match.AddLog(attacker.Name + " Double Strikes!");
				var r2 = CombatResolver.ResolveAttack(attacker, defender, _match, false);
				_match.AddLog(r2.Summary);
				_lastRolls = r2.Rolls; _lastDefTarget = r2.DefenseTarget;
				_lastRollLabel += " (x2)";
				if (!defender.IsAlive)
				{
					_match.Players[attacker.PlayerId].VictoryPoints += defender.PointsCost;
					if (defender.IsCommander) { _match.Players[defender.PlayerId].CommanderDead = true; _match.AddLog("*** COMMANDER SLAIN ***"); }
				}
			}

			_match.RefreshEngagement();
			_match.SelectedUnit = null; _match.ValidTargets.Clear();
			_match.Input = InputMode.SelectUnit;
			CheckVictory();
			UpdateUI(); QueueRedraw();
		}

		// 
		//  DRAWING  THE TABLETOP
		// 

		public override void _Draw()
		{
			if (_factionSelectPanel != null && _factionSelectPanel.Visible) return;
			if (_victorySelectPanel != null && _victorySelectPanel.Visible) return;
			if (_armyBuilderPanel != null && _armyBuilderPanel.Visible) return;

			DrawBoard();
			DrawAllUnits();
			DrawDiceTray();
			DrawUnitCard();
			DrawScoreboard();
			if (_hoverCell.X >= 0) DrawHoverTooltip();
			if (_match.Phase == MatchPhase.GameOver) DrawGameOverBanner();
		}

		private void DrawBoard()
		{
			// Felt background
			DrawRect(new Rect2(0, 0, 1280, 800), TableFelt);

			// Wood frame
			DrawRect(new Rect2(BoardLeft - 3, BoardTop - 3, BoardW + 6, BoardH + 6), new Color(0.35f, 0.22f, 0.1f));

			for (int x = 0; x < Cols; x++)
			{
				for (int y = 0; y < Rows; y++)
				{
					float px = BoardLeft + x * CellSize;
					float py = BoardTop + y * CellSize;
					var cellRect = new Rect2(px, py, CellSize, CellSize);

					Color baseCol = ((x + y) % 2 == 0) ? CellLight : CellDark;

					var terrain = _match.Terrain[x, y];
					switch (terrain)
					{
						case TerrainType.Forest: baseCol = new Color(0.15f, 0.35f, 0.12f); break;
						case TerrainType.Ruins: baseCol = new Color(0.38f, 0.32f, 0.25f); break;
						case TerrainType.Elevated: baseCol = new Color(0.45f, 0.38f, 0.28f); break;
						case TerrainType.Water: baseCol = new Color(0.15f, 0.28f, 0.45f); break;
						case TerrainType.DifficultTerrain: baseCol = new Color(0.32f, 0.28f, 0.18f); break;
						case TerrainType.Impassable: baseCol = new Color(0.2f, 0.15f, 0.1f); break;
						case TerrainType.Cover: baseCol = new Color(0.28f, 0.30f, 0.20f); break;
					}
					DrawRect(cellRect, baseCol);

					var center = new Vector2(px + CellSize / 2, py + CellSize / 2);
					switch (terrain)
					{
						case TerrainType.Forest:
							DrawColoredPolygon(new Vector2[] {
								center + new Vector2(0, -18), center + new Vector2(-12, 10), center + new Vector2(12, 10)
							}, new Color(0.1f, 0.5f, 0.1f, 0.7f));
							DrawRect(new Rect2(center.X - 2, center.Y + 10, 4, 8), new Color(0.4f, 0.25f, 0.1f, 0.7f));
							break;
						case TerrainType.Ruins:
							DrawRect(new Rect2(center.X - 8, center.Y - 14, 6, 28), new Color(0.55f, 0.45f, 0.35f, 0.6f));
							DrawRect(new Rect2(center.X + 2, center.Y - 6, 6, 20), new Color(0.55f, 0.45f, 0.35f, 0.6f));
							break;
						case TerrainType.Elevated:
							DrawColoredPolygon(new Vector2[] {
								center + new Vector2(0, -16), center + new Vector2(-10, -2), center + new Vector2(10, -2)
							}, new Color(0.6f, 0.5f, 0.3f, 0.5f));
							DrawRect(new Rect2(center.X - 4, center.Y - 2, 8, 14), new Color(0.6f, 0.5f, 0.3f, 0.5f));
							break;
						case TerrainType.Water:
							for (int w = -1; w <= 1; w++)
							{
								float wy = center.Y + w * 8;
								DrawLine(new Vector2(px + 8, wy), new Vector2(px + 18, wy - 4), new Color(0.3f, 0.5f, 0.8f, 0.6f), 2);
								DrawLine(new Vector2(px + 18, wy - 4), new Vector2(px + 28, wy), new Color(0.3f, 0.5f, 0.8f, 0.6f), 2);
								DrawLine(new Vector2(px + 28, wy), new Vector2(px + 38, wy - 4), new Color(0.3f, 0.5f, 0.8f, 0.6f), 2);
								DrawLine(new Vector2(px + 38, wy - 4), new Vector2(px + 48, wy), new Color(0.3f, 0.5f, 0.8f, 0.6f), 2);
							}
							break;
						case TerrainType.Impassable:
							DrawLine(new Vector2(px + 8, py + 8), new Vector2(px + CellSize - 8, py + CellSize - 8), new Color(0.6f, 0.1f, 0.1f, 0.5f), 3);
							DrawLine(new Vector2(px + CellSize - 8, py + 8), new Vector2(px + 8, py + CellSize - 8), new Color(0.6f, 0.1f, 0.1f, 0.5f), 3);
							break;
						case TerrainType.Cover:
							DrawRect(new Rect2(px + 8, center.Y - 3, CellSize - 16, 6), new Color(0.55f, 0.4f, 0.3f, 0.7f));
							break;
					}

					DrawRect(cellRect, GridLine, false, 1);
				}
			}

			// Deployment zone tints
			for (int x = 0; x < Cols; x++)
			{
				for (int r = 0; r < 2; r++)
				{
					DrawRect(new Rect2(BoardLeft + x * CellSize, BoardTop + (Rows - 1 - r) * CellSize, CellSize, CellSize), DeployBlue);
					DrawRect(new Rect2(BoardLeft + x * CellSize, BoardTop + r * CellSize, CellSize, CellSize), DeployRed);
				}
			}

			// Objectives
			foreach (var (ox, oy) in _match.Objectives)
			{
				float ocx = BoardLeft + ox * CellSize + CellSize / 2;
				float ocy = BoardTop + oy * CellSize + CellSize / 2;
				DrawCircle(new Vector2(ocx, ocy), 14, new Color(ObjGold.R, ObjGold.G, ObjGold.B, 0.3f));
				DrawArc(new Vector2(ocx, ocy), 14, 0, Mathf.Tau, 24, ObjGold, 2.5f);
				DrawString(ThemeDB.FallbackFont, new Vector2(ocx - 6, ocy + 5), "VP", HorizontalAlignment.Left, -1, 10, ObjGold);
			}

			// Move highlights
			foreach (var (mx, my) in _match.ValidMoves)
			{
				float hx = BoardLeft + mx * CellSize;
				float hy = BoardTop + my * CellSize;
				bool isCharge = _match.SelectedUnit != null && !_match.IsFirstTurn[_match.ActivePlayerId]
					&& CombatResolver.IsChargeMove(_match.SelectedUnit, mx, my, _match);
				DrawRect(new Rect2(hx + 2, hy + 2, CellSize - 4, CellSize - 4), isCharge ? ChargeOrange : MoveGreen);
				if (isCharge)
					DrawString(ThemeDB.FallbackFont, new Vector2(hx + 6, hy + 16), "CHG", HorizontalAlignment.Left, -1, 10, Colors.White);
			}

			// Attack highlights
			foreach (var tgt in _match.ValidTargets)
			{
				float hx = BoardLeft + tgt.X * CellSize;
				float hy = BoardTop + tgt.Y * CellSize;
				DrawRect(new Rect2(hx + 1, hy + 1, CellSize - 2, CellSize - 2), AttackRed);
			}

			// Hover cell
			if (_hoverCell.X >= 0 && _hoverCell.X < Cols && _hoverCell.Y >= 0 && _hoverCell.Y < Rows)
			{
				float hx = BoardLeft + _hoverCell.X * CellSize;
				float hy = BoardTop + _hoverCell.Y * CellSize;
				DrawRect(new Rect2(hx, hy, CellSize, CellSize), new Color(1, 1, 1, 0.12f));
				DrawRect(new Rect2(hx, hy, CellSize, CellSize), new Color(1, 1, 1, 0.3f), false, 1.5f);
			}
		}

		// 
		//  DRAWING  UNIT TOKENS
		// 

		private void DrawAllUnits()
		{
			foreach (var u in _match.AllUnits)
				if (u.IsAlive) DrawUnitToken(u);
		}

		private void DrawUnitToken(UnitInstance u)
		{
			float cx = BoardLeft + u.X * CellSize + CellSize / 2;
			float cy = BoardTop + u.Y * CellSize + CellSize / 2;
			float radius = CellSize * 0.4f;
			var center = new Vector2(cx, cy);

			Color factionCol = _match.Players[u.PlayerId].FactionColor;

			// Base circle
			DrawCircle(center, radius + 2, new Color(0.05f, 0.05f, 0.05f));
			DrawArc(center, radius + 1, 0, Mathf.Tau, 32, factionCol, 3);

			// Inner fill
			Color innerCol = u.PlayerId == 0
				? new Color(0.15f, 0.2f, 0.35f)
				: new Color(0.35f, 0.15f, 0.15f);
			if (u.IsCommander) innerCol = innerCol.Lightened(0.15f);
			if (u.IsShaken) innerCol = innerCol.Lerp(new Color(1, 1, 0), 0.3f);
			if (u.IsStealthed) innerCol = innerCol.Lerp(new Color(0, 0, 0), 0.4f);
			DrawCircle(center, radius - 1, innerCol);

			// Unit abbreviation
			string abbr = u.ShortLabel;
			int fontSize = u.IsCommander ? 14 : 11;
			float textW = abbr.Length * fontSize * 0.45f;
			DrawString(ThemeDB.FallbackFont, new Vector2(cx - textW / 2, cy + fontSize / 3), abbr,
				HorizontalAlignment.Left, -1, fontSize, Colors.White);

			// Commander crown
			if (u.IsCommander)
			{
				DrawColoredPolygon(new Vector2[] {
					center + new Vector2(-8, -radius - 4),
					center + new Vector2(-5, -radius - 10),
					center + new Vector2(0, -radius - 6),
					center + new Vector2(5, -radius - 10),
					center + new Vector2(8, -radius - 4),
				}, new Color(1f, 0.85f, 0.2f));
			}

			// HP arc
			float hpPct = (float)u.CurrentHp / u.MaxHp;
			Color hpCol = hpPct > 0.5f ? new Color(0.2f, 0.8f, 0.2f)
				: hpPct > 0.25f ? new Color(0.9f, 0.7f, 0.1f)
				: new Color(0.9f, 0.2f, 0.1f);
			if (hpPct < 1f)
				DrawArc(center, radius - 3, -Mathf.Pi / 2, -Mathf.Pi / 2 + hpPct * Mathf.Tau, 24, hpCol, 2.5f);

			// Engagement ring
			if (u.IsEngaged)
				DrawArc(center, radius + 4, 0, Mathf.Tau, 24, EngageRing, 2);

			// Selection ring
			if (_match.SelectedUnit == u)
				DrawArc(center, radius + 6, 0, Mathf.Tau, 24, SelectRing, 2.5f);

			// Status dots
			float dotY = cy + radius - 4;
			float dotX = cx - 8;
			if (u.IsBurning) { DrawCircle(new Vector2(dotX, dotY), 3, new Color(1, 0.4f, 0)); dotX += 8; }
			if (u.IsStaggered) { DrawCircle(new Vector2(dotX, dotY), 3, new Color(0.8f, 0.8f, 0)); dotX += 8; }
			if (u.IsStealthed) { DrawCircle(new Vector2(dotX, dotY), 3, new Color(0.5f, 0.2f, 0.8f)); dotX += 8; }
			if (u.HasCharged) DrawCircle(new Vector2(dotX, dotY), 3, ChargeOrange);
		}

		// 
		//  DRAWING  DICE TRAY
		// 

		private void DrawDiceTray()
		{
			if (_diceShowTimer <= 0 || _lastRolls == null || _lastRolls.Count == 0) return;

			float trayX = CardPanelX, trayY = 60, trayW = CardPanelW, trayH = 120;
			DrawRect(new Rect2(trayX, trayY, trayW, trayH), DiceBg);
			DrawRect(new Rect2(trayX, trayY, trayW, trayH), new Color(0.5f, 0.4f, 0.2f), false, 2);

			DrawString(ThemeDB.FallbackFont, new Vector2(trayX + 8, trayY + 16), _lastRollLabel,
				HorizontalAlignment.Left, (int)trayW - 16, 12, Colors.White);
			DrawString(ThemeDB.FallbackFont, new Vector2(trayX + 8, trayY + 32),
				"Need " + _lastDefTarget + "+ to hit", HorizontalAlignment.Left, -1, 11, new Color(0.8f, 0.8f, 0.6f));

			float ds = 36, gap = 6, sx = trayX + 10, sy = trayY + 42;
			int maxPerRow = (int)((trayW - 20) / (ds + gap));
			for (int i = 0; i < _lastRolls.Count; i++)
			{
				int r = i / maxPerRow, c = i % maxPerRow;
				float dx = sx + c * (ds + gap), dy = sy + r * (ds + gap);
				bool isHit = _lastRolls[i] >= _lastDefTarget;
				DrawRect(new Rect2(dx, dy, ds, ds), isHit ? new Color(0.15f, 0.4f, 0.15f) : new Color(0.4f, 0.12f, 0.12f));
				DrawRect(new Rect2(dx, dy, ds, ds), new Color(0.8f, 0.8f, 0.7f), false, 1.5f);
				DrawString(ThemeDB.FallbackFont, new Vector2(dx + ds / 2 - 6, dy + ds / 2 + 6),
					_lastRolls[i].ToString(), HorizontalAlignment.Left, -1, 18, Colors.White);
				DrawString(ThemeDB.FallbackFont, new Vector2(dx + 2, dy + ds - 2),
					isHit ? "HIT" : "MISS", HorizontalAlignment.Left, -1, 8,
					isHit ? new Color(0.3f, 1f, 0.3f) : new Color(1f, 0.4f, 0.4f));
			}
		}

		// 
		//  DRAWING  UNIT STAT CARD
		// 

		private void DrawUnitCard()
		{
			UnitInstance cardUnit = _match.SelectedUnit;
			if (cardUnit == null && _hoverCell.X >= 0 && _hoverCell.Y >= 0)
				cardUnit = _match.GetUnitAt(_hoverCell.X, _hoverCell.Y);
			if (cardUnit == null) return;

			float cardX = CardPanelX, cardY = _diceShowTimer > 0 ? 190 : 60;
			float cardW = CardPanelW, cardH = 300;

			DrawRect(new Rect2(cardX, cardY, cardW, cardH), CardBg);
			DrawRect(new Rect2(cardX, cardY, cardW, cardH), CardBorder, false, 2);

			Color hdr = cardUnit.PlayerId == 0 ? new Color(0.12f, 0.15f, 0.3f) : new Color(0.3f, 0.12f, 0.12f);
			DrawRect(new Rect2(cardX, cardY, cardW, 32), hdr);
			string nameStr = (cardUnit.IsCommander ? " " : "") + cardUnit.Name;
			DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 8, cardY + 22), nameStr,
				HorizontalAlignment.Left, (int)cardW - 16, 16, Colors.White);

			float ly = cardY + 44;
			int fs = 13;
			Color tc = new Color(0.85f, 0.85f, 0.8f), vc = Colors.White;

			DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 12, ly), "ATK", HorizontalAlignment.Left, -1, fs, tc);
			DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 60, ly), cardUnit.EffectiveAtk.ToString(), HorizontalAlignment.Left, -1, fs, vc);
			DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 120, ly), "DEF", HorizontalAlignment.Left, -1, fs, tc);
			DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 168, ly), cardUnit.EffectiveDef.ToString(), HorizontalAlignment.Left, -1, fs, vc);
			ly += 20;
			DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 12, ly), "HP", HorizontalAlignment.Left, -1, fs, tc);
			DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 60, ly), cardUnit.CurrentHp + "/" + cardUnit.MaxHp, HorizontalAlignment.Left, -1, fs, vc);
			DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 120, ly), "SPD", HorizontalAlignment.Left, -1, fs, tc);
			DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 168, ly), cardUnit.BaseMov.ToString(), HorizontalAlignment.Left, -1, fs, vc);
			ly += 20;
			DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 12, ly), "RNG", HorizontalAlignment.Left, -1, fs, tc);
			DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 60, ly), cardUnit.BaseRng.ToString(), HorizontalAlignment.Left, -1, fs, vc);
			DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 120, ly), "MOR", HorizontalAlignment.Left, -1, fs, tc);
			DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 168, ly), cardUnit.BaseMor.ToString(), HorizontalAlignment.Left, -1, fs, vc);
			ly += 24;

			// HP bar
			float barW = cardW - 24, barH = 12;
			DrawRect(new Rect2(cardX + 12, ly, barW, barH), new Color(0.2f, 0.05f, 0.05f));
			float hpPct = (float)cardUnit.CurrentHp / cardUnit.MaxHp;
			Color hpBarCol = hpPct > 0.5f ? new Color(0.2f, 0.7f, 0.2f) : hpPct > 0.25f ? new Color(0.8f, 0.6f, 0.1f) : new Color(0.8f, 0.15f, 0.1f);
			DrawRect(new Rect2(cardX + 12, ly, barW * hpPct, barH), hpBarCol);
			DrawRect(new Rect2(cardX + 12, ly, barW, barH), new Color(0.5f, 0.5f, 0.4f), false, 1);
			ly += 22;

			if (cardUnit.Specials.Count > 0)
			{
				DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 12, ly), "Keywords:", HorizontalAlignment.Left, -1, 11, tc);
				ly += 16;
				DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 12, ly), string.Join(", ", cardUnit.Specials),
					HorizontalAlignment.Left, (int)cardW - 24, 11, new Color(0.7f, 0.9f, 0.7f));
				ly += 18;
			}

			var statuses = new List<string>();
			if (cardUnit.IsShaken) statuses.Add("Shaken");
			if (cardUnit.IsEngaged) statuses.Add("Engaged");
			if (cardUnit.IsBurning) statuses.Add("Burning");
			if (cardUnit.IsStaggered) statuses.Add("Staggered");
			if (cardUnit.IsStealthed) statuses.Add("Stealth");
			if (cardUnit.HasCharged) statuses.Add("Charged");
			if (statuses.Count > 0)
			{
				DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 12, ly), "Status: " + string.Join(", ", statuses),
					HorizontalAlignment.Left, (int)cardW - 24, 11, new Color(1f, 0.7f, 0.4f));
				ly += 16;
			}

			string flags = "";
			if (cardUnit.MovedThisTurn) flags += "[Moved] ";
			if (cardUnit.AttackedThisTurn) flags += "[Attacked] ";
			if (flags.Length > 0)
				DrawString(ThemeDB.FallbackFont, new Vector2(cardX + 12, ly), flags,
					HorizontalAlignment.Left, (int)cardW - 24, 10, new Color(0.7f, 0.7f, 0.5f));
		}

		// 
		//  DRAWING  SCOREBOARD
		// 

		private void DrawScoreboard()
		{
			float sx = CardPanelX, sy = 370;
			if (_diceShowTimer > 0) sy = 500;
			float sw = CardPanelW, sh = 110;

			DrawRect(new Rect2(sx, sy, sw, sh), new Color(0.08f, 0.08f, 0.06f, 0.9f));
			DrawRect(new Rect2(sx, sy, sw, sh), new Color(0.4f, 0.35f, 0.2f), false, 1);

			for (int p = 0; p < 2; p++)
			{
				var mp = _match.Players[p];
				float py = sy + 6 + p * 52;
				Color col = mp.FactionColor;
				DrawRect(new Rect2(sx + 4, py, sw - 8, 48), new Color(col.R, col.G, col.B, 0.15f));

				string name = mp.FactionIcon + " " + mp.FactionName + (p == _match.ActivePlayerId ? " *" : "");
				DrawString(ThemeDB.FallbackFont, new Vector2(sx + 10, py + 18), name,
					HorizontalAlignment.Left, (int)sw - 20, 14, col);

				int alive = _match.GetPlayerUnits(p).Count(u => u.IsAlive);
				int totalU = _match.GetPlayerUnits(p).Count;
				string stats = "VP:" + mp.VictoryPoints + "  Units:" + alive + "/" + totalU + "  CP:" + mp.CommandPoints;
				DrawString(ThemeDB.FallbackFont, new Vector2(sx + 10, py + 38), stats,
					HorizontalAlignment.Left, (int)sw - 20, 12, new Color(0.8f, 0.8f, 0.75f));
			}
		}

		// 
		//  DRAWING  TOOLTIP & GAME OVER
		// 

		private void DrawHoverTooltip()
		{
			var u = _match.GetUnitAt(_hoverCell.X, _hoverCell.Y);
			var lines = new List<string>();
			var terrain = _match.GetTerrain(_hoverCell.X, _hoverCell.Y);
			if (terrain != TerrainType.Open) lines.Add("Terrain: " + terrain);
			foreach (var (ox, oy) in _match.Objectives)
				if (ox == _hoverCell.X && oy == _hoverCell.Y) lines.Add("** OBJECTIVE **");
			if (u != null)
			{
				lines.Add(u.Name + (u.IsCommander ? " [CMDR]" : ""));
				lines.Add("HP: " + u.CurrentHp + "/" + u.MaxHp);
				lines.Add("ATK:" + u.EffectiveAtk + " DEF:" + u.EffectiveDef + " RNG:" + u.BaseRng + " MOV:" + u.BaseMov);
				if (u.Specials.Count > 0) lines.Add("Specials: " + string.Join(", ", u.Specials));
			}
			if (lines.Count == 0) return;

			float tw = 260, th = lines.Count * 16 + 12;
			float tx = _mousePos.X + 16, ty = _mousePos.Y + 16;
			if (tx + tw > 1280) tx = _mousePos.X - tw - 8;
			if (ty + th > 800) ty = _mousePos.Y - th - 8;
			DrawRect(new Rect2(tx, ty, tw, th), new Color(0.08f, 0.08f, 0.12f, 0.92f));
			DrawRect(new Rect2(tx, ty, tw, th), new Color(0.5f, 0.5f, 0.6f), false, 1);
			for (int i = 0; i < lines.Count; i++)
				DrawString(ThemeDB.FallbackFont, new Vector2(tx + 6, ty + 14 + i * 16),
					lines[i], HorizontalAlignment.Left, (int)tw - 10, 12, new Color(0.9f, 0.9f, 0.9f));
		}

		private void DrawGameOverBanner()
		{
			DrawRect(new Rect2(0, 300, 1280, 120), new Color(0, 0, 0, 0.75f));
			DrawString(ThemeDB.FallbackFont, new Vector2(200, 360), "GAME OVER",
				HorizontalAlignment.Left, -1, 36, new Color(1, 0.85f, 0.2f));
			DrawString(ThemeDB.FallbackFont, new Vector2(200, 395), _match.Winner ?? "Draw",
				HorizontalAlignment.Left, -1, 20, Colors.White);
		}

		// 
		//  HUD UPDATE
		// 

		private void UpdateUI()
		{
			if (_turnBanner == null || _match == null) return;

			string turnInfo = "Turn " + _match.Turn + " | " + _match.ActivePlayer.FactionIcon + " " + _match.ActivePlayer.FactionName;
			string vpInfo = " | VP: " + _match.Players[0].VictoryPoints + " - " + _match.Players[1].VictoryPoints;
			_turnBanner.Text = _match.Phase == MatchPhase.GameOver ? "GAME OVER" : turnInfo + vpInfo;

			string phaseStr = _match.Phase.ToString().ToUpper();
			if (_match.ActivePlayer.IsAI && _match.Phase != MatchPhase.GameOver) phaseStr += " (AI)";
			_phaseBanner.Text = phaseStr;

			_instructionLabel.Text = GetInstructions();

			var recent = _match.Log.Skip(Math.Max(0, _match.Log.Count - 8)).ToList();
			_logLabel.Text = string.Join("\n", recent);

			bool isHuman = !_match.ActivePlayer.IsAI && _match.Phase != MatchPhase.GameOver;
			_endPhaseBtn.Visible = isHuman;
			_endPhaseBtn.Text = _match.Phase == MatchPhase.EndPhase ? "Next Turn" : "End Phase";
			_endTurnBtn.Visible = isHuman;
			_backBtn.Visible = true;
			_playAgainBtn.Visible = _match.Phase == MatchPhase.GameOver;
		}

		private string GetInstructions()
		{
			if (_match.Phase == MatchPhase.GameOver) return "Game Over! Press Play Again or Escape.";
			if (_aiProcessing) return "AI is thinking...";
			switch (_match.Phase)
			{
				case MatchPhase.Movement:
					if (_match.Input == InputMode.SelectUnit) return "Click one of your units to move it.";
					if (_match.Input == InputMode.SelectMoveTarget)
					{
						string extra = "";
						if (_match.SelectedUnit != null && _match.SelectedUnit.IsEngaged) extra = " (ENGAGED)";
						if (!_match.IsFirstTurn[_match.ActivePlayerId]) extra += " Orange = charge";
						return "Click a green cell to move." + extra + " Right-click to deselect.";
					}
					break;
				case MatchPhase.Combat:
					if (_match.Input == InputMode.SelectUnit) return "Click one of your units to attack with it.";
					if (_match.Input == InputMode.SelectAttackTarget) return "Click a red-highlighted target. Right-click to deselect.";
					break;
				case MatchPhase.EndPhase:
					return "End Phase complete. Click Next Turn.";
			}
			return "";
		}

		// 
		//  NAVIGATION & HELPERS
		// 

		private void OnBackToMenu()
		{
			_aiProcessing = false;
			if (_factionSelectPanel != null) _factionSelectPanel.Visible = false;
			if (_victorySelectPanel != null) _victorySelectPanel.Visible = false;
			if (_armyBuilderPanel != null) _armyBuilderPanel.Visible = false;
			SetGameMode("menu");
		}

		private void OnPlayAgain()
		{
			string f0 = _match.Players[0].FactionId;
			string f1 = _match.Players[1].FactionId;
			var v = _match.Victory;
			_aiProcessing = false;

			_match = new MatchState { Victory = v };
			_match.Players[0] = new MatchPlayer
			{
				PlayerId = 0, Name = "Player 1", FactionId = f0,
				FactionName = _setupFacName[0] ?? "?", FactionIcon = _setupFacIcon[0] ?? "?",
				FactionColor = ParseColor(_setupFacColor[0]), IsAI = false
			};
			_match.Players[1] = new MatchPlayer
			{
				PlayerId = 1, Name = "AI", FactionId = f1,
				FactionName = _setupFacName[1] ?? "?", FactionIcon = _setupFacIcon[1] ?? "?",
				FactionColor = ParseColor(_setupFacColor[1]), IsAI = true
			};
			ShowArmyBuilder(0);
		}

		public void SetGameMode(string mode)
		{
			if (mode == "menu")
			{
				var mainScene = GD.Load<PackedScene>("res://Scenes/Main.tscn");
				var instance = mainScene.Instantiate();
				GetTree().Root.AddChild(instance);
				QueueFree();
			}
		}

		private Color ParseColor(string hex)
		{
			if (string.IsNullOrEmpty(hex)) return new Color(0.5f, 0.5f, 0.5f);
			try
			{
				hex = hex.TrimStart('#');
				if (hex.Length == 6)
				{
					int r = Convert.ToInt32(hex.Substring(0, 2), 16);
					int g = Convert.ToInt32(hex.Substring(2, 2), 16);
					int b = Convert.ToInt32(hex.Substring(4, 2), 16);
					return new Color(r / 255f, g / 255f, b / 255f);
				}
			}
			catch { }
			return new Color(0.5f, 0.5f, 0.5f);
		}
	}
}
