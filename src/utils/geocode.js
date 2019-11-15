const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5kcmV3ZXllc21hbiIsImEiOiJjazJ0cDI4YXkxZHk0M2JuOGZldHpnYmFxIn0.IqrKFM8a5uVdjItvVEhfpw&limit=1`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location services!');
        } else if (body.features.length === 0) {
            callback('Unable to find location, please check your search and try again');
        } else {
            callback(undefined, {
                long: body.features[0].center[1],
                lat: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode;