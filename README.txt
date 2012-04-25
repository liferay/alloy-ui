Welcome to Alloy Library Source @VERSION@

* License: http://alloy.liferay.com/deploy/LICENSE.txt
* Documentation: http://alloy.liferay.com/api/
* Discuss: http://alloy.liferay.com/forum/
* Latest Stable Release: http://alloy.liferay.com/downloads/
* Attribution/Third-party licenses: http://alloy.liferay.com/ATTRIBUTION.txt

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


Version Updates

    To update your current branch
       Navigate to the alloy directory
       # git submodule update --init
       # cd lib/yui3
       # git fetch https://github.com/yui/yui3.git
       open a web browser at https://github.com/yui/yui3/tags
       Copy the <SHA> from the upgrade tag you wish to upgrade to
       # git reset --hard PASTE-SHA-HERE
       # git add lib/yui3
       # git commit -m "yui upgrade x.x.x"
   
   Update the YUI3 version property
       go up to the main alloy directory
       update the yui3.version property in build.properties

   Rebuild Modules
   		from alloy main directory
       	# ant init-yui && ant build-modules

   Release Alloy and copy into Liferay

   Rebuild Liferay and restart your app server

   If any dependencies were added/removed, add/modify them in the YUI3 Modules section of portal.properties