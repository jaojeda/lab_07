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

const weatherData = require('./data/darksky.json');
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


app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});