document.addEventListener("DOMContentLoaded", function () {
  const databaseDetails = JSON.parse(localStorage.getItem("selectedDatabase"));

  if (databaseDetails) {
    const dataBaseInfoContainer = createDataBaseInfoContainer(databaseDetails);
    const errorCountContainer = createErrorCountContainer(databaseDetails);
    const lineChartContainer = createLineChartContainer();
    const cpuStatisticsContainer = createCpuStatisticsContainer();
    const requestPerSecondContainer = createRequestPerSecondContainer();
    const advanceInfoContainer = createAdvanceInfo();
    const memoryDiagramContainer = createMemoryDiagram(databaseDetails);
    const memoryAvailableContainer = createAvailableMemoryContainer();
    const contentContainer = document.getElementById("content");
    contentContainer.appendChild(dataBaseInfoContainer);
    contentContainer.appendChild(errorCountContainer);
    contentContainer.appendChild(lineChartContainer);
    contentContainer.appendChild(cpuStatisticsContainer);
    contentContainer.appendChild(requestPerSecondContainer);
    contentContainer.appendChild(advanceInfoContainer);
    contentContainer.appendChild(memoryAvailableContainer);
    contentContainer.appendChild(memoryDiagramContainer);
    setupLineChartDiagram(databaseDetails);
    setupCpuChartDiagram(databaseDetails);
    setupAvailableMemoryDiagram(databaseDetails);
    setupMemoryDiagram(databaseDetails);
  } else {
    detailsContainer.innerHTML = `
            <h2>Произошла ошибка</h2>
        `;
    console.error("Database details not found.");
  }
});

function createAdvanceInfo() {
  const container = document.createElement("div");
  container.className = "database-info";
  container.style.padding = "16px";

  const title = document.createElement("div");
  title.className = "card-title";
  title.innerText = "Подробная статистика";

  const element1 = document.createElement("div");
  element1.innerHTML = `
    <div style="width: 100%; height: 94px; position: relative; margin-bottom:16px">
    <div style="width: 100%; height: 94px; left: 0px; top: 0px; position: absolute; background: #EAF5FF; border-radius: 12px"></div>
    <div style="width: 2px; height: 46px; left: 0px; top: 21px; position: absolute; background: #0080FC; box-shadow: 2px 0px 4px rgba(0, 128, 252, 0.48)"></div>
    <div style="width: 244px; height: 58px; left: 16px; top: 16px; position: absolute; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: inline-flex">
        <div style="justify-content: flex-start; align-items: center; gap: 159px; display: inline-flex">
            <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
                <div style="color: #78828E; font-size: 16px; font-family: "Open Sans", sans-serif; font-weight: 400; line-height: 24px; word-wrap: break-word">Строк, вставленных запросами</div>
                <div style="color: #0A0E1A; font-size: 25px; font-family: "Open Sans", sans-serif; font-weight: 700; line-height: 30px; word-wrap: break-word">1457</div>
            </div>
        </div>
    </div>
</div>`;
  const element2 = document.createElement("div");
  element2.innerHTML = `<div style="width: 100%; height: 94px; position: relative; margin-bottom:16px">
  <div style="width: 100%; height: 94px; left: 0px; top: 0px; position: absolute; background: #F3EDFF; border-radius: 12px"></div>
  <div style="width: 2px; height: 46px; left: 0px; top: 21px; position: absolute; background: #7339F5; box-shadow: 2px 0px 4px rgba(115, 57, 245, 0.48)"></div>
  <div style="width: 250px; height: 58px; left: 16px; top: 16px; position: absolute; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: inline-flex">
      <div style="justify-content: flex-start; align-items: center; gap: 159px; display: inline-flex">
          <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
              <div style="color: #78828E; font-size: 16px; font-family: "Open Sans", sans-serif; font-weight: 400; line-height: 24px; word-wrap: break-word">Строк, обновлённых запросами</div>
              <div style="color: #0A0E1A; font-size: 25px; font-family: "Open Sans", sans-serif; font-weight: 700; line-height: 30px; word-wrap: break-word">3142</div>
          </div>
      </div>
  </div>
</div>`;

  const element3 = document.createElement("div");
  element3.innerHTML = `
  <div style="width: 100%; height: 94px; position: relative; margin-bottom:16px">
    <div style="width: 100%; height: 94px; left: 0px; top: 0px; position: absolute; background: #FFF6EC; border-radius: 12px"></div>
    <div style="width: 2px; height: 46px; left: 0px; top: 21px; position: absolute; background: #FF8A00; box-shadow: 2px 0px 4px rgba(255, 138, 0, 0.48)"></div>
    <div style="width: 228px; height: 58px; left: 16px; top: 16px; position: absolute; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: inline-flex">
        <div style="justify-content: flex-start; align-items: center; gap: 159px; display: inline-flex">
            <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 4px; display: inline-flex">
                <div style="color: #78828E; font-size: 16px; font-family: "Open Sans", sans-serif; font-weight: 400; line-height: 24px; word-wrap: break-word">Строк, удалённых запросами </div>
                <div style="color: #0A0E1A; font-size: 25px; font-family: "Open Sans", sans-serif; font-weight: 700; line-height: 30px; word-wrap: break-word">2576</div>
            </div>
        </div>
    </div>
</div>`;

  container.appendChild(title);
  container.appendChild(element1);
  container.appendChild(element2);
  container.appendChild(element3);
  return container;
}

function createRequestPerSecondContainer() {
  const container = document.createElement("div");
  container.className = "database-info";
  container.style.padding = "20px";

  const row = document.createElement("div");
  row.className = "row-requst";

  const requestColumn = document.createElement("div");
  requestColumn.className = "column";

  const requestCount = document.createElement("div");
  requestCount.innerText = "140";
  requestCount.className = "count flex-item";

  const requestName = document.createElement("div");
  requestName.innerText = "Запросов\nв секунду";
  requestName.className = "count-name flex-item";

  const transactionTimeColumn = document.createElement("div");
  transactionTimeColumn.className = "column";

  const transactionTime = document.createElement("div");
  transactionTime.innerText = "2550мс";
  transactionTime.className = "count flex-item";

  const transactionName = document.createElement("div");
  transactionName.innerText = "Самая долгая\nтранзакция";
  transactionName.className = "count-name flex-item";

  requestColumn.appendChild(requestCount);
  requestColumn.appendChild(requestName);
  transactionTimeColumn.appendChild(transactionTime);
  transactionTimeColumn.appendChild(transactionName);

  const divider = document.createElement("div");
  divider.className = "vertical-divider";

  row.appendChild(requestColumn);
  row.appendChild(divider);
  row.appendChild(transactionTimeColumn);

  container.appendChild(row);

  return container;
}

function setupCpuChartDiagram(databaseDetails) {
  var cpuUsage = 75;

  var data = {
    labels: ["CPU Usage", "Unused"],
    datasets: [
      {
        data: [cpuUsage, 100 - cpuUsage],
        backgroundColor: ["rgba(0, 155, 114, 1)", "rgba(255, 255, 255, 0.8)"],
      },
    ],
  };

  var ctx = document.getElementById("cpuChart").getContext("2d");
  var cpuChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: {
      cutout: "60%",
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

function createCpuStatisticsContainer() {
  const container = document.createElement("div");
  container.className = "row-cpu";

  const diagram = document.createElement("div");
  diagram.className = "database-info";

  const heading = document.createElement("div");
  heading.className = "card-title";
  heading.innerText = "Загруженность ЦП";

  const chartContainer = document.createElement("div");
  chartContainer.className = "chart-container-cpu";

  const canvas = document.createElement("canvas");
  canvas.id = "cpuChart";
  canvas.width = 100;
  canvas.height = 100;

  const centerLabel = document.createElement("div");
  centerLabel.className = "center-label-cpu";
  centerLabel.innerText = "75%";

  chartContainer.appendChild(canvas);
  chartContainer.appendChild(centerLabel);

  diagram.appendChild(heading);
  diagram.appendChild(chartContainer);

  const column = document.createElement("div");
  column.className = "column flex-item-1";

  const firstElement = document.createElement("div");
  firstElement.className = "database-info db-sessions";
  firstElement.style.paddingLeft = "25px";
  firstElement.style.paddingRight = "25px";
  firstElement.style.paddingTop = "10px";
  firstElement.style.paddingBottom = "10px";

  const processCount = document.createElement("div");
  processCount.className = "count";
  processCount.innerText = "46";
  const processName = document.createElement("div");
  processName.className = "count-name";
  processName.innerText = "Процессов";

  firstElement.appendChild(processCount);
  firstElement.appendChild(processName);

  const secondElement = document.createElement("div");
  secondElement.className = "database-info db-sessions";
  secondElement.style.paddingLeft = "25px";
  secondElement.style.paddingRight = "25px";
  secondElement.style.paddingTop = "10px";
  secondElement.style.paddingBottom = "10px";

  const sessionCount = document.createElement("div");
  sessionCount.className = "count";
  sessionCount.innerText = "10";
  const sessionName = document.createElement("div");
  sessionName.className = "count-name";
  sessionName.innerText = "Сессий";

  secondElement.appendChild(sessionCount);
  secondElement.appendChild(sessionName);

  column.appendChild(firstElement);
  column.appendChild(secondElement);

  container.appendChild(diagram);
  container.appendChild(column);

  return container;
}

function setupLineChartDiagram(databaseDetails) {
  const data = {
    labels: ["Сентябрь", "Октябрь", "Ноябрь", "Декабрь", "Январь"],
    datasets: [
      {
        label: "Ошибки",
        drawActiveElementsOnTop: false,
        data: [10, 30, 15, 22, 18],
        borderColor: "#7339F5",
        borderWidth: 3,
        borderCapStyle: "round",
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  const ctx = document.getElementById("lineChart").getContext("2d");
  const lineChart = new Chart(ctx, {
    type: "line",
    data,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function createLineChartContainer() {
  const container = document.createElement("div");
  container.className = "database-info";

  const heading = document.createElement("div");
  heading.textContent = "Статистика ошибок";
  heading.className = "card-title";
  container.append(heading);

  const canvas = document.createElement("canvas");
  canvas.id = "lineChart";
  container.append(canvas);

  return container;
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setupAvailableMemoryDiagram(databaseDetails) {
  const ctx = document.getElementById("halfDoughnutChart").getContext("2d");

  const databaseMemory = databaseDetails.tables.reduce(
    (total, table) => total + table.memory,
    0
  );
  const maxMemory = databaseDetails.maxMemory;

  const config = {
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

  const myChart = new Chart(ctx, config);
  const percentageValue = document.getElementById("percentageValue");
  const totalValue = document.getElementById("totalValue");

  percentageValue.innerText = databaseMemory;
  totalValue.innerText = maxMemory;
}

function createAvailableMemoryContainer() {
  const container = document.createElement("div");
  container.className = "database-info";

  const heading = document.createElement("div");
  heading.className = "card-title";
  heading.innerText = "Доступная память:";

  const chartContainer = document.createElement("div");
  chartContainer.className = "chart-container";
  chartContainer.innerHTML =
    '<canvas id="halfDoughnutChart"></canvas><div class="center-label-available">Занято<br><div id="chartValue" style="text-align: center; font-size: 18px; font-weight: bold; margin-top: 20px;"><span id="percentageValue">0.00</span> Гб / <span id="totalValue">0.00</span> Гб</div></br></div>';

  container.appendChild(heading);
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
        borderWidth: 2,
        spacing: 5,
        borderRadius: 10,
      },
    ],
  };

  var totalValue = databaseDetails.tables
    .map((table) => table.memory)
    .reduce((a, b) => a + b, 0);

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
        position: "bottom",
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
      labels: labelsWithPercentages,
      datasets: data.datasets,
    },
    options: options,
  });

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

  const heading = document.createElement("div");
  heading.className = "card-title";
  heading.innerText = "Сводка за 24 часа";

  const errorCountElement = document.createElement("div");
  errorCountElement.innerText =
    "Количество ошибок: " + databaseDetails.errorCount;
  errorCountElement.className = "error-count";

  const alertCountElement = document.createElement("div");
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

  const heading = document.createElement("div");
  heading.className = "card-title";
  heading.innerText = "Информация о базе данных";

  const nameElement = document.createElement("div");
  nameElement.innerText = databaseDetails.name;
  nameElement.className = "db-name";

  const underNameElement = document.createElement("div");
  underNameElement.innerText = "Название";
  underNameElement.className = "db-label";

  const dividerElement = document.createElement("div");
  dividerElement.className = "divider";

  //const infoParagraph = document.createElement("h2");
  //infoParagraph.innerText = databaseDetails.creator;

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
  //container.appendChild(infoParagraph);
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
    window.location.href = "../index.html";
  }
  toggleMenu();
}
