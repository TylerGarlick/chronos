'use strict';

const RethinkDB = require('rethinkdbdash');
const Hoek = require('hoek');
const DbSetup = require('./setup');

const plugin = (server, options, next) => {

  const config = Hoek.applyToDefaults({ discovery: true, tables: ['jobs', 'registrations'] }, options);
  const r = RethinkDB(config);

  server.expose('r', r);

  DbSetup.setup(r, config.db, config.tables)
         .then(next)
         .catch(next);

  return next();
};

plugin.attributes = require('./package');

module.exports = plugin;
