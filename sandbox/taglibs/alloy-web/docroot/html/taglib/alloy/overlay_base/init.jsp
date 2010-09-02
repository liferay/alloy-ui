<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-base:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:overlay-base:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:overlay-base:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:overlay-base:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:overlay-base:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.util.HashMap _align = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:align")));
java.lang.Object _overlaybaseBodyContent = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:overlaybaseBodyContent"));
java.lang.Object _centered = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:centered"), false);
java.lang.Object _constrain = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:constrain"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-base:cssClass"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:overlay-base:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:overlay-base:disabled"), false);
java.lang.Object _fillHeight = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:fillHeight"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:overlay-base:focused"), false);
java.lang.Object _footerContent = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:footerContent"));
java.lang.Object _headerContent = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:headerContent"));
java.lang.Object _height = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-base:hideClass"), "aui-helper-hidden");
java.lang.String _overlaybaseId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:overlay-base:overlaybaseId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:overlay-base:initialized"), false);
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:overlay-base:preventOverlap"), false);
java.lang.Object _render = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:overlay-base:rendered"), false);
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:overlay-base:shim"), false);
java.util.HashMap _strings = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:strings")));
java.lang.Number _tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-base:tabIndex")), 0);
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:overlay-base:visible"), true);
java.lang.Object _width = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:width"));
java.lang.Number _x = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-base:x")), 0);
java.util.ArrayList _xy = JSONFactoryUtil.getArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:xy"), "[0,0]"));
java.lang.Number _y = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-base:y")), 0);
java.lang.Number _zIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:overlay-base:zIndex")), 0);
java.lang.Object _afterAlignChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterAlignChange"));
java.lang.Object _afterBodyContentChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterBodyContentChange"));
java.lang.Object _afterBoundingBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterBoundingBoxChange"));
java.lang.Object _afterCenteredChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterCenteredChange"));
java.lang.Object _afterConstrainChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterConstrainChange"));
java.lang.Object _afterContentBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterContentBoxChange"));
java.lang.Object _afterCssClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterCssClassChange"));
java.lang.Object _afterDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterDestroy"));
java.lang.Object _afterDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterDestroyedChange"));
java.lang.Object _afterDisabledChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterDisabledChange"));
java.lang.Object _afterFillHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterFillHeightChange"));
java.lang.Object _afterFocusedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterFocusedChange"));
java.lang.Object _afterFooterContentChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterFooterContentChange"));
java.lang.Object _afterHeaderContentChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterHeaderContentChange"));
java.lang.Object _afterHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterHeightChange"));
java.lang.Object _afterHideClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterHideClassChange"));
java.lang.Object _afterIdChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterIdChange"));
java.lang.Object _afterInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterInit"));
java.lang.Object _afterInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterInitializedChange"));
java.lang.Object _afterPreventOverlapChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterPreventOverlapChange"));
java.lang.Object _afterRenderChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterRenderChange"));
java.lang.Object _afterRenderedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterRenderedChange"));
java.lang.Object _afterShimChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterShimChange"));
java.lang.Object _afterSrcNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterSrcNodeChange"));
java.lang.Object _afterStringsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterStringsChange"));
java.lang.Object _afterTabIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterTabIndexChange"));
java.lang.Object _afterVisibleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterVisibleChange"));
java.lang.Object _afterContentUpdate = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterContentUpdate"));
java.lang.Object _afterRender = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterRender"));
java.lang.Object _afterWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterWidthChange"));
java.lang.Object _afterXChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterXChange"));
java.lang.Object _afterXyChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterXyChange"));
java.lang.Object _afterYChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterYChange"));
java.lang.Object _afterZIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:afterZIndexChange"));
java.lang.Object _onAlignChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onAlignChange"));
java.lang.Object _onBodyContentChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onBodyContentChange"));
java.lang.Object _onBoundingBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onBoundingBoxChange"));
java.lang.Object _onCenteredChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onCenteredChange"));
java.lang.Object _onConstrainChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onConstrainChange"));
java.lang.Object _onContentBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onContentBoxChange"));
java.lang.Object _onCssClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onCssClassChange"));
java.lang.Object _onDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onDestroy"));
java.lang.Object _onDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onDestroyedChange"));
java.lang.Object _onDisabledChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onDisabledChange"));
java.lang.Object _onFillHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onFillHeightChange"));
java.lang.Object _onFocusedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onFocusedChange"));
java.lang.Object _onFooterContentChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onFooterContentChange"));
java.lang.Object _onHeaderContentChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onHeaderContentChange"));
java.lang.Object _onHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onHeightChange"));
java.lang.Object _onHideClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onHideClassChange"));
java.lang.Object _onIdChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onIdChange"));
java.lang.Object _onInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onInit"));
java.lang.Object _onInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onInitializedChange"));
java.lang.Object _onPreventOverlapChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onPreventOverlapChange"));
java.lang.Object _onRenderChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onRenderChange"));
java.lang.Object _onRenderedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onRenderedChange"));
java.lang.Object _onShimChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onShimChange"));
java.lang.Object _onSrcNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onSrcNodeChange"));
java.lang.Object _onStringsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onStringsChange"));
java.lang.Object _onTabIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onTabIndexChange"));
java.lang.Object _onVisibleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onVisibleChange"));
java.lang.Object _onContentUpdate = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onContentUpdate"));
java.lang.Object _onRender = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onRender"));
java.lang.Object _onWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onWidthChange"));
java.lang.Object _onXChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onXChange"));
java.lang.Object _onXyChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onXyChange"));
java.lang.Object _onYChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onYChange"));
java.lang.Object _onZIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:overlay-base:onZIndexChange"));

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
_updateOptions(options, "overlaybaseBodyContent", _overlaybaseBodyContent);
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
_updateOptions(options, "overlaybaseId", _overlaybaseId);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "preventOverlap", _preventOverlap);
_updateOptions(options, "render", _render);
_updateOptions(options, "rendered", _rendered);
_updateOptions(options, "shim", _shim);
_updateOptions(options, "srcNode", _srcNode);
_updateOptions(options, "strings", _strings);
_updateOptions(options, "tabIndex", _tabIndex);
_updateOptions(options, "visible", _visible);
_updateOptions(options, "width", _width);
_updateOptions(options, "x", _x);
_updateOptions(options, "xy", _xy);
_updateOptions(options, "y", _y);
_updateOptions(options, "zIndex", _zIndex);
_updateOptions(options, "afterAlignChange", _afterAlignChange);
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
_updateOptions(options, "afterPreventOverlapChange", _afterPreventOverlapChange);
_updateOptions(options, "afterRenderChange", _afterRenderChange);
_updateOptions(options, "afterRenderedChange", _afterRenderedChange);
_updateOptions(options, "afterShimChange", _afterShimChange);
_updateOptions(options, "afterSrcNodeChange", _afterSrcNodeChange);
_updateOptions(options, "afterStringsChange", _afterStringsChange);
_updateOptions(options, "afterTabIndexChange", _afterTabIndexChange);
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
_updateOptions(options, "onPreventOverlapChange", _onPreventOverlapChange);
_updateOptions(options, "onRenderChange", _onRenderChange);
_updateOptions(options, "onRenderedChange", _onRenderedChange);
_updateOptions(options, "onShimChange", _onShimChange);
_updateOptions(options, "onSrcNodeChange", _onSrcNodeChange);
_updateOptions(options, "onStringsChange", _onStringsChange);
_updateOptions(options, "onTabIndexChange", _onTabIndexChange);
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