const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=4981f5be546d7c27292b502f0e5457e2' + latitude + ',' + longitude +'&units=f'
   
    //Destructing& propertyshorthand
    request({ url: url, json: true }, (error, response) => {
         
    
   // request({url: url, json: true},(error, response) => {
    if (error) {
        callback('Unable to connect to weather service!', undefined)
    } else if (response.body.error) {
        callback('Unable to find location', undefined)
    } else {
        callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
    }
        
    })

}

module.exports = forecast
