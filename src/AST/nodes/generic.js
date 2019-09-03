import { has, isPlainObject } from 'lodash';
import NodeWithChildren from './NodeWithChildren';
import RemovedNode from './RemovedNode';
import AddedNode from './AddedNode';
import NonUpdatedNode from './NonUpdatedNode';
import UpdatedNode from './UpdatedNode';

export default [
  [
    (beforeObject, afterObject, key) => !has(afterObject, key),
    (beforeObject, afterObject, key) => new RemovedNode(key, beforeObject[key]),
  ],
  [
    (beforeObject, afterObject, key) => !has(beforeObject, key),
    (beforeObject, afterObject, key) => new AddedNode(key, afterObject[key]),
  ],
  [
    (beforeObject, afterObject, key) => isPlainObject(beforeObject[key])
      && isPlainObject(afterObject[key]),
    (beforeObject, afterObject, key, traverseTreeFunc) => new NodeWithChildren(key,
      traverseTreeFunc(beforeObject[key], afterObject[key])),
  ],
  [
    (beforeObject, afterObject, key) => beforeObject[key] === afterObject[key],
    (beforeObject, afterObject, key) => new NonUpdatedNode(key, beforeObject[key])],
  [
    (beforeObject, afterObject, key) => beforeObject[key] !== afterObject[key],
    (beforeObject, afterObject, key) => new UpdatedNode(key, beforeObject[key], afterObject[key]),
  ],
];
