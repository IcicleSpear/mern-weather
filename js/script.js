//state
let currcity="Chennai";
let units="metric";
function setBackgroundImage(weatherCondition) {
    // Define a mapping of weather conditions to background images
    const backgroundImages = {
        "Clear": "url('assets/clear.gif')",
        "Clouds": "url('assets/clouds.gif')",
        "Rain": "url('assets/rain.gif')",
        "Drizzle": "url('assets/drizzle.gif')",
        "Thunderstorm": "url('assets/thunder.gif')",
        "Snow": "url('assets/snow.gif')",
        "Mist": "url('assets/haze.gif')",
        "Haze": "url('assets/haze.gif')",

        // Add more weather conditions and corresponding background images as needed
    };

    // Get the container element
    let container = document.querySelector(".container");

    // Check if the weather condition has a corresponding background image
    if (backgroundImages.hasOwnProperty(weatherCondition)) {
        // Set the background image of the container
        container.style.backgroundImage = backgroundImages[weatherCondition];
    } else {
        // If no specific background image is defined for the weather condition, set a default background image
        container.style.backgroundImage = "url('default.jpg')";
    }
}

//selectors
let city=document.querySelector(".weather-city");
let datetime=document.querySelector(".datetime");
let forecast=document.querySelector(".weather-forcast");
let temperature=document.querySelector(".temperature");
let icon=document.querySelector(".weather-icon");
let minmax=document.querySelector(".min-max");
let realfeal=document.querySelector(".realfeel");
let humidity=document.querySelector(".humidity");
let wind=document.querySelector(".wind");
let pressure=document.querySelector(".pressure");

//units
document.querySelector(".celcius").addEventListener('click',()=>
{
    if(units!=="metric")
    {
        units="metric"
        getweather()
    }
})

document.querySelector(".farenheit").addEventListener('click',()=>
{
    if(units!=="imperial")
    {
        units="imperial"
        getweather()
    }
})

//search
document.querySelector(".search").addEventListener('submit',e=>{
    let search=document.querySelector(".form-search");
    e.preventDefault(); //this is to prevent default action
    currcity=search.value; // this is to change current city
    getweather()  // get weather forcast
})


//convering countrycode to name
function convertcc(country)
{
    let regname=new Intl.DisplayNames(['en'],{type:"region"}); // this code auto fills the string based on country code
    return regname.of(country)
}

//coneverting timestamp
function convertTimeStamp(timestamp, timezone){
    const convertTimezone = timezone / 3600; // convert seconds to hours 

   const date = new Date(timestamp * 1000);
   
   const options = {
       weekday: "long",
       day: "numeric",
       month: "long",
       year: "numeric",
       hour: "numeric",
       minute: "numeric",
       timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
       hour12: true,
   }
   return date.toLocaleString("en-US", options)
  
}



function getweather()
{
    const API_KEY='585a9b0dc0c750c9e53112ab17ba3a6e'

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currcity}&appid=${API_KEY}&units=${units}`).then(res=>res.json()).then(data => {
        console.log(data);
        city.innerHTML=`${data.name}, ${convertcc(data.sys.country)}`
        forecast.innerHTML = `<p>${data.weather[0].main}`;
        temperature.innerHTML=`${data.main.temp.toFixed()}&#176`
        icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">`
        minmax.innerHTML=`<p>MIN : ${data.main.temp_min.toFixed()}&#176</p>
                          <p>MAX : ${data.main.temp_max.toFixed()}&#176</p>`
        realfeal.innerHTML=`${data.main.feels_like.toFixed()}&#176`
        humidity.innerHTML=`${data.main.humidity.toFixed()}&#176`
        wind.innerHTML=`${data.wind.speed.toFixed()} ${units==="imperial"?"mph":"m/s"}`
        pressure.innerHTML=`${data.main.pressure.toFixed()} hpa`
        let a=data.weather[0].main;
        console.log(a);
        setBackgroundImage(a);

    })
}

document.addEventListener("load",getweather())