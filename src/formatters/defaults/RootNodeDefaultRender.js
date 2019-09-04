import { flattenDeep } from 'lodash';
import {
  leftCurl, rightCurl, paddingInitial, newLine,
} from './constants';


function RootNodeDefaultRender(node, parent, recursiveFunc) {
  this.children = recursiveFunc(node.children, this);
  this.leftPadding = paddingInitial;
}

RootNodeDefaultRender.prototype.toString = function toString() {
  return flattenDeep([leftCurl, newLine, ...this.children, rightCurl]).join('');
};

export default RootNodeDefaultRender;
