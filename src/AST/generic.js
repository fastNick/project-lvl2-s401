import {
  has,
} from 'lodash';
import { buildInnerNode, buildRootNode } from './nodes';
import AST from './AST';

export const buildAst = rootNode => new AST(rootNode);

export const sort = (ASTree) => {
  const iter = tree => tree
    .sort((x, y) => x.key.localeCompare(y.key))
    .map(node => (node.children.length
      ? new node.constructor(node.key, iter(node.children.slice())) : node));
  const sortedInnerNodes = iter(ASTree.root.children);
  const rootNode = buildRootNode(sortedInnerNodes);
  return buildAst(rootNode);
};

export const buildASTInnerNodes = (beforeObject, afterObject, parentNode) => {
  const firstAcc = Object.keys(beforeObject)
    .reduce((acc, key) => acc
      .concat(buildInnerNode(beforeObject, afterObject, key, buildASTInnerNodes, parentNode)),
    []);

  return Object.keys(afterObject)
    .filter(key => !has(beforeObject, key))
    .reduce((acc, key) => acc
      .concat(buildInnerNode(beforeObject, afterObject, key, buildASTInnerNodes, parentNode)),
    firstAcc);
};
