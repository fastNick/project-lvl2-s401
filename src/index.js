import { calculateDiff, renderDiff } from './lib/helper';

export const gendiff = (firstConfig, secondConfig) => calculateDiff(firstConfig, secondConfig);

export const render = (firstConfig, secondConfig) => renderDiff(
  calculateDiff(firstConfig, secondConfig),
);
