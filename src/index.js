import getDiffAST from './AST/index';
import { sort } from './AST/generic';
import getRender from './formatters';

const renderDiff = (dataBefore, dataAfter, format) => {
  const getDiff = getDiffAST(dataBefore, dataAfter);
  const sortedDiff = sort(getDiff);
  return getRender(sortedDiff, format);
};

export default renderDiff;
