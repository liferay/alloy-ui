/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("dd-gestures",function(b,a){b.DD.Drag.START_EVENT="gesturemovestart";b.DD.Drag.prototype._prep=function(){this._dragThreshMet=false;var d=this.get("node"),c=b.DD.DDM;d.addClass(c.CSS_PREFIX+"-draggable");d.on(b.DD.Drag.START_EVENT,b.bind(this._handleMouseDownEvent,this),{minDistance:0,minTime:0});d.on("gesturemoveend",b.bind(this._handleMouseUp,this),{standAlone:true});d.on("dragstart",b.bind(this._fixDragStart,this));};b.DD.DDM._setupListeners=function(){var c=b.DD.DDM;this._createPG();this._active=true;b.one(b.config.doc).on("gesturemove",b.throttle(b.bind(c._move,c),c.get("throttleTime")),{standAlone:true});};},"3.7.1pr1",{"requires":["dd-drag","event-synthetic","event-gestures"]});