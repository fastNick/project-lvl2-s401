import { flattenDeep } from 'lodash';
import RemovedNodePlainRender from './RemovedNodePlainRender';
import AddedNodePlainRender from './AddedNodePlainRender';
import UpdatedNodePlainRender from './UpdatedNodePlainRender';
import NodeWithChildrenPlainRender from './NodeWithChildrenPlainRender';
import RootNodePlainRender from './RootNodePlainRender';
import NonUpdatedNode from '../../AST/nodes/NonUpdatedNode';

const getPlainRender = (node, parentRenderNode, recursiveFunc) => {
  switch (node.constructor.name) {
    case 'RootNode':
      return new RootNodePlainRender(node, parentRenderNode, recursiveFunc);
    case 'NodeWithChildren':
      return new NodeWithChildrenPlainRender(node, parentRenderNode, recursiveFunc);
    case 'UpdatedNode': {
      return new UpdatedNodePlainRender(node, parentRenderNode); }
    case 'RemovedNode':
      return new RemovedNodePlainRender(node, parentRenderNode);
    case 'AddedNode':
      return new AddedNodePlainRender(node, parentRenderNode);
    default:
      throw new Error('Unsupported type of render');
  }
};

const traverseTree = (tree, parentRenderNode) => {
  const iter = (data, parent) => data.reduce((acc, node) => (node instanceof NonUpdatedNode ? acc
    : acc
      .concat(getPlainRender(node, parent, iter))),
  []);
  return flattenDeep(iter(tree, parentRenderNode)).join('\n');
};

const renderDiff = AST => getPlainRender(AST.root, traverseTree).toString();

export default renderDiff;
