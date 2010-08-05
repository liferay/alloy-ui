<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:rating:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:rating:scopedAttributes");

java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:rating:boundingBox");
java.lang.Boolean _canReset = (java.lang.Boolean)request.getAttribute("alloy:rating:canReset");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:rating:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:rating:cssClass");
java.lang.Number _defaultSelected = (java.lang.Number)request.getAttribute("alloy:rating:defaultSelected");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:rating:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:rating:disabled");
java.lang.String _elements = (java.lang.String)request.getAttribute("alloy:rating:elements");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:rating:focused");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:rating:height");
java.lang.String _hiddenInput = (java.lang.String)request.getAttribute("alloy:rating:hiddenInput");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:rating:hideClass");
java.lang.String _ratingId = (java.lang.String)request.getAttribute("alloy:rating:ratingId");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:rating:initialized");
java.lang.String _inputName = (java.lang.String)request.getAttribute("alloy:rating:inputName");
java.lang.String _label = (java.lang.String)request.getAttribute("alloy:rating:label");
java.lang.String _labelNode = (java.lang.String)request.getAttribute("alloy:rating:labelNode");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:rating:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:rating:rendered");
java.lang.Number _selectedIndex = (java.lang.Number)request.getAttribute("alloy:rating:selectedIndex");
java.lang.Boolean _showTitle = (java.lang.Boolean)request.getAttribute("alloy:rating:showTitle");
java.lang.Number _size = (java.lang.Number)request.getAttribute("alloy:rating:size");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:rating:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:rating:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:rating:tabIndex");
java.lang.String _title = (java.lang.String)request.getAttribute("alloy:rating:title");
java.lang.String _ratingValue = (java.lang.String)request.getAttribute("alloy:rating:ratingValue");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:rating:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:rating:width");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:rating:afterBoundingBoxChange");
java.lang.String _afterCanResetChange = (java.lang.String)request.getAttribute("alloy:rating:afterCanResetChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:rating:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:rating:afterCssClassChange");
java.lang.String _afterDefaultSelectedChange = (java.lang.String)request.getAttribute("alloy:rating:afterDefaultSelectedChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:rating:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:rating:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:rating:afterDisabledChange");
java.lang.String _afterElementsChange = (java.lang.String)request.getAttribute("alloy:rating:afterElementsChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:rating:afterFocusedChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:rating:afterHeightChange");
java.lang.String _afterHiddenInputChange = (java.lang.String)request.getAttribute("alloy:rating:afterHiddenInputChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:rating:afterHideClassChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:rating:afterIdChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:rating:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:rating:afterInitializedChange");
java.lang.String _afterInputNameChange = (java.lang.String)request.getAttribute("alloy:rating:afterInputNameChange");
java.lang.String _afterItemClick = (java.lang.String)request.getAttribute("alloy:rating:afterItemClick");
java.lang.String _afterItemOut = (java.lang.String)request.getAttribute("alloy:rating:afterItemOut");
java.lang.String _afterItemSelect = (java.lang.String)request.getAttribute("alloy:rating:afterItemSelect");
java.lang.String _afterLabelChange = (java.lang.String)request.getAttribute("alloy:rating:afterLabelChange");
java.lang.String _afterLabelNodeChange = (java.lang.String)request.getAttribute("alloy:rating:afterLabelNodeChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:rating:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:rating:afterRenderedChange");
java.lang.String _afterSelectedIndexChange = (java.lang.String)request.getAttribute("alloy:rating:afterSelectedIndexChange");
java.lang.String _afterShowTitleChange = (java.lang.String)request.getAttribute("alloy:rating:afterShowTitleChange");
java.lang.String _afterSizeChange = (java.lang.String)request.getAttribute("alloy:rating:afterSizeChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:rating:afterSrcNodeChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:rating:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:rating:afterTabIndexChange");
java.lang.String _afterTitleChange = (java.lang.String)request.getAttribute("alloy:rating:afterTitleChange");
java.lang.String _afterValueChange = (java.lang.String)request.getAttribute("alloy:rating:afterValueChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:rating:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:rating:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:rating:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:rating:afterWidthChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:rating:onBoundingBoxChange");
java.lang.String _onCanResetChange = (java.lang.String)request.getAttribute("alloy:rating:onCanResetChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:rating:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:rating:onCssClassChange");
java.lang.String _onDefaultSelectedChange = (java.lang.String)request.getAttribute("alloy:rating:onDefaultSelectedChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:rating:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:rating:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:rating:onDisabledChange");
java.lang.String _onElementsChange = (java.lang.String)request.getAttribute("alloy:rating:onElementsChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:rating:onFocusedChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:rating:onHeightChange");
java.lang.String _onHiddenInputChange = (java.lang.String)request.getAttribute("alloy:rating:onHiddenInputChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:rating:onHideClassChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:rating:onIdChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:rating:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:rating:onInitializedChange");
java.lang.String _onInputNameChange = (java.lang.String)request.getAttribute("alloy:rating:onInputNameChange");
java.lang.String _onItemClick = (java.lang.String)request.getAttribute("alloy:rating:onItemClick");
java.lang.String _onItemOut = (java.lang.String)request.getAttribute("alloy:rating:onItemOut");
java.lang.String _onItemSelect = (java.lang.String)request.getAttribute("alloy:rating:onItemSelect");
java.lang.String _onLabelChange = (java.lang.String)request.getAttribute("alloy:rating:onLabelChange");
java.lang.String _onLabelNodeChange = (java.lang.String)request.getAttribute("alloy:rating:onLabelNodeChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:rating:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:rating:onRenderedChange");
java.lang.String _onSelectedIndexChange = (java.lang.String)request.getAttribute("alloy:rating:onSelectedIndexChange");
java.lang.String _onShowTitleChange = (java.lang.String)request.getAttribute("alloy:rating:onShowTitleChange");
java.lang.String _onSizeChange = (java.lang.String)request.getAttribute("alloy:rating:onSizeChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:rating:onSrcNodeChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:rating:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:rating:onTabIndexChange");
java.lang.String _onTitleChange = (java.lang.String)request.getAttribute("alloy:rating:onTitleChange");
java.lang.String _onValueChange = (java.lang.String)request.getAttribute("alloy:rating:onValueChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:rating:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:rating:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:rating:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:rating:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_boundingBox != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (_canReset != null) {
	scopedAttributes.put("canReset", _canReset);
}

if (_contentBox != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (_cssClass != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (_defaultSelected != null) {
	scopedAttributes.put("defaultSelected", _defaultSelected);
}

if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_disabled != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (_elements != null) {
	scopedAttributes.put("elements", _elements);
}

if (_focused != null) {
	scopedAttributes.put("focused", _focused);
}

if (_height != null) {
	scopedAttributes.put("height", _height);
}

if (_hiddenInput != null) {
	scopedAttributes.put("hiddenInput", _hiddenInput);
}

if (_hideClass != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (_ratingId != null) {
	scopedAttributes.put("ratingId", _ratingId);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_inputName != null) {
	scopedAttributes.put("inputName", _inputName);
}

if (_label != null) {
	scopedAttributes.put("label", _label);
}

if (_labelNode != null) {
	scopedAttributes.put("labelNode", _labelNode);
}

if (_render != null) {
	scopedAttributes.put("render", _render);
}

if (_rendered != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (_selectedIndex != null) {
	scopedAttributes.put("selectedIndex", _selectedIndex);
}

if (_showTitle != null) {
	scopedAttributes.put("showTitle", _showTitle);
}

if (_size != null) {
	scopedAttributes.put("size", _size);
}

if (_srcNode != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (_strings != null) {
	scopedAttributes.put("strings", _strings);
}

if (_tabIndex != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (_title != null) {
	scopedAttributes.put("title", _title);
}

if (_ratingValue != null) {
	scopedAttributes.put("ratingValue", _ratingValue);
}

if (_visible != null) {
	scopedAttributes.put("visible", _visible);
}

if (_width != null) {
	scopedAttributes.put("width", _width);
}

if (_afterBoundingBoxChange != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (_afterCanResetChange != null) {
	scopedAttributes.put("afterCanResetChange", _afterCanResetChange);
}

if (_afterContentBoxChange != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (_afterCssClassChange != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (_afterDefaultSelectedChange != null) {
	scopedAttributes.put("afterDefaultSelectedChange", _afterDefaultSelectedChange);
}

if (_afterDestroy != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (_afterDestroyedChange != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (_afterDisabledChange != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (_afterElementsChange != null) {
	scopedAttributes.put("afterElementsChange", _afterElementsChange);
}

if (_afterFocusedChange != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (_afterHeightChange != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (_afterHiddenInputChange != null) {
	scopedAttributes.put("afterHiddenInputChange", _afterHiddenInputChange);
}

if (_afterHideClassChange != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (_afterIdChange != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (_afterInit != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (_afterInitializedChange != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (_afterInputNameChange != null) {
	scopedAttributes.put("afterInputNameChange", _afterInputNameChange);
}

if (_afterItemClick != null) {
	scopedAttributes.put("afterItemClick", _afterItemClick);
}

if (_afterItemOut != null) {
	scopedAttributes.put("afterItemOut", _afterItemOut);
}

if (_afterItemSelect != null) {
	scopedAttributes.put("afterItemSelect", _afterItemSelect);
}

if (_afterLabelChange != null) {
	scopedAttributes.put("afterLabelChange", _afterLabelChange);
}

if (_afterLabelNodeChange != null) {
	scopedAttributes.put("afterLabelNodeChange", _afterLabelNodeChange);
}

if (_afterRenderChange != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (_afterRenderedChange != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (_afterSelectedIndexChange != null) {
	scopedAttributes.put("afterSelectedIndexChange", _afterSelectedIndexChange);
}

if (_afterShowTitleChange != null) {
	scopedAttributes.put("afterShowTitleChange", _afterShowTitleChange);
}

if (_afterSizeChange != null) {
	scopedAttributes.put("afterSizeChange", _afterSizeChange);
}

if (_afterSrcNodeChange != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (_afterStringsChange != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (_afterTabIndexChange != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (_afterTitleChange != null) {
	scopedAttributes.put("afterTitleChange", _afterTitleChange);
}

if (_afterValueChange != null) {
	scopedAttributes.put("afterValueChange", _afterValueChange);
}

if (_afterVisibleChange != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (_afterContentUpdate != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (_afterRender != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (_afterWidthChange != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (_onBoundingBoxChange != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (_onCanResetChange != null) {
	scopedAttributes.put("onCanResetChange", _onCanResetChange);
}

if (_onContentBoxChange != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (_onCssClassChange != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (_onDefaultSelectedChange != null) {
	scopedAttributes.put("onDefaultSelectedChange", _onDefaultSelectedChange);
}

if (_onDestroy != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (_onDestroyedChange != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (_onDisabledChange != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (_onElementsChange != null) {
	scopedAttributes.put("onElementsChange", _onElementsChange);
}

if (_onFocusedChange != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (_onHeightChange != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (_onHiddenInputChange != null) {
	scopedAttributes.put("onHiddenInputChange", _onHiddenInputChange);
}

if (_onHideClassChange != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (_onIdChange != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (_onInit != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (_onInitializedChange != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (_onInputNameChange != null) {
	scopedAttributes.put("onInputNameChange", _onInputNameChange);
}

if (_onItemClick != null) {
	scopedAttributes.put("onItemClick", _onItemClick);
}

if (_onItemOut != null) {
	scopedAttributes.put("onItemOut", _onItemOut);
}

if (_onItemSelect != null) {
	scopedAttributes.put("onItemSelect", _onItemSelect);
}

if (_onLabelChange != null) {
	scopedAttributes.put("onLabelChange", _onLabelChange);
}

if (_onLabelNodeChange != null) {
	scopedAttributes.put("onLabelNodeChange", _onLabelNodeChange);
}

if (_onRenderChange != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (_onRenderedChange != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (_onSelectedIndexChange != null) {
	scopedAttributes.put("onSelectedIndexChange", _onSelectedIndexChange);
}

if (_onShowTitleChange != null) {
	scopedAttributes.put("onShowTitleChange", _onShowTitleChange);
}

if (_onSizeChange != null) {
	scopedAttributes.put("onSizeChange", _onSizeChange);
}

if (_onSrcNodeChange != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (_onStringsChange != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (_onTabIndexChange != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (_onTitleChange != null) {
	scopedAttributes.put("onTitleChange", _onTitleChange);
}

if (_onValueChange != null) {
	scopedAttributes.put("onValueChange", _onValueChange);
}

if (_onVisibleChange != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (_onContentUpdate != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (_onRender != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (_onWidthChange != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>