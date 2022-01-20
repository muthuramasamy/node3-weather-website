//express
const express = require('express')
const path = require('path')
const { features } = require('process')
const hbs = require('hbs')
const geocode = require('./utils/geoCode.js')
const forecast = require('./utils/forecast.js')


console.log(__dirname)  // gives directory name
console.log(__filename) //gives filename
console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for Express to config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views Location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:' Weather App',
        name: 'Muthu Thirupathi'
    } )
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:' About Muthu Weather App',
        name: 'Muthu Sundaram Thirupathi'
    } )
})

app.get('/help', (req, res) => {
        res.render('help', {
            content: 'help',
            name: 'Muthu'
        })
    })
 //HTML response
// //app.get('', (req, res) => {
//     res.send('<h1>WELCOME to EXPRESS</h1>')})

// //json response
// //app.get('/help', (req, res) => {
//     res.send({
//         name:'Muthu',
//         age:23
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('Welcome to about us page')
// } )



//endpoints from frontend
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

    


app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        return res.send({
            error:"You must provide a Search term"
        })
    } 
    console.log(req.query)           //get the query from url from frontend
   res.send({
        products:[]
    })
})
//
//app.com
//app.com/help or //app.com/about


app.get('/help/*', (req, res) => {
    res.render('404', {

        title:'404',
        name : 'Muthu',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {

        title:'404',
        name : 'Muthu',
        errorMessage: 'Page Not Found'
    })
})//for getting error page handling



app.listen(3000, ()=> 
{
    console.log('Server is up om port 3000. ')
}) //this starts the server,3000 is a default port
