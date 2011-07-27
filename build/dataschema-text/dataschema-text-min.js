/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.4.0
build: nightly
*/
YUI.add("dataschema-text",function(c){var b=c.Lang,a={apply:function(f,g){var d=g,e={results:[],meta:{}};if(b.isString(d)&&b.isString(f.resultDelimiter)){e=a._parseResults.call(this,f,d,e);}else{e.error=new Error("Text schema parse failure");}return e;},_parseResults:function(d,m,e){var k=d.resultDelimiter,h=[],n,r,u,t,l,p,s,q,g,f,o=m.length-k.length;if(m.substr(o)==k){m=m.substr(0,o);}n=m.split(d.resultDelimiter);for(g=n.length-1;g>-1;g--){u={};t=n[g];if(b.isString(d.fieldDelimiter)){r=t.split(d.fieldDelimiter);if(b.isArray(d.resultFields)){l=d.resultFields;for(f=l.length-1;f>-1;f--){p=l[f];s=(!b.isUndefined(p.key))?p.key:p;q=(!b.isUndefined(r[s]))?r[s]:r[f];u[s]=c.DataSchema.Base.parse.call(this,q,p);}}}else{u=t;}h[g]=u;}e.results=h;return e;}};c.DataSchema.Text=c.mix(a,c.DataSchema.Base);},"3.4.0",{requires:["dataschema-base"]});