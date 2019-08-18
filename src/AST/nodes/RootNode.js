import Node from './Node';

export default function RootNode(children, parent = null) {
  Node.apply(this, [{ children, parent }]);
}
