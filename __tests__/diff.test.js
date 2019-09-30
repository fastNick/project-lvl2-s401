import { resolve } from 'path';
import { readFileSync } from 'fs';

import gendiff from '../src';

import {
  formats, dataTypes, comparisonPath, expectedPath,
} from './constants';

const getContent = path => readFileSync(path, 'utf8');

describe(`Calculate difference for recursive structures of [${dataTypes}] types of data for different [${formats}] formats `, () => {
  formats.forEach((format) => {
    test.each(dataTypes)(
      `Test functionality of gendiff for .%s files in form of ${format} format`,
      (dataType) => {
        const beforePath = resolve(__dirname,
          comparisonPath, `${dataType}/before.${dataType}`);
        const afterPath = resolve(__dirname,
          comparisonPath, `${dataType}/after.${dataType}`);
        const expectedContent = getContent(resolve(__dirname,
          expectedPath, `${format}.txt`));
        const genDiffResult = gendiff(beforePath, afterPath, format);
        expect(genDiffResult).toEqual(expectedContent);
      },
    );
  });
});
