'use strict';

const assert = require('assertthat');
const mongoHost = require('docker-host')().host;

const counterStorage = require('../lib/counterStorage');
const Storage = require('../lib/Storage');

suite('counterStorage', () => {
  test('is an object.', (done) => {
    assert.that(counterStorage).is.ofType('object');
    done();
  });

  suite('connect', () => {
    test('is a function.', (done) => {
      assert.that(counterStorage.connect).is.ofType('function');
      done();
    });

    test('throws an error when options are missing.', (done) => {
      assert.that(() => {
        counterStorage.connect();
      }).is.throwing('Options are missing.');
      done();
    });

    test('throws an error when url is missing.', (done) => {
      assert.that(() => {
        counterStorage.connect({}, () => {});
      }).is.throwing('Url is missing.');
      done();
    });

    test('throws an error when the callback is missing.', (done) => {
      assert.that(() => {
        counterStorage.connect({ url: `mongodb://${mongoHost}/testdb` });
      }).is.throwing('Callback is missing.');
      done();
    });

    test('calls the callback when a connection could be established.', (done) => {
      counterStorage.connect({ url: `mongodb://${mongoHost}/testdb` }, (err, storage) => {
        assert.that(err).is.null();
        assert.that(storage).is.instanceOf(Storage);
        done();
      });
    });
  });
});
