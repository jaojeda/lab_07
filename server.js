require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');

// Application Setup
// - make an express app!
const app = express();
// - get the port on which to run the server
const PORT = process.env.PORT;

const { getLocation } = require('./lib/geocode-api');
console.log(getLocation);
const weatherData = require('./data/darksky.json');
// - enable CORS
app.use(cors());

app.get('/location', (request, response) => {
    try {
        const location = request.query.location;
        const result = getLatLng(location);
        response.status(200).json(result);


    }

    catch(err) {
        // TODO: make an object and send via .json...
        response.status(500).send('Sorry something went wrong, please try again');
    }

});

app.get('/weather', (request, response) => {
    try {
        const weather = request.query.weather;
        const result = getForecast(weather);
        response.status(200).json(result);
    }

    catch(err) {
        // TODO: make an object and send via .json...
        response.status(500).send('Sorry something went wrong, please try again');
    }

});

function getForecast() {

    const eightDayForecast = weatherData.daily.data.map(dailyForecast => {
        return {
            forecast: dailyForecast.summary,
            time: dailyForecast.time * 1000
        };
    }); 
    return eightDayForecast;
}

function getLatLng() {
    // ignore location for now, return hard-coded file
    // api call will go here

    return toLocation(geoData);
}

function toLocation() {
    const firstResult = geoData.results[0];
    const geometry = firstResult.geometry;
    
    return {
        search_query: 'Alchemy',
        formatted_query: firstResult.formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
    };
}

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});