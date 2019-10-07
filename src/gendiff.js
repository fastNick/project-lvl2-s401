import { getContent, getExtension } from './io';
import convertToObject from './parsers';
import getAst from './ast';

const getGenDiffAst = (beforePath, afterPath) => {
  const beforeContent = getContent(beforePath);
  const beforeDataType = getExtension(beforePath);
  const beforeConfig = convertToObject(beforeDataType, beforeContent);
  const afterContent = getContent(afterPath);
  const afterDataType = getExtension(beforePath);
  const afterConfig = convertToObject(afterDataType, afterContent);

  return getAst(beforeConfig, afterConfig);
};
export default getGenDiffAst;
