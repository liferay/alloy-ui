/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("node-style",function(a){(function(b){b.mix(b.Node.prototype,{setStyle:function(c,d){b.DOM.setStyle(this._node,c,d);return this;},setStyles:function(c){b.DOM.setStyles(this._node,c);return this;},getStyle:function(c){return b.DOM.getStyle(this._node,c);},getComputedStyle:function(c){return b.DOM.getComputedStyle(this._node,c);}});b.NodeList.importMethod(b.Node.prototype,["getStyle","getComputedStyle","setStyle","setStyles"]);})(a);},"3.7.1pr1",{requires:["dom-style","node-base"]});