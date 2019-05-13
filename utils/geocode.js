const request = require('request');
const geoLocation = (address, callback) => {
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicmF2aWhvbmFtb3JlIiwiYSI6ImNqdmdxeW0wZDBhbG00OW8yaDZyZ3BuM2MifQ.BS5tVMjM17jfD4nxOx0cXg&limit=1';
    request({'url':geoURL,json:true},(error, response) => {
        if(error){
            callback('Unable to connect to geo server',undefined)
        }else if(response.body.features.length===0){
            callback('unable to find location. try different location.',undefined);
        }else{
            callback(undefined, {
                'longitude': response.body.features[0].center[0],
                'latitude' : response.body.features[0].center[1],
                'location' : response.body.features[0].place_name
            })
        }
    })
};

module.exports = geoLocation;