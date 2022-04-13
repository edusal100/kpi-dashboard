
// Data structure for Day, Week and Month

const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const data1 = [900,820,910,850,960,610,600,2500,2200,2600,2300,3000]
const data2 = [282,350,411,502,635,980,940,850,1000,1500,2000,2400]

// Random arrays for week and month, using array push and mathfloor plus conditional

let array_length;
const randomArrayMonth1 = [];
const randomArrayMonth2 = [];
const randomArrayWeek1 = [];
const randomArrayWeek2 = [];
const randomArrayYear1 = [];
const randomArrayYear2 = [];

const data = {
    labels,
    datasets: [{
        data: data1,
        label: "Africa",
        borderColor: "#2d8dfe",
        fill: true,
        backgroundColor: "rgb(62,149,205,0.05)",
        pointRadius: 0,
    }, {
        data: data2,
        label: "Asia",
        borderColor: "#2d8dfe",
        borderDash: [6,6],
        pointRadius: 0,
    }
]
}

//chart data object

const config = {
    type: "line",
    data: data,
    options: {
        plugins: {
            legend: { 
                display: false
            }
          },
          scales: {
              x: {
                display: false
              },
              y: {
                display: false
              }
          }
    }
}

//Default initialization of chart with type: line

const ctx = document.querySelector("#myChart");
let myChart = new Chart(ctx,config);
    

// Chart update function, destroys and re-render with line or bar depending on the selected option (unused at the moment but will adjust for next challenge)

function changeChart(chartType) {
 
    myChart.destroy();
    config.type = chartType.value;
    myChart = new Chart(ctx,config);

};

// Period time update function: week, month and year with conditionals, array push for loops and event listener

const selectElement = document.querySelector("#timeFrame");

// randomize function in integer and with a min max value
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


selectElement.addEventListener('change', (event) => {
    if (event.target.value === "month"){
        array_length = 30;

        for(let i=0; i<array_length; i++) {
            randomArrayMonth1.push(getRndInteger(100,600));
            randomArrayMonth2.push(getRndInteger(100,600));
        }
        data.datasets[0].data = randomArrayMonth1;
        data.datasets[1].data = randomArrayMonth2;

    } if (event.target.value === "week") {
        array_length = 5;

        for(let i=0; i<array_length; i++) {
            randomArrayWeek1.push(getRndInteger(10,150));
            randomArrayWeek2.push(getRndInteger(10,150));
        }
        data.datasets[0].data = randomArrayWeek1;
        data.datasets[1].data = randomArrayWeek2;
    }
    if (event.target.value === "year"){
        array_length = 12;

        for(let i=0; i<array_length; i++) {
            randomArrayYear1.push(getRndInteger(282,2400));
            randomArrayYear2.push(getRndInteger(282,2400));
        }
        data.datasets[0].data = randomArrayYear1;
        data.datasets[1].data = randomArrayYear2;

    }
    myChart.update();

})
