/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("app-transitions",function(c,b){function a(){}a.ATTRS={transitions:{setter:"_setTransitions",value:false}};a.FX={fade:{viewIn:"app:fadeIn",viewOut:"app:fadeOut"},slideLeft:{viewIn:"app:slideLeft",viewOut:"app:slideLeft"},slideRight:{viewIn:"app:slideRight",viewOut:"app:slideRight"}};a.prototype={transitions:{navigate:"fade",toChild:"slideLeft",toParent:"slideRight"},_setTransitions:function(e){var d=this.transitions;if(e&&e===true){return c.merge(d);}return e;}};c.App.Transitions=a;c.Base.mix(c.App,[a]);c.mix(c.App.CLASS_NAMES,{transitioning:c.ClassNameManager.getClassName("app","transitioning")});},"3.7.1pr1",{"requires":["app-base"]});