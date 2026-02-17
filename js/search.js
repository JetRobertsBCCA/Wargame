// ==========================================
// Shardborne Universe Wiki - Search
// ==========================================

function search() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const allContent = [
    ...gameData.factions,
    ...gameData.commanders,
    ...gameData.units,
    ...gameData.fragments,
  ];

  const results = allContent.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      (item.theme && item.theme.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.playstyle && item.playstyle.toLowerCase().includes(query)) ||
      (item.role && item.role.toLowerCase().includes(query)),
  );

  const contentEl = document.getElementById("content");
  contentEl.innerHTML = "<h2>Search Results</h2>";

  if (results.length > 0) {
    results.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      let content = `<h3>${item.name}</h3>`;
      if (item.type) content += `<p><strong>Type:</strong> ${item.type}</p>`;
      if (item.theme) content += `<p><strong>Theme:</strong> ${item.theme}</p>`;
      if (item.playstyle)
        content += `<p><strong>Playstyle:</strong> ${item.playstyle}</p>`;
      if (item.description) content += `<p>${item.description}</p>`;
      if (item.effects)
        content += `<p><strong>Effects:</strong> ${item.effects}</p>`;
      card.innerHTML = content;
      contentEl.appendChild(card);
    });
  } else {
    contentEl.innerHTML += "<p>No results found.</p>";
  }
}
