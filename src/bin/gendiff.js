#!/usr/bin/env node

import commander from 'commander';
import getRenderedGenDiff from '..';

commander
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((source1, source2, options) => {
    console.log(getRenderedGenDiff(source1, source2, options.format));
  })
  .parse(process.argv);
