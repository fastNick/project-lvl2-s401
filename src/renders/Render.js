import { leftPaddingFromSign, leftPaddingFromKey, leftPaddingFromValue } from './helper';

function Render(parentSign, depth, sign, key) {
  this.parentSign = parentSign;
  this.depth = depth;
  this.sign = sign;
  this.key = key;
}

Render.prototype.toString = function toString() {
  const temp = [`${leftPaddingFromSign(this.parentSign, this.depth)}${this.sign}${leftPaddingFromKey()}`,
    `${this.key}:${leftPaddingFromValue()}`];
  return temp;
};

export default Render;
