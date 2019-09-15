
import PlainRender from './PlainRender';
import stringify from './helper';

function AddedNodePlainRender(node, parentRenderNode) {
  PlainRender.apply(this, [node, parentRenderNode]);
  this.value = node.value;
}

AddedNodePlainRender.prototype.toString = function toString() {
  return [PlainRender.prototype.toString.call(this), `added with value: ${stringify(this.value)}`].join('');
};

export default AddedNodePlainRender;
