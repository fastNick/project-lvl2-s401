import commander from 'commander';
import convertToObject from '../parsers';
import gendiff from '..';
import getData from '../lib/file';

export default () => commander
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((source1, source2, options) => {
    const data1 = getData(source1);
    const data2 = getData(source2);
    const beforeObject = convertToObject(data1);
    const afterObject = convertToObject(data2);
    const result = gendiff(beforeObject, afterObject, options.format);
    console.log(result);
  })
  .parse(process.argv);
