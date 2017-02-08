'use strict';

const assertMongoError = require('./assertMongoError');

const getCounter = function (counterName, increment, callback) {
  if (!counterName) {
    throw new Error('Counter name is missing.');
  }
  if (!callback) {
    callback = increment;
    increment = 1;
  }
  if (!increment) {
    throw new Error('Increment is missing.');
  }
  if (!callback) {
    throw new Error('Callback is missing.');
  }

  this.collections.counter.findOneAndUpdate({
    _id: counterName
  }, {
    $inc: { current: increment }
  }, {
    returnOriginal: false,
    upsert: true
  }, (errFind, result) => {
    assertMongoError(errFind);
    if (errFind) {
      return callback(errFind);
    }
    callback(null, result.value.current);
  });
};

module.exports = getCounter;
