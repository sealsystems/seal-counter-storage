'use strict';

const assert = require('assertthat');
const nodeenv = require('nodeenv');

const counterStorage = require('../lib/counterStorage');
const Storage = require('../lib/Storage');
let restore;

suite('counterStorage', () => {
  /* eslint-disable mocha/no-synchronous-tests */
  before(() => {
    restore = nodeenv('TLS_UNPROTECTED', 'world');
  });

  after(() => {
    restore();
  });
  /* eslint-enable mocha/no-synchronous-tests */

  test('is an object.', async () => {
    assert.that(counterStorage).is.ofType('object');
  });

  suite('connect', () => {
    test('is a function.', async () => {
      assert.that(counterStorage.connect).is.ofType('function');
    });

    test('throws an error when url is missing.', async () => {
      await assert
        .that(async () => {
          await counterStorage.connect({});
        })
        .is.throwingAsync('Url is missing.');
    });

    test('returns a storage instance when a connection could be established.', async () => {
      const storage = await counterStorage.connect({ url: `mongodb://localhost:27717/testdb` });

      assert.that(storage).is.instanceOf(Storage);
    });
  });
});
