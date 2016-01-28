YUI.add("aui-progressbar",function(e,t){var n=e.Lang,r=n.isNumber,i=n.isString,s=n.isUndefined,o=function(e){return parseFloat(e)||0},u=e.getClassName,a=u("progress","bar"),f=u("horizontal"),l=u("vertical"),c="<p></p>",h=e.Component.create({NAME:"progress",ATTRS:{useARIA:{value:!0},height:{valueFn:function(){return this.get("boundingBox").get("offsetHeight")||25}},label:{},max:{validator:r,value:100},min:{validator:r,value:0},orientation:{value:"horizontal",validator:function(e){return i(e)&&(e==="horizontal"||e==="vertical")}},ratio:{getter:"_getRatio",readOnly:!0},step:{getter:"_getStep",readOnly:!0},tabIndex:{value:1},textNode:{valueFn:function(){return e.Node.create(c)}},value:{setter:o,validator:function(e){return r(o(e))&&e>=this.get("min")&&e<=this.get("max")},value:0}},HTML_PARSER:{label:function(e){var t=e.one("p");if(t)return t.html()},textNode:"p"},UI_ATTRS:["label","orientation","value"],prototype:{renderUI:function(){var e=this;e.get("contentBox").addClass(a),e._renderTextNodeIfLabelSet()},syncUI:function(){var t=this;t.get("useARIA")&&t.plug(e.Plugin.Aria,{attributes:{value:"valuenow",max:"valuemax",min:"valuemin",orientation:"orientation"},roleName:"progressbar"})},_getBoundingBoxSize:function(){var e=this,t=e.get("boundingBox");return o(t.getStyle(this.get("orientation")==="horizontal"?"width":"height"))},_getPixelStep:function(){var e=this;return e._getBoundingBoxSize()*e.get("ratio")},_getRatio:function(){var e=this,t=e.get("min"),n=(e.get("value")-t)/(e.get("max")-t);return Math.max(n,0)},_getStep:function(){return this.get("ratio")*100},_renderTextNodeIfLabelSet:function(){var e=this;s(e.get("label"))||e.get("contentBox").append(e.get("textNode"))},_uiSetLabel:function(e){var t=this,n=t.get("textNode");n.inDoc()||t._renderTextNodeIfLabelSet(),n.html(e)},_uiSetOrientation:function(e){var t=this,n=t.get("boundingBox"),r=e==="horizontal";n.toggleClass(f,r),n.toggleClass(l,!r),t._uiSetValue(t.get("value")),t._uiSizeTextNode()},_uiSetValue:function(){var e=this,t=e._getPixelStep(),n={};e.get("orientation")==="horizontal"?n={height:"100%",top:"auto",width:t+"px"}:n={height:t+"px",top:o(e._getBoundingBoxSize()-t)+"px",width:"100%"},e.get("step")>=100&&e.fire("complete"),e.get("contentBox").setStyles(n)},_uiSizeTextNode:function(){var e=this,t=e.get("boundingBox"),n=e.get("textNode");n.setStyle("lineHeight",t.getStyle("height"))}}});e.ProgressBar=h},"3.0.3-deprecated.10",{requires:["aui-node","aui-component","aui-aria"],skinnable:!0});
