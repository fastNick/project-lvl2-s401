import DeletedNodeRender from './DeletedNodeRender';
import InsertedNodeRender from './InsertedNodeRender';
import NestedNodeRender from './NestedNodeRender';
import NotChangedNodeRender from './NotChangedNodeRender';
import ChangedNodeRender from './ChangedNodeRender';
import RootNodeRender from './RootNodeRender';


const formatsByASTNode = {
  nested: NestedNodeRender,
  changed: ChangedNodeRender,
  'not changed': NotChangedNodeRender,
  deleted: DeletedNodeRender,
  inserted: InsertedNodeRender,
};

const getDefaultRender = (node, recursiveFunc, parent) => {
  if (node instanceof Array) {
    return new RootNodeRender(node, recursiveFunc);
  }
  const astNode = node.name;
  const Render = formatsByASTNode[astNode];
  return new Render(node, parent, recursiveFunc);
};

export default getDefaultRender;
