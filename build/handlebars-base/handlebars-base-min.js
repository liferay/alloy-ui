/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("handlebars-base",function(e){
/*!
Handlebars.js - Copyright (C) 2011 Yehuda Katz
https://raw.github.com/wycats/handlebars.js/master/LICENSE
*/
var d={};d.VERSION="1.0.beta.5";d.helpers={};d.partials={};d.registerHelper=function(g,h,f){if(f){h.not=f;}this.helpers[g]=h;};d.registerPartial=function(f,g){this.partials[f]=g;};d.registerHelper("helperMissing",function(f){if(arguments.length===2){return undefined;}else{throw new Error("Could not find property '"+f+"'");}});var b=Object.prototype.toString,c="[object Function]";d.registerHelper("blockHelperMissing",function(m,k){var f=k.inverse||function(){},o=k.fn;var h="";var n=b.call(m);if(n===c){m=m.call(this);}if(m===true){return o(this);}else{if(m===false||m==null){return f(this);}else{if(n==="[object Array]"){if(m.length>0){for(var l=0,g=m.length;l<g;l++){h=h+o(m[l]);}}else{h=f(this);}return h;}else{return o(m);}}}});d.registerHelper("each",function(m,k){var n=k.fn,f=k.inverse;var h="";if(m&&m.length>0){for(var l=0,g=m.length;l<g;l++){h=h+n(m[l]);}}else{h=f(this);}return h;});d.registerHelper("if",function(g,f){var h=b.call(g);if(h===c){g=g.call(this);}if(!g||d.Utils.isEmpty(g)){return f.inverse(this);}else{return f.fn(this);}});d.registerHelper("unless",function(h,g){var i=g.fn,f=g.inverse;g.fn=f;g.inverse=i;return d.helpers["if"].call(this,h,g);});d.registerHelper("with",function(g,f){return f.fn(g);});d.registerHelper("log",function(f){d.log(f);});var a=e.Lang;d.Exception=function(h){var f=Error.prototype.constructor.apply(this,arguments),g;for(g in f){if(f.hasOwnProperty(g)){this[g]=f[g];}}this.message=f.message;};d.Exception.prototype=new Error();d.SafeString=function(f){this.string=f;};d.SafeString.prototype.toString=function(){return this.string.toString();};d.Utils={escapeExpression:function(f){if(f===""){return f;}if(f instanceof d.SafeString){return f.toString();}else{if(f===false||!a.isValue(f)){return"";}}return e.Escape.html(f);},isEmpty:function(f){if(f===false||!a.isValue(f)||(a.isArray(f)&&!f.length)){return true;}return false;}};d.VM={template:function(f){var g={escapeExpression:d.Utils.escapeExpression,invokePartial:d.VM.invokePartial,programs:[],program:function(j,k,l){var h=this.programs[j];if(l){return d.VM.program(k,l);}else{if(h){return h;}else{h=this.programs[j]=d.VM.program(k);return h;}}},programWithDepth:d.VM.programWithDepth,noop:d.VM.noop};return function(i,h){h=h||{};return f.call(g,d,i,h.helpers,h.partials,h.data);};},programWithDepth:function(g,i,h){var f=Array.prototype.slice.call(arguments,2);return function(k,j){j=j||{};return g.apply(this,[k,j.data||i].concat(f));};},program:function(f,g){return function(i,h){h=h||{};return f(i,h.data||g);};},noop:function(){return"";},invokePartial:function(f,h,j,k,i,l){var g={helpers:k,partials:i,data:l};if(f===undefined){throw new d.Exception("The partial "+h+" could not be found");}else{if(f instanceof Function){return f(j,g);}else{if(!d.compile){throw new d.Exception("The partial "+h+" could not be compiled when running in runtime-only mode");}else{i[h]=d.compile(f);return i[h](j,g);}}}}};d.template=d.VM.template;e.Handlebars=d;d.VERSION+="-yui";},"3.5.0",{requires:["escape"]});