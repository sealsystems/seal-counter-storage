# seal-counter-storage

[![CircleCI](https://circleci.com/gh/sealsystems/seal-counter-storage.svg?style=svg)](https://circleci.com/gh/sealsystems/seal-counter-storage)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/nt7hj2kbbd6n2sm9?svg=true)](https://ci.appveyor.com/project/Plossys/seal-counter-storage)

seal-counter-storage manages handling of counters persisted in a MongoDB.

## Installation

```bash
$ npm install seal-counter-storage
```

## Quick start

First you need to add a reference to seal-counter-storage within your application.

```javascript
var counterStorage = require('seal-counter-storage');
```

Then you can connect to a MongoDB. For that call the `connect` function and provide the database's connection string using the `url` property:

```javascript
counterStorage.connect({ url: 'mongodb://localhost:27017' }, function (err, storage) {
  // ...
})
```

Optionally, you may also specify the number of connection retries:

```javascript
counterStorage.connect({
  url: 'mongodb://localhost:27017',
  connectionRetries: 10
}, function (err, storage) {
  // ...
})
```

## Get next counter value

To get the next counter value call the `getCounter` function and provide at least its name and a callback.
Optionally you can provide the increment as second argument, default increment is `1`.

```javascript
storage.getCounter('hugo', function (err, newCounterValue) {
  // ...
});
```

With increment:

```javascript
storage.getCounter('hugo', 100, function (err, newCounterValue) {
  // ...
});
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```bash
$ bot
```
