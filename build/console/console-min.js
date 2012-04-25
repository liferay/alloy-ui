/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.5.0
build: nightly
*/
YUI.add("console",function(d){var g=d.ClassNameManager.getClassName,b="checked",R="clear",Q="click",s="collapsed",ad="console",B="contentBox",F="disabled",N="entry",J="error",H="height",o="info",l="lastTime",f="pause",D="paused",W="reset",U="startTime",O="title",G="warn",x=".",w=g(ad,"button"),z=g(ad,"checkbox"),ac=g(ad,R),V=g(ad,"collapse"),r=g(ad,s),e=g(ad,"controls"),C=g(ad,"hd"),A=g(ad,"bd"),c=g(ad,"ft"),I=g(ad,O),X=g(ad,N),S=g(ad,N,"cat"),y=g(ad,N,"content"),t=g(ad,N,"meta"),E=g(ad,N,"src"),a=g(ad,N,"time"),p=g(ad,f),v=g(ad,f,"label"),M=/^(\S+)\s/,Z=/&(?!#?[a-z0-9]+;)/g,T=/>/g,j=/</g,h="&#38;",q="&#62;",K="&#60;",n='<div class="{entry_class} {cat_class} {src_class}">'+'<p class="{entry_meta_class}">'+'<span class="{entry_src_class}">'+"{sourceAndDetail}"+"</span>"+'<span class="{entry_cat_class}">'+"{category}</span>"+'<span class="{entry_time_class}">'+" {totalTime}ms (+{elapsedTime}) {localTime}"+"</span>"+"</p>"+'<pre class="{entry_content_class}">{message}</pre>'+"</div>",i=d.Lang,k=d.Node.create,ab=i.isNumber,m=i.isString,P=d.merge,aa=d.substitute;function u(){u.superclass.constructor.apply(this,arguments);}d.Console=d.extend(u,d.Widget,{_evtCat:null,_head:null,_body:null,_foot:null,_printLoop:null,buffer:null,log:function(){d.log.apply(d,arguments);return this;},clearConsole:function(){this._body.empty();this._cancelPrintLoop();this.buffer=[];return this;},reset:function(){this.fire(W);return this;},collapse:function(){this.set(s,true);return this;},expand:function(){this.set(s,false);return this;},printBuffer:function(Y){var aj=this.buffer,ae=d.config.debug,L=[],ag=this.get("consoleLimit"),ai=this.get("newestOnTop"),af=ai?this._body.get("firstChild"):null,ah;if(aj.length>ag){aj.splice(0,aj.length-ag);}Y=Math.min(aj.length,(Y||aj.length));d.config.debug=false;if(!this.get(D)&&this.get("rendered")){for(ah=0;ah<Y&&aj.length;++ah){L[ah]=this._createEntryHTML(aj.shift());}if(!aj.length){this._cancelPrintLoop();}if(L.length){if(ai){L.reverse();}this._body.insertBefore(k(L.join("")),af);if(this.get("scrollIntoView")){this.scrollToLatest();}this._trimOldEntries();}}d.config.debug=ae;return this;},initializer:function(){this._evtCat=d.stamp(this)+"|";this.buffer=[];this.get("logSource").on(this._evtCat+this.get("logEvent"),d.bind("_onLogEvent",this));this.publish(N,{defaultFn:this._defEntryFn});this.publish(W,{defaultFn:this._defResetFn});this.after("rendered",this._schedulePrint);},destructor:function(){var L=this.get("boundingBox");this._cancelPrintLoop();this.get("logSource").detach(this._evtCat+"*");L.purge(true);},renderUI:function(){this._initHead();this._initBody();this._initFoot();var L=this.get("style");if(L!=="block"){this.get("boundingBox").addClass(this.getClassName(L));}},syncUI:function(){this._uiUpdatePaused(this.get(D));this._uiUpdateCollapsed(this.get(s));this._uiSetHeight(this.get(H));},bindUI:function(){this.get(B).one("button."+V).on(Q,this._onCollapseClick,this);this.get(B).one("input[type=checkbox]."+p).on(Q,this._onPauseClick,this);this.get(B).one("button."+ac).on(Q,this._onClearClick,this);this.after(this._evtCat+"stringsChange",this._afterStringsChange);this.after(this._evtCat+"pausedChange",this._afterPausedChange);this.after(this._evtCat+"consoleLimitChange",this._afterConsoleLimitChange);this.after(this._evtCat+"collapsedChange",this._afterCollapsedChange);},_initHead:function(){var L=this.get(B),Y=P(u.CHROME_CLASSES,{str_collapse:this.get("strings.collapse"),str_title:this.get("strings.title")});this._head=k(aa(u.HEADER_TEMPLATE,Y));L.insertBefore(this._head,L.get("firstChild"));},_initBody:function(){this._body=k(aa(u.BODY_TEMPLATE,u.CHROME_CLASSES));this.get(B).appendChild(this._body);},_initFoot:function(){var L=P(u.CHROME_CLASSES,{id_guid:d.guid(),str_pause:this.get("strings.pause"),str_clear:this.get("strings.clear")});this._foot=k(aa(u.FOOTER_TEMPLATE,L));this.get(B).appendChild(this._foot);},_isInLogLevel:function(ae){var L=ae.cat,Y=this.get("logLevel");if(Y!==o){L=L||o;if(m(L)){L=L.toLowerCase();}if((L===G&&Y===J)||(L===o&&Y!==o)){return false;}}return true;},_normalizeMessage:function(ae){var ag=ae.msg,Y=ae.cat,af=ae.src,L={time:new Date(),message:ag,category:Y||this.get("defaultCategory"),sourceAndDetail:af||this.get("defaultSource"),source:null,localTime:null,elapsedTime:null,totalTime:null};L.source=M.test(L.sourceAndDetail)?RegExp.$1:L.sourceAndDetail;L.localTime=L.time.toLocaleTimeString?L.time.toLocaleTimeString():(L.time+"");L.elapsedTime=L.time-this.get(l);L.totalTime=L.time-this.get(U);this._set(l,L.time);return L;},_schedulePrint:function(){if(!this._printLoop&&!this.get(D)&&this.get("rendered")){this._printLoop=d.later(this.get("printTimeout"),this,this.printBuffer,this.get("printLimit"),true);}},_createEntryHTML:function(L){L=P(this._htmlEscapeMessage(L),u.ENTRY_CLASSES,{cat_class:this.getClassName(N,L.category),src_class:this.getClassName(N,L.source)});return this.get("entryTemplate").replace(/\{(\w+)\}/g,function(Y,ae){return ae in L?L[ae]:"";});},scrollToLatest:function(){var L=this.get("newestOnTop")?0:this._body.get("scrollHeight");this._body.set("scrollTop",L);},_htmlEscapeMessage:function(L){L.message=this._encodeHTML(L.message);L.source=this._encodeHTML(L.source);L.sourceAndDetail=this._encodeHTML(L.sourceAndDetail);L.category=this._encodeHTML(L.category);return L;},_trimOldEntries:function(){d.config.debug=false;var ah=this._body,ae=this.get("consoleLimit"),af=d.config.debug,L,ai,ag,Y;if(ah){L=ah.all(x+X);Y=L.size()-ae;if(Y>0){if(this.get("newestOnTop")){ag=ae;Y=L.size();}else{ag=0;}this._body.setStyle("display","none");for(;ag<Y;++ag){ai=L.item(ag);if(ai){ai.remove();}}this._body.setStyle("display","");}}d.config.debug=af;},_encodeHTML:function(L){return m(L)?L.replace(Z,h).replace(j,K).replace(T,q):L;},_cancelPrintLoop:function(){if(this._printLoop){this._printLoop.cancel();this._printLoop=null;}},_validateStyle:function(L){return L==="inline"||L==="block"||L==="separate";},_onPauseClick:function(L){this.set(D,L.target.get(b));
},_onClearClick:function(L){this.clearConsole();},_onCollapseClick:function(L){this.set(s,!this.get(s));},_validateLogSource:function(L){return L&&d.Lang.isFunction(L.on);},_setLogLevel:function(L){if(m(L)){L=L.toLowerCase();}return(L===G||L===J)?L:o;},_getUseBrowserConsole:function(){var L=this.get("logSource");return L instanceof YUI?L.config.useBrowserConsole:null;},_setUseBrowserConsole:function(L){var Y=this.get("logSource");if(Y instanceof YUI){L=!!L;Y.config.useBrowserConsole=L;return L;}else{return d.Attribute.INVALID_VALUE;}},_uiSetHeight:function(L){u.superclass._uiSetHeight.apply(this,arguments);if(this._head&&this._foot){var Y=this.get("boundingBox").get("offsetHeight")-this._head.get("offsetHeight")-this._foot.get("offsetHeight");this._body.setStyle(H,Y+"px");}},_uiSizeCB:function(){},_afterStringsChange:function(ae){var ag=ae.subAttrName?ae.subAttrName.split(x)[1]:null,L=this.get(B),Y=ae.prevVal,af=ae.newVal;if((!ag||ag===O)&&Y.title!==af.title){L.all(x+I).setContent(af.title);}if((!ag||ag===f)&&Y.pause!==af.pause){L.all(x+v).setContent(af.pause);}if((!ag||ag===R)&&Y.clear!==af.clear){L.all(x+ac).set("value",af.clear);}},_afterPausedChange:function(Y){var L=Y.newVal;if(Y.src!==d.Widget.SRC_UI){this._uiUpdatePaused(L);}if(!L){this._schedulePrint();}else{if(this._printLoop){this._cancelPrintLoop();}}},_uiUpdatePaused:function(L){var Y=this._foot.all("input[type=checkbox]."+p);if(Y){Y.set(b,L);}},_afterConsoleLimitChange:function(){this._trimOldEntries();},_afterCollapsedChange:function(L){this._uiUpdateCollapsed(L.newVal);},_uiUpdateCollapsed:function(L){var af=this.get("boundingBox"),Y=af.all("button."+V),ag=L?"addClass":"removeClass",ae=this.get("strings."+(L?"expand":"collapse"));af[ag](r);if(Y){Y.setContent(ae);}this._uiSetHeight(L?this._head.get("offsetHeight"):this.get(H));},_afterVisibleChange:function(L){u.superclass._afterVisibleChange.apply(this,arguments);this._uiUpdateFromHideShow(L.newVal);},_uiUpdateFromHideShow:function(L){if(L){this._uiSetHeight(this.get(H));}},_onLogEvent:function(Y){if(!this.get(F)&&this._isInLogLevel(Y)){var L=d.config.debug;d.config.debug=false;this.fire(N,{message:this._normalizeMessage(Y)});d.config.debug=L;}},_defResetFn:function(){this.clearConsole();this.set(U,new Date());this.set(F,false);this.set(D,false);},_defEntryFn:function(L){if(L.message){this.buffer.push(L.message);this._schedulePrint();}}},{NAME:ad,LOG_LEVEL_INFO:o,LOG_LEVEL_WARN:G,LOG_LEVEL_ERROR:J,ENTRY_CLASSES:{entry_class:X,entry_meta_class:t,entry_cat_class:S,entry_src_class:E,entry_time_class:a,entry_content_class:y},CHROME_CLASSES:{console_hd_class:C,console_bd_class:A,console_ft_class:c,console_controls_class:e,console_checkbox_class:z,console_pause_class:p,console_pause_label_class:v,console_button_class:w,console_clear_class:ac,console_collapse_class:V,console_title_class:I},HEADER_TEMPLATE:'<div class="{console_hd_class}">'+'<h4 class="{console_title_class}">{str_title}</h4>'+'<button type="button" class="'+'{console_button_class} {console_collapse_class}">{str_collapse}'+"</button>"+"</div>",BODY_TEMPLATE:'<div class="{console_bd_class}"></div>',FOOTER_TEMPLATE:'<div class="{console_ft_class}">'+'<div class="{console_controls_class}">'+'<label for="{id_guid}" class="{console_pause_label_class}">'+'<input type="checkbox" class="{console_checkbox_class} '+'{console_pause_class}" value="1" id="{id_guid}"> '+"{str_pause}</label>"+'<button type="button" class="'+'{console_button_class} {console_clear_class}">{str_clear}'+"</button>"+"</div>"+"</div>",ENTRY_TEMPLATE:n,ATTRS:{logEvent:{value:"yui:log",writeOnce:true,validator:m},logSource:{value:d,writeOnce:true,validator:function(L){return this._validateLogSource(L);}},strings:{valueFn:function(){return d.Intl.get("console");}},paused:{value:false,validator:i.isBoolean},defaultCategory:{value:o,validator:m},defaultSource:{value:"global",validator:m},entryTemplate:{value:n,validator:m},logLevel:{value:d.config.logLevel||o,setter:function(L){return this._setLogLevel(L);}},printTimeout:{value:100,validator:ab},printLimit:{value:50,validator:ab},consoleLimit:{value:300,validator:ab},newestOnTop:{value:true},scrollIntoView:{value:true},startTime:{value:new Date()},lastTime:{value:new Date(),readOnly:true},collapsed:{value:false},height:{value:"300px"},width:{value:"300px"},useBrowserConsole:{lazyAdd:false,value:false,getter:function(){return this._getUseBrowserConsole();},setter:function(L){return this._setUseBrowserConsole(L);}},style:{value:"separate",writeOnce:true,validator:function(L){return this._validateStyle(L);}}}});},"3.5.0",{lang:["en","es","ja"],requires:["substitute","widget","yui-log"]});