import {
  has, flattenDeep,
} from 'lodash';
import { readFileSync } from 'fs';
import { join as buildPath, isAbsolute as isPathAbsolute, resolve } from 'path';
import getParser from './parsers';
import getRender from '../renders';
import buildNode from '../nodes';

const comparisonFilesPath = buildPath(__dirname, '../../', 'comparison__files');

export const getDataFromFile = (filePath) => {
  try {
    if (!isPathAbsolute(filePath)) {
      const fullFilePath = buildPath(comparisonFilesPath, filePath);
      return readFileSync(fullFilePath, 'utf8');
    }
    const absoluteFilePath = resolve(filePath);
    return readFileSync(absoluteFilePath, 'utf8');
  } catch (err) {
    console.log(`Error: ${err}`);
    return 'Error';
  }
};

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

export const calculateDiff = (beforeFile, afterFile) => {
  const mainObj1 = getParser(beforeFile)(getDataFromFile(beforeFile));
  const mainObj2 = getParser(beforeFile)(getDataFromFile(afterFile));
  return getObjectDiff(mainObj1, mainObj2);
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
