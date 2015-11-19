'use strict';

const Promise = require('bluebird');
const expect = require('code').expect;
const DbSetup = require('../../../plugins/db/setup');

describe('Db Setup', () => {

  describe('#exists(collection, name)', () => {

    it('has the database', () => {
      expect(DbSetup.exists(['bogus', 'test'], 'bogus')).to.be.true();
    });

    it(`it doesn't have the database`, () => {
      expect(DbSetup.exists(['bogus', 'test'], 'zz')).to.be.false();
    });

  });

  describe('#setup(r, db, table)', () => {

    it('creates a new database', (done) => {
      let dbs = ['bogus', 'test'];
      let tables = ['bogus-table', 'test-table'];
      let r = {

        dbList: () => {
          return {
            run: () => {
              return Promise.resolve(dbs);
            }
          }
        },

        tableList: () => {
          return {
            run: () => {
              return Promise.resolve(tables);
            }
          }
        },
        dbCreate: (name) => {
          dbs.push(name);
          return Promise.resolve(name);
        },

        tableCreate: (name) => {
          tables.push(name);
          return Promise.resolve(name);
        }

      };

      DbSetup.setup(r, 'chronos-tests', 'jobs')
        .then((result) => {
          console.log(result);
          done();
        })
        .catch(done);

    });

  });

});