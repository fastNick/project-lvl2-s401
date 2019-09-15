import { pathSeparator } from './constants';

const getPath = (parentRender, key) => (parentRender.parentRenderNode
  ? [getPath(parentRender.parentRenderNode, parentRender.key), key]
    .join(pathSeparator) : key);

function JsonRender(node, parentRenderNode) {
  this.node = node;
  this.key = node.key;
  this.type = node.name;
  this.parentRenderNode = parentRenderNode;
}

JsonRender.prototype.toString = function toString() {
  return [`"name":"${this.key}"`, `"type":"${this.type}"`,
    `"path":"${getPath(this.parentRenderNode, this.key)}"`].join(',');
};

export default JsonRender;
