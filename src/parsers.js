import { parse as parseIni } from 'ini';
import { safeLoad } from 'js-yaml';

const dataTypeMapper = {
  '.yml': data => safeLoad(data),
  '.json': data => JSON.parse(data),
  '.ini': data => parseIni(data),
};

const convertToObject = ({ extension, lines }) => dataTypeMapper[extension](lines);

export default convertToObject;
