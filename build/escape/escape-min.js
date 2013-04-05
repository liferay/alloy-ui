/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("escape",function(e,t){var n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;","`":"&#x60;"},r={html:function(e){return(e+"").replace(/[&<>"'\/`]/g,r._htmlReplacer)},regex:function(e){return(e+"").replace(/[\-$\^*()+\[\]{}|\\,.?\s]/g,"\\$&")},_htmlReplacer:function(e){return n[e]}};r.regexp=r.regex,e.Escape=r},"3.7.3",{requires:["yui-base"]});
