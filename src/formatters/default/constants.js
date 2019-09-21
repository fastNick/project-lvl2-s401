const removedSign = '-';
const addedSign = '+';
export const nonUpdatedSign = ' ';
export const paddingSymbol = ' ';
export const paddingFromSign = 2;
export const paddingFromKey = 1;
export const paddingInitial = '';
export const leftCurl = '{';
export const rightCurl = '}';
export const newLine = '\n';
export const afterKeySeparator = ': ';

export const signsByASTNode = {
  deleted: removedSign,
  inserted: addedSign,
  changed: addedSign,
  'not changed': nonUpdatedSign,
  nested: nonUpdatedSign,
};
