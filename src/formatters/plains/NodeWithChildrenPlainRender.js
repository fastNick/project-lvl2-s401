
import PlainRender from './PlainRender';

function NodeWithChildrenPlainRender(node, parentRenderNode, recursiveFunc) {
  PlainRender.apply(this, [node, parentRenderNode, recursiveFunc]);
}

NodeWithChildrenPlainRender.prototype.toString = function toString() {
  return this.children.join('\n');
};

export default NodeWithChildrenPlainRender;
