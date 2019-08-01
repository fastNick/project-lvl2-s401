import { has, isPlainObject } from 'lodash';
import NodeWithChildren from './NodeWithChildren';
import RemovedNode from './RemovedNode';
import AddedNode from './AddedNode';
import NonUpdatedNode from './NonUpdatedNode';
import UpdatedNode from './UpdatedNode';

const buildNode = (beforeObject, afterObject, key, processTreeFunc, parent = null) => {
  const beforePropertyValue = beforeObject[key];
  const afterPropertyValue = afterObject[key];
  if (!has(afterObject, key)) {
    return new RemovedNode(key, beforePropertyValue, parent);
  }

  if (!has(beforeObject, key)) {
    return new AddedNode(key, afterPropertyValue, parent);
  }

  if (isPlainObject(beforePropertyValue) && isPlainObject(afterPropertyValue)) {
    const node = new NodeWithChildren(key);
    node.children = processTreeFunc(beforePropertyValue, afterPropertyValue, node);
    node.parent = parent;
    return node;
  }

  if (beforePropertyValue === afterPropertyValue) {
    return new NonUpdatedNode(key, beforePropertyValue, parent);
  }

  return new UpdatedNode(key, beforePropertyValue, afterPropertyValue, parent);
};

export default buildNode;
