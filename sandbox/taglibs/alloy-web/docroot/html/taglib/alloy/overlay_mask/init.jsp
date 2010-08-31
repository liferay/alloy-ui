<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-mask:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-mask:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:date-picker-select:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:date-picker-select:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:date-picker-select:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:overlay-mask:align");
java.lang.Object _alignPoints = (java.lang.Object)request.getAttribute("alloy:overlay-mask:alignPoints");
java.lang.Object _background = (java.lang.Object)request.getAttribute("alloy:overlay-mask:background");
java.lang.Object _overlaymaskBodyContent = (java.lang.Object)request.getAttribute("alloy:overlay-mask:overlaymaskBodyContent");
java.lang.Object _centered = (java.lang.Object)request.getAttribute("alloy:overlay-mask:centered");
java.lang.Object _constrain = (java.lang.Object)request.getAttribute("alloy:overlay-mask:constrain");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:overlay-mask:cssClass");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:disabled"), false);
java.lang.Object _fillHeight = (java.lang.Object)request.getAttribute("alloy:overlay-mask:fillHeight");
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:focused"), false);
java.lang.Object _footerContent = (java.lang.Object)request.getAttribute("alloy:overlay-mask:footerContent");
java.lang.Object _headerContent = (java.lang.Object)request.getAttribute("alloy:overlay-mask:headerContent");
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:overlay-mask:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:overlay-mask:hideClass");
java.lang.Object _overlaymaskId = (java.lang.Object)request.getAttribute("alloy:overlay-mask:overlaymaskId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:initialized"), false);
java.lang.Number _opacity = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-mask:opacity"), 0.5);
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:preventOverlap"), false);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:rendered"), false);
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:shim"), false);
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:overlay-mask:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-mask:tabIndex"), 0);
java.lang.Object _target = (java.lang.Object)request.getAttribute("alloy:overlay-mask:target");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:overlay-mask:visible"), false);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:overlay-mask:width");
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-mask:x"), 0);
java.lang.Object _xy = (java.lang.Object)request.getAttribute("alloy:overlay-mask:xy");
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-mask:y"), 0);
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:overlay-mask:zIndex"), 1000);
java.lang.Object _afterAlignChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterAlignChange");
java.lang.Object _afterAlignPointsChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterAlignPointsChange");
java.lang.Object _afterBackgroundChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterBackgroundChange");
java.lang.Object _afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterBodyContentChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterBoundingBoxChange");
java.lang.Object _afterCenteredChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterCenteredChange");
java.lang.Object _afterConstrainChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterConstrainChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterCssClassChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterDisabledChange");
java.lang.Object _afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterFillHeightChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterFocusedChange");
java.lang.Object _afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterFooterContentChange");
java.lang.Object _afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterHeaderContentChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterHideClassChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterInitializedChange");
java.lang.Object _afterOpacityChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterOpacityChange");
java.lang.Object _afterPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterPreventOverlapChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterRenderedChange");
java.lang.Object _afterShimChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterShimChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterTabIndexChange");
java.lang.Object _afterTargetChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterTargetChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterWidthChange");
java.lang.Object _afterXChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterXChange");
java.lang.Object _afterXyChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterXyChange");
java.lang.Object _afterYChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterYChange");
java.lang.Object _afterZIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:afterZIndexChange");
java.lang.Object _onAlignChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onAlignChange");
java.lang.Object _onAlignPointsChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onAlignPointsChange");
java.lang.Object _onBackgroundChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onBackgroundChange");
java.lang.Object _onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onBodyContentChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onBoundingBoxChange");
java.lang.Object _onCenteredChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onCenteredChange");
java.lang.Object _onConstrainChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onConstrainChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onCssClassChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onDisabledChange");
java.lang.Object _onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onFillHeightChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onFocusedChange");
java.lang.Object _onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onFooterContentChange");
java.lang.Object _onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onHeaderContentChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onHideClassChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onInitializedChange");
java.lang.Object _onOpacityChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onOpacityChange");
java.lang.Object _onPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onPreventOverlapChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onRenderedChange");
java.lang.Object _onShimChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onShimChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onTabIndexChange");
java.lang.Object _onTargetChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onTargetChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onWidthChange");
java.lang.Object _onXChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onXChange");
java.lang.Object _onXyChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onXyChange");
java.lang.Object _onYChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onYChange");
java.lang.Object _onZIndexChange = (java.lang.Object)request.getAttribute("alloy:overlay-mask:onZIndexChange");

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
_updateOptions(options, "alignPoints", _alignPoints);
_updateOptions(options, "background", _background);
_updateOptions(options, "overlaymaskBodyContent", _overlaymaskBodyContent);
_updateOptions(options, "boundingBox", _boundingBox);
_updateOptions(options, "centered", _centered);
_updateOptions(options, "constrain", _constrain);
_updateOptions(options, "contentBox", _contentBox);
_updateOptions(options, "cssClass", _cssClass);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "disabled", _disabled);
_updateOptions(options, "fillHeight", _fillHeight);
_updateOptions(options, "focused", _focused);
_updateOptions(options, "footerContent", _footerContent);
_updateOptions(options, "headerContent", _headerContent);
_updateOptions(options, "height", _height);
_updateOptions(options, "hideClass", _hideClass);
_updateOptions(options, "overlaymaskId", _overlaymaskId);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "opacity", _opacity);
_updateOptions(options, "preventOverlap", _preventOverlap);
_updateOptions(options, "render", _render);
_updateOptions(options, "rendered", _rendered);
_updateOptions(options, "shim", _shim);
_updateOptions(options, "srcNode", _srcNode);
_updateOptions(options, "strings", _strings);
_updateOptions(options, "tabIndex", _tabIndex);
_updateOptions(options, "target", _target);
_updateOptions(options, "visible", _visible);
_updateOptions(options, "width", _width);
_updateOptions(options, "x", _x);
_updateOptions(options, "xy", _xy);
_updateOptions(options, "y", _y);
_updateOptions(options, "zIndex", _zIndex);
_updateOptions(options, "afterAlignChange", _afterAlignChange);
_updateOptions(options, "afterAlignPointsChange", _afterAlignPointsChange);
_updateOptions(options, "afterBackgroundChange", _afterBackgroundChange);
_updateOptions(options, "afterBodyContentChange", _afterBodyContentChange);
_updateOptions(options, "afterBoundingBoxChange", _afterBoundingBoxChange);
_updateOptions(options, "afterCenteredChange", _afterCenteredChange);
_updateOptions(options, "afterConstrainChange", _afterConstrainChange);
_updateOptions(options, "afterContentBoxChange", _afterContentBoxChange);
_updateOptions(options, "afterCssClassChange", _afterCssClassChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterDisabledChange", _afterDisabledChange);
_updateOptions(options, "afterFillHeightChange", _afterFillHeightChange);
_updateOptions(options, "afterFocusedChange", _afterFocusedChange);
_updateOptions(options, "afterFooterContentChange", _afterFooterContentChange);
_updateOptions(options, "afterHeaderContentChange", _afterHeaderContentChange);
_updateOptions(options, "afterHeightChange", _afterHeightChange);
_updateOptions(options, "afterHideClassChange", _afterHideClassChange);
_updateOptions(options, "afterIdChange", _afterIdChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterOpacityChange", _afterOpacityChange);
_updateOptions(options, "afterPreventOverlapChange", _afterPreventOverlapChange);
_updateOptions(options, "afterRenderChange", _afterRenderChange);
_updateOptions(options, "afterRenderedChange", _afterRenderedChange);
_updateOptions(options, "afterShimChange", _afterShimChange);
_updateOptions(options, "afterSrcNodeChange", _afterSrcNodeChange);
_updateOptions(options, "afterStringsChange", _afterStringsChange);
_updateOptions(options, "afterTabIndexChange", _afterTabIndexChange);
_updateOptions(options, "afterTargetChange", _afterTargetChange);
_updateOptions(options, "afterVisibleChange", _afterVisibleChange);
_updateOptions(options, "afterContentUpdate", _afterContentUpdate);
_updateOptions(options, "afterRender", _afterRender);
_updateOptions(options, "afterWidthChange", _afterWidthChange);
_updateOptions(options, "afterXChange", _afterXChange);
_updateOptions(options, "afterXyChange", _afterXyChange);
_updateOptions(options, "afterYChange", _afterYChange);
_updateOptions(options, "afterZIndexChange", _afterZIndexChange);
_updateOptions(options, "onAlignChange", _onAlignChange);
_updateOptions(options, "onAlignPointsChange", _onAlignPointsChange);
_updateOptions(options, "onBackgroundChange", _onBackgroundChange);
_updateOptions(options, "onBodyContentChange", _onBodyContentChange);
_updateOptions(options, "onBoundingBoxChange", _onBoundingBoxChange);
_updateOptions(options, "onCenteredChange", _onCenteredChange);
_updateOptions(options, "onConstrainChange", _onConstrainChange);
_updateOptions(options, "onContentBoxChange", _onContentBoxChange);
_updateOptions(options, "onCssClassChange", _onCssClassChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onDisabledChange", _onDisabledChange);
_updateOptions(options, "onFillHeightChange", _onFillHeightChange);
_updateOptions(options, "onFocusedChange", _onFocusedChange);
_updateOptions(options, "onFooterContentChange", _onFooterContentChange);
_updateOptions(options, "onHeaderContentChange", _onHeaderContentChange);
_updateOptions(options, "onHeightChange", _onHeightChange);
_updateOptions(options, "onHideClassChange", _onHideClassChange);
_updateOptions(options, "onIdChange", _onIdChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onOpacityChange", _onOpacityChange);
_updateOptions(options, "onPreventOverlapChange", _onPreventOverlapChange);
_updateOptions(options, "onRenderChange", _onRenderChange);
_updateOptions(options, "onRenderedChange", _onRenderedChange);
_updateOptions(options, "onShimChange", _onShimChange);
_updateOptions(options, "onSrcNodeChange", _onSrcNodeChange);
_updateOptions(options, "onStringsChange", _onStringsChange);
_updateOptions(options, "onTabIndexChange", _onTabIndexChange);
_updateOptions(options, "onTargetChange", _onTargetChange);
_updateOptions(options, "onVisibleChange", _onVisibleChange);
_updateOptions(options, "onContentUpdate", _onContentUpdate);
_updateOptions(options, "onRender", _onRender);
_updateOptions(options, "onWidthChange", _onWidthChange);
_updateOptions(options, "onXChange", _onXChange);
_updateOptions(options, "onXyChange", _onXyChange);
_updateOptions(options, "onYChange", _onYChange);
_updateOptions(options, "onZIndexChange", _onZIndexChange);
%>