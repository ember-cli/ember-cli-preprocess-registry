'use strict';

const Plugin = require('./plugin');
const relativeRequire = require('process-relative-require');

class TemplatePlugin extends Plugin {
  constructor(name, ext, options) {
    super(name, ext, options);
    this.type = 'template';
  }

  toTree(tree) {
    return relativeRequire(this.name).call(null, tree, {
      extensions: this.ext,
      module: true,
    });
  }
}

module.exports = TemplatePlugin;

