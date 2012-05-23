# Alloy UI

Alloy is a UI metaframework that provides a consistent and simple API for building web applications across allthree levels of the browser: structure, style and behavior.

It incorporates three design languages: HTML, CSS, and JavaScript.

* [License](https://github.com/liferay/alloy-ui/blob/master/LICENSE.txt)
* [Documentation](http://alloyui.com/deploy/api/)
* [Discuss](http://www.liferay.com/community/forums/-/message_boards/category/8409523)
* [Latest Stable Release](http://www.liferay.com/downloads/liferay-projects/alloy-ui)
* [Attribution/Third-party licenses](https://github.com/liferay/alloy-ui/blob/master/ATTRIBUTION.txt)

## Folder description

* [api/](https://github.com/liferay/alloy-ui/tree/master/api) - Contains the generated API Documentation
* [build/](https://github.com/liferay/alloy-ui/tree/master/build) - Build files from the src/ folder. The files on the build constains all Alloy modules plus the YUI3 modules. This files are the ones used on the demos.
* [demos/](https://github.com/liferay/alloy-ui/tree/master/demos) - Contains basic examples for each component.
* [lib/](https://github.com/liferay/alloy-ui/tree/master/lib) - Contains external projects used during the Alloy development (i.e. yui-combo, yui-builder, yui-doc, yui3 source).
* [resources/](https://github.com/liferay/alloy-ui/tree/master/resources) - Contains files used during the Alloy development for the build proccess, module creation, docs etc.
* [sandbox/](https://github.com/liferay/alloy-ui/tree/master/sandbox) - Contains basic examples for each component used for development tests.
* [src/](https://github.com/liferay/alloy-ui/tree/master/src) - Source code of the Alloy modules.


## Build process

After change any component on the `src/aui-yourcomponent/` folder you need to run `ant all` from the component source folder or `ant all` on the [build.xml](https://github.com/liferay/alloy-ui/blob/master/build.xml) from the root to re-build all modules to the build folder. Example:

	cd trunk/src/aui-tree/
	ant all

or...

	cd trunk/
	ant all

## Module creation

To create a new module you can use our "create-module" task. Example:

	cd trunk/resources/create-module/
	./create.sh aui-module-name

More information, [see here](https://github.com/liferay/alloy-ui/tree/master/resources/create-module).