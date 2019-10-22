import { isPlainObject, flattenDeep } from 'lodash';
import {
  comma, pathSeparator,
  leftCurl, rightCurl, complexValue,
} from './constantsJson';

const getPath = nodeFormatter => (nodeFormatter.parent !== null ? [getPath(nodeFormatter.parent),
  nodeFormatter.key]
  .join(pathSeparator) : nodeFormatter.key);

const generateBaseString = nodeFormatter => ([`"name":"${nodeFormatter.key}"`, `"type":"${nodeFormatter.type}"`,
  `"path":"${getPath(nodeFormatter)}"`]).join(',');

const stringify = value => (isPlainObject(value) ? complexValue : value);

const stringifiersByNodeType = {
  nested(nodeFormatter) {
    const children = nodeFormatter.getChildren().map(x => this[x.type](x));
    return [leftCurl, generateBaseString(nodeFormatter), comma, `"children":[${children}]`, rightCurl].join('');
  },
  changed(nodeFormatter) {
    return [leftCurl, generateBaseString(nodeFormatter), comma,
      `"valueBefore":"${nodeFormatter.valueOld}"`, comma, `"valueAfter":"${nodeFormatter.valueNew}"`, rightCurl].join('');
  },
  deleted(nodeFormatter) { return [leftCurl, generateBaseString(nodeFormatter), comma, `"value":"${stringify(nodeFormatter.value)}"`, rightCurl].join(''); },
  inserted(nodeFormatter) { return [leftCurl, generateBaseString(nodeFormatter), comma, `"value":"${stringify(nodeFormatter.value)}"`, rightCurl].join(''); },
  'not changed': function notChanged(nodeFormatter) { return [leftCurl, generateBaseString(nodeFormatter), comma, `"value":"${stringify(nodeFormatter.value)}"`, rightCurl].join(''); },
};

const jsonFormatter = (stringifiersTree) => {
  const stringifiers = stringifiersTree
    .map(nodeFormatter => stringifiersByNodeType[nodeFormatter.type](nodeFormatter));
  return ['[', flattenDeep([stringifiers]), ']'].join('');
};

export default jsonFormatter;
