/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("button-plugin",function(b){function a(c){a.superclass.constructor.apply(this,arguments);}b.extend(a,b.ButtonCore,{_afterNodeGet:function(d){var c=this.constructor.ATTRS,e=c[d]&&c[d].getter&&this[c[d].getter];if(e){return new b.Do.AlterReturn("get "+d,e.call(this));}},_afterNodeSet:function(d,f){var c=this.constructor.ATTRS,e=c[d]&&c[d].setter&&this[c[d].setter];if(e){e.call(this,f);}},_initNode:function(c){var d=c.host;this._host=d;b.Do.after(this._afterNodeGet,d,"get",this);b.Do.after(this._afterNodeSet,d,"set",this);},destroy:function(){}},{ATTRS:b.merge(b.ButtonCore.ATTRS),NAME:"buttonPlugin",NS:"button"});a.createNode=function(e,c){var d;if(e&&!c){if(!(e.nodeType||e.getDOMNode||typeof e=="string")){c=e;e=c.srcNode;}}c=c||{};d=c.template||b.Plugin.Button.prototype.TEMPLATE;e=e||c.srcNode||b.DOM.create(d);return b.one(e).plug(b.Plugin.Button,c);};b.namespace("Plugin").Button=a;},"3.5.0",{requires:["button-core","cssbutton","node-pluginhost"]});