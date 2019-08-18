import { isPlainObject, flattenDeep } from 'lodash';
import {
  nonUpdatedSign,
  rightCurl, leftCurl, afterKeySeparator, paddingSymbol, paddingFromKey, paddingFromSign, newLine,
} from './constants';
import LeftPadding from './lib/LeftPadding';


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
    if (isPlainObject(data)) {
      const property = Object.keys(data)
        .reduce((acc, currentKey) => {
          const currentPadding = [paddingSymbol.repeat(this.leftPadding), paddingSymbol
            .repeat(paddingFromSign),
          nonUpdatedSign, paddingSymbol.repeat(paddingFromKey)];
          return acc.concat([currentPadding, currentKey, afterKeySeparator, data[currentKey], '\n']);
        }, []);
      return flattenDeep([leftCurl,
        newLine,
        property,
        paddingSymbol.repeat(this.leftPadding),
        rightCurl]).join('');
    }
    return data;
  };
}

DefaultRender.prototype.toString = function toString() {
  return [this.leftPadding, this.key, afterKeySeparator].join('');
};

export default DefaultRender;
