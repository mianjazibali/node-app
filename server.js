const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const db = require('./app/models');

global.db = db;

const routes = require('./routes');

const server = express();

server.use(bodyParser.json());
server.use(logger('dev'));

server.use('/api', routes);

module.exports = server;
