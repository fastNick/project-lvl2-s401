import { calculateDifferenceForTwoFiles as calcDiff } from './lib/helper';

const diff = (firstConfig, secondConfig) => calcDiff(firstConfig, secondConfig);

export default diff;
