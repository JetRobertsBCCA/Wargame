using System;
using System.IO;
using System.Linq;
using Godot;

namespace Shardborne
{
	public partial class Main : Control
	{
		// ── Menu UI ──
		private CenterContainer? _menuCenter;
		private VBoxContainer? _menuPanel;

		// ── Faction Browser UI ──
		private MarginContainer? _browserMargin;
		private VBoxContainer? _browserPanel;
		private Label? _status;
		private RichTextLabel? _pools;
		private RichTextLabel? _log;
		private ItemList? _factionList;
		private RichTextLabel? _factionDetail;
		private GameState _state = new();
		private GameDefinition _definition = new();
		private readonly Random _rng = new();

		public override void _Ready()
		{
			var projectRoot = ProjectSettings.GlobalizePath("res://");
			var repoRoot = Path.GetFullPath(Path.Combine(projectRoot, ".."));
			_definition = DataLoader.LoadFromRepo(repoRoot);

			BuildMenuUI();
			BuildBrowserUI();
			ShowMenu();
		}

		// ═══════════════════════════════════════════
		//  MAIN MENU
		// ═══════════════════════════════════════════

		private void BuildMenuUI()
		{
			_menuCenter = new CenterContainer();
			_menuCenter.SetAnchorsPreset(LayoutPreset.FullRect);
			_menuCenter.MouseFilter = MouseFilterEnum.Ignore;
			AddChild(_menuCenter);

			_menuPanel = new VBoxContainer();
			_menuPanel.AddThemeConstantOverride("separation", 16);
			_menuCenter.AddChild(_menuPanel);

			var title = new Label { Text = "SHARDBORNE" };
			title.AddThemeFontSizeOverride("font_size", 36);
			title.HorizontalAlignment = HorizontalAlignment.Center;
			_menuPanel.AddChild(title);

			var subtitle = new Label { Text = "A Tabletop Wargame — Digital Edition" };
			subtitle.AddThemeFontSizeOverride("font_size", 14);
			subtitle.HorizontalAlignment = HorizontalAlignment.Center;
			_menuPanel.AddChild(subtitle);

			var spacer = new Control();
			spacer.CustomMinimumSize = new Vector2(0, 20);
			_menuPanel.AddChild(spacer);

			// Data loaded info
			var infoLabel = new Label();
			infoLabel.Text = $"{_definition.Factions.Count} factions • {_definition.Commanders.Count} commanders • {_definition.UnitTemplates.Count} units";
			infoLabel.AddThemeFontSizeOverride("font_size", 12);
			infoLabel.HorizontalAlignment = HorizontalAlignment.Center;
			infoLabel.AddThemeColorOverride("font_color", new Color(0.6f, 0.6f, 0.6f));
			_menuPanel.AddChild(infoLabel);

			var spacer2 = new Control();
			spacer2.CustomMinimumSize = new Vector2(0, 10);
			_menuPanel.AddChild(spacer2);

			var vsAiBtn = new Button { Text = "Play vs AI" };
			vsAiBtn.CustomMinimumSize = new Vector2(300, 52);
			vsAiBtn.Pressed += () => StartGame(GameMode.VsAI);
			_menuPanel.AddChild(vsAiBtn);

			var vsFriendBtn = new Button { Text = "Play vs Friend (Hotseat)" };
			vsFriendBtn.CustomMinimumSize = new Vector2(300, 52);
			vsFriendBtn.Pressed += () => StartGame(GameMode.VsFriend);
			_menuPanel.AddChild(vsFriendBtn);

			var browseBtn = new Button { Text = "Browse Factions & Units" };
			browseBtn.CustomMinimumSize = new Vector2(300, 44);
			browseBtn.Pressed += ShowBrowser;
			_menuPanel.AddChild(browseBtn);

			var quitBtn = new Button { Text = "Quit" };
			quitBtn.CustomMinimumSize = new Vector2(300, 40);
			quitBtn.Pressed += () => GetTree().Quit();
			_menuPanel.AddChild(quitBtn);
		}

		private void StartGame(GameMode mode)
		{
			// Load the game scene — its _Ready() handles the full setup flow
			var gameScene = GD.Load<PackedScene>("res://Scenes/Game.tscn");
			var instance = gameScene.Instantiate<GameScene>();
			GetTree().Root.AddChild(instance);
			QueueFree(); // Remove menu
		}

		private void ShowMenu()
		{
			if (_menuCenter != null) _menuCenter.Visible = true;
			if (_browserMargin != null) _browserMargin.Visible = false;
		}

		// ═══════════════════════════════════════════
		//  FACTION BROWSER (existing functionality)
		// ═══════════════════════════════════════════

		private void BuildBrowserUI()
		{
			_browserPanel = new VBoxContainer();
			_browserPanel.SetAnchorsPreset(LayoutPreset.FullRect);
			_browserPanel.AddThemeConstantOverride("separation", 8);

			_browserMargin = new MarginContainer();
			_browserMargin.SetAnchorsPreset(LayoutPreset.FullRect);
			_browserMargin.AddThemeConstantOverride("margin_left", 16);
			_browserMargin.AddThemeConstantOverride("margin_top", 16);
			_browserMargin.AddThemeConstantOverride("margin_right", 16);
			_browserMargin.AddThemeConstantOverride("margin_bottom", 16);
			_browserMargin.Visible = false;
			AddChild(_browserMargin);
			_browserMargin.AddChild(_browserPanel);

			// Header + back button
			var headerRow = new HBoxContainer();
			headerRow.AddThemeConstantOverride("separation", 16);
			_browserPanel.AddChild(headerRow);

			var backBtn = new Button { Text = "← Back to Menu" };
			backBtn.Pressed += ShowMenu;
			headerRow.AddChild(backBtn);

			var header = new Label { Text = "Faction & Unit Browser" };
			header.AddThemeFontSizeOverride("font_size", 20);
			headerRow.AddChild(header);

			_status = new Label { Text = $"Loaded: {_definition.Factions.Count} factions, {_definition.Commanders.Count} commanders, {_definition.UnitTemplates.Count} units" };
			_browserPanel.AddChild(_status);

			// Faction row
			var factionRow = new HBoxContainer();
			factionRow.CustomMinimumSize = new Vector2(0, 400);
			factionRow.SizeFlagsHorizontal = SizeFlags.Fill | SizeFlags.Expand;
			factionRow.SizeFlagsVertical = SizeFlags.Fill | SizeFlags.Expand;
			_browserPanel.AddChild(factionRow);

			_factionList = new ItemList();
			_factionList.CustomMinimumSize = new Vector2(280, 0);
			_factionList.SizeFlagsVertical = SizeFlags.Fill | SizeFlags.Expand;
			_factionList.ItemSelected += OnFactionSelected;
			factionRow.AddChild(_factionList);

			_factionDetail = new RichTextLabel();
			_factionDetail.BbcodeEnabled = true;
			_factionDetail.FitContent = true;
			_factionDetail.ScrollActive = true;
			_factionDetail.SizeFlagsHorizontal = SizeFlags.Fill | SizeFlags.Expand;
			_factionDetail.SizeFlagsVertical = SizeFlags.Fill | SizeFlags.Expand;
			_factionDetail.CustomMinimumSize = new Vector2(0, 400);
			factionRow.AddChild(_factionDetail);

			PopulateFactionList();
		}

		private void ShowBrowser()
		{
			if (_menuCenter != null) _menuCenter.Visible = false;
			if (_browserMargin != null) _browserMargin.Visible = true;
		}

		private void PopulateFactionList()
		{
			if (_factionList == null) return;
			_factionList.Clear();

			foreach (var fac in _definition.Factions)
			{
				var cmdrs = _definition.GetCommandersForFaction(fac.Id);
				var units = _definition.GetUnitsForFaction(fac.Id);
				_factionList.AddItem($"{fac.Icon} {fac.Name} ({cmdrs.Count}C / {units.Count}U)");
			}

			if (_definition.Factions.Count > 0)
			{
				_factionList.Select(0);
				ShowFactionDetail(0);
			}
		}

		private void OnFactionSelected(long index) => ShowFactionDetail((int)index);

		private void ShowFactionDetail(int index)
		{
			if (_factionDetail == null || index < 0 || index >= _definition.Factions.Count) return;

			var fac = _definition.Factions[index];
			var cmdrs = _definition.GetCommandersForFaction(fac.Id);
			var units = _definition.GetUnitsForFaction(fac.Id);

			var text = $"[b]{fac.Icon} {fac.Name}[/b]\nColor: {fac.Color}\n\n";

			// Commanders
			text += $"[b]Commanders ({cmdrs.Count}):[/b]\n";
			foreach (var c in cmdrs)
			{
				text += $"  ★ {c.Name} — {c.Title}\n";
				text += $"    ATK:{c.Atk} DEF:{c.Def} HP:{c.Hp} MOV:{c.Mov} RNG:{c.Rng} MOR:{c.Mor} CMD:{c.Command} ({c.PointsCost} pts)\n";
			}

			// Units by type
			text += $"\n[b]Units ({units.Count}):[/b]\n";
			var byType = units.GroupBy(u => u.Type).OrderBy(g => g.Key);
			foreach (var group in byType)
			{
				text += $"\n  [{group.Key}]\n";
				foreach (var u in group.OrderBy(u => u.PointsCost))
				{
					text += $"    {u.Name} — ATK:{u.Atk} DEF:{u.Def} HP:{u.Hp} MOV:{u.Mov} RNG:{u.Rng} MOR:{u.Mor} ({u.PointsCost} pts)\n";
				}
			}

			// Sample army
			var sample = _definition.SampleArmies.FirstOrDefault(s =>
				s.Faction.Contains(fac.Name, StringComparison.OrdinalIgnoreCase));
			if (sample != null)
			{
				text += $"\n[b]Sample Army ({sample.TotalPoints} pts):[/b]\n";
				text += $"  Commander: {sample.Commander}\n";
				text += $"  Units: {sample.Units}\n";
				text += $"  Strategy: {sample.Strategy}\n";
			}

			_factionDetail.Text = text;
		}
	}
}
