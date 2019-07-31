import Render from './Render';
import { stringify } from './helper';
import { addedSign } from './constants';

function AddedNodeRender(parentSign, depth, key, value) {
  Render.apply(this, [parentSign, depth, addedSign, key]);
  this.value = value;
}

AddedNodeRender.prototype.toString = function toString() {
  return Render.prototype.toString.call(this).concat(`${stringify(this.value, addedSign, this.depth + 1)}\n`).join('');
};

export default AddedNodeRender;
