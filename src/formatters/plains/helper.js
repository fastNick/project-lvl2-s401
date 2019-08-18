import { isPlainObject } from 'lodash';
import { complexValue } from './constants';

const stringify = (data) => {
  if (isPlainObject(data)) {
    return complexValue;
  }
  if (typeof (data) === 'string') {
    return `'${data}'`;
  }
  return data;
};

export default stringify;
