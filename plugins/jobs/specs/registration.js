'use strict';

const Joi = require('joi');
const Moment = require('moment');


module.exports = Joi.object().keys({
  _id: Joi.alternatives().try(Joi.object(), Joi.string()).label('Id'),
  name: Joi.string().required().min(2).trim().label('Name'),
  uri: Joi.string().uri().required().trim().label('Uri'),
  isActive: Joi.bool().default(true).label('Active'),
  createdAt: Joi.date().default(Moment().utc().toDate()).label('Created At'),
  updatedAt: Joi.date().default(Moment().utc().toDate()).label('Updated At'),
  status: Joi.object({
    lastUpdated: Joi.date().optional().label('Last Updated'),
    statusCode: Joi.string().optional().label('Http Status Code'),
  })
});
