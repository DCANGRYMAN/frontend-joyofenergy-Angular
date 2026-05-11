import * as chartJs from "chart.js";

let chart;

const formatPart = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const formatDateLabel = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getMonth();
  const day = date.getDate();

  return `${formatPart(day)}/${formatPart(month + 1)}`;
};

export const formatHourLabel = (timestamp) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  return `${formatPart(hour)}:00`;
};

export const renderChart = (containerId, readings, isHourly = false) => {
  chartJs.Chart.defaults.font.size = "10px";

  chartJs.Chart.register.apply(
    null,
    Object.values(chartJs).filter((chartClass) => chartClass.id)
  );

  const labelFormatter = isHourly ? formatHourLabel : formatDateLabel;
  const labels = readings.map(({ time }) => labelFormatter(time));
  const values = readings.map(({ value }) => value);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "kWh usage",
        data: values,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        borderWidth: 0.2,
        backgroundColor: "#5A8EDA",
        borderRadius: 10,
      },
    ],
  };

  if (chart) {
    chart.destroy();
  }

  chart = new chartJs.Chart(containerId, {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      maintainAspectRatio: false,
    },
  });
};
