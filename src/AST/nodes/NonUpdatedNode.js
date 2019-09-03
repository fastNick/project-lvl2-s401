import Node from './Node';

export default function NonUpdatedNode(key, value) {
  Node.apply(this, [{ key, value }]);
}
