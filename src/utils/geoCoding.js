const axios = require('axios');

async function geoCode(address, callback){
try{
    const urlGeoCoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2QyMTAyIiwiYSI6ImNsNHNna2NhdDFhYzczaHFjcTIxaWNzODkifQ.QA87kpkuFx1Bf2CC5Pdn8w'
    const response = await axios.get(urlGeoCoding)
    const data = response.data 
    
    if(data.features.length==0){
        return callback('Cannot search the location, check for the  new location',undefined)
    }
    
    callback(undefined, {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        location: data.features[0].place_name
    })
}catch(error){
    callback('Unable to connect to location services!',undefined)
}}

module.exports=geoCode;



