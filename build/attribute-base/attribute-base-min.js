/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("attribute-base",function(b){var a=function(){this._ATTR_E_FACADE=null;this._yuievt=null;b.AttributeCore.apply(this,arguments);b.AttributeEvents.apply(this,arguments);b.AttributeExtras.apply(this,arguments);};b.mix(a,b.AttributeCore,false,null,1);b.mix(a,b.AttributeExtras,false,null,1);b.mix(a,b.AttributeEvents,true,null,1);a.INVALID_VALUE=b.AttributeCore.INVALID_VALUE;a._ATTR_CFG=b.AttributeCore._ATTR_CFG.concat(b.AttributeEvents._ATTR_CFG);b.Attribute=a;},"3.5.0",{requires:["attribute-core","attribute-events","attribute-extras"]});