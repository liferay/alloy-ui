/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("createlink-base",function(c,b){var a={};a.STRINGS={PROMPT:"Please enter the URL for the link to point to:",DEFAULT:"http://"};c.namespace("Plugin");c.Plugin.CreateLinkBase=a;c.mix(c.Plugin.ExecCommand.COMMANDS,{createlink:function(j){var i=this.get("host").getInstance(),f,d,h,g,e=prompt(a.STRINGS.PROMPT,a.STRINGS.DEFAULT);if(e){g=i.config.doc.createElement("div");e=e.replace(/"/g,"").replace(/'/g,"");e=i.config.doc.createTextNode(e);g.appendChild(e);e=g.innerHTML;this.get("host")._execCommand(j,e);h=new i.EditorSelection();f=h.getSelected();if(!h.isCollapsed&&f.size()){d=f.item(0).one("a");if(d){f.item(0).replace(d);}if(c.UA.gecko){if(d.get("parentNode").test("span")){if(d.get("parentNode").one("br.yui-cursor")){d.get("parentNode").insert(d,"before");}}}}else{this.get("host").execCommand("inserthtml",'<a href="'+e+'">'+e+"</a>");}}return d;}});},"3.7.1pr1",{"requires":["editor-base"]});