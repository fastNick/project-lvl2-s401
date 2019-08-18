import commander from 'commander';
import renderDiff from '../index';

export default () => commander
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((dataBefore, dataAfter, options) => {
    console.log(renderDiff(dataBefore, dataAfter, options.format || 'default'));
  })
  .parse(process.argv);
