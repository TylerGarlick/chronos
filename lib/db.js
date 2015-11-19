'use strict';

const mongojs = require('mongojs');
const uri = process.env.CHRONOS_MONGO_URI || 'chronos';
console.log(uri);

module.exports = mongojs(uri);