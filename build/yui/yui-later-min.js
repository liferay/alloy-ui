/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0PR1
build: nightly
*/
YUI.add("yui-later",function(A){(function(){var B=A.Lang,C=function(K,E,L,G,H){K=K||0;var F=L,I=F,D,J;if(E){if(B.isString(L)){F=E[L];}if(!A.Lang.isUndefined(G)){J=A.Array(G);}I=function(){if(J){F.apply(E,J);}else{F.call(E);}};}D=(H)?setInterval(I,K):setTimeout(I,K);return{id:D,interval:H,cancel:function(){if(this.interval){clearInterval(D);}else{clearTimeout(D);}}};};A.later=C;B.later=C;})();},"3.2.0PR1",{requires:["yui-base"]});