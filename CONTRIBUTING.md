# Contributing

Over the years, tests and documentation have sometimes been sacrificed in order to speed up the development process. As result, not all of the modules had tests or documentation. When there were only two or three developers, the lack of tests wasn't such a big issue. They knew the code very well and the risk of regressions was relatively low. However, when more and more [contributors](http://alloyui.com/about/) were involved, this stopped working and made it harder and harder to keep the library in good condition.

As a result, we have instituted new policies related to the tests and documentation which have recently been added to AlloyUI. We would love to share them with you:

## 1. Code Style

This project uses single-quotes, four space indentation and whitespace around arguments. Please ensure any pull requests follow this closely by using the [EditorConfig file](https://github.com/liferay/alloyui.com/blob/master/.editorconfig) and linting your code with our [JSHint options](https://github.com/liferay/alloyui.com/blob/master/.jshintrc). If you notice existing code which doesn't follow these practices, feel free to shout out and we will change it.

> See [AlloyUI Code Style Guidelines](https://github.com/liferay/alloy-ui/wiki/Code-Style-Guidelines).

## 2. Tests

No single commit should go to AlloyUI source tree without tests. Exceptions are allowed for some source formatting (like renaming variables or converting spaces to tabs, etc.), but for each bugfix or for each feature added, **tests must be present**.

> See [AlloyUI Testing Guidelines](https://github.com/liferay/alloy-ui/wiki/Testing-Guidelines).

## 3. Documentation

All code should be properly documented using [YUIDoc syntax](http://yui.github.io/yuidoc/syntax/index.html). Documentation should be considered as part of the code.

> See [AlloyUI Documentation Guidelines](https://github.com/liferay/alloy-ui/wiki/Documentation-Guidelines).

## 4. History

The changes should be described in `HISTORY.md` file which every module has, so it is easy to track which changes have been added between two versions.

## Conclusion

In short, that is it! We would highly appreciate if you help us in the process of creating tests and documentation. There is no better way to get involved in this great project!

Happy hacking!