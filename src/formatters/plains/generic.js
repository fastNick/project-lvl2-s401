import RemovedNodePlainRender from './RemovedNodePlainRender';
import AddedNodePlainRender from './AddedNodePlainRender';
import UpdatedNodePlainRender from './UpdatedNodePlainRender';
import NodeWithChildrenPlainRender from './NodeWithChildrenPlainRender';
import NotChangedNodeRender from './NotChangedNodeRender';

const formatsByASTNode = {
  nested: NodeWithChildrenPlainRender,
  changed: UpdatedNodePlainRender,
  deleted: RemovedNodePlainRender,
  inserted: AddedNodePlainRender,
  'not changed': NotChangedNodeRender,
};

export default formatsByASTNode;
