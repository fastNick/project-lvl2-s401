import { isPlainObject, flattenDeep } from 'lodash';
import {
  comma, pathSeparator,
  leftCurl, rightCurl, complexValue,
} from './constantsJson';

const getPath = render => (render.parent !== null ? [getPath(render.parent), render.key]
  .join(pathSeparator) : render.key);

const generateBaseString = render => ([`"name":"${render.key}"`, `"type":"${render.type}"`,
  `"path":"${getPath(render)}"`]).join(',');

const stringify = value => (isPlainObject(value) ? complexValue : value);

const stringifiersByRender = {
  nested(render) {
    const children = render.getChildren().map(x => this[x.type](x));
    return [leftCurl, generateBaseString(render), comma, `"children":[${children}]`, rightCurl].join('');
  },
  changed(render) {
    return [leftCurl, generateBaseString(render), comma,
      `"valueBefore":"${render.valueOld}"`, comma, `"valueAfter":"${render.valueNew}"`, rightCurl].join('');
  },
  deleted(render) { return [leftCurl, generateBaseString(render), comma, `"value":"${stringify(render.value)}"`, rightCurl].join(''); },
  inserted(render) { return [leftCurl, generateBaseString(render), comma, `"value":"${stringify(render.value)}"`, rightCurl].join(''); },
  'not changed': function notChanged(render) { return [leftCurl, generateBaseString(render), comma, `"value":"${stringify(render.value)}"`, rightCurl].join(''); },
};

const jsonFormatter = (stringifiersTree) => {
  const stringifiers = stringifiersTree
    .map(render => stringifiersByRender[render.type](render));
  return ['[', flattenDeep([stringifiers]), ']'].join('');
};

export default jsonFormatter;
