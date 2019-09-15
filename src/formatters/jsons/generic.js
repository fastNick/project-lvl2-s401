import RemovedNodeJsonRender from './RemovedNodeJsonRender';
import AddedNodeJsonRender from './AddedNodeJsonRender';
import UpdatedNodeJsonRender from './UpdatedNodeJsonRender';
import NodeWithChildrenJsonRender from './NodeWithChildrenJsonRender';
import NonUpdatedNodeJsonRender from './NonUpdatedNodeJsonRender';

const formatsByASTNode = {
  nested: NodeWithChildrenJsonRender,
  changed: UpdatedNodeJsonRender,
  'not changed': NonUpdatedNodeJsonRender,
  deleted: RemovedNodeJsonRender,
  inserted: AddedNodeJsonRender,
};

export default formatsByASTNode;
