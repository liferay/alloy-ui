/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("recordset-filter",function(e,t){function i(e){i.superclass.constructor.apply(this,arguments)}var n=e.Array,r=e.Lang;e.mix(i,{NS:"filter",NAME:"recordsetFilter",ATTRS:{}}),e.extend(i,e.Plugin.Base,{filter:function(t,i){var s=this.get("host").get("records"),o;return i&&r.isString(t)&&(o=t,t=function(e){return e.getValue(o)===i}),new e.Recordset({records:n.filter(s,t)})},reject:function(t){return new e.Recordset({records:n.reject(this.get("host").get("records"),t)})},grep:function(t){return new e.Recordset({records:n.grep(this.get("host").get("records"),t)})}}),e.namespace("Plugin").RecordsetFilter=i},"3.7.3",{requires:["recordset-base","array-extras","plugin"]});
