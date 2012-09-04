/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("scrollview-list",function(a,k){var b=a.ClassNameManager.getClassName,d="scrollview",c=b(d,"list"),g=b(d,"item"),h="contentBox",e="rendered",i="renderUI",j="host";function f(){f.superclass.constructor.apply(this,arguments);}f.NAME="pluginList";f.NS="list";f.ATTRS={isAttached:{value:false,validator:a.Lang.isBoolean}};a.namespace("Plugin").ScrollViewList=a.extend(f,a.Plugin.Base,{initializer:function(){this._host=this.get(j);this.afterHostEvent("render",this._addClassesToList);},_addClassesToList:function(){if(!this.get("isAttached")){var m=this._host.get(h),n,l;if(m.hasChildNodes()){n=m.all("> ul");l=m.all("> ul > li");n.each(function(o){o.addClass(c);});l.each(function(o){o.addClass(g);});this.set("isAttached",true);this._host.syncUI();}}}});},"3.7.1pr1",{"requires":["plugin","classnamemanager"],"skinnable":true});