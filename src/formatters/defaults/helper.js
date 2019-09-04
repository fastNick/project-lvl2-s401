import RemovedNodeDefaultRender from './RemovedNodeDefaultRender';
import AddedNodeDefaultRender from './AddedNodeDefaultRender';
import NodeWithChildrenDefaultRender from './NodeWithChildrenDefaultRender';
import NonUpdatedNodeDefaultRender from './NonUpdatedNodeDefaultRender';
import RootNodeDefaultRender from './RootNodeDefaultRender';
import UpdatedNodeDefaultRender from './UpdatedNodeDefaultRender';


const formatsByASTNode = {
  RootNode: RootNodeDefaultRender,
  NodeWithChildren: NodeWithChildrenDefaultRender,
  UpdatedNode: UpdatedNodeDefaultRender,
  NonUpdatedNode: NonUpdatedNodeDefaultRender,
  RemovedNode: RemovedNodeDefaultRender,
  AddedNode: AddedNodeDefaultRender,
};

const getNodeRender = (node, recursiveFunc, parent) => {
  const astNode = node.constructor.name;
  const Render = formatsByASTNode[astNode];
  return new Render(node, parent, recursiveFunc);
};

export default getNodeRender;
