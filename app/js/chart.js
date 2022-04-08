
// Data structure for Day, Week and Month

const day = [ 
    {x: Date.parse('2022-04-04 00:00:00') , y:1},
    {x: Date.parse('2022-04-05 00:00:00'), y:8},
    {x: Date.parse('2022-04-06 00:00:00') , y:2},
    {x: Date.parse('2022-04-07 00:00:00'), y:10},
    {x: Date.parse('2022-04-08 00:00:00') , y:12},

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
            borderColor: '#7FFFD4',
            backgroundColor:'#7FFFD4',
            fill: false,
}]},
 options: {
    tension: 0.4,
    plugins: {
        legend: {
        display: false,
    },
},     
scales: {
    x: {
        grid:{
            borderDash: [8,4]
        },
        type: 'time',
        time: {
            unit:'day',
        }
    },
      y: {
        grid: {
            display: false,
        },
        ticks: {
            display:false,
        },
        beginAtZero: true,   
    }
    }
}
};



//Default initialization of chart with type: line

const ctx = document.getElementById('myChart');
let myChart = new Chart(ctx,config);
    

// Chart update function, destroys and re-render with line or bar depending on the selected option

function changeChart(chartType) {
 
    myChart.destroy();
    config.type = chartType.value;
    myChart = new Chart(ctx,config);

}

function timeFrame()