'use strict';

const expect = require('chai').expect;
const p = require('../../../preprocessors');
const Registry = require('../../../');

describe('defaultRegistry', function() {
  let fakeApp;
  beforeEach(function() {
    fakeApp = {
      dependencies() { },
    };
  });

  it('creates a new Registry instance', function() {
    let registry = p.defaultRegistry(fakeApp);

    expect(registry).to.an.instanceof(Registry);
  });
});
