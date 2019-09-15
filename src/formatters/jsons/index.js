import formatsByASTNode from './generic';
import RootNodeJsonRender from './RootNodeJsonRender';


const getJsonRender = (node, recursiveFunc, parentRenderNode) => {
  if (node instanceof Array) {
    return new RootNodeJsonRender(node, recursiveFunc);
  }
  const astNode = node.name;
  const Render = formatsByASTNode[astNode];
  return new Render(node, parentRenderNode, recursiveFunc);
};

const traverseTree = (ast, parent) => ast.map(node => getJsonRender(node, traverseTree, parent));

const render = (AST) => {
  const result = getJsonRender(AST, traverseTree).toString();
  return JSON.stringify(JSON.parse(result));
};

export default render;
