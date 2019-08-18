
import PlainRender from './PlainRender';

function RootNodePlainRender(node, recursiveFunc) {
  this.parentRenderNode = null;
  PlainRender.apply(this, [node, this.parentRenderNode, recursiveFunc]);
}

RootNodePlainRender.prototype.toString = function toString() {
  return this.children;
};

export default RootNodePlainRender;
