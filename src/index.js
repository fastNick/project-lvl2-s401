import { calculateDiff, renderDiff } from './lib/helper';

export default (firstConfig, secondConfig) => renderDiff(
  calculateDiff(firstConfig, secondConfig),
);
