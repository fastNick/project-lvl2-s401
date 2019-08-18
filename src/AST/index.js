import convertToObject from '../parsers';
import { buildRootNode } from './nodes';
import { buildAst, buildASTInnerNodes } from './generic';


const getDiffAST = (dataBefore, dataAfter) => {
  const before = convertToObject(dataBefore);
  const after = convertToObject(dataAfter);
  const rootNodeChildren = buildASTInnerNodes(before, after);
  const rootNode = buildRootNode(rootNodeChildren);
  return buildAst(rootNode);
};

export default getDiffAST;
