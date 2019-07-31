import { readFileSync } from 'fs';
import { join as buildPath } from 'path';
import gendiff from 'gendiff';

describe('Test #1. Calculate difference for flat structures', () => {
  const lines = readFileSync(buildPath(__dirname, './__fixtures__/expected-flat.txt'), 'utf8');
  test.each([
    ['before.json', 'after.json'],
    ['before.ini', 'after.ini'],
    ['before.yml', 'after.yml'],
  ])(
    'gendiff(%s, %s)',
    (before, after) => {
      expect(gendiff(before, after)).toEqual(lines);
    },
  );
});

describe('Test #2. Calculate difference for recursive structures', () => {
  const lines = readFileSync(buildPath(__dirname, './__fixtures__/expected-recursive.txt'), 'utf8');
  test.each([
    ['before__nested.json', 'after__nested.json'],
    ['before__nested.ini', 'after__nested.ini'],
    ['before__nested.yml', 'after__nested.yml'],
  ])(
    'gendiff(%s, %s)',
    (before, after) => {
      expect(gendiff(before, after)).toEqual(lines);
    },
  );
});
