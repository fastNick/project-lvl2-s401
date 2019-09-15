import getDefaultRender from './helper';

const traverseTree = (ast, parent) => ast.map(node => getDefaultRender(node, traverseTree, parent));

const render = AST => getDefaultRender(AST, traverseTree).toString();

export default render;
