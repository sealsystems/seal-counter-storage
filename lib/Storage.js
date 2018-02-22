'use strict';

class Storage {
  constructor (database) {
    if (!database) {
      throw new Error('Database is missing.');
    }

    this.collections = {
      counter: database.collection('counter')
    };
  }

  async getCounter (counterName, increment = 1) {
    if (!counterName) {
      throw new Error('Counter name is missing.');
    }

    const result = await this.collections.counter.findOneAndUpdate(
      { _id: counterName },
      { $inc: { current: increment } },
      { returnOriginal: false, upsert: true }
    );

    return result.value.current;
  }
}

module.exports = Storage;
