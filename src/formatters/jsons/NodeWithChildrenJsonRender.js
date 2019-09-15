
import { flattenDeep } from 'lodash';
import JsonRender from './JsonRender';
import { leftCurl, rightCurl, comma } from './constants';

function NodeWithChildrenJsonRender(node, parentRenderNode, recursiveFunc) {
  JsonRender.apply(this, [node, parentRenderNode]);
  this.children = recursiveFunc(node.value, this);
}

NodeWithChildrenJsonRender.prototype.toString = function toString() {
  return flattenDeep([leftCurl, JsonRender.prototype.toString.apply(this), comma, `"children":[${this.children}]`, rightCurl]).join('');
};

export default NodeWithChildrenJsonRender;
