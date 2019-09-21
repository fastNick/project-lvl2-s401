import getDiffAST from './AST/index';
import getRender from './render';

const sort = ast => ast.sort((x, y) => x.key.localeCompare(y.key))
  .map(node => (node.value instanceof Array
    ? { ...node, value: sort(node.value) } : node));

const renderDiff = (dataBefore, dataAfter, format) => {
  const getDiff = getDiffAST(dataBefore, dataAfter);
  const sortedDiff = sort(getDiff);
  return getRender(sortedDiff, format);
};

export default renderDiff;
