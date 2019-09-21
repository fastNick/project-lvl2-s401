
import gendiff from 'gendiff-nick';

import {
  formats, dataTypes,
} from './helper/constants';

import {
  getExpectedPath, getBeforePath, getAfterPath,
} from './helper/generic';

import getData from '../src/lib/file';
import convertToObject from '../src/parsers';

describe(`Calculate difference for recursive structures of [${dataTypes}] types of data for different [${formats}] formats `, () => {
  formats.forEach((format) => {
    test.each(dataTypes)(
      `Test functionality of gendiff for .%s files in form of ${format} format`,
      (dataType) => {
        const beforeData = getData(getBeforePath(dataType));
        const beforeObject = convertToObject(beforeData);
        const afterData = getData(getAfterPath(dataType));
        const afterObject = convertToObject(afterData);
        const { lines } = getData(getExpectedPath(format));
        const result = gendiff(beforeObject, afterObject, format);
        expect(result).toEqual(lines);
      },
    );
  });
});
