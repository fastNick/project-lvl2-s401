import { isPlainObject } from 'lodash';

import {
  paddingFromKey, paddingFromSign, paddingSymbol,
  afterKeySeparator, nonUpdatedSign, leftCurl, rightCurl,
  newLine, signsByASTNode,
} from './constants';

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

const getKeyMargin = (render, nodeName = render.nodeName) => {
  const iter = node => (node === null ? 0
    : getLeftPadding(node.nodeName).length + iter(node.parent));
  return [getPaddingSymbolsLine(iter(render.parent)), getLeftPadding(nodeName)].join('');
};

const stringifyObject = (value, render) => {
  const keyMargin = getKeyMargin(render).length;
  return [leftCurl,
    newLine,
    ...Object.keys(value).map(key => getObjectProperty(value, key, keyMargin)),
    getPaddingSymbolsLine(keyMargin),
    rightCurl];
};

const stringify = (value, render) => (isPlainObject(value) ? stringifyObject(value,
  render) : value);

const generateBaseString = (value, render, nodeName = render.nodeName) => [
  getKeyMargin(render, nodeName),
  render.key,
  afterKeySeparator,
  stringify(value, render), newLine];

export const formattersByRender = ({
  changed: render => [generateBaseString(render.value.old, render, 'deleted'),
    generateBaseString(render.value.new, render, 'inserted')],
  deleted: render => generateBaseString(render.value, render),
  inserted: render => generateBaseString(render.value, render),
  nested: render => [
    getKeyMargin(render, render.nodeName),
    render.key,
    afterKeySeparator,
    leftCurl,
    newLine,
    ...render.children,
    getKeyMargin(render, render.nodeName),
    rightCurl,
    newLine,
  ],
  'not changed': render => generateBaseString(render.value, render),
});

export default formattersByRender;
