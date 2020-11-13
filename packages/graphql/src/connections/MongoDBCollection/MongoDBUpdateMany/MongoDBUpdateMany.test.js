/*
  Copyright 2020 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import MongoDBUpdateMany from './MongoDBUpdateMany';
import populateTestMongoDb from '../../../test/populateTestMongoDb';
import { ConfigurationError, RequestError } from '../../../context/errors';
import testSchema from '../../../test/testSchema';

const { resolver, schema } = MongoDBUpdateMany;

const databaseUri = process.env.MONGO_URL;
const databaseName = 'test';
const collection = 'updateMany';
const documents = [
  { _id: 'updateMany', v: 'before' },
  { _id: 'updateMany_1', v: 'before' },
  { _id: 'updateMany_2', v: 'before' },
  { _id: 'updateMany_3', v: 'before' },
  { _id: 'updateMany_4', v: 'before', f: 'updateMany' },
  { _id: 'updateMany_5', v: 'before', f: 'updateMany' },
  { _id: 'updateMany_6', v: 'before', f: 'updateMany' },
];

const context = { ConfigurationError, RequestError };

beforeAll(() => {
  return populateTestMongoDb({ collection, documents });
});

test('updateMany - Single Document', async () => {
  const request = {
    filter: { _id: 'updateMany' },
    update: { $set: { v: 'after' } },
  };
  const connection = {
    databaseUri,
    databaseName,
    collection,
    write: true,
  };
  const res = await resolver({ request, connection, context });
  expect(res).toEqual({
    modifiedCount: 1,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 1,
  });
});

test('updateMany - Multiple Documents', async () => {
  const request = {
    filter: { _id: { $in: ['updateMany_1', 'updateMany_2', 'updateMany_3'] } },
    update: { $set: { v: 'after' } },
  };
  const connection = {
    databaseUri,
    databaseName,
    collection,
    write: true,
  };
  const res = await resolver({ request, connection, context });
  expect(res).toEqual({
    modifiedCount: 3,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 3,
  });
});

test('updateMany - Multiple Documents one field', async () => {
  const request = {
    filter: { f: 'updateMany' },
    update: { $set: { v: 'after' } },
  };
  const connection = {
    databaseUri,
    databaseName,
    collection,
    write: true,
  };
  const res = await resolver({ request, connection, context });
  expect(res).toEqual({
    modifiedCount: 3,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 3,
  });
});

test('updateMany upsert', async () => {
  const request = {
    filter: { _id: 'updateMany_upsert' },
    update: { $set: { v: 'after' } },
    options: { upsert: true },
  };
  const connection = {
    databaseUri,
    databaseName,
    collection,
    write: true,
  };
  const res = await resolver({ request, connection, context });
  expect(res).toEqual({
    modifiedCount: 0,
    upsertedId: {
      _id: 'updateMany_upsert',
      index: 0,
    },
    upsertedCount: 1,
    matchedCount: 0,
  });
});

test('updateMany upsert false', async () => {
  const request = {
    filter: { _id: 'updateMany_upsert_false' },
    update: { $set: { v: 'after' } },
    options: { upsert: false },
  };
  const connection = {
    databaseUri,
    databaseName,
    collection,
    write: true,
  };
  const res = await resolver({ request, connection, context });
  expect(res).toEqual({
    modifiedCount: 0,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 0,
  });
});

test('updateMany upsert default false', async () => {
  const request = {
    filter: { _id: 'updateMany_upsert_default_false' },
    update: { $set: { v: 'after' } },
  };
  const connection = {
    databaseUri,
    databaseName,
    collection,
    write: true,
  };
  const res = await resolver({ request, connection, context });
  expect(res).toEqual({
    modifiedCount: 0,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 0,
  });
});

test('updateMany connection error', async () => {
  const request = {
    filter: { _id: 'updateMany_connection_error' },
    update: { $set: { v: 'after' } },
  };
  const connection = {
    databaseUri: 'bad_uri',
    databaseName,
    collection,
    write: true,
  };
  await expect(resolver({ request, connection, context })).rejects.toThrow(RequestError);
  await expect(resolver({ request, connection, context })).rejects.toThrow(
    'Invalid connection string'
  );
});

test('updateMany mongodb error', async () => {
  const request = {
    filter: { _id: 'updateMany_mongodb_error' },
    update: { $badOp: { v: 'after' } },
  };
  const connection = {
    databaseUri,
    databaseName,
    collection,
    write: true,
  };
  await expect(resolver({ request, connection, context })).rejects.toThrow(RequestError);
  await expect(resolver({ request, connection, context })).rejects.toThrow(
    'MongoError: Unknown modifier: $badOp'
  );
});

test('updateMany write false', async () => {
  const request = { filter: { _id: 'updateMany_write_false' }, update: { $set: { v: 'after' } } };
  const connection = {
    databaseUri,
    databaseName,
    collection,
    write: false,
  };
  await expect(resolver({ request, connection, context })).rejects.toThrow(ConfigurationError);
  await expect(resolver({ request, connection, context })).rejects.toThrow(
    'MongoDBCollection connection does not allow writes.'
  );
});

test('updateMany write not specified', async () => {
  const request = {
    filter: { _id: 'updateMany_write_not_specified' },
    update: { $set: { v: 'after' } },
  };
  const connection = {
    databaseUri,
    databaseName,
    collection,
  };
  await expect(resolver({ request, connection, context })).rejects.toThrow(ConfigurationError);
  await expect(resolver({ request, connection, context })).rejects.toThrow(
    'MongoDBCollection connection does not allow writes.'
  );
});

test('request not an object', async () => {
  const request = 'request';
  await expect(() => testSchema({ schema, object: request })).toThrow(ConfigurationError);
  await expect(() => testSchema({ schema, object: request })).toThrow(
    'MongoDBUpdateMany request properties should be an object.'
  );
});

test('request no filter', async () => {
  const request = { update: {} };
  await expect(() => testSchema({ schema, object: request })).toThrow(ConfigurationError);
  await expect(() => testSchema({ schema, object: request })).toThrow(
    'MongoDBUpdateMany request should have required property "filter".'
  );
});

test('request no update', async () => {
  const request = { filter: {} };
  await expect(() => testSchema({ schema, object: request })).toThrow(ConfigurationError);
  await expect(() => testSchema({ schema, object: request })).toThrow(
    'MongoDBUpdateMany request should have required property "update".'
  );
});

test('request update not an object', async () => {
  const request = { update: 'update', filter: {} };
  await expect(() => testSchema({ schema, object: request })).toThrow(ConfigurationError);
  await expect(() => testSchema({ schema, object: request })).toThrow(
    'MongoDBUpdateMany request property "update" should be an object.'
  );
});

test('request filter not an object', async () => {
  const request = { update: {}, filter: 'filter' };
  await expect(() => testSchema({ schema, object: request })).toThrow(ConfigurationError);
  await expect(() => testSchema({ schema, object: request })).toThrow(
    'MongoDBUpdateMany request property "filter" should be an object.'
  );
});

test('request options not an object', async () => {
  const request = { update: {}, filter: {}, options: 'options' };
  await expect(() => testSchema({ schema, object: request })).toThrow(ConfigurationError);
  await expect(() => testSchema({ schema, object: request })).toThrow(
    'MongoDBUpdateMany request property "options" should be an object.'
  );
});
