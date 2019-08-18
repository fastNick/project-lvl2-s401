export default function Node({
  key, parent, value = '', children = [],
}) {
  this.key = key;
  this.value = value;
  this.children = children;
  this.parent = parent;
}
