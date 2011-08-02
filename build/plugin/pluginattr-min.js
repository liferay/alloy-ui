/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("pluginattr",function(e){var c=e.Lang,b=c.isString,a=c.isObject,d=c.isFunction;e.Plugin.addHostAttr=function(g,i,h,j){if(!b(g)||!a(i)||!a(h)){return false;}var f={lazyAdd:false};if(d(h)){f.setter=function(n,k){var o=(n!==false)?"plug":"unplug",m=e.Attribute.INVALID_VALUE,l=(a(n))?n:{};if(k.indexOf(".")===-1){m=n;l.host=this;this[o](h,l);}return m;};}else{e.mix(f,h,true);}if(d(i)){if(i.ATTRS&&(j||!i.ATTRS[g])){i.ATTRS[g]=f;}}else{if(i.constructor.ATTRS&&i.addAttr&&i._state&&(j||!i.attrAdded(g))){i.addAttr(g,f,false);}}return true;};},"3.4.0",{requires:["plugin"]});