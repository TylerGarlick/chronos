'use strict';

const Promise = require('bluebird');
const Joi = require('joi');

module.exports = {
  path: '/v1/registrations',
  method: 'POST',
  config: {
    tags: ['api'],
    description: 'Create a registration',

     validate: {
       payload: Joi.object({
         name: Joi.string().required().min(2).trim().label('Name'),
         uri: Joi.string().uri().required().trim().label('Uri')
       })
     },

     response: {
      schema: Joi.object()
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