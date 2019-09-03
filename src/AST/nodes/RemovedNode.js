import Node from './Node';

export default function RemovedNode(key, value) {
  Node.apply(this, [{ key, value }]);
}
