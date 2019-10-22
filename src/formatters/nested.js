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

const getKeyMargin = (nodeFormatter) => {
  const iter = node => (node === null ? 0
    : getLeftPadding(nodeFormatter.type).length + iter(node.parent));
  return [getPaddingSymbolsLine(iter(nodeFormatter.parent)), getLeftPadding(nodeFormatter.type)].join('');
};

const stringifyObject = (nodeFormatter) => {
  const keyMargin = getKeyMargin(nodeFormatter).length;
  return [leftCurl,
    newLine,
    ...Object.keys(nodeFormatter.value).map(key => getObjectProperty(nodeFormatter.value,
      key, keyMargin)),
    getPaddingSymbolsLine(keyMargin),
    rightCurl];
};

const stringify = nodeFormatter => (isPlainObject(nodeFormatter.value)
  ? stringifyObject(nodeFormatter) : nodeFormatter.value);

const generateBaseString = nodeFormatter => [
  getKeyMargin(nodeFormatter),
  nodeFormatter.key,
  afterKeySeparator,
  stringify(nodeFormatter), newLine];

export const stringifiersByType = ({
  changed(nodeFormatter) {
    return [generateBaseString({ ...nodeFormatter, value: nodeFormatter.valueOld, type: 'deleted' }),
      generateBaseString({ ...nodeFormatter, value: nodeFormatter.valueNew, type: 'inserted' })];
  },
  deleted(nodeFormatter) { return generateBaseString(nodeFormatter); },
  inserted(nodeFormatter) { return generateBaseString(nodeFormatter); },
  nested(nodeFormatter) {
    return [
      getKeyMargin(nodeFormatter),
      nodeFormatter.key,
      afterKeySeparator,
      leftCurl,
      newLine,
      ...nodeFormatter.getChildren().map(child => this[child.type](child)),
      getKeyMargin(nodeFormatter),
      rightCurl,
      newLine,
    ];
  },
  'not changed': function notChanged(nodeFormatter) { return generateBaseString(nodeFormatter); },
});

const nestedFormatter = (stringifiersTree) => {
  const stringifiers = stringifiersTree.map(nodeFormatter => stringifiersByType[nodeFormatter
    .type](nodeFormatter));
  return flattenDeep(['{\n', stringifiers, '}']).join('');
};

export default nestedFormatter;
