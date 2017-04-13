'use strict';

let paths = [
  'index.js',
  'preprocessors.js',
  'lib',
  'tests',
];

require('mocha-eslint')(paths, {
  timeout: 5000,
  slow: 1000,
});
