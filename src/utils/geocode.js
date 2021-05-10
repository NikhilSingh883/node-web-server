const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiZm9ybmF4IiwiYSI6ImNrb2czaWNyNzBhN2cyb295NHhsZjJzcmoifQ.DV1-Sluww6Wqt738BcJd5A&limit=1';
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect location servies!', undefined);
    } else if (body.features.length === 0)
      callback('Unable to find location.Try another search', undefined);
    else {
      const lat = body.features[0].center[1];
      const long = body.features[0].center[0];
      const placeName = body.features[0].place_name;

      callback(undefined, {
        latitude: lat,
        longitude: long,
        location: placeName,
      });
    }
  });
};

module.exports = geocode;
