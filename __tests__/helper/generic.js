import { join as buildPath, isAbsolute, resolve } from 'path';
import {
  comparisonPath, expectedPath, after, before,
} from './constants';

const getPath = source => (isAbsolute(source)
  ? resolve(source) : buildPath(__dirname, source));

export default getPath;

const getComparisonPath = (position, dataType, structure) => buildPath(__dirname,
  comparisonPath, `${dataType}/${structure}/${position}.${dataType}`);

export const getBeforePath = (dataType, structure) => getComparisonPath(before,
  dataType, structure);

export const getAfterPath = (dataType, structure) => getComparisonPath(after, dataType, structure);

export const getExpectedPath = (format, structure) => buildPath(__dirname,
  expectedPath, `${format}/${structure}.txt`);
