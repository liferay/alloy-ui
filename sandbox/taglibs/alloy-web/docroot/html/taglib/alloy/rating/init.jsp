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

java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:boundingBox"));
java.lang.Boolean _canReset = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:canReset"));
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:cssClass"));
java.lang.Number _defaultSelected = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:rating:defaultSelected"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:destroyed"));
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:disabled"));
java.lang.String _elements = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:elements"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:focused"));
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:height"));
java.lang.String _hiddenInput = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:hiddenInput"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:hideClass"));
java.lang.String _ratingId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:ratingId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:initialized"));
java.lang.String _inputName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:inputName"));
java.lang.String _label = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:label"));
java.lang.String _labelNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:labelNode"));
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:render"));
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:rendered"));
java.lang.Number _selectedIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:rating:selectedIndex"));
java.lang.Boolean _showTitle = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:showTitle"));
java.lang.Number _size = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:rating:size"));
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:srcNode"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:rating:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:rating:tabIndex"));
java.lang.String _title = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:title"));
java.lang.String _ratingValue = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:ratingValue"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:visible"));
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:width"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterBoundingBoxChange"));
java.lang.String _afterCanResetChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterCanResetChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterCssClassChange"));
java.lang.String _afterDefaultSelectedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterDefaultSelectedChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterDisabledChange"));
java.lang.String _afterElementsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterElementsChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterFocusedChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterHeightChange"));
java.lang.String _afterHiddenInputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterHiddenInputChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterHideClassChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterInitializedChange"));
java.lang.String _afterInputNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterInputNameChange"));
java.lang.String _afterItemClick = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterItemClick"));
java.lang.String _afterItemOut = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterItemOut"));
java.lang.String _afterItemSelect = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterItemSelect"));
java.lang.String _afterLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterLabelChange"));
java.lang.String _afterLabelNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterLabelNodeChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterRenderedChange"));
java.lang.String _afterSelectedIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterSelectedIndexChange"));
java.lang.String _afterShowTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterShowTitleChange"));
java.lang.String _afterSizeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterSizeChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterSrcNodeChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterTabIndexChange"));
java.lang.String _afterTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterTitleChange"));
java.lang.String _afterValueChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterValueChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:afterWidthChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onBoundingBoxChange"));
java.lang.String _onCanResetChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onCanResetChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onCssClassChange"));
java.lang.String _onDefaultSelectedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onDefaultSelectedChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onDisabledChange"));
java.lang.String _onElementsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onElementsChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onFocusedChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onHeightChange"));
java.lang.String _onHiddenInputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onHiddenInputChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onHideClassChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onInitializedChange"));
java.lang.String _onInputNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onInputNameChange"));
java.lang.String _onItemClick = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onItemClick"));
java.lang.String _onItemOut = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onItemOut"));
java.lang.String _onItemSelect = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onItemSelect"));
java.lang.String _onLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onLabelChange"));
java.lang.String _onLabelNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onLabelNodeChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onRenderedChange"));
java.lang.String _onSelectedIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onSelectedIndexChange"));
java.lang.String _onShowTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onShowTitleChange"));
java.lang.String _onSizeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onSizeChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onSrcNodeChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onTabIndexChange"));
java.lang.String _onTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onTitleChange"));
java.lang.String _onValueChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onValueChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:rating:onWidthChange"));
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