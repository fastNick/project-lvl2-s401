import { flattenDeep } from 'lodash';
import formatsByASTNode from './generic';


const getPlainRender = (node, parentRenderNode, recursiveFunc) => {
  const astNode = node.constructor.name;
  const Render = formatsByASTNode[astNode];
  return new Render(node, parentRenderNode, recursiveFunc);
};

const traverseTree = (tree, parent) => {
  const iter = (data, parentNode) => data.reduce((acc, node) => acc
    .concat(getPlainRender(node, parentNode, iter)),
  []);
  return flattenDeep(iter(tree, parent)).join(',');
};

const render = (AST) => {
  const result = getPlainRender(AST.root, traverseTree).toString();
  return JSON.stringify(JSON.parse(result));
};

export default render;
