const request = require('request')
const getCoords = (address,callback) =>
{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiYWJjZDMxNyIsImEiOiJjazRvOHI0dHAxYm05M2tuNXBsaW9iaXA1In0.QIKxi4eXQvwBAJi1ZdwIWg`
    request( {url, json: true}, (error, {body}) =>
    {
        var errorCB=undefined
        var dataCB=undefined
        if (error)                        {errorCB = 'Unable to access map service'}
        else if (!body.features.length) {errorCB = 'Unable to find location'}
        else
        {
            const placeName = body.features[0].place_name
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const coords = (latitude + ',' + longitude)
            dataCB = {coords,placeName}
        }
        callback(errorCB,dataCB)
    })
}

module.exports = getCoords