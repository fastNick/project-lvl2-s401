import { flattenDeep } from 'lodash';
import { pathSeparator } from './constants';
import stringify from './helper';

function JsonRender(node, parentRenderNode, recursiveFunc) {
  this.node = node;
  this.key = this.node.key;
  this.value = this.node.value;
  this.parentRenderNode = parentRenderNode;
  this.path = this.parentRenderNode && this.parentRenderNode.path
    ? [this.parentRenderNode.path, this.key]
      .join(pathSeparator) : this.key;
  this.children = this.node.children.length ? recursiveFunc(this.node.children, this) : [];
}

JsonRender.prototype.toString = function toString() {
  return flattenDeep([`"name":"${this.key}"`, `"type":"${this.node.constructor.name}"`,
    `"value":"${stringify(this.value)}"`, `"children":[${this.children}]`, `"path":"${this.path}"`]).join(',');
};

export default JsonRender;
