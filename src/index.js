import { readFileSync } from 'fs';
import { extname } from 'path';
import convertToObject from './parsers';
import getAst from './ast';
import getRender from './renders';

const renderGenDiff = (beforePath, afterPath, format) => {
  const beforeContent = readFileSync(beforePath, 'utf8');
  const beforeDataType = extname(beforePath);
  const beforeConfig = convertToObject(beforeDataType, beforeContent);
  const afterContent = readFileSync(afterPath, 'utf8');
  const afterDataType = extname(afterPath);
  const afterConfig = convertToObject(afterDataType, afterContent);
  const gendiff = getAst(beforeConfig, afterConfig);
  return getRender(gendiff, format);
};

export default renderGenDiff;
