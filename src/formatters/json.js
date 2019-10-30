import { isPlainObject } from 'lodash';

const pathSeparator = '>>';
const complexValue = '[complex value]';


const getPath = renderNode => (renderNode.parent !== null ? [getPath(renderNode.parent),
  renderNode.key]
  .join(pathSeparator) : renderNode.key);

const generateBaseString = renderNode => (
  {
    name: `${renderNode.key}`,
    type: `${renderNode.type}`,
    path: `${getPath(renderNode)}`,
  });

const stringify = value => (isPlainObject(value) ? complexValue : value);

const stringifiersByNodeType = {
  nested(renderNode) {
    const children = renderNode.getChildren().map(x => this[x.type](x));
    return {
      ...generateBaseString(renderNode),
      children,
    };
  },
  changed(renderNode) {
    return {
      ...generateBaseString(renderNode),
      valueBefore: `${renderNode.valueOld}`,
      valueAfter: `${renderNode.valueNew}`,
    };
  },
  deleted(renderNode) {
    return {
      ...generateBaseString(renderNode),
      value: `${stringify(renderNode.value)}`,
    };
  },
  inserted(renderNode) {
    return {
      ...generateBaseString(renderNode),
      value: `${stringify(renderNode.value)}`,
    };
  },
  'not changed': function notChanged(renderNode) {
    return {
      ...generateBaseString(renderNode),
      value: `${stringify(renderNode.value)}`,
    };
  },
};

export default (rendersTree) => {
  const objects = rendersTree
    .map(renderNode => stringifiersByNodeType[renderNode.type](renderNode));
  return JSON.stringify(objects);
};
