import defaultRender from './defaults';
import plainRender from './plains';
import jsonRender from './jsons';

const getRender = (AST, format) => {
  switch (format) {
    case 'default':
      return defaultRender(AST);
    case 'plain':
      return plainRender(AST);
    case 'json':
      return jsonRender(AST);
    default:
      throw new Error('Unsupported type of render');
  }
};


export default getRender;
