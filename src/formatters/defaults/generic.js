import { flatten, isPlainObject } from 'lodash';

import {
  paddingFromKey, paddingFromSign, paddingSymbol,
  afterKeySeparator, nonUpdatedSign, leftCurl, rightCurl,
  newLine, paddingInitial, removedSign, addedSign, noSign,
} from './constants';

const getPadding = length => paddingSymbol.repeat(length);

const generateProperty = (data, currentKey, marginLeft) => [getPadding(marginLeft.length),
  getPadding(paddingFromSign),
  nonUpdatedSign, getPadding(paddingFromKey), currentKey, afterKeySeparator, data[currentKey], '\n'];


export const stringifyObject = (data, marginLeft) => {
  const properties = Object.keys(data)
    .reduce((acc, currentKey) => generateProperty(data, currentKey, marginLeft), []);
  return flatten([leftCurl,
    newLine,
    properties,
    getPadding(marginLeft.length),
    rightCurl]).join('');
};

export const getLeftPadding = (parent, sign) => (parent === null ? paddingInitial
  : [paddingSymbol.repeat(paddingFromSign), sign, paddingSymbol.repeat(paddingFromKey)].join(''));

const signsByASTNode = {
  DeletedNodeRender: removedSign,
  InsertedNodeRender: addedSign,
  NotChangedNodeRender: nonUpdatedSign,
  NestedNodeRender: nonUpdatedSign,
  RootNodeRender: noSign,
};

export const getSign = nodeType => signsByASTNode[nodeType];

export const getMarginLeft = (parent) => {
  const iter = (acc, el) => (el === null ? acc.concat(paddingInitial)
    : iter(acc.concat(getLeftPadding(el.parent, getSign(el.constructor.name))), el.parent));
  return paddingSymbol.repeat(iter('', parent).length);
};

export const stringify = (data, render) => (isPlainObject(data) ? stringifyObject(data,
  getMarginLeft(render.parent).concat(getLeftPadding(render.parent,
    getSign(render.constructor.name))))
  : data);
