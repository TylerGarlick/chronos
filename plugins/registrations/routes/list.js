'use strict';

const Promise = require('bluebird');
const Joi = require('joi');
const Boom = require('boom');
const Registrations = require('../specs/registrations');

module.exports = {
  path: '/v1/registrations',
  method: 'GET',
  config: {
    tags: ['api'],
    description: 'List of Registrations',

    response: {
      schema: Registrations
    },

    handler: {
      async: Promise.coroutine(function *(request, reply) {

        const r = request.server.plugins.db.r;

        let results = yield r.table('registrations').run();
        return reply(results);
      })
    }
  }
};