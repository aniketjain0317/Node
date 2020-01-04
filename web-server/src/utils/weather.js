const request = require('request')
const getWeather = (coords, callback) =>
{
    const access_token='c0e37637b7221086102d09d4bcd6ac28'
    const url = `https://api.darksky.net/forecast/${access_token}/${coords}?units=ca`
    request( {url, json: true}, (error, {body}) => 
    {
        var errorCB=undefined
        var dataCB=undefined
        if (error)                     {errorCB = 'Unable to access weather service'}
        else if (body.error)           {errorCB = ('Unable to find location. ERROR CODE: ' + body.code)} 
        else                           
        {
            dataCB = 
            {
                summaryToday: body.daily.data[0].summary,
                rainToday: body.daily.data[0].precipProbability,
                tempNow: body.currently.temperature,
                forecast: `${body.daily.data[0].summary} 
                        \n The temperature is ${body.currently.temperature} degress right now.
                        \n There is a ${body.daily.data[0].precipProbability}% chance of rain today.` 
            }
        }
        callback(errorCB,dataCB)
    })
}
module.exports = getWeather