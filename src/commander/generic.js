
import { join as buildPath, isAbsolute, resolve } from 'path';
import comparisonFilesPath from './constants';

const getPath = source => (isAbsolute(source)
  ? resolve(source) : buildPath(__dirname, comparisonFilesPath, source));

export default getPath;
