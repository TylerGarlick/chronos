'use strict';

const Promise = require('bluebird');

module.exports = {
  path: '/v1/registrations',
  method: 'DELETE',
  config: {
    tags: ['api'],
    description: 'Delete a registration',

    // validate: {
    //   payload: { }
    // },

    // response: {
    //  schema:
    // },

    handler: {
      async: Promise.coroutine(function* (request, reply) {
        try {
          return reply([]);
        } catch (e) {
          return reply(e);
        }
      })
    }
  }
};