/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("autocomplete-highlighters-accentfold",function(c){var a=c.Highlight,b=c.Array;c.mix(c.namespace("AutoCompleteHighlighters"),{charMatchFold:function(f,e){var d=b.unique(f.split(""));return b.map(e,function(g){return a.allFold(g.text,d);});},phraseMatchFold:function(e,d){return b.map(d,function(f){return a.allFold(f.text,[e]);});},startsWithFold:function(e,d){return b.map(d,function(f){return a.allFold(f.text,[e],{startsWith:true});});},subWordMatchFold:function(f,d){var e=c.Text.WordBreak.getUniqueWords(f);return b.map(d,function(g){return a.allFold(g.text,e);});},wordMatchFold:function(e,d){return b.map(d,function(f){return a.wordsFold(f.text,e);});}});},"3.5.0",{requires:["array-extras","highlight-accentfold"]});