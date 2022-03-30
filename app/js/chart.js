
const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['10:00', '12:00', '14:00', '16:00', '18:00'],
        datasets: [{
            data: [9, 10, 3, 19, 12],
            borderColor: '#7FFFD4',
            fill: false
        }]
    },
    options: {
        legend: {
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
            }]
        }
    }
});

// today function

let dt = new Date().toLocaleDateString();
document.getElementById('date').innerHTML=dt;
