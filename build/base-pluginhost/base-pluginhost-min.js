/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("base-pluginhost",function(c){var a=c.Base,b=c.Plugin.Host;c.mix(a,b,false,null,1);a.plug=b.plug;a.unplug=b.unplug;},"3.5.0",{requires:["base-base","pluginhost"]});