const express = require('express')
const router = express.Router()
const asyncExpress = require('./../../modules/asyncExpress')
const axios = require('axios')
const MetaWeatherDay = require('./../../models/MetaWeatherDay')
const {allowedCities} = require('./../../config')
const validateEmail = require('./../../modules/validateEmail')

router.get('/', asyncExpress(async (req, res, next) => {
  if(!req.query.city || !req.query.email) {
    throw new Error('incompleteFields')
  }
  
  //Check if city is in allowed cities list
  if(!allowedCities.map(city => city.toLowerCase()).includes(req.query.city.toLowerCase())) {
    throw new Error('cityNotInList')
  }


  //Check if given e-mail is valid
  if(!validateEmail(req.query.email)) {
    throw new Error('emailInvalid')
  }


  //Search for city
  const resSearchForCity = await axios.get(`https://www.metaweather.com/api/location/search/?query=${encodeURIComponent(req.query.city)}`);
  const locationId = resSearchForCity.data[0].woeid

  //Get weather
  const resWeather = await axios.get(`https://www.metaweather.com/api/location/${locationId}/`);

  //Map weather data to look nice & clean
  const weatherForUpcomingDays = resWeather.data.consolidated_weather.map(e => {
    return new MetaWeatherDay(e)
  }).map(metaWeatherDay => {
    return metaWeatherDay.publicData
  })

  //Send it to client
  res.apiResponse.sendData({
    weatherForUpcomingDays
  });


}))

module.exports = router
