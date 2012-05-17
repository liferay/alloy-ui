/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.6.0pr1
build: nightly
*/
YUI.add("datatable-base",function(a){a.DataTable.Base=a.Base.create("datatable",a.Widget,[a.DataTable.Core],null,{ATTRS:{headerView:{value:a.DataTable.HeaderView},bodyView:{value:a.DataTable.BodyView}}});a.DataTable=a.mix(a.Base.create("datatable",a.DataTable.Base,[]),a.DataTable);},"3.6.0pr1",{requires:["datatable-core","base-build","widget","datatable-head","datatable-body"]});