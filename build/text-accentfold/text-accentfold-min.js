/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("text-accentfold",function(e,t){var n=e.Array,r=e.Text,i=r.Data.AccentFold,s={canFold:function(e){var t;for(t in i)if(i.hasOwnProperty(t)&&e.search(i[t])!==-1)return!0;return!1},compare:function(e,t,n){var r=s.fold(e),i=s.fold(t);return n?!!n(r,i):r===i},filter:function(e,t){return n.filter(e,function(e){return t(s.fold(e))})},fold:function(t){return e.Lang.isArray(t)?n.map(t,s.fold):(t=t.toLowerCase(),e.Object.each(i,function(e,n){t=t.replace(e,n)}),t)}};r.AccentFold=s},"3.7.3",{requires:["array-extras","text-data-accentfold"]});
