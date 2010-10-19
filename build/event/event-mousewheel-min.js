/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("event-mousewheel",function(C){var A="DOMMouseScroll",B=function(E){var D=C.Array(E,0,true),F;if(C.UA.gecko){D[0]=A;F=C.config.win;}else{F=C.config.doc;}if(D.length<3){D[2]=F;}else{D.splice(2,0,F);}return D;};C.Env.evt.plugins.mousewheel={on:function(){return C.Event._attach(B(arguments));},detach:function(){return C.Event.detach.apply(C.Event,B(arguments));}};},"3.2.0",{requires:["node-base"]});