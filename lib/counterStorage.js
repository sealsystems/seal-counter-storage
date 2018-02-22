'use strict';

const mongo = require('@sealsystems/mongo');

const Storage = require('./Storage');

const counterStorage = {
  async connect ({ url, connectionRetries = 10 }) {
    if (!url) {
      throw new Error('Url is missing.');
    }

    const db = await mongo.db(url, { connectionRetries });
    const storage = new Storage(db);

    return storage;
  }
};

module.exports = counterStorage;
