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

java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:boundingBox"));
java.lang.Boolean _canReset = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:canReset"), true);
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:cssClass"));
java.lang.Number _defaultSelected = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:thumb-rating:defaultSelected"), 0);
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:disabled"), false);
java.lang.String _elements = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:elements"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:focused"), false);
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:height"));
java.lang.String _hiddenInput = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:hiddenInput"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:hideClass"), "aui-helper-hidden");
java.lang.String _thumbratingId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:thumbratingId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:initialized"), false);
java.lang.String _inputName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:inputName"));
java.lang.String _label = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:label"));
java.lang.String _labelNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:labelNode"));
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:rendered"), false);
java.lang.Number _selectedIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:thumb-rating:selectedIndex"), -1);
java.lang.Boolean _showTitle = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:showTitle"), true);
java.lang.Number _size = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:thumb-rating:size"), 2);
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:srcNode"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:thumb-rating:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:thumb-rating:tabIndex"), 0);
java.lang.String _title = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:title"));
java.lang.String _thumbratingValue = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:thumbratingValue"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:thumb-rating:visible"), true);
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:width"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterBoundingBoxChange"));
java.lang.String _afterCanResetChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterCanResetChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterCssClassChange"));
java.lang.String _afterDefaultSelectedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterDefaultSelectedChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterDisabledChange"));
java.lang.String _afterElementsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterElementsChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterFocusedChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterHeightChange"));
java.lang.String _afterHiddenInputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterHiddenInputChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterHideClassChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterInitializedChange"));
java.lang.String _afterInputNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterInputNameChange"));
java.lang.String _afterItemClick = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterItemClick"));
java.lang.String _afterItemOut = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterItemOut"));
java.lang.String _afterItemSelect = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterItemSelect"));
java.lang.String _afterLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterLabelChange"));
java.lang.String _afterLabelNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterLabelNodeChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterRenderedChange"));
java.lang.String _afterSelectedIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterSelectedIndexChange"));
java.lang.String _afterShowTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterShowTitleChange"));
java.lang.String _afterSizeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterSizeChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterSrcNodeChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterTabIndexChange"));
java.lang.String _afterTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterTitleChange"));
java.lang.String _afterValueChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterValueChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:afterWidthChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onBoundingBoxChange"));
java.lang.String _onCanResetChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onCanResetChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onCssClassChange"));
java.lang.String _onDefaultSelectedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onDefaultSelectedChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onDisabledChange"));
java.lang.String _onElementsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onElementsChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onFocusedChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onHeightChange"));
java.lang.String _onHiddenInputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onHiddenInputChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onHideClassChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onInitializedChange"));
java.lang.String _onInputNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onInputNameChange"));
java.lang.String _onItemClick = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onItemClick"));
java.lang.String _onItemOut = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onItemOut"));
java.lang.String _onItemSelect = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onItemSelect"));
java.lang.String _onLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onLabelChange"));
java.lang.String _onLabelNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onLabelNodeChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onRenderedChange"));
java.lang.String _onSelectedIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onSelectedIndexChange"));
java.lang.String _onShowTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onShowTitleChange"));
java.lang.String _onSizeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onSizeChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onSrcNodeChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onTabIndexChange"));
java.lang.String _onTitleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onTitleChange"));
java.lang.String _onValueChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onValueChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:thumb-rating:onWidthChange"));
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