/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("datasource-xmlschema",function(b){var a=function(){a.superclass.constructor.apply(this,arguments);};b.mix(a,{NS:"schema",NAME:"dataSourceXMLSchema",ATTRS:{schema:{}}});b.extend(a,b.Plugin.Base,{initializer:function(c){this.doBefore("_defDataFn",this._beforeDefDataFn);},_beforeDefDataFn:function(g){var c=this.get("schema"),f=g.details[0],d=g.data.responseXML||g.data;f.response=b.DataSchema.XML.apply.call(this,c,d)||{meta:{},results:d};this.get("host").fire("response",f);return new b.Do.Halt("DataSourceXMLSchema plugin halted _defDataFn");}});b.namespace("Plugin").DataSourceXMLSchema=a;},"3.5.0",{requires:["datasource-local","plugin","dataschema-xml"]});