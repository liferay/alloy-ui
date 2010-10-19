/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("event-touch",function(D){var C="scale",B="rotation",A="identifier";D.DOMEventFacade.prototype._touch=function(J,L,K){var G,F,H,I,E;if(J.touches){this.touches=[];E={};for(G=0,F=J.touches.length;G<F;++G){I=J.touches[G];E[D.stamp(I)]=this.touches[G]=new D.DOMEventFacade(I,L,K);}}if(J.targetTouches){this.targetTouches=[];for(G=0,F=J.targetTouches.length;G<F;++G){I=J.targetTouches[G];H=E&&E[D.stamp(I,true)];this.targetTouches[G]=H||new D.DOMEventFacade(I,L,K);}}if(J.changedTouches){this.changedTouches=[];for(G=0,F=J.changedTouches.length;G<F;++G){I=J.changedTouches[G];H=E&&E[D.stamp(I,true)];this.changedTouches[G]=H||new D.DOMEventFacade(I,L,K);}}if(C in J){this[C]=J[C];}if(B in J){this[B]=J[B];}if(A in J){this[A]=J[A];}};if(D.Node.DOM_EVENTS){D.mix(D.Node.DOM_EVENTS,{touchstart:1,touchmove:1,touchend:1,touchcancel:1,gesturestart:1,gesturechange:1,gestureend:1});}},"3.2.0",{requires:["node-base"]});