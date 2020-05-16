import { flattenDeep, isPlainObject } from 'lodash';

const paddingBeforeSign = 2;

const signsByNode = {
  deleted: '-',
  inserted: '+',
  'not changed': ' ',
  nested: ' ',
};
const getBeforeKeyString = (nodeType) => `${' '.repeat(paddingBeforeSign)}${signsByNode[nodeType]} `;

const getObjectProperty = (value, key, parentPadding) => `${' '
  .repeat(parentPadding)}${getBeforeKeyString('not changed')}${key}: ${value[key]}\n`;

const stringifyObject = (node, initialPadding) => {
  const parentPadding = getBeforeKeyString(node.type).length + initialPadding;
  const flattenProperties = Object.keys(node.value)
    .map((key) => getObjectProperty(node.value, key, parentPadding)).join('');
  return `{\n${flattenProperties}${' '.repeat(parentPadding)}}`;
};

const generateBaseString = (node, initialPadding) => {
  const value = isPlainObject(node.value) ? stringifyObject(node, initialPadding)
    : node.value;
  const beforeKey = ' '.repeat(initialPadding) + getBeforeKeyString(node.type);
  return `${beforeKey}${node.key}: ${value}\n`;
};

const rec = ([head, ...rest], stringifiersByTypeObject, initialPadding = 0) => (head
  ? [stringifiersByTypeObject[head.type](head, initialPadding),
    ...rec(rest, stringifiersByTypeObject, initialPadding)] : []);

const stringifiersByType = ({
  deleted: (renderNode, initialPadding) => generateBaseString(renderNode, initialPadding),
  inserted: (renderNode, initialPadding) => generateBaseString(renderNode, initialPadding),
  'not changed': (renderNode, initialPadding) => generateBaseString(renderNode, initialPadding),
  changed: (renderNode, initialPadding) => [
    generateBaseString({ key: renderNode.key, type: 'deleted', value: renderNode.valueOld }, initialPadding),
    generateBaseString({ key: renderNode.key, type: 'inserted', value: renderNode.valueNew }, initialPadding),
  ],
  nested: (renderNode, initialPadding) => {
    const totalPadding = getBeforeKeyString(renderNode.type).length + initialPadding;
    const children = rec(renderNode.children, stringifiersByType, totalPadding);
    return [
      ' '.repeat(initialPadding),
      getBeforeKeyString(renderNode.type),
      renderNode.key,
      ': {\n',
      ...children,
      ' '.repeat(initialPadding),
      getBeforeKeyString(renderNode.type),
      '}\n',
    ];
  },
});

export default (ast) => {
  const stringifiers = rec(ast, stringifiersByType);
  return flattenDeep(['{\n', stringifiers, '}']).join('');
};
