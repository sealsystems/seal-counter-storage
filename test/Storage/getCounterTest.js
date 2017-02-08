'use strict';

const assert = require('assertthat');
const async = require('async');
const mongoHost = require('docker-host')().host;
const uuid = require('uuidv4');

const mongo = require('seal-mongo');

const counterStorage = require('../../lib/counterStorage');

suite('getCounter', () => {
  let storage;
  const dbName = uuid();
  const dbUrl = `mongodb://${mongoHost}/${dbName}`;

  suiteSetup((done) => {
    counterStorage.connect({ url: dbUrl }, (err, instance) => {
      if (err) {
        return done(err);
      }
      storage = instance;
      done();
    });
  });

  suiteTeardown(function (done) {
    this.timeout(10000);
    mongo.db(dbUrl, {
      connectionRetries: 1
    }, (errDb, db) => {
      assert.that(errDb).is.null();
      db.dropDatabase(done);
    });
  });

  test('is a function.', (done) => {
    assert.that(storage.getCounter).is.ofType('function');
    done();
  });

  test('throws an error if the counter name is missing.', (done) => {
    assert.that(() => {
      storage.getCounter();
    }).is.throwing('Counter name is missing.');
    done();
  });

  test('throws an error if the callback is missing.', (done) => {
    assert.that(() => {
      storage.getCounter('cc');
    }).is.throwing('Callback is missing.');
    done();
  });

  test('throws an error if the increment is missing.', (done) => {
    assert.that(() => {
      storage.getCounter('cc', null, () => {});
    }).is.throwing('Increment is missing.');
    done();
  });

  test('returns next ref number', (done) => {
    storage.getCounter('gcTest', (errSetStatus, refNo) => {
      assert.that(errSetStatus).is.null();
      assert.that(refNo).is.not.null();
      done();
    });
  });

  test('ref numbers are incremented by one per default', (done) => {
    storage.getCounter('gcTest', (errSetStatus1, refNo1) => {
      assert.that(errSetStatus1).is.null();
      storage.getCounter('gcTest', (errSetStatus2, refNo2) => {
        assert.that(errSetStatus2).is.null();
        assert.that(refNo2).is.equalTo(refNo1 + 1);
        done();
      });
    });
  });

  test('ref numbers are incremented by given increment', (done) => {
    storage.getCounter('gcTest', (errSetStatus1, refNo1) => {
      assert.that(errSetStatus1).is.null();
      storage.getCounter('gcTest', 100, (errSetStatus2, refNo2) => {
        assert.that(errSetStatus2).is.null();
        assert.that(refNo2).is.equalTo(refNo1 + 100);
        done();
      });
    });
  });

  test('get 10000 unique numbers', function (done) {
    const cache = {};

    this.timeout(30000);

    async.timesLimit(10000, 500, (n, next) => {
      storage.getCounter('massCounter', (errNextNo, nextNo) => {
        assert.that(errNextNo).is.null();
        assert.that(cache[nextNo]).is.undefined();
        cache[nextNo] = n;
        next(null);
      });
    }, (errMongo) => {
      assert.that(errMongo).is.null();
      done();
    });
  });
});
