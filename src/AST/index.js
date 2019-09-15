import _ from 'lodash';
import getKeyByType from './generic';

const getAst = (firstConfig = {}, secondConfig = {}) => {
  const configKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));

  return configKeys.map((key) => {
    const { type, process } = getKeyByType(firstConfig, secondConfig, key);
    const value = process(firstConfig[key], secondConfig[key], getAst);
    return { name: type, key, value };
  });
};

export default getAst;
