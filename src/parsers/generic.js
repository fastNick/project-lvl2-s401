import { parse as parseIni } from 'ini';
import { safeLoad } from 'js-yaml';


export default {
  '.yml': data => safeLoad(data),
  '.json': data => JSON.parse(data),
  '.ini': data => parseIni(data),
};
