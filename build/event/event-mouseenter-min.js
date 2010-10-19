/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("event-mouseenter",function(C){function A(G,D){var F=G.currentTarget,E=G.relatedTarget;if(F!==E&&!F.contains(E)){D.fire(G);}}var B={proxyType:"mouseover",on:function(F,D,E){D.onHandle=F.on(this.proxyType,A,null,E);},detach:function(E,D){D.onHandle.detach();},delegate:function(G,E,F,D){E.delegateHandle=C.delegate(this.proxyType,A,G,D,null,F);},detachDelegate:function(E,D){D.delegateHandle.detach();}};C.Event.define("mouseenter",B,true);C.Event.define("mouseleave",C.merge(B,{proxyType:"mouseout"}),true);},"3.2.0",{requires:["event-synthetic"]});