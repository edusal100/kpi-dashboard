
// Data structure for Day, Week and Month

const day = [ 
    {x: Date.parse('2022-04-04 00:00:00') , y:1},
    {x: Date.parse('2022-04-05 00:00:00'), y:5},
    {x: Date.parse('2022-04-06 00:00:00') , y:3},
    {x: Date.parse('2022-04-07 00:00:00'), y:8},
    {x: Date.parse('2022-04-08 00:00:00') , y:4},
    {x: Date.parse('2022-04-09 00:00:00') , y:19},
    {x: Date.parse('2022-04-10 00:00:00') , y:15},

];

const week = [
    {x: Date.parse('2022-04-04 00:00:00'), y:50},
    {x: Date.parse('2022-04-11 00:00:00'), y:70},
    {x: Date.parse('2022-04-18 00:00:00'), y:100},
    {x: Date.parse('2022-04-25 00:00:00'), y:60},
    {x: Date.parse('2022-05-02 00:00:00'), y:30},
];

const month = [
    {x: Date.parse('2022-01-01 00:00:00'), y:500},
    {x: Date.parse('2022-02-01 00:00:00'), y:700},
    {x: Date.parse('2022-03-01 00:00:00'), y:500},
    {x: Date.parse('2022-04-01 00:00:00'), y:300},
    {x: Date.parse('2022-05-01 00:00:00'), y:700},
];

console.log (day);

//chart data object

const config = {
    type: "line",
    data: {
        datasets: [{
            data: day,
            borderColor: '#5a4aa6',
            backgroundColor:'#5a4aa6',
            fill: false,
}]},
 options: {
    tension: 0.4,
    plugins: {
        legend: {
        display: false,
    },
},
layout: {
    padding: {
        top: 30,
        bottom: 30,
    }
},   
scales: {
    x: {
        grid:{
            display: false,
            borderColor: '#202229',
        },
        type: 'time',
        time: {
            unit:'day',
        },
        ticks: {
            display: false,
        }
    },
      y: {
        ticks: {
            maxTicksLimit: 3,
            font:{
                size: 16,
            }
        },

        grid: {
            display: false,
            borderColor: '#202229',
        },
        beginAtZero: true,   
    }
    }
}
};


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