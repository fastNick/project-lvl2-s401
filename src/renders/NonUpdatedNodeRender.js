import Render from './Render';
import { stringify } from './helper';
import { nonUpdatedSign } from './constants';

function NonUpdatedNodeRender(parentSign, depth, key, value) {
  Render.apply(this, [parentSign, depth, nonUpdatedSign, key]);
  this.value = value;
}

NonUpdatedNodeRender.prototype.toString = function toString() {
  return Render.prototype.toString.call(this).concat(`${stringify(this.value, nonUpdatedSign, this.depth + 1)}\n`).join('');
};

export default NonUpdatedNodeRender;
