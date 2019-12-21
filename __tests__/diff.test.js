import { resolve } from 'path';
import { readFileSync } from 'fs';

import gendiff from '../src';

import {
  formats, dataTypes, fixturesPath,
} from './constants';

const getContent = path => readFileSync(path, 'utf8');

const getPath = file => resolve(__dirname, fixturesPath, `${file}`);

describe(`Calculate difference for recursive structures of [${dataTypes}] types of data for different [${formats}] formats `, () => {
  formats.forEach((format) => {
    test.each(dataTypes)(
      `Test functionality of gendiff for .%s files in form of ${format} format`,
      (dataType) => {
        const beforePath = getPath(`./before.${dataType}`);
        const afterPath = getPath(`./after.${dataType}`);
        const resultPath = getPath(`./expected_${format}.txt`);
        const expectedContent = getContent(resultPath);
        const genDiffResult = gendiff(beforePath, afterPath, format);
        expect(genDiffResult).toEqual(expectedContent);
      },
    );
  });
});
