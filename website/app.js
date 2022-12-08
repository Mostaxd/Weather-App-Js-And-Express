/*
 *  Global Variables
*/

const apiKey = 'd8704e2b50e34080b8ca2dbd9fe8e08e';

/*  Date */
let d = new Date();
let newDate = d.getDate() + '.' + Number(d.getMonth()+1) + '.' + d.getFullYear();

/*  Form  Input  */
const submitButton = document.querySelector('#submit');
const inputCity = document.querySelector('.input-city');
const inputZip = document.querySelector('.input-zip');
const inputFeeling = document.querySelector('.input-feeling');

/*  Output    */
currentDate = document.querySelector('.date');
currentCity = document.querySelector('.city');
currentTemp = document.querySelector('.degree');
currentFeeling = document.querySelector('.feeling');
let currentIcon = document.querySelector('.image');


submitButton.addEventListener('click', () => submitForm());

submitForm = () => {
    let city = inputCity.value;
    let zip = inputZip.value;
    let feeling = inputFeeling.value;

    getWeather(city, zip, feeling)
        .then(data => filterData(data))
        .then(data => postData('/addData', data))
        .then(updateUI)
        .catch(error => console.log(error))
}


getWeather = async (city, zip, feeling) => {
    if (city === undefined || city === undefined) {
        alert('Please enter a correct City/Zip')
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${zip}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url)
        const data = await res.json()
        data.feeling = feeling;
        return data
    }
    catch (err) {
        console.log(err);
    }
}


// /* Function to POST data */
const postData = async (url, data) => {
    try {
        const toBeSentData = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return toBeSentData;
    }
    catch (error) {
        console.log(error);
    }
};


filterData = async (data) => {
    try {
        const filteredData = {
            date: newDate,
            city: data.name,
            temp: data.main.temp,
            feeling: data.feeling,
            icon: data.weather[0].icon
        }
        return filteredData;
    }
    catch (error) {
        error => console.log(error)
    };
}


const updateUI = async () => {
    try {
        // get data from server
        let data = await fetch('/all');
        data = await data.json();
        console.log('i am the receieved data!! \n' , data)

        // update UI with the values received from server
        currentDate.textContent = data.date;
        currentFeeling.textContent = data.feeling;
        currentCity.textContent = data.city;
        currentTemp.textContent = data.temp;
        currentTemp.innerhtml += '&deg;';
        currentIcon.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
        return data;
    }
    catch (error) {
        console.log("error", error);
    }

}