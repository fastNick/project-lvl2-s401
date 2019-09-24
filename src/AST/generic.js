import _ from 'lodash';

const keyTypes = [
  {
    type: 'nested',
    check: (first, second, key) => (first[key] instanceof Object && second[key] instanceof Object)
      && !(first[key] instanceof Array && second[key] instanceof Array),
    process: (first, second, func) => func(first, second),
  },
  {
    type: 'not changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: first => _.identity(first),
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => ({ old: first, new: second }),
  },
  {
    type: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: first => _.identity(first),
  },
  {
    type: 'inserted',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => _.identity(second),
  },
];

const getKeyByType = (first, second, key) => keyTypes
  .find(({ check }) => check(first, second, key));

const getAstConfig = (firstConfig = {}, secondConfig = {}) => {
  const configKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));

  return configKeys.map((key) => {
    const { type, process } = getKeyByType(firstConfig, secondConfig, key);
    const value = process(firstConfig[key], secondConfig[key], getAstConfig);
    return { name: type, key, value };
  });
};

const sort = ast => ast.sort((x, y) => x.key.localeCompare(y.key))
  .map(node => (node.value instanceof Array
    ? { ...node, value: sort(node.value) } : node));

const getSortedAstConfig = (firstConfig = {}, secondConfig = {}) => {
  const ast = getAstConfig(firstConfig, secondConfig);
  return sort(ast);
};

export default getSortedAstConfig;
