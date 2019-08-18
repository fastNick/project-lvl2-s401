
import DefaultRender from './DefaultRender';
import { addedSign, newLine } from './constants';

function AddedNodeDefaultRender(node, parent) {
  DefaultRender.apply(this, [node, addedSign, parent]);
}

AddedNodeDefaultRender.prototype.toString = function toString() {
  return [DefaultRender.prototype.toString.call(this), this.stringify(this.value), newLine].join('');
};

export default AddedNodeDefaultRender;
