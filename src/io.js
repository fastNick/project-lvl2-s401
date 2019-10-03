import { readFileSync } from 'fs';
import { extname } from 'path';

export const readFile = (source) => {
  try {
    return readFileSync(source, 'utf8');
  } catch (err) {
    console.log(`Error: ${err}`);
    return 'Error';
  }
};

export const getExtension = source => extname(source);


const getData = source => ({
  extension: getExtension(source),
  lines: readFile(source),
});

export default getData;
