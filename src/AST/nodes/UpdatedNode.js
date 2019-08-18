import Node from './Node';

export default function UpdatedNode(key, valueBefore, valueAfter, parent) {
  Node.apply(this, [{ key, parent }]);
  this.valueBefore = valueBefore;
  this.valueAfter = valueAfter;
}
