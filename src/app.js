const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const { getCurrentInvoke } = require('@vendia/serverless-express')
const ejs = require('ejs').__express
const app = express()
const router = express.Router()
const logger = require('morgan');


app.use(logger('dev'));
app.set('view engine', 'ejs')
app.engine('.ejs', ejs)

router.use(compression())
router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// NOTE: tests can't find the views directory without this
app.set('views', path.join(__dirname, 'views'))

router.get('/', (req, res) => {
  const currentInvoke = getCurrentInvoke();
  res.render('index', {
    apiData: JSON.stringify(currentInvoke)
  })
})



app.use('/', router)
module.exports = app
