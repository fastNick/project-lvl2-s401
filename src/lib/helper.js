import {
  has, flattenDeep,
} from 'lodash';
import getParser from '../parsers';
import getRender from '../renders';
import buildNode from '../nodes';


const getObjectDiff = (beforeObject, afterObject) => {
  const firstAcc = Object.keys(beforeObject)
    .reduce((acc, key) => acc
      .concat(buildNode(beforeObject, afterObject, key, getObjectDiff)),
    []);

  return Object.keys(afterObject)
    .filter(key => !has(beforeObject, key))
    .reduce((acc, key) => acc
      .concat(buildNode(beforeObject, afterObject, key, getObjectDiff)),
    firstAcc);
};

export const calculateDiff = (beforeSource, afterSource) => {
  const beforeObject = getParser(beforeSource);
  const afterObject = getParser(afterSource);
  return getObjectDiff(beforeObject, afterObject);
};


const sort = (data) => {
  const iter = tree => tree
    .sort((x, y) => x.key.localeCompare(y.key))
    .map(node => (node.children.length
      ? new node.constructor(node.key, iter(node.children.slice())) : node));

  return iter(data);
};

export const renderDiff = (data) => {
  const sortedData = sort(data);
  const iter = (tree, depth = 1, currentSign) => tree.reduce((acc, node) => acc
    .concat(getRender(node, iter, depth, currentSign)),
  []);
  return flattenDeep(['{\n'].concat(iter(sortedData)).concat(['}'])).join('');
};
