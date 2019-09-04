import RemovedNodePlainRender from './RemovedNodePlainRender';
import AddedNodePlainRender from './AddedNodePlainRender';
import UpdatedNodePlainRender from './UpdatedNodePlainRender';
import NodeWithChildrenPlainRender from './NodeWithChildrenPlainRender';
import RootNodePlainRender from './RootNodePlainRender';

const formatsByASTNode = {
  RootNode: RootNodePlainRender,
  NodeWithChildren: NodeWithChildrenPlainRender,
  UpdatedNode: UpdatedNodePlainRender,
  RemovedNode: RemovedNodePlainRender,
  AddedNode: AddedNodePlainRender,
};

export default formatsByASTNode;
