import Node from './Node';

export default function UpdatedNode(key, valueBefore, valueAfter) {
  Node.apply(this, [{ key }]);
  this.valueBefore = valueBefore;
  this.valueAfter = valueAfter;
}
