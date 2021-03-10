

const request = require("postman-request");

const forecast = (lt, lg, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=a389cfe7a325d8023d94a93505c81b38&query='+ lt + ',' + lg+' &units=m';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect', undefined);
        } else if (body.error) {
            callback('Unable to find a location. Please try another search', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0]+ '. Its currently ' + body.current.temperature + ' degree out! ' +'Humidity:'+ body.current.humidity)
        }
    })

}


module.exports = forecast