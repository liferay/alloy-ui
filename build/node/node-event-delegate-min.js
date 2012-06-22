/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("node-event-delegate",function(a){a.Node.prototype.delegate=function(e,d,b){var c=a.Array(arguments,0,true);c.splice(2,0,this._node);return a.delegate.apply(a,c);};},"3.2.0",{requires:["node-base","event-delegate"]});