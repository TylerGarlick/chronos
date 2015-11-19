'use strict';

const mongojs = require('mongojs');
const uri = process.env.CHRONOS_MONGO_URI || 'localhost/chronos';

module.exports = mongojs(uri, ['jobs'], { authMechanism: 'ScramSHA1' });