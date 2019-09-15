import formatsByASTNode from './generic';
import RootNodePlainRender from './RootNodePlainRender';

export const getPlainRender = (node, recursiveFunc, parent) => {
  if (node instanceof Array) {
    return new RootNodePlainRender(node, recursiveFunc);
  }
  const astNode = node.name;
  const Render = formatsByASTNode[astNode];
  return new Render(node, parent, recursiveFunc);
};

const traverseTree = (ast, parent) => ast.map(node => getPlainRender(node, traverseTree, parent));


const render = AST => getPlainRender(AST, traverseTree).toString();

export default render;
