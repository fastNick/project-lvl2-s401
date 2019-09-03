import RootNode from './RootNode';
import nodesMapper from './generic';

export const buildInnerNode = (beforeObject, afterObject, key, traverseTreeFunc) => {
  const [, node] = nodesMapper.find(([condition]) => condition(beforeObject, afterObject, key));
  return node(beforeObject, afterObject, key, traverseTreeFunc);
};

export const buildRootNode = children => new RootNode(children);
