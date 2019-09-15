
import PlainRender from './PlainRender';

function NodeWithChildrenPlainRender(node, parentRenderNode, recursiveFunc) {
  PlainRender.apply(this, [node, parentRenderNode]);
  this.children = recursiveFunc(node.value, this);
}

NodeWithChildrenPlainRender.prototype.toString = function toString() {
  const result = this.children.filter(x => x.constructor.name !== 'NotChangedNodeRender').map(x => x.toString());
  return result;
};

export default NodeWithChildrenPlainRender;
