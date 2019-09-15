
import Render from './Render';
import DeletedNodeRender from './DeletedNodeRender';
import InsertedNodeRender from './InsertedNodeRender';

function ChangedNodeRender(node, parent) {
  Render.apply(this, [node, parent]);
  this.valueBefore = node.value.old;
  this.valueAfter = node.value.new;
}

ChangedNodeRender.prototype.toString = function toString() {
  return [new DeletedNodeRender({ key: this.key, value: this.valueBefore }, this.parent),
    new InsertedNodeRender({ key: this.key, value: this.valueAfter }, this.parent)].join('');
};

export default ChangedNodeRender;
