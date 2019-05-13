const request = require('request');
const weatherForecast = (lat, lng, callback) => {
    const weatherURL = 'https://api.darksky.net/forecast/1bfe7cdb578c4eef8da5580feff31edf/'+lat+','+lng;

    request({'url': weatherURL,json:true},(error,response) => {
        if(error){
            callback('Unable to connect to forecast server',undefined);
        }else if(response.body.error){
            callback('unable to find the weather for the location',undefined)
        }else{
            callback(undefined, {
                'temperature' : response.body.currently.temperature,
                'rainProbability' : response.body.currently.precipProbability,
                'summary' : response.body.currently.summary
            })
        }
    });
}

module.exports = weatherForecast;