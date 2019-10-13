import getNestedStringifier from './nested';
import getPlainStringifier from './plain';
import getJsonStringifier from './json';

const stringifiersByFormat = ({
  nested: render => getNestedStringifier(render),
  json: render => getJsonStringifier(render),
  plain: render => getPlainStringifier(render),
});

const getStringifier = render => stringifiersByFormat[render.format](render);

export default getStringifier;
