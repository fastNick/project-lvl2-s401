import { complexValue } from './constants';

const stringifyMapper = {
  object: () => complexValue,
  string: data => `'${data}'`,
};

const stringify = data => (stringifyMapper[typeof data] ? stringifyMapper[typeof data](data)
  : data);

export default stringify;
