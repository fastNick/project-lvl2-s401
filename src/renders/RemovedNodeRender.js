import Render from './Render';
import { stringify } from './helper';
import { removedSign } from './constants';

function RemovedNodeRender(parentSign, depth, key, value) {
  Render.apply(this, [parentSign, depth, removedSign, key]);
  this.value = value;
}

RemovedNodeRender.prototype.toString = function toString() {
  return Render.prototype.toString.call(this).concat(`${stringify(this.value, removedSign, this.depth + 1)}\n`).join('');
};

export default RemovedNodeRender;
