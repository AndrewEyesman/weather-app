const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Iseman'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Iseman'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Andrew Iseman',
        message: 'I\'m here to help you.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    geocode(req.query.address, (err, {lat, long, location} = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }

        forecast(lat, long, (err, data) => {
            if (err) {
                return res.send({
                    error: err
                })
            }

            res.send({
                address: req.query.address,
                location,
                forecast: data
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term.'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})