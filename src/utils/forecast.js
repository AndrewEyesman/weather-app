const request = require('request');

const forecast = (long, lat, callback) => {
    const key = '724f51072c9e39bdbe53df73f163dcdd';
    const url = `https://api.darksky.net/forecast/${key}/${lat},${long}`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather services, check your internet connection.')
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            const forecastStr = `It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`;
            callback(undefined, `${body.daily.data[0].summary} ${forecastStr}`);
        }
    })
}

module.exports = forecast;