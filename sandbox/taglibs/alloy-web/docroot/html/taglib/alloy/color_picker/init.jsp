<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:color-picker:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:color-picker:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:color-picker:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:color-picker:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:color-picker:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:color-picker:align");
java.lang.Object _colorpickerBodyContent = (java.lang.Object)request.getAttribute("alloy:color-picker:colorpickerBodyContent");
java.lang.Boolean _cancellableHide = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:cancellableHide"), true);
java.lang.Object _centered = (java.lang.Object)request.getAttribute("alloy:color-picker:centered");
java.lang.Object _constrain = (java.lang.Object)request.getAttribute("alloy:color-picker:constrain");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:color-picker:cssClass");
java.lang.Object _currentNode = (java.lang.Object)request.getAttribute("alloy:color-picker:currentNode");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:disabled"), false);
java.lang.Object _fillHeight = (java.lang.Object)request.getAttribute("alloy:color-picker:fillHeight");
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:focused"), false);
java.lang.Object _footerContent = (java.lang.Object)request.getAttribute("alloy:color-picker:footerContent");
java.lang.Object _headerContent = (java.lang.Object)request.getAttribute("alloy:color-picker:headerContent");
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:color-picker:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:color-picker:hideClass");
java.lang.Number _hideDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:color-picker:hideDelay"), 0);
java.lang.Object _hideOn = (java.lang.Object)request.getAttribute("alloy:color-picker:hideOn");
java.lang.Boolean _hideOnDocumentClick = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:hideOnDocumentClick"), true);
java.lang.Object _colorpickerId = (java.lang.Object)request.getAttribute("alloy:color-picker:colorpickerId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:initialized"), false);
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:preventOverlap"), false);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:rendered"), false);
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:shim"), false);
java.lang.Number _showDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:color-picker:showDelay"), 0);
java.lang.Object _showOn = (java.lang.Object)request.getAttribute("alloy:color-picker:showOn");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:color-picker:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:color-picker:tabIndex"), 0);
java.lang.Object _trigger = (java.lang.Object)request.getAttribute("alloy:color-picker:trigger");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:color-picker:visible"), false);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:color-picker:width");
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:color-picker:x"), 0);
java.lang.Object _xy = (java.lang.Object)request.getAttribute("alloy:color-picker:xy");
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:color-picker:y"), 0);
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:color-picker:zIndex"), 0);
java.lang.Object _afterAlignChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterAlignChange");
java.lang.Object _afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterBodyContentChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterBoundingBoxChange");
java.lang.Object _afterCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterCancellableHideChange");
java.lang.Object _afterCenteredChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterCenteredChange");
java.lang.Object _afterConstrainChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterConstrainChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterCssClassChange");
java.lang.Object _afterCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterCurrentNodeChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:color-picker:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterDisabledChange");
java.lang.Object _afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterFillHeightChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterFocusedChange");
java.lang.Object _afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterFooterContentChange");
java.lang.Object _afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterHeaderContentChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterHideClassChange");
java.lang.Object _afterHideDelayChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterHideDelayChange");
java.lang.Object _afterHideOnChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterHideOnChange");
java.lang.Object _afterHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterHideOnDocumentClickChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:color-picker:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterInitializedChange");
java.lang.Object _afterPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterPreventOverlapChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterRenderedChange");
java.lang.Object _afterShimChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterShimChange");
java.lang.Object _afterShowDelayChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterShowDelayChange");
java.lang.Object _afterShowOnChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterShowOnChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterTabIndexChange");
java.lang.Object _afterTriggerChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterTriggerChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:color-picker:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:color-picker:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterWidthChange");
java.lang.Object _afterXChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterXChange");
java.lang.Object _afterXyChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterXyChange");
java.lang.Object _afterYChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterYChange");
java.lang.Object _afterZIndexChange = (java.lang.Object)request.getAttribute("alloy:color-picker:afterZIndexChange");
java.lang.Object _onAlignChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onAlignChange");
java.lang.Object _onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onBodyContentChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onBoundingBoxChange");
java.lang.Object _onCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onCancellableHideChange");
java.lang.Object _onCenteredChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onCenteredChange");
java.lang.Object _onConstrainChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onConstrainChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onCssClassChange");
java.lang.Object _onCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onCurrentNodeChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:color-picker:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onDisabledChange");
java.lang.Object _onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onFillHeightChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onFocusedChange");
java.lang.Object _onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onFooterContentChange");
java.lang.Object _onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onHeaderContentChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onHideClassChange");
java.lang.Object _onHideDelayChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onHideDelayChange");
java.lang.Object _onHideOnChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onHideOnChange");
java.lang.Object _onHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onHideOnDocumentClickChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:color-picker:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onInitializedChange");
java.lang.Object _onPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onPreventOverlapChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onRenderedChange");
java.lang.Object _onShimChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onShimChange");
java.lang.Object _onShowDelayChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onShowDelayChange");
java.lang.Object _onShowOnChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onShowOnChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onTabIndexChange");
java.lang.Object _onTriggerChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onTriggerChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:color-picker:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:color-picker:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onWidthChange");
java.lang.Object _onXChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onXChange");
java.lang.Object _onXyChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onXyChange");
java.lang.Object _onYChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onYChange");
java.lang.Object _onZIndexChange = (java.lang.Object)request.getAttribute("alloy:color-picker:onZIndexChange");

String uniqueId = StringPool.BLANK;

boolean useMarkup = GetterUtil.getBoolean(String.valueOf(dynamicAttributes.get("useMarkup")));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	String prefix = StringPool.POUND.concat(uniqueId);

	if (!hasBoundingBox) {
		_boundingBox = prefix.concat("BoundingBox");

		options.put("boundingBox", _boundingBox);
	}

	if (!hasSrcNode && !hasContentBox) {
		_srcNode = prefix.concat("SrcNode");

		options.put("srcNode", _srcNode);
	}

	if (!hasSrcNode && hasContentBox) {
		_contentBox = prefix.concat("ContentBox");

		options.put("contentBox", _contentBox);
	}
}
%>

<%@ include file="init-ext.jsp" %>

<%
_updateOptions(options, "align", _align);
_updateOptions(options, "colorpickerBodyContent", _colorpickerBodyContent);
_updateOptions(options, "boundingBox", _boundingBox);
_updateOptions(options, "cancellableHide", _cancellableHide);
_updateOptions(options, "centered", _centered);
_updateOptions(options, "constrain", _constrain);
_updateOptions(options, "contentBox", _contentBox);
_updateOptions(options, "cssClass", _cssClass);
_updateOptions(options, "currentNode", _currentNode);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "disabled", _disabled);
_updateOptions(options, "fillHeight", _fillHeight);
_updateOptions(options, "focused", _focused);
_updateOptions(options, "footerContent", _footerContent);
_updateOptions(options, "headerContent", _headerContent);
_updateOptions(options, "height", _height);
_updateOptions(options, "hideClass", _hideClass);
_updateOptions(options, "hideDelay", _hideDelay);
_updateOptions(options, "hideOn", _hideOn);
_updateOptions(options, "hideOnDocumentClick", _hideOnDocumentClick);
_updateOptions(options, "colorpickerId", _colorpickerId);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "preventOverlap", _preventOverlap);
_updateOptions(options, "render", _render);
_updateOptions(options, "rendered", _rendered);
_updateOptions(options, "shim", _shim);
_updateOptions(options, "showDelay", _showDelay);
_updateOptions(options, "showOn", _showOn);
_updateOptions(options, "srcNode", _srcNode);
_updateOptions(options, "strings", _strings);
_updateOptions(options, "tabIndex", _tabIndex);
_updateOptions(options, "trigger", _trigger);
_updateOptions(options, "visible", _visible);
_updateOptions(options, "width", _width);
_updateOptions(options, "x", _x);
_updateOptions(options, "xy", _xy);
_updateOptions(options, "y", _y);
_updateOptions(options, "zIndex", _zIndex);
_updateOptions(options, "afterAlignChange", _afterAlignChange);
_updateOptions(options, "afterBodyContentChange", _afterBodyContentChange);
_updateOptions(options, "afterBoundingBoxChange", _afterBoundingBoxChange);
_updateOptions(options, "afterCancellableHideChange", _afterCancellableHideChange);
_updateOptions(options, "afterCenteredChange", _afterCenteredChange);
_updateOptions(options, "afterConstrainChange", _afterConstrainChange);
_updateOptions(options, "afterContentBoxChange", _afterContentBoxChange);
_updateOptions(options, "afterCssClassChange", _afterCssClassChange);
_updateOptions(options, "afterCurrentNodeChange", _afterCurrentNodeChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterDisabledChange", _afterDisabledChange);
_updateOptions(options, "afterFillHeightChange", _afterFillHeightChange);
_updateOptions(options, "afterFocusedChange", _afterFocusedChange);
_updateOptions(options, "afterFooterContentChange", _afterFooterContentChange);
_updateOptions(options, "afterHeaderContentChange", _afterHeaderContentChange);
_updateOptions(options, "afterHeightChange", _afterHeightChange);
_updateOptions(options, "afterHideClassChange", _afterHideClassChange);
_updateOptions(options, "afterHideDelayChange", _afterHideDelayChange);
_updateOptions(options, "afterHideOnChange", _afterHideOnChange);
_updateOptions(options, "afterHideOnDocumentClickChange", _afterHideOnDocumentClickChange);
_updateOptions(options, "afterIdChange", _afterIdChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterPreventOverlapChange", _afterPreventOverlapChange);
_updateOptions(options, "afterRenderChange", _afterRenderChange);
_updateOptions(options, "afterRenderedChange", _afterRenderedChange);
_updateOptions(options, "afterShimChange", _afterShimChange);
_updateOptions(options, "afterShowDelayChange", _afterShowDelayChange);
_updateOptions(options, "afterShowOnChange", _afterShowOnChange);
_updateOptions(options, "afterSrcNodeChange", _afterSrcNodeChange);
_updateOptions(options, "afterStringsChange", _afterStringsChange);
_updateOptions(options, "afterTabIndexChange", _afterTabIndexChange);
_updateOptions(options, "afterTriggerChange", _afterTriggerChange);
_updateOptions(options, "afterVisibleChange", _afterVisibleChange);
_updateOptions(options, "afterContentUpdate", _afterContentUpdate);
_updateOptions(options, "afterRender", _afterRender);
_updateOptions(options, "afterWidthChange", _afterWidthChange);
_updateOptions(options, "afterXChange", _afterXChange);
_updateOptions(options, "afterXyChange", _afterXyChange);
_updateOptions(options, "afterYChange", _afterYChange);
_updateOptions(options, "afterZIndexChange", _afterZIndexChange);
_updateOptions(options, "onAlignChange", _onAlignChange);
_updateOptions(options, "onBodyContentChange", _onBodyContentChange);
_updateOptions(options, "onBoundingBoxChange", _onBoundingBoxChange);
_updateOptions(options, "onCancellableHideChange", _onCancellableHideChange);
_updateOptions(options, "onCenteredChange", _onCenteredChange);
_updateOptions(options, "onConstrainChange", _onConstrainChange);
_updateOptions(options, "onContentBoxChange", _onContentBoxChange);
_updateOptions(options, "onCssClassChange", _onCssClassChange);
_updateOptions(options, "onCurrentNodeChange", _onCurrentNodeChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onDisabledChange", _onDisabledChange);
_updateOptions(options, "onFillHeightChange", _onFillHeightChange);
_updateOptions(options, "onFocusedChange", _onFocusedChange);
_updateOptions(options, "onFooterContentChange", _onFooterContentChange);
_updateOptions(options, "onHeaderContentChange", _onHeaderContentChange);
_updateOptions(options, "onHeightChange", _onHeightChange);
_updateOptions(options, "onHideClassChange", _onHideClassChange);
_updateOptions(options, "onHideDelayChange", _onHideDelayChange);
_updateOptions(options, "onHideOnChange", _onHideOnChange);
_updateOptions(options, "onHideOnDocumentClickChange", _onHideOnDocumentClickChange);
_updateOptions(options, "onIdChange", _onIdChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onPreventOverlapChange", _onPreventOverlapChange);
_updateOptions(options, "onRenderChange", _onRenderChange);
_updateOptions(options, "onRenderedChange", _onRenderedChange);
_updateOptions(options, "onShimChange", _onShimChange);
_updateOptions(options, "onShowDelayChange", _onShowDelayChange);
_updateOptions(options, "onShowOnChange", _onShowOnChange);
_updateOptions(options, "onSrcNodeChange", _onSrcNodeChange);
_updateOptions(options, "onStringsChange", _onStringsChange);
_updateOptions(options, "onTabIndexChange", _onTabIndexChange);
_updateOptions(options, "onTriggerChange", _onTriggerChange);
_updateOptions(options, "onVisibleChange", _onVisibleChange);
_updateOptions(options, "onContentUpdate", _onContentUpdate);
_updateOptions(options, "onRender", _onRender);
_updateOptions(options, "onWidthChange", _onWidthChange);
_updateOptions(options, "onXChange", _onXChange);
_updateOptions(options, "onXyChange", _onXyChange);
_updateOptions(options, "onYChange", _onYChange);
_updateOptions(options, "onZIndexChange", _onZIndexChange);
%>