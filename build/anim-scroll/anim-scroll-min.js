/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("anim-scroll",function(b){var a=Number;b.Anim.behaviors.scroll={set:function(f,g,i,j,k,e,h){var d=f._node,c=([h(k,a(i[0]),a(j[0])-a(i[0]),e),h(k,a(i[1]),a(j[1])-a(i[1]),e)]);if(c[0]){d.set("scrollLeft",c[0]);}if(c[1]){d.set("scrollTop",c[1]);}},get:function(d){var c=d._node;return[c.get("scrollLeft"),c.get("scrollTop")];}};},"3.5.0",{requires:["anim-base"]});