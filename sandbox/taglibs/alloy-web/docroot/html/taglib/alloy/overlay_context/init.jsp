<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-context:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-context:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:overlay-context:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:overlay-context:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:overlay-context:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:overlay-context:align");
java.lang.Object _overlaycontextBodyContent = (java.lang.Object)request.getAttribute("alloy:overlay-context:overlaycontextBodyContent");
java.lang.Boolean _cancellableHide = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:cancellableHide"), true);
java.lang.Object _centered = (java.lang.Object)request.getAttribute("alloy:overlay-context:centered");
java.lang.Object _constrain = (java.lang.Object)request.getAttribute("alloy:overlay-context:constrain");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:overlay-context:cssClass");
java.lang.Object _currentNode = (java.lang.Object)request.getAttribute("alloy:overlay-context:currentNode");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:disabled"), false);
java.lang.Object _fillHeight = (java.lang.Object)request.getAttribute("alloy:overlay-context:fillHeight");
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:focused"), false);
java.lang.Object _footerContent = (java.lang.Object)request.getAttribute("alloy:overlay-context:footerContent");
java.lang.Object _headerContent = (java.lang.Object)request.getAttribute("alloy:overlay-context:headerContent");
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:overlay-context:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:overlay-context:hideClass");
java.lang.Number _hideDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:hideDelay"), 0);
java.lang.Object _hideOn = (java.lang.Object)request.getAttribute("alloy:overlay-context:hideOn");
java.lang.Boolean _hideOnDocumentClick = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:hideOnDocumentClick"), true);
java.lang.Object _overlaycontextId = (java.lang.Object)request.getAttribute("alloy:overlay-context:overlaycontextId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:initialized"), false);
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:preventOverlap"), false);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:rendered"), false);
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:shim"), false);
java.lang.Number _showDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:showDelay"), 0);
java.lang.Object _showOn = (java.lang.Object)request.getAttribute("alloy:overlay-context:showOn");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:overlay-context:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:tabIndex"), 0);
java.lang.Object _trigger = (java.lang.Object)request.getAttribute("alloy:overlay-context:trigger");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-context:visible"), false);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:overlay-context:width");
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:x"), 0);
java.lang.Object _xy = (java.lang.Object)request.getAttribute("alloy:overlay-context:xy");
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:y"), 0);
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-context:zIndex"), 0);
java.lang.Object _afterAlignChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterAlignChange");
java.lang.Object _afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterBodyContentChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterBoundingBoxChange");
java.lang.Object _afterCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterCancellableHideChange");
java.lang.Object _afterCenteredChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterCenteredChange");
java.lang.Object _afterConstrainChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterConstrainChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterCssClassChange");
java.lang.Object _afterCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterCurrentNodeChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterDisabledChange");
java.lang.Object _afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterFillHeightChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterFocusedChange");
java.lang.Object _afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterFooterContentChange");
java.lang.Object _afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHeaderContentChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHideClassChange");
java.lang.Object _afterHideDelayChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHideDelayChange");
java.lang.Object _afterHideOnChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHideOnChange");
java.lang.Object _afterHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterHideOnDocumentClickChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterInitializedChange");
java.lang.Object _afterPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterPreventOverlapChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterRenderedChange");
java.lang.Object _afterShimChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterShimChange");
java.lang.Object _afterShowDelayChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterShowDelayChange");
java.lang.Object _afterShowOnChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterShowOnChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterTabIndexChange");
java.lang.Object _afterTriggerChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterTriggerChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterWidthChange");
java.lang.Object _afterXChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterXChange");
java.lang.Object _afterXyChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterXyChange");
java.lang.Object _afterYChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterYChange");
java.lang.Object _afterZIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:afterZIndexChange");
java.lang.Object _onAlignChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onAlignChange");
java.lang.Object _onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onBodyContentChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onBoundingBoxChange");
java.lang.Object _onCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onCancellableHideChange");
java.lang.Object _onCenteredChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onCenteredChange");
java.lang.Object _onConstrainChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onConstrainChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onCssClassChange");
java.lang.Object _onCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onCurrentNodeChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:overlay-context:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onDisabledChange");
java.lang.Object _onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onFillHeightChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onFocusedChange");
java.lang.Object _onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onFooterContentChange");
java.lang.Object _onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHeaderContentChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHideClassChange");
java.lang.Object _onHideDelayChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHideDelayChange");
java.lang.Object _onHideOnChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHideOnChange");
java.lang.Object _onHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onHideOnDocumentClickChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:overlay-context:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onInitializedChange");
java.lang.Object _onPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onPreventOverlapChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onRenderedChange");
java.lang.Object _onShimChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onShimChange");
java.lang.Object _onShowDelayChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onShowDelayChange");
java.lang.Object _onShowOnChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onShowOnChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onTabIndexChange");
java.lang.Object _onTriggerChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onTriggerChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:overlay-context:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:overlay-context:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onWidthChange");
java.lang.Object _onXChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onXChange");
java.lang.Object _onXyChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onXyChange");
java.lang.Object _onYChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onYChange");
java.lang.Object _onZIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-context:onZIndexChange");

String uniqueId = StringPool.BLANK;

boolean useJavaScript = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useJavaScript"), true);
boolean useMarkup = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useMarkup"), true);

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

_updateOptions(options, "align", _align);
_updateOptions(options, "overlaycontextBodyContent", _overlaycontextBodyContent);
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
_updateOptions(options, "overlaycontextId", _overlaycontextId);
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

<%@ include file="init-ext.jsp" %>