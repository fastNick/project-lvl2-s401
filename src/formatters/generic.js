import getJsonDiffFormatter from './jsonDiff';
import getPlainFormatter from './plain';
import getJsonFormatter from './json';

const formattersByFormat = ({
  jsonDiff: render => getJsonDiffFormatter(render),
  json: render => getJsonFormatter(render),
  plain: render => getPlainFormatter(render),
});

export default formattersByFormat;
