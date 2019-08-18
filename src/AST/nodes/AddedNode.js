import Node from './Node';

export default function AddedNode(key, value, parent) {
  Node.apply(this, [{ key, value, parent }]);
}
