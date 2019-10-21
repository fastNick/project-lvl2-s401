import jsonFormatter from './json';
import nestedFormatter from './nested';
import plainFormatter from './plain';


const nestedChildrenByFormat = {
  nested: value => value,
  plain: value => value.filter(child => child.type !== 'not changed'),
  json: value => value,
};

const Render = (node, format, parent = null) => {
  const {
    value, key, type, children, valueOld, valueNew,
  } = node;
  const getChildren = function getChildren() {
    return type === 'nested' ? nestedChildrenByFormat[format](children)
      .map(child => Render(child, format, this)) : [];
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
    toString,
  };
};

const getStringifiersTree = (ast, format) => ast.map(node => Render(node, format));

const rendersByFormat = {
  nested: (ast, format) => {
    const stringifiersTree = getStringifiersTree(ast, format);
    return nestedFormatter(stringifiersTree);
  },
  plain: (ast, format) => {
    const stringifiersTree = getStringifiersTree(ast, format);
    return plainFormatter(stringifiersTree);
  },
  json: (ast, format) => {
    const stringifiersTree = getStringifiersTree(ast, format);
    return jsonFormatter(stringifiersTree);
  },
};

const getRender = (ast, format) => rendersByFormat[format](ast, format);

export default getRender;
