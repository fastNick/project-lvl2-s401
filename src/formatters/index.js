import jsonFormatter from './json';
import nestedFormatter from './nested';
import plainFormatter from './plain';

const getNodeFormatter = (node, format, parent = null) => {
  const {
    value, key, type, children, valueOld, valueNew,
  } = node;
  const getChildren = function getChildren() {
    return type === 'nested' ? children.map(child => getNodeFormatter(child, format, this)) : [];
  };

  return {
    value,
    valueNew,
    valueOld,
    key,
    type,
    format,
    parent,
    getChildren,
  };
};

const getFormattersTree = (ast, format) => ast.map(node => getNodeFormatter(node, format));

const formattersByFormat = {
  nested: (ast, format) => {
    const stringifiersTree = getFormattersTree(ast, format);
    return nestedFormatter(stringifiersTree);
  },
  plain: (ast, format) => {
    const stringifiersTree = getFormattersTree(ast, format);
    return plainFormatter(stringifiersTree);
  },
  json: (ast, format) => {
    const stringifiersTree = getFormattersTree(ast, format);
    return jsonFormatter(stringifiersTree);
  },
};

const getFormatter = (ast, format) => formattersByFormat[format](ast, format);

export default getFormatter;
