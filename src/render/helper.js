import { flattenDeep } from 'lodash';
import Render from './Render';

const rendersByFormat = {
  nested: (ast, format) => flattenDeep(['{\n', ast.map(node => new Render(node, format).toString()), '}']).join(''),
  plain: (ast, format) => flattenDeep([ast.filter(x => x.nodeType !== 'not changed')
    .map(node => new Render(node, format).toString())]).join('\n'),
  json: (ast, format) => ['[', flattenDeep([ast.map(node => new Render(node, format).toString())]), ']'].join(''),
};

export default rendersByFormat;
