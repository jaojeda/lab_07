require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');

// Application Setup
// - make an express app!
const app = express();
// - get the port on which to run the server
const PORT = process.env.PORT;

const mapsAPI = require('./lib/geocode-api');

const weatherAPI = require('./lib/weather-api');
// - enable CORS
app.use(cors());

app.get('/location', (request, response) => {
    const search = request.query.search;
    mapsAPI.getLocation(search)
        .then(location => {
            console.log(response);
            response.json(location);
        })

        .catch(err => {
            response.status(500).json({
                error: err.message || err
            });
        });

});

app.get('/weather', (request, response) => {
    const latitude = request.query.latitude;
    const longitude = request.query.longitude;

    weatherAPI.getForecast(latitude, longitude)
        .then(forecast => {
            response.json(forecast);
        })
        .catch(err => {
            response.status(500).json({
                error: err.message || err
            });
        });
});



app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});