const express = require('express')
const app = express();

const apiPort = process.env.PORT || 4000;

//304 error in cache workaround
app.disable('etag');

//All routes are located inside /routes folder
app.use(require('./routes'))
const start = async () => {
  console.log('Starting GSD Software...')
  await new Promise((resolve, reject) => {
    app.listen(apiPort, () => {
      resolve()
    })
  })
  console.log(`Started and listening on port ${apiPort} :D`)
}



start();
