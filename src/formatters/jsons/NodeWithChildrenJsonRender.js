
import { flattenDeep } from 'lodash';
import JsonRender from './JsonRender';
import { leftCurl, rightCurl } from './constants';

function NodeWithChildrenJsonRender(node, parentRenderNode, recursiveFunc) {
  JsonRender.apply(this, [node, parentRenderNode, recursiveFunc]);
}

NodeWithChildrenJsonRender.prototype.toString = function toString() {
  return flattenDeep([leftCurl, JsonRender.prototype.toString.apply(this), rightCurl]).join('');
};

export default NodeWithChildrenJsonRender;
