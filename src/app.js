const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// app.com
// app.com/help
// app.com/about
// app.com/weather

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Coja'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Coja'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'Help Message',
        title: 'Help',
        name: 'Coja'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error){
            return res.send({ error })
        } 
 
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })

        }) 
    })

})

app.get('/products',(req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        message: 'Help article',
        name: 'Coja'
    })
})

app.get('*', (reg,res)=>{
    res.render('404',{
        title: '404',
        message: 'Page not found',
        name: 'Coja'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
}) 