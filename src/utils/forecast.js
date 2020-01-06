const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/aad01a5681c64c95e1f81641750a531e/'+ latitude +','+ longitude +'?units=auto&lang=es'

request({url: url, json: true} , (error, {body}) => {
    
    if (error) {
        callback('Unable to connect to weather service', undefined)
    } else if (body.error){
        callback(body.error, undefined)
    }else{
        callback( undefined,  'La zona horaria es: ' 
        + body.timezone + ' el resumen es ' + 
        body.daily.data[0].summary + ' La temperatura es de '
        + body.currently.temperature + ' °C y la probabilidad de lluvias es '
        + body.currently.precipProbability + " %."
        )
        
        
    }
    
})
}

module.exports = forecast

