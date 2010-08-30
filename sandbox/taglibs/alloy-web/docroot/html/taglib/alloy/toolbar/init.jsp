<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:toolbar:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:toolbar:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:toolbar:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _activeDescendant = (java.lang.Object)request.getAttribute("alloy:toolbar:activeDescendant");
java.lang.Boolean _activeState = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:toolbar:activeState"), false);
java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:toolbar:boundingBox");
java.lang.Object _children = (java.lang.Object)request.getAttribute("alloy:toolbar:children");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:toolbar:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:toolbar:cssClass");
java.lang.Object _defaultChildType = (java.lang.Object)request.getAttribute("alloy:toolbar:defaultChildType");
java.lang.Boolean _defaultState = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:toolbar:defaultState"), false);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:toolbar:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:toolbar:disabled"), false);
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:toolbar:focused"), false);
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:toolbar:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:toolbar:hideClass");
java.lang.Boolean _hoverState = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:toolbar:hoverState"), false);
java.lang.Object _toolbarId = (java.lang.Object)request.getAttribute("alloy:toolbar:toolbarId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:toolbar:initialized"), false);
java.lang.Boolean _multiple = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:toolbar:multiple"), false);
java.lang.Object _orientation = (java.lang.Object)request.getAttribute("alloy:toolbar:orientation");
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:toolbar:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:toolbar:rendered"), false);
java.lang.Object _selection = (java.lang.Object)request.getAttribute("alloy:toolbar:selection");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:toolbar:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:toolbar:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:toolbar:tabIndex"), 0);
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:toolbar:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:toolbar:width");
java.lang.Object _afterActiveDescendantChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterActiveDescendantChange");
java.lang.Object _afterActiveStateChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterActiveStateChange");
java.lang.Object _afterAddChild = (java.lang.Object)request.getAttribute("alloy:toolbar:afterAddChild");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterBoundingBoxChange");
java.lang.Object _afterChildrenChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterChildrenChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterCssClassChange");
java.lang.Object _afterDefaultChildTypeChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterDefaultChildTypeChange");
java.lang.Object _afterDefaultStateChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterDefaultStateChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:toolbar:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterDisabledChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterFocusedChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterHideClassChange");
java.lang.Object _afterHoverStateChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterHoverStateChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:toolbar:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterInitializedChange");
java.lang.Object _afterMultipleChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterMultipleChange");
java.lang.Object _afterOrientationChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterOrientationChange");
java.lang.Object _afterRemoveChild = (java.lang.Object)request.getAttribute("alloy:toolbar:afterRemoveChild");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterRenderedChange");
java.lang.Object _afterSelectionChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterSelectionChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterTabIndexChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:toolbar:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:toolbar:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:toolbar:afterWidthChange");
java.lang.Object _onActiveDescendantChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onActiveDescendantChange");
java.lang.Object _onActiveStateChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onActiveStateChange");
java.lang.Object _onAddChild = (java.lang.Object)request.getAttribute("alloy:toolbar:onAddChild");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onBoundingBoxChange");
java.lang.Object _onChildrenChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onChildrenChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onCssClassChange");
java.lang.Object _onDefaultChildTypeChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onDefaultChildTypeChange");
java.lang.Object _onDefaultStateChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onDefaultStateChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:toolbar:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onDisabledChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onFocusedChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onHideClassChange");
java.lang.Object _onHoverStateChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onHoverStateChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:toolbar:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onInitializedChange");
java.lang.Object _onMultipleChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onMultipleChange");
java.lang.Object _onOrientationChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onOrientationChange");
java.lang.Object _onRemoveChild = (java.lang.Object)request.getAttribute("alloy:toolbar:onRemoveChild");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onRenderedChange");
java.lang.Object _onSelectionChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onSelectionChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onTabIndexChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:toolbar:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:toolbar:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:toolbar:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:toolbar:activeDescendant") != null) {
	scopedAttributes.put("activeDescendant", _activeDescendant);
}

if (request.getAttribute("alloy:toolbar:activeState") != null) {
	scopedAttributes.put("activeState", _activeState);
}

if (request.getAttribute("alloy:toolbar:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:toolbar:children") != null) {
	scopedAttributes.put("children", _children);
}

if (request.getAttribute("alloy:toolbar:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:toolbar:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:toolbar:defaultChildType") != null) {
	scopedAttributes.put("defaultChildType", _defaultChildType);
}

if (request.getAttribute("alloy:toolbar:defaultState") != null) {
	scopedAttributes.put("defaultState", _defaultState);
}

if (request.getAttribute("alloy:toolbar:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:toolbar:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:toolbar:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:toolbar:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:toolbar:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:toolbar:hoverState") != null) {
	scopedAttributes.put("hoverState", _hoverState);
}

if (request.getAttribute("alloy:toolbar:toolbarId") != null) {
	scopedAttributes.put("toolbarId", _toolbarId);
}

if (request.getAttribute("alloy:toolbar:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:toolbar:multiple") != null) {
	scopedAttributes.put("multiple", _multiple);
}

if (request.getAttribute("alloy:toolbar:orientation") != null) {
	scopedAttributes.put("orientation", _orientation);
}

if (request.getAttribute("alloy:toolbar:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:toolbar:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:toolbar:selection") != null) {
	scopedAttributes.put("selection", _selection);
}

if (request.getAttribute("alloy:toolbar:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:toolbar:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:toolbar:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:toolbar:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:toolbar:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:toolbar:afterActiveDescendantChange") != null) {
	scopedAttributes.put("afterActiveDescendantChange", _afterActiveDescendantChange);
}

if (request.getAttribute("alloy:toolbar:afterActiveStateChange") != null) {
	scopedAttributes.put("afterActiveStateChange", _afterActiveStateChange);
}

if (request.getAttribute("alloy:toolbar:afterAddChild") != null) {
	scopedAttributes.put("afterAddChild", _afterAddChild);
}

if (request.getAttribute("alloy:toolbar:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:toolbar:afterChildrenChange") != null) {
	scopedAttributes.put("afterChildrenChange", _afterChildrenChange);
}

if (request.getAttribute("alloy:toolbar:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:toolbar:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:toolbar:afterDefaultChildTypeChange") != null) {
	scopedAttributes.put("afterDefaultChildTypeChange", _afterDefaultChildTypeChange);
}

if (request.getAttribute("alloy:toolbar:afterDefaultStateChange") != null) {
	scopedAttributes.put("afterDefaultStateChange", _afterDefaultStateChange);
}

if (request.getAttribute("alloy:toolbar:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:toolbar:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:toolbar:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:toolbar:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:toolbar:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:toolbar:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:toolbar:afterHoverStateChange") != null) {
	scopedAttributes.put("afterHoverStateChange", _afterHoverStateChange);
}

if (request.getAttribute("alloy:toolbar:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:toolbar:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:toolbar:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:toolbar:afterMultipleChange") != null) {
	scopedAttributes.put("afterMultipleChange", _afterMultipleChange);
}

if (request.getAttribute("alloy:toolbar:afterOrientationChange") != null) {
	scopedAttributes.put("afterOrientationChange", _afterOrientationChange);
}

if (request.getAttribute("alloy:toolbar:afterRemoveChild") != null) {
	scopedAttributes.put("afterRemoveChild", _afterRemoveChild);
}

if (request.getAttribute("alloy:toolbar:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:toolbar:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:toolbar:afterSelectionChange") != null) {
	scopedAttributes.put("afterSelectionChange", _afterSelectionChange);
}

if (request.getAttribute("alloy:toolbar:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:toolbar:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:toolbar:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:toolbar:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:toolbar:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:toolbar:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:toolbar:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:toolbar:onActiveDescendantChange") != null) {
	scopedAttributes.put("onActiveDescendantChange", _onActiveDescendantChange);
}

if (request.getAttribute("alloy:toolbar:onActiveStateChange") != null) {
	scopedAttributes.put("onActiveStateChange", _onActiveStateChange);
}

if (request.getAttribute("alloy:toolbar:onAddChild") != null) {
	scopedAttributes.put("onAddChild", _onAddChild);
}

if (request.getAttribute("alloy:toolbar:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:toolbar:onChildrenChange") != null) {
	scopedAttributes.put("onChildrenChange", _onChildrenChange);
}

if (request.getAttribute("alloy:toolbar:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:toolbar:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:toolbar:onDefaultChildTypeChange") != null) {
	scopedAttributes.put("onDefaultChildTypeChange", _onDefaultChildTypeChange);
}

if (request.getAttribute("alloy:toolbar:onDefaultStateChange") != null) {
	scopedAttributes.put("onDefaultStateChange", _onDefaultStateChange);
}

if (request.getAttribute("alloy:toolbar:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:toolbar:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:toolbar:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:toolbar:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:toolbar:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:toolbar:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:toolbar:onHoverStateChange") != null) {
	scopedAttributes.put("onHoverStateChange", _onHoverStateChange);
}

if (request.getAttribute("alloy:toolbar:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:toolbar:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:toolbar:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:toolbar:onMultipleChange") != null) {
	scopedAttributes.put("onMultipleChange", _onMultipleChange);
}

if (request.getAttribute("alloy:toolbar:onOrientationChange") != null) {
	scopedAttributes.put("onOrientationChange", _onOrientationChange);
}

if (request.getAttribute("alloy:toolbar:onRemoveChild") != null) {
	scopedAttributes.put("onRemoveChild", _onRemoveChild);
}

if (request.getAttribute("alloy:toolbar:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:toolbar:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:toolbar:onSelectionChange") != null) {
	scopedAttributes.put("onSelectionChange", _onSelectionChange);
}

if (request.getAttribute("alloy:toolbar:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:toolbar:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:toolbar:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:toolbar:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:toolbar:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:toolbar:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:toolbar:onWidthChange") != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>