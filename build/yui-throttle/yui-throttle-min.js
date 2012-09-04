/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("yui-throttle",function(b,a){
/*! Based on work by Simon Willison: http://gist.github.com/292562 */
b.throttle=function(d,c){c=(c)?c:(b.config.throttleTime||150);if(c===-1){return(function(){d.apply(null,arguments);});}var e=b.Lang.now();return(function(){var f=b.Lang.now();if(f-e>c){e=f;d.apply(null,arguments);}});};},"3.7.1pr1",{"requires":["yui-base"]});