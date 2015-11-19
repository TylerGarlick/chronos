'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  id: Joi.string().optional().label('Id'),
  name: Joi.string().required().min(2).trim().label('Name'),
  isActive: Joi.bool().default(true).label('Active')
});