/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("cache-plugin",function(b){function a(e){var d=e&&e.cache?e.cache:b.Cache,f=b.Base.create("dataSourceCache",d,[b.Plugin.Base]),c=new f(e);f.NS="tmpClass";return c;}b.mix(a,{NS:"cache",NAME:"cachePlugin"});b.namespace("Plugin").Cache=a;},"3.4.0",{requires:["plugin","cache-base"]});