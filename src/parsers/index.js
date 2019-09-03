import {
  extname,
} from 'path';
import dataTypeMapper from './generic';

const convertToObject = source => dataTypeMapper[extname(source)](source);

export default convertToObject;
