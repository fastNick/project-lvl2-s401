import { resolve } from 'path';
import { readFileSync } from 'fs';

import gendiff from '../src';


const getContent = (path) => readFileSync(path, 'utf8');
export const fixturesPath = './__fixtures__/';
export const formats = ['nested', 'plain', 'json'];
export const dataTypes = [['json'], ['ini'], ['yml']];

const getPath = (file) => resolve(__dirname, fixturesPath, `${file}`);

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
