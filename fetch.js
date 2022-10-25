const secret_keys = '6ab9ab8f6f6e1cbe1751724ffeef8ce0';
const secret_keys1 = '81b55d1c5e19f8ece30b7161e0dc8e5e';
// const baseURL ='https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=6ab9ab8f6f6e1cbe1751724ffeef8ce0';

// //fetch api
// fetch(baseURL)
// .then((data)=>{
//     console.log('response',data.json());
// })
// .catch((error)=>{
//     console.log(error);

// });
// const baseURL5 = 'https://api.openweathermap.org/data/2.5/forecast?q=delhi&appid=81b55d1c5e19f8ece30b7161e0dc8e5e';

//fetch 5 days data
const fetchRequest5 = async (city) => { 
    const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
    const query = `?q=${city}&appid=${secret_keys1}`;
    //make fetch call
    const response = await fetch(API_URL + query);

    //promise data
    const data = await response.json();
    console.log("Second api");
    return data;

}
//fetch whather data 
const fetchRequest = async (city)=>{
    const API_URL ='https://api.openweathermap.org/data/2.5/weather';
    const query = `?q=${city}&appid=${secret_keys}`;

    //make fetch call
    const response = await fetch(API_URL+query);

    //promise data
    const data = await response.json();
    // console.log(data);
    return data;

}
// requestCity('Mumbai');




//fetch current location
const requestLoc =async ()=>{

        success = async(position)=>{
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // console.log(latitude+" "+longitude);

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude${longitude}&localityLanguage=en`;
        //make fetch call
        const response = await fetch(geoApiUrl);
        //PROMISE DATA
        const data = await response.json();
        
        console.log(data.principalSubdivision);
        // return data.principalSubdivision;
        
        fetchRequest(data.principalSubdivision)
        .then((data)=>{
            // console.log(data);
            fetchData(data);

        })
        .catch((err)=>{
            console.log(err);
        })
         
        //request 5 days data    
        fetchRequest5(data.principalSubdivision)
        .then((data) => {
            console.log(data);
            fetchData5(data);
        })
        .catch((err) => {
            console.log(err);
        })    
    }
    
        error = ()=>{
        console.log('Unable to fetch users location');
        fetchRequest('Delhi')
        .then((data)=>{
            // console.log(data);
            fetchData(data);
           

        })
        .catch((err)=>{
            console.log(err);
        })
            
        //4 days data
        // requestCity5('Delhi') 
        // .then((data)=>{
        //     fetchData5(data);     
        // })
        // .catch((err) => {
        //     console.log(err);
        // })    
    }
    navigator.geolocation.getCurrentPosition(success,error);      
}
