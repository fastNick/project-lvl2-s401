import { readFileSync } from 'fs';
import gendiff from 'gendiff-nick';
import {
  plainFormat, defaultFormat, jsonFormat, ini, json, yml, flatStructure, recursiveStructure,
} from './helper/constants';

import {
  getAfterPath, getBeforePath, getExpectedPath,
} from './helper/generic';

describe('Test #1. Calculate difference for flat structures of default format', () => {
  const lines = readFileSync(getExpectedPath(defaultFormat, flatStructure), 'utf8');
  test.each([
    [getBeforePath(json, flatStructure), getAfterPath(json, flatStructure)],
    [getBeforePath(ini, flatStructure), getAfterPath(ini, flatStructure)],
    [getBeforePath(yml, flatStructure), getAfterPath(yml, flatStructure)],
  ])(
    'gendiff(%s, %s)',
    (before, after) => {
      expect(gendiff(before, after, defaultFormat)).toEqual(lines);
    },
  );
});

describe('Test #3. Calculate difference for recursive structures of plain format', () => {
  const lines = readFileSync(getExpectedPath(plainFormat, recursiveStructure), 'utf8');
  test.each([
    [getBeforePath(json, recursiveStructure), getAfterPath(json, recursiveStructure)],
    [getBeforePath(ini, recursiveStructure), getAfterPath(ini, recursiveStructure)],
    [getBeforePath(yml, recursiveStructure), getAfterPath(yml, recursiveStructure)],
  ])(
    'gendiff(%s, %s)',
    (before, after) => {
      expect(gendiff(before, after, plainFormat)).toEqual(lines);
    },
  );
});

describe('Test #4. Calculate difference for recursive structures of json format', () => {
  const lines = readFileSync(getExpectedPath(jsonFormat, recursiveStructure), 'utf8');
  test.each([
    [getBeforePath(json, recursiveStructure), getAfterPath(json, recursiveStructure)],
    [getBeforePath(ini, recursiveStructure), getAfterPath(ini, recursiveStructure)],
    [getBeforePath(yml, recursiveStructure), getAfterPath(yml, recursiveStructure)],
  ])(
    'gendiff(%s, %s)',
    (before, after) => {
      expect(gendiff(before, after, jsonFormat)).toEqual(lines);
    },
  );
});
