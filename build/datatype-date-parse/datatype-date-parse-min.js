/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("datatype-date-parse",function(e,t){var n=e.Lang;e.mix(e.namespace("Date"),{parse:function(e){var t=null;return n.isDate(e)?t:(t=new Date(e),n.isDate(t)&&t!="Invalid Date"&&!isNaN(t)?t:null)}}),e.namespace("Parsers").date=e.Date.parse,e.namespace("DataType"),e.DataType.Date=e.Date},"3.7.3");
