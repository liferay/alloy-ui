/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("createlink-base",function(b){var a={};a.STRINGS={PROMPT:"Please enter the URL for the link to point to:",DEFAULT:"http://"};b.namespace("Plugin");b.Plugin.CreateLinkBase=a;b.mix(b.Plugin.ExecCommand.COMMANDS,{createlink:function(i){var h=this.get("host").getInstance(),e,c,g,f,d=prompt(a.STRINGS.PROMPT,a.STRINGS.DEFAULT);if(d){f=h.config.doc.createElement("div");d=d.replace(/"/g,"").replace(/'/g,"");d=h.config.doc.createTextNode(d);f.appendChild(d);d=f.innerHTML;this.get("host")._execCommand(i,d);g=new h.EditorSelection();e=g.getSelected();if(!g.isCollapsed&&e.size()){c=e.item(0).one("a");if(c){e.item(0).replace(c);}if(b.UA.gecko){if(c.get("parentNode").test("span")){if(c.get("parentNode").one("br.yui-cursor")){c.get("parentNode").insert(c,"before");}}}}else{this.get("host").execCommand("inserthtml",'<a href="'+d+'">'+d+"</a>");}}return c;}});},"3.5.0",{skinnable:false,requires:["editor-base"]});