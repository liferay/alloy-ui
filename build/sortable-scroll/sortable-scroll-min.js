/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("sortable-scroll",function(e,t){var n=function(){n.superclass.constructor.apply(this,arguments)};e.extend(n,e.Base,{initializer:function(){var t=this.get("host");t.plug(e.Plugin.DDNodeScroll,{node:t.get("container")}),t.delegate.on("drop:over",function(t){this.dd.nodescroll&&t.drag.nodescroll&&t.drag.nodescroll.set("parentScroll",e.one(this.get("container")))})}},{ATTRS:{host:{value:""}},NAME:"SortScroll",NS:"scroll"}),e.namespace("Y.Plugin"),e.Plugin.SortableScroll=n},"3.7.3",{requires:["dd-scroll","sortable"]});
