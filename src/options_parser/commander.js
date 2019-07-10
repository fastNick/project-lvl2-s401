import helper from '../lib/helper'

export default () => {
  const program = require('commander');
    
program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]','Output format')  
  .action(function (firstConfig, secondConfig) {    
    helper(firstConfig, secondConfig, this);
  })
  .parse(process.argv);
}