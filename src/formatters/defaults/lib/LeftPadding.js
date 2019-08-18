import {
  noSign, paddingFromSign, paddingFromKey, paddingSymbol, paddingInitial,
} from '../constants';

function LeftPadding(parent, sign = noSign) {
  this.parent = parent;
  this.sign = sign;
}

LeftPadding.prototype.toString = function toString() {
  this.paddingFromSign = paddingSymbol.repeat(paddingFromSign);
  this.paddingFromKey = paddingSymbol.repeat(paddingFromKey);
  const parentPadding = this.parent
    ? paddingSymbol.repeat(this.parent.leftPadding.valueOf()) : paddingInitial;
  return [parentPadding, this.paddingFromSign, this.sign, this.paddingFromKey].join('');
};

LeftPadding.prototype.valueOf = function valueOf() {
  return this.toString().length;
};

export default LeftPadding;
