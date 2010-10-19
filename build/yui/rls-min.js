/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("rls",function(A){A._rls=function(G){var D=A.config,F=D.rls||{m:1,v:A.version,gv:D.gallery,env:1,lang:D.lang,"2in3v":D["2in3"],"2v":D.yui2,filt:D.filter,filts:D.filters,tests:1},B=D.rls_base||"load?",E=D.rls_tmpl||function(){var H="",I;for(I in F){if(I in F&&F[I]){H+=I+"={"+I+"}&";}}return H;}(),C;F.m=G;F.env=A.Object.keys(YUI.Env.mods);F.tests=A.Features.all("load",[A]);C=A.Lang.sub(B+E,F);D.rls=F;D.rls_tmpl=E;return C;};},"3.2.0",{requires:["get","features"]});