/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("yui-log",function(E){var C=E,D="yui:log",B="undefined",A={debug:1,info:1,warn:1,error:1};C.log=function(J,Q,F,I){var L,O,M,K,N,H=C,P=H.config,G=(H.fire)?H:YUI.Env.globalEvents;if(P.debug){if(F){O=P.logExclude;M=P.logInclude;if(M&&!(F in M)){L=1;}else{if(O&&(F in O)){L=1;}}}if(!L){if(P.useBrowserConsole){K=(F)?F+": "+J:J;if(H.Lang.isFunction(P.logFn)){P.logFn.call(H,J,Q,F);}else{if(typeof console!=B&&console.log){N=(Q&&console[Q]&&(Q in A))?Q:"log";console[N](K);}else{if(typeof opera!=B){opera.postError(K);}}}}if(G&&!I){if(G==H&&(!G.getEvent(D))){G.publish(D,{broadcast:2});}G.fire(D,{msg:J,cat:Q,src:F});}}}return H;};C.message=function(){return C.log.apply(C,arguments);};},"3.2.0",{requires:["yui-base"]});