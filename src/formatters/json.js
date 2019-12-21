import { isPlainObject } from 'lodash';

const complexValue = '[complex value]';


const getPath = (renderNode, initialPath) => (initialPath ? initialPath.concat(`>>${renderNode.key}`) : renderNode.key);


const stringify = value => (isPlainObject(value) ? complexValue : value);

const stringifiersByNodeType = {
  nested: (renderNode, initialPath) => {
    const path = `${getPath(renderNode, initialPath)}`;
    const children = renderNode.children.map(x => stringifiersByNodeType[x.type](x, path));
    return {
      name: `${renderNode.key}`,
      type: `${renderNode.type}`,
      path,
      children,
    };
  },
  changed: (renderNode, initialPath) => ({
    name: `${renderNode.key}`,
    type: `${renderNode.type}`,
    path: `${getPath(renderNode, initialPath)}`,
    valueBefore: `${renderNode.valueOld}`,
    valueAfter: `${renderNode.valueNew}`,
  }),
  deleted: (renderNode, initialPath) => ({
    name: `${renderNode.key}`,
    type: `${renderNode.type}`,
    path: `${getPath(renderNode, initialPath)}`,
    value: `${stringify(renderNode.value)}`,
  }),
  inserted: (renderNode, initialPath) => ({
    name: `${renderNode.key}`,
    type: `${renderNode.type}`,
    path: `${getPath(renderNode, initialPath)}`,
    value: `${stringify(renderNode.value)}`,
  }),
  'not changed': (renderNode, initialPath) => ({
    name: `${renderNode.key}`,
    type: `${renderNode.type}`,
    path: `${getPath(renderNode, initialPath)}`,
    value: `${stringify(renderNode.value)}`,
  }),
};

export default (ast) => {
  const stringifiers = ast
    .map(renderNode => stringifiersByNodeType[renderNode.type](renderNode));
  return JSON.stringify(stringifiers);
};
