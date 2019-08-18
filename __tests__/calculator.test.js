import { readFileSync } from 'fs';
import { join as buildPath } from 'path';
import gendiff from 'gendiff';

describe('Test #1. Calculate difference for flat structures of default format', () => {
  const lines = readFileSync(buildPath(__dirname, './__fixtures__/default/expected-flat.txt'), 'utf8');
  test.each([
    ['before.json', 'after.json'],
    ['before.ini', 'after.ini'],
    ['before.yml', 'after.yml'],
  ])(
    'gendiff(%s, %s)',
    (before, after) => {
      expect(gendiff(before, after, 'default')).toEqual(lines);
    },
  );
});

describe('Test #2. Calculate difference for recursive structures of default format', () => {
  const lines = readFileSync(buildPath(__dirname, './__fixtures__/default/expected-recursive.txt'), 'utf8');
  test.each([
    ['before-recursive.json', 'after-recursive.json'],
    ['before-recursive.ini', 'after-recursive.ini'],
    ['before-recursive.yml', 'after-recursive.yml'],
  ])(
    'gendiff(%s, %s)',
    (before, after) => {
      expect(gendiff(before, after, 'default')).toEqual(lines);
    },
  );
});

describe('Test #3. Calculate difference for recursive structures of plain format', () => {
  const lines = readFileSync(buildPath(__dirname, './__fixtures__/plain/expected.txt'), 'utf8');
  test.each([
    ['before-recursive.json', 'after-recursive.json'],
    ['before-recursive.ini', 'after-recursive.ini'],
    ['before-recursive.yml', 'after-recursive.yml'],
  ])(
    'gendiff(%s, %s)',
    (before, after) => {
      expect(gendiff(before, after, 'plain')).toEqual(lines);
    },
  );
});

describe('Test #4. Calculate difference for recursive structures of json format', () => {
  const lines = readFileSync(buildPath(__dirname, './__fixtures__/json/expected.txt'), 'utf8');
  test.each([
    ['before-recursive.json', 'after-recursive.json'],
    ['before-recursive.ini', 'after-recursive.ini'],
    ['before-recursive.yml', 'after-recursive.yml'],
  ])(
    'gendiff(%s, %s)',
    (before, after) => {      
      expect(gendiff(before, after, 'json')).toEqual(lines);
    },
  );
});
