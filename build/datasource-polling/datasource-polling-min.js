/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("datasource-polling",function(b){function a(){this._intervals={};}a.prototype={_intervals:null,setInterval:function(e,d){var c=b.later(e,this,this.sendRequest,[d],true);this._intervals[c.id]=c;b.later(0,this,this.sendRequest,[d]);return c.id;},clearInterval:function(d,c){d=c||d;if(this._intervals[d]){this._intervals[d].cancel();delete this._intervals[d];}},clearAllIntervals:function(){b.each(this._intervals,this.clearInterval,this);}};b.augment(b.DataSource.Local,a);},"3.7.1pr1",{requires:["datasource-local"]});