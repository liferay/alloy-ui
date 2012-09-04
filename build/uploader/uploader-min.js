/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("uploader",function(b){var a=b.config.win;if(a&&a.File&&a.FormData&&a.XMLHttpRequest){b.Uploader=b.UploaderHTML5;}else{if(b.SWFDetect.isFlashVersionAtLeast(10,0,45)){b.Uploader=b.UploaderFlash;}else{b.namespace("Uploader");b.Uploader.TYPE="none";}}},"3.7.1pr1",{requires:["uploader-flash","uploader-html5"]});