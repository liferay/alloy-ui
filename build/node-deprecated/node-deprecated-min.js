/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("node-deprecated",function(e,t){var n=e.Node;n.ATTRS.data={getter:function(){return this._dataVal},setter:function(e){return this._dataVal=e,e},value:null},e.get=n.get=function(){return n.one.apply(n,arguments)},e.mix(n.prototype,{query:function(e){return this.one(e)},queryAll:function(e){return this.all(e)},each:function(e,t){return t=t||this,e.call(t,this)},item:function(e){return this},size:function(){return this._node?1:0}})},"3.7.3",{requires:["node-base"]});
