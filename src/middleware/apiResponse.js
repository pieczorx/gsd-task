const express = require('express')
const router = express.Router()
const {errors} = require('./../config');

router.use((req, res, next) => {
  const sendData = (data) => {
    // res.status(201);
    res.json({
      success: true,
      data
    })
  }

  const sendError = (errorCode) => {
    const error = errors[errorCode] || errors['internalServerError'];
    res.status(error.statusCode);
    res.json({
      success: false,
      error: {
        code: errors[errorCode] ? errorCode : 'internalServerError',
        message: error.message
      }
    })
  }

  const send404 = () => {
    sendError('notFound')
  }

  res.apiResponse = {
    sendData,
    send404,
    sendError
  }

  next();
})

module.exports = router;
