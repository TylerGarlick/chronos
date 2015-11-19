'use strict';

const db = require('../../lib/db');

let plugin = (server, options, next) => {
  server.expose('current', db);
  next();
};

plugin.attributes = require('./package');

module.exports = plugin;