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

## Automated tasks

Provides a set of util tasks to work with [AlloyUI](http://github.com/liferay/alloy-ui) project.

> To change any default option from a task check [Gruntfile.js](https://github.com/liferay/alloy-ui/blob/master/Gruntfile.js).

### Setup

1. Install [NodeJS](https://github.com/bevry/community/wiki/Installing-Node), if you don't have it yet.

2. Install global dependencies:

    ```
[sudo] npm install -g grunt-cli shifter yogi yuidocjs
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

* Build YUI and AlloyUI:

    ```
grunt build
    ```

* Build only YUI:

    ```
grunt build:yui
    ```

* Build only AlloyUI:

    ```
grunt build:aui
    ```

* Build and import Bootstrap's CSS:

    ```
grunt bootstrap
    ```

### Watch

* Watch and build for any changes:

    ```
grunt watch
    ```

### Create

* Create a new module under `src/` folder:

    ```
grunt create
    ```

### Release

* Generate a release zip file:

    ```
grunt compress
    ```

* Build modules and generate a release zip file:

    ```
grunt release
    ```

### Test

* Run unit tests:

    ```
grunt test
    ```

### API Docs

* Build docs locally:

    ```
grunt api-build
    ```

* Build docs locally and deploy it to alloyui.com:

    ```
grunt api-deploy
    ```


* Run docs locally and watch for any changes:

    ```
grunt api-watch
    ```

## Discussion

* [Liferay Forums](http://www.liferay.com/community/forums/-/message_boards/category/8409523)
* [Google Groups](https://groups.google.com/forum/?fromgroups#!forum/alloyui)
* [Stack Overflow](http://stackoverflow.com/questions/tagged/alloy-ui)

## Structure

The basic structure of the project is given in the following way:

* `build/` Contains AlloyUI and YUI generated files, once Yogi Alloy's build task has been run. However, this directory is unnecessary for versioning, so it is ignored ([.gitignore](https://github.com/liferay/alloy-ui/tree/2.0.x/.gitignore)).
* `demos/` Contains basic examples of the AlloyUI modules.
* `src/` Contains the source code of the AlloyUI modules.
* `.alloy.json` Specifies all dependencies and some configurations.
* `.editorconfig` Specifies the coding style for different editors/IDEs.
* `LICENSE.md` Defines the license agreement for AlloyUI.
* `README.md` Explains the AlloyUI project.
* `package.json` Lists all NodeJS dependencies.


## Team

AlloyUI is maintained by these people and a bunch of awesome [contributors](https://github.com/liferay/alloy-ui/graphs/contributors).

[![Eduardo Lundgren](http://gravatar.com/avatar/42327de520e674a6d1686845b30778d0?s=70)](https://github.com/eduardolundgren) | [![Nate Cavanaugh](http://gravatar.com/avatar/3f754d8a639c608d338b580b446c59d6?s=70)](https://github.com/natecavanaugh) | [![Bruno Basto](http://gravatar.com/avatar/4d7367e850216a8e6f9be296c74f0d68?s=70)](https://github.com/brunobasto) | [![Iliyan Peychev](http://gravatar.com/avatar/c2a0cb9ed0d19196b7fe061055c18838?s=70)](https://github.com/ipeychev) | [![Zeno Rocha](http://gravatar.com/avatar/e190023b66e2b8aa73a842b106920c93?s=70)](https://github.com/zenorocha)
--- | --- | --- | --- | --- | --- | ---
[Eduardo Lundgren](https://github.com/eduardolundgren) | [Nate Cavanaugh](https://github.com/natecavanaugh) | [Bruno Basto](https://github.com/brunobasto) | [Iliyan Peychev](https://github.com/ipeychev) | [Zeno Rocha](https://github.com/zenorocha)

## License

[BSB license](https://github.com/liferay/alloy-ui/tree/2.0.x/LICENSE.md)