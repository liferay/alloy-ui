/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("pjax",function(e,d){var c=["loadContent","_defaultRoute"],b="error",a="load";e.Pjax=e.Base.create("pjax",e.Router,[e.PjaxBase,e.PjaxContent],{initializer:function(){this.publish(b,{defaultFn:this._defCompleteFn});this.publish(a,{defaultFn:this._defCompleteFn});},_defaultRoute:function(k,h,i){var g=h.ioResponse,f=g.status,j=f>=200&&f<300?a:b;this.fire(j,{content:h.content,responseText:g.responseText,status:f,url:k.ioURL});i();},_defCompleteFn:function(h){var f=this.get("container"),g=h.content;if(f&&g.node){f.setHTML(g.node);}if(g.title&&e.config.doc){e.config.doc.title=g.title;}}},{ATTRS:{container:{value:null,setter:e.one},routes:{value:[{path:"*",callbacks:c}]}},defaultRoute:c});},"3.7.1pr1",{"requires":["pjax-base","pjax-content"]});