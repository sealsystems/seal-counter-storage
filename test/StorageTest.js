'use strict';

const assert = require('assertthat');
const nodeenv = require('nodeenv');
const uniq = require('lodash/uniq');
const uuid = require('uuidv4');

const mongo = require('@sealsystems/mongo');

const counterStorage = require('../lib/counterStorage');
const Storage = require('../lib/Storage');
let restore;

suite('Storage', () => {
  /* eslint-disable mocha/no-synchronous-tests */
  before(() => {
    restore = nodeenv('TLS_UNPROTECTED', 'world');
  });

  after(() => {
    restore();
  });
  /* eslint-enable mocha/no-synchronous-tests */

  test('is a function.', async () => {
    assert.that(Storage).is.ofType('function');
  });

  test('throws an error when database is missing.', async () => {
    assert
      .that(() => {
        /* eslint-disable no-new */
        new Storage();
        /* eslint-enable no-new */
      })
      .is.throwing('Database is missing.');
  });

  test('returns an object.', async () => {
    const storage = new Storage({
      collection() {}
    });

    assert.that(storage).is.ofType('object');
  });

  suite('getCounter', () => {
    const dbName = uuid();
    const url = `mongodb://localhost:27717/${dbName}`;

    let storage;

    suiteSetup(async () => {
      storage = await counterStorage.connect({ url });
    });

    suiteTeardown(async function() {
      this.timeout(10000);

      const db = await mongo.db(url, { connectionRetries: 1 });

      await db.dropDatabase();
    });

    test('is a function.', async () => {
      assert.that(storage.getCounter).is.ofType('function');
    });

    test('throws an error if the counter name is missing.', async () => {
      await assert
        .that(async () => {
          await storage.getCounter();
        })
        .is.throwingAsync('Counter name is missing.');
    });

    test('returns next ref number', async () => {
      const refNo = await storage.getCounter('gcTest');

      assert.that(refNo).is.not.null();
    });

    test('ref numbers are incremented by one per default', async () => {
      const refNo1 = await storage.getCounter('gcTest');
      const refNo2 = await storage.getCounter('gcTest');

      assert.that(refNo2).is.equalTo(refNo1 + 1);
    });

    test('ref numbers are incremented by given increment', async () => {
      const refNo1 = await storage.getCounter('gcTest');
      const refNo2 = await storage.getCounter('gcTest', 100);

      assert.that(refNo2).is.equalTo(refNo1 + 100);
    });

    test('get 10000 unique numbers', async function() {
      this.timeout(30 * 1000);

      const promises = [];

      for (let i = 0; i < 10000; i++) {
        promises.push(storage.getCounter('massCounter'));
      }

      const results = await Promise.all(promises);
      const distinct = uniq(results);

      assert.that(results.length).is.equalTo(10000);
      assert.that(results).is.equalTo(distinct);
    });
  });
});
