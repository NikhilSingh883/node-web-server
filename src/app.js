const path = require('path');

const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();
const PORT = process.env.PORT || 3000;
// Define paths for Express config
const public = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlerbar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(public));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Nikhil',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Nikhil',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Weather',
    name: 'Nikhil',
    message: 'Nind aa rhe h',
  });
});
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forcast(latitude, longitude, (error, forcastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forcast: forcastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404.hbs', {
    title: '404',
    name: 'Nikhil',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404.hbs', {
    title: '404',
    name: 'Nikhil',
    errorMessage: 'Page not found',
  });
});

app.listen(PORT, () => {
  console.log('Server is up on port: ' + PORT);
});
