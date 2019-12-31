const https = require('https')
const url = `https://api.darksky.net/forecast/c0e37637b7221086102d09d4bcd6ac28/26,75?units=ca`
const request = https.request(url, (response) =>
{
    var dataJSON=''
    response.on('data',(chunk) =>
    {
        dataJSON += chunk.toString()
    })
    response.on('end', () =>
    {
        const data = JSON.parse(dataJSON)
        console.log(data)
    })
})

request.on('error',(err)=>
{
    console.log(err)
})
request.end()