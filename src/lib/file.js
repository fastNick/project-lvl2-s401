import { readFileSync } from 'fs';
import { extname } from 'path';

const readFile = (source) => {
  try {
    return readFileSync(source, 'utf8');
  } catch (err) {
    console.log(`Error: ${err}`);
    return 'Error';
  }
};

const getExtension = source => extname(source);

const getData = source => ({
  extension: getExtension(source),
  lines: readFile(source),
});

export default getData;
