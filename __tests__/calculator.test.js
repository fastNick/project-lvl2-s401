// import gendiff from 'gendiff';
import { gendiff } from '../src';

import {
  testEquality, convertDiffFileToTree, renderDiff, flatFormat,
} from '../src/lib/helper';

beforeAll(() => console.log('Calculation of files\' difference: '));

test('#1. Compare difference of files before.json and after.json with gendiff.txt:', () => {
  console.log(gendiff);
  const comparingDiffObject = gendiff('before.json', 'after.json');
  const tree = convertDiffFileToTree('gendiff.txt');
  expect(testEquality(comparingDiffObject, tree)).toBeTruthy();
});

test('#2. Compare difference of files before.yml and after.yml with gendiff.txt:', () => {
  const comparingDiffObject = gendiff('before.yml', 'after.yml');
  const tree = convertDiffFileToTree('gendiff.txt');
  expect(testEquality(comparingDiffObject, tree)).toBeTruthy();
});
test('#3. Compare difference of files before.ini and after.ini with gendiff.txt:', () => {
  const comparingDiffObject = gendiff('before.ini', 'after.ini');
  const tree = convertDiffFileToTree('gendiff.txt');
  expect(testEquality(comparingDiffObject, tree)).toBeTruthy();
});

test('#4. Compare difference of files before__nested.json and after__nested.json with gendiff__nested.txt:', () => {
  const comparingDiffObject = gendiff('before__nested.json', 'after__nested.json', 1);
  const tree = convertDiffFileToTree('gendiff__nested.txt');
  expect(testEquality(comparingDiffObject, tree)).toBeTruthy();
});

test('#5. Compare difference of files before__nested.yml and after__nested.yml with gendiff__nested.txt:', () => {
  const comparingDiffObject = gendiff('before__nested.yml', 'after__nested.yml', 1);
  const tree = convertDiffFileToTree('gendiff__nested.txt');
  expect(testEquality(comparingDiffObject, tree)).toBeTruthy();
});

test('#6. Compare difference of files before__nested.ini and after__nested.ini with gendiff__nested.txt:', () => {
  const comparingDiffObject = gendiff('before__nested.ini', 'after__nested.ini', 1);
  const tree = convertDiffFileToTree('gendiff__nested.txt');
  expect(testEquality(comparingDiffObject, tree)).toBeTruthy();
});

test('#7. Print', () => {
  const comparingDiffObject = gendiff('before__nested.ini', 'after__nested.ini', 1);
  console.log(comparingDiffObject);
  console.log(renderDiff(comparingDiffObject));
});

test('#8. Print', () => {
  const comparingDiffObject = gendiff('before__nested.json', 'after__nested.json', 1);
  console.log(comparingDiffObject);
  const result = flatFormat(comparingDiffObject);
  console.log(result);
});
