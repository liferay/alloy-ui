/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("array-invoke",function(e,t){e.Array.invoke=function(t,n){var r=e.Array(arguments,2,!0),i=e.Lang.isFunction,s=[];return e.Array.each(e.Array(t),function(e,t){e&&i(e[n])&&(s[t]=e[n].apply(e,r))}),s}},"3.7.3",{requires:["yui-base"]});
