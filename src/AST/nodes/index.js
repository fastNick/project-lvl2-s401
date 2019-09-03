import { has, isPlainObject } from 'lodash';
import NodeWithChildren from './NodeWithChildren';
import RemovedNode from './RemovedNode';
import AddedNode from './AddedNode';
import NonUpdatedNode from './NonUpdatedNode';
import UpdatedNode from './UpdatedNode';
import RootNode from './RootNode';

export const buildInnerNode = (beforeObject, afterObject, key, traverseTreeFunc, parent) => {
  const beforePropertyValue = beforeObject[key];
  const afterPropertyValue = afterObject[key];


  switch (true) {
    case !has(afterObject, key):
      return new RemovedNode(key, beforePropertyValue, parent);
    case !has(beforeObject, key):
      return new AddedNode(key, afterPropertyValue, parent);
    case isPlainObject(beforePropertyValue) && isPlainObject(afterPropertyValue): {
      const node = new NodeWithChildren(key);
      node.children = traverseTreeFunc(beforePropertyValue, afterPropertyValue, node);
      node.parent = parent;
      return node;
    }
    case beforePropertyValue === afterPropertyValue:
      return new NonUpdatedNode(key, beforePropertyValue, parent);
    default:
      return new UpdatedNode(key, beforePropertyValue, afterPropertyValue, parent);
  }
};


export const buildRootNode = children => new RootNode(children);
