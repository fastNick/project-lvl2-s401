import jsonRender from './json';
import nestedRender from './nested';
import plainRender from './plain';

const getRenderNode = (node, format, parent = null) => {
  const {
    value, key, type, children, valueOld, valueNew,
  } = node;
  const getChildren = function getChildren() {
    return type === 'nested' ? children.map(child => getRenderNode(child, format, this)) : [];
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

const getRendersTree = (ast, format) => ast.map(node => getRenderNode(node, format));

const rendersByFormat = {
  nested: (ast, format) => {
    const rendersTree = getRendersTree(ast, format);
    return nestedRender(rendersTree);
  },
  plain: (ast, format) => {
    const rendersTree = getRendersTree(ast, format);
    return plainRender(rendersTree);
  },
  json: (ast, format) => {
    const rendersTree = getRendersTree(ast, format);
    return jsonRender(rendersTree);
  },
};

export default rendersByFormat;
