'use strict';

const Storage = function (database) {
  if (!database) {
    throw new Error('Database is missing.');
  }

  this.collections = {
    counter: database.collection('counter')
  };
};

Storage.prototype.getCounter = require('./getCounter');

module.exports = Storage;
