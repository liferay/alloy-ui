/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0
build: nightly
*/
YUI.add("recordset-filter",function(d){var c=d.Array,b=d.Lang;function a(e){a.superclass.constructor.apply(this,arguments);}d.mix(a,{NS:"filter",NAME:"recordsetFilter",ATTRS:{}});d.extend(a,d.Plugin.Base,{initializer:function(e){},destructor:function(e){},filter:function(i,e){var h=this.get("host").get("records"),j=[],g=i;if(b.isString(i)&&b.isValue(e)){g=function(f){if(f.getValue(i)===e){return true;}else{return false;}};}j=c.filter(h,g);return new d.Recordset({records:j});},reject:function(e){return new d.Recordset({records:c.reject(this.get("host").get("records"),e)});},grep:function(e){return new d.Recordset({records:c.grep(this.get("host").get("records"),e)});}});d.namespace("Plugin").RecordsetFilter=a;},"3.3.0",{requires:["recordset-base","array-extras","plugin"]});