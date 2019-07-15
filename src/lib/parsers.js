import { safeLoad as parseYaml } from 'js-yaml';
import {
  extname,
} from 'path';
import { parse as parseIni } from 'ini';

const parseJson = JSON.parse;


const getExtension = file => extname(file);

const createParser = () => ({
  '.yml': parseYaml,
  '.json': parseJson,
  '.ini': parseIni,
});

const getParser = file => createParser()[getExtension(file)];

export default getParser;
