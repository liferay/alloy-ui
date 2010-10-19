/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("event-mouseenter",function(C){function B(G,D){var F=G.currentTarget,E=G.relatedTarget;if(F!==E&&!F.contains(E)){D.fire(G);}}var A={proxyType:"mouseover",on:function(F,D,E){D.onHandle=F.on(this.proxyType,B,null,E);},detach:function(E,D){D.onHandle.detach();},delegate:function(G,E,F,D){E.delegateHandle=C.delegate(this.proxyType,B,G,D,null,F);},detachDelegate:function(E,D){D.delegateHandle.detach();}};C.Event.define("mouseenter",A,true);C.Event.define("mouseleave",C.merge(A,{proxyType:"mouseout"}),true);},"3.2.0",{requires:["event-synthetic"]});