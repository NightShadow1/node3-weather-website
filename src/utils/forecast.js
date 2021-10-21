const request = require('request')

const forecast = (longitude, latitude, callback ) =>{
    const url = 'http://api.weatherstack.com/current?access_key=256d0f0ea7e893902c92221abfcd372a&query='+ decodeURIComponent(longitude) +','+ decodeURIComponent(latitude) +'&units=m'
    request({url, json:true},(error, { body }) => {
        if(error){
            callback('Unable to connect to weather services!',undefined)
        } else if(body.error){
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + ' It`s currently '+ body.current.temperature + ' degrees C, and it feels like '+ body.current.feelslike + ' C.'+' Humidity is '+body.current.humidity+'%'
            )
        }
    })
}

module.exports = forecast