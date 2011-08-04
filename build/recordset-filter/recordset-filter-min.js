/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("recordset-filter",function(d){var c=d.Array,b=d.Lang;function a(e){a.superclass.constructor.apply(this,arguments);}d.mix(a,{NS:"filter",NAME:"recordsetFilter",ATTRS:{}});d.extend(a,d.Plugin.Base,{filter:function(f,h){var g=this.get("host").get("records"),e;if(h&&b.isString(f)){e=f;f=function(i){return(i.getValue(e)===h);};}return new d.Recordset({records:c.filter(g,f)});},reject:function(e){return new d.Recordset({records:c.reject(this.get("host").get("records"),e)});},grep:function(e){return new d.Recordset({records:c.grep(this.get("host").get("records"),e)});}});d.namespace("Plugin").RecordsetFilter=a;},"3.4.0",{requires:["recordset-base","array-extras","plugin"]});