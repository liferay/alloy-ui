/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("datasource-arrayschema",function(b){var a=function(){a.superclass.constructor.apply(this,arguments);};b.mix(a,{NS:"schema",NAME:"dataSourceArraySchema",ATTRS:{schema:{}}});b.extend(a,b.Plugin.Base,{initializer:function(c){this.doBefore("_defDataFn",this._beforeDefDataFn);},_beforeDefDataFn:function(g){var d=(b.DataSource.IO&&(this.get("host") instanceof b.DataSource.IO)&&b.Lang.isString(g.data.responseText))?g.data.responseText:g.data,c=b.DataSchema.Array.apply.call(this,this.get("schema"),d),f=g.details[0];if(!c){c={meta:{},results:d};}f.response=c;this.get("host").fire("response",f);return new b.Do.Halt("DataSourceArraySchema plugin halted _defDataFn");}});b.namespace("Plugin").DataSourceArraySchema=a;},"3.4.0",{requires:["datasource-local","plugin","dataschema-array"]});