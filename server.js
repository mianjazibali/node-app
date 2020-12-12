const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const db = require('./app/models');

global.db = db;

const routes = require('./config/routes');

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));

routes(app);

module.exports = app;
