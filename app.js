const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage =document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');
const date =document.querySelector('.date .date1');
const time =document.querySelector('.date .time');
const toggle = document.querySelector('.toggle-btn');

const img = document.querySelector('.condition-img');

const logo1 = document.querySelector('.logo1');
const logo2 = document.querySelector('.logo2');

const backCard2 = document.querySelector('.back-card-2'); 

logo2.addEventListener('click',()=>{
    location.reload();
})

logo1.addEventListener('click',()=>{    
    //toggle class
    backCard2.classList.toggle('back-card-2');
    //toggle class
    cardBody.classList.toggle('d-none');    
})


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

//add data dynamically
const fetchData = (city)=>{
    console.log(city);
    var temp = spitOutCelcius(city.main.temp);

    //temperature conversion
    toggle.addEventListener('click',(e)=>{

       if(e.target.innerHTML == 'F'){
            temp = spitOutFahrenheit(city.main.temp)
            document.querySelector('.temp-1').innerHTML=temp+'&degF';
            e.target.innerHTML = 'C';
            e.stopImmediatePropagation();
           
            
       }else if(e.target.innerHTML == 'C'){
            temp = spitOutCelcius(city.main.temp);
            document.querySelector('.temp-1').innerHTML=temp+'&degC';
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
            <span class="temp-1">${temp}&degC</span>
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
        <div class="col text-center wind">
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

const fetchData5 = (city) => { 
    console.log(city);
    var j = 1;
    for (let i = 7; i < 40; i += 8) { 
        //setting the date
        const date = new Date(city.list[i].dt * 1000).toLocaleDateString();
        document.getElementById(`date${j}`).innerHTML = date;
        //set temperature
        var temp = spitOutCelcius(city.list[i].main.temp);
        document.getElementById(`${j}`).innerHTML = temp + "&degC";
        //set image logo
        const imageName =city.list[i].weather[0].icon;
        const iconSrc = `https://openweathermap.org/img/wn/${imageName}@2x.png`;
        document.getElementById(`img${j}`).setAttribute('src',iconSrc);
        j++; 
    }   
}

//add an event listener to the form
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    // console.log(citySearched);
    searchForm.reset();
    fetchRequest(citySearched)
    .then((data)=>{
        // console.log(data);
        fetchData(data);

    })
    .catch((err)=>{
        console.log('error in form',err);
    })
    fetchRequest5(citySearched)
    .then((data) => { 
        fetchData5(data);
    })
    .catch((err) => { 
        console.log('error in form', err);
    })
})