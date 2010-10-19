/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("event-key",function(A){A.Env.evt.plugins.key={on:function(F,G,C,J,D){var I=A.Array(arguments,0,true),B,K,H,E;B=J&&J.split(":");if(!J||J.indexOf(":")==-1||!B[1]){I[0]="key"+((B&&B[0])||"press");return A.on.apply(A,I);}K=B[0];H=(B[1])?B[1].split(/,|\+/):null;E=(A.Lang.isString(C)?C:A.stamp(C))+J;E=E.replace(/,/g,"_");if(!A.getEvent(E)){A.on(F+K,function(Q){var P=false,N=false,M,L,O;for(M=0;M<H.length;M=M+1){L=H[M];O=parseInt(L,10);if(A.Lang.isNumber(O)){if(Q.charCode===O){P=true;}else{N=true;}}else{if(P||!N){P=(Q[L+"Key"]);N=!P;}}}if(P){A.fire(E,Q);}},C);}I.splice(2,2);I[0]=E;return A.on.apply(A,I);}};},"3.2.0",{requires:["node-base"]});