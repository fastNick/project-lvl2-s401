
import PlainRender from './PlainRender';

function RemovedNodePlainRender(node, parentRenderNode) {
  PlainRender.apply(this, [node, parentRenderNode]);
}

RemovedNodePlainRender.prototype.toString = function toString() {
  return [PlainRender.prototype.toString.call(this), 'removed'].join('');
};

export default RemovedNodePlainRender;
