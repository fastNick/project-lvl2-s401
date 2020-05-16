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
    process: (first) => ({ value: first }),
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => ({ valueOld: first, valueNew: second }),
  },
  {
    type: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: (first) => ({ value: first }),
  },
  {
    type: 'inserted',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => ({ value: second }),
  },
];

const getKeyByType = (first, second, key) => keyTypes
  .find(({ check }) => check(first, second, key));

const getAstConfig = (firstConfig = {}, secondConfig = {}) => {
  const unionedKeys = _.union(Object.keys(firstConfig),
    Object.keys(secondConfig)).sort();

  return unionedKeys.map((key) => {
    const { type, process } = getKeyByType(firstConfig, secondConfig, key);
    return {
      type, key, ...process(firstConfig[key], secondConfig[key], getAstConfig),
    };
  });
};

export default getAstConfig;
