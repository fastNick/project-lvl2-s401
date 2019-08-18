
import DefaultRender from './DefaultRender';
import RemovedNodeDefaultRender from './RemovedNodeDefaultRender';
import AddedNodeDefaultRender from './AddedNodeDefaultRender';
import { removedSign } from './constants';

function UpdatedNodeDefaultRender(node, parent) {
  DefaultRender.apply(this, [node, removedSign, parent]);
  this.valueBefore = node.valueBefore;
  this.valueAfter = node.valueAfter;
}

UpdatedNodeDefaultRender.prototype.toString = function toString() {
  return [new RemovedNodeDefaultRender({ key: this.key, value: this.valueBefore }, this.parent),
    new AddedNodeDefaultRender({ key: this.key, value: this.valueAfter }, this.parent)].join('');
};

export default UpdatedNodeDefaultRender;
