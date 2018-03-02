'use strict';

const assert = require('assertthat');
const { host } = require('docker-host')();

const counterStorage = require('../lib/counterStorage');
const Storage = require('../lib/Storage');

suite('counterStorage', () => {
  test('is an object.', async () => {
    assert.that(counterStorage).is.ofType('object');
  });

  suite('connect', () => {
    test('is a function.', async () => {
      assert.that(counterStorage.connect).is.ofType('function');
    });

    test('throws an error when url is missing.', async () => {
      await assert.that(async () => {
        await counterStorage.connect({});
      }).is.throwingAsync('Url is missing.');
    });

    test('returns a storage instance when a connection could be established.', async () => {
      const storage = await counterStorage.connect({ url: `mongodb://${host}/testdb` });

      assert.that(storage).is.instanceOf(Storage);
    });
  });
});
