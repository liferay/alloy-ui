# AlloyUI - Continuum Security Fork
This fork starts from version 3.1.0 and is born out of the necessity to create new features to apply Threat Modeling diagraming standards.

## Version
Current version 3.2.0

## Features

### Disable of deleting (by key pressing and by button)
Optional to hide the delete button which appeared when the user click in a node and also can disable
the delete by key pressing the DELETE key.
````javascript
new Y.DiagramBuilder({
    showDeleteNodeIcon: false,
    enableDeleteByKeyStroke: false
});
````

### New Group Node
New group node which can embed several nodes as children, allowing them to drag&drop all together

```javascript
new Y.DiagramBuilder({
    fields: [
        {
            name: 'Task',
            type: 'start',
            xy: [10, 10]
        },
        {
            name: 'Task',
            type: 'task',
            xy: [10, 10]
        },{
            name: 'Group',
            type: 'group',
            xy: [350, 50],
            width: 200,
            height: 500,
            allowsLinking: false,
            children: ['Task', 'Start']
        }]
});
```

### Custom Mouseover function for transitions
Adds custom function which is executed when hovering the transition. Two type of event can be produced: `mouseEnter` 
and `mouseLeave`.

This function is passed as `string` and then the javascript `eval` function is need to execute the custom function. 
(No good, but only solution I could think of to be able to integrate with Vaadin Plugin diagram-builder)

```javascript

var mouseOverFn = '(function (data) {  console.log(data);    })';

diagramBuilder.connectAll([
    {
        connector: { name: 'Link', onMouseMove: mouseOverFn },
        source: 'Start',
        target: 'Condition'
    }
])

```

### Disables deleting from key events
Key events which delete nodes has been disabled

### Option to set height and width of Task and Group nodes
User can customize the height or width of a Task

```javascript
{
    name: 'My Group',
    type: 'group',
    xy: [400, 100],
    width: 200,
    height: 400
}
```

### Option to disable manual linking from Task to Task
User can optionally disable manual linking so users cannot link two tasks through the User Interface
```javascript
{
    name: 'My Task',
    type: 'task',
    xy: [400, 100],
    allowsLinking: false
}
```

# AlloyUI - Official Repository

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

[BSD-3-Clause License](https://github.com/liferay/alloy-ui/blob/master/LICENSE.md) (c) Liferay, Inc.
