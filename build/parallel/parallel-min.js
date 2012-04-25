/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("parallel",function(a){a.Parallel=function(b){this.config=b||{};this.results=[];this.context=this.config.context||a;this.total=0;this.finished=0;};a.Parallel.prototype={results:null,total:null,finished:null,add:function(c){var b=this;b.total+=1;return function(){b.finished++;b.results.push(c&&c.apply(b.context,arguments));b.test();};},test:function(){var b=this;if(b.finished>=b.total&&b.callback){b.callback.call(b.context,b.results,b.data);}},done:function(c,b){this.callback=c;this.data=b;this.test();}};},"3.5.0",{requires:["yui-base"]});