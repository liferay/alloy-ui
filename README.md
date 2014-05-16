# AlloyUI

![AlloyUI Robo Suit](http://f.cl.ly/items/292d3K0l3j221n3m0V0D/Alloy-Robo-Suit.jpg)

AlloyUI is a framework built on top of [YUI3](http://yuilibrary.com) (JavaScript) that uses [Bootstrap](http://liferay.github.io/alloy-bootstrap/) (HTML/CSS) to provide a simple API for building high scalable applications.

* [Official Website](http://alloyui.com/)
* [Examples](http://alloyui.com/examples/)
* [Tutorials](http://alloyui.com/tutorials/)
* [API Docs](http://alloyui.com/api/)
* [Rosetta Stone](http://alloyui.com/rosetta-stone/)
* [Contributing](http://alloyui.com/contributing/)
* [About](http://alloyui.com/about/)

## Browser Support

As an user interface framework we do care about browser support. Most of our modules use all the power of HTML5, so for old browsers we provide fallbacks in Flash.

![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 7+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Automated tasks

Provides a set of util tasks to work with [AlloyUI](http://github.com/liferay/alloy-ui) project.

To change any default option from a task check [Gruntfile.js](https://github.com/liferay/alloy-ui/blob/master/Gruntfile.js). You can also overwrite those options via command-line, for example:

```
grunt command --option value
```

### Setup

1. Install [NodeJS](http://nodejs.org/download/), if you don't have it yet.

	Some tasks requires you to have [Ruby](http://www.ruby-lang.org/en/downloads/), [Sass](http://sass-lang.com/tutorial.html), and [Compass](http://compass-style.org/install/) installed. If you're on OS X or Linux you probably already have Ruby installed; test with `ruby -v` in your terminal. When you've confirmed you have Ruby installed, run `gem update --system && gem install compass` to install Compass and Sass.


2. Install global dependencies:

    ```
[sudo] npm install -g grunt-cli shifter yogi yuidocjs phantomjs grover istanbul
    ```

3. Install local dependencies:

    ```
npm install
    ```

4. Initialize dependencies:

    ```
grunt init
    ```

### Build

* Fetch dependencies and build AlloyUI:

    ```
grunt all
    ```

* Build AlloyUI:

    ```
grunt build
    ```

* Build a single AlloyUI module:

    ```
grunt build:aui --src src/aui-module-name
    ```

### Watch

* Watch and build for any changes:

    ```
grunt watch
    ```

* Watch and build for any single module changes:

    ```
grunt watch --src src/aui-module-name
    ```

### Create

* Create a new module under `src/` folder:

    ```
grunt create --name aui-module-name
    ```

### Format/Lint

* Format JavaScript source code:

    ```
grunt format
    ```

* Lint JavaScript source code using JSHint.

    ```
grunt lint
    ```

### Release

* Generate a zip file:

    ```
grunt zip
    ```

* Build modules and generate a release zip file:

    ```
grunt release
    ```

* Build modules optimized for CDN and generate a release zip file:

    ```
grunt release-cdn
    ```

### Test

* Run unit tests:

    ```
grunt test
    ```

* Run code coverage:

    ```
grunt test --coverage
    ```

### API Docs

* Import code examples from alloyui.com and build docs locally:

    ```
grunt api
    ```

* Run docs locally and watch for any changes:

    ```
grunt api-watch
    ```

* Run `grunt api` and deploy it to alloyui.com:

    ```
grunt api-deploy
    ```

## Discussion

* [Liferay Forums](http://www.liferay.com/community/forums/-/message_boards/category/8409523)
* [Google Groups](https://groups.google.com/forum/?fromgroups#!forum/alloyui)
* [Stack Overflow](http://stackoverflow.com/questions/tagged/alloy-ui)

## Structure

The basic structure of the project is given in the following way:

* `build/` Contains AlloyUI and YUI generated files, once build task has been run. However, this directory is unnecessary for versioning, so it is ignored ([.gitignore](https://github.com/liferay/alloy-ui/blob/master/.gitignore)).
* `demos/` Contains basic examples of the AlloyUI modules.
* `src/` Contains the source code of the AlloyUI modules.
* `tasks/` Contains the source code of the [Grunt](http://gruntjs.com/) tasks.
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
