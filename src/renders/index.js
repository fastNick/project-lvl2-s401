import RemovedNodeRender from './RemovedNodeRender';
import AddedNodeRender from './AddedNodeRender';
import NodeWithChildrenRender from './NodeWithChildrenRender';
import NonUpdatedNodeRender from './NonUpdatedNodeRender';
import { nonUpdatedSign } from './constants';

const getRender = (node, recursiveFunc, depth = 1, parentSign = nonUpdatedSign) => {
  const {
    key, value, children, valueBefore, valueAfter,
  } = node;
  switch (node.constructor.name) {
    case 'NodeWithChildren':
      return (new NodeWithChildrenRender(parentSign, depth, key, children,
        recursiveFunc)).toString();
    case 'UpdatedNode':
      return [`${new RemovedNodeRender(parentSign, depth, key, valueBefore)}`,
        `${new AddedNodeRender(parentSign, depth, key, valueAfter)}`];
    case 'NonUpdatedNode':
      return `${new NonUpdatedNodeRender(parentSign, depth, key, value)}`;
    case 'RemovedNode':
      return `${new RemovedNodeRender(parentSign, depth, key, value)}`;
    case 'AddedNode':
      return `${new AddedNodeRender(parentSign, depth, key, value)}`;
    default:
      throw new Error('Unsupported type of render');
  }
};


export default getRender;
