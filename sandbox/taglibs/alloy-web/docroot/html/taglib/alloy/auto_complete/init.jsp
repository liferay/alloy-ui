<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:auto-complete:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:auto-complete:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:auto-complete:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Boolean _alwaysShowContainer = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:alwaysShowContainer"), false);
java.lang.Boolean _applyLocalFilter = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:applyLocalFilter"), true);
java.lang.Boolean _autoHighlight = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:autoHighlight"), true);
java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:auto-complete:boundingBox");
java.lang.Boolean _button = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:button"), true);
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:auto-complete:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:auto-complete:cssClass");
java.lang.Object _dataSource = (java.lang.Object)request.getAttribute("alloy:auto-complete:dataSource");
java.lang.Object _dataSourceType = (java.lang.Object)request.getAttribute("alloy:auto-complete:dataSourceType");
java.lang.Object _delimChar = (java.lang.Object)request.getAttribute("alloy:auto-complete:delimChar");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:disabled"), false);
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:focused"), false);
java.lang.Boolean _forceSelection = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:forceSelection"), false);
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:auto-complete:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:auto-complete:hideClass");
java.lang.Object _autocompleteId = (java.lang.Object)request.getAttribute("alloy:auto-complete:autocompleteId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:initialized"), false);
java.lang.Object _input = (java.lang.Object)request.getAttribute("alloy:auto-complete:input");
java.lang.Object _matchKey = (java.lang.Object)request.getAttribute("alloy:auto-complete:matchKey");
java.lang.Number _maxResultsDisplayed = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:auto-complete:maxResultsDisplayed"), 10);
java.lang.Number _minQueryLength = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:auto-complete:minQueryLength"), 1);
java.lang.Number _queryDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:auto-complete:queryDelay"), 0.2);
java.lang.Number _queryInterval = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:auto-complete:queryInterval"), 0.5);
java.lang.Boolean _queryMatchCase = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:queryMatchCase"), false);
java.lang.Boolean _queryMatchContains = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:queryMatchContains"), false);
java.lang.Boolean _queryQuestionMark = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:queryQuestionMark"), true);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:rendered"), false);
java.lang.Object _schema = (java.lang.Object)request.getAttribute("alloy:auto-complete:schema");
java.lang.Object _schemaType = (java.lang.Object)request.getAttribute("alloy:auto-complete:schemaType");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:auto-complete:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:auto-complete:strings");
java.lang.Boolean _suppressInputUpdate = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:suppressInputUpdate"), false);
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:auto-complete:tabIndex"), 0);
java.lang.Boolean _typeAhead = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:typeAhead"), false);
java.lang.Number _typeAheadDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:auto-complete:typeAheadDelay"), 0.2);
java.lang.Object _uniqueName = (java.lang.Object)request.getAttribute("alloy:auto-complete:uniqueName");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:auto-complete:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:auto-complete:width");
java.lang.Object _afterAlwaysShowContainerChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterAlwaysShowContainerChange");
java.lang.Object _afterApplyLocalFilterChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterApplyLocalFilterChange");
java.lang.Object _afterAutoHighlightChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterAutoHighlightChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterBoundingBoxChange");
java.lang.Object _afterButtonChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterButtonChange");
java.lang.Object _afterContainerCollapse = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterContainerCollapse");
java.lang.Object _afterContainerExpand = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterContainerExpand");
java.lang.Object _afterContainerPopulate = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterContainerPopulate");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterCssClassChange");
java.lang.Object _afterDataError = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterDataError");
java.lang.Object _afterDataRequest = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterDataRequest");
java.lang.Object _afterDataReturn = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterDataReturn");
java.lang.Object _afterDataSourceChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterDataSourceChange");
java.lang.Object _afterDataSourceTypeChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterDataSourceTypeChange");
java.lang.Object _afterDelimCharChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterDelimCharChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterDisabledChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterFocusedChange");
java.lang.Object _afterForceSelectionChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterForceSelectionChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterHideClassChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterInitializedChange");
java.lang.Object _afterInputChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterInputChange");
java.lang.Object _afterItemArrowFrom = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterItemArrowFrom");
java.lang.Object _afterItemArrowTo = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterItemArrowTo");
java.lang.Object _afterItemMouseOut = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterItemMouseOut");
java.lang.Object _afterItemMouseOver = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterItemMouseOver");
java.lang.Object _afterItemSelect = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterItemSelect");
java.lang.Object _afterMatchKeyChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterMatchKeyChange");
java.lang.Object _afterMaxResultsDisplayedChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterMaxResultsDisplayedChange");
java.lang.Object _afterMinQueryLengthChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterMinQueryLengthChange");
java.lang.Object _afterQueryDelayChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterQueryDelayChange");
java.lang.Object _afterQueryIntervalChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterQueryIntervalChange");
java.lang.Object _afterQueryMatchCaseChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterQueryMatchCaseChange");
java.lang.Object _afterQueryMatchContainsChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterQueryMatchContainsChange");
java.lang.Object _afterQueryQuestionMarkChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterQueryQuestionMarkChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterRenderedChange");
java.lang.Object _afterSchemaChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterSchemaChange");
java.lang.Object _afterSchemaTypeChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterSchemaTypeChange");
java.lang.Object _afterSelectionEnforce = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterSelectionEnforce");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterStringsChange");
java.lang.Object _afterSuppressInputUpdateChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterSuppressInputUpdateChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterTabIndexChange");
java.lang.Object _afterTextboxBlur = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterTextboxBlur");
java.lang.Object _afterTextboxChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterTextboxChange");
java.lang.Object _afterTextboxFocus = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterTextboxFocus");
java.lang.Object _afterTextboxKey = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterTextboxKey");
java.lang.Object _afterTypeAhead = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterTypeAhead");
java.lang.Object _afterTypeAheadChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterTypeAheadChange");
java.lang.Object _afterTypeAheadDelayChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterTypeAheadDelayChange");
java.lang.Object _afterUniqueNameChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterUniqueNameChange");
java.lang.Object _afterUnmatchedItemSelect = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterUnmatchedItemSelect");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:afterWidthChange");
java.lang.Object _onAlwaysShowContainerChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onAlwaysShowContainerChange");
java.lang.Object _onApplyLocalFilterChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onApplyLocalFilterChange");
java.lang.Object _onAutoHighlightChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onAutoHighlightChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onBoundingBoxChange");
java.lang.Object _onButtonChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onButtonChange");
java.lang.Object _onContainerCollapse = (java.lang.Object)request.getAttribute("alloy:auto-complete:onContainerCollapse");
java.lang.Object _onContainerExpand = (java.lang.Object)request.getAttribute("alloy:auto-complete:onContainerExpand");
java.lang.Object _onContainerPopulate = (java.lang.Object)request.getAttribute("alloy:auto-complete:onContainerPopulate");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onCssClassChange");
java.lang.Object _onDataError = (java.lang.Object)request.getAttribute("alloy:auto-complete:onDataError");
java.lang.Object _onDataRequest = (java.lang.Object)request.getAttribute("alloy:auto-complete:onDataRequest");
java.lang.Object _onDataReturn = (java.lang.Object)request.getAttribute("alloy:auto-complete:onDataReturn");
java.lang.Object _onDataSourceChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onDataSourceChange");
java.lang.Object _onDataSourceTypeChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onDataSourceTypeChange");
java.lang.Object _onDelimCharChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onDelimCharChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:auto-complete:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onDisabledChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onFocusedChange");
java.lang.Object _onForceSelectionChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onForceSelectionChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onHideClassChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:auto-complete:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onInitializedChange");
java.lang.Object _onInputChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onInputChange");
java.lang.Object _onItemArrowFrom = (java.lang.Object)request.getAttribute("alloy:auto-complete:onItemArrowFrom");
java.lang.Object _onItemArrowTo = (java.lang.Object)request.getAttribute("alloy:auto-complete:onItemArrowTo");
java.lang.Object _onItemMouseOut = (java.lang.Object)request.getAttribute("alloy:auto-complete:onItemMouseOut");
java.lang.Object _onItemMouseOver = (java.lang.Object)request.getAttribute("alloy:auto-complete:onItemMouseOver");
java.lang.Object _onItemSelect = (java.lang.Object)request.getAttribute("alloy:auto-complete:onItemSelect");
java.lang.Object _onMatchKeyChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onMatchKeyChange");
java.lang.Object _onMaxResultsDisplayedChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onMaxResultsDisplayedChange");
java.lang.Object _onMinQueryLengthChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onMinQueryLengthChange");
java.lang.Object _onQueryDelayChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onQueryDelayChange");
java.lang.Object _onQueryIntervalChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onQueryIntervalChange");
java.lang.Object _onQueryMatchCaseChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onQueryMatchCaseChange");
java.lang.Object _onQueryMatchContainsChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onQueryMatchContainsChange");
java.lang.Object _onQueryQuestionMarkChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onQueryQuestionMarkChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onRenderedChange");
java.lang.Object _onSchemaChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onSchemaChange");
java.lang.Object _onSchemaTypeChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onSchemaTypeChange");
java.lang.Object _onSelectionEnforce = (java.lang.Object)request.getAttribute("alloy:auto-complete:onSelectionEnforce");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onStringsChange");
java.lang.Object _onSuppressInputUpdateChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onSuppressInputUpdateChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onTabIndexChange");
java.lang.Object _onTextboxBlur = (java.lang.Object)request.getAttribute("alloy:auto-complete:onTextboxBlur");
java.lang.Object _onTextboxChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onTextboxChange");
java.lang.Object _onTextboxFocus = (java.lang.Object)request.getAttribute("alloy:auto-complete:onTextboxFocus");
java.lang.Object _onTextboxKey = (java.lang.Object)request.getAttribute("alloy:auto-complete:onTextboxKey");
java.lang.Object _onTypeAhead = (java.lang.Object)request.getAttribute("alloy:auto-complete:onTypeAhead");
java.lang.Object _onTypeAheadChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onTypeAheadChange");
java.lang.Object _onTypeAheadDelayChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onTypeAheadDelayChange");
java.lang.Object _onUniqueNameChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onUniqueNameChange");
java.lang.Object _onUnmatchedItemSelect = (java.lang.Object)request.getAttribute("alloy:auto-complete:onUnmatchedItemSelect");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:auto-complete:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:auto-complete:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:auto-complete:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:auto-complete:alwaysShowContainer") != null) {
	scopedAttributes.put("alwaysShowContainer", _alwaysShowContainer);
}

if (request.getAttribute("alloy:auto-complete:applyLocalFilter") != null) {
	scopedAttributes.put("applyLocalFilter", _applyLocalFilter);
}

if (request.getAttribute("alloy:auto-complete:autoHighlight") != null) {
	scopedAttributes.put("autoHighlight", _autoHighlight);
}

if (request.getAttribute("alloy:auto-complete:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:auto-complete:button") != null) {
	scopedAttributes.put("button", _button);
}

if (request.getAttribute("alloy:auto-complete:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:auto-complete:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:auto-complete:dataSource") != null) {
	scopedAttributes.put("dataSource", _dataSource);
}

if (request.getAttribute("alloy:auto-complete:dataSourceType") != null) {
	scopedAttributes.put("dataSourceType", _dataSourceType);
}

if (request.getAttribute("alloy:auto-complete:delimChar") != null) {
	scopedAttributes.put("delimChar", _delimChar);
}

if (request.getAttribute("alloy:auto-complete:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:auto-complete:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:auto-complete:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:auto-complete:forceSelection") != null) {
	scopedAttributes.put("forceSelection", _forceSelection);
}

if (request.getAttribute("alloy:auto-complete:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:auto-complete:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:auto-complete:autocompleteId") != null) {
	scopedAttributes.put("autocompleteId", _autocompleteId);
}

if (request.getAttribute("alloy:auto-complete:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:auto-complete:input") != null) {
	scopedAttributes.put("input", _input);
}

if (request.getAttribute("alloy:auto-complete:matchKey") != null) {
	scopedAttributes.put("matchKey", _matchKey);
}

if (request.getAttribute("alloy:auto-complete:maxResultsDisplayed") != null) {
	scopedAttributes.put("maxResultsDisplayed", _maxResultsDisplayed);
}

if (request.getAttribute("alloy:auto-complete:minQueryLength") != null) {
	scopedAttributes.put("minQueryLength", _minQueryLength);
}

if (request.getAttribute("alloy:auto-complete:queryDelay") != null) {
	scopedAttributes.put("queryDelay", _queryDelay);
}

if (request.getAttribute("alloy:auto-complete:queryInterval") != null) {
	scopedAttributes.put("queryInterval", _queryInterval);
}

if (request.getAttribute("alloy:auto-complete:queryMatchCase") != null) {
	scopedAttributes.put("queryMatchCase", _queryMatchCase);
}

if (request.getAttribute("alloy:auto-complete:queryMatchContains") != null) {
	scopedAttributes.put("queryMatchContains", _queryMatchContains);
}

if (request.getAttribute("alloy:auto-complete:queryQuestionMark") != null) {
	scopedAttributes.put("queryQuestionMark", _queryQuestionMark);
}

if (request.getAttribute("alloy:auto-complete:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:auto-complete:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:auto-complete:schema") != null) {
	scopedAttributes.put("schema", _schema);
}

if (request.getAttribute("alloy:auto-complete:schemaType") != null) {
	scopedAttributes.put("schemaType", _schemaType);
}

if (request.getAttribute("alloy:auto-complete:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:auto-complete:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:auto-complete:suppressInputUpdate") != null) {
	scopedAttributes.put("suppressInputUpdate", _suppressInputUpdate);
}

if (request.getAttribute("alloy:auto-complete:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:auto-complete:typeAhead") != null) {
	scopedAttributes.put("typeAhead", _typeAhead);
}

if (request.getAttribute("alloy:auto-complete:typeAheadDelay") != null) {
	scopedAttributes.put("typeAheadDelay", _typeAheadDelay);
}

if (request.getAttribute("alloy:auto-complete:uniqueName") != null) {
	scopedAttributes.put("uniqueName", _uniqueName);
}

if (request.getAttribute("alloy:auto-complete:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:auto-complete:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:auto-complete:afterAlwaysShowContainerChange") != null) {
	scopedAttributes.put("afterAlwaysShowContainerChange", _afterAlwaysShowContainerChange);
}

if (request.getAttribute("alloy:auto-complete:afterApplyLocalFilterChange") != null) {
	scopedAttributes.put("afterApplyLocalFilterChange", _afterApplyLocalFilterChange);
}

if (request.getAttribute("alloy:auto-complete:afterAutoHighlightChange") != null) {
	scopedAttributes.put("afterAutoHighlightChange", _afterAutoHighlightChange);
}

if (request.getAttribute("alloy:auto-complete:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:auto-complete:afterButtonChange") != null) {
	scopedAttributes.put("afterButtonChange", _afterButtonChange);
}

if (request.getAttribute("alloy:auto-complete:afterContainerCollapse") != null) {
	scopedAttributes.put("afterContainerCollapse", _afterContainerCollapse);
}

if (request.getAttribute("alloy:auto-complete:afterContainerExpand") != null) {
	scopedAttributes.put("afterContainerExpand", _afterContainerExpand);
}

if (request.getAttribute("alloy:auto-complete:afterContainerPopulate") != null) {
	scopedAttributes.put("afterContainerPopulate", _afterContainerPopulate);
}

if (request.getAttribute("alloy:auto-complete:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:auto-complete:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:auto-complete:afterDataError") != null) {
	scopedAttributes.put("afterDataError", _afterDataError);
}

if (request.getAttribute("alloy:auto-complete:afterDataRequest") != null) {
	scopedAttributes.put("afterDataRequest", _afterDataRequest);
}

if (request.getAttribute("alloy:auto-complete:afterDataReturn") != null) {
	scopedAttributes.put("afterDataReturn", _afterDataReturn);
}

if (request.getAttribute("alloy:auto-complete:afterDataSourceChange") != null) {
	scopedAttributes.put("afterDataSourceChange", _afterDataSourceChange);
}

if (request.getAttribute("alloy:auto-complete:afterDataSourceTypeChange") != null) {
	scopedAttributes.put("afterDataSourceTypeChange", _afterDataSourceTypeChange);
}

if (request.getAttribute("alloy:auto-complete:afterDelimCharChange") != null) {
	scopedAttributes.put("afterDelimCharChange", _afterDelimCharChange);
}

if (request.getAttribute("alloy:auto-complete:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:auto-complete:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:auto-complete:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:auto-complete:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:auto-complete:afterForceSelectionChange") != null) {
	scopedAttributes.put("afterForceSelectionChange", _afterForceSelectionChange);
}

if (request.getAttribute("alloy:auto-complete:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:auto-complete:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:auto-complete:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:auto-complete:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:auto-complete:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:auto-complete:afterInputChange") != null) {
	scopedAttributes.put("afterInputChange", _afterInputChange);
}

if (request.getAttribute("alloy:auto-complete:afterItemArrowFrom") != null) {
	scopedAttributes.put("afterItemArrowFrom", _afterItemArrowFrom);
}

if (request.getAttribute("alloy:auto-complete:afterItemArrowTo") != null) {
	scopedAttributes.put("afterItemArrowTo", _afterItemArrowTo);
}

if (request.getAttribute("alloy:auto-complete:afterItemMouseOut") != null) {
	scopedAttributes.put("afterItemMouseOut", _afterItemMouseOut);
}

if (request.getAttribute("alloy:auto-complete:afterItemMouseOver") != null) {
	scopedAttributes.put("afterItemMouseOver", _afterItemMouseOver);
}

if (request.getAttribute("alloy:auto-complete:afterItemSelect") != null) {
	scopedAttributes.put("afterItemSelect", _afterItemSelect);
}

if (request.getAttribute("alloy:auto-complete:afterMatchKeyChange") != null) {
	scopedAttributes.put("afterMatchKeyChange", _afterMatchKeyChange);
}

if (request.getAttribute("alloy:auto-complete:afterMaxResultsDisplayedChange") != null) {
	scopedAttributes.put("afterMaxResultsDisplayedChange", _afterMaxResultsDisplayedChange);
}

if (request.getAttribute("alloy:auto-complete:afterMinQueryLengthChange") != null) {
	scopedAttributes.put("afterMinQueryLengthChange", _afterMinQueryLengthChange);
}

if (request.getAttribute("alloy:auto-complete:afterQueryDelayChange") != null) {
	scopedAttributes.put("afterQueryDelayChange", _afterQueryDelayChange);
}

if (request.getAttribute("alloy:auto-complete:afterQueryIntervalChange") != null) {
	scopedAttributes.put("afterQueryIntervalChange", _afterQueryIntervalChange);
}

if (request.getAttribute("alloy:auto-complete:afterQueryMatchCaseChange") != null) {
	scopedAttributes.put("afterQueryMatchCaseChange", _afterQueryMatchCaseChange);
}

if (request.getAttribute("alloy:auto-complete:afterQueryMatchContainsChange") != null) {
	scopedAttributes.put("afterQueryMatchContainsChange", _afterQueryMatchContainsChange);
}

if (request.getAttribute("alloy:auto-complete:afterQueryQuestionMarkChange") != null) {
	scopedAttributes.put("afterQueryQuestionMarkChange", _afterQueryQuestionMarkChange);
}

if (request.getAttribute("alloy:auto-complete:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:auto-complete:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:auto-complete:afterSchemaChange") != null) {
	scopedAttributes.put("afterSchemaChange", _afterSchemaChange);
}

if (request.getAttribute("alloy:auto-complete:afterSchemaTypeChange") != null) {
	scopedAttributes.put("afterSchemaTypeChange", _afterSchemaTypeChange);
}

if (request.getAttribute("alloy:auto-complete:afterSelectionEnforce") != null) {
	scopedAttributes.put("afterSelectionEnforce", _afterSelectionEnforce);
}

if (request.getAttribute("alloy:auto-complete:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:auto-complete:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:auto-complete:afterSuppressInputUpdateChange") != null) {
	scopedAttributes.put("afterSuppressInputUpdateChange", _afterSuppressInputUpdateChange);
}

if (request.getAttribute("alloy:auto-complete:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:auto-complete:afterTextboxBlur") != null) {
	scopedAttributes.put("afterTextboxBlur", _afterTextboxBlur);
}

if (request.getAttribute("alloy:auto-complete:afterTextboxChange") != null) {
	scopedAttributes.put("afterTextboxChange", _afterTextboxChange);
}

if (request.getAttribute("alloy:auto-complete:afterTextboxFocus") != null) {
	scopedAttributes.put("afterTextboxFocus", _afterTextboxFocus);
}

if (request.getAttribute("alloy:auto-complete:afterTextboxKey") != null) {
	scopedAttributes.put("afterTextboxKey", _afterTextboxKey);
}

if (request.getAttribute("alloy:auto-complete:afterTypeAhead") != null) {
	scopedAttributes.put("afterTypeAhead", _afterTypeAhead);
}

if (request.getAttribute("alloy:auto-complete:afterTypeAheadChange") != null) {
	scopedAttributes.put("afterTypeAheadChange", _afterTypeAheadChange);
}

if (request.getAttribute("alloy:auto-complete:afterTypeAheadDelayChange") != null) {
	scopedAttributes.put("afterTypeAheadDelayChange", _afterTypeAheadDelayChange);
}

if (request.getAttribute("alloy:auto-complete:afterUniqueNameChange") != null) {
	scopedAttributes.put("afterUniqueNameChange", _afterUniqueNameChange);
}

if (request.getAttribute("alloy:auto-complete:afterUnmatchedItemSelect") != null) {
	scopedAttributes.put("afterUnmatchedItemSelect", _afterUnmatchedItemSelect);
}

if (request.getAttribute("alloy:auto-complete:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:auto-complete:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:auto-complete:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:auto-complete:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:auto-complete:onAlwaysShowContainerChange") != null) {
	scopedAttributes.put("onAlwaysShowContainerChange", _onAlwaysShowContainerChange);
}

if (request.getAttribute("alloy:auto-complete:onApplyLocalFilterChange") != null) {
	scopedAttributes.put("onApplyLocalFilterChange", _onApplyLocalFilterChange);
}

if (request.getAttribute("alloy:auto-complete:onAutoHighlightChange") != null) {
	scopedAttributes.put("onAutoHighlightChange", _onAutoHighlightChange);
}

if (request.getAttribute("alloy:auto-complete:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:auto-complete:onButtonChange") != null) {
	scopedAttributes.put("onButtonChange", _onButtonChange);
}

if (request.getAttribute("alloy:auto-complete:onContainerCollapse") != null) {
	scopedAttributes.put("onContainerCollapse", _onContainerCollapse);
}

if (request.getAttribute("alloy:auto-complete:onContainerExpand") != null) {
	scopedAttributes.put("onContainerExpand", _onContainerExpand);
}

if (request.getAttribute("alloy:auto-complete:onContainerPopulate") != null) {
	scopedAttributes.put("onContainerPopulate", _onContainerPopulate);
}

if (request.getAttribute("alloy:auto-complete:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:auto-complete:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:auto-complete:onDataError") != null) {
	scopedAttributes.put("onDataError", _onDataError);
}

if (request.getAttribute("alloy:auto-complete:onDataRequest") != null) {
	scopedAttributes.put("onDataRequest", _onDataRequest);
}

if (request.getAttribute("alloy:auto-complete:onDataReturn") != null) {
	scopedAttributes.put("onDataReturn", _onDataReturn);
}

if (request.getAttribute("alloy:auto-complete:onDataSourceChange") != null) {
	scopedAttributes.put("onDataSourceChange", _onDataSourceChange);
}

if (request.getAttribute("alloy:auto-complete:onDataSourceTypeChange") != null) {
	scopedAttributes.put("onDataSourceTypeChange", _onDataSourceTypeChange);
}

if (request.getAttribute("alloy:auto-complete:onDelimCharChange") != null) {
	scopedAttributes.put("onDelimCharChange", _onDelimCharChange);
}

if (request.getAttribute("alloy:auto-complete:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:auto-complete:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:auto-complete:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:auto-complete:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:auto-complete:onForceSelectionChange") != null) {
	scopedAttributes.put("onForceSelectionChange", _onForceSelectionChange);
}

if (request.getAttribute("alloy:auto-complete:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:auto-complete:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:auto-complete:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:auto-complete:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:auto-complete:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:auto-complete:onInputChange") != null) {
	scopedAttributes.put("onInputChange", _onInputChange);
}

if (request.getAttribute("alloy:auto-complete:onItemArrowFrom") != null) {
	scopedAttributes.put("onItemArrowFrom", _onItemArrowFrom);
}

if (request.getAttribute("alloy:auto-complete:onItemArrowTo") != null) {
	scopedAttributes.put("onItemArrowTo", _onItemArrowTo);
}

if (request.getAttribute("alloy:auto-complete:onItemMouseOut") != null) {
	scopedAttributes.put("onItemMouseOut", _onItemMouseOut);
}

if (request.getAttribute("alloy:auto-complete:onItemMouseOver") != null) {
	scopedAttributes.put("onItemMouseOver", _onItemMouseOver);
}

if (request.getAttribute("alloy:auto-complete:onItemSelect") != null) {
	scopedAttributes.put("onItemSelect", _onItemSelect);
}

if (request.getAttribute("alloy:auto-complete:onMatchKeyChange") != null) {
	scopedAttributes.put("onMatchKeyChange", _onMatchKeyChange);
}

if (request.getAttribute("alloy:auto-complete:onMaxResultsDisplayedChange") != null) {
	scopedAttributes.put("onMaxResultsDisplayedChange", _onMaxResultsDisplayedChange);
}

if (request.getAttribute("alloy:auto-complete:onMinQueryLengthChange") != null) {
	scopedAttributes.put("onMinQueryLengthChange", _onMinQueryLengthChange);
}

if (request.getAttribute("alloy:auto-complete:onQueryDelayChange") != null) {
	scopedAttributes.put("onQueryDelayChange", _onQueryDelayChange);
}

if (request.getAttribute("alloy:auto-complete:onQueryIntervalChange") != null) {
	scopedAttributes.put("onQueryIntervalChange", _onQueryIntervalChange);
}

if (request.getAttribute("alloy:auto-complete:onQueryMatchCaseChange") != null) {
	scopedAttributes.put("onQueryMatchCaseChange", _onQueryMatchCaseChange);
}

if (request.getAttribute("alloy:auto-complete:onQueryMatchContainsChange") != null) {
	scopedAttributes.put("onQueryMatchContainsChange", _onQueryMatchContainsChange);
}

if (request.getAttribute("alloy:auto-complete:onQueryQuestionMarkChange") != null) {
	scopedAttributes.put("onQueryQuestionMarkChange", _onQueryQuestionMarkChange);
}

if (request.getAttribute("alloy:auto-complete:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:auto-complete:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:auto-complete:onSchemaChange") != null) {
	scopedAttributes.put("onSchemaChange", _onSchemaChange);
}

if (request.getAttribute("alloy:auto-complete:onSchemaTypeChange") != null) {
	scopedAttributes.put("onSchemaTypeChange", _onSchemaTypeChange);
}

if (request.getAttribute("alloy:auto-complete:onSelectionEnforce") != null) {
	scopedAttributes.put("onSelectionEnforce", _onSelectionEnforce);
}

if (request.getAttribute("alloy:auto-complete:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:auto-complete:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:auto-complete:onSuppressInputUpdateChange") != null) {
	scopedAttributes.put("onSuppressInputUpdateChange", _onSuppressInputUpdateChange);
}

if (request.getAttribute("alloy:auto-complete:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:auto-complete:onTextboxBlur") != null) {
	scopedAttributes.put("onTextboxBlur", _onTextboxBlur);
}

if (request.getAttribute("alloy:auto-complete:onTextboxChange") != null) {
	scopedAttributes.put("onTextboxChange", _onTextboxChange);
}

if (request.getAttribute("alloy:auto-complete:onTextboxFocus") != null) {
	scopedAttributes.put("onTextboxFocus", _onTextboxFocus);
}

if (request.getAttribute("alloy:auto-complete:onTextboxKey") != null) {
	scopedAttributes.put("onTextboxKey", _onTextboxKey);
}

if (request.getAttribute("alloy:auto-complete:onTypeAhead") != null) {
	scopedAttributes.put("onTypeAhead", _onTypeAhead);
}

if (request.getAttribute("alloy:auto-complete:onTypeAheadChange") != null) {
	scopedAttributes.put("onTypeAheadChange", _onTypeAheadChange);
}

if (request.getAttribute("alloy:auto-complete:onTypeAheadDelayChange") != null) {
	scopedAttributes.put("onTypeAheadDelayChange", _onTypeAheadDelayChange);
}

if (request.getAttribute("alloy:auto-complete:onUniqueNameChange") != null) {
	scopedAttributes.put("onUniqueNameChange", _onUniqueNameChange);
}

if (request.getAttribute("alloy:auto-complete:onUnmatchedItemSelect") != null) {
	scopedAttributes.put("onUnmatchedItemSelect", _onUnmatchedItemSelect);
}

if (request.getAttribute("alloy:auto-complete:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:auto-complete:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:auto-complete:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:auto-complete:onWidthChange") != null) {
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