/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("scrollview-base-ie",function(b,a){b.mix(b.ScrollView.prototype,{_fixIESelect:function(d,c){this._cbDoc=c.get("ownerDocument");this._nativeBody=b.Node.getDOMNode(b.one("body",this._cbDoc));c.on("mousedown",function(){this._selectstart=this._nativeBody.onselectstart;this._nativeBody.onselectstart=this._iePreventSelect;this._cbDoc.once("mouseup",this._ieRestoreSelect,this);},this);},_iePreventSelect:function(){return false;},_ieRestoreSelect:function(){this._nativeBody.onselectstart=this._selectstart;}},true);},"3.7.1pr1",{"requires":["scrollview-base"]});