using System;
using System.IO;
using System.Linq;
using Godot;

namespace Shardborne
{
    public partial class Main : Control
    {
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
            _status = GetNode<Label>("Margin/VBox/Status");
            _pools = GetNode<RichTextLabel>("Margin/VBox/Pools");
            _log = GetNode<RichTextLabel>("Margin/VBox/Log");
            _factionList = GetNode<ItemList>("Margin/VBox/FactionRow/FactionList");
            _factionDetail = GetNode<RichTextLabel>("Margin/VBox/FactionRow/FactionDetail");

            GetNode<Button>("Margin/VBox/Buttons/NextPhaseButton").Pressed += OnNextPhase;
            GetNode<Button>("Margin/VBox/Buttons/NextTurnButton").Pressed += OnNextTurn;
            GetNode<Button>("Margin/VBox/Buttons/AutoResolveButton").Pressed += OnAutoResolve;
            if (_factionList != null)
            {
                _factionList.ItemSelected += OnFactionSelected;
            }

            LoadData();
            AppendLog("UI initialized.");
            UpdateUI();
            PopulateFactionList();
        }

        private void LoadData()
        {
            var projectRoot = ProjectSettings.GlobalizePath("res://");
            var repoRoot = Path.GetFullPath(Path.Combine(projectRoot, ".."));
            _definition = DataLoader.LoadFromRepo(repoRoot);
            AppendLog($"Loaded rules: {_definition.Rules.Version}");
            AppendLog($"Factions loaded: {_definition.Factions.Count}");
        }

        private void OnNextPhase()
        {
            _state.NextPhase();
            AppendLog($"Phase → {_state.Phase}");
            UpdateUI();
        }

        private void OnNextTurn()
        {
            _state.NextTurn();
            AppendLog($"Turn → {_state.Turn}");
            UpdateUI();
        }

        private void OnAutoResolve()
        {
            // Simple placeholder combat roll: 6 dice vs DEF 4.
            var atk = 6;
            var def = 4;
            var hits = 0;
            var crits = 0;
            for (var i = 0; i < atk; i++)
            {
                var roll = _rng.Next(1, 7);
                if (roll == 6)
                {
                    crits++;
                    hits++;
                }
                else if (roll >= def)
                {
                    hits++;
                }
            }
            var dmg = hits + crits;
            AppendLog($"Auto-resolve: {atk} ATK vs DEF {def} → {hits} hits, {crits} crits, {dmg} dmg");
            UpdateUI();
        }

        private void UpdateUI()
        {
            if (_status != null)
            {
                _status.Text = $"Turn {_state.Turn} • {_state.Phase} • Active: {_state.ActivePlayer} | CP W:{_state.White.CommandPoints} R:{_state.Red.CommandPoints} | VP W:{_state.White.VictoryPoints} R:{_state.Red.VictoryPoints}";
            }

            if (_pools != null)
            {
                _pools.Text =
                    $"Heat: {_state.Pools.Heat}/15  |  Hunger: {_state.Pools.Hunger}  |  Flow: {_state.Pools.Flow}/40\n" +
                    $"Fate Threads: {_state.Pools.FateThreads}  |  Anchors: {_state.Pools.Anchors}  |  Fragment Charges: {_state.Pools.FragmentCharges}  |  Stance: {_state.Pools.Stance}";
            }

            if (_log != null)
            {
                _log.Text = "[b]Log[/b]\n" + string.Join("\n", _state.Log);
            }
        }

        private void AppendLog(string message)
        {
            _state.Log.Add($"[{DateTime.Now:HH:mm:ss}] {message}");
        }

        private void PopulateFactionList()
        {
            if (_factionList == null)
                return;

            _factionList.Clear();
            for (var i = 0; i < _definition.Factions.Count; i++)
            {
                var fac = _definition.Factions[i];
                var label = string.IsNullOrWhiteSpace(fac.Icon)
                    ? fac.Name
                    : $"{fac.Icon} {fac.Name}";
                _factionList.AddItem(label);
            }

            if (_definition.Factions.Count > 0)
            {
                _factionList.Select(0);
                ShowFactionDetail(0);
            }
        }

        private void OnFactionSelected(long index)
        {
            ShowFactionDetail((int)index);
        }

        private void ShowFactionDetail(int index)
        {
            if (_factionDetail == null)
                return;
            if (index < 0 || index >= _definition.Factions.Count)
                return;

            var fac = _definition.Factions[index];
            var units = fac.Units ?? new System.Collections.Generic.List<Unit>();
            var topUnits = units.Take(8)
                .Select(u => string.IsNullOrWhiteSpace(u.Name) ? "(unnamed)" : u.Points > 0 ? $"{u.Name} ({u.Points} pts)" : u.Name)
                .ToList();
            var unitLine = topUnits.Count == 0 ? "No units parsed yet." : string.Join(", ", topUnits);

            var rawKeys = fac.Raw != null && fac.Raw.Count > 0
                ? string.Join(", ", fac.Raw.Keys.Take(10))
                : "(none)";

            _factionDetail.Text =
                "[b]" + fac.Name + "[/b]\n" +
                (!string.IsNullOrWhiteSpace(fac.Icon) ? fac.Icon + "\n" : string.Empty) +
                ($"Units: {units.Count}\n") +
                ($"Top entries: {unitLine}\n") +
                ($"Raw keys: {rawKeys}\n") +
                ($"Color: {fac.Color}\n");
        }
    }
}
