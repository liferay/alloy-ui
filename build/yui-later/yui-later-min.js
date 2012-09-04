/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("yui-later",function(c,b){var a=[];c.later=function(k,g,l,h,i){k=k||0;h=(!c.Lang.isUndefined(h))?c.Array(h):a;g=g||c.config.win||c;var j=false,d=(g&&c.Lang.isString(l))?g[l]:l,e=function(){if(!j){if(!d.apply){d(h[0],h[1],h[2],h[3]);}else{d.apply(g,h||a);}}},f=(i)?setInterval(e,k):setTimeout(e,k);return{id:f,interval:i,cancel:function(){j=true;if(this.interval){clearInterval(f);}else{clearTimeout(f);}}};};c.Lang.later=c.later;},"3.7.1pr1",{"requires":["yui-base"]});