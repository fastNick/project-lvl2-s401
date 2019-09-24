import getData from '../lib/file';
import convertToObject from '../parsers';
import getAst from '../AST';

const getGenDiffAst = (beforePath, afterPath) => {
  const beforeData = getData(beforePath);
  const beforeConfig = convertToObject(beforeData);
  const afterData = getData(afterPath);
  const afterConfig = convertToObject(afterData);

  return getAst(beforeConfig, afterConfig);
};

export default getGenDiffAst;
