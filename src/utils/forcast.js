const request = require('request');

const forcast = (lat, long, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=2c18d8b7ed0ebe2d4b79650441c719ed&query=' +
    encodeURIComponent(lat) +
    ',' +
    encodeURIComponent(long) +
    '&units=f';

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect weather servies!', undefined);
    } else if (body.error)
      callback('Unable to find location.Try another search', undefined);
    else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. It is ' +
          body.current.temperature +
          ' far out but feels like ' +
          body.current.feelslike
      );
    }
  });
};

module.exports = forcast;
