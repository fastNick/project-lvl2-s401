import { isPlainObject } from 'lodash';
import { complexValue } from './constants';

const stringify = data => (isPlainObject(data) ? complexValue : data);

export default stringify;
