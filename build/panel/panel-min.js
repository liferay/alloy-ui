/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("panel",function(b){var a=b.ClassNameManager.getClassName;b.Panel=b.Base.create("panel",b.Widget,[b.WidgetPosition,b.WidgetStdMod,b.WidgetAutohide,b.WidgetButtons,b.WidgetModality,b.WidgetPositionAlign,b.WidgetPositionConstrain,b.WidgetStack],{BUTTONS:{close:{label:"Close",action:"hide",section:"header",template:'<button type="button" />',classNames:a("button","close")}}},{ATTRS:{buttons:{value:["close"]}}});},"3.7.1pr1",{requires:["widget","widget-autohide","widget-buttons","widget-modality","widget-position","widget-position-align","widget-position-constrain","widget-stack","widget-stdmod"],skinnable:true});