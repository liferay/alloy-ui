/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("arraylist-add",function(e,t){e.mix(e.ArrayList.prototype,{add:function(t,n){var r=this._items;return e.Lang.isNumber(n)?r.splice(n,0,t):r.push(t),this},remove:function(e,t,n){n=n||this.itemsAreEqual;for(var r=this._items.length-1;r>=0;--r)if(n.call(this,e,this.item(r))){this._items.splice(r,1);if(!t)break}return this},itemsAreEqual:function(e,t){return e===t}})},"3.7.3",{requires:["arraylist"]});
