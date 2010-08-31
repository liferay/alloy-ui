<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:rating:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:rating:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:rating:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:rating:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:rating:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.lang.Boolean _canReset = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:rating:canReset"), true);
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
_updateOptions(options, "boundingBox", _boundingBox);
_updateOptions(options, "canReset", _canReset);
_updateOptions(options, "contentBox", _contentBox);
_updateOptions(options, "cssClass", _cssClass);
_updateOptions(options, "defaultSelected", _defaultSelected);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "disabled", _disabled);
_updateOptions(options, "elements", _elements);
_updateOptions(options, "focused", _focused);
_updateOptions(options, "height", _height);
_updateOptions(options, "hiddenInput", _hiddenInput);
_updateOptions(options, "hideClass", _hideClass);
_updateOptions(options, "ratingId", _ratingId);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "inputName", _inputName);
_updateOptions(options, "label", _label);
_updateOptions(options, "labelNode", _labelNode);
_updateOptions(options, "render", _render);
_updateOptions(options, "rendered", _rendered);
_updateOptions(options, "selectedIndex", _selectedIndex);
_updateOptions(options, "showTitle", _showTitle);
_updateOptions(options, "size", _size);
_updateOptions(options, "srcNode", _srcNode);
_updateOptions(options, "strings", _strings);
_updateOptions(options, "tabIndex", _tabIndex);
_updateOptions(options, "title", _title);
_updateOptions(options, "ratingValue", _ratingValue);
_updateOptions(options, "visible", _visible);
_updateOptions(options, "width", _width);
_updateOptions(options, "afterBoundingBoxChange", _afterBoundingBoxChange);
_updateOptions(options, "afterCanResetChange", _afterCanResetChange);
_updateOptions(options, "afterContentBoxChange", _afterContentBoxChange);
_updateOptions(options, "afterCssClassChange", _afterCssClassChange);
_updateOptions(options, "afterDefaultSelectedChange", _afterDefaultSelectedChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterDisabledChange", _afterDisabledChange);
_updateOptions(options, "afterElementsChange", _afterElementsChange);
_updateOptions(options, "afterFocusedChange", _afterFocusedChange);
_updateOptions(options, "afterHeightChange", _afterHeightChange);
_updateOptions(options, "afterHiddenInputChange", _afterHiddenInputChange);
_updateOptions(options, "afterHideClassChange", _afterHideClassChange);
_updateOptions(options, "afterIdChange", _afterIdChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterInputNameChange", _afterInputNameChange);
_updateOptions(options, "afterItemClick", _afterItemClick);
_updateOptions(options, "afterItemOut", _afterItemOut);
_updateOptions(options, "afterItemSelect", _afterItemSelect);
_updateOptions(options, "afterLabelChange", _afterLabelChange);
_updateOptions(options, "afterLabelNodeChange", _afterLabelNodeChange);
_updateOptions(options, "afterRenderChange", _afterRenderChange);
_updateOptions(options, "afterRenderedChange", _afterRenderedChange);
_updateOptions(options, "afterSelectedIndexChange", _afterSelectedIndexChange);
_updateOptions(options, "afterShowTitleChange", _afterShowTitleChange);
_updateOptions(options, "afterSizeChange", _afterSizeChange);
_updateOptions(options, "afterSrcNodeChange", _afterSrcNodeChange);
_updateOptions(options, "afterStringsChange", _afterStringsChange);
_updateOptions(options, "afterTabIndexChange", _afterTabIndexChange);
_updateOptions(options, "afterTitleChange", _afterTitleChange);
_updateOptions(options, "afterValueChange", _afterValueChange);
_updateOptions(options, "afterVisibleChange", _afterVisibleChange);
_updateOptions(options, "afterContentUpdate", _afterContentUpdate);
_updateOptions(options, "afterRender", _afterRender);
_updateOptions(options, "afterWidthChange", _afterWidthChange);
_updateOptions(options, "onBoundingBoxChange", _onBoundingBoxChange);
_updateOptions(options, "onCanResetChange", _onCanResetChange);
_updateOptions(options, "onContentBoxChange", _onContentBoxChange);
_updateOptions(options, "onCssClassChange", _onCssClassChange);
_updateOptions(options, "onDefaultSelectedChange", _onDefaultSelectedChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onDisabledChange", _onDisabledChange);
_updateOptions(options, "onElementsChange", _onElementsChange);
_updateOptions(options, "onFocusedChange", _onFocusedChange);
_updateOptions(options, "onHeightChange", _onHeightChange);
_updateOptions(options, "onHiddenInputChange", _onHiddenInputChange);
_updateOptions(options, "onHideClassChange", _onHideClassChange);
_updateOptions(options, "onIdChange", _onIdChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onInputNameChange", _onInputNameChange);
_updateOptions(options, "onItemClick", _onItemClick);
_updateOptions(options, "onItemOut", _onItemOut);
_updateOptions(options, "onItemSelect", _onItemSelect);
_updateOptions(options, "onLabelChange", _onLabelChange);
_updateOptions(options, "onLabelNodeChange", _onLabelNodeChange);
_updateOptions(options, "onRenderChange", _onRenderChange);
_updateOptions(options, "onRenderedChange", _onRenderedChange);
_updateOptions(options, "onSelectedIndexChange", _onSelectedIndexChange);
_updateOptions(options, "onShowTitleChange", _onShowTitleChange);
_updateOptions(options, "onSizeChange", _onSizeChange);
_updateOptions(options, "onSrcNodeChange", _onSrcNodeChange);
_updateOptions(options, "onStringsChange", _onStringsChange);
_updateOptions(options, "onTabIndexChange", _onTabIndexChange);
_updateOptions(options, "onTitleChange", _onTitleChange);
_updateOptions(options, "onValueChange", _onValueChange);
_updateOptions(options, "onVisibleChange", _onVisibleChange);
_updateOptions(options, "onContentUpdate", _onContentUpdate);
_updateOptions(options, "onRender", _onRender);
_updateOptions(options, "onWidthChange", _onWidthChange);
%>