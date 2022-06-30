const axios = require('axios')

async function forecast(latitude,longitude,callback){
    try{
        const url = 'http://api.weatherstack.com/current?access_key=6dd16a351ba55bd4f8823d94a9f99a82&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f'
        const response = await axios.get(url)
        const data = response.data
        if(data.error){
            return callback('Unable to find location!',undefined)
        }
        callback(undefined,`${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out but it feels like ${data.current.feelslike} degrees out.The humidity is ${data.current.humidity} %`)
    
    }catch(error){
        callback('Unable to connect to weather services!',undefined)
        
    }  
}

module.exports = forecast





