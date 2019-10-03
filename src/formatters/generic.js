import getNestedFormatter from './nested';
import getPlainFormatter from './plain';
import getJsonFormatter from './json';

const formattersByFormat = ({
  nested: render => getNestedFormatter(render),
  json: render => getJsonFormatter(render),
  plain: render => getPlainFormatter(render),
});

export default formattersByFormat;
