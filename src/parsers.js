import { parse as parseIni } from 'ini';
import { safeLoad } from 'js-yaml';

const dataTypeToParserMapper = {
  '.yml': safeLoad,
  '.json': JSON.parse,
  '.ini': parseIni,
};

const convertToObject = (dataType, content) => dataTypeToParserMapper[dataType](content);

export default convertToObject;
