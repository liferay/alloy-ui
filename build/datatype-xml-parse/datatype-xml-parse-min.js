/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("datatype-xml-parse",function(e,t){var n=e.Lang;e.mix(e.namespace("XML"),{parse:function(e){var t=null;if(n.isString(e))try{n.isUndefined(ActiveXObject)||(t=new ActiveXObject("Microsoft.XMLDOM"),t.async=!1,t.loadXML(e))}catch(r){try{n.isUndefined(DOMParser)||(t=(new DOMParser).parseFromString(e,"text/xml")),n.isUndefined(Windows.Data.Xml.Dom)||(t=new Windows.Data.Xml.Dom.XmlDocument,t.loadXml(e))}catch(i){}}return n.isNull(t)||n.isNull(t.documentElement)||t.documentElement.nodeName==="parsererror",t}}),e.namespace("Parsers").xml=e.XML.parse,e.namespace("DataType"),e.DataType.XML=e.XML},"3.7.3");
