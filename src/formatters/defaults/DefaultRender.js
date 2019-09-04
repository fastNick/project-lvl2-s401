import { isPlainObject } from 'lodash';
import { afterKeySeparator } from './constants';
import LeftPadding from './lib/LeftPadding';
import stringifyObject from './generic';

function DefaultRender(node, sign, parent = null) {
  const {
    key, value, children,
  } = node;
  this.sign = sign;
  this.key = key;
  this.value = value;
  this.children = children;
  this.parent = parent;
  this.leftPadding = new LeftPadding(this.parent, this.sign);

  this.stringify = function stringify(data) {
    return isPlainObject(data) ? stringifyObject(data, this.leftPadding) : data;
  };
}

DefaultRender.prototype.toString = function toString() {
  return [this.leftPadding, this.key, afterKeySeparator].join('');
};

export default DefaultRender;
