import commander from 'commander';
import renderDiff from '../index';
import getPath from './generic';

export default () => commander
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((data1, data2, options) => {
    const dataBefore = getPath(data1);
    const dataAfter = getPath(data2);
    const diff = renderDiff(dataBefore, dataAfter, options.format || 'default');
    console.log(diff);
  })
  .parse(process.argv);
