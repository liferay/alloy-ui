/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0
build: nightly
*/
YUI.add("loader-rollup",function(A){A.Loader.prototype._rollup=function(){var G,F,E,L,K={},B=this.required,C,D=this.moduleInfo,H,I,J;if(this.dirty||!this.rollups){for(G in D){if(D.hasOwnProperty(G)){E=this.getModule(G);if(E&&E.rollup){K[G]=E;}}}this.rollups=K;this.forceMap=(this.force)?A.Array.hash(this.force):{};}for(;;){H=false;for(G in K){if(K.hasOwnProperty(G)){if(!B[G]&&((!this.loaded[G])||this.forceMap[G])){E=this.getModule(G);L=E.supersedes||[];C=false;if(!E.rollup){continue;}I=0;for(F=0;F<L.length;F=F+1){J=D[L[F]];if(this.loaded[L[F]]&&!this.forceMap[L[F]]){C=false;break;}else{if(B[L[F]]&&E.type==J.type){I++;C=(I>=E.rollup);if(C){break;}}}}if(C){B[G]=true;H=true;this.getRequires(E);}}}}if(!H){break;}}};},"3.2.0",{requires:["loader-base"]});