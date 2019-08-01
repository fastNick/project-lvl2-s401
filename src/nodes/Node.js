export default function Node({
  key, value = '', children = [], parent = null,
}) {
  this.key = key;
  this.value = value;
  this.children = children;
  this.parent = parent;
}
