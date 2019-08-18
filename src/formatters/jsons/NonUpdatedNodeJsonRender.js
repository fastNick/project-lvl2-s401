
import { flattenDeep } from 'lodash';
import JsonRender from './JsonRender';
import { leftCurl, rightCurl } from './constants';


function NonUpdatedNodeJsonRender(node, parentRenderNode) {
  JsonRender.apply(this, [node, parentRenderNode]);
}

NonUpdatedNodeJsonRender.prototype.toString = function toString() {
  return flattenDeep([leftCurl, JsonRender.prototype.toString.apply(this), rightCurl]).join('');
};

export default NonUpdatedNodeJsonRender;
