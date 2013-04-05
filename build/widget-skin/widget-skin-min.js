/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("widget-skin",function(e,t){var n="boundingBox",r="contentBox",i="skin",s=e.ClassNameManager.getClassName;e.Widget.prototype.getSkinName=function(){var e=this.get(r)||this.get(n),t=new RegExp("\\b"+s(i)+"-(\\S+)"),o;return e&&e.ancestor(function(e){return o=e.get("className").match(t),o}),o?o[1]:null}},"3.7.3",{requires:["widget-base"]});
