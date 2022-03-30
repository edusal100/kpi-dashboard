
//chart data
myData = {labels: ['10:00', '12:00', '14:00', '16:00', '18:00'],
datasets: [{
    data: [9, 10, 3, 19, 12],
    borderColor: '#7FFFD4',
    fill: false
}]
};

//Chart JS

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'line',
    data: myData 
    });
    options: {
        legend: {
            display: false
        }
        scales: {
            yAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    display:false,
                }   
            }]
            xAxes: [{
                gridLines: {
                    borderDash: [8,4],
                }
            }]
        }
    }


// Chart update function with condition, it destroys and rerender with line or bar depending on the button clicked

function chartType(type){
  myChart.destroy();
  if (type === 'line') {
    myChart = new Chart(ctx, {
        type: 'line',
        data: myData 
        });
        options: {
            legend: {
                display: false
            }
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        display:false,
                    }   
                }]
                xAxes: [{
                    gridLines: {
                        borderDash: [8,4],
                    }
                }]
            }
        } 
    }
        else {

            myChart = new Chart(ctx, {
                type: 'bar',
                data: myData 
                });
                options: {
                    legend: {
                        display: false
                    }
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                display:false,
                            }   
                        }]
                        xAxes: [{
                            gridLines: {
                                borderDash: [8,4],
                            }
                        }]

                        } 
                    }
                }
            }
