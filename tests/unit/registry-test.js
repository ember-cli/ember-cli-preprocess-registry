'use strict';

const expect = require('chai').expect;
const PluginRegistry = require('../../');

let pkg, registry, app;

describe('Plugin Loader', function() {
  let fakeSass1, fakeSass2;

  beforeEach(function() {
    app = { name: 'some-application-name' };

    fakeSass1 = { name: 'fake-sass-1', ext: ['scss', 'sass'] };
    fakeSass2 = { name: 'fake-sass-2', ext: ['scss', 'sass'] };

    registry = new PluginRegistry(app);
    registry.add('css', fakeSass1);
    registry.add('css', fakeSass2);
    registry.add('other-type', { name: 'other-thing-1', ext: 'oth' });
  });

  it('returns array of one plugin when only one', function() {
    let plugins = registry.load('other-type');

    expect(plugins.length).to.equal(1);
    expect(plugins[0].name).to.equal('other-thing-1');
  });

  it('returns the correct list of plugins when there are more than one', function() {
    let plugins = registry.load('css');

    expect(plugins.length).to.equal(2);
    expect(plugins[0].name).to.equal('fake-sass-1');
    expect(plugins[1].name).to.equal('fake-sass-2');
  });

  it('returns plugin of the correct type', function() {
    let coffeePlugin = { name: 'broccoli-coffee', ext: ['coffee', 'cs'] };
    registry.add('js', coffeePlugin);
    let plugins = registry.load('js');

    expect(plugins.length).to.equal(1);
    expect(plugins[0]).to.equal(coffeePlugin);
  });

  it('returns null when no plugin available for type', function() {
    let plugins = registry.load('blah');
    expect(plugins.length).to.equal(0);
  });

  it('can specify multiple extensions', function() {
    let plugins = registry.load('css');
    let plugin = plugins[0];

    expect(plugin.ext[0]).to.equal('scss');
    expect(plugin.ext[1]).to.equal('sass');
  });

  it('adds a plugin', function() {
    let randomPlugin = { name: 'Awesome!' };

    registry.add('js', randomPlugin);
    let registered = registry.load('js');

    expect(registered[0]).to.equal(randomPlugin);
  });

  describe('extensionsForType', function() {
    it('includes all extensions for the given type', function() {

      let extensions = registry.extensionsForType('css');

      expect(extensions).to.deep.equal(['css', 'scss', 'sass']);
    });

    it('can handle mixed array and non-array extensions', function() {
      registry.add('css', { name: 'broccoli-foo', ext: 'foo' });
      let extensions = registry.extensionsForType('css');

      expect(extensions).to.deep.equal(['css', 'scss', 'sass', 'foo']);
    });

    it('will removed non defined extensions from list', function() {
      registry.add('css', 'broccoli-foo');
      let extensions = registry.extensionsForType('css');

      expect(extensions).to.deep.equal(['css', 'scss', 'sass']);
    });
  });

  describe('adds a plugin directly if it is provided', function() {
    it('returns an empty array if called on an unknown type', function() {
      expect(registry.registeredForType('foo')).to.deep.equal([]);
    });

    it('returns the current array if type is found', function() {
      let fooArray = ['something', 'else'];

      registry.registry['foo'] = fooArray;

      expect(registry.registeredForType('foo')).to.deep.equal(fooArray);
    });
  });

  it('allows removal of a specified plugin', function() {
    registry.remove('css', fakeSass1);

    let plugins = registry.load('css');
    expect(plugins.length).to.equal(1);
    expect(plugins[0]).to.equal(fakeSass2);
  });

  it('allows removal of plugin added as instantiated objects', function() {
    let randomPlugin, plugins;

    randomPlugin = { name: 'Awesome!' };
    registry.add('foo', randomPlugin);

    plugins = registry.load('foo');
    expect(plugins[0]).to.equal(randomPlugin); // precondition

    registry.remove('foo', randomPlugin);

    plugins = registry.load('foo');
    expect(plugins.length).to.equal(0);
  });

  it('an unfound item does not affect the registered list', function() {
    let plugins;

    let blah = { name: 'blah-zorz', ext: 'zorz' };
    let blammo = { name: 'blammo', ext: 'blam' };

    registry.add('foo', blah);
    registry.add('foo', blammo);

    plugins = registry.load('foo');

    expect(plugins).to.deep.eql([blah, blammo]); // precondition

    registry.remove('foo', { name: 'whatever' });
    plugins = registry.load('foo');

    expect(plugins).to.deep.eql([blah, blammo]);

    registry.remove('foo', blah);
    plugins = registry.load('foo');

    expect(plugins).to.eql([blammo]);
  });
});
