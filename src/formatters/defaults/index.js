import { flattenDeep } from 'lodash';
import { getNodeRender } from './helper';

const traverseTree = (tree, parent) => {
  const iter = (data, parentNode) => data.reduce((acc, node) => acc
    .concat(getNodeRender(node, iter, parentNode)),
  []);
  return flattenDeep(iter(tree, parent));
};

const renderDiff = AST => getNodeRender(AST.root, traverseTree).toString();

export default renderDiff;
