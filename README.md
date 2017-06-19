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

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png "Internet Explorer") | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png "Google Chrome") | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png "Mozilla Firefox") | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png "Opera") | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png "Safari")
--- | --- | --- | --- | --- |
IE 8+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Automated tasks

We use [Gulp](http://gulpjs.com/), a task-runner in Node, to automate things.

```
gulp <command>
```

To discover the most commonly used tasks, run:

```
gulp help
```

### Setup

1. Install NodeJS <= [v0.12.0](http://nodejs.org/dist/v0.12.0/), if you don't have it yet.

2. Install global dependencies:

```
[sudo] npm install -g gulp
```

3. Install local dependencies:

```
npm install
```

4. Build AlloyUI & YUI3 using Shifter:

```
gulp build
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
--- | --- | --- | --- | ---
[Eduardo Lundgren](https://github.com/eduardolundgren) | [Nate Cavanaugh](https://github.com/natecavanaugh) | [Bruno Basto](https://github.com/brunobasto) | [Iliyan Peychev](https://github.com/ipeychev) | [Zeno Rocha](https://github.com/zenorocha)

## History

Discover all versions in the [Releases](https://github.com/liferay/alloy-ui/releases) page.

Each module (located under `src/`) contains a `HISTORY.md` file, check them for detailed changelog.

## License

[BSB License](https://github.com/liferay/alloy-ui/blob/master/LICENSE.md) (c) Liferay, Inc.
