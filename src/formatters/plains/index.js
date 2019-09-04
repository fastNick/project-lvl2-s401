import { flattenDeep } from 'lodash';
import NonUpdatedNode from '../../AST/nodes/NonUpdatedNode';
import formatsByASTNode from './generic';

export const getPlainRender = (node, parent, recursiveFunc) => {
  const astNode = node.constructor.name;
  const Render = formatsByASTNode[astNode];
  return new Render(node, parent, recursiveFunc);
};

const traverseTree = (tree, parentRenderNode) => {
  const iter = (data, parent) => data.reduce((acc, node) => (node instanceof NonUpdatedNode ? acc
    : acc
      .concat(getPlainRender(node, parent, iter))),
  []);
  return flattenDeep(iter(tree, parentRenderNode)).join('\n');
};

const render = AST => getPlainRender(AST.root, traverseTree).toString();

export default render;
