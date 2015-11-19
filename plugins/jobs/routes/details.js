'use strict';

const Promise = require('bluebird');
const ObjectId = require('mongojs').ObjectId;
const Registration = require('../specs/registration');

module.exports = {
  path: '/v1/jobs/{id}',
  method: 'GET',
  config: {
    tags: ['api'],
    description: 'Registration Details',

    response: {
      schema: Registration
    },

    handler: {
      async: Promise.coroutine(function* (request, reply) {
        const db = request.server.plugins.db.current;

        try {
          let id = ObjectId(request.params.id);
          let registration = yield Promise.promisifyAll(db.collection('jobs'))
                                          .findOneAsync({ _id: id });
          console.log(registration);
          return reply(registration);
        } catch (e) {
          return reply(e);
        }
      })
    }
  }
};