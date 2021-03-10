const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3003

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')// view engine olarak hbs i kullandık isimle eşlesen varsa renderlıyor
app.set('views', viewsPath) //views ismini bekler onu değiştirmek için templates ismini joinledik
hbs.registerPartials(partialsPath)//partialları register ettik

// Setup static directory to serve
app.use(express.static(publicDirectoryPath, {
    extensions: ["html"]
}))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Alper Celebi'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Alpesr Celebi'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        helpText: 'Some help text',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide addresss'
        })
    }

    geocode(req.query.address, (error,{latitude, longtitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
        console.log(res);
    })

   
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Alper Celebi' 
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: 404, 
        errorMessage: 'Page not found',
        name: 'Alper Celebi'
    })
})

app.listen(port, () => {
    console.log('server is up on port '+ port)
})