export default function Node({
  key, value = '', children = [],
}) {
  this.key = key;
  this.value = value;
  this.children = children;
}
