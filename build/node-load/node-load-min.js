/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("node-load",function(a){a.Node.prototype._ioComplete=function(g,c,d){var b=d[0],h=d[1],e,f;if(c&&c.responseText){f=c.responseText;if(b){e=a.DOM.create(f);f=a.Selector.query(b,e);}this.setContent(f);}if(h){h.call(this,g,c);}};a.Node.prototype.load=function(d,b,e){if(typeof b=="function"){e=b;b=null;}var c={context:this,on:{complete:this._ioComplete},arguments:[b,e]};a.io(d,c);return this;};},"3.5.0",{requires:["node-base","io-base"]});