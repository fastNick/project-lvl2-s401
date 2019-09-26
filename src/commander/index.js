import commander from 'commander';
import getRenderedGenDiff from '..';

export default printFunc => commander
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((source1, source2, options) => {
    const renderedGenDiff = getRenderedGenDiff(source1, source2, options.format);
    printFunc(renderedGenDiff);
  })
  .parse(process.argv);
