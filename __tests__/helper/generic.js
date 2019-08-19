import { join as buildPath, isAbsolute, resolve } from 'path';

const getPath = source => (isAbsolute(source)
  ? resolve(source) : buildPath(__dirname, source));

export default getPath;
