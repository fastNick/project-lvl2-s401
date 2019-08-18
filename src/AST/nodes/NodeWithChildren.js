import Node from './Node';

export default function NodeWithChildren(key, children, parent) {
  Node.apply(this, [{ key, children, parent }]);
}
