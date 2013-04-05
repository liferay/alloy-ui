/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("autocomplete-plugin",function(e,t){function r(e){e.inputNode=e.host,!e.render&&e.render!==!1&&(e.render=!0),r.superclass.constructor.apply(this,arguments)}var n=e.Plugin;e.extend(r,e.AutoCompleteList,{},{NAME:"autocompleteListPlugin",NS:"ac",CSS_PREFIX:e.ClassNameManager.getClassName("aclist")}),n.AutoComplete=r,n.AutoCompleteList=r},"3.7.3",{requires:["autocomplete-list","node-pluginhost"]});
