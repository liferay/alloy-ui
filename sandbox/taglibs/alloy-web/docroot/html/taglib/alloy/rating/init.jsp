<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:rating:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:rating:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:rating:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:rating:boundingBox");
java.lang.Boolean _canReset = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:canReset"), true);
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:rating:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:rating:cssClass");
java.lang.Number _defaultSelected = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:rating:defaultSelected"), 0);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:disabled"), false);
java.lang.Object _elements = (java.lang.Object)request.getAttribute("alloy:rating:elements");
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:focused"), false);
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:rating:height");
java.lang.Object _hiddenInput = (java.lang.Object)request.getAttribute("alloy:rating:hiddenInput");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:rating:hideClass");
java.lang.Object _ratingId = (java.lang.Object)request.getAttribute("alloy:rating:ratingId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:initialized"), false);
java.lang.Object _inputName = (java.lang.Object)request.getAttribute("alloy:rating:inputName");
java.lang.Object _label = (java.lang.Object)request.getAttribute("alloy:rating:label");
java.lang.Object _labelNode = (java.lang.Object)request.getAttribute("alloy:rating:labelNode");
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:rendered"), false);
java.lang.Number _selectedIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:rating:selectedIndex"), -1);
java.lang.Boolean _showTitle = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:showTitle"), true);
java.lang.Number _size = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:rating:size"), 5);
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:rating:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:rating:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:rating:tabIndex"), 0);
java.lang.Object _title = (java.lang.Object)request.getAttribute("alloy:rating:title");
java.lang.Object _ratingValue = (java.lang.Object)request.getAttribute("alloy:rating:ratingValue");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:rating:width");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:rating:afterBoundingBoxChange");
java.lang.Object _afterCanResetChange = (java.lang.Object)request.getAttribute("alloy:rating:afterCanResetChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:rating:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:rating:afterCssClassChange");
java.lang.Object _afterDefaultSelectedChange = (java.lang.Object)request.getAttribute("alloy:rating:afterDefaultSelectedChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:rating:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:rating:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:rating:afterDisabledChange");
java.lang.Object _afterElementsChange = (java.lang.Object)request.getAttribute("alloy:rating:afterElementsChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:rating:afterFocusedChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:rating:afterHeightChange");
java.lang.Object _afterHiddenInputChange = (java.lang.Object)request.getAttribute("alloy:rating:afterHiddenInputChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:rating:afterHideClassChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:rating:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:rating:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:rating:afterInitializedChange");
java.lang.Object _afterInputNameChange = (java.lang.Object)request.getAttribute("alloy:rating:afterInputNameChange");
java.lang.Object _afterItemClick = (java.lang.Object)request.getAttribute("alloy:rating:afterItemClick");
java.lang.Object _afterItemOut = (java.lang.Object)request.getAttribute("alloy:rating:afterItemOut");
java.lang.Object _afterItemSelect = (java.lang.Object)request.getAttribute("alloy:rating:afterItemSelect");
java.lang.Object _afterLabelChange = (java.lang.Object)request.getAttribute("alloy:rating:afterLabelChange");
java.lang.Object _afterLabelNodeChange = (java.lang.Object)request.getAttribute("alloy:rating:afterLabelNodeChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:rating:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:rating:afterRenderedChange");
java.lang.Object _afterSelectedIndexChange = (java.lang.Object)request.getAttribute("alloy:rating:afterSelectedIndexChange");
java.lang.Object _afterShowTitleChange = (java.lang.Object)request.getAttribute("alloy:rating:afterShowTitleChange");
java.lang.Object _afterSizeChange = (java.lang.Object)request.getAttribute("alloy:rating:afterSizeChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:rating:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:rating:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:rating:afterTabIndexChange");
java.lang.Object _afterTitleChange = (java.lang.Object)request.getAttribute("alloy:rating:afterTitleChange");
java.lang.Object _afterValueChange = (java.lang.Object)request.getAttribute("alloy:rating:afterValueChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:rating:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:rating:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:rating:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:rating:afterWidthChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:rating:onBoundingBoxChange");
java.lang.Object _onCanResetChange = (java.lang.Object)request.getAttribute("alloy:rating:onCanResetChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:rating:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:rating:onCssClassChange");
java.lang.Object _onDefaultSelectedChange = (java.lang.Object)request.getAttribute("alloy:rating:onDefaultSelectedChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:rating:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:rating:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:rating:onDisabledChange");
java.lang.Object _onElementsChange = (java.lang.Object)request.getAttribute("alloy:rating:onElementsChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:rating:onFocusedChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:rating:onHeightChange");
java.lang.Object _onHiddenInputChange = (java.lang.Object)request.getAttribute("alloy:rating:onHiddenInputChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:rating:onHideClassChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:rating:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:rating:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:rating:onInitializedChange");
java.lang.Object _onInputNameChange = (java.lang.Object)request.getAttribute("alloy:rating:onInputNameChange");
java.lang.Object _onItemClick = (java.lang.Object)request.getAttribute("alloy:rating:onItemClick");
java.lang.Object _onItemOut = (java.lang.Object)request.getAttribute("alloy:rating:onItemOut");
java.lang.Object _onItemSelect = (java.lang.Object)request.getAttribute("alloy:rating:onItemSelect");
java.lang.Object _onLabelChange = (java.lang.Object)request.getAttribute("alloy:rating:onLabelChange");
java.lang.Object _onLabelNodeChange = (java.lang.Object)request.getAttribute("alloy:rating:onLabelNodeChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:rating:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:rating:onRenderedChange");
java.lang.Object _onSelectedIndexChange = (java.lang.Object)request.getAttribute("alloy:rating:onSelectedIndexChange");
java.lang.Object _onShowTitleChange = (java.lang.Object)request.getAttribute("alloy:rating:onShowTitleChange");
java.lang.Object _onSizeChange = (java.lang.Object)request.getAttribute("alloy:rating:onSizeChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:rating:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:rating:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:rating:onTabIndexChange");
java.lang.Object _onTitleChange = (java.lang.Object)request.getAttribute("alloy:rating:onTitleChange");
java.lang.Object _onValueChange = (java.lang.Object)request.getAttribute("alloy:rating:onValueChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:rating:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:rating:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:rating:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:rating:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:rating:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:rating:canReset") != null) {
	scopedAttributes.put("canReset", _canReset);
}

if (request.getAttribute("alloy:rating:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:rating:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:rating:defaultSelected") != null) {
	scopedAttributes.put("defaultSelected", _defaultSelected);
}

if (request.getAttribute("alloy:rating:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:rating:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:rating:elements") != null) {
	scopedAttributes.put("elements", _elements);
}

if (request.getAttribute("alloy:rating:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:rating:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:rating:hiddenInput") != null) {
	scopedAttributes.put("hiddenInput", _hiddenInput);
}

if (request.getAttribute("alloy:rating:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:rating:ratingId") != null) {
	scopedAttributes.put("ratingId", _ratingId);
}

if (request.getAttribute("alloy:rating:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:rating:inputName") != null) {
	scopedAttributes.put("inputName", _inputName);
}

if (request.getAttribute("alloy:rating:label") != null) {
	scopedAttributes.put("label", _label);
}

if (request.getAttribute("alloy:rating:labelNode") != null) {
	scopedAttributes.put("labelNode", _labelNode);
}

if (request.getAttribute("alloy:rating:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:rating:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:rating:selectedIndex") != null) {
	scopedAttributes.put("selectedIndex", _selectedIndex);
}

if (request.getAttribute("alloy:rating:showTitle") != null) {
	scopedAttributes.put("showTitle", _showTitle);
}

if (request.getAttribute("alloy:rating:size") != null) {
	scopedAttributes.put("size", _size);
}

if (request.getAttribute("alloy:rating:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:rating:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:rating:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:rating:title") != null) {
	scopedAttributes.put("title", _title);
}

if (request.getAttribute("alloy:rating:ratingValue") != null) {
	scopedAttributes.put("ratingValue", _ratingValue);
}

if (request.getAttribute("alloy:rating:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:rating:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:rating:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:rating:afterCanResetChange") != null) {
	scopedAttributes.put("afterCanResetChange", _afterCanResetChange);
}

if (request.getAttribute("alloy:rating:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:rating:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:rating:afterDefaultSelectedChange") != null) {
	scopedAttributes.put("afterDefaultSelectedChange", _afterDefaultSelectedChange);
}

if (request.getAttribute("alloy:rating:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:rating:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:rating:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:rating:afterElementsChange") != null) {
	scopedAttributes.put("afterElementsChange", _afterElementsChange);
}

if (request.getAttribute("alloy:rating:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:rating:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:rating:afterHiddenInputChange") != null) {
	scopedAttributes.put("afterHiddenInputChange", _afterHiddenInputChange);
}

if (request.getAttribute("alloy:rating:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:rating:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:rating:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:rating:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:rating:afterInputNameChange") != null) {
	scopedAttributes.put("afterInputNameChange", _afterInputNameChange);
}

if (request.getAttribute("alloy:rating:afterItemClick") != null) {
	scopedAttributes.put("afterItemClick", _afterItemClick);
}

if (request.getAttribute("alloy:rating:afterItemOut") != null) {
	scopedAttributes.put("afterItemOut", _afterItemOut);
}

if (request.getAttribute("alloy:rating:afterItemSelect") != null) {
	scopedAttributes.put("afterItemSelect", _afterItemSelect);
}

if (request.getAttribute("alloy:rating:afterLabelChange") != null) {
	scopedAttributes.put("afterLabelChange", _afterLabelChange);
}

if (request.getAttribute("alloy:rating:afterLabelNodeChange") != null) {
	scopedAttributes.put("afterLabelNodeChange", _afterLabelNodeChange);
}

if (request.getAttribute("alloy:rating:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:rating:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:rating:afterSelectedIndexChange") != null) {
	scopedAttributes.put("afterSelectedIndexChange", _afterSelectedIndexChange);
}

if (request.getAttribute("alloy:rating:afterShowTitleChange") != null) {
	scopedAttributes.put("afterShowTitleChange", _afterShowTitleChange);
}

if (request.getAttribute("alloy:rating:afterSizeChange") != null) {
	scopedAttributes.put("afterSizeChange", _afterSizeChange);
}

if (request.getAttribute("alloy:rating:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:rating:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:rating:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:rating:afterTitleChange") != null) {
	scopedAttributes.put("afterTitleChange", _afterTitleChange);
}

if (request.getAttribute("alloy:rating:afterValueChange") != null) {
	scopedAttributes.put("afterValueChange", _afterValueChange);
}

if (request.getAttribute("alloy:rating:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:rating:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:rating:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:rating:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:rating:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:rating:onCanResetChange") != null) {
	scopedAttributes.put("onCanResetChange", _onCanResetChange);
}

if (request.getAttribute("alloy:rating:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:rating:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:rating:onDefaultSelectedChange") != null) {
	scopedAttributes.put("onDefaultSelectedChange", _onDefaultSelectedChange);
}

if (request.getAttribute("alloy:rating:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:rating:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:rating:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:rating:onElementsChange") != null) {
	scopedAttributes.put("onElementsChange", _onElementsChange);
}

if (request.getAttribute("alloy:rating:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:rating:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:rating:onHiddenInputChange") != null) {
	scopedAttributes.put("onHiddenInputChange", _onHiddenInputChange);
}

if (request.getAttribute("alloy:rating:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:rating:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:rating:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:rating:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:rating:onInputNameChange") != null) {
	scopedAttributes.put("onInputNameChange", _onInputNameChange);
}

if (request.getAttribute("alloy:rating:onItemClick") != null) {
	scopedAttributes.put("onItemClick", _onItemClick);
}

if (request.getAttribute("alloy:rating:onItemOut") != null) {
	scopedAttributes.put("onItemOut", _onItemOut);
}

if (request.getAttribute("alloy:rating:onItemSelect") != null) {
	scopedAttributes.put("onItemSelect", _onItemSelect);
}

if (request.getAttribute("alloy:rating:onLabelChange") != null) {
	scopedAttributes.put("onLabelChange", _onLabelChange);
}

if (request.getAttribute("alloy:rating:onLabelNodeChange") != null) {
	scopedAttributes.put("onLabelNodeChange", _onLabelNodeChange);
}

if (request.getAttribute("alloy:rating:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:rating:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:rating:onSelectedIndexChange") != null) {
	scopedAttributes.put("onSelectedIndexChange", _onSelectedIndexChange);
}

if (request.getAttribute("alloy:rating:onShowTitleChange") != null) {
	scopedAttributes.put("onShowTitleChange", _onShowTitleChange);
}

if (request.getAttribute("alloy:rating:onSizeChange") != null) {
	scopedAttributes.put("onSizeChange", _onSizeChange);
}

if (request.getAttribute("alloy:rating:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:rating:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:rating:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:rating:onTitleChange") != null) {
	scopedAttributes.put("onTitleChange", _onTitleChange);
}

if (request.getAttribute("alloy:rating:onValueChange") != null) {
	scopedAttributes.put("onValueChange", _onValueChange);
}

if (request.getAttribute("alloy:rating:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:rating:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:rating:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:rating:onWidthChange") != null) {
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