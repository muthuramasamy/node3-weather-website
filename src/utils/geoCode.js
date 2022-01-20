const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibXV0aHVzdW5kYXJhbSIsImEiOiJja3k3YWcxZ2EwcmpwMm9ydjhiYWpmcjMzIn0.hap2T8jIHFYvkSGqucpMzA'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            console.log('enter if in geocode')
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            console.log('enter else if in geocode')
            callback('Unable to find location. Try another search.', undefined)
        } else {
            console.log('enter else in geocode')
            callback(undefined, {
               
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

