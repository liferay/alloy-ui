/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("parallel",function(b,a){b.Parallel=function(c){this.config=c||{};this.results=[];this.context=this.config.context||b;this.total=0;this.finished=0;};b.Parallel.prototype={results:null,total:null,finished:null,add:function(d){var c=this;c.total+=1;return function(e){c.finished++;c.results.push((d&&d.apply(c.context,arguments))||(arguments.length===1?e:b.Array(arguments)));c.test();};},test:function(){var c=this;if(c.finished>=c.total&&c.callback){c.callback.call(c.context,c.results,c.data);}},done:function(d,c){this.callback=d;this.data=c;this.test();}};},"3.7.1pr1",{"requires":["yui-base"]});