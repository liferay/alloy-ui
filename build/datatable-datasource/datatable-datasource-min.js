/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("datatable-datasource",function(b){function a(){a.superclass.constructor.apply(this,arguments);}b.mix(a,{NS:"datasource",NAME:"dataTableDataSource",ATTRS:{datasource:{setter:"_setDataSource"},initialRequest:{setter:"_setInitialRequest"}}});b.extend(a,b.Plugin.Base,{_setDataSource:function(c){return c||new b.DataSource.Local(c);},_setInitialRequest:function(c){},initializer:function(c){if(!b.Lang.isUndefined(c.initialRequest)){this.load({request:c.initialRequest});}},load:function(c){c=c||{};c.request=c.request||this.get("initialRequest");c.callback=c.callback||{success:b.bind(this.onDataReturnInitializeTable,this),failure:b.bind(this.onDataReturnInitializeTable,this),argument:this.get("host").get("state")};var d=(c.datasource||this.get("datasource"));if(d){d.sendRequest(c);}},onDataReturnInitializeTable:function(d){var c=(d.response&&d.response.results)||[];this.get("host").set("data",c);}});b.namespace("Plugin").DataTableDataSource=a;},"3.5.0",{requires:["datatable-base","plugin","datasource-local"]});