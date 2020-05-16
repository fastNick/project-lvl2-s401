import { isPlainObject } from 'lodash';

const complexValue = '[complex value]';


const getPath = (renderNode, initialPath) => (initialPath ? initialPath.concat(`>>${renderNode.key}`) : renderNode.key);

const stringify = (value) => (isPlainObject(value) ? complexValue : value);

const rec = ([head, ...rest], stringifiersByTypeObject, path) => (head
  ? [stringifiersByTypeObject[head.type](head, path),
    ...rec(rest, stringifiersByTypeObject, path)] : []);

const stringifiersByNodeType = {
  nested: (renderNode, initialPath) => {
    const path = `${getPath(renderNode, initialPath)}`;
    const children = rec(renderNode.children, stringifiersByNodeType, path);
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
  const stringifiers = rec(ast, stringifiersByNodeType);
  return JSON.stringify(stringifiers);
};
