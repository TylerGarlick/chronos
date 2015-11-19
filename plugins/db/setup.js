'use strict';

const Promise = require('bluebird');

const exists = (collection, name) => {
  return collection.indexOf(name) > -1;
};

module.exports = {

  exists,

  setup: Promise.coroutine(function *(r, db, tables) {

    let dbs = yield r.dbList().run();
    if (!exists(dbs, db)) {
      yield r.dbCreate(db);
    }

    let existingTables = yield r.tableList().run();

    for (let table of tables) {
      if (!exists(existingTables, table)) {
        yield r.tableCreate(table);
      }
    }

  })

};