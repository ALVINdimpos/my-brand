// Get the context of the canvas element we want to select
const ctx = document.getElementById("myChart").getContext("2d");

// Set the data for the chart
const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Page Views",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
    {
      label: "Unique Visitors",
      data: [28, 48, 40, 19, 86, 27, 90],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

// Set the options for the chart
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

// Create the chart
const myChart = new Chart(ctx, {
  type: "line",
  data: data,
  options: options,
});
