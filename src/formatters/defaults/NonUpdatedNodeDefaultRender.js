
import DefaultRender from './DefaultRender';
import { nonUpdatedSign, newLine } from './constants';

function NonUpdatedNodeDefaultRender(node, parent) {
  DefaultRender.apply(this, [node, nonUpdatedSign, parent]);
}

NonUpdatedNodeDefaultRender.prototype.toString = function toString() {
  return [DefaultRender.prototype.toString.call(this), this.stringify(this.value), newLine].join('');
};

export default NonUpdatedNodeDefaultRender;
