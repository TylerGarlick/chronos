'use strict';

const Promise = require('bluebird');
const Joi = require('joi');
const Boom = require('boom');
const Registrations = require('../specs/registrations');

module.exports = {
  path: '/v1/jobs',
  method: 'GET',
  config: {
    tags: ['api'],
    description: 'List of Registrations',

    response: {
      schema: Registrations
    },

    handler: {
      async: Promise.coroutine(function *(request, reply) {
        const db = request.server.plugins.db.current;
        try {
          let registrations = yield Promise.promisifyAll(db.collection('jobs')).findAsync();
          return reply(registrations);
        } catch (e) {
          return reply(e);
        }
      })
    }
  }
};