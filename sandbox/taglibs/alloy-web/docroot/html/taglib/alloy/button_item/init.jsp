<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:button-item:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:button-item:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:button-item:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:button-item:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:button-item:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.lang.Boolean _activeState = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:activeState"), false);
java.lang.Object _classNames = (java.lang.Object)request.getAttribute("alloy:button-item:classNames");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:button-item:cssClass");
java.lang.Boolean _defaultState = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:defaultState"), true);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:disabled"), false);
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:focused"), false);
java.lang.Object _handler = (java.lang.Object)request.getAttribute("alloy:button-item:handler");
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:button-item:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:button-item:hideClass");
java.lang.Boolean _hoverState = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:hoverState"), true);
java.lang.Object _icon = (java.lang.Object)request.getAttribute("alloy:button-item:icon");
java.lang.Object _iconNode = (java.lang.Object)request.getAttribute("alloy:button-item:iconNode");
java.lang.Object _buttonitemId = (java.lang.Object)request.getAttribute("alloy:button-item:buttonitemId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:initialized"), false);
java.lang.Object _label = (java.lang.Object)request.getAttribute("alloy:button-item:label");
java.lang.Object _labelNode = (java.lang.Object)request.getAttribute("alloy:button-item:labelNode");
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:rendered"), false);
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:button-item:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:button-item:tabIndex"), 0);
java.lang.Object _title = (java.lang.Object)request.getAttribute("alloy:button-item:title");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:button-item:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:button-item:width");
java.lang.Object _afterActiveStateChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterActiveStateChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterBoundingBoxChange");
java.lang.Object _afterClassNamesChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterClassNamesChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterCssClassChange");
java.lang.Object _afterDefaultStateChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterDefaultStateChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:button-item:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterDisabledChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterFocusedChange");
java.lang.Object _afterHandlerChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterHandlerChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterHideClassChange");
java.lang.Object _afterHoverStateChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterHoverStateChange");
java.lang.Object _afterIconChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterIconChange");
java.lang.Object _afterIconNodeChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterIconNodeChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:button-item:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterInitializedChange");
java.lang.Object _afterLabelChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterLabelChange");
java.lang.Object _afterLabelNodeChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterLabelNodeChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterRenderedChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterTabIndexChange");
java.lang.Object _afterTitleChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterTitleChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:button-item:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:button-item:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:button-item:afterWidthChange");
java.lang.Object _onActiveStateChange = (java.lang.Object)request.getAttribute("alloy:button-item:onActiveStateChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:button-item:onBoundingBoxChange");
java.lang.Object _onClassNamesChange = (java.lang.Object)request.getAttribute("alloy:button-item:onClassNamesChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:button-item:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:button-item:onCssClassChange");
java.lang.Object _onDefaultStateChange = (java.lang.Object)request.getAttribute("alloy:button-item:onDefaultStateChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:button-item:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:button-item:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:button-item:onDisabledChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:button-item:onFocusedChange");
java.lang.Object _onHandlerChange = (java.lang.Object)request.getAttribute("alloy:button-item:onHandlerChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:button-item:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:button-item:onHideClassChange");
java.lang.Object _onHoverStateChange = (java.lang.Object)request.getAttribute("alloy:button-item:onHoverStateChange");
java.lang.Object _onIconChange = (java.lang.Object)request.getAttribute("alloy:button-item:onIconChange");
java.lang.Object _onIconNodeChange = (java.lang.Object)request.getAttribute("alloy:button-item:onIconNodeChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:button-item:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:button-item:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:button-item:onInitializedChange");
java.lang.Object _onLabelChange = (java.lang.Object)request.getAttribute("alloy:button-item:onLabelChange");
java.lang.Object _onLabelNodeChange = (java.lang.Object)request.getAttribute("alloy:button-item:onLabelNodeChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:button-item:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:button-item:onRenderedChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:button-item:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:button-item:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:button-item:onTabIndexChange");
java.lang.Object _onTitleChange = (java.lang.Object)request.getAttribute("alloy:button-item:onTitleChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:button-item:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:button-item:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:button-item:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:button-item:onWidthChange");

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

_updateOptions(options, "activeState", _activeState);
_updateOptions(options, "boundingBox", _boundingBox);
_updateOptions(options, "classNames", _classNames);
_updateOptions(options, "contentBox", _contentBox);
_updateOptions(options, "cssClass", _cssClass);
_updateOptions(options, "defaultState", _defaultState);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "disabled", _disabled);
_updateOptions(options, "focused", _focused);
_updateOptions(options, "handler", _handler);
_updateOptions(options, "height", _height);
_updateOptions(options, "hideClass", _hideClass);
_updateOptions(options, "hoverState", _hoverState);
_updateOptions(options, "icon", _icon);
_updateOptions(options, "iconNode", _iconNode);
_updateOptions(options, "buttonitemId", _buttonitemId);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "label", _label);
_updateOptions(options, "labelNode", _labelNode);
_updateOptions(options, "render", _render);
_updateOptions(options, "rendered", _rendered);
_updateOptions(options, "srcNode", _srcNode);
_updateOptions(options, "strings", _strings);
_updateOptions(options, "tabIndex", _tabIndex);
_updateOptions(options, "title", _title);
_updateOptions(options, "visible", _visible);
_updateOptions(options, "width", _width);
_updateOptions(options, "afterActiveStateChange", _afterActiveStateChange);
_updateOptions(options, "afterBoundingBoxChange", _afterBoundingBoxChange);
_updateOptions(options, "afterClassNamesChange", _afterClassNamesChange);
_updateOptions(options, "afterContentBoxChange", _afterContentBoxChange);
_updateOptions(options, "afterCssClassChange", _afterCssClassChange);
_updateOptions(options, "afterDefaultStateChange", _afterDefaultStateChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterDisabledChange", _afterDisabledChange);
_updateOptions(options, "afterFocusedChange", _afterFocusedChange);
_updateOptions(options, "afterHandlerChange", _afterHandlerChange);
_updateOptions(options, "afterHeightChange", _afterHeightChange);
_updateOptions(options, "afterHideClassChange", _afterHideClassChange);
_updateOptions(options, "afterHoverStateChange", _afterHoverStateChange);
_updateOptions(options, "afterIconChange", _afterIconChange);
_updateOptions(options, "afterIconNodeChange", _afterIconNodeChange);
_updateOptions(options, "afterIdChange", _afterIdChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterLabelChange", _afterLabelChange);
_updateOptions(options, "afterLabelNodeChange", _afterLabelNodeChange);
_updateOptions(options, "afterRenderChange", _afterRenderChange);
_updateOptions(options, "afterRenderedChange", _afterRenderedChange);
_updateOptions(options, "afterSrcNodeChange", _afterSrcNodeChange);
_updateOptions(options, "afterStringsChange", _afterStringsChange);
_updateOptions(options, "afterTabIndexChange", _afterTabIndexChange);
_updateOptions(options, "afterTitleChange", _afterTitleChange);
_updateOptions(options, "afterVisibleChange", _afterVisibleChange);
_updateOptions(options, "afterContentUpdate", _afterContentUpdate);
_updateOptions(options, "afterRender", _afterRender);
_updateOptions(options, "afterWidthChange", _afterWidthChange);
_updateOptions(options, "onActiveStateChange", _onActiveStateChange);
_updateOptions(options, "onBoundingBoxChange", _onBoundingBoxChange);
_updateOptions(options, "onClassNamesChange", _onClassNamesChange);
_updateOptions(options, "onContentBoxChange", _onContentBoxChange);
_updateOptions(options, "onCssClassChange", _onCssClassChange);
_updateOptions(options, "onDefaultStateChange", _onDefaultStateChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onDisabledChange", _onDisabledChange);
_updateOptions(options, "onFocusedChange", _onFocusedChange);
_updateOptions(options, "onHandlerChange", _onHandlerChange);
_updateOptions(options, "onHeightChange", _onHeightChange);
_updateOptions(options, "onHideClassChange", _onHideClassChange);
_updateOptions(options, "onHoverStateChange", _onHoverStateChange);
_updateOptions(options, "onIconChange", _onIconChange);
_updateOptions(options, "onIconNodeChange", _onIconNodeChange);
_updateOptions(options, "onIdChange", _onIdChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onLabelChange", _onLabelChange);
_updateOptions(options, "onLabelNodeChange", _onLabelNodeChange);
_updateOptions(options, "onRenderChange", _onRenderChange);
_updateOptions(options, "onRenderedChange", _onRenderedChange);
_updateOptions(options, "onSrcNodeChange", _onSrcNodeChange);
_updateOptions(options, "onStringsChange", _onStringsChange);
_updateOptions(options, "onTabIndexChange", _onTabIndexChange);
_updateOptions(options, "onTitleChange", _onTitleChange);
_updateOptions(options, "onVisibleChange", _onVisibleChange);
_updateOptions(options, "onContentUpdate", _onContentUpdate);
_updateOptions(options, "onRender", _onRender);
_updateOptions(options, "onWidthChange", _onWidthChange);
%>

<%@ include file="init-ext.jsp" %>