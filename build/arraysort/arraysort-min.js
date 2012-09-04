/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("arraysort",function(c){var b=c.Lang,a=b.isValue,d=b.isString;c.ArraySort={compare:function(f,e,g){if(!a(f)){if(!a(e)){return 0;}else{return 1;}}else{if(!a(e)){return -1;}}if(d(f)){f=f.toLowerCase();}if(d(e)){e=e.toLowerCase();}if(f<e){return(g)?1:-1;}else{if(f>e){return(g)?-1:1;}else{return 0;}}}};},"3.7.1pr1",{requires:["yui-base"]});