'use strict';

const Promise = require('bluebird');
const Joi = require('joi');
const Moment = require('moment');

module.exports = {
  path: '/v1/jobs',
  method: 'POST',
  config: {
    tags: ['api'],
    description: 'Create a registration',

    validate: {
      payload: Joi.object({
        name: Joi.string().required().min(2).trim().label('Name'),
        uri: Joi.string().uri().required().trim().label('Uri'),
        isActive: Joi.bool().default(true).label('Active'),
        createdAt: Joi.date().default(Moment().utc().toDate()).label('Created At'),
        updatedAt: Joi.date().default(Moment().utc().toDate()).label('Updated At'),
        status: Joi.object({
          next: Joi.date().optional().label('Next Sync'),
          lastUpdated: Joi.date().optional().label('Last Updated'),
          statusCode: Joi.string().optional().label('Http Status Code'),
        }).default({})
      })
    },

    response: {
      schema: Joi.object()
    },

    handler: {
      async: Promise.coroutine(function* (request, reply) {
        const db = request.server.plugins.db.current;

        try {
          let job = request.payload;
          job.isActive = true;

          console.log(job);

          let result = yield Promise.promisifyAll(db.collection('jobs'))
                                    .saveAsync(job);
          return reply(result);
        } catch (e) {
          return reply(e);
        }
      })
    }
  }
};