import Node from './Node';

export default function NonUpdatedNode(key, value, parent) {
  Node.apply(this, [{ key, value, parent }]);
}
