/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("cache-plugin",function(c,b){function a(f){var e=f&&f.cache?f.cache:c.Cache,g=c.Base.create("dataSourceCache",e,[c.Plugin.Base]),d=new g(f);g.NS="tmpClass";return d;}c.mix(a,{NS:"cache",NAME:"cachePlugin"});c.namespace("Plugin").Cache=a;},"3.7.1pr1",{"requires":["plugin","cache-base"]});