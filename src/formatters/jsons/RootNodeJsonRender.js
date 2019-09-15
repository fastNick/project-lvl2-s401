
import JsonRender from './JsonRender';
import {
  rightArrayBracket, leftArrayBracket,
} from './constants';

function RootNodeJsonRender(node, recursiveFunc) {
  this.parentRenderNode = null;
  JsonRender.apply(this, [node, this.parentRenderNode]);
  this.children = recursiveFunc(node, this);
}

RootNodeJsonRender.prototype.toString = function toString() {
  return [leftArrayBracket, this.children, rightArrayBracket].join('');
};

export default RootNodeJsonRender;
