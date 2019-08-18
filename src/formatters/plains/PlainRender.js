import { pathSeparator } from './constants';

function PlainRender(node, parentRenderNode, recursiveFunc) {
  this.node = node;
  this.key = this.node.key;
  this.value = this.node.value;
  this.parentRenderNode = parentRenderNode;
  this.path = this.parentRenderNode && this.parentRenderNode.path
    ? [this.parentRenderNode.path, this.key]
      .join(pathSeparator) : this.key;
  this.children = this.node.children.length ? recursiveFunc(this.node.children, this) : [];
}

PlainRender.prototype.toString = function toString() {
  return `Property '${this.path}' was `;
};

export default PlainRender;
