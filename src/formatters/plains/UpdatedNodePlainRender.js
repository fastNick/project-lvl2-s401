import stringify from './helper';
import PlainRender from './PlainRender';

function UpdatedNodePlainRender(node, parentRenderNode) {
  PlainRender.apply(this, [node, parentRenderNode]);
  this.valueBefore = node.value.old;
  this.valueAfter = node.value.new;
}

UpdatedNodePlainRender.prototype.toString = function toString() {
  return [PlainRender.prototype.toString.call(this), `was updated. From ${stringify(this.valueBefore)} to ${stringify(this.valueAfter)}`].join('');
};

export default UpdatedNodePlainRender;
