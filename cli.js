#!/usr/bin/env node
'use strict';

var pkg = require('./package.json');
var statsministerietSpeeches = require('./');
var argv = process.argv.slice(2);

var fs = require('fs');

function help() {
  console.log([
    '',
      '  ' + pkg.description,
    '',
    '  Example',
    '    statsministeriet-speeches ',
    ''
  ].join('\n'));
}

if (argv.indexOf('--help') !== -1) {
  help();
  return;
}

if (argv.indexOf('--version') !== -1) {
  console.log(pkg.version);
  return;
}


statsministerietSpeeches(argv[0], function(err, data){
  console.log(JSON.stringify(data, null, 4));
    fs.writeFile('speech.md', data.markdown, function(){});
});
