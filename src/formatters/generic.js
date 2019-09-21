import getDefaultFormatter from './default';
import getPlainFormatter from './plain';
import getJsonFormatter from './json';

const formattersByFormat = ({
  default: render => getDefaultFormatter(render),
  json: render => getJsonFormatter(render),
  plain: render => getPlainFormatter(render),
});

export default formattersByFormat;
