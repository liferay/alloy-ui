/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("anim-xy",function(b){var a=Number;b.Anim.behaviors.xy={set:function(f,d,i,h,c,g,e){f._node.setXY([e(c,a(i[0]),a(h[0])-a(i[0]),g),e(c,a(i[1]),a(h[1])-a(i[1]),g)]);},get:function(c){return c._node.getXY();}};},"3.4.0",{requires:["anim-base","node-screen"]});