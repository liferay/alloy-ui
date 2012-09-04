/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("sortable-scroll",function(c,b){var a=function(){a.superclass.constructor.apply(this,arguments);};c.extend(a,c.Base,{initializer:function(){var d=this.get("host");d.plug(c.Plugin.DDNodeScroll,{node:d.get("container")});d.delegate.on("drop:over",function(f){if(this.dd.nodescroll&&f.drag.nodescroll){f.drag.nodescroll.set("parentScroll",c.one(this.get("container")));}});}},{ATTRS:{host:{value:""}},NAME:"SortScroll",NS:"scroll"});c.namespace("Y.Plugin");c.Plugin.SortableScroll=a;},"3.7.1pr1",{"requires":["dd-scroll","sortable"]});