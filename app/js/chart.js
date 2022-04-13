
// Data structure for Day, Week and Month

const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const data = {
    labels,
    datasets: [{
        data: [900,820,910,850,960,610,600,2500,2200,2600,2300,3000],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: true,
        backgroundColor: "rgb(62,149,205,0.05)",
        pointRadius: 0,
    }, {
        data: [282,350,411,502,635,980,940,850,1000,1500,2000,2400],
        label: "Asia",
        borderColor: "#3e95cd",
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
    

// Chart update function, destroys and re-render with line or bar depending on the selected option

function changeChart(chartType) {
 
    myChart.destroy();
    config.type = chartType.value;
    myChart = new Chart(ctx,config);

};

// Period time update function: daily, weekly and monthly

function timeFrame(period){
    console.log(period.value);
    if(period.value == 'day'){
        config.options.scales.x.time.unit = period.value;
        config.data.datasets[0].data = day;
    } if(period.value == 'week'){
        config.options.scales.x.time.unit = period.value;
        config.data.datasets[0].data = week;
    }
    if(period.value == 'month'){
        config.options.scales.x.time.unit = period.value;
        config.data.datasets[0].data = month;
    }
    myChart.update();
}