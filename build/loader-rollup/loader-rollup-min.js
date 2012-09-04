/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("loader-rollup",function(b,a){b.Loader.prototype._rollup=function(){var l,k,h,p,d=this.required,f,g=this.moduleInfo,e,n,o;if(this.dirty||!this.rollups){this.rollups={};for(l in g){if(g.hasOwnProperty(l)){h=this.getModule(l);if(h&&h.rollup){this.rollups[l]=h;}}}}for(;;){e=false;for(l in this.rollups){if(this.rollups.hasOwnProperty(l)){if(!d[l]&&((!this.loaded[l])||this.forceMap[l])){h=this.getModule(l);p=h.supersedes||[];f=false;if(!h.rollup){continue;}n=0;for(k=0;k<p.length;k++){o=g[p[k]];if(this.loaded[p[k]]&&!this.forceMap[p[k]]){f=false;break;}else{if(d[p[k]]&&h.type==o.type){n++;f=(n>=h.rollup);if(f){break;}}}}if(f){d[l]=true;e=true;this.getRequires(h);}}}}if(!e){break;}}};},"3.7.1pr1",{"requires":["loader-base"]});