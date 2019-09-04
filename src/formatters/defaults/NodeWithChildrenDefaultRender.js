import { flattenDeep } from 'lodash';

import DefaultRender from './DefaultRender';
import {
  nonUpdatedSign, leftCurl, rightCurl, paddingSymbol, newLine,
} from './constants';

function NodeWithChildrenDefaultRender(node, parent, recursiveFunc) {
  DefaultRender.apply(this, [node, nonUpdatedSign, parent]);
  this.children = recursiveFunc(node.children, this);
}

NodeWithChildrenDefaultRender.prototype.toString = function toString() {
  const result = flattenDeep([DefaultRender.prototype.toString.call(this),
    leftCurl,
    newLine,
    this.children,
    paddingSymbol.repeat(this.leftPadding),
    rightCurl,
    newLine,
  ]);
  return result.join('');
};

export default NodeWithChildrenDefaultRender;
