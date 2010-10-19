/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("features",function(C){var B={};C.mix(C.namespace("Features"),{tests:B,add:function(D,E,F){B[D]=B[D]||{};B[D][E]=F;},all:function(D,E){var F=B[D],G="";if(F){C.Object.each(F,function(I,H){G+=H+":"+(C.Features.test(D,H,E)?1:0)+";";});}return G;},test:function(D,G,F){var J,H,K,I=B[D],E=I&&I[G];if(!E){}else{J=E.result;if(C.Lang.isUndefined(J)){H=E.ua;if(H){J=(C.UA[H]);}K=E.test;if(K&&((!H)||J)){J=K.apply(C,F);}E.result=J;}}return J;}});var A=C.Features.add;A("load","0",{"trigger":"dom-style","ua":"ie"});A("load","1",{"test":function(E){var D=E.config.doc.documentMode;return E.UA.ie&&(!("onhashchange" in E.config.win)||!D||D<8);},"trigger":"history-hash"});A("load","2",{"test":function(D){return(D.config.win&&("ontouchstart" in D.config.win&&!D.UA.chrome));},"trigger":"dd-drag"});},"3.2.0",{requires:["yui-base"]});