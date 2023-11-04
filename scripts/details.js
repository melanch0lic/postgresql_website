document.addEventListener("DOMContentLoaded", function () {
  // Get database details from localStorage (or from API using fetch, as per your requirements)
  const databaseDetails = JSON.parse(localStorage.getItem("selectedDatabase"));

  // Render database details
  if (databaseDetails) {
    const dataBaseInfoContainer = createDataBaseInfoContainer(databaseDetails);
    const errorCountContainer = createErrorCountContainer(databaseDetails);
    const memoryDiagramContainer = createMemoryDiagram(databaseDetails);
    const memoryAvailableContainer = createAvailableMemoryContainer();
    const contentContainer = document.getElementById("content");
    contentContainer.appendChild(dataBaseInfoContainer);
    contentContainer.appendChild(errorCountContainer);
    contentContainer.appendChild(memoryAvailableContainer);
    contentContainer.appendChild(memoryDiagramContainer);
    setupAvailableMemoryDiagram(databaseDetails);
    setupMemoryDiagram(databaseDetails);
  } else {
    detailsContainer.innerHTML = `
            <h2>Произошла ошибка</h2>
        `;
    console.error("Database details not found.");
  }
});

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setupAvailableMemoryDiagram(databaseDetails) {
  var ctx = document.getElementById("halfDoughnutChart").getContext("2d");
  var data = [
    databaseDetails.tables
      .map((table) => table.memory)
      .reduce((a, b) => a + b, 0),
    databaseDetails.maxMemory,
  ];

  var maxMemory = data[1];
  var databaseMemory = data[0];

  var config = {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [databaseMemory, maxMemory - databaseMemory],
          backgroundColor: ["rgba(255, 138, 0, 1)", "rgba(243, 243, 243, 1)"],
        },
      ],
    },
    options: {
      cutoutPercentage: 50,
      circumference: 180,
      rotation: -90,
      legend: {
        display: true,
      },
    },
  };
  var myChart = new Chart(ctx, config);
  var percentageValue = document.getElementById("percentageValue");
  var totalValue = document.getElementById("totalValue");

  percentageValue.innerText = databaseMemory;
  totalValue.innerText = maxMemory;
}

function createAvailableMemoryContainer() {
  const container = document.createElement("div");
  container.className = "database-info";

  const chartContainer = document.createElement("div");
  chartContainer.className = "chart-container";
  chartContainer.innerHTML =
    '<canvas id="halfDoughnutChart"></canvas><div class="center-label-available">Занято<br><div id="chartValue" style="text-align: center; font-size: 18px; font-weight: bold; margin-top: 20px;"><span id="percentageValue">0.00</span> Гб / <span id="totalValue">0.00</span> Гб</div></br></div>';

  //   const canvas = document.createElement("canvas");
  //   canvas.id = "halfDoughnutChart";

  //   const centerLabel = document.createElement("div");
  //   centerLabel.className = "center-label-available";
  //   centerLabel.innerText = "Занято";

  //   const br = document.createElement("br");
  //   const chartValue = document.createElement("div");
  //   chartValue.id = "chartValue";
  //   const percentageValue = document.createElement("span");
  //   percentageValue.id = "percentageValue";
  //   const totalValue = document.createElement("span");
  //   totalValue.id = "totalValue";

  //   chartValue.appendChild(percentageValue);
  //   chartValue.appendChild(totalValue);
  //   br.appendChild(chartValue);
  //   centerLabel.appendChild(br);

  //   chartContainer.appendChild(canvas);
  //   chartContainer.appendChild(centerLabel);

  container.appendChild(chartContainer);

  return container;
}

function setupMemoryDiagram(databaseDetails) {
  var ctx = document.getElementById("donutChart").getContext("2d");
  var labels = databaseDetails.tables.map((table) => table.name);
  var data = {
    labels: labels,
    datasets: [
      {
        data: databaseDetails.tables.map((table) => table.memory),
        backgroundColor: databaseDetails.tables.map((table) =>
          generateRandomColor()
        ),
        hoverBackgroundColor: ["#ff7946", "#46ff79", "#7946ff"],
        borderWidth: 2, // Set the border width to create gaps
        spacing: 5, // Добавляем отступы между значениями
        borderRadius: 10,
      },
    ],
  };

  // Вычислите общую сумму значений
  var totalValue = databaseDetails.tables
    .map((table) => table.memory)
    .reduce((a, b) => a + b, 0);

  // Создайте новый массив с лейблами, включая проценты
  var labelsWithPercentages = data.labels.map(function (label, index) {
    var percentage =
      ((databaseDetails.tables[index].memory / totalValue) * 100).toFixed(2) +
      "%";
    return label + " (" + percentage + ")";
  });

  var options = {
    cutoutPercentage: 60,
    plugins: {
      legend: {
        display: true,
        align: "start",
        position: "left",
        position: "bottom", // Перемещаем легенду наверх
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          fontSize: 14,
          fontColor: "black",
          padding: 10,
        },
      },
      title: {
        display: true,
        text: "Распределение памяти",
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            var label = context.label + ": " + context.parsed + "%";
            return label;
          },
        },
      },
    },
  };
  var donutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labelsWithPercentages, // Используйте массив с процентами
      datasets: data.datasets,
    },
    options: options,
  });

  // Обновляем текст внутри .center-label
  document.querySelector(".center-label").textContent =
    "Всего: " + totalValue + " гб";
}
function createMemoryDiagram(databaseDetails) {
  const container = document.createElement("div");
  container.className = "database-info";

  const chartContainer = document.createElement("div");
  chartContainer.className = "chart-container";

  const canvas = document.createElement("canvas");
  canvas.id = "donutChart";

  const centerLabel = document.createElement("div");
  centerLabel.className = "center-label";

  chartContainer.appendChild(canvas);
  chartContainer.appendChild(centerLabel);

  container.appendChild(chartContainer);

  return container;
}

function createErrorCountContainer(databaseDetails) {
  const container = document.createElement("div");
  container.className = "database-info";

  const heading = document.createElement("h1");
  heading.innerText = "Сводка за 24 часа";

  const errorCountElement = document.createElement("h2");
  errorCountElement.innerText =
    "Количество ошибок: " + databaseDetails.errorCount;
  errorCountElement.className = "error-count";

  const alertCountElement = document.createElement("h2");
  alertCountElement.innerText =
    "Количество предупреждений: " + databaseDetails.alertCount;
  alertCountElement.className = "alert-count";

  container.appendChild(heading);
  container.appendChild(errorCountElement);
  container.appendChild(alertCountElement);

  return container;
}

function createDataBaseInfoContainer(databaseDetails) {
  const container = document.createElement("div");
  container.className = "database-info";

  const heading = document.createElement("h1");
  heading.innerText = "Информация о базе данных";

  const nameElement = document.createElement("h2");
  nameElement.innerText = databaseDetails.name;

  const underNameElement = document.createElement("p");
  underNameElement.innerText = "Название";

  const dividerElement = document.createElement("div");
  dividerElement.className = "divider";

  const infoParagraph = document.createElement("h2");
  infoParagraph.innerText = databaseDetails.creator;

  const tablesCountElement = document.createElement("h2");
  tablesCountElement.innerText =
    "Количество таблиц: " + databaseDetails.tablesCount;

  const memoryElement = document.createElement("h2");
  memoryElement.innerText =
    "Используется памяти: " +
    databaseDetails.tables.reduce((total, table) => total + table.memory, 0) +
    " гб";

  container.appendChild(heading);
  container.appendChild(nameElement);
  container.appendChild(underNameElement);
  container.appendChild(infoParagraph);
  container.appendChild(dividerElement);
  container.appendChild(tablesCountElement);
  container.appendChild(memoryElement);

  return container;
}

function toggleMenu() {
  var menu = document.getElementById("menu");
  menu.classList.toggle("open");
}

function showPage(page) {
  var content = document.getElementById("content");
  if (page === "home") {
    window.location.href = "index.html";
  }
  toggleMenu();
}
