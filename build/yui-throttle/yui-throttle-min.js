/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("yui-throttle",function(e,t){
/*! Based on work by Simon Willison: http://gist.github.com/292562 */
;e.throttle=function(t,n){n=n?n:e.config.throttleTime||150;if(n===-1)return function(){t.apply(null,arguments)};var r=e.Lang.now();return function(){var i=e.Lang.now();i-r>n&&(r=i,t.apply(null,arguments))}}},"3.7.3",{requires:["yui-base"]});
