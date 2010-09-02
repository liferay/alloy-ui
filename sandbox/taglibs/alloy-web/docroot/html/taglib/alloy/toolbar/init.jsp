<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:toolbar:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:toolbar:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:toolbar:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:toolbar:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:toolbar:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.lang.Object _activeDescendant = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:activeDescendant"));
java.lang.Boolean _activeState = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:toolbar:activeState"), false);
java.util.ArrayList _children = JSONFactoryUtil.getArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:children")));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:toolbar:cssClass"));
java.lang.Object _defaultChildType = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:defaultChildType"), ButtonItem);
java.lang.Boolean _defaultState = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:toolbar:defaultState"), false);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:toolbar:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:toolbar:disabled"), false);
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:toolbar:focused"), false);
java.lang.Object _height = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:toolbar:hideClass"), "aui-helper-hidden");
java.lang.Boolean _hoverState = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:toolbar:hoverState"), false);
java.lang.String _toolbarId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:toolbar:toolbarId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:toolbar:initialized"), false);
java.lang.Boolean _multiple = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:toolbar:multiple"), false);
java.lang.String _orientation = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:toolbar:orientation"), "horizontal");
java.lang.Object _render = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:toolbar:rendered"), false);
java.lang.Object _selection = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:selection"));
java.util.HashMap _strings = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:strings")));
java.lang.Number _tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:toolbar:tabIndex")), 0);
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:toolbar:visible"), true);
java.lang.Object _width = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:width"));
java.lang.Object _afterActiveDescendantChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterActiveDescendantChange"));
java.lang.Object _afterActiveStateChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterActiveStateChange"));
java.lang.Object _afterAddChild = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterAddChild"));
java.lang.Object _afterBoundingBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterBoundingBoxChange"));
java.lang.Object _afterChildrenChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterChildrenChange"));
java.lang.Object _afterContentBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterContentBoxChange"));
java.lang.Object _afterCssClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterCssClassChange"));
java.lang.Object _afterDefaultChildTypeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterDefaultChildTypeChange"));
java.lang.Object _afterDefaultStateChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterDefaultStateChange"));
java.lang.Object _afterDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterDestroy"));
java.lang.Object _afterDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterDestroyedChange"));
java.lang.Object _afterDisabledChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterDisabledChange"));
java.lang.Object _afterFocusedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterFocusedChange"));
java.lang.Object _afterHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterHeightChange"));
java.lang.Object _afterHideClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterHideClassChange"));
java.lang.Object _afterHoverStateChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterHoverStateChange"));
java.lang.Object _afterIdChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterIdChange"));
java.lang.Object _afterInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterInit"));
java.lang.Object _afterInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterInitializedChange"));
java.lang.Object _afterMultipleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterMultipleChange"));
java.lang.Object _afterOrientationChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterOrientationChange"));
java.lang.Object _afterRemoveChild = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterRemoveChild"));
java.lang.Object _afterRenderChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterRenderChange"));
java.lang.Object _afterRenderedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterRenderedChange"));
java.lang.Object _afterSelectionChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterSelectionChange"));
java.lang.Object _afterSrcNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterSrcNodeChange"));
java.lang.Object _afterStringsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterStringsChange"));
java.lang.Object _afterTabIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterTabIndexChange"));
java.lang.Object _afterVisibleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterVisibleChange"));
java.lang.Object _afterContentUpdate = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterContentUpdate"));
java.lang.Object _afterRender = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterRender"));
java.lang.Object _afterWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:afterWidthChange"));
java.lang.Object _onActiveDescendantChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onActiveDescendantChange"));
java.lang.Object _onActiveStateChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onActiveStateChange"));
java.lang.Object _onAddChild = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onAddChild"));
java.lang.Object _onBoundingBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onBoundingBoxChange"));
java.lang.Object _onChildrenChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onChildrenChange"));
java.lang.Object _onContentBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onContentBoxChange"));
java.lang.Object _onCssClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onCssClassChange"));
java.lang.Object _onDefaultChildTypeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onDefaultChildTypeChange"));
java.lang.Object _onDefaultStateChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onDefaultStateChange"));
java.lang.Object _onDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onDestroy"));
java.lang.Object _onDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onDestroyedChange"));
java.lang.Object _onDisabledChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onDisabledChange"));
java.lang.Object _onFocusedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onFocusedChange"));
java.lang.Object _onHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onHeightChange"));
java.lang.Object _onHideClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onHideClassChange"));
java.lang.Object _onHoverStateChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onHoverStateChange"));
java.lang.Object _onIdChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onIdChange"));
java.lang.Object _onInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onInit"));
java.lang.Object _onInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onInitializedChange"));
java.lang.Object _onMultipleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onMultipleChange"));
java.lang.Object _onOrientationChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onOrientationChange"));
java.lang.Object _onRemoveChild = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onRemoveChild"));
java.lang.Object _onRenderChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onRenderChange"));
java.lang.Object _onRenderedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onRenderedChange"));
java.lang.Object _onSelectionChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onSelectionChange"));
java.lang.Object _onSrcNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onSrcNodeChange"));
java.lang.Object _onStringsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onStringsChange"));
java.lang.Object _onTabIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onTabIndexChange"));
java.lang.Object _onVisibleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onVisibleChange"));
java.lang.Object _onContentUpdate = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onContentUpdate"));
java.lang.Object _onRender = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onRender"));
java.lang.Object _onWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:toolbar:onWidthChange"));

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

_updateOptions(options, "activeDescendant", _activeDescendant);
_updateOptions(options, "activeState", _activeState);
_updateOptions(options, "boundingBox", _boundingBox);
_updateOptions(options, "children", _children);
_updateOptions(options, "contentBox", _contentBox);
_updateOptions(options, "cssClass", _cssClass);
_updateOptions(options, "defaultChildType", _defaultChildType);
_updateOptions(options, "defaultState", _defaultState);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "disabled", _disabled);
_updateOptions(options, "focused", _focused);
_updateOptions(options, "height", _height);
_updateOptions(options, "hideClass", _hideClass);
_updateOptions(options, "hoverState", _hoverState);
_updateOptions(options, "toolbarId", _toolbarId);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "multiple", _multiple);
_updateOptions(options, "orientation", _orientation);
_updateOptions(options, "render", _render);
_updateOptions(options, "rendered", _rendered);
_updateOptions(options, "selection", _selection);
_updateOptions(options, "srcNode", _srcNode);
_updateOptions(options, "strings", _strings);
_updateOptions(options, "tabIndex", _tabIndex);
_updateOptions(options, "visible", _visible);
_updateOptions(options, "width", _width);
_updateOptions(options, "afterActiveDescendantChange", _afterActiveDescendantChange);
_updateOptions(options, "afterActiveStateChange", _afterActiveStateChange);
_updateOptions(options, "afterAddChild", _afterAddChild);
_updateOptions(options, "afterBoundingBoxChange", _afterBoundingBoxChange);
_updateOptions(options, "afterChildrenChange", _afterChildrenChange);
_updateOptions(options, "afterContentBoxChange", _afterContentBoxChange);
_updateOptions(options, "afterCssClassChange", _afterCssClassChange);
_updateOptions(options, "afterDefaultChildTypeChange", _afterDefaultChildTypeChange);
_updateOptions(options, "afterDefaultStateChange", _afterDefaultStateChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterDisabledChange", _afterDisabledChange);
_updateOptions(options, "afterFocusedChange", _afterFocusedChange);
_updateOptions(options, "afterHeightChange", _afterHeightChange);
_updateOptions(options, "afterHideClassChange", _afterHideClassChange);
_updateOptions(options, "afterHoverStateChange", _afterHoverStateChange);
_updateOptions(options, "afterIdChange", _afterIdChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterMultipleChange", _afterMultipleChange);
_updateOptions(options, "afterOrientationChange", _afterOrientationChange);
_updateOptions(options, "afterRemoveChild", _afterRemoveChild);
_updateOptions(options, "afterRenderChange", _afterRenderChange);
_updateOptions(options, "afterRenderedChange", _afterRenderedChange);
_updateOptions(options, "afterSelectionChange", _afterSelectionChange);
_updateOptions(options, "afterSrcNodeChange", _afterSrcNodeChange);
_updateOptions(options, "afterStringsChange", _afterStringsChange);
_updateOptions(options, "afterTabIndexChange", _afterTabIndexChange);
_updateOptions(options, "afterVisibleChange", _afterVisibleChange);
_updateOptions(options, "afterContentUpdate", _afterContentUpdate);
_updateOptions(options, "afterRender", _afterRender);
_updateOptions(options, "afterWidthChange", _afterWidthChange);
_updateOptions(options, "onActiveDescendantChange", _onActiveDescendantChange);
_updateOptions(options, "onActiveStateChange", _onActiveStateChange);
_updateOptions(options, "onAddChild", _onAddChild);
_updateOptions(options, "onBoundingBoxChange", _onBoundingBoxChange);
_updateOptions(options, "onChildrenChange", _onChildrenChange);
_updateOptions(options, "onContentBoxChange", _onContentBoxChange);
_updateOptions(options, "onCssClassChange", _onCssClassChange);
_updateOptions(options, "onDefaultChildTypeChange", _onDefaultChildTypeChange);
_updateOptions(options, "onDefaultStateChange", _onDefaultStateChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onDisabledChange", _onDisabledChange);
_updateOptions(options, "onFocusedChange", _onFocusedChange);
_updateOptions(options, "onHeightChange", _onHeightChange);
_updateOptions(options, "onHideClassChange", _onHideClassChange);
_updateOptions(options, "onHoverStateChange", _onHoverStateChange);
_updateOptions(options, "onIdChange", _onIdChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onMultipleChange", _onMultipleChange);
_updateOptions(options, "onOrientationChange", _onOrientationChange);
_updateOptions(options, "onRemoveChild", _onRemoveChild);
_updateOptions(options, "onRenderChange", _onRenderChange);
_updateOptions(options, "onRenderedChange", _onRenderedChange);
_updateOptions(options, "onSelectionChange", _onSelectionChange);
_updateOptions(options, "onSrcNodeChange", _onSrcNodeChange);
_updateOptions(options, "onStringsChange", _onStringsChange);
_updateOptions(options, "onTabIndexChange", _onTabIndexChange);
_updateOptions(options, "onVisibleChange", _onVisibleChange);
_updateOptions(options, "onContentUpdate", _onContentUpdate);
_updateOptions(options, "onRender", _onRender);
_updateOptions(options, "onWidthChange", _onWidthChange);
%>

<%@ include file="init-ext.jsp" %>