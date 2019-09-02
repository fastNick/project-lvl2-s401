import { readFileSync } from 'fs';
import gendiff from 'gendiff-nick';
import {
  formats, dataTypes,
} from './helper/constants';

import {
  getExpectedPath, getBeforePath, getAfterPath,
} from './helper/generic';

describe(`Calculate difference for recursive structures of [${dataTypes}] types of data for different [${formats}] formats `, () => {
  formats.forEach((format) => {
    test.each(dataTypes)(
      `Test functionality of gendiff for .%s files in form of ${format} format`,
      (dataType) => {
        const beforePath = getBeforePath(dataType);
        const afterPath = getAfterPath(dataType);
        const lines = readFileSync(getExpectedPath(format), 'utf8');
        expect(gendiff(beforePath, afterPath, format)).toEqual(lines);
      },
    );
  });
});
