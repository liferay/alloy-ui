/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("file",function(b){var a=b.config.win;if(a&&a.File&&a.FormData&&a.XMLHttpRequest){b.File=b.FileHTML5;}else{b.File=b.FileFlash;}},"3.5.0",{requires:["file-flash","file-html5"]});