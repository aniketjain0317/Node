const fs = require('fs')

const dataBuffer = fs.readFileSync('data.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)

data.name = "Aniket"
data.age = "18"

const modifiedJSON = JSON.stringify(data)
fs.writeFileSync('data.JSON',modifiedJSON)