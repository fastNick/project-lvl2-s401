import Node from './Node';

export default function AddedNode(key, value) {
  Node.apply(this, [{ key, value }]);
}
