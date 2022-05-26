
// Starting data structure for Day, Week and Month

let labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const initialData = [900,820,910,850,960,610,600,2500,2200,2600,2300,3000]

// Random arrays for week and month, using array push and mathfloor plus conditional

// Starting empty arrays so those could be created when a xls or xlsx file is uploaded

const newLabel = [];
const newData = [];

const data = {
    labels,
    datasets: [{
        data: initialData,
        borderColor: "white",
        fill: true,
        backgroundColor: "rgb(62,149,205,0.05)",
        pointRadius: 0,
        pointHitRadius: 20,
    }]
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
    

// Chart update function when new xls document gets uploaded

function updateChart(a , b) {
 
    data.datasets[0].data = a;
    data.labels = b;
    myChart.update();
};

// Current and previous Year, month and week
const currentYear = new Date().getFullYear();
const previousYear = currentYear - 1;
const currentMonth = new Date().toLocaleDateString('en-us',{month:"long"});

const current = new Date();
current.setMonth(current.getMonth()-1);
const previousMonth = current.toLocaleString('default', { month: 'long' });

const options = { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long'};

// Get the current date and set it on the dashboard (dom)
document.querySelector("#currentTime").innerHTML = (new Date().toLocaleDateString('en-US', options));


currentDate = new Date();
    startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));

const weekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7);
const previousWeekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7)-1;


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

//function avatar selected
const avatar = document.querySelectorAll(".avatar");
let active;
window.onload = function addClickAvatar () {
    for (var i = 0 ; i< avatar.length; i++ ) {
        var a = avatar[i];
        a.onclick = selectedAvatar
    }
}

function selectedAvatar () {
    const element = document.getElementById(this.id);
    if(element.classList.contains("active")){
        element.classList.remove("active");
    } else {
        element.classList.add("active");
    }
    active = document.querySelectorAll(".active");
    if(active.length == 1) {
        firstItem = this.id;
    } else if (active.length > 1) {
        secondItem = this.id;
        if(firstItem > secondItem){
            active.item(1).classList.remove("active");
        } else {
            active.item(0).classList.remove("active");
        }     
        }
    }

// Call funcion new user with signup button and with Enter key on password input text
document.querySelector("#signUp").addEventListener("click", newUser);
document.querySelector("#password").addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        newUser();

    }
});

//Function new User
function newUser () {
    existingUsers = JSON.parse(localStorage.getItem("arrayUsers"));

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const userAvatar = document.querySelector(".active").src;

    const user = new User (name, email, password, userAvatar);
    
    //if all 3 inputs has something then we push to array and localstorage plus access to dashboard
    if (name && email && password && userAvatar){ 

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

// Call funcion login with login button and with Enter key on password input text
document.querySelector("#signIn").addEventListener("click", login);
document.querySelector("#loginPassword").addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        login();

    }
});

//Function Login (validate if the user exist and if both email and password match)
function login () {
    const loginEmail = document.querySelector("#loginEmail").value;
    const loginPassword = document.querySelector("#loginPassword").value;
    //added lottie animation play on login function
   
    existingUsers = JSON.parse(localStorage.getItem("arrayUsers"));

    if(existingUsers === null) {
        document.querySelector("#errorMsgLogin").innerHTML = ("Looks like you don't have an account"),document.querySelector("#errorImgLogin").style.display = "block";
    } else {
        const found = existingUsers.find( e => e.email === loginEmail && e.password === loginPassword);
        //Simplified function with ternary operator

        found ? (document.querySelector("#loginScreen").style.display = "none", document.querySelector(".dashboard").style.display = "block",
        document.querySelector("#welcomeMsg").innerHTML = (found.name), document.querySelector("#dashboardAvatar").src = (found.userAvatar)): 
        document.querySelector("#errorMsgLogin").innerHTML = ("Looks like you don't have an account"),document.querySelector("#errorImgLogin").style.display = "block";
    }


}

//Function currentweather (OpenWeather API)

function getWeather (lat , lon) {
    const key = "abc8f38e368201d5eb34d3037dcb9e58";
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon + '&appid=' + key)
    .then(function(resp) { return resp.json()}) // convert data to json
    .then(function(data) {
        drawWeather(data);
    })
    .catch(function() {
        //catch any errors
    });
}

//Function currentLocation

function currentLocation (pos) {
    const crd = pos.coords;

    let latitude = crd.latitude;
    let longitude = crd.longitude;

    getWeather(latitude, longitude);

}

navigator.geolocation.getCurrentPosition(currentLocation);

// function drawWeather in to Dashboard

function drawWeather( d ) {
	const celcius = Math.round(parseFloat(d.main.temp)-273.15);
	const fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	
	document.querySelector('#description').innerHTML = d.weather[0].description;
	document.querySelector('#temp').innerHTML = celcius + '&deg;';
	document.querySelector('#location').innerHTML = d.name;

    const weatherImg = document.querySelector ('#icon')
    weatherImg.src = "http://openweathermap.org/img/w/" + d.weather[0].icon +".png";
}

//function logoff

document.querySelector("#logoff").addEventListener("click", logoff);

function logoff () {
    document.querySelector("#welcomeScreen").style.display = "block";
    document.querySelector(".dashboard").style.display = "none";
    document.querySelector("#loginEmail").value = "";
    document.querySelector("#loginPassword").value = "";
    document.querySelector("#errorImgLogin").style.display = "none";
    document.querySelector("#errorImgUpload").style.display = "none";
    document.querySelector("#errorMsgUpload").style.display = "none";
    document.querySelector("#errorMsgLogin").style.display = "none";       
}

//function upload data xls or xlsx
let files = "";
let xlsArrayDiscrete = [];
let xlsArrayShipment = [];
document.querySelector("#addData").addEventListener("click" , upload)

function upload (){
    files = document.querySelector("#file_upload").files;
    if(files.length == 0) {
        document.querySelector("#errorMsgUpload").innerHTML = ("Please choose any file...")
    }
    const filename = files[0].name;
    const extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == ".XLS" || extension == ".XLSX") {
        excelFileToJSON(files[0]);
        document.querySelector("#errorMsgUpload").innerHTML = ("")
        document.querySelector("#errorImgUpload").style.display = "none"
    } else {
        document.querySelector("#errorImgUpload").style.display = "block";
        document.querySelector("#errorMsgUpload").innerHTML = ("Please select a valid excel file");
        
    }
}

// function excel file to json + show/change data with this on dashboard

let dollarUSLocale = Intl.NumberFormat('en-US');

function excelFileToJSON (file) {
    try {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (e){
            const data = e.target.result;
            const workbook = XLSX.read(data, {
                type: "binary",
                cellText:false,
                cellDates:true,
            });
            const result = {};
            const firstSheetName = workbook.SheetNames[0];
            const secondSheetName = workbook.SheetNames[1];
        
            const jsonDataDiscrete = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
            const jsonDataShipment = XLSX.utils.sheet_to_json(workbook.Sheets[secondSheetName]);
            const xlsJsonDiscrete = (JSON.stringify(jsonDataDiscrete));
            const xlsJsonShipment = (JSON.stringify(jsonDataShipment));
            xlsArrayRelease = (JSON.parse(xlsJsonDiscrete));
            xlsArrayShipment = (JSON.parse(xlsJsonShipment));

            const amount = xlsArrayShipment.reduce((accumulator, object) => {
                return accumulator + object.amount;
            },0)

            const release = xlsArrayRelease.reduce((accumulator, object) => {
                return accumulator + (object.status == "Released");
            },0)

            const unrelease = xlsArrayRelease.reduce((accumulator, object) => {
                return accumulator + (object.status == "Unreleased");
            },0)

            const onhold = xlsArrayRelease.reduce((accumulator, object) => {
                return accumulator + (object.status == "On Hold");
            },0)

            document.querySelector("#amount").innerHTML = ("$ " + dollarUSLocale.format(amount));
            document.querySelector("#release").innerHTML = (release);
            document.querySelector("#unrelease").innerHTML = (unrelease);
            document.querySelector("#onhold").innerHTML = (onhold);

            xlsArrayShipment.forEach((object) => {
                newLabel.push(new Date(object.date).toLocaleDateString('en-US', options));
                newData.push(object.amount);
            });

            console.log(newData);
            console.log(newLabel);

            updateChart(newData, newLabel);
           
        }
    } catch(e) {
        console.error(e);
    }

}