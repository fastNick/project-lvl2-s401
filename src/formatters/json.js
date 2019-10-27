import { isPlainObject } from 'lodash';

const pathSeparator = '>>';
const complexValue = '[complex value]';


const getPath = nodeFormatter => (nodeFormatter.parent !== null ? [getPath(nodeFormatter.parent),
  nodeFormatter.key]
  .join(pathSeparator) : nodeFormatter.key);

const generateBaseString = nodeFormatter => (
  {
    name: `${nodeFormatter.key}`,
    type: `${nodeFormatter.type}`,
    path: `${getPath(nodeFormatter)}`,
  });

const stringify = value => (isPlainObject(value) ? complexValue : value);

const stringifiersByNodeType = {
  nested(nodeFormatter) {
    const children = nodeFormatter.getChildren().map(x => this[x.type](x));
    return {
      ...generateBaseString(nodeFormatter),
      children,
    };
  },
  changed(nodeFormatter) {
    return {
      ...generateBaseString(nodeFormatter),
      valueBefore: `${nodeFormatter.valueOld}`,
      valueAfter: `${nodeFormatter.valueNew}`,
    };
  },
  deleted(nodeFormatter) {
    return {
      ...generateBaseString(nodeFormatter),
      value: `${stringify(nodeFormatter.value)}`,
    };
  },
  inserted(nodeFormatter) {
    return {
      ...generateBaseString(nodeFormatter),
      value: `${stringify(nodeFormatter.value)}`,
    };
  },
  'not changed': function notChanged(nodeFormatter) {
    return {
      ...generateBaseString(nodeFormatter),
      value: `${stringify(nodeFormatter.value)}`,
    };
  },
};

const jsonFormatter = (stringifiersTree) => {
  const objects = stringifiersTree
    .map(nodeFormatter => stringifiersByNodeType[nodeFormatter.type](nodeFormatter));
  return JSON.stringify(objects);
};

export default jsonFormatter;
