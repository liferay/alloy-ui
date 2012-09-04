/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("view-node-map",function(e,d){var c=e.namespace("View._buildCfg"),b={};function a(){}c.aggregates||(c.aggregates=[]);c.aggregates.push("getByNode");a.getByNode=function(g){var f;e.one(g).ancestor(function(h){return(f=b[e.stamp(h,true)])||false;},true);return f||null;};a._instances=b;a.prototype={initializer:function(){b[e.stamp(this.get("container"))]=this;},destructor:function(){var f=e.stamp(this.get("container"),true);if(f in b){delete b[f];}}};e.View.NodeMap=a;},"3.7.1pr1",{"requires":["view"]});