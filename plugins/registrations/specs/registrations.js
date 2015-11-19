'use strict';

const Joi = require('joi');
const Registration = require('./registration');

module.exports = Joi.array().items(Registration);