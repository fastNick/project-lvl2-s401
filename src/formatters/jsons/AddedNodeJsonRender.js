
import { flattenDeep } from 'lodash';
import JsonRender from './JsonRender';
import { leftCurl, rightCurl, comma } from './constants';
import stringify from './helper';

function AddedNodeJsonRender(node, parentRenderNode) {
  JsonRender.apply(this, [node, parentRenderNode]);
  this.value = node.value;
}

AddedNodeJsonRender.prototype.toString = function toString() {
  return flattenDeep([leftCurl, JsonRender.prototype.toString.apply(this), comma, `"value":"${stringify(this.value)}"`, rightCurl]).join('');
};

export default AddedNodeJsonRender;
