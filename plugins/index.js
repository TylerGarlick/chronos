'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.route({
  path: '/',
  method: 'GET',
  handler: (req, reply) => {
    reply.redirect('/docs');
  }
});

server.register([
  require('blipp'),
  require('inert'),
  require('vision'),
  require('tv'),
  require('hapi-async-handler'),
  {
    register: require('hapi-router'),
    options: { routes: '**/routes/*.js' }
  },
  {
    register: require('good'),
    options: {
      requestHeaders: true,
      reporters: [
        {
          reporter: 'good-console',
          events: { response: '*', log: '*', error: '*' }
        }
      ]
    }
  },
  {
    register: require('hapi-swaggered'),
    options: {
      tags: {},
      info: {
        title: 'Chronos API',
        description: 'Scheduled jobs',
        version: require('../package').version
      },
      cors: true
    }
  },
  {
    register: require('hapi-swaggered-ui'),
    options: {
      title: 'Chronos API',
      path: '/docs',
      swaggerOptions: { docExpansion: 'list' }
    }
  },
  require('./jobs'),
  require('./db')
], err => {
  if (err) throw err;

  server.start(() => {
    console.log(`Server started: ${server.info.uri}`);
  });
});

module.exports = server;