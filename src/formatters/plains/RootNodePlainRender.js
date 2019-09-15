import { flattenDeep } from 'lodash';
import PlainRender from './PlainRender';

function RootNodePlainRender(node, recursiveFunc) {
  this.parentRenderNode = null;
  this.children = recursiveFunc(node, this);
  PlainRender.apply(this, [node, this.parentRenderNode]);
}

RootNodePlainRender.prototype.toString = function toString() {
  return flattenDeep(this.children.filter(x => x.constructor.name !== 'NotChangedNodeRender').map(x => x.toString())).join('\n');
};

export default RootNodePlainRender;
