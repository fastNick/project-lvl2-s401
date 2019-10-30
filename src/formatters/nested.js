import { flattenDeep, isPlainObject } from 'lodash';

const paddingSymbol = ' ';
const paddingBeforeSign = 2;

const signsByNode = {
  deleted: '-',
  inserted: '+',
  'not changed': paddingSymbol,
  nested: paddingSymbol,
};
const beforeKeyString = nodeType => `${paddingSymbol.repeat(paddingBeforeSign)}${signsByNode[nodeType]}${paddingSymbol}`;

const getObjectProperty = (value, key, parentPadding) => [
  paddingSymbol.repeat(parentPadding + paddingBeforeSign),
  `${paddingSymbol} ${key}: ${value[key]}\n`];

const getLeftParentPadding = (renderNode) => {
  const iter = node => (node === null ? 0
    : beforeKeyString(renderNode.type).length + iter(node.parent));
  const parentPaddingLength = iter(renderNode.parent);
  return [paddingSymbol.repeat(parentPaddingLength), beforeKeyString(renderNode.type)].join('');
};

const stringifyObject = (renderNode) => {
  const parentPadding = getLeftParentPadding(renderNode).length;
  const properties = Object.keys(renderNode.value)
    .map(key => getObjectProperty(renderNode.value, key, parentPadding));
  const flattenProperties = flattenDeep(properties).join('');
  return `{\n${flattenProperties}${paddingSymbol.repeat(parentPadding)}}`;
};

const stringify = renderNode => (isPlainObject(renderNode.value)
  ? stringifyObject(renderNode) : renderNode.value);

const generateBaseString = renderNode => `${getLeftParentPadding(renderNode)}${renderNode.key}: ${stringify(renderNode)}\n`;

const stringifiersByType = ({
  changed(renderNode) {
    return [generateBaseString({ ...renderNode, value: renderNode.valueOld, type: 'deleted' }),
      generateBaseString({ ...renderNode, value: renderNode.valueNew, type: 'inserted' })];
  },
  deleted(renderNode) { return generateBaseString(renderNode); },
  inserted(renderNode) { return generateBaseString(renderNode); },
  nested(renderNode) {
    const children = renderNode.getChildren().map(child => this[child.type](child));
    return [
      getLeftParentPadding(renderNode),
      renderNode.key,
      ': {\n',
      ...children,
      getLeftParentPadding(renderNode),
      '}\n',
    ];
  },
  'not changed': function notChanged(renderNode) { return generateBaseString(renderNode); },
});

export default (rendersTree) => {
  const stringifiers = rendersTree.map(renderNode => stringifiersByType[renderNode
    .type](renderNode));
  return flattenDeep(['{\n', stringifiers, '}']).join('');
};
