document.addEventListener("DOMContentLoaded", function () {
  fetch("http://85.173.249.233:8080/api/metrics/database-list")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  const databases = [
    {
      id: 0,
      name: "Database 1",
      creator: "User A",
      tablesCount: 20,
      tables: [
        { name: "Table 1", memory: 2 },
        { name: "Table 2", memory: 10 },
        { name: "Table 3", memory: 15 },
      ],
      maxMemory: 30,
      errorCount: 1,
      alertCount: 0,
    },
    {
      id: 1,
      name: "Database 2",
      creator: "User B",
      tablesCount: 15,
      tables: [
        { name: "Table 1", memory: 1 },
        { name: "Table 2", memory: 10 },
        { name: "Table 3", memory: 15 },
      ],
      maxMemory: 30,
      errorCount: 1,
      alertCount: 0,
    },
    {
      id: 2,
      name: "Database 3",
      creator: "User C",
      tablesCount: 30,
      tables: [
        { name: "Table 1", memory: 3 },
        { name: "Table 2", memory: 10 },
        { name: "Table 3", memory: 15 },
      ],
      maxMemory: 40,
      errorCount: 1,
      alertCount: 0,
    },
  ];

  const databaseListContainer = document.getElementById("databaseList");
  databases.forEach((database) => {
    const card = generateDatabaseListItem(database);
    databaseListContainer.appendChild(card);
  });

  const container = document.getElementById("container");
  const card = generateLogsContainer(databases);
  container.appendChild(card);
});

function generateDatabaseListItem(database) {
  const card = document.createElement("div");
  card.className = "card";

  const detailsLink = document.createElement("a");
  detailsLink.href = `details.html?id=${database.id}`;
  card.appendChild(detailsLink);

  const nameElement = document.createElement("div");
  nameElement.className = "row";

  const iconElement = document.createElement("div");
  iconElement.className = "icon-container";
  iconElement.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 13C22.6274 13 28 10.7614 28 8C28 5.23858 22.6274 3 16 3C9.37258 3 4 5.23858 4 8C4 10.7614 9.37258 13 16 13Z" stroke="#29AAE3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/><path d="M28 13.375C28 16.1363 22.625 18.375 16 18.375C9.375 18.375 4 16.1363 4 13.375M28 18.75C28 21.5113 22.625 23.75 16 23.75C9.375 23.75 4 21.5113 4 18.75" stroke="#29AAE3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/><path d="M4 7.9525V24.0475C4 26.7825 9.375 29 16 29C22.625 29 28 26.7825 28 24.0475V7.9525" stroke="#29AAE3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/></svg>';

  const textElement = document.createElement("div");
  textElement.className = "text-container";
  textElement.textContent = database.name;

  nameElement.appendChild(iconElement);
  nameElement.appendChild(textElement);

  const databaseBoxContainer = document.createElement("div");
  databaseBoxContainer.className = "database-box";

  const creatorElement = document.createElement("p");
  creatorElement.textContent = `Сводка за 24 часа`;
  creatorElement.className = "summary-title";

  const errorCountElement = document.createElement("div");
  errorCountElement.className = "error-count";
  errorCountElement.textContent = `Ошибок: ${database.errorCount}`;

  const alertCountElement = document.createElement("div");
  alertCountElement.className = "alert-count";
  alertCountElement.textContent = `Предупреждений: ${database.alertCount}`;

  databaseBoxContainer.appendChild(creatorElement);
  databaseBoxContainer.appendChild(errorCountElement);
  databaseBoxContainer.appendChild(alertCountElement);

  card.addEventListener("click", function () {
    localStorage.setItem("selectedDatabase", JSON.stringify(database));
    window.location.href = `public/details.html?id=${database.id}`;
  });

  card.appendChild(nameElement);
  card.appendChild(databaseBoxContainer);

  return card;
}

function generateLogsContainer(databases) {
  const container = document.createElement("div");
  container.className = "log-card";

  const logTitle = document.createElement("div");
  logTitle.className = "log-title";
  logTitle.innerText = "Последние логи";

  const monthContainer = document.createElement("div");
  monthContainer.className = "month-container";
  monthContainer.innerText = "За месяц";

  const monthTitle = document.createElement("div");
  monthTitle.className = "monthTitle";
  monthTitle.appendChild(logTitle);
  monthTitle.appendChild(monthContainer);

  container.appendChild(monthTitle);

  databases.forEach((database) => {
    const logCard = generateLogCard(database.name);
    container.appendChild(logCard);
  });

  return container;
}

function generateLogCard(name) {
  const logCard = document.createElement("div");
  logCard.className = "log-card";

  const logTime = document.createElement("p");
  logTime.className = "log-time";
  logTime.innerText = "04.11.2023 в 00:10:56";

  const logContainer = document.createElement("div");
  const warningText = document.createElement("p");
  warningText.className = "warning-text";

  if (name === "Database 1") {
    logContainer.className = "log-container-error";
    warningText.innerText = "Ошибка";
  } else {
    logContainer.className = "log-container-warning";
    warningText.innerText = "Предупреждение";
  }

  const row = document.createElement("div");
  row.className = "row-cpu";

  const dataBaseName = document.createElement("div");
  dataBaseName.className = "database-name-log";
  dataBaseName.innerText = name;
  row.appendChild(logTime);
  row.appendChild(dataBaseName);

  const divider = document.createElement("div");
  divider.className = "divider";

  const errorName = document.createElement("p");
  errorName.className = "error-name";
  errorName.innerText = 'ERROR: 42P01: relation "[Table]" does not exist';

  logContainer.appendChild(warningText);

  logCard.appendChild(row);
  logCard.appendChild(logContainer);
  logCard.appendChild(divider);
  logCard.appendChild(errorName);

  return logCard;
}
