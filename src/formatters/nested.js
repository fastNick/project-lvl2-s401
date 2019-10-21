import { flattenDeep, isPlainObject } from 'lodash';
import {
  paddingFromKey, paddingFromSign, paddingSymbol,
  afterKeySeparator, nonUpdatedSign, leftCurl, rightCurl,
  newLine, signsByASTNode,
} from './constantsNested';


const getSign = nodeName => signsByASTNode[nodeName];

const getPaddingSymbolsLine = length => paddingSymbol.repeat(length);

const getLeftPadding = nodeName => ([getPaddingSymbolsLine(paddingFromSign),
  getSign(nodeName),
  getPaddingSymbolsLine(paddingFromKey)].join(''));

const getObjectProperty = (value, key, keyMargin) => [
  getPaddingSymbolsLine(keyMargin),
  getPaddingSymbolsLine(paddingFromSign),
  nonUpdatedSign,
  getPaddingSymbolsLine(paddingFromKey),
  key, afterKeySeparator,
  value[key], newLine];

const getKeyMargin = (render) => {
  const iter = node => (node === null ? 0
    : getLeftPadding(render.type).length + iter(node.parent));
  return [getPaddingSymbolsLine(iter(render.parent)), getLeftPadding(render.type)].join('');
};

const stringifyObject = (render) => {
  const keyMargin = getKeyMargin(render).length;
  return [leftCurl,
    newLine,
    ...Object.keys(render.value).map(key => getObjectProperty(render.value, key, keyMargin)),
    getPaddingSymbolsLine(keyMargin),
    rightCurl];
};

const stringify = render => (isPlainObject(render.value) ? stringifyObject(render) : render.value);

const generateBaseString = render => [
  getKeyMargin(render),
  render.key,
  afterKeySeparator,
  stringify(render), newLine];

export const stringifiersByRender = ({
  changed(render) {
    return [generateBaseString({ ...render, value: render.valueOld, type: 'deleted' }),
      generateBaseString({ ...render, value: render.valueNew, type: 'inserted' })];
  },
  deleted(render) { return generateBaseString(render); },
  inserted(render) { return generateBaseString(render); },
  nested(render) {
    return [
      getKeyMargin(render),
      render.key,
      afterKeySeparator,
      leftCurl,
      newLine,
      ...render.getChildren().map(child => this[child.type](child)),
      getKeyMargin(render),
      rightCurl,
      newLine,
    ];
  },
  'not changed': function notChanged(render) { return generateBaseString(render); },
});

const nestedFormatter = (stringifiersTree) => {
  const stringifiers = stringifiersTree.map(render => stringifiersByRender[render.type](render));
  return flattenDeep(['{\n', stringifiers, '}']).join('');
};

export default nestedFormatter;
