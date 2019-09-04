import RemovedNodeJsonRender from './RemovedNodeJsonRender';
import AddedNodeJsonRender from './AddedNodeJsonRender';
import UpdatedNodeJsonRender from './UpdatedNodeJsonRender';
import NodeWithChildrenJsonRender from './NodeWithChildrenJsonRender';
import NonUpdatedNodeJsonRender from './NonUpdatedNodeJsonRender';
import RootNodeJsonRender from './RootNodeJsonRender';

const formatsByASTNode = {
  RootNode: RootNodeJsonRender,
  NodeWithChildren: NodeWithChildrenJsonRender,
  UpdatedNode: UpdatedNodeJsonRender,
  NonUpdatedNode: NonUpdatedNodeJsonRender,
  RemovedNode: RemovedNodeJsonRender,
  AddedNode: AddedNodeJsonRender,
};

export default formatsByASTNode;
