/*
  Copyright 2020-2022 Lowdefy, Inc

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

export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Lowdefy Connection Schema - MongoDBCollection',
  type: 'object',
  required: ['databaseUri', 'collection'],
  properties: {
    databaseUri: {
      type: 'string',
      description: 'Connection uri string for the MongoDb deployment.',
      errorMessage: {
        type: 'MongoDBCollection connection property "databaseUri" should be a string.',
      },
    },
    databaseName: {
      type: 'string',
      description: 'AWS IAM secret access key with s3 access.',
      errorMessage: {
        type: 'MongoDBCollection connection property "databaseName" should be a string.',
      },
    },
    collection: {
      type: 'string',
      description: 'AWS region the bucket is located in.',
      errorMessage: {
        type: 'MongoDBCollection connection property "collection" should be a string.',
      },
    },
    read: {
      type: 'boolean',
      default: true,
      description: 'Allow reads from the collection.',
      errorMessage: {
        type: 'MongoDBCollection connection property "read" should be a boolean.',
      },
    },
    write: {
      type: 'boolean',
      default: false,
      description: 'Allow writes to the collection.',
      errorMessage: {
        type: 'MongoDBCollection connection property "write" should be a boolean.',
      },
    },
  },
  errorMessage: {
    type: 'MongoDBCollection connection properties should be an object.',
    required: {
      databaseUri: 'MongoDBCollection connection should have required property "databaseUri".',
      collection: 'MongoDBCollection connection should have required property "collection".',
    },
  },
};
