/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("pjax-plugin",function(b,a){b.Plugin.Pjax=b.Base.create("pjaxPlugin",b.Pjax,[b.Plugin.Base],{initializer:function(c){this.set("container",c.host);}},{NS:"pjax"});},"3.7.1pr1",{"requires":["node-pluginhost","pjax","plugin"]});