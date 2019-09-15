import { pathSeparator } from './constants';

const getPath = (parentRender, key) => (parentRender.parentRenderNode
  ? [getPath(parentRender.parentRenderNode, parentRender.key), key]
    .join(pathSeparator) : key);


function PlainRender(node, parentRenderNode) {
  this.node = node;
  this.key = node.key;
  this.parentRenderNode = parentRenderNode;
}

PlainRender.prototype.toString = function toString() {
  return `Property '${getPath(this.parentRenderNode, this.key)}' was `;
};

export default PlainRender;
