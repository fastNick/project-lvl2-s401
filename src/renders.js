import jsonFormatter from './testers/json';
import nestedFormatter from './testers/nested';
import plainFormatter from './testers/plain';


const rendersByFormat = {
  nested: (ast, format) => nestedFormatter(ast, format),
  plain: (ast, format) => plainFormatter(ast, format),
  json: (ast, format) => jsonFormatter(ast, format),
};

const getRender = (ast, format) => rendersByFormat[format](ast, format);

export default getRender;
