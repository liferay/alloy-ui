# AlloyUI

![AlloyUI Robo Suit](https://cloud.githubusercontent.com/assets/398893/3529038/980b55ca-0795-11e4-9ffe-2a41953f1df8.jpg)

AlloyUI is a framework built on top of [YUI3](http://yuilibrary.com) (JavaScript) that uses [Bootstrap 3](http://getbootstrap.com/) (HTML/CSS) to provide a simple API for building high scalable applications.

* [Official Website](http://alloyui.com/)
* [Examples](http://alloyui.com/examples/)
* [Tutorials](http://alloyui.com/tutorials/)
* [API Docs](http://alloyui.com/api/)
* [Rosetta Stone](http://alloyui.com/rosetta-stone/)
* [Contributing](http://alloyui.com/contributing/)
* [About](http://alloyui.com/about/)

## Browser Support

As an user interface framework we do care about browser support. Most of our modules use all the power of HTML5, so for old browsers we provide fallbacks in Flash.

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png)
--- | --- | --- | --- | --- |
IE 8+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Automated tasks

Here you can find a set of util tasks to work with [AlloyUI](http://github.com/liferay/alloy-ui) project using [Gulp](http://gulpjs.com/).

```
gulp <command>
```

### Setup

1. Install NodeJS >= [v0.11.13](http://nodejs.org/dist/v0.11.13/), if you don't have it yet.

2. Install global dependencies:

    ```
[sudo] npm install -g gulp
    ```

3. Install local dependencies:

    ```
npm install
    ```

### Init

* Fetch dependencies using [Bower](http://bower.io/) and [NPM](https://www.npmjs.org/), then copy YUI3 files to `build` folder:

    ```
gulp init
    ```

### Build

* Build AlloyUI & YUI3 using [Shifter](http://yui.github.io/shifter/):

    ```
gulp build
    ```

* Build AlloyUI loader:

    ```
gulp build-loader
    ```

### Watch

* Watch for any changes and build using [Shifter](http://yui.github.io/shifter/):

    ```
gulp watch
    ```

### Create

* Create a new module under `src` folder using [Yogi](http://yui.github.io/yogi/):

    ```
gulp create
    ```

### Format

* Format CSS & JavaScript code:

    ```
gulp format
    ```

* Format only CSS code using [CSS Beautify](https://www.npmjs.org/package/cssbeautify/):

    ```
gulp format-css
    ```

* Format only JavaScript code using [JS Beautify](https://www.npmjs.org/package/js-beautify/):

    ```
gulp format-js
    ```

### Lint

* Lint JavaScript code using [JSHint](http://www.jshint.com/):

    ```
gulp lint
    ```

### Release

* Build modules and generate a release zip file:

    ```
gulp release
    ```

* Build modules optimized for CDN and generate a release zip file:

    ```
gulp release-cdn
    ```

### Test

* Run unit tests using [PhantomJS](http://phantomjs.org/):

    ```
gulp test
    ```

* Run unit tests and code coverage using [Yogi](http://yui.github.io/yogi/):

    ```
gulp test-coverage
    ```

* Run tests in the browser using [Yeti](http://yeti.cx/):

    ```
gulp test-browser
    ```

### Code Coverage Report

* Show code coverage summary using [Istanbul](https://github.com/gotwarlost/istanbul):

   ```
gulp report
   ```

* Open code coverage report in the browser:

    ```
gulp report-browser
    ```

### Update

* Update dependencies using [Bower](http://bower.io/) and [NPM](https://www.npmjs.org/):

    ```
gulp update
    ```

### API Docs

* Import code examples from alloyui.com and build docs locally using [YUIDoc](http://yui.github.io/yuidoc/):

    ```
gulp api
    ```

* Watch for any changes and build docs locally using [YUIDoc](http://yui.github.io/yuidoc/):

    ```
gulp api-watch
    ```

## Discussion

* [Liferay Forums](http://www.liferay.com/community/forums/-/message_boards/category/8409523)
* [Google Groups](https://groups.google.com/forum/?fromgroups#!forum/alloyui)
* [Stack Overflow](http://stackoverflow.com/questions/tagged/alloy-ui)

## Structure

The basic structure of the project is given in the following way:

* `bower_components/` Contains all dependencies fetched via [Bower](http://bower.io/). However, this directory is unnecessary for versioning, so it is ignored ([.gitignore](https://github.com/liferay/alloy-ui/blob/master/.gitignore)).
* `build/` Contains AlloyUI and YUI generated files, once build task has been run. However, this directory is unnecessary for versioning, so it is ignored ([.gitignore](https://github.com/liferay/alloy-ui/blob/master/.gitignore)).
* `demos/` Contains basic examples of the AlloyUI modules.
* `src/` Contains the source code of the AlloyUI modules.
* `tasks/` Contains the source code of the [Gulp](http://gulpjs.com/) tasks.
* `.alloy.json` Specifies all dependencies and some configurations.
* `.editorconfig` Specifies the coding style for different editors/IDEs.
* `.jsbeautifyrc` Specifies the coding format rules for [JSBeautify](http://jsbeautifier.org/).
* `.jshintrc` Specifies the linting configurations for [JSHint](http://www.jshint.com/).
* `.yeti.json` Specifies the testing configurations for [Yeti](http://yeti.cx/).
* `LICENSE.md` Defines the license agreement for AlloyUI.
* `README.md` Explains the AlloyUI project.
* `package.json` Lists all NodeJS dependencies.

## Team

AlloyUI is maintained by these people and a bunch of awesome [contributors](https://github.com/liferay/alloy-ui/graphs/contributors).

[![Eduardo Lundgren](http://gravatar.com/avatar/42327de520e674a6d1686845b30778d0?s=70)](https://github.com/eduardolundgren) | [![Nate Cavanaugh](http://gravatar.com/avatar/3f754d8a639c608d338b580b446c59d6?s=70)](https://github.com/natecavanaugh) | [![Bruno Basto](http://gravatar.com/avatar/4d7367e850216a8e6f9be296c74f0d68?s=70)](https://github.com/brunobasto) | [![Iliyan Peychev](http://gravatar.com/avatar/c2a0cb9ed0d19196b7fe061055c18838?s=70)](https://github.com/ipeychev) | [![Zeno Rocha](http://gravatar.com/avatar/e190023b66e2b8aa73a842b106920c93?s=70)](https://github.com/zenorocha)
--- | --- | --- | --- | --- | --- | ---
[Eduardo Lundgren](https://github.com/eduardolundgren) | [Nate Cavanaugh](https://github.com/natecavanaugh) | [Bruno Basto](https://github.com/brunobasto) | [Iliyan Peychev](https://github.com/ipeychev) | [Zeno Rocha](https://github.com/zenorocha)

## History

Discover all versions in the [Releases](https://github.com/liferay/alloy-ui/releases) page.

Each module (located under `src/`) contains a `HISTORY.md` file, check them for detailed changelog.

## License

[BSB License](https://github.com/liferay/alloy-ui/blob/master/LICENSE.md) (c) Liferay, Inc.
