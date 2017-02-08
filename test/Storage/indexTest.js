'use strict';

const assert = require('assertthat');

const Storage = require('../../lib/Storage');

suite('Storage', () => {
  test('is a function.', (done) => {
    assert.that(Storage).is.ofType('function');
    done();
  });

  test('throws an error when database is missing.', (done) => {
    assert.that(() => {
      /* eslint-disable no-new */
      new Storage();
      /* eslint-enable no-new */
    }).is.throwing('Database is missing.');
    done();
  });

  test('returns an object.', (done) => {
    const storage = new Storage({
      collection () {}
    });

    assert.that(storage).is.ofType('object');
    done();
  });
});
