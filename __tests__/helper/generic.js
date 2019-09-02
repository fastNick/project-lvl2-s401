import { resolve } from 'path';
import {
  comparisonPath, expectedPath,
} from './constants';

const getComparisonPath = (position, dataType) => resolve(__dirname,
  comparisonPath, `${dataType}/${position}.${dataType}`);

export const getBeforePath = dataType => getComparisonPath('before', dataType);
export const getAfterPath = dataType => getComparisonPath('after', dataType);

export const getExpectedPath = format => resolve(__dirname,
  expectedPath, `${format}.txt`);
