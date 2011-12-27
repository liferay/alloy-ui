/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("event-resize",function(a){a.Event.define("windowresize",{on:(a.UA.gecko&&a.UA.gecko<1.91)?function(d,b,c){b._handle=a.Event.attach("resize",function(f){c.fire(f);});}:function(e,c,d){var b=a.config.windowResizeDelay||100;c._handle=a.Event.attach("resize",function(f){if(c._timer){c._timer.cancel();}c._timer=a.later(b,a,function(){d.fire(f);});});},detach:function(c,b){if(b._timer){b._timer.cancel();}b._handle.detach();}});},"3.4.0",{requires:["event-synthetic"]});