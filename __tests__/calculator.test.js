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
test('#3. Compare difference of files before.yml and after.yml with gendiff.txt:', () => {
  const comparingDiffObject = gendiff('before.yml', 'after.yml');
  const properDiffFile = buildPath(__dirname, '__fixtures__/gendiff.txt');
  const properDiffText = getDataFromFile(properDiffFile);
  expect(areDiffsEqual(comparingDiffObject, properDiffText)).toBeTruthy();
});
test('#4. Compare difference of files before.yml and after.yml with gendiff_variation.txt:', () => {
  const comparingDiffObject = gendiff('before.yml', 'after.yml');
  const properDiffFile = buildPath(__dirname, '__fixtures__/gendiff variation.txt');
  const properDiffText = getDataFromFile(properDiffFile);
  expect(areDiffsEqual(comparingDiffObject, properDiffText)).toBeTruthy();
});
test('#5. Compare difference of files before.ini and after.ini with gendiff.txt:', () => {
  const comparingDiffObject = gendiff('before.ini', 'after.ini');
  const properDiffFile = buildPath(__dirname, '__fixtures__/gendiff.txt');
  const properDiffText = getDataFromFile(properDiffFile);
  expect(areDiffsEqual(comparingDiffObject, properDiffText)).toBeTruthy();
});
test('#6. Compare difference of files before.ini and after.ini with gendiff_variation.txt:', () => {
  const comparingDiffObject = gendiff('before.ini', 'after.ini');
  const properDiffFile = buildPath(__dirname, '__fixtures__/gendiff variation.txt');
  const properDiffText = getDataFromFile(properDiffFile);
  expect(areDiffsEqual(comparingDiffObject, properDiffText)).toBeTruthy();
});
