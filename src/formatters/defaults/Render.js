import { afterKeySeparator } from './constants';
import { getLeftPadding, getMarginLeft, getSign } from './generic';

function DefaultRender(node, parent) {
  this.node = node;
  this.key = node.key;
  this.parent = parent;
}

DefaultRender.prototype.toString = function toString() {
  return [getMarginLeft(this.parent), getLeftPadding(this.parent, getSign(this.constructor.name)), this.key, afterKeySeparator].join('');
};

export default DefaultRender;
