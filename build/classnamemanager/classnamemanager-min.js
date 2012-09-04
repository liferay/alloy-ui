/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("classnamemanager",function(c){var b="classNamePrefix",d="classNameDelimiter",a=c.config;a[b]=a[b]||"yui3";a[d]=a[d]||"-";c.ClassNameManager=function(){var e=a[b],f=a[d];return{getClassName:c.cached(function(){var g=c.Array(arguments);if(g[g.length-1]!==true){g.unshift(e);}else{g.pop();}return g.join(f);})};}();},"3.7.1pr1",{requires:["yui-base"]});