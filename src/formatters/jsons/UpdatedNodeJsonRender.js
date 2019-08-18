import { flattenDeep } from 'lodash';
import JsonRender from './JsonRender';
import { leftCurl, rightCurl, comma } from './constants';

function UpdatedNodeJsonRender(node, parentRenderNode) {
  JsonRender.apply(this, [node, parentRenderNode]);
}

UpdatedNodeJsonRender.prototype.toString = function toString() {
  return flattenDeep([leftCurl, JsonRender.prototype.toString.call(this), comma, `"valueBefore":"${this.node.valueBefore}"`, comma, `"valueAfter":"${this.node.valueAfter}"`, rightCurl]).join('');
};

export default UpdatedNodeJsonRender;
