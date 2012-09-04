/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("intl-base",function(c,b){var a=/[, ]/;c.mix(c.namespace("Intl"),{lookupBestLang:function(h,j){var g,k,d,f;function e(m){var l;for(l=0;l<j.length;l+=1){if(m.toLowerCase()===j[l].toLowerCase()){return j[l];}}}if(c.Lang.isString(h)){h=h.split(a);}for(g=0;g<h.length;g+=1){k=h[g];if(!k||k==="*"){continue;}while(k.length>0){d=e(k);if(d){return d;}else{f=k.lastIndexOf("-");if(f>=0){k=k.substring(0,f);if(f>=2&&k.charAt(f-2)==="-"){k=k.substring(0,f-2);}}else{break;}}}}return"";}});},"3.7.1pr1",{"requires":["yui-base"]});