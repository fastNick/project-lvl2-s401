import { flattenDeep } from 'lodash';
import RemovedNodeJsonRender from './RemovedNodeJsonRender';
import AddedNodeJsonRender from './AddedNodeJsonRender';
import UpdatedNodeJsonRender from './UpdatedNodeJsonRender';
import NodeWithChildrenJsonRender from './NodeWithChildrenJsonRender';
import NonUpdatedNodeJsonRender from './NonUpdatedNodeJsonRender';
import RootNodeJsonRender from './RootNodeJsonRender';

const getPlainRender = (node, parentRenderNode, recursiveFunc) => {
  switch (node.constructor.name) {
    case 'RootNode':
      return new RootNodeJsonRender(node, parentRenderNode, recursiveFunc);
    case 'NodeWithChildren':
      return new NodeWithChildrenJsonRender(node, parentRenderNode, recursiveFunc);
    case 'UpdatedNode':
      return new UpdatedNodeJsonRender(node, parentRenderNode);
    case 'NonUpdatedNode':
      return new NonUpdatedNodeJsonRender(node, parentRenderNode);
    case 'RemovedNode':
      return new RemovedNodeJsonRender(node, parentRenderNode);
    case 'AddedNode':
      return new AddedNodeJsonRender(node, parentRenderNode);
    default:
      throw new Error('Unsupported type of render');
  }
};

const traverseTree = (tree, parent) => {
  const iter = (data, parentNode) => data.reduce((acc, node) => acc
    .concat(getPlainRender(node, parentNode, iter)),
  []);
  return flattenDeep(iter(tree, parent)).join(',');
};

const renderDiff = (AST) => {
  const result = getPlainRender(AST.root, traverseTree).toString();
  return JSON.stringify(JSON.parse(result));
};

export default renderDiff;
