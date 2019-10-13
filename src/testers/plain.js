import { flattenDeep } from 'lodash';
import Render from '../Render';

const plainFormatter = (ast, format) => flattenDeep([ast.filter(x => x.nodeType !== 'not changed')
  .map(node => Render(node, format).toString())]).join('\n');

export default plainFormatter;
