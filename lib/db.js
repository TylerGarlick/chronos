'use strict';

const mongojs = require('mongojs');
const uri = process.env.CHRONOS_MONGO_URI || 'chronos';

module.exports = mongojs(uri);