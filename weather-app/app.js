const getCoords = require('./utils/map')
const getWeather = require('./utils/weather')

const place = process.argv[2]
if(!place) {console.log('Please enter a location as the commmand line argument.')}
else 
{
    getCoords(place, (error, {coords, placeName}) =>
    {
        if(error) {return console.log(error)}

        getWeather(coords, (error, dataWeather) =>
        {
            if (error) {return console.log(error)}
            console.log('Place Name: ',placeName)
            console.log(dataWeather.summaryToday)
            console.log(`It is currently ${dataWeather.tempNow} degrees out right now. \n`+
                        `There is a ${dataWeather.rainToday}% chance of rain today.`)
        })
    })
}