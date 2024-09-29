const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).send('Latitude and Longitude are required');
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                lat,
                lon,
                appid: process.env.OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching weather data');
        console.log(error)
    }
});

app.listen(port, () => {
    console.log(`Weather API listening at http://localhost:${port}`);
});