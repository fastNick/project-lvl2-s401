import commander from 'commander';
import helper from '../lib/helper';

export default () => {
  commander
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'Output format')
    .action(() => {
      helper();
    })
    .parse(process.argv);
};
