const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage =document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');
const date =document.querySelector('.date .date1');
const time =document.querySelector('.date .time');
const toggle = document.querySelector('.toggle-btn');


const d=new Date().toLocaleString();
date.innerHTML=d.substring(0,10)

//time function
function updateTime(){
    const date = new Date();
    let hour = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());
    let zone = hour >= 12 ? "PM" : "AM";
    if (hour > 12) {
        hour = hour % 12;
    }
    time.innerHTML = `${hour}:${minutes}:${seconds} ${zone}`;
}

//time format function
function formatTime(time){
    if(time < 10){
        return '0' + time;
    }
    return time;
  
}
//call the function updateTime() after a partcular interval
setInterval(updateTime,1000);

//location function
requestLoc()
.then((data)=>{
})
.catch((error)=>{
    console.log('Error in fetching users location',error);
})

const spitOutCelcius = (kelvin)=>{

    const celcius = Math.round(kelvin - 273.15);
    console.log(celcius);
    return celcius;
}
const spitOutFahrenheit = (kelvin)=>{

    const Fahrenheit = Math.round(1.8*(kelvin-273) + 32);
    console.log(Fahrenheit)
    return Fahrenheit;
}
const isDayTime =(icon)=>{
    if(icon.includes('d')){
        return true;
    }else{
        return false;
    }

}


const updateWeatherApp = (city)=>{
    console.log(city);
    
    var temp = spitOutCelcius(city.main.temp);

    //temperature conversion
    toggle.addEventListener('click',(e)=>{

       if(e.target.innerHTML == 'F'){
            temp = spitOutFahrenheit(city.main.temp)
            document.querySelector('.temp1').innerHTML=temp+'&degF';
            e.target.innerHTML = 'C';
            e.stopImmediatePropagation();
           
            
       }else if(e.target.innerHTML == 'C'){
            temp = spitOutCelcius(city.main.temp);
            document.querySelector('.temp1').innerHTML=temp+'&degC';
            e.target.innerHTML = 'F';
            e.stopImmediatePropagation();
            
       }
       
    })
    
    const imageName =city.weather[0].icon;
    const iconSrc =`https://openweathermap.org/img/wn/${imageName}@2x.png`;
    cityName.textContent=city.name;
    cardBody.innerHTML=
    `<div class="card-mid row">
        <div class="col-8 text-center temp">
            <span class="temp1">${temp}&degC</span>
        </div>
        <div class="col-4 condition-temp">
            <p class="condition"> ${city.weather[0].description} </p>
            <p class="high">${spitOutCelcius(city.main.temp_max)}&deg;C</p>
            <p class="low">${spitOutCelcius(city.main.temp_min)}&deg;C</p>
        </div>
    </div>

    <div class="icon-container card shadow mx-auto">
        <img src="${iconSrc}" alt="">
    </div>
    <div class="card-bottom px-5 py-4 row">
        <div class="col text-center">
            <p>${spitOutCelcius(city.main.feels_like)}&deg;C</p>
            <span>Feels Like</span>
        </div>
        <div class="col text-center">
            <p>${city.main.humidity}%</p>
            <span>Humidity</span>
        </div>
        <div class="col text-center mt-4 ">
            <p>${city.wind.speed}</p>
            <span>Wind Speed</span>
        </div>
    </div>`

    if(isDayTime(imageName)){
        // console.log('day');
        timeImage.setAttribute('src','img/day_image.svg');
        cityName.classList.add('text-black');
    }else{
        // console.log('night');
        timeImage.setAttribute('src','img/night_image.svg');
        cityName.classList.add('text-white');
    }
    
}


//add an event listener to the form
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    // console.log(citySearched);
    searchForm.reset();
    requestCity(citySearched)
    .then((data)=>{
        // console.log(data);
        updateWeatherApp(data);

    })
    .catch((err)=>{
        console.log('error in form',err);
    })
     

})