import { join as buildPath } from 'path';
import gendiff from 'gendiff';

import { getDataFromFile, areDiffsEqual } from '../src/lib/helper';

beforeAll(() => console.log('Calculation of files\' difference: '));

test('#1. Compare difference of files before.json and after.json with gendiff.txt:', () => {
  const comparingDiffObject = gendiff('before.json', 'after.json');
  const properDiffFile = buildPath(__dirname, '__fixtures__/gendiff.txt');
  const properDiffText = getDataFromFile(properDiffFile);
  expect(areDiffsEqual(comparingDiffObject, properDiffText)).toBeTruthy();
});
test('#2. Compare difference of files before.json and after.json with gendiff_variation.txt:', () => {
  const comparingDiffObject = gendiff('before.json', 'after.json');
  const properDiffFile = buildPath(__dirname, '__fixtures__/gendiff variation.txt');
  const properDiffText = getDataFromFile(properDiffFile);
  expect(areDiffsEqual(comparingDiffObject, properDiffText)).toBeTruthy();
});
