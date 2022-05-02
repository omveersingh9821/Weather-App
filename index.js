const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage =document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');

const spitOutCelcius = (kelvin)=>{
    const celcius = Math.round(kelvin - 273.15);
    return celcius;
}
const isDayTime =(icon)=>{
    if(icon.includes('d')){
        return true;
    }else{
        return false;
    }

}

const updateWeatherApp = (city)=>{
    // console.log(city);
    const imageName =city.weather[0].icon;
    const iconSrc =`https://openweathermap.org/img/wn/${imageName}@2x.png`;
    cityName.textContent=city.name;
    cardBody.innerHTML=
    `<div class="card-mid row">
        <div class="col-8 text-center temp">
            <span>${spitOutCelcius(city.main.temp)}&deg;C</span>
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
    cardInfo.classList.remove('d-none');
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
        console.log(err);
    })
     

})