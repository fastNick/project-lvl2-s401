import { has, isPlainObject, isEqual } from 'lodash';
import { readFileSync } from 'fs';
import { join as buildPath, isAbsolute as isPathAbsolute, resolve } from 'path';
import getParser from './parsers';

const comparisonFilesPath = buildPath(__dirname, '../../', 'comparison__files');
const testDiffFilesPath = buildPath(__dirname, '../../', '__tests__/__fixtures__');

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

const propertySymbol = {
  remove: '-',
  add: '+',
  same: ' ',
};

const fromSignPad = 1;
const nestedPad = 2;
const paddingSymbol = ' ';

const separateSign = (row) => {
  if (row.startsWith(propertySymbol.remove)) {
    return [propertySymbol.remove, row.slice(1).trim()];
  }
  if (row.startsWith(propertySymbol.add)) {
    return [propertySymbol.add, row.slice(1).trim()];
  }
  return [propertySymbol.same, row.trim()];
};


const addToAcc = (acc, {
  name, nestingLevel = 1, sign = propertySymbol.same, children = [], value = '',
} = {}) => acc.concat({
  nestingLevel: nestingLevel + 1,
  sign,
  name,
  value,
  children,
});

const getObjectDiff = (beforeObject, afterObject, nestingLevel = 0) => {
  const firstAcc = Object.keys(beforeObject).reduce((acc, name) => {
    const beforePropertyValue = beforeObject[name];
    const afterPropertyValue = afterObject[name];
    if (!has(afterObject, name)) {
      return addToAcc(acc, {
        nestingLevel,
        sign: propertySymbol.remove,
        name,
        value: beforePropertyValue,
      });
    }

    if (isPlainObject(beforePropertyValue) && isPlainObject(afterPropertyValue)) {
      return addToAcc(acc, {
        nestingLevel,
        name,
        children: getObjectDiff(beforePropertyValue, afterPropertyValue, nestingLevel + 1),
      });
    }

    if (beforePropertyValue === afterPropertyValue) {
      return addToAcc(acc, {
        nestingLevel,
        name,
        value: beforePropertyValue,
      });
    }

    return addToAcc(addToAcc(acc, {
      nestingLevel,
      sign: propertySymbol.remove,
      name,
      value: beforePropertyValue,
    }), {
      nestingLevel,
      sign: propertySymbol.add,
      name,
      value: afterPropertyValue,
    });
  }, []);

  return Object.keys(afterObject).reduce((acc, name) => {
    const afterPropertyValue = afterObject[name];
    if (has(beforeObject, name)) {
      return acc;
    }

    return addToAcc(acc, {
      nestingLevel, name, sign: propertySymbol.add, value: afterPropertyValue,
    });
  }, firstAcc);
};


export const calculateDiff = (beforeFile, afterFile) => {
  console.log(beforeFile);
  console.log(getDataFromFile(beforeFile));
  const mainObj1 = getParser(beforeFile)(getDataFromFile(beforeFile));
  const mainObj2 = getParser(beforeFile)(getDataFromFile(afterFile));
  return getObjectDiff(mainObj1, mainObj2);
};


export const convertProperDiffFileToObject = (fileData) => {
  const array = fileData.split('\n').map(x => x.split(':').map(y => y.trim()));
  const interMediateObject = array.map(([key, value], index) => {
    const [nextElement] = array[index + 1] || '}';
    if (key.trim() === '{') {
      return key.trim();
    }
    if (key.trim() === '}') {
      const comma = nextElement !== '}' ? ',' : '';
      return `${key.trim()}${comma}`;
    }
    if (value.trim() === '{') {
      return `"${key.trim()}":${value.trim()}`;
    }
    const comma = nextElement !== '}' && value !== '{' ? ',' : '';
    return `"${key.trim()}":"${value.trim()}"${comma}`;
  }).join('');
  return interMediateObject;
};

export const objectToTree = (obj) => {
  const test = Object.keys(obj).reduce((acc, currentKey) => {
    const [sign, name] = separateSign(currentKey);

    if ((sign === propertySymbol.same) && isPlainObject(obj[name])) {
      const children = objectToTree(obj[name]);
      return addToAcc(acc, { sign, name, children });
    }
    const value = obj[currentKey];
    return addToAcc(acc, { sign, name, value });
  }, []);
  return test;
};

export const testEquality = (tree1, tree2) => (tree1.length === tree2.length)
  && tree1.every(({
    sign: sign1, name: name1, value: value1, children: children1,
  }) => tree2.some(({
    sign: sign2, name: name2, value: value2, children: children2,
  }) => name1 === name2 && sign1 === sign2
          && isEqual(value1.toString(), value2.toString())
          && (testEquality(children1, children2) || isEqual(children1, children2))));

const generatePad = count => paddingSymbol.repeat(count);

const stringifyObjectValue = (value, paddingCount) => (isPlainObject(value)
  ? Object.keys(value)
    .reduce((acc, key) => acc
      .concat(`${generatePad(paddingCount)}${propertySymbol.same}${generatePad(fromSignPad)}${key}:${generatePad(fromSignPad)}${value[key]}\n`), '{\n')
    .concat(`${generatePad(paddingCount)}}`) : value);

const stringifyObjectKey = (name, sign, paddingCount) => `\n${generatePad(paddingCount)}${sign}${generatePad(fromSignPad)}${name}`;

export const renderDiff = (tree, nestingLevel = 1) => tree.reduce((acc, {
  sign, name, value, children,
}) => {
  const renderedName = stringifyObjectKey(name, sign, nestingLevel * nestedPad);
  if (children.length) {
    return acc.concat(`${renderedName}:${generatePad(fromSignPad)}${renderDiff(children, nestingLevel + 1)}`);
  }
  return acc.concat(`${renderedName}:${generatePad(fromSignPad)}${stringifyObjectValue(value, (nestingLevel + 1) * nestedPad)}`);
}, '{').concat('\n}');

export const convertDiffFileToTree = (file) => {
  const properDiffFile = buildPath(testDiffFilesPath, file);
  const properDiffText = getDataFromFile(properDiffFile);
  const obj = JSON.parse(convertProperDiffFileToObject(properDiffText));
  return objectToTree(obj);
};

export const flatFormat = (comparingDiffObject) => {
  const iter = ([first, second, ...rest], parentName = '', acc = '') => {
    console.log(first);
    if (!first) {
      return acc;
    }
    if (first.children.length) {
      const updatedAcc = iter(first.children, parentName.concat(first.name, '.'), acc);
      return iter([second, ...rest], parentName, updatedAcc);
    }
    if (first.sign === propertySymbol.same) {
      return iter([second, ...rest], parentName, acc);
    }

    if (second && first.name === second.name) {
      if (first.sign === propertySymbol.remove) {
        return iter([...rest], parentName, acc.concat(`Property '${parentName}${first.name}' was updated. From ${first.value} to ${second.value}\n`));
      }
      if (first.sign === propertySymbol.add) {
        return iter([...rest], parentName, acc.concat(`Property '${parentName}${first.name}' was updated. From ${second.value} to ${first.value}\n`));
      }
    }
    if (first.sign === propertySymbol.remove) {
      return iter([second, ...rest], parentName, acc.concat(`Property '${parentName}${first.name}' was removed\n`));
    }
    return iter([second, ...rest], parentName, acc.concat(`Property '${parentName}${first.name}' was added with value: '${first.value}'\n`));
  };

  return iter(comparingDiffObject);
};
