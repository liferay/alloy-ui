/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("node-event-simulate",function(a){a.Node.prototype.simulate=function(c,b){a.Event.simulate(a.Node.getDOMNode(this),c,b);};a.Node.prototype.simulateGesture=function(d,c,b){a.Event.simulateGesture(this,d,c,b);};},"3.7.1pr1",{requires:["node-base","event-simulate"]});