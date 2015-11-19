'use strict';

module.exports = () => {
  return {
    files: [
      'lib/**/*',
      'plugins/**/*',
      'test/**/*',
      { pattern: 'test/**/*.tests.js', ignore: true }
    ],
    tests: [
      'test/**/*.tests.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    }
  }
};
