<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:textboxlist:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:textboxlist:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:textboxlist:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Boolean _alwaysShowContainer = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:alwaysShowContainer"), false);
java.lang.Boolean _applyLocalFilter = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:applyLocalFilter"), true);
java.lang.Boolean _autoHighlight = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:autoHighlight"), true);
java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:textboxlist:boundingBox");
java.lang.Boolean _button = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:button"), true);
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:textboxlist:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:textboxlist:cssClass");
java.lang.Object _dataSource = (java.lang.Object)request.getAttribute("alloy:textboxlist:dataSource");
java.lang.Object _dataSourceType = (java.lang.Object)request.getAttribute("alloy:textboxlist:dataSourceType");
java.lang.Object _delimChar = (java.lang.Object)request.getAttribute("alloy:textboxlist:delimChar");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:disabled"), false);
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:focused"), false);
java.lang.Boolean _forceSelection = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:forceSelection"), false);
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:textboxlist:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:textboxlist:hideClass");
java.lang.Object _textboxlistId = (java.lang.Object)request.getAttribute("alloy:textboxlist:textboxlistId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:initialized"), false);
java.lang.Object _input = (java.lang.Object)request.getAttribute("alloy:textboxlist:input");
java.lang.Object _matchKey = (java.lang.Object)request.getAttribute("alloy:textboxlist:matchKey");
java.lang.Number _maxResultsDisplayed = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:textboxlist:maxResultsDisplayed"), 10);
java.lang.Number _minQueryLength = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:textboxlist:minQueryLength"), 1);
java.lang.Number _queryDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:textboxlist:queryDelay"), 0.2);
java.lang.Number _queryInterval = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:textboxlist:queryInterval"), 0.5);
java.lang.Boolean _queryMatchCase = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:queryMatchCase"), false);
java.lang.Boolean _queryMatchContains = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:queryMatchContains"), false);
java.lang.Boolean _queryQuestionMark = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:queryQuestionMark"), true);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:rendered"), false);
java.lang.Object _schema = (java.lang.Object)request.getAttribute("alloy:textboxlist:schema");
java.lang.Object _schemaType = (java.lang.Object)request.getAttribute("alloy:textboxlist:schemaType");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:textboxlist:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:textboxlist:strings");
java.lang.Boolean _suppressInputUpdate = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:suppressInputUpdate"), false);
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:textboxlist:tabIndex"), 0);
java.lang.Boolean _typeAhead = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:typeAhead"), false);
java.lang.Number _typeAheadDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:textboxlist:typeAheadDelay"), 0.2);
java.lang.Object _uniqueName = (java.lang.Object)request.getAttribute("alloy:textboxlist:uniqueName");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:textboxlist:width");
java.lang.Object _afterAlwaysShowContainerChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterAlwaysShowContainerChange");
java.lang.Object _afterApplyLocalFilterChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterApplyLocalFilterChange");
java.lang.Object _afterAutoHighlightChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterAutoHighlightChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterBoundingBoxChange");
java.lang.Object _afterButtonChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterButtonChange");
java.lang.Object _afterContainerCollapse = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterContainerCollapse");
java.lang.Object _afterContainerExpand = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterContainerExpand");
java.lang.Object _afterContainerPopulate = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterContainerPopulate");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterCssClassChange");
java.lang.Object _afterDataError = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterDataError");
java.lang.Object _afterDataRequest = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterDataRequest");
java.lang.Object _afterDataReturn = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterDataReturn");
java.lang.Object _afterDataSourceChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterDataSourceChange");
java.lang.Object _afterDataSourceTypeChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterDataSourceTypeChange");
java.lang.Object _afterDelimCharChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterDelimCharChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterDisabledChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterFocusedChange");
java.lang.Object _afterForceSelectionChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterForceSelectionChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterHideClassChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterInitializedChange");
java.lang.Object _afterInputChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterInputChange");
java.lang.Object _afterItemArrowFrom = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterItemArrowFrom");
java.lang.Object _afterItemArrowTo = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterItemArrowTo");
java.lang.Object _afterItemMouseOut = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterItemMouseOut");
java.lang.Object _afterItemMouseOver = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterItemMouseOver");
java.lang.Object _afterItemSelect = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterItemSelect");
java.lang.Object _afterMatchKeyChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterMatchKeyChange");
java.lang.Object _afterMaxResultsDisplayedChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterMaxResultsDisplayedChange");
java.lang.Object _afterMinQueryLengthChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterMinQueryLengthChange");
java.lang.Object _afterQueryDelayChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterQueryDelayChange");
java.lang.Object _afterQueryIntervalChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterQueryIntervalChange");
java.lang.Object _afterQueryMatchCaseChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterQueryMatchCaseChange");
java.lang.Object _afterQueryMatchContainsChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterQueryMatchContainsChange");
java.lang.Object _afterQueryQuestionMarkChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterQueryQuestionMarkChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterRenderedChange");
java.lang.Object _afterSchemaChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterSchemaChange");
java.lang.Object _afterSchemaTypeChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterSchemaTypeChange");
java.lang.Object _afterSelectionEnforce = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterSelectionEnforce");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterStringsChange");
java.lang.Object _afterSuppressInputUpdateChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterSuppressInputUpdateChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterTabIndexChange");
java.lang.Object _afterTextboxBlur = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterTextboxBlur");
java.lang.Object _afterTextboxChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterTextboxChange");
java.lang.Object _afterTextboxFocus = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterTextboxFocus");
java.lang.Object _afterTextboxKey = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterTextboxKey");
java.lang.Object _afterTypeAhead = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterTypeAhead");
java.lang.Object _afterTypeAheadChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterTypeAheadChange");
java.lang.Object _afterTypeAheadDelayChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterTypeAheadDelayChange");
java.lang.Object _afterUniqueNameChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterUniqueNameChange");
java.lang.Object _afterUnmatchedItemSelect = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterUnmatchedItemSelect");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:afterWidthChange");
java.lang.Object _onAlwaysShowContainerChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onAlwaysShowContainerChange");
java.lang.Object _onApplyLocalFilterChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onApplyLocalFilterChange");
java.lang.Object _onAutoHighlightChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onAutoHighlightChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onBoundingBoxChange");
java.lang.Object _onButtonChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onButtonChange");
java.lang.Object _onContainerCollapse = (java.lang.Object)request.getAttribute("alloy:textboxlist:onContainerCollapse");
java.lang.Object _onContainerExpand = (java.lang.Object)request.getAttribute("alloy:textboxlist:onContainerExpand");
java.lang.Object _onContainerPopulate = (java.lang.Object)request.getAttribute("alloy:textboxlist:onContainerPopulate");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onCssClassChange");
java.lang.Object _onDataError = (java.lang.Object)request.getAttribute("alloy:textboxlist:onDataError");
java.lang.Object _onDataRequest = (java.lang.Object)request.getAttribute("alloy:textboxlist:onDataRequest");
java.lang.Object _onDataReturn = (java.lang.Object)request.getAttribute("alloy:textboxlist:onDataReturn");
java.lang.Object _onDataSourceChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onDataSourceChange");
java.lang.Object _onDataSourceTypeChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onDataSourceTypeChange");
java.lang.Object _onDelimCharChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onDelimCharChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:textboxlist:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onDisabledChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onFocusedChange");
java.lang.Object _onForceSelectionChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onForceSelectionChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onHideClassChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:textboxlist:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onInitializedChange");
java.lang.Object _onInputChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onInputChange");
java.lang.Object _onItemArrowFrom = (java.lang.Object)request.getAttribute("alloy:textboxlist:onItemArrowFrom");
java.lang.Object _onItemArrowTo = (java.lang.Object)request.getAttribute("alloy:textboxlist:onItemArrowTo");
java.lang.Object _onItemMouseOut = (java.lang.Object)request.getAttribute("alloy:textboxlist:onItemMouseOut");
java.lang.Object _onItemMouseOver = (java.lang.Object)request.getAttribute("alloy:textboxlist:onItemMouseOver");
java.lang.Object _onItemSelect = (java.lang.Object)request.getAttribute("alloy:textboxlist:onItemSelect");
java.lang.Object _onMatchKeyChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onMatchKeyChange");
java.lang.Object _onMaxResultsDisplayedChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onMaxResultsDisplayedChange");
java.lang.Object _onMinQueryLengthChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onMinQueryLengthChange");
java.lang.Object _onQueryDelayChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onQueryDelayChange");
java.lang.Object _onQueryIntervalChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onQueryIntervalChange");
java.lang.Object _onQueryMatchCaseChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onQueryMatchCaseChange");
java.lang.Object _onQueryMatchContainsChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onQueryMatchContainsChange");
java.lang.Object _onQueryQuestionMarkChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onQueryQuestionMarkChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onRenderedChange");
java.lang.Object _onSchemaChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onSchemaChange");
java.lang.Object _onSchemaTypeChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onSchemaTypeChange");
java.lang.Object _onSelectionEnforce = (java.lang.Object)request.getAttribute("alloy:textboxlist:onSelectionEnforce");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onStringsChange");
java.lang.Object _onSuppressInputUpdateChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onSuppressInputUpdateChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onTabIndexChange");
java.lang.Object _onTextboxBlur = (java.lang.Object)request.getAttribute("alloy:textboxlist:onTextboxBlur");
java.lang.Object _onTextboxChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onTextboxChange");
java.lang.Object _onTextboxFocus = (java.lang.Object)request.getAttribute("alloy:textboxlist:onTextboxFocus");
java.lang.Object _onTextboxKey = (java.lang.Object)request.getAttribute("alloy:textboxlist:onTextboxKey");
java.lang.Object _onTypeAhead = (java.lang.Object)request.getAttribute("alloy:textboxlist:onTypeAhead");
java.lang.Object _onTypeAheadChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onTypeAheadChange");
java.lang.Object _onTypeAheadDelayChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onTypeAheadDelayChange");
java.lang.Object _onUniqueNameChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onUniqueNameChange");
java.lang.Object _onUnmatchedItemSelect = (java.lang.Object)request.getAttribute("alloy:textboxlist:onUnmatchedItemSelect");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:textboxlist:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:textboxlist:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:textboxlist:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:textboxlist:alwaysShowContainer") != null) {
	scopedAttributes.put("alwaysShowContainer", _alwaysShowContainer);
}

if (request.getAttribute("alloy:textboxlist:applyLocalFilter") != null) {
	scopedAttributes.put("applyLocalFilter", _applyLocalFilter);
}

if (request.getAttribute("alloy:textboxlist:autoHighlight") != null) {
	scopedAttributes.put("autoHighlight", _autoHighlight);
}

if (request.getAttribute("alloy:textboxlist:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:textboxlist:button") != null) {
	scopedAttributes.put("button", _button);
}

if (request.getAttribute("alloy:textboxlist:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:textboxlist:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:textboxlist:dataSource") != null) {
	scopedAttributes.put("dataSource", _dataSource);
}

if (request.getAttribute("alloy:textboxlist:dataSourceType") != null) {
	scopedAttributes.put("dataSourceType", _dataSourceType);
}

if (request.getAttribute("alloy:textboxlist:delimChar") != null) {
	scopedAttributes.put("delimChar", _delimChar);
}

if (request.getAttribute("alloy:textboxlist:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:textboxlist:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:textboxlist:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:textboxlist:forceSelection") != null) {
	scopedAttributes.put("forceSelection", _forceSelection);
}

if (request.getAttribute("alloy:textboxlist:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:textboxlist:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:textboxlist:textboxlistId") != null) {
	scopedAttributes.put("textboxlistId", _textboxlistId);
}

if (request.getAttribute("alloy:textboxlist:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:textboxlist:input") != null) {
	scopedAttributes.put("input", _input);
}

if (request.getAttribute("alloy:textboxlist:matchKey") != null) {
	scopedAttributes.put("matchKey", _matchKey);
}

if (request.getAttribute("alloy:textboxlist:maxResultsDisplayed") != null) {
	scopedAttributes.put("maxResultsDisplayed", _maxResultsDisplayed);
}

if (request.getAttribute("alloy:textboxlist:minQueryLength") != null) {
	scopedAttributes.put("minQueryLength", _minQueryLength);
}

if (request.getAttribute("alloy:textboxlist:queryDelay") != null) {
	scopedAttributes.put("queryDelay", _queryDelay);
}

if (request.getAttribute("alloy:textboxlist:queryInterval") != null) {
	scopedAttributes.put("queryInterval", _queryInterval);
}

if (request.getAttribute("alloy:textboxlist:queryMatchCase") != null) {
	scopedAttributes.put("queryMatchCase", _queryMatchCase);
}

if (request.getAttribute("alloy:textboxlist:queryMatchContains") != null) {
	scopedAttributes.put("queryMatchContains", _queryMatchContains);
}

if (request.getAttribute("alloy:textboxlist:queryQuestionMark") != null) {
	scopedAttributes.put("queryQuestionMark", _queryQuestionMark);
}

if (request.getAttribute("alloy:textboxlist:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:textboxlist:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:textboxlist:schema") != null) {
	scopedAttributes.put("schema", _schema);
}

if (request.getAttribute("alloy:textboxlist:schemaType") != null) {
	scopedAttributes.put("schemaType", _schemaType);
}

if (request.getAttribute("alloy:textboxlist:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:textboxlist:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:textboxlist:suppressInputUpdate") != null) {
	scopedAttributes.put("suppressInputUpdate", _suppressInputUpdate);
}

if (request.getAttribute("alloy:textboxlist:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:textboxlist:typeAhead") != null) {
	scopedAttributes.put("typeAhead", _typeAhead);
}

if (request.getAttribute("alloy:textboxlist:typeAheadDelay") != null) {
	scopedAttributes.put("typeAheadDelay", _typeAheadDelay);
}

if (request.getAttribute("alloy:textboxlist:uniqueName") != null) {
	scopedAttributes.put("uniqueName", _uniqueName);
}

if (request.getAttribute("alloy:textboxlist:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:textboxlist:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:textboxlist:afterAlwaysShowContainerChange") != null) {
	scopedAttributes.put("afterAlwaysShowContainerChange", _afterAlwaysShowContainerChange);
}

if (request.getAttribute("alloy:textboxlist:afterApplyLocalFilterChange") != null) {
	scopedAttributes.put("afterApplyLocalFilterChange", _afterApplyLocalFilterChange);
}

if (request.getAttribute("alloy:textboxlist:afterAutoHighlightChange") != null) {
	scopedAttributes.put("afterAutoHighlightChange", _afterAutoHighlightChange);
}

if (request.getAttribute("alloy:textboxlist:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:textboxlist:afterButtonChange") != null) {
	scopedAttributes.put("afterButtonChange", _afterButtonChange);
}

if (request.getAttribute("alloy:textboxlist:afterContainerCollapse") != null) {
	scopedAttributes.put("afterContainerCollapse", _afterContainerCollapse);
}

if (request.getAttribute("alloy:textboxlist:afterContainerExpand") != null) {
	scopedAttributes.put("afterContainerExpand", _afterContainerExpand);
}

if (request.getAttribute("alloy:textboxlist:afterContainerPopulate") != null) {
	scopedAttributes.put("afterContainerPopulate", _afterContainerPopulate);
}

if (request.getAttribute("alloy:textboxlist:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:textboxlist:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:textboxlist:afterDataError") != null) {
	scopedAttributes.put("afterDataError", _afterDataError);
}

if (request.getAttribute("alloy:textboxlist:afterDataRequest") != null) {
	scopedAttributes.put("afterDataRequest", _afterDataRequest);
}

if (request.getAttribute("alloy:textboxlist:afterDataReturn") != null) {
	scopedAttributes.put("afterDataReturn", _afterDataReturn);
}

if (request.getAttribute("alloy:textboxlist:afterDataSourceChange") != null) {
	scopedAttributes.put("afterDataSourceChange", _afterDataSourceChange);
}

if (request.getAttribute("alloy:textboxlist:afterDataSourceTypeChange") != null) {
	scopedAttributes.put("afterDataSourceTypeChange", _afterDataSourceTypeChange);
}

if (request.getAttribute("alloy:textboxlist:afterDelimCharChange") != null) {
	scopedAttributes.put("afterDelimCharChange", _afterDelimCharChange);
}

if (request.getAttribute("alloy:textboxlist:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:textboxlist:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:textboxlist:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:textboxlist:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:textboxlist:afterForceSelectionChange") != null) {
	scopedAttributes.put("afterForceSelectionChange", _afterForceSelectionChange);
}

if (request.getAttribute("alloy:textboxlist:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:textboxlist:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:textboxlist:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:textboxlist:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:textboxlist:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:textboxlist:afterInputChange") != null) {
	scopedAttributes.put("afterInputChange", _afterInputChange);
}

if (request.getAttribute("alloy:textboxlist:afterItemArrowFrom") != null) {
	scopedAttributes.put("afterItemArrowFrom", _afterItemArrowFrom);
}

if (request.getAttribute("alloy:textboxlist:afterItemArrowTo") != null) {
	scopedAttributes.put("afterItemArrowTo", _afterItemArrowTo);
}

if (request.getAttribute("alloy:textboxlist:afterItemMouseOut") != null) {
	scopedAttributes.put("afterItemMouseOut", _afterItemMouseOut);
}

if (request.getAttribute("alloy:textboxlist:afterItemMouseOver") != null) {
	scopedAttributes.put("afterItemMouseOver", _afterItemMouseOver);
}

if (request.getAttribute("alloy:textboxlist:afterItemSelect") != null) {
	scopedAttributes.put("afterItemSelect", _afterItemSelect);
}

if (request.getAttribute("alloy:textboxlist:afterMatchKeyChange") != null) {
	scopedAttributes.put("afterMatchKeyChange", _afterMatchKeyChange);
}

if (request.getAttribute("alloy:textboxlist:afterMaxResultsDisplayedChange") != null) {
	scopedAttributes.put("afterMaxResultsDisplayedChange", _afterMaxResultsDisplayedChange);
}

if (request.getAttribute("alloy:textboxlist:afterMinQueryLengthChange") != null) {
	scopedAttributes.put("afterMinQueryLengthChange", _afterMinQueryLengthChange);
}

if (request.getAttribute("alloy:textboxlist:afterQueryDelayChange") != null) {
	scopedAttributes.put("afterQueryDelayChange", _afterQueryDelayChange);
}

if (request.getAttribute("alloy:textboxlist:afterQueryIntervalChange") != null) {
	scopedAttributes.put("afterQueryIntervalChange", _afterQueryIntervalChange);
}

if (request.getAttribute("alloy:textboxlist:afterQueryMatchCaseChange") != null) {
	scopedAttributes.put("afterQueryMatchCaseChange", _afterQueryMatchCaseChange);
}

if (request.getAttribute("alloy:textboxlist:afterQueryMatchContainsChange") != null) {
	scopedAttributes.put("afterQueryMatchContainsChange", _afterQueryMatchContainsChange);
}

if (request.getAttribute("alloy:textboxlist:afterQueryQuestionMarkChange") != null) {
	scopedAttributes.put("afterQueryQuestionMarkChange", _afterQueryQuestionMarkChange);
}

if (request.getAttribute("alloy:textboxlist:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:textboxlist:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:textboxlist:afterSchemaChange") != null) {
	scopedAttributes.put("afterSchemaChange", _afterSchemaChange);
}

if (request.getAttribute("alloy:textboxlist:afterSchemaTypeChange") != null) {
	scopedAttributes.put("afterSchemaTypeChange", _afterSchemaTypeChange);
}

if (request.getAttribute("alloy:textboxlist:afterSelectionEnforce") != null) {
	scopedAttributes.put("afterSelectionEnforce", _afterSelectionEnforce);
}

if (request.getAttribute("alloy:textboxlist:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:textboxlist:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:textboxlist:afterSuppressInputUpdateChange") != null) {
	scopedAttributes.put("afterSuppressInputUpdateChange", _afterSuppressInputUpdateChange);
}

if (request.getAttribute("alloy:textboxlist:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:textboxlist:afterTextboxBlur") != null) {
	scopedAttributes.put("afterTextboxBlur", _afterTextboxBlur);
}

if (request.getAttribute("alloy:textboxlist:afterTextboxChange") != null) {
	scopedAttributes.put("afterTextboxChange", _afterTextboxChange);
}

if (request.getAttribute("alloy:textboxlist:afterTextboxFocus") != null) {
	scopedAttributes.put("afterTextboxFocus", _afterTextboxFocus);
}

if (request.getAttribute("alloy:textboxlist:afterTextboxKey") != null) {
	scopedAttributes.put("afterTextboxKey", _afterTextboxKey);
}

if (request.getAttribute("alloy:textboxlist:afterTypeAhead") != null) {
	scopedAttributes.put("afterTypeAhead", _afterTypeAhead);
}

if (request.getAttribute("alloy:textboxlist:afterTypeAheadChange") != null) {
	scopedAttributes.put("afterTypeAheadChange", _afterTypeAheadChange);
}

if (request.getAttribute("alloy:textboxlist:afterTypeAheadDelayChange") != null) {
	scopedAttributes.put("afterTypeAheadDelayChange", _afterTypeAheadDelayChange);
}

if (request.getAttribute("alloy:textboxlist:afterUniqueNameChange") != null) {
	scopedAttributes.put("afterUniqueNameChange", _afterUniqueNameChange);
}

if (request.getAttribute("alloy:textboxlist:afterUnmatchedItemSelect") != null) {
	scopedAttributes.put("afterUnmatchedItemSelect", _afterUnmatchedItemSelect);
}

if (request.getAttribute("alloy:textboxlist:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:textboxlist:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:textboxlist:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:textboxlist:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:textboxlist:onAlwaysShowContainerChange") != null) {
	scopedAttributes.put("onAlwaysShowContainerChange", _onAlwaysShowContainerChange);
}

if (request.getAttribute("alloy:textboxlist:onApplyLocalFilterChange") != null) {
	scopedAttributes.put("onApplyLocalFilterChange", _onApplyLocalFilterChange);
}

if (request.getAttribute("alloy:textboxlist:onAutoHighlightChange") != null) {
	scopedAttributes.put("onAutoHighlightChange", _onAutoHighlightChange);
}

if (request.getAttribute("alloy:textboxlist:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:textboxlist:onButtonChange") != null) {
	scopedAttributes.put("onButtonChange", _onButtonChange);
}

if (request.getAttribute("alloy:textboxlist:onContainerCollapse") != null) {
	scopedAttributes.put("onContainerCollapse", _onContainerCollapse);
}

if (request.getAttribute("alloy:textboxlist:onContainerExpand") != null) {
	scopedAttributes.put("onContainerExpand", _onContainerExpand);
}

if (request.getAttribute("alloy:textboxlist:onContainerPopulate") != null) {
	scopedAttributes.put("onContainerPopulate", _onContainerPopulate);
}

if (request.getAttribute("alloy:textboxlist:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:textboxlist:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:textboxlist:onDataError") != null) {
	scopedAttributes.put("onDataError", _onDataError);
}

if (request.getAttribute("alloy:textboxlist:onDataRequest") != null) {
	scopedAttributes.put("onDataRequest", _onDataRequest);
}

if (request.getAttribute("alloy:textboxlist:onDataReturn") != null) {
	scopedAttributes.put("onDataReturn", _onDataReturn);
}

if (request.getAttribute("alloy:textboxlist:onDataSourceChange") != null) {
	scopedAttributes.put("onDataSourceChange", _onDataSourceChange);
}

if (request.getAttribute("alloy:textboxlist:onDataSourceTypeChange") != null) {
	scopedAttributes.put("onDataSourceTypeChange", _onDataSourceTypeChange);
}

if (request.getAttribute("alloy:textboxlist:onDelimCharChange") != null) {
	scopedAttributes.put("onDelimCharChange", _onDelimCharChange);
}

if (request.getAttribute("alloy:textboxlist:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:textboxlist:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:textboxlist:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:textboxlist:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:textboxlist:onForceSelectionChange") != null) {
	scopedAttributes.put("onForceSelectionChange", _onForceSelectionChange);
}

if (request.getAttribute("alloy:textboxlist:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:textboxlist:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:textboxlist:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:textboxlist:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:textboxlist:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:textboxlist:onInputChange") != null) {
	scopedAttributes.put("onInputChange", _onInputChange);
}

if (request.getAttribute("alloy:textboxlist:onItemArrowFrom") != null) {
	scopedAttributes.put("onItemArrowFrom", _onItemArrowFrom);
}

if (request.getAttribute("alloy:textboxlist:onItemArrowTo") != null) {
	scopedAttributes.put("onItemArrowTo", _onItemArrowTo);
}

if (request.getAttribute("alloy:textboxlist:onItemMouseOut") != null) {
	scopedAttributes.put("onItemMouseOut", _onItemMouseOut);
}

if (request.getAttribute("alloy:textboxlist:onItemMouseOver") != null) {
	scopedAttributes.put("onItemMouseOver", _onItemMouseOver);
}

if (request.getAttribute("alloy:textboxlist:onItemSelect") != null) {
	scopedAttributes.put("onItemSelect", _onItemSelect);
}

if (request.getAttribute("alloy:textboxlist:onMatchKeyChange") != null) {
	scopedAttributes.put("onMatchKeyChange", _onMatchKeyChange);
}

if (request.getAttribute("alloy:textboxlist:onMaxResultsDisplayedChange") != null) {
	scopedAttributes.put("onMaxResultsDisplayedChange", _onMaxResultsDisplayedChange);
}

if (request.getAttribute("alloy:textboxlist:onMinQueryLengthChange") != null) {
	scopedAttributes.put("onMinQueryLengthChange", _onMinQueryLengthChange);
}

if (request.getAttribute("alloy:textboxlist:onQueryDelayChange") != null) {
	scopedAttributes.put("onQueryDelayChange", _onQueryDelayChange);
}

if (request.getAttribute("alloy:textboxlist:onQueryIntervalChange") != null) {
	scopedAttributes.put("onQueryIntervalChange", _onQueryIntervalChange);
}

if (request.getAttribute("alloy:textboxlist:onQueryMatchCaseChange") != null) {
	scopedAttributes.put("onQueryMatchCaseChange", _onQueryMatchCaseChange);
}

if (request.getAttribute("alloy:textboxlist:onQueryMatchContainsChange") != null) {
	scopedAttributes.put("onQueryMatchContainsChange", _onQueryMatchContainsChange);
}

if (request.getAttribute("alloy:textboxlist:onQueryQuestionMarkChange") != null) {
	scopedAttributes.put("onQueryQuestionMarkChange", _onQueryQuestionMarkChange);
}

if (request.getAttribute("alloy:textboxlist:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:textboxlist:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:textboxlist:onSchemaChange") != null) {
	scopedAttributes.put("onSchemaChange", _onSchemaChange);
}

if (request.getAttribute("alloy:textboxlist:onSchemaTypeChange") != null) {
	scopedAttributes.put("onSchemaTypeChange", _onSchemaTypeChange);
}

if (request.getAttribute("alloy:textboxlist:onSelectionEnforce") != null) {
	scopedAttributes.put("onSelectionEnforce", _onSelectionEnforce);
}

if (request.getAttribute("alloy:textboxlist:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:textboxlist:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:textboxlist:onSuppressInputUpdateChange") != null) {
	scopedAttributes.put("onSuppressInputUpdateChange", _onSuppressInputUpdateChange);
}

if (request.getAttribute("alloy:textboxlist:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:textboxlist:onTextboxBlur") != null) {
	scopedAttributes.put("onTextboxBlur", _onTextboxBlur);
}

if (request.getAttribute("alloy:textboxlist:onTextboxChange") != null) {
	scopedAttributes.put("onTextboxChange", _onTextboxChange);
}

if (request.getAttribute("alloy:textboxlist:onTextboxFocus") != null) {
	scopedAttributes.put("onTextboxFocus", _onTextboxFocus);
}

if (request.getAttribute("alloy:textboxlist:onTextboxKey") != null) {
	scopedAttributes.put("onTextboxKey", _onTextboxKey);
}

if (request.getAttribute("alloy:textboxlist:onTypeAhead") != null) {
	scopedAttributes.put("onTypeAhead", _onTypeAhead);
}

if (request.getAttribute("alloy:textboxlist:onTypeAheadChange") != null) {
	scopedAttributes.put("onTypeAheadChange", _onTypeAheadChange);
}

if (request.getAttribute("alloy:textboxlist:onTypeAheadDelayChange") != null) {
	scopedAttributes.put("onTypeAheadDelayChange", _onTypeAheadDelayChange);
}

if (request.getAttribute("alloy:textboxlist:onUniqueNameChange") != null) {
	scopedAttributes.put("onUniqueNameChange", _onUniqueNameChange);
}

if (request.getAttribute("alloy:textboxlist:onUnmatchedItemSelect") != null) {
	scopedAttributes.put("onUnmatchedItemSelect", _onUnmatchedItemSelect);
}

if (request.getAttribute("alloy:textboxlist:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:textboxlist:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:textboxlist:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:textboxlist:onWidthChange") != null) {
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