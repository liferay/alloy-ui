YUI.add("aui-tooltip-base",function(e,t){var n=e.Lang,r=e.getClassName,i=r("tooltip-arrow"),s=r("tooltip-inner");e.Tooltip=e.Base.create("tooltip",e.Widget,[e.WidgetCssClass,e.WidgetPosition,e.WidgetStdMod,e.WidgetToggle,e.WidgetAutohide,e.WidgetPositionAlign,e.WidgetPositionAlignSuggestion,e.WidgetPositionConstrain,e.WidgetStack,e.WidgetTransition,e.WidgetTrigger],{initializer:function(){var t=this;t._eventHandles=[e.after(t._afterUiSetTrigger,t,"_uiSetTrigger"),e.on("scroll",e.debounce(t._onScroll,100,t)),e.on("windowresize",e.bind(t._onResize,t))]},destructor:function(){(new e.EventHandle(this._eventHandles)).detach()},renderUI:function(){var t=this,n=t.get("boundingBox"),r=t.get("contentBox");r.addClass(s),n.append(e.Tooltip.TEMPLATES.arrow)},bindUI:function(){var t=this,n=t.get("trigger");n&&n.on("hover",e.bind(t._onBoundingBoxMouseenter,t),e.bind(t._onBoundingBoxMouseleave,t)),t.get("boundingBox").on("hover",e.bind(t._onBoundingBoxMouseenter,t),e.bind(t._onBoundingBoxMouseleave,t))},_uiSetVisible:function(e){var t=this,n=t.get("boundingBox");t._widgetUiSetVisible(e),n.setStyle("opacity",e?t.get("opacity"):0),e&&t._loadTooltipContentFromTitle()},_afterUiSetTrigger:function(e){this._loadTooltipContentFromTitle(),this.suggestAlignment(e)},_borrowTitleAttribute:function(){var e=this.get("trigger"),t=e.getAttribute("title");t&&e.setAttribute("data-title",t).removeAttribute("title")},_setStdModSection:function(t){var r=this.get("formatter");return n.isString(t)&&(r&&(t=r.call(this,t)),this.get("html")||(t=e.Escape.html(t))),t},_loadTooltipContentFromTitle:function(){var t=this.get("trigger"),n;if(!t)return;this._borrowTitleAttribute(),n=t.getAttribute("data-title"),n&&this.setStdModContent(e.WidgetStdMod.BODY,n)},_onBoundingBoxMouseenter:function(){this.show()},_onBoundingBoxMouseleave:function(){this.hide()},_onResize:function(){this.suggestAlignment(this.get("trigger"))},_onScroll:function(){this.suggestAlignment(this.get("trigger"))},_widgetUiSetVisible:e.Widget.prototype._uiSetVisible},{CSS_PREFIX:r("tooltip"),ATTRS:{animated:{value:!0},bodyContent:{setter:"_setStdModSection"},constrain:{value:!0},footerContent:{setter:"_setStdModSection"},formatter:{validator:e.Lang.isFunction},headerContent:{setter:"_setStdModSection"},html:{value:!1,validator:n.isBoolean},opacity:{value:.8},triggerShowEvent:{validator:n.isString,value:"mouseenter"},zIndex:{value:1030}},TEMPLATES:{arrow:'<div class="'+i+'"></div>'}})},"3.1.0-deprecated.23",{requires:["escape","event-hover","widget","widget-autohide","widget-position","widget-position-align","widget-position-constrain","widget-stack","widget-stdmod","aui-classnamemanager","aui-component","aui-debounce","aui-widget-cssclass","aui-widget-toggle","aui-widget-transition","aui-widget-trigger","aui-widget-position-align-suggestion","aui-node-base","event-resize"],skinnable:!0});
