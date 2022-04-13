
// Data structure for Day, Week and Month

const labels = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050]

const data = {
    labels,
    datasets: [{
        data: [86,114,106,106,107,111,133,221,783,2478],
        label: "Africa",
        borderColor: "#3e95cd",
    }]
}

//chart data object

const config = {
    type: "line",
    data: data,
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