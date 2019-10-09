import { flattenDeep } from 'lodash';
import Render from './Render';

const rendersByFormat = {
  nested: (ast, format) => flattenDeep(['{\n', ast.map(node => Render(node, format).toString()), '}']).join(''),
  plain: (ast, format) => flattenDeep([ast.filter(x => x.nodeType !== 'not changed')
    .map(node => Render(node, format).toString())]).join('\n'),
  json: (ast, format) => ['[', flattenDeep([ast.map(node => Render(node, format).toString())]), ']'].join(''),
};

const getRender = (ast, format) => rendersByFormat[format](ast, format);

export default getRender;
