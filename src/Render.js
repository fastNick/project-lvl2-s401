import getFormatter from './formatters';

const nestedChildrenByFormat = {
  nested: value => value,
  plain: value => value.filter(child => child.name !== 'not changed'),
  json: value => value,
};

function Render(node, format, parent = null) {
  const { value, key, name } = node;
  const getChildren = function getChildren() {
    return node.name === 'nested' ? nestedChildrenByFormat[format](value)
      .map(child => Render(child, format, this).toString()) : [];
  };
  const toString = function toString() {
    return getFormatter(this);
  };
  return {
    value,
    key,
    name,
    format,
    parent,
    getChildren,
    toString,
  };
}

export default Render;
