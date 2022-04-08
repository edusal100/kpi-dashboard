
//chart data
let config = {
    type: "line",
    data: {
        labels: ['10:00', '12:00', '14:00', '16:00', '18:00'],
        datasets: [{
            data: [9, 10, 3, 19, 12],
            borderColor: '#7FFFD4',
            backgroundColor:'#7FFFD4',
            fill: false,
}]},
 options: { legend: {
    display: false,
},
scales: {
    yAxes: [{
        gridLines: {
            display: false,
        },
        ticks: {
            display:false,
        }   
    }],
    xAxes: [{
        gridLines: {
            borderDash: [8,4],
        }
    }] }
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