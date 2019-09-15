import { flatten } from 'lodash';
import {
  leftCurl, rightCurl, newLine,
} from './constants';
import Render from './Render';


function RootNodeRender(node, recursiveFunc) {
  this.parent = null;
  Render.apply(this, [node, this.parent]);
  this.children = recursiveFunc(node, this);
}

RootNodeRender.prototype.toString = function toString() {
  return flatten([leftCurl, newLine, this.children, rightCurl]).join('');
};

export default RootNodeRender;
