
import DefaultRender from './DefaultRender';
import { removedSign, newLine } from './constants';

function RemovedNodeDefaultRender(node, parent) {
  DefaultRender.apply(this, [node, removedSign, parent]);
}

RemovedNodeDefaultRender.prototype.toString = function toString() {
  return [DefaultRender.prototype.toString.call(this), this.stringify(this.value), newLine].join('');
};

export default RemovedNodeDefaultRender;
