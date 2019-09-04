import defaultRender from './defaults';
import plainRender from './plains';
import jsonRender from './jsons';

export default {
  default: AST => defaultRender(AST),
  plain: AST => plainRender(AST),
  json: AST => jsonRender(AST),
};
