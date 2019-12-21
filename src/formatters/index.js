import nestedRender from './nested';
import jsonRender from './json';
import plainRender from './plain';

const renderByFormat = {
  nested: nestedRender,
  json: jsonRender,
  plain: plainRender,
};

const render = (ast, format) => renderByFormat[format](ast);

export default render;
