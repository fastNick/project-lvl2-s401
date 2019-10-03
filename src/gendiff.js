import getData from './io';
import convertToObject from './parsers';
import getAst from './ast';

const getGenDiffAst = (beforePath, afterPath) => {
  const beforeData = getData(beforePath);
  const beforeConfig = convertToObject(beforeData);
  const afterData = getData(afterPath);
  const afterConfig = convertToObject(afterData);

  return getAst(beforeConfig, afterConfig);
};

const getGenDiff = (beforePath, afterPath) => getGenDiffAst(beforePath, afterPath);

export default getGenDiff;
