/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.6.0pr1
build: nightly
*/
YUI.add("charts",function(b){function a(c){if(c.type!="pie"){return new b.CartesianChart(c);}else{return new b.PieChart(c);}}b.Chart=a;},"3.6.0pr1",{requires:["charts-base"]});