import { flattenDeep } from 'lodash';

import Render from './Render';
import {
  leftCurl, rightCurl, newLine,
} from './constants';
import { getLeftPadding, getMarginLeft, getSign } from './generic';


function NestedNodeRender(node, parent, recursiveFunc) {
  Render.apply(this, [node, parent]);
  this.children = recursiveFunc(node.value, this);
}

NestedNodeRender.prototype.toString = function toString() {
  const r = Render.prototype.toString.call(this);
  const result = flattenDeep([r,
    leftCurl,
    newLine,
    this.children,
    getMarginLeft(this.parent),
    getLeftPadding(this.parent, getSign(this.constructor.name)),
    rightCurl,
    newLine,
  ]);
  return result.join('');
};

export default NestedNodeRender;
