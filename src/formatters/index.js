import defaultRenderDiff from './defaults';
import plainRenderDiff from './plains';
import jsonRenderDiff from './jsons';

const getRender = (AST, format) => {
  switch (format) {
    case 'default':
      return defaultRenderDiff(AST);
    case 'plain':
      return plainRenderDiff(AST);
    case 'json':
      return jsonRenderDiff(AST);
    default:
      throw new Error('Unsupported type of render');
  }
};


export default getRender;
