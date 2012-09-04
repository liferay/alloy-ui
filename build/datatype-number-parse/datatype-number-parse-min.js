/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("datatype-number-parse",function(b){var a=b.Lang;b.mix(b.namespace("DataType.Number"),{parse:function(d){var c=(d===null)?d:+d;if(a.isNumber(c)){return c;}else{return null;}}});b.namespace("Parsers").number=b.DataType.Number.parse;},"3.7.1pr1");