'use strict';

const mongo = require('seal-mongo');

const Storage = require('./Storage');

const counterStorage = {};

counterStorage.connect = function (options, callback) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.url) {
    throw new Error('Url is missing.');
  }
  if (!callback) {
    throw new Error('Callback is missing.');
  }

  mongo.db(options.url, {
    connectionRetries: options.connectionRetries || 10
  }, (errDb, db) => {
    if (errDb) {
      return callback(errDb);
    }

    const storage = new Storage(db);

    callback(null, storage);
  });
};

module.exports = counterStorage;
