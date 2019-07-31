import Render from './Render';
import { nonUpdatedSign } from './constants';
import { generatePadding } from './helper';

function NodeWithChildrenRender(parentSign, depth, key, children, recursiveFunc) {
  Render.apply(this, [parentSign, depth, nonUpdatedSign, key]);
  this.children = children;
  this.recursiveFunc = recursiveFunc;
}

NodeWithChildrenRender.prototype.toString = function toString() {
  const [beforeKeyString, key] = Render.prototype.toString.call(this);
  const temp = [beforeKeyString, key].concat('{\n')
    .concat(this.recursiveFunc(this.children, this.depth + 1, nonUpdatedSign))
    .concat(generatePadding(beforeKeyString.length))
    .concat('}\n');
  return temp;
};


export default NodeWithChildrenRender;
