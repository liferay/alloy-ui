/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("dd-plugin",function(b){var a=function(c){c.node=((b.Widget&&c.host instanceof b.Widget)?c.host.get("boundingBox"):c.host);a.superclass.constructor.call(this,c);};a.NAME="dd-plugin";a.NS="dd";b.extend(a,b.DD.Drag);b.namespace("Plugin");b.Plugin.Drag=a;},"3.2.0",{requires:["dd-drag"],optional:["dd-constrain","dd-proxy"],skinnable:false});