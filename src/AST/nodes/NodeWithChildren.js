import Node from './Node';

export default function NodeWithChildren(key, children) {
  Node.apply(this, [{ key, children }]);
}
