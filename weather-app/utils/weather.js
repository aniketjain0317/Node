const request = require('request')
const getWeather = (coords, callback) =>
{
    const url = `https://api.darksky.net/forecast/c0e37637b7221086102d09d4bcd6ac28/${coords}?units=ca`
    request( {url, json: true}, (error, {body}) => 
    {
        var errorCB=undefined
        var dataCB=undefined
        if (error)                     {errorCB = 'Unable to access weather service'}
        else if (body.error)  {errorCB = ('Unable to find location. ERROR CODE: ' + body.code)} 
        else                           {dataCB = body}
        callback(errorCB,dataCB)
    })
}
module.exports = getWeather