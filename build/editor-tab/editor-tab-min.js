/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("editor-tab",function(d,c){var b=function(){b.superclass.constructor.apply(this,arguments);},a="host";d.extend(b,d.Base,{_onNodeChange:function(g){var f="indent";if(g.changedType==="tab"){if(!g.changedNode.test("li, li *")){g.changedEvent.halt();g.preventDefault();if(g.changedEvent.shiftKey){f="outdent";}this.get(a).execCommand(f,"");}}},initializer:function(){this.get(a).on("nodeChange",d.bind(this._onNodeChange,this));}},{NAME:"editorTab",NS:"tab",ATTRS:{host:{value:false}}});d.namespace("Plugin");d.Plugin.EditorTab=b;},"3.7.1pr1",{"requires":["editor-base"]});