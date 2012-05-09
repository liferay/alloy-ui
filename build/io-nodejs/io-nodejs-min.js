/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("io-nodejs",function(a){if(!a.IO.request){a.IO.request=require("request");}var b=function(d){var c=[];Object.keys(d).forEach(function(e){c.push(e+": "+d[e]);});return c.join("\n");};a.IO.transports.nodejs=function(){return{send:function(g,f,d){d.notify("start",g,d);d.method=d.method||"GET";var e={method:d.method,uri:f};if(d.data){e.body=d.data;}if(d.headers){e.headers=d.headers;}if(d.timeout){e.timeout=d.timeout;}if(d.request){a.mix(e,d.request);}a.IO.request(e,function(h,i){if(h){g.c=h;d.notify(((h.code==="ETIMEDOUT")?"timeout":"failure"),g,d);return;}if(i){g.c={status:i.statusCode,statusCode:i.statusCode,headers:i.headers,responseText:i.body,responseXML:null,getResponseHeader:function(j){return this.headers[j];},getAllResponseHeaders:function(){return b(this.headers);}};}d.notify("complete",g,d);d.notify(((i&&(i.statusCode>=200&&i.statusCode<=299))?"success":"failure"),g,d);});var c={io:g};return c;}};};a.IO.defaultTransport("nodejs");},"3.5.0",{requires:["io-base"]});