const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Define paths for express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setting up hbs engine and custom views, partials path
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath) 

//setting up the static directory to serve
app.use(express.static(publicPath))

app.get('', (req,res) =>
{
    res.render('index', 
    {
        title: 'Index: A Weather App',
        name: 'Aniket Jain'
    })
})

app.get('/about', (req,res) => 
{
    res.render('about',
    {
        title: 'THE ABOUT PAGE',
        image: 'img/random_img.jpg',
        name: 'Aniket Jain'
    })
})

app.get('/help', (req,res) =>
{
    res.render('help',
    {
        title: "HELP PAGE",
        message: "HELP ME OBI WAANNNNNN",
        name: "Aniket Jain"
    })
})

app.get('/weather', (req,res) =>
{
    res.send
    ({
        forecast: 'It is wednesday',
        location: 'my dudes'
    })
})

app.get('/help/*', (req,res) =>
{
    res.render('error404',
    {
        title: "ERROR 404",
        message: "HELP VAALA MESSAGE",
        name: "Aniket Jain"
    })
})

app.get('*', (req,res) =>
{
    res.render('error404',  
    {
        title: "ERROR 404",
        message: "GENERIC MESSAGE FOR ERROR 404",
        name: "Aniket Jain"
    })
})

app.listen(3000, () =>
{
    console.log('server is up on port 3000.')
})