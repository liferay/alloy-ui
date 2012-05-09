/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("attribute-events",function(e){var f=e.EventTarget,d="Change",a="broadcast",c="published";function b(){this._ATTR_E_FACADE={};f.call(this,{emitFacade:true});}b._ATTR_CFG=[a];b.prototype={set:function(g,i,h){return this._setAttr(g,i,h);},_set:function(g,i,h){return this._setAttr(g,i,h,true);},setAttrs:function(g,h){return this._setAttrs(g,h);},_fireAttrChange:function(o,n,k,j,g){var q=this,m=o+d,i=q._state,p,l,h;if(!i.get(o,c)){h={queuable:false,defaultTargetOnly:true,defaultFn:q._defAttrChangeFn,silent:true};l=i.get(o,a);if(l!==undefined){h.broadcast=l;}q.publish(m,h);i.add(o,c,true);}p=(g)?e.merge(g):q._ATTR_E_FACADE;p.attrName=o;p.subAttrName=n;p.prevVal=k;p.newVal=j;q.fire(m,p);},_defAttrChangeFn:function(g){if(!this._setAttrVal(g.attrName,g.subAttrName,g.prevVal,g.newVal)){g.stopImmediatePropagation();}else{g.newVal=this.get(g.attrName);}}};e.mix(b,f,false,null,1);e.AttributeEvents=b;},"3.5.0",{requires:["event-custom"]});