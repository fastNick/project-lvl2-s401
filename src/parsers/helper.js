
import { join as buildPath, isAbsolute, resolve } from 'path';
import { readFileSync } from 'fs';


const getData = (source) => {
  try {
    if (!isAbsolute(source)) {
      const fullPath = buildPath(__dirname, '../../', 'comparison__files', source);

      return readFileSync(fullPath, 'utf8');
    }
    const absoluteFilePath = resolve(source);
    return readFileSync(absoluteFilePath, 'utf8');
  } catch (err) {
    console.log(`Error: ${err}`);
    return 'Error';
  }
};

export default getData;
