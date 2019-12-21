import { flattenDeep } from 'lodash';

const complexValue = '[complex value]';

const getPath = (renderNode, initialPath) => (initialPath ? initialPath.concat(`.${renderNode.key}`) : renderNode.key);

const stringifyMapper = {
  object: () => complexValue,
  string: value => `'${value}'`,
};
const stringify = value => (stringifyMapper[typeof value] ? stringifyMapper[typeof value](value)
  : value);

const stringifiersByNodeType = ({
  changed: (renderNode, initialPath) => {
    const path = `${getPath(renderNode, initialPath)}`;
    const valueOld = stringify(renderNode.valueOld);
    const valueNew = stringify(renderNode.valueNew);
    return `Property '${path}' was updated. From ${valueOld} to ${valueNew}`;
  },
  deleted: (renderNode, initialPath) => {
    const path = `${getPath(renderNode, initialPath)}`;
    return `Property '${path}' was removed`;
  },
  inserted: (renderNode, initialPath) => {
    const path = `${getPath(renderNode, initialPath)}`;
    const stringifiedValue = stringify(renderNode.value);
    return `Property '${path}' was added with value: ${stringifiedValue}`;
  },
  nested: (renderNode, initialPath) => {
    const path = `${getPath(renderNode, initialPath)}`;
    return renderNode.children.filter(x => x.type !== 'not changed')
      .map(child => stringifiersByNodeType[child.type](child, path));
  },
});


export default (ast) => {
  const stringifiers = ast
    .map(renderNode => stringifiersByNodeType[renderNode.type](renderNode));
  return flattenDeep(stringifiers).join('\n');
};
