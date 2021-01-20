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

import object from '../../src/common/object';

const location = 'locationId';

describe('_object.hasOwnProperty', () => {
  const methodName = 'hasOwnProperty';
  test('valid', () => {
    expect(
      object({
        params: [{ a: 1 }, 'a'],
        methodName,
        location,
      })
    ).toEqual(true);
    expect(
      object({
        params: { on: { a: 1 }, prop: 'a' },
        methodName,
        location,
      })
    ).toEqual(true);
    expect(
      object({
        params: { on: { a: 1 }, prop: 'b' },
        methodName,
        location,
      })
    ).toEqual(false);
  });
  test('throw', () => {
    expect(() =>
      object({
        params: { value: 'x', start: 1, end: 2 },
        methodName,
        location,
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Operator Error: _object.hasOwnProperty must be evaluated on an object instance. For named args provide an object instance to the \\"on\\" property, for listed args provide and object instance as the first element in the operator argument array.
          Received: {\\"_object.hasOwnProperty\\":{\\"value\\":\\"x\\",\\"start\\":1,\\"end\\":2}} at locationId."
    `);
    expect(() =>
      object({
        params: [1, { a: 1 }],
        methodName,
        location,
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Operator Error: _object.hasOwnProperty must be evaluated on an object instance. For named args provide an object instance to the \\"on\\" property, for listed args provide and object instance as the first element in the operator argument array.
          Received: {\\"_object.hasOwnProperty\\":[1,{\\"a\\":1}]} at locationId."
    `);
    expect(() =>
      object({
        params: 'x',
        methodName,
        location,
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Operator Error: _object.hasOwnProperty accepts one of the following types: array, object.
            Received: {\\"_object.hasOwnProperty\\":\\"x\\"} at locationId."
    `);
    expect(() =>
      object({
        params: null,
        methodName,
        location,
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Operator Error: _object.hasOwnProperty accepts one of the following types: array, object.
            Received: {\\"_object.hasOwnProperty\\":null} at locationId."
    `);
  });
});

describe('_object.keys', () => {
  const methodName = 'keys';
  test('valid', () => {
    expect(
      object({
        params: { a: 1, b: 1 },
        methodName,
        location,
      })
    ).toEqual(['a', 'b']);
  });
  test('throw', () => {
    expect(() =>
      object({
        params: [],
        methodName,
        location,
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Operator Error: _object.keys accepts one of the following types: object.
            Received: {\\"_object.keys\\":[]} at locationId."
    `);
    expect(() =>
      object({
        params: 'x',
        methodName,
        location,
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Operator Error: _object.keys accepts one of the following types: object.
            Received: {\\"_object.keys\\":\\"x\\"} at locationId."
    `);
    expect(() =>
      object({
        params: null,
        methodName,
        location,
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Operator Error: _object.keys accepts one of the following types: object.
            Received: {\\"_object.keys\\":null} at locationId."
    `);
  });
});

describe('_object.values', () => {
  const methodName = 'values';
  test('valid', () => {
    expect(
      object({
        params: { a: 1, b: 2 },
        methodName,
        location,
      })
    ).toEqual([1, 2]);
  });
  test('throw', () => {
    expect(() =>
      object({
        params: [],
        methodName,
        location,
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Operator Error: _object.values accepts one of the following types: object.
            Received: {\\"_object.values\\":[]} at locationId."
    `);
    expect(() =>
      object({
        params: 'x',
        methodName,
        location,
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Operator Error: _object.values accepts one of the following types: object.
            Received: {\\"_object.values\\":\\"x\\"} at locationId."
    `);
    expect(() =>
      object({
        params: null,
        methodName,
        location,
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Operator Error: _object.values accepts one of the following types: object.
            Received: {\\"_object.values\\":null} at locationId."
    `);
  });
});

describe('_object.assign', () => {
  const methodName = 'assign';
  test('valid', () => {
    expect(
      object({
        params: [
          { a: 1, b: 2 },
          { a: 2, c: 3 },
        ],
        methodName,
        location,
      })
    ).toEqual({ a: 2, b: 2, c: 3 });
    expect(
      object({
        params: [{ a: 1, b: 2 }, 2, 'a', { b: 3 }],
        methodName,
        location,
      })
    ).toEqual({ 0: 'a', a: 1, b: 3 });
  });
  test('throw', () => {
    expect(() =>
      object({
        params: [],
        methodName,
        location,
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"Operator Error: _object.assign - Cannot convert undefined or null to object Received: {\\"_object.assign\\":[]} at locationId."`
    );
    expect(() =>
      object({
        params: 'x',
        methodName,
        location,
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Operator Error: _object.assign accepts one of the following types: array.
            Received: {\\"_object.assign\\":\\"x\\"} at locationId."
    `);
    expect(() =>
      object({
        params: null,
        methodName,
        location,
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "Operator Error: _object.assign accepts one of the following types: array.
            Received: {\\"_object.assign\\":null} at locationId."
    `);
  });
});

test('_object called with no method or params', () => {
  expect(() => object({ location: 'locationId' })).toThrowErrorMatchingInlineSnapshot(`
    "Operator Error: _object requires a valid method name, use one of the following: keys, values, assign.
            Received: {\\"_object.undefined\\":undefined} at locationId."
  `);
});

test('_object invalid method', () => {
  expect(() => object({ params: [{ a: 1 }], methodName: 'X', location: 'locationId' }))
    .toThrowErrorMatchingInlineSnapshot(`
    "Operator Error: _object.X is not supported, use one of the following: keys, values, assign.
          Received: {\\"_object.X\\":[{\\"a\\":1}]} at locationId."
  `);
});

test('_object invalid method args', () => {
  expect(() => object({ params: 'X', methodName: 'flat', location: 'locationId' }))
    .toThrowErrorMatchingInlineSnapshot(`
    "Operator Error: _object.flat is not supported, use one of the following: keys, values, assign.
          Received: {\\"_object.flat\\":\\"X\\"} at locationId."
  `);
});
