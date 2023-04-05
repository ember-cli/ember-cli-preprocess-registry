
## v5.0.0 (2023-04-05)

#### :boom: Breaking Change
* [#109](https://github.com/ember-cli/ember-cli-preprocess-registry/pull/109) Drop support for Node < 16 ([@kategengler](https://github.com/kategengler))
* [#22](https://github.com/ember-cli/ember-cli-preprocess-registry/pull/22) ([@rwjblue](https://github.com/rwjblue))
  * ES6ify
  * Remove support for legacy template plugins (they already didn't work in ember-cli, so no need to keep support around internally).
  * Remove support for registry.add('<type>', '<some package name>') in favor of registry.add('<type>', instanceWithExpectedInterface);
  * Remove built-in default `minify-css` plugin. End users of ember-cli will need `ember-cli-clean-css` or alternatives. 

#### :house: Internal
* [#114](https://github.com/ember-cli/ember-cli-preprocess-registry/pull/114) Add release setup ([@kategengler](https://github.com/kategengler))
* [#113](https://github.com/ember-cli/ember-cli-preprocess-registry/pull/113) Upgrade broccoli-funnel ([@kategengler](https://github.com/kategengler))
* [#109](https://github.com/ember-cli/ember-cli-preprocess-registry/pull/109) Add github workflow + dependabot config ([@kategengler](https://github.com/kategengler))
* [#63](https://github.com/ember-cli/ember-cli-preprocess-registry/pull/63) Remove unused arguments for Registry ([@2hu12](https://github.com/2hu12))

#### Committers: 2
- 2hu ([@2hu12](https://github.com/2hu12))
- Katie Gengler ([@kategengler](https://github.com/kategengler))


## v4.0.0

4.0 was yanked due to accidentally introducing a breaking change into ember-cli. Please see [this issue](https://github.com/ember-cli/ember-cli-preprocess-registry/issues/50) for more information.


## v3.3.0

#### Enhancement
* [#57](https://github.com/ember-cli/ember-cli-preprocess-registry/pull/57) preprocessMinifyCss: Add processPlugins() as fallback for failing relativeRequire() ([@Turbo87](https://github.com/Turbo87))

## v3.2.2 (2019-02-27)

#### :bug: Bug Fix
* [#55](https://github.com/ember-cli/ember-cli-preprocess-registry/pull/55) Revert `broccoli-clean-css` to v1.1.0 ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v3.2.1 (2019-02-21)

#### :bug: Bug Fix
* [#48](https://github.com/ember-cli/ember-cli-preprocess-registry/pull/48) Fix `broccoli-clean-css` invocation ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v3.2.0 (2019-02-08)

#### :house: Internal
* [#45](https://github.com/ember-cli/ember-cli-preprocess-registry/pull/45) CI: Run on Node 4 for v3.x branch ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


# Changelog
