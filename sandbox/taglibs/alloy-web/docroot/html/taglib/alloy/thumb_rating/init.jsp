<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:thumb-rating:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:thumb-rating:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:thumb-rating:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:thumb-rating:boundingBox");
java.lang.Boolean _canReset = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:canReset"), true);
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:thumb-rating:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:thumb-rating:cssClass");
java.lang.Number _defaultSelected = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:thumb-rating:defaultSelected"), 0);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:disabled"), false);
java.lang.Object _elements = (java.lang.Object)request.getAttribute("alloy:thumb-rating:elements");
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:focused"), false);
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:thumb-rating:height");
java.lang.Object _hiddenInput = (java.lang.Object)request.getAttribute("alloy:thumb-rating:hiddenInput");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:thumb-rating:hideClass");
java.lang.Object _thumbratingId = (java.lang.Object)request.getAttribute("alloy:thumb-rating:thumbratingId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:initialized"), false);
java.lang.Object _inputName = (java.lang.Object)request.getAttribute("alloy:thumb-rating:inputName");
java.lang.Object _label = (java.lang.Object)request.getAttribute("alloy:thumb-rating:label");
java.lang.Object _labelNode = (java.lang.Object)request.getAttribute("alloy:thumb-rating:labelNode");
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:rendered"), false);
java.lang.Number _selectedIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:thumb-rating:selectedIndex"), -1);
java.lang.Boolean _showTitle = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:showTitle"), true);
java.lang.Number _size = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:thumb-rating:size"), 2);
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:thumb-rating:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:thumb-rating:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:thumb-rating:tabIndex"), 0);
java.lang.Object _title = (java.lang.Object)request.getAttribute("alloy:thumb-rating:title");
java.lang.Object _thumbratingValue = (java.lang.Object)request.getAttribute("alloy:thumb-rating:thumbratingValue");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:thumb-rating:width");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterBoundingBoxChange");
java.lang.Object _afterCanResetChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterCanResetChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterCssClassChange");
java.lang.Object _afterDefaultSelectedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterDefaultSelectedChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterDisabledChange");
java.lang.Object _afterElementsChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterElementsChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterFocusedChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterHeightChange");
java.lang.Object _afterHiddenInputChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterHiddenInputChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterHideClassChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterInitializedChange");
java.lang.Object _afterInputNameChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterInputNameChange");
java.lang.Object _afterItemClick = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterItemClick");
java.lang.Object _afterItemOut = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterItemOut");
java.lang.Object _afterItemSelect = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterItemSelect");
java.lang.Object _afterLabelChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterLabelChange");
java.lang.Object _afterLabelNodeChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterLabelNodeChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterRenderedChange");
java.lang.Object _afterSelectedIndexChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterSelectedIndexChange");
java.lang.Object _afterShowTitleChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterShowTitleChange");
java.lang.Object _afterSizeChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterSizeChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterTabIndexChange");
java.lang.Object _afterTitleChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterTitleChange");
java.lang.Object _afterValueChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterValueChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:afterWidthChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onBoundingBoxChange");
java.lang.Object _onCanResetChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onCanResetChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onCssClassChange");
java.lang.Object _onDefaultSelectedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onDefaultSelectedChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onDisabledChange");
java.lang.Object _onElementsChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onElementsChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onFocusedChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onHeightChange");
java.lang.Object _onHiddenInputChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onHiddenInputChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onHideClassChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onInitializedChange");
java.lang.Object _onInputNameChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onInputNameChange");
java.lang.Object _onItemClick = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onItemClick");
java.lang.Object _onItemOut = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onItemOut");
java.lang.Object _onItemSelect = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onItemSelect");
java.lang.Object _onLabelChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onLabelChange");
java.lang.Object _onLabelNodeChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onLabelNodeChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onRenderedChange");
java.lang.Object _onSelectedIndexChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onSelectedIndexChange");
java.lang.Object _onShowTitleChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onShowTitleChange");
java.lang.Object _onSizeChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onSizeChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onTabIndexChange");
java.lang.Object _onTitleChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onTitleChange");
java.lang.Object _onValueChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onValueChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:thumb-rating:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:thumb-rating:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:thumb-rating:canReset") != null) {
	scopedAttributes.put("canReset", _canReset);
}

if (request.getAttribute("alloy:thumb-rating:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:thumb-rating:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:thumb-rating:defaultSelected") != null) {
	scopedAttributes.put("defaultSelected", _defaultSelected);
}

if (request.getAttribute("alloy:thumb-rating:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:thumb-rating:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:thumb-rating:elements") != null) {
	scopedAttributes.put("elements", _elements);
}

if (request.getAttribute("alloy:thumb-rating:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:thumb-rating:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:thumb-rating:hiddenInput") != null) {
	scopedAttributes.put("hiddenInput", _hiddenInput);
}

if (request.getAttribute("alloy:thumb-rating:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:thumb-rating:thumbratingId") != null) {
	scopedAttributes.put("thumbratingId", _thumbratingId);
}

if (request.getAttribute("alloy:thumb-rating:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:thumb-rating:inputName") != null) {
	scopedAttributes.put("inputName", _inputName);
}

if (request.getAttribute("alloy:thumb-rating:label") != null) {
	scopedAttributes.put("label", _label);
}

if (request.getAttribute("alloy:thumb-rating:labelNode") != null) {
	scopedAttributes.put("labelNode", _labelNode);
}

if (request.getAttribute("alloy:thumb-rating:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:thumb-rating:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:thumb-rating:selectedIndex") != null) {
	scopedAttributes.put("selectedIndex", _selectedIndex);
}

if (request.getAttribute("alloy:thumb-rating:showTitle") != null) {
	scopedAttributes.put("showTitle", _showTitle);
}

if (request.getAttribute("alloy:thumb-rating:size") != null) {
	scopedAttributes.put("size", _size);
}

if (request.getAttribute("alloy:thumb-rating:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:thumb-rating:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:thumb-rating:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:thumb-rating:title") != null) {
	scopedAttributes.put("title", _title);
}

if (request.getAttribute("alloy:thumb-rating:thumbratingValue") != null) {
	scopedAttributes.put("thumbratingValue", _thumbratingValue);
}

if (request.getAttribute("alloy:thumb-rating:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:thumb-rating:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:thumb-rating:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:thumb-rating:afterCanResetChange") != null) {
	scopedAttributes.put("afterCanResetChange", _afterCanResetChange);
}

if (request.getAttribute("alloy:thumb-rating:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:thumb-rating:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:thumb-rating:afterDefaultSelectedChange") != null) {
	scopedAttributes.put("afterDefaultSelectedChange", _afterDefaultSelectedChange);
}

if (request.getAttribute("alloy:thumb-rating:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:thumb-rating:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:thumb-rating:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:thumb-rating:afterElementsChange") != null) {
	scopedAttributes.put("afterElementsChange", _afterElementsChange);
}

if (request.getAttribute("alloy:thumb-rating:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:thumb-rating:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:thumb-rating:afterHiddenInputChange") != null) {
	scopedAttributes.put("afterHiddenInputChange", _afterHiddenInputChange);
}

if (request.getAttribute("alloy:thumb-rating:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:thumb-rating:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:thumb-rating:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:thumb-rating:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:thumb-rating:afterInputNameChange") != null) {
	scopedAttributes.put("afterInputNameChange", _afterInputNameChange);
}

if (request.getAttribute("alloy:thumb-rating:afterItemClick") != null) {
	scopedAttributes.put("afterItemClick", _afterItemClick);
}

if (request.getAttribute("alloy:thumb-rating:afterItemOut") != null) {
	scopedAttributes.put("afterItemOut", _afterItemOut);
}

if (request.getAttribute("alloy:thumb-rating:afterItemSelect") != null) {
	scopedAttributes.put("afterItemSelect", _afterItemSelect);
}

if (request.getAttribute("alloy:thumb-rating:afterLabelChange") != null) {
	scopedAttributes.put("afterLabelChange", _afterLabelChange);
}

if (request.getAttribute("alloy:thumb-rating:afterLabelNodeChange") != null) {
	scopedAttributes.put("afterLabelNodeChange", _afterLabelNodeChange);
}

if (request.getAttribute("alloy:thumb-rating:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:thumb-rating:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:thumb-rating:afterSelectedIndexChange") != null) {
	scopedAttributes.put("afterSelectedIndexChange", _afterSelectedIndexChange);
}

if (request.getAttribute("alloy:thumb-rating:afterShowTitleChange") != null) {
	scopedAttributes.put("afterShowTitleChange", _afterShowTitleChange);
}

if (request.getAttribute("alloy:thumb-rating:afterSizeChange") != null) {
	scopedAttributes.put("afterSizeChange", _afterSizeChange);
}

if (request.getAttribute("alloy:thumb-rating:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:thumb-rating:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:thumb-rating:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:thumb-rating:afterTitleChange") != null) {
	scopedAttributes.put("afterTitleChange", _afterTitleChange);
}

if (request.getAttribute("alloy:thumb-rating:afterValueChange") != null) {
	scopedAttributes.put("afterValueChange", _afterValueChange);
}

if (request.getAttribute("alloy:thumb-rating:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:thumb-rating:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:thumb-rating:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:thumb-rating:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:thumb-rating:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:thumb-rating:onCanResetChange") != null) {
	scopedAttributes.put("onCanResetChange", _onCanResetChange);
}

if (request.getAttribute("alloy:thumb-rating:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:thumb-rating:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:thumb-rating:onDefaultSelectedChange") != null) {
	scopedAttributes.put("onDefaultSelectedChange", _onDefaultSelectedChange);
}

if (request.getAttribute("alloy:thumb-rating:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:thumb-rating:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:thumb-rating:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:thumb-rating:onElementsChange") != null) {
	scopedAttributes.put("onElementsChange", _onElementsChange);
}

if (request.getAttribute("alloy:thumb-rating:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:thumb-rating:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:thumb-rating:onHiddenInputChange") != null) {
	scopedAttributes.put("onHiddenInputChange", _onHiddenInputChange);
}

if (request.getAttribute("alloy:thumb-rating:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:thumb-rating:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:thumb-rating:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:thumb-rating:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:thumb-rating:onInputNameChange") != null) {
	scopedAttributes.put("onInputNameChange", _onInputNameChange);
}

if (request.getAttribute("alloy:thumb-rating:onItemClick") != null) {
	scopedAttributes.put("onItemClick", _onItemClick);
}

if (request.getAttribute("alloy:thumb-rating:onItemOut") != null) {
	scopedAttributes.put("onItemOut", _onItemOut);
}

if (request.getAttribute("alloy:thumb-rating:onItemSelect") != null) {
	scopedAttributes.put("onItemSelect", _onItemSelect);
}

if (request.getAttribute("alloy:thumb-rating:onLabelChange") != null) {
	scopedAttributes.put("onLabelChange", _onLabelChange);
}

if (request.getAttribute("alloy:thumb-rating:onLabelNodeChange") != null) {
	scopedAttributes.put("onLabelNodeChange", _onLabelNodeChange);
}

if (request.getAttribute("alloy:thumb-rating:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:thumb-rating:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:thumb-rating:onSelectedIndexChange") != null) {
	scopedAttributes.put("onSelectedIndexChange", _onSelectedIndexChange);
}

if (request.getAttribute("alloy:thumb-rating:onShowTitleChange") != null) {
	scopedAttributes.put("onShowTitleChange", _onShowTitleChange);
}

if (request.getAttribute("alloy:thumb-rating:onSizeChange") != null) {
	scopedAttributes.put("onSizeChange", _onSizeChange);
}

if (request.getAttribute("alloy:thumb-rating:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:thumb-rating:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:thumb-rating:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:thumb-rating:onTitleChange") != null) {
	scopedAttributes.put("onTitleChange", _onTitleChange);
}

if (request.getAttribute("alloy:thumb-rating:onValueChange") != null) {
	scopedAttributes.put("onValueChange", _onValueChange);
}

if (request.getAttribute("alloy:thumb-rating:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:thumb-rating:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:thumb-rating:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:thumb-rating:onWidthChange") != null) {
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