import { parse as parseIni } from 'ini';
import { safeLoad } from 'js-yaml';

const parsers = {
  '.yml': safeLoad,
  '.json': JSON.parse,
  '.ini': parseIni,
};

const convertToObject = (dataType, content) => parsers[dataType](content);

export default convertToObject;
