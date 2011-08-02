/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("dataschema-base",function(b){var a=b.Lang,c={apply:function(d,e){return e;},parse:function(d,e){if(e.parser){var f=(a.isFunction(e.parser))?e.parser:b.Parsers[e.parser+""];if(f){d=f.call(this,d);}else{}}return d;}};b.namespace("DataSchema").Base=c;b.namespace("Parsers");},"3.4.0",{requires:["base"]});