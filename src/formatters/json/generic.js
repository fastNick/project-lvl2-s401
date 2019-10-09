import { isPlainObject } from 'lodash';

import {
  comma, pathSeparator,
  leftCurl, rightCurl, complexValue,
} from './constants';

const getPath = render => (render.parent !== null ? [getPath(render.parent), render.key]
  .join(pathSeparator) : render.key);

const generateBaseString = render => ([`"name":"${render.key}"`, `"type":"${render.name}"`,
  `"path":"${getPath(render)}"`]).join(',');

const stringify = value => (isPlainObject(value) ? complexValue : value);

const formattersByRender = {
  nested: render => [leftCurl, generateBaseString(render), comma, `"children":[${render.getChildren()}]`, rightCurl].join(''),
  changed: render => [leftCurl, generateBaseString(render), comma,
    `"valueBefore":"${render.value.old}"`, comma, `"valueAfter":"${render.value.new}"`, rightCurl].join(''),
  deleted: render => [leftCurl, generateBaseString(render), comma, `"value":"${stringify(render.value)}"`, rightCurl].join(''),
  inserted: render => [leftCurl, generateBaseString(render), comma, `"value":"${stringify(render.value)}"`, rightCurl].join(''),
  'not changed': render => [leftCurl, generateBaseString(render), comma, `"value":"${stringify(render.value)}"`, rightCurl].join(''),
};

export default formattersByRender;
