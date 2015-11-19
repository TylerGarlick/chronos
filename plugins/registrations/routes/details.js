'use strict';

const Promise = require('bluebird');

const Registration = require('../specs/registration');

module.exports = {
  path: '/v1/registrations/{id}',
  method: 'GET',
  config: {
    tags: ['api'],
    description: 'Registration Details',

     response: {
      schema: Registration
     },

    handler: {
      async: Promise.coroutine(function* (request, reply) {
        try {
          return reply({});
        } catch (e) {
          return reply(e);
        }
      })
    }
  }
};