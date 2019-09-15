import JsonRender from './JsonRender';
import { leftCurl, rightCurl, comma } from './constants';
import stringify from './helper';


function NonUpdatedNodeJsonRender(node, parentRenderNode) {
  JsonRender.apply(this, [node, parentRenderNode]);
  this.value = node.value;
}

NonUpdatedNodeJsonRender.prototype.toString = function toString() {
  return [leftCurl, JsonRender.prototype.toString.apply(this), comma, `"value":"${stringify(this.value)}"`, rightCurl].join('');
};

export default NonUpdatedNodeJsonRender;
