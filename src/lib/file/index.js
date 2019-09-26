import { getExtension, readFile } from './generic';

const getData = source => ({
  extension: getExtension(source),
  lines: readFile(source),
});

export default getData;
