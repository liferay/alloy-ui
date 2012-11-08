/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("dataschema-base",function(e,t){var n=e.Lang,r={apply:function(e,t){return t},parse:function(t,r){if(r.parser){var i=n.isFunction(r.parser)?r.parser:e.Parsers[r.parser+""];i&&(t=i.call(this,t))}return t}};e.namespace("DataSchema").Base=r,e.namespace("Parsers")},"3.7.3",{requires:["base"]});
