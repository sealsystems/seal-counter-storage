# @sealsystems/counter-storage

[![CircleCI](https://circleci.com/gh/sealsystems/seal-counter-storage.svg?style=svg)](https://circleci.com/gh/sealsystems/seal-counter-storage)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/nt7hj2kbbd6n2sm9?svg=true)](https://ci.appveyor.com/project/Plossys/seal-counter-storage)

@sealsystems/counter-storage manages handling of counters persisted in a MongoDB.

## Installation

```shell
$ npm install @sealsystems/counter-storage
```

## Quick start

First you need to add a reference to @sealsystems/counter-storage within your application:

```javascript
const counterStorage = require('@sealsystems/counter-storage');
```

Then you can connect to a MongoDB. For that call the `connect` function and provide the database's connection string using the `url` property:

```javascript
const storage = await counterStorage.connect({
  url: 'mongodb://localhost:27017'
});
```

Optionally, you may also specify the number of connection retries:

```javascript
const storage = await counterStorage.connect({
  url: 'mongodb://localhost:27017',
  connectionRetries: 10
});
```

## Get next counter value

To get the next counter value call the `getCounter` function and provide its name. Optionally you can provide the increment as second argument, default increment is `1`:

```javascript
const newCounterValue = await storage.getCounter('hugo');
```

With increment:

```javascript
const newCounterValue = await storage.getCounter('hugo', 100);
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ bot
```
