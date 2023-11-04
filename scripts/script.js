document.addEventListener("DOMContentLoaded", function () {
  // Sample data: list of databases with name, creator, tables count, and memory variables
  const databases = [
    {
      name: "Database 1",
      creator: "User A",
      tablesCount: 20,
      tables: [
        { name: "Table 1", memory: 2 },
        { name: "Table 2", memory: 10 },
        { name: "Table 3", memory: 15 },
      ],
      maxMemory: 30,
      errorCount: 10,
      alertCount: 5,
    },
    {
      name: "Database 2",
      creator: "User B",
      tablesCount: 15,
      tables: [
        { name: "Table 1", memory: 1 },
        { name: "Table 2", memory: 10 },
        { name: "Table 3", memory: 15 },
      ],
      maxMemory: 30,
      errorCount: 10,
      alertCount: 5,
    },
    {
      name: "Database 3",
      creator: "User C",
      tablesCount: 30,
      tables: [
        { name: "Table 1", memory: 3 },
        { name: "Table 2", memory: 10 },
        { name: "Table 3", memory: 15 },
      ],
      maxMemory: 40,
      errorCount: 10,
      alertCount: 5,
    },
    // ... more databases
  ];

  const databaseListContainer = document.getElementById("databaseList");

  // Render the list of databases as cards
  databases.forEach((database) => {
    const card = document.createElement("div");
    card.className = "card";

    const detailsLink = document.createElement("a");
    detailsLink.href = `details.html?id=${database.id}`;
    card.appendChild(detailsLink);

    const nameElement = document.createElement("div");
    nameElement.className = "database-name";
    nameElement.textContent = database.name;

    const creatorElement = document.createElement("div");
    creatorElement.textContent = `Created by: ${database.creator}`;

    const tablesCountElement = document.createElement("div");
    tablesCountElement.className = "tables-count";
    tablesCountElement.textContent = `Tables Count: ${database.tablesCount}`;

    const memoryElement = document.createElement("div");
    memoryElement.className = "memory";
    memoryElement.textContent = `Memory: ${database.memory}`;

    card.addEventListener("click", function () {
      localStorage.setItem("selectedDatabase", JSON.stringify(database));
      window.location.href = "details.html"; // Navigate to details page
    });

    card.appendChild(nameElement);
    card.appendChild(creatorElement);
    card.appendChild(tablesCountElement);
    card.appendChild(memoryElement);

    databaseListContainer.appendChild(card);
  });
});

function generateDatabaseListItem(database) {
  const listItem = document.createElement("li");
  const detailsLink = document.createElement("a");
  detailsLink.href = `details.html?id=${database.id}`;
  detailsLink.innerText = database.name;
  detailsLink.addEventListener("click", function (event) {
    event.preventDefault();
    showDetails(database.id);
  });
  listItem.appendChild(detailsLink);
  return listItem;
}
