'use strict';

const Plugin = require('./lib/plugin');
const TemplatePlugin = require('./lib/template-plugin');
const JavascriptPlugin = require('./lib/javascript-plugin');
const debug = require('debug')('ember-cli:registry');

class Registry {
  constructor(plugins, app) {
    this.registry = {
      js: [],
      css: [],
      'minify-css': [],
      template: [],
    };

    this.instantiatedPlugins = [];
    this.availablePlugins = plugins;
    this.app = app;
    this.pluginTypes = {
      'js': JavascriptPlugin,
      'template': TemplatePlugin,
    };
  }

  extensionsForType(type) {
    let registered = this.registeredForType(type);

    let extensions = registered.reduce((memo, plugin) => memo.concat(plugin.ext), [type]).filter(Boolean);

    extensions = require('ember-cli-lodash-subset').uniq(extensions);

    debug('extensions for type %s: %s', type, extensions);

    return extensions;
  }

  load(type) {
    let knownPlugins = this.registeredForType(type);
    let plugins = knownPlugins.map(plugin => {
      if (this.instantiatedPlugins.indexOf(plugin) > -1 || this.availablePlugins.hasOwnProperty(plugin.name)) {
        return plugin;
      }
    })
        .filter(Boolean);

    debug('loading %s: available plugins %s; found plugins %s;', type, knownPlugins.map(p => p.name), plugins.map(p => p.name));

    return plugins;
  }

  registeredForType(type) {
    return this.registry[type] = this.registry[type] || [];
  }

  add(type, name, extension, options) {
    let registered = this.registeredForType(type);
    let plugin, PluginType;

    // plugin is being added directly do not instantiate it
    if (typeof name === 'object') {
      plugin = name;
      this.instantiatedPlugins.push(plugin);
    } else {
      PluginType = this.pluginTypes[type] || Plugin;
      options = options || {};
      options.applicationName = this.app.name;
      options.app = this.app;

      plugin = new PluginType(name, extension, options);
    }

    debug('add type: %s, name: %s, extension:%s, options:%s', type, plugin.name, plugin.ext, options);

    registered.push(plugin);
  }

  remove(type /* name */) {
    let registered = this.registeredForType(type);
    let registeredIndex, name;

    if (typeof arguments[1] === 'object') {
      name = arguments[1].name;
    } else {
      name = arguments[1];
    }

    debug('remove type: %s, name: %s', type, name);

    for (let i = 0, l = registered.length; i < l; i++) {
      if (registered[i].name === name) {
        registeredIndex = i;
      }
    }

    let plugin = registered[registeredIndex];
    let instantiatedPluginIndex = this.instantiatedPlugins.indexOf(plugin);

    if (instantiatedPluginIndex > -1) {
      this.instantiatedPlugins.splice(instantiatedPluginIndex, 1);
    }

    if (registeredIndex !== undefined && registeredIndex > -1) {
      registered.splice(registeredIndex, 1);
    }
  }
}

module.exports = Registry;
