import Node from './Node';

export default function RemovedNode(key, value, parent) {
  Node.apply(this, [{ key, value, parent }]);
}
