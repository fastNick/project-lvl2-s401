import { isPlainObject } from 'lodash';
import {
  paddingFromKey, paddingFromSign, paddingSymbol, nonUpdatedSign, paddingFromValue,
} from './constants';

export const generatePadding = length => paddingSymbol.repeat(length);

export const leftPaddingFromSign = (parentSign, depth) => {
  const count = paddingFromSign * depth
    + (parentSign.length + paddingFromKey) * (depth - 1);
  return generatePadding(count);
};

export const leftPaddingFromKey = () => paddingSymbol.repeat(paddingFromKey);
export const leftPaddingFromValue = () => paddingSymbol.repeat(paddingFromValue);


export const stringify = (value, parentSign, depth) => (isPlainObject(value)
  ? '{\n'
    .concat(Object.keys(value)
      .reduce((acc, key) => {
        const signString = `${leftPaddingFromSign(parentSign, depth)}${nonUpdatedSign}`;
        return acc
          .concat(`${signString}${key}:${value[key]}\n`);
      }, []))
    .concat(`${leftPaddingFromSign(parentSign, depth - 1)}`)
    .concat(`${generatePadding(nonUpdatedSign.length + paddingFromKey)}`)
    .concat('}')
  : value);

export const generateLine = (parentSign, depth, sign, key, value) => `${leftPaddingFromSign(parentSign, depth)}
  ${sign}
  ${leftPaddingFromKey}${key}:
  ${leftPaddingFromValue}${stringify(value, sign, depth + 1)}\n`;
