/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("datasource-function",function(e,t){var n=e.Lang,r=function(){r.superclass.constructor.apply(this,arguments)};e.mix(r,{NAME:"dataSourceFunction",ATTRS:{source:{validator:n.isFunction}}}),e.extend(r,e.DataSource.Local,{_defRequestFn:function(e){var t=this.get("source"),n=e.details[0];if(t)try{n.data=t(e.request,this,e)}catch(r){n.error=r}else n.error=new Error("Function data failure");return this.fire("data",n),e.tId}}),e.DataSource.Function=r},"3.7.3",{requires:["datasource-local"]});
