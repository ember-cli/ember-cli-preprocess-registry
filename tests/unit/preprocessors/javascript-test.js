'use strict';

let expect       = require('chai').expect;
let preprocessJs = require('../../../preprocessors').preprocessJs;

let registry, plugins;

describe('preprocessJs', function() {
  function generatePlugin(name, toTree) {
    return {
      name: name,
      toTree: toTree
    };
  }

  beforeEach(function() {
    registry = {
      load: function() {
        return plugins;
      }
    };
  });

  it('calls can call multiple plugins', function() {
    let pluginsCalled = [];
    let toTree = function() {
      pluginsCalled.push(this.name);
    };

    plugins = [
      generatePlugin('foo', toTree),
      generatePlugin('bar', toTree)
    ];

    preprocessJs('app', '/', 'foo.js', {
      registry: registry
    });

    expect(pluginsCalled).to.deep.equal(['foo', 'bar']);
  });

  it('passes the previously returned value into the next plugin', function() {
    let treeValues = [];
    let toTree = function(tree) {
      treeValues.push(tree);

      return this.name;
    };

    plugins = [
      generatePlugin('foo', toTree),
      generatePlugin('bar', toTree)
    ];

    let output = preprocessJs('app', '/', 'foo.js', {
      registry: registry
    });

    expect(treeValues).to.deep.equal(['app', 'foo']);
    expect(output).to.equal('bar');
  });
});
