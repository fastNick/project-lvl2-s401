import { flattenDeep } from 'lodash';
import Render from '../Render';

const nestedFormatter = (ast, format) => flattenDeep(['{\n', ast.map(node => Render(node, format).toString()), '}']).join('');

export default nestedFormatter;
