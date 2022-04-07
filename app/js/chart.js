
//chart data
myData = {labels: ['10:00', '12:00', '14:00', '16:00', '18:00'],
datasets: [{
    data: [9, 10, 3, 19, 12],
    borderColor: '#7FFFD4',
    backgroundColor:'#7FFFD4',
    fill: false
}]
};

//chart options
myOptions = { legend: {
        display: false
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

//Default chart with type: line

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'line',
    data: myData, 
    options: myOptions,
    });

// Chart update function, destroys and re-render with line or bar depending on the selected option

function updateChartType() {
    myChart.destroy();
    myChart = new Chart(ctx, {
        type: document.getElementById("chartType").value,
        data: myData,
        options: myOptions,
    });
}