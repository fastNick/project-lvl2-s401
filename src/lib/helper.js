import { has } from 'lodash';
import { readFileSync } from 'fs';
import { join as buildPath, isAbsolute as isPathAbsolute, resolve } from 'path';
import getParser from './parsers';

const testDirPath = buildPath(__dirname, '../../', 'comparison_files');

export const getDataFromFile = (filePath) => {
  try {
    if (!isPathAbsolute(filePath)) {
      const fullFilePath = buildPath(testDirPath, filePath);
      return readFileSync(fullFilePath, 'utf8');
    }
    const absoluteFilePath = resolve(filePath);
    return readFileSync(absoluteFilePath, 'utf8');
  } catch (err) {
    console.log(`Error: ${err}`);
    return 'Error';
  }
};

const propertySymbol = {
  remove: '-',
  add: '+',
  same: ' ',
};

const generatePropertyInDiff = (before, after, currentKey, beforeSymbol, afterSymbol) => {
  if (has(after, currentKey)) {
    return before[currentKey] === after[currentKey]
      ? { [`${propertySymbol.same}${currentKey}`]: before[currentKey] }
      : { [`${beforeSymbol}${currentKey}`]: before[currentKey], [`${afterSymbol}${currentKey}`]: after[currentKey] };
  }
  return { [`${beforeSymbol}${currentKey}`]: before[currentKey] };
};

const calculateDifferenceForOneFile = (beforeJson, afterJson, beforeSymbol, afterSymbol) => Object
  .keys(beforeJson).reduce((acc, currentKey) => ({
    ...acc,
    ...generatePropertyInDiff(beforeJson, afterJson, currentKey, beforeSymbol, afterSymbol),
  }), {});

export const calculateDifferenceForTwoFiles = (beforeFile, afterFile) => {
  const beforeJson = getParser(beforeFile)(getDataFromFile(beforeFile));
  const afterJson = getParser(beforeFile)(getDataFromFile(afterFile));
  return {
    ...calculateDifferenceForOneFile(beforeJson, afterJson,
      propertySymbol.remove, propertySymbol.add),
    ...calculateDifferenceForOneFile(afterJson, beforeJson,
      propertySymbol.add, propertySymbol.remove),
  };
};


const separateSign = (row) => {
  if (row.startsWith(propertySymbol.remove)) {
    return [propertySymbol.remove, row.slice(1).trim()];
  }
  if (row.startsWith(propertySymbol.add)) {
    return [propertySymbol.add, row.slice(1).trim()];
  }
  return [propertySymbol.same, row.trim()];
};

const convertProperDiffFileToArray = properDiffFile => properDiffFile.split('\n').filter(row => row !== '{' && row !== '}')
  .map((row) => {
    const [key, value] = row.split(':');
    return [...separateSign(key.trim()), value.trim()];
  });

const convertDiffObjectToArray = comparingDiffObject => Object.keys(comparingDiffObject)
  .reduce((acc, currentItem) => acc.concat([[...separateSign(currentItem), `${comparingDiffObject[currentItem]}`.trim()]]), []);

const compareArrays = (arrayFirst, arraySecond) => arrayFirst.length === arraySecond.length
  && arrayFirst.every((x) => {
    const [sign1, key1, value1] = x;
    return arraySecond.some((y) => {
      const [sign2, key2, value2] = y;
      return (x.length === y.length && sign1 === sign2 && key1 === key2 && value1 === value2);
    });
  });

export const areDiffsEqual = (comparingDiffObject, properDiffText) => {
  const genDiffArray = convertDiffObjectToArray(comparingDiffObject);
  const properDiffArray = convertProperDiffFileToArray(properDiffText);
  return compareArrays(genDiffArray, properDiffArray);
};
