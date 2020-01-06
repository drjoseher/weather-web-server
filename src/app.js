const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000
// Defnir paths para configuracion de express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setear handlebars engine y el path de vistas
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Seter directorio estatico
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Drjoseher'
    })

})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Drjoseher'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help Page',
        name: "Drjoseher",
        helpText: 'This is some helpful text'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You must define an address"
        })
    }

    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error){
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                longitude: longitude,
                latitude:latitude
            })

        })
    })
})

app.get('/products', (req, res) =>{
    if (!req.query.search){
        return res.send({
            error: "You must define a query search"
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Drjoseher",
        errorMessage:'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Drjoseher",
        errorMessage:'My 404 page'
    })
})

app.listen(port, () => {
    console.log('Server is uo on port ' + port)
})