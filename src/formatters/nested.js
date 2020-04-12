import { flattenDeep, isPlainObject } from 'lodash';

const initialPaddingLength = 0;
const paddingBeforeSign = 2;

const signsByNode = {
  deleted: '-',
  inserted: '+',
  'not changed': ' ',
  nested: ' ',
};
const getBeforeKeyString = nodeType => `${' '.repeat(paddingBeforeSign)}${signsByNode[nodeType]} `;

const getObjectProperty = (value, key, parentPadding) => `${' '
  .repeat(parentPadding)}${getBeforeKeyString('not changed')}${key}: ${value[key]}\n`;

const stringifyObject = (nodeValue, parentPadding) => {
  const properties = Object.keys(nodeValue)
    .map(key => getObjectProperty(nodeValue, key, parentPadding));
  const flattenProperties = properties.join('');
  return `{\n${flattenProperties}${' '.repeat(parentPadding)}}`;
};

const generateBaseString = (key, initialPadding, type, nodeValue) => {
  const totalKeyPadding = getBeforeKeyString(type).length + initialPadding;
  const value = isPlainObject(nodeValue) ? stringifyObject(nodeValue, totalKeyPadding)
    : nodeValue;
  const beforeKey = ' '.repeat(initialPadding) + getBeforeKeyString(type);
  return `${beforeKey}${key}: ${value}\n`;
};

const rec = ([head, ...rest], initialPadding) => (head
  ? [stringifiersByType[head.type](head, initialPadding), ...rec(rest, initialPadding)] : []);

const stringifiersByType = ({
  deleted: (renderNode, initialPadding,
    value = renderNode.value) => generateBaseString(renderNode.key,
    initialPadding, renderNode.type, value),
  inserted: (renderNode, initialPadding,
    value = renderNode.value) => generateBaseString(renderNode.key,
    initialPadding, renderNode.type, value),
  changed: (renderNode, initialPadding) => [generateBaseString(renderNode.key, initialPadding, 'deleted', renderNode.valueOld),
    generateBaseString(renderNode.key, initialPadding, 'inserted', renderNode.valueNew)],
  nested: (renderNode, initialPadding) => {
    const totalPadding = getBeforeKeyString(renderNode.type).length + initialPadding;
    const children = rec(renderNode.children, totalPadding);
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
  'not changed': (renderNode, initialPadding) => generateBaseString(renderNode.key, initialPadding, renderNode.type, renderNode.value),
});

export default (ast) => {
  const stringifiers = ast.map(renderNode => stringifiersByType[renderNode
    .type](renderNode, initialPaddingLength));
  return flattenDeep(['{\n', stringifiers, '}']).join('');
};
