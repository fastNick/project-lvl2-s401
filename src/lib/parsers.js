import { safeLoad } from 'js-yaml';
import {
  extname,
} from 'path';


const getExtension = file => extname(file);

const createParser = () => ({
  '.yml': safeLoad,
  '.json': JSON.parse,
});

const getParser = file => createParser()[getExtension(file)];

export default getParser;
