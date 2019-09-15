import { flattenDeep } from 'lodash';
import JsonRender from './JsonRender';
import { leftCurl, rightCurl, comma } from './constants';

function UpdatedNodeJsonRender(node, parentRenderNode) {
  JsonRender.apply(this, [node, parentRenderNode]);
  this.valueBefore = node.value.old;
  this.valueAfter = node.value.new;
}

UpdatedNodeJsonRender.prototype.toString = function toString() {
  return flattenDeep([leftCurl, JsonRender.prototype.toString.call(this), comma, `"valueBefore":"${this.valueBefore}"`, comma, `"valueAfter":"${this.valueAfter}"`, rightCurl]).join('');
};

export default UpdatedNodeJsonRender;
