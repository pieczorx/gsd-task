const express = require('express')
const router = express.Router()

router.use(require('./../middleware/apiResponse'))
router.use('/weather', require('./weather'))
router.use((req, res) => {
  res.apiResponse.send404();
})

router.use((err, req, res, next) => {
  res.apiResponse.sendError(err.message);
})

module.exports = router;
