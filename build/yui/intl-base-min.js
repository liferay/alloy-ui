/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("intl-base",function(B){var A=/[, ]/;B.mix(B.namespace("Intl"),{lookupBestLang:function(H,I){var E,G,F,D;function C(K){var J;for(J=0;J<I.length;J+=1){if(K.toLowerCase()===I[J].toLowerCase()){return I[J];}}}if(B.Lang.isString(H)){H=H.split(A);}for(E=0;E<H.length;E+=1){G=H[E];if(!G||G==="*"){continue;}while(G.length>0){F=C(G);if(F){return F;}else{D=G.lastIndexOf("-");if(D>=0){G=G.substring(0,D);if(D>=2&&G.charAt(D-2)==="-"){G=G.substring(0,D-2);}}else{break;}}}}return"";}});},"3.2.0",{requires:["yui-base"]});