YUI.add("aui-widget-responsive",function(e,t){function n(){}n.prototype={initializer:function(){this._responsiveEventHandles=[e.after(this._handleResponsive,this,"_uiSetHeight"),e.after(this._handleResponsive,this,"_uiSetVisible"),e.after(this._handleResponsive,this,"_uiSetWidth"),this.after({gutterChange:this._handleResponsive,maxHeightChange:this._handleResponsive,maxWidthChange:this._handleResponsive,preserveRatioChange:this._handleResponsive,render:this._handleResponsive}),e.after("windowresize",e.bind(this._handleResponsive,this))],this.publish({responsive:{defaultFn:this._defResponsiveFn}})},destructor:function(){(new e.EventHandle(this._responsiveEventHandles)).detach()},updateDimensions:function(){this._handleResponsive()},updateDimensionsWithNewRatio:function(){this._originalDimensions=null,this.updateDimensions()},_calculateOriginalDimensions:function(){var e=this.get("boundingBox"),t=this.get("gutter");return this._originalDimensions||(e.setStyles({display:"inline-block"}),this._originalDimensions={height:e.get("offsetHeight")-t[1],width:e.get("offsetWidth")-t[0]},e.setStyles({display:""})),this._originalDimensions},_canChangeHeight:function(){return this.get("height")==="auto"||this.get("height")===""},_canChangeWidth:function(){return this.get("width")==="auto"||this.get("width")===""},_defResponsiveFn:function(t){if(!this.get("visible"))return;var n=this.get("boundingBox"),r=this.get("gutter"),i=this.get("maxHeight"),s=this.get("maxWidth"),o,u,a,f=1,l=e.DOM.viewportRegion();this._uiSetDim("width",this.get("width")),this._uiSetDim("height",this.get("height")),o=n.get("offsetHeight")-r[1],u=n.get("offsetWidth")-r[0],this._canChangeHeight()&&this.get("preserveRatio")&&(a=this._calculateOriginalDimensions(),o=a.height*u/a.width),this._canChangeHeight()&&(i=Math.min(i,l.height)-r[1]),this._canChangeWidth()&&(s=Math.min(s,l.width)-r[0]);if(u>s||o>i)f=Math.min(i/o,s/u);o=Math.floor(o*f),u=Math.floor(u*f),n.set("offsetHeight",o+r[1]),n.set("offsetWidth",u+r[0]),t.height=o,t.width=u},_handleResponsive:function(){var e=this.get("boundingBox"),t=this.get("gutter");this.fire("responsive",{height:e.get("offsetHeight")-t[1],width:e.get("offsetWidth")-t[0]})}},n.ATTRS={gutter:{value:[0,0],validator:function(t){return e.Lang.isArray(t)&&t.length===2}},maxHeight:{value:Infinity,validator:e.Lang.isNumber},maxWidth:{value:Infinity,validator:e.Lang.isNumber},preserveRatio:{value:!0,validator:e.Lang.isBoolean}},e.WidgetResponsive=n},"3.0.3-deprecated.94",{requires:["event-resize","widget-base"]});
