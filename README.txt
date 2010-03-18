Welcome to Alloy Library Source @VERSION@

* Documentation: http://alloy.liferay.com/api/
* License: http://alloy.liferay.com/deploy/license.txt
* Latest Stable Release: http://alloy.liferay.com/downloads/
* Discuss: http://alloy.liferay.com/forum/

Folder description
	api/				- Contains the generated API Documentation
	build/				- Build files from the src/ folder. The files on the build constains all Alloy modules plus the YUI3 modules. This files are the ones used on the demos.
	demos/				- Contains basic examples for each component.
	lib/				- Contains external projects used during the Alloy development (i.e. yui-combo, yui-builder, yui-doc, yui3 source).
	resources/			- Contains files used during the Alloy development for the build proccess, module creation, docs etc.
	sandbox/			- Contains basic examples for each component used for development tests.
	src/				- Source code of the Alloy modules.


Build process
	After change any component on the src/aui-yourcomponent/ folder you need to run "ant all" from the component source folder or "ant all" on the build.xml from the root to re-build all modules to the build folder. Example:
		# cd trunk/src/aui-tree/
		# ant all
		or
		# cd trunk/
		# ant all

Module creation
	To create a new module you can use our "create-module" task. Example:
		# cd trunk/resources/create-module/
		# ./create.sh aui-module-name
	More information, see trunk/resources/create-module/README.txt.
