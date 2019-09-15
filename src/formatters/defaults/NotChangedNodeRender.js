import Render from './Render';
import { newLine } from './constants';
import { stringify } from './generic';

function NotChangedNodeRender(node, parent) {
  this.value = node.value;
  Render.apply(this, [node, parent]);
}

NotChangedNodeRender.prototype.toString = function toString() {
  return [Render.prototype.toString.call(this), stringify(this.value, this), newLine].join('');
};

export default NotChangedNodeRender;
