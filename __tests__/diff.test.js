
import gendiff from '../src';

import {
  formats, dataTypes,
} from './helper/constants';

import {
  getExpectedPath, getBeforePath, getAfterPath,
} from './helper/generic';

import getData from '../src/lib/file';

describe(`Calculate difference for recursive structures of [${dataTypes}] types of data for different [${formats}] formats `, () => {
  formats.forEach((format) => {
    test.each(dataTypes)(
      `Test functionality of gendiff for .%s files in form of ${format} format`,
      (dataType) => {
        const beforePath = getBeforePath(dataType);
        const afterPath = getAfterPath(dataType);
        const { lines } = getData(getExpectedPath(format));
        const result = gendiff(beforePath, afterPath, format);
        expect(result).toEqual(lines);
      },
    );
  });
});
