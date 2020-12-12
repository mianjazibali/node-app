const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const db = require('./app/models');

global.db = db;

const routes = require('./config/routes');

const app = express();

routes(app);

app.use(bodyParser.json());
app.use(logger('dev'));

module.exports = app;
