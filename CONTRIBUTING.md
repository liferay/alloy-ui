# Contributing

Over the years, tests and documentation have sometimes been sacrificed in order to speed up the development process. As result, not all of the modules had tests or documentation. When there were only two or three developers, the lack of tests was not a big issue since they knew the code very well and the risk of regressions was relatively low, however, when more and more [contributors](http://alloyui.com/about/) were involved, this stopped working and made it harder and harder to keep the library in good condition.

As a result, we have instituted new policies related to the tests and documentation which have recently been added to AlloyUI. We would love to share them with you:

## 1. Issues

First of all, you should know that we are not using [GitHub Issues](https://github.com/liferay/alloy-ui/issues), instead we use [Jira](http://issues.liferay.com/browse/AUI).

In order for us to help you, please check that you have completed the following steps:

* Make sure that you are using the latest version.
* Look through the list of issues to ensure that the bug has not already been reported.

If you are still facing the problem, go ahead and [create an issue](http://issues.liferay.com/secure/CreateIssue!default.jspa). Just remember to include as much information about the bug as possible.

## 2. Code Style

This project uses single-quotes, four space indentation and white space around arguments. Please ensure any pull requests follow this closely by using the [EditorConfig file](https://github.com/liferay/alloyui.com/blob/master/.editorconfig) and linting your code with our [JSHint options](https://github.com/liferay/alloyui.com/blob/master/.jshintrc). If you notice existing code which does not follow these practices, feel free to shout out and we will change it.

> See [AlloyUI Code Style Guidelines](https://github.com/liferay/alloy-ui/wiki/Code-Style-Guidelines).

## 3. Tests

No single commit should go to AlloyUI source tree without tests. Exceptions are allowed for some source formatting (like renaming variables or converting spaces to tabs, etc.), but for each bug fix or for each feature added, **tests must be present**.

> See [AlloyUI Testing Guidelines](https://github.com/liferay/alloy-ui/wiki/Testing-Guidelines).

## 4. Documentation

All code should be properly documented using [YUIDoc syntax](http://yui.github.io/yuidoc/syntax/index.html). Documentation should be considered as part of the code.

> See [AlloyUI Documentation Guidelines](https://github.com/liferay/alloy-ui/wiki/Documentation-Guidelines).

## 5. History

The changes should be described in `HISTORY.md` file which every module has, so it is easy to track which changes have been added between two versions.

## Conclusion

In short, that is it!

We would highly appreciate if you help us in the process of creating tests and documentation. There is no better way to get involved in this great project!

Happy hacking!

## Setup

1. Install NodeJS <= [v0.12.0](http://nodejs.org/dist/v0.12.0/), if you do not have it yet.

2. Install global dependencies:

```
[sudo] npm install -g gulp
```

3. Install local dependencies:

```
npm install
```

4. Initialize and fetch dependencies via Bower:

```
gulp init
```

5. Build AlloyUI & YUI3 using Shifter:

```
gulp build
```

## Development

Rebuild AUI components:

```
gulp build-aui
```

If run at the root level, it will build all AUI components.

If run within a component folder (ie. `cd src/aui-datatable`), it will only build that specific component.

Watch for changes and rebuild automatically:

```
gulp watch
```

### Testing your local version of Alloy UI

When developing, it is good practice to test the changes you make in various environments.

Since Alloy UI is used primarily within [Liferay portal](https://github.com/liferay/liferay-portal), it is important to have your changes tested in Liferay to ensure there are no regressions.

We have created the `liferay-gulp-tasks` package to help deploying a local version to test.

Once you have made all your necessary modifications and built a working copy of Alloy UI and are ready for testing, you can run:

```
gulp maven-install
```

This command will put a local AlloyUI version in you `~/.m2` folder which is where Liferay will search for local WebJars.  If they are not found locally, Liferay will search of them on Nexus, and if found, it will download it to be consumed by Liferay.

When you have successfully run the command to put this local version on your machine, you will need to update the `build.gradle` files in Liferay to use these new versions of Alloy UI.

You will need to update `String alloyUIVersion = [VERSION]` found at [https://github.com/liferay/liferay-portal/blob/master/modules/apps/frontend-js/frontend-js-aui-web/build.gradle#L10](https://github.com/liferay/liferay-portal/blob/master/modules/apps/frontend-js/frontend-js-aui-web/build.gradle#L10) and [https://github.com/liferay/liferay-portal/blob/master/modules/apps/frontend-theme/frontend-theme-unstyled/build.gradle#L18](https://github.com/liferay/liferay-portal/blob/master/modules/apps/frontend-theme/frontend-theme-unstyled/build.gradle#L18) to this new version.

When completed, you can redeploy the 2 Liferay modules, `frontend-js` and `frontend-theme` to test your changes.