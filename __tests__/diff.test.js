import { resolve } from 'path';
import { readFileSync } from 'fs';

import gendiff from '../src';

import {
  formats, dataTypes, fixturesPath,
} from './constants';

const getContent = path => readFileSync(path, 'utf8');

describe(`Calculate difference for recursive structures of [${dataTypes}] types of data for different [${formats}] formats `, () => {
  formats.forEach((format) => {
    test.each(dataTypes)(
      `Test functionality of gendiff for .%s files in form of ${format} format`,
      (dataType) => {
        const beforePath = resolve(__dirname,
          fixturesPath, `./before.${dataType}`);
        const afterPath = resolve(__dirname,
          fixturesPath, `./after.${dataType}`);
        const expectedContent = getContent(resolve(__dirname,
          fixturesPath, `./${format}.txt`));
        const genDiffResult = gendiff(beforePath, afterPath, format);
        expect(genDiffResult).toEqual(expectedContent);
      },
    );
  });
});
