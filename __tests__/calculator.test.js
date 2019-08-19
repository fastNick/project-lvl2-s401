import { readFileSync } from 'fs';
import { join as buildPath } from 'path';
import gendiff from 'gendiff-nick';
import {
  expectedDefaultFlatData, expectedDefaultRecursiveData, expectedPlainRecursiveData,
  expectedJsonRecursiveData, beforeFlatJsonData, afterFlatJsonData,
  beforeFlatIniData, afterFlatIniData,
  beforeFlatYmlData, afterFlatYmlData, beforeRecursiveJsonData,
  beforeRecursiveIniData, afterRecursiveIniData,
  afterRecursiveJsonData, beforeRecursiveYmlData, afterRecursiveYmlData,
  plainFormat, defaultFormat, jsonFormat,
} from './helper/constants';

import getPath from './helper/generic';

describe('Test #1. Calculate difference for flat structures of default format', () => {
  const lines = readFileSync(buildPath(__dirname, expectedDefaultFlatData), 'utf8');
  test.each([
    [beforeFlatJsonData, afterFlatJsonData],
    [beforeFlatIniData, afterFlatIniData],
    [beforeFlatYmlData, afterFlatYmlData],
  ])(
    'gendiff(%s, %s)',
    (before, after) => {
      const beforeData = getPath(before);
      const afterData = getPath(after);  
      expect(gendiff(beforeData, afterData, defaultFormat)).toEqual(lines);
    },
  );
});

describe('Test #2. Calculate difference for recursive structures of default format', () => {
  const lines = readFileSync(buildPath(__dirname, expectedDefaultRecursiveData), 'utf8');
  test.each([
    [beforeRecursiveJsonData, afterRecursiveJsonData],
    [beforeRecursiveIniData, afterRecursiveIniData],
    [beforeRecursiveYmlData, afterRecursiveYmlData],
  ])(
    'gendiff(%s, %s)',
    (before, after) => {
      const beforeData = getPath(before);
      const afterData = getPath(after);
      const result = gendiff(beforeData, afterData, defaultFormat);
      expect(result).toEqual(lines);
    },
  );
});

describe('Test #3. Calculate difference for recursive structures of plain format', () => {
  const lines = readFileSync(buildPath(__dirname, expectedPlainRecursiveData), 'utf8');
  test.each([
    [beforeRecursiveJsonData, afterRecursiveJsonData],
    [beforeRecursiveIniData, afterRecursiveIniData],
    [beforeRecursiveYmlData, afterRecursiveYmlData],
  ])(
    'gendiff(%s, %s)',
    (before, after) => {
      const beforeData = getPath(before);
      const afterData = getPath(after);
      const result = gendiff(beforeData, afterData, plainFormat);
      expect(result).toEqual(lines);
    },
  );
});

describe('Test #4. Calculate difference for recursive structures of json format', () => {
  const lines = readFileSync(buildPath(__dirname, expectedJsonRecursiveData), 'utf8');
  test.each([
    [beforeRecursiveJsonData, afterRecursiveJsonData],
    [beforeRecursiveIniData, afterRecursiveIniData],
    [beforeRecursiveYmlData, afterRecursiveYmlData],
  ])(
    'gendiff(%s, %s)',
    (before, after) => {
      const beforeData = getPath(before);
      const afterData = getPath(after);
      const result = gendiff(beforeData, afterData, jsonFormat);
      expect(result).toEqual(lines);
    },
  );
});
