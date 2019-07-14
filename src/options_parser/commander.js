import commander from 'commander';
import { calculateDifferenceForTwoFiles } from '../lib/helper';

export default () => commander
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    console.log(calculateDifferenceForTwoFiles(firstConfig, secondConfig));
  })
  .parse(process.argv);
