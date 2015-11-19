'use strict';

const Promise = require('bluebird');
const Joi = require('joi');
const ObjectId = require('mongojs').ObjectId;

module.exports = {
  path: '/v1/jobs/{id}',
  method: 'DELETE',
  config: {
    tags: ['api'],
    description: 'Delete a registration',

    validate: {
      params: {
        id: Joi.string().trim().label('Id')
      }
    },

    response: {
      schema: Joi.object()
    },

    handler: {
      async: Promise.coroutine(function* (request, reply) {
        const db = request.server.plugins.db.current;
        const id = ObjectId(request.params.id);
        try {
          let result = yield Promise.promisifyAll(db.collection('jobs'))
                                    .removeAsync({ _id: id }, true);
          console.log(result);
          return reply({ deleted: result.ok > 0 });
        } catch (e) {
          return reply(e);
        }
      })
    }
  }
};