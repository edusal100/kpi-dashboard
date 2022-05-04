
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
        array_length = 13;

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

//Function Login & Signup menu
//Simplified function with ternary operator
function openMenu (menu){
    menu == "loginScreen" ? (document.querySelector("#welcomeScreen").style.display = "none", document.querySelector("#loginScreen").style.display = "block") :
        (document.querySelector("#welcomeScreen").style.display = "none", document.querySelector("#signUpScreen").style.display = "block") 
}

document.querySelector("#login").addEventListener("click", () => openMenu("loginScreen"))
document.querySelector("#newUser").addEventListener("click", () => openMenu("signUpScreen"))


//New user globals

let arrayUsers = [];
let existingUsers = [];
const newUsers = [];

document.querySelector("#signUp").addEventListener("click", newUser);

//Function new User
function newUser () {
    existingUsers = JSON.parse(localStorage.getItem("arrayUsers"));
    
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const user = new User (name, email, password);
    
    //if all 3 inputs has something then we push to array and localstorage plus access to dashboard
    if (name && email && password){ 

    //if there isnt an existing user push the new user and save
    if(existingUsers == null) {
        arrayUsers.push(user);
        localStorage.setItem("arrayUsers", JSON.stringify(arrayUsers));
        document.querySelector("#loginScreen").style.display = "block";
        document.querySelector("#signUpScreen").style.display = "none";

    //If there is an existing user already push that one first on the array then the new one and then save
    //Change concat for spread operator
    } else {
    newUsers.push(user);
    arrayUsers = [...existingUsers, ...newUsers]

    
    localStorage.setItem("arrayUsers", JSON.stringify(arrayUsers));
    document.querySelector("#loginScreen").style.display = "block";
    document.querySelector("#signUpScreen").style.display = "none";
     }
    } else {
        document.querySelector("#errorMsgSignup").innerHTML = ("Please enter complete data required");
        document.querySelector("#errorImgSignup").style.display = "block";
    }
}

document.querySelector("#signIn").addEventListener("click", login);

//Lottie animation library
const svgContainer = document.querySelector("#svg");
const animItem = bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: 'svg',
    loop: false,
    autoplay: false,
    path:"https://assets3.lottiefiles.com/packages/lf20_lg6lh7fp.json"
});

animItem.addEventListener('complete', animStop);

function animStop () {
    document.querySelector("#loginScreen").style.display = "none", document.querySelector(".dashboard").style.display = "block"
}

//Function Login (validate if the user exist and if both email and password match)
function login () {
    const loginEmail = document.querySelector("#loginEmail").value;
    const loginPassword = document.querySelector("#loginPassword").value;
    //added lottie animation play on login function
   
    existingUsers = JSON.parse(localStorage.getItem("arrayUsers"));

    if(existingUsers == null) {
        document.querySelector("#errorMsgLogin").innerHTML = ("Looks like you don't have an account"),document.querySelector("#errorImgLogin").style.display = "block";
    } else {
        const found = existingUsers.find( e => e.email === loginEmail && e.password === loginPassword);
        //Simplified function with ternary operator
        found ? (animItem.goToAndPlay(0,true)) : 
        document.querySelector("#errorMsgLogin").innerHTML = ("Looks like you don't have an account"),document.querySelector("#errorImgLogin").style.display = "block";
    }


}

//Future Function new dashboard item