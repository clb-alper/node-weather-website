
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("postman-request");

const forecast = (lt, lg, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=a389cfe7a325d8023d94a93505c81b38&query='+ lt + ',' + lg+' &units=m';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect', undefined);
        } else if (body.error) {
            callback('Unable to find a location. Please try another search', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0]+ '. Its currently ' + body.current.temperature + ' degree out!' )
        }
    })

}


module.exports = forecast