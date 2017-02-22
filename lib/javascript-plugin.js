'use strict';

const Plugin = require('./plugin');
const relativeRequire = require('process-relative-require');

class JavascriptPlugin extends Plugin {
  constructor(name, ext, options) {
    super(name, ext, options);
    this.type = 'js';
  }

  toTree(tree, inputPath, outputPath, options) {
    if (this.name.indexOf('ember-script') !== -1) {
      options = options || {};
      options.bare = true;
      options.srcDir = inputPath;
      options.destDir = outputPath;
    }

    return relativeRequire(this.name).call(null, tree, options);
  }
}

module.exports = JavascriptPlugin;
