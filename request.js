const keys ='6ab9ab8f6f6e1cbe1751724ffeef8ce0';
// const baseURL ='http://apii.openweathermap.org/data/2.5/weather?q=Lagos&appid=6ab9ab8f6f6e1cbe1751724ffeef8ce0';

// //fetch api
// fetch(baseURL)
// .then((data)=>{
//     console.log('response',data.json());
// })
// .catch((error)=>{
//     console.log(error);

// });


//fetch data
const requestCity =async (city)=>{
    const baseURL ='http://api.openweathermap.org/data/2.5/weather';
    const query =`?q=${city}&appid=${keys}`;

    //make fetch call
    const response =await fetch(baseURL+query);

    //promise data
    const data = await response.json();
    // console.log(data);
    return data;

}
// requestCity('Mumbai');