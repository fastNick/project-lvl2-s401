import _ from 'lodash';

const keyTypes = [
  {
    type: 'nested',
    check: (first, second, key) => (first[key] instanceof Object && second[key] instanceof Object)
      && !(first[key] instanceof Array && second[key] instanceof Array),
    process: (first, second, func) => ({ children: func(first, second) }),
  },
  {
    type: 'not changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: first => _.identity({ value: first }),
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => ({ value: { old: first, new: second } }),
  },
  {
    type: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: first => _.identity({ value: first }),
  },
  {
    type: 'inserted',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => _.identity({ value: second }),
  },
];

const getKeyByType = (first, second, key) => keyTypes
  .find(({ check }) => check(first, second, key));

const getAstConfig = (firstConfig = {}, secondConfig = {}) => _.union(Object.keys(firstConfig),
  Object.keys(secondConfig)).sort()
  .map((key) => {
    const { type, process } = getKeyByType(firstConfig, secondConfig, key);
    return {
      type, key, ...process(firstConfig[key], secondConfig[key], getAstConfig),
    };
  });

const getAst = (firstConfig, secondConfig) => getAstConfig(firstConfig, secondConfig);

export default getAst;
