import { flattenDeep, isPlainObject } from 'lodash';

const initialPaddingLength = 0;
const paddingSymbol = ' ';
const paddingBeforeSign = 2;

const signsByNode = {
  deleted: '-',
  inserted: '+',
  'not changed': paddingSymbol,
  nested: paddingSymbol,
};
const getBeforeKeyString = nodeType => `${paddingSymbol.repeat(paddingBeforeSign)}${signsByNode[nodeType]}${paddingSymbol}`;

const getObjectProperty = (value, key, parentPadding) => `${paddingSymbol
  .repeat(parentPadding)}${getBeforeKeyString('not changed')}${key}: ${value[key]}\n`;

const stringifyObject = (renderNode, parentPadding) => {
  const properties = Object.keys(renderNode.value)
    .map(key => getObjectProperty(renderNode.value, key, parentPadding));
  const flattenProperties = properties.join('');
  return `{\n${flattenProperties}${paddingSymbol.repeat(parentPadding)}}`;
};

const generateBaseString = (renderNode, initialPadding) => {
  const totalKeyPadding = getBeforeKeyString(renderNode.type).length + initialPadding;
  const value = isPlainObject(renderNode.value) ? stringifyObject(renderNode, totalKeyPadding)
    : renderNode.value;
  const beforeKey = paddingSymbol.repeat(initialPadding) + getBeforeKeyString(renderNode.type);
  return `${beforeKey}${renderNode.key}: ${value}\n`;
};

const stringifiersByType = ({
  changed: (renderNode, initialPadding) => [generateBaseString({ ...renderNode, value: renderNode.valueOld, type: 'deleted' }, initialPadding),
    generateBaseString({ ...renderNode, value: renderNode.valueNew, type: 'inserted' }, initialPadding)],
  deleted: (renderNode, initialPadding) => generateBaseString(renderNode, initialPadding),
  inserted: (renderNode, initialPadding) => generateBaseString(renderNode, initialPadding),
  nested: (renderNode, initialPadding) => {
    const totalPadding = getBeforeKeyString(renderNode.type).length + initialPadding;
    const children = renderNode
      .children.map(child => stringifiersByType[child.type](child, totalPadding));
    return [
      paddingSymbol.repeat(initialPadding),
      getBeforeKeyString(renderNode.type),
      renderNode.key,
      ': {\n',
      ...children,
      paddingSymbol.repeat(initialPadding),
      getBeforeKeyString(renderNode.type),
      '}\n',
    ];
  },
  'not changed': (renderNode, initialPadding) => generateBaseString(renderNode, initialPadding),
});

export default (ast) => {
  const stringifiers = ast.map(renderNode => stringifiersByType[renderNode
    .type](renderNode, initialPaddingLength));
  return flattenDeep(['{\n', stringifiers, '}']).join('');
};
