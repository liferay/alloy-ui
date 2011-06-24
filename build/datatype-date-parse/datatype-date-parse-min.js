/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("datatype-date-parse",function(b){var a=b.Lang;b.mix(b.namespace("DataType.Date"),{parse:function(d){var c=null;if(!(a.isDate(d))){c=new Date(d);}else{return c;}if(a.isDate(c)&&(c!="Invalid Date")&&!isNaN(c)){return c;}else{return null;}}});b.namespace("Parsers").date=b.DataType.Date.parse;},"3.4.0");