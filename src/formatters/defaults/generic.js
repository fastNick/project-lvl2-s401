import { flattenDeep } from 'lodash';

import {
  paddingFromKey, paddingFromSign, paddingSymbol,
  afterKeySeparator, nonUpdatedSign, leftCurl, rightCurl,
  newLine,
} from './constants';

const stringifyObject = (data, leftPadding) => {
  const property = Object.keys(data)
    .reduce((acc, currentKey) => {
      const currentPadding = [paddingSymbol.repeat(leftPadding), paddingSymbol
        .repeat(paddingFromSign),
      nonUpdatedSign, paddingSymbol.repeat(paddingFromKey)];
      return acc.concat([currentPadding, currentKey, afterKeySeparator, data[currentKey], '\n']);
    }, []);
  return flattenDeep([leftCurl,
    newLine,
    property,
    paddingSymbol.repeat(leftPadding),
    rightCurl]).join('');
};

export default stringifyObject;
