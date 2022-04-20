
// Starting data structure for Day, Week and Month

const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const data1 = [900,820,910,850,960,610,600,2500,2200,2600,2300,3000]
const data2 = [282,350,411,502,635,980,940,850,1000,1500,2000,2400]

// Random arrays for week and month, using array push and mathfloor plus conditional

// Starting empty arrays so those could be created when option selected at first

let array_length;
const monthLabel = [];
const weekLabel = [];
const yearLabel = [];
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
        label: "2022",
        borderColor: "#2d8dfe",
        fill: true,
        backgroundColor: "rgb(62,149,205,0.05)",
        pointRadius: 0,
        pointHitRadius: 20,
    }, {
        data: data2,
        label: "2021",
        borderColor: "#2d8dfe",
        borderDash: [6,6],
        pointRadius: 0,
        pointHitRadius: 20,
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

// Current and previous Year, month and week
const currentYear = new Date().getFullYear();
const previousYear = currentYear - 1;
const currentMonth = new Date().toLocaleDateString('en-us',{month:"long"});

const current = new Date();
current.setMonth(current.getMonth()-1);
const previousMonth = current.toLocaleString('default', { month: 'long' });

currentDate = new Date();
    startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));

const weekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7);
const previousWeekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7)-1;

//function to get the total days for a month
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }


// Period time update function: week, month and year with conditionals, array push for loops and event listener
//Added an extra conditional to confirm if already have data or not to avoid keep pushing more to the array and use the alredy randonmly created data instead

const selectElement = document.querySelector("#timeFrame");

// randomize function in integer and with a min max value
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


selectElement.addEventListener('change', (event) => {
    if (event.target.value === "month"){

        if(randomArrayMonth1.length === 0 ){
        array_length = 30;
        

        for(let i=0; i<array_length; i++) {
            randomArrayMonth1.push(getRndInteger(100,600));
            randomArrayMonth2.push(getRndInteger(100,600));
        }
        data.datasets[0].data = randomArrayMonth1;
        data.datasets[1].data = randomArrayMonth2;
        data.datasets[0].label = currentMonth;
        data.datasets[1].label = previousMonth;
        document.querySelector('#current').innerHTML = currentMonth;
        document.querySelector('#previous').innerHTML = previousMonth;
        

    } else {
        data.datasets[0].data = randomArrayMonth1;
        data.datasets[1].data = randomArrayMonth2;
        data.datasets[0].label = currentMonth;
        data.datasets[1].label = previousMonth;
        document.querySelector('#current').innerHTML = currentMonth;
        document.querySelector('#previous').innerHTML = previousMonth;
    }   

    } if (event.target.value === "week") {

        if(randomArrayWeek1.length === 0 ){
        array_length = 12;

        for(let i=1; i<array_length; i++) {
            randomArrayWeek1.push(getRndInteger(10,150));
            randomArrayWeek2.push(getRndInteger(10,150));

        }
        data.datasets[0].data = randomArrayWeek1;
        data.datasets[1].data = randomArrayWeek2;
        data.datasets[0].label = "W " + weekNumber;
        data.datasets[1].label = "W " + previousWeekNumber;
        document.querySelector('#current').innerHTML = "W: " + weekNumber;
        document.querySelector('#previous').innerHTML = "W: " + previousWeekNumber;

    } else {
        data.datasets[0].data = randomArrayWeek1;
        data.datasets[1].data = randomArrayWeek2;
        data.datasets[0].label = "W " + weekNumber;
        data.datasets[1].label = "W " + previousWeekNumber;
        document.querySelector('#current').innerHTML = "W: " + weekNumber;
        document.querySelector('#previous').innerHTML = "W: " + previousWeekNumber;
    }

} if (event.target.value === "year"){

        if(randomArrayYear1.length === 0 ){

        array_length = 12;

        for(let i=0; i<array_length; i++) {
            randomArrayYear1.push(getRndInteger(282,2400));
            randomArrayYear2.push(getRndInteger(282,2400));
        }
        data.datasets[0].data = randomArrayYear1;
        data.datasets[1].data = randomArrayYear2;
        data.datasets[0].label = currentYear;
        data.datasets[1].label = previousYear;
        document.querySelector('#current').innerHTML = currentYear;
        document.querySelector('#previous').innerHTML = previousYear;

        } else {
            data.datasets[0].data = randomArrayYear1;
            data.datasets[1].data = randomArrayYear2;
            data.datasets[0].label = currentYear;
            data.datasets[1].label = previousYear;
            document.querySelector('#current').innerHTML = currentYear;
            document.querySelector('#previous').innerHTML = previousYear;

    }
}
        myChart.update();
})

// Splash startup screen
