'use strict';

let plugin = (server, options, next) => {
  next();
};

plugin.attributes = require('./package');

module.exports = plugin;