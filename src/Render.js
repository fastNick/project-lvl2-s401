import getFormatter from './formatters';

const nestedChildrenByFormat = {
  nested: render => render.value,
  plain: render => render.value.filter(child => child.name !== 'not changed'),
  json: render => render.value,
};

function Render(node, format, parent = null) {
  this.value = node.value;
  this.key = node.key;
  this.nodeName = node.name;
  this.format = format;
  this.parent = parent;
  this.children = this.nodeName === 'nested' ? nestedChildrenByFormat[this.format](this)
    .map(child => new Render(child, format, this).toString()) : [];
}

Render.prototype.toString = function toString() {
  return getFormatter(this);
};

export default Render;
