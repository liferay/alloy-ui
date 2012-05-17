/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.6.0pr1
build: nightly
*/
YUI.add("test-console",function(b){function a(){a.superclass.constructor.apply(this,arguments);}b.namespace("Test").Console=b.extend(a,b.Console,{initializer:function(c){this.on("entry",this._onEntry);this.plug(b.Plugin.ConsoleFilters,{category:b.merge({info:true,pass:false,fail:true,status:false},(c&&c.filters)||{}),defaultVisibility:false,source:{TestRunner:true}});},_onEntry:function(c){var d=c.message;if(d.category==="info"&&/\s(?:case|suite)\s|yuitests\d+|began/.test(d.message)){d.category="status";}else{if(d.category==="fail"){this.printBuffer();}}}},{NAME:"testConsole",ATTRS:{entryTemplate:{value:'<div class="{entry_class} {cat_class} {src_class}">'+'<div class="{entry_content_class}">{message}</div>'+"</div>"},height:{value:"350px"},newestOnTop:{value:false},style:{value:"block"},width:{value:b.UA.ie&&b.UA.ie<9?"100%":"inherit"}}});},"3.6.0pr1",{skinnable:true,requires:["console-filters","test"]});