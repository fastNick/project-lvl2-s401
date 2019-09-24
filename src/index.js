import getGenDiff from './gendiff';
import getRender from './render';

const renderGenDiff = (beforePath, afterPath, format) => {
  const genDiff = getGenDiff(beforePath, afterPath);
  return getRender(genDiff, format);
};

export default renderGenDiff;
