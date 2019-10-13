import getStringifier from './stringifiers';

const nestedChildrenByFormat = {
  nested: value => value,
  plain: value => value.filter(child => child.type !== 'not changed'),
  json: value => value,
};

function Render(node, format, parent = null) {
  const {
    value, key, type, children,
  } = node;
  const getChildren = function getChildren() {
    return type === 'nested' ? nestedChildrenByFormat[format](children)
      .map(child => Render(child, format, this)) : [];
  };
  const toString = function toString() {
    return getStringifier(this);
  };
  return {
    value,
    key,
    type,
    format,
    parent,
    getChildren,
    toString,
  };
}

export default Render;
