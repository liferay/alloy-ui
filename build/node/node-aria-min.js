/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0PR1
build: nightly
*/
YUI.add("node-aria",function(A){A.Node.re_aria=/^(?:role$|aria-)/;A.Node.prototype._addAriaAttr=function(B){this.addAttr(B,{getter:function(){return A.Node.getDOMNode(this).getAttribute(B,2);},setter:function(C){A.Node.getDOMNode(this).setAttribute(B,C);return C;}});};},"3.2.0PR1",{requires:["node-base"]});