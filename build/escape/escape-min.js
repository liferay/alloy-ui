/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("escape",function(c){var a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;","`":"&#x60;"},b={html:function(d){return(d+"").replace(/[&<>"'\/`]/g,b._htmlReplacer);},regex:function(d){return(d+"").replace(/[\-#$\^*()+\[\]{}|\\,.?\s]/g,"\\$&");},_htmlReplacer:function(d){return a[d];}};b.regexp=b.regex;c.Escape=b;},"3.4.0",{requires:["yui-base"]});