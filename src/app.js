var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var v1Routes = require('./routes/v1/v1Routes');
var app = express();
var helmet = require('helmet')
var { errorHandler, notFoundHandler } = require('express-api-error-handler');


//https://blog.jscrambler.com/setting-up-5-useful-middlewares-for-an-express-api/
app.use(cors())
app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

//Routes
app.get('/favicon.ico', (req, res) => res.status(204)); //return No Content
app.use('/api/v1', v1Routes);

app.use(errorHandler({
  log: ({ err, req, res, body }) => {
    if (err.status === 404) {
      console.error(`${err.message} ${body.status} ${req.method} ${req.url}`);
    } else {
      console.error(`${err.message} | ${body.status} | ${req.method} | ${req.url}`);
    }
  },
  hideProdErrors: true, // hide 5xx errors if NODE_ENV is "production" (default: false)
}));

app.use(notFoundHandler({
  log: ({ req, res }) => {
    console.error(`not found (404): ${req.method} ${req.url}`);
  },
}));

module.exports = app;