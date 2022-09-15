const keys ='6ab9ab8f6f6e1cbe1751724ffeef8ce0';
// const baseURL ='https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=6ab9ab8f6f6e1cbe1751724ffeef8ce0';

// //fetch api
// fetch(baseURL)
// .then((data)=>{
//     console.log('response',data.json());
// })
// .catch((error)=>{
//     console.log(error);

// });


//fetch whather data 
const requestCity = async (city)=>{
    const baseURL ='https://api.openweathermap.org/data/2.5/weather';
    const query =`?q=${city}&appid=${keys}`;

    //make fetch call
    const response = await fetch(baseURL+query);

    //promise data
    const data = await response.json();
    // console.log(data);
    return data;

}
// requestCity('Mumbai');




//fetch current location
const requestLoc =async ()=>{

        success =async (position)=>{
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // console.log(latitude+" "+longitude);

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude${longitude}&localityLanguage=en`;
        //make fetch call
        const response =await fetch(geoApiUrl);
        //PROMISE DATA
        const data = await response.json();
        
        console.log(data.principalSubdivision);
        // return data.principalSubdivision;

        requestCity(data.principalSubdivision)
        .then((data)=>{
            // console.log(data);
            updateWeatherApp(data);

        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
        error = ()=>{
        console.log('Unable to fetch users location');
        requestCity('Delhi')
        .then((data)=>{
            // console.log(data);
            updateWeatherApp(data);

        })
        .catch((err)=>{
            console.log(err);
        })
    }
   
       navigator.geolocation.getCurrentPosition(success,error);
         
}
