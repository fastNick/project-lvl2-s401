import {
  paddingFromKey, paddingFromSign, paddingSymbol, paddingFromValue,
} from './constants';
import RemovedNodeDefaultRender from './RemovedNodeDefaultRender';
import AddedNodeDefaultRender from './AddedNodeDefaultRender';
import NodeWithChildrenDefaultRender from './NodeWithChildrenDefaultRender';
import NonUpdatedNodeDefaultRender from './NonUpdatedNodeDefaultRender';
import RootNodeDefaultRender from './RootNodeDefaultRender';
import UpdatedNodeDefaultRender from './UpdatedNodeDefaultRender';

export const generatePadding = length => paddingSymbol.repeat(length);

export const leftPaddingFromSign = () => paddingSymbol.repeat(paddingFromSign);
export const leftPaddingFromKey = () => paddingSymbol.repeat(paddingFromKey);
export const leftPaddingFromValue = () => paddingSymbol.repeat(paddingFromValue);

export const getNodeRender = (node, recursiveFunc, parent = null) => {
  switch (node.constructor.name) {
    case 'RootNode':
      return new RootNodeDefaultRender(node, recursiveFunc, parent);
    case 'NodeWithChildren':
      return new NodeWithChildrenDefaultRender(node, recursiveFunc, parent);
    case 'UpdatedNode':
      return new UpdatedNodeDefaultRender(node, parent);
    case 'NonUpdatedNode':
      return new NonUpdatedNodeDefaultRender(node, parent);
    case 'RemovedNode':
      return new RemovedNodeDefaultRender(node, parent);
    case 'AddedNode':
      return new AddedNodeDefaultRender(node, parent);
    default:
      throw new Error('Unsupported type of render');
  }
};
