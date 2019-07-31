import { has, isPlainObject } from 'lodash';
import NodeWithChildren from './NodeWithChildren';
import RemovedNode from './RemovedNode';
import AddedNode from './AddedNode';
import NonUpdatedNode from './NonUpdatedNode';
import UpdatedNode from './UpdatedNode';

const buildNode = (beforeObject, afterObject, key, processTreeFunc) => {
  const beforePropertyValue = beforeObject[key];
  const afterPropertyValue = afterObject[key];
  if (!has(afterObject, key)) {
    return new RemovedNode(key, beforePropertyValue);
  }

  if (!has(beforeObject, key)) {
    return new AddedNode(key, afterPropertyValue);
  }

  if (isPlainObject(beforePropertyValue) && isPlainObject(afterPropertyValue)) {
    return new NodeWithChildren(key, processTreeFunc(beforePropertyValue, afterPropertyValue));
  }

  if (beforePropertyValue === afterPropertyValue) {
    return new NonUpdatedNode(key, beforePropertyValue);
  }

  return new UpdatedNode(key, beforePropertyValue, afterPropertyValue);
};

export default buildNode;
