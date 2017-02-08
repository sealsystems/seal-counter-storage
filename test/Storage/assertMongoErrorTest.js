'use strict';

const assert = require('assertthat');

const assertMongoError = require('../../lib/Storage/assertMongoError');

suite('assertMongoError', () => {
  test('is a function', (done) => {
    assert.that(assertMongoError).is.ofType('function');
    done();
  });

  test('throws mongo errors', (done) => {
    const myError = new Error('buhuhu');

    myError.name = 'MongoError';
    assert.that(() => {
      assertMongoError(myError);
    }).is.throwing('buhuhu');
    done();
  });

  test('does not throw a non mongo error', (done) => {
    const myError = new Error('buhuhu');

    assert.that(() => {
      assertMongoError(myError);
    }).is.not.throwing();
    done();
  });
});
