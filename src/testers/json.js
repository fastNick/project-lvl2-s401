import { flattenDeep } from 'lodash';
import Render from '../Render';

const jsonFormatter = (ast, format) => ['[', flattenDeep([ast.map(node => Render(node, format).toString())]), ']'].join('');

export default jsonFormatter;
