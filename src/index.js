import { readFileSync } from 'fs';
import { extname } from 'path';
import parse from './parsers';
import getAst from './ast';
import render from './formatters';

const renderDiff = (beforePath, afterPath, format) => {
  const beforeContent = readFileSync(beforePath, 'utf8');
  const beforeDataType = extname(beforePath).slice(1);
  const beforeConfig = parse(beforeDataType, beforeContent);
  const afterContent = readFileSync(afterPath, 'utf8');
  const afterDataType = extname(afterPath).slice(1);
  const afterConfig = parse(afterDataType, afterContent);
  const gendiff = getAst(beforeConfig, afterConfig);
  return render(gendiff, format);
};

export default renderDiff;
