<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:textboxlist:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:textboxlist:scopedAttributes");

java.lang.Boolean _alwaysShowContainer = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:alwaysShowContainer"));
java.lang.Boolean _applyLocalFilter = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:applyLocalFilter"));
java.lang.Boolean _autoHighlight = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:autoHighlight"));
java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:boundingBox"));
java.lang.Boolean _button = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:button"));
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:cssClass"));
java.lang.String _dataSource = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:dataSource"));
java.lang.String _dataSourceType = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:dataSourceType"));
java.lang.String _delimChar = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:delimChar"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:destroyed"));
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:disabled"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:focused"));
java.lang.Boolean _forceSelection = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:forceSelection"));
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:hideClass"));
java.lang.String _textboxlistId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:textboxlistId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:initialized"));
java.lang.String _input = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:input"));
java.lang.String _matchKey = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:matchKey"));
java.lang.Number _maxResultsDisplayed = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:textboxlist:maxResultsDisplayed"));
java.lang.Number _minQueryLength = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:textboxlist:minQueryLength"));
java.lang.Number _queryDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:textboxlist:queryDelay"));
java.lang.Number _queryInterval = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:textboxlist:queryInterval"));
java.lang.Boolean _queryMatchCase = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:queryMatchCase"));
java.lang.Boolean _queryMatchContains = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:queryMatchContains"));
java.lang.Boolean _queryQuestionMark = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:queryQuestionMark"));
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:render"));
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:rendered"));
java.lang.Object _schema = (java.lang.Object)request.getAttribute("alloy:textboxlist:schema");
java.lang.String _schemaType = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:schemaType"));
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:srcNode"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:textboxlist:strings");
java.lang.Boolean _suppressInputUpdate = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:suppressInputUpdate"));
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:textboxlist:tabIndex"));
java.lang.Boolean _typeAhead = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:typeAhead"));
java.lang.Number _typeAheadDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:textboxlist:typeAheadDelay"));
java.lang.String _uniqueName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:uniqueName"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:textboxlist:visible"));
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:width"));
java.lang.String _afterAlwaysShowContainerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterAlwaysShowContainerChange"));
java.lang.String _afterApplyLocalFilterChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterApplyLocalFilterChange"));
java.lang.String _afterAutoHighlightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterAutoHighlightChange"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterBoundingBoxChange"));
java.lang.String _afterButtonChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterButtonChange"));
java.lang.String _afterContainerCollapse = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterContainerCollapse"));
java.lang.String _afterContainerExpand = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterContainerExpand"));
java.lang.String _afterContainerPopulate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterContainerPopulate"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterCssClassChange"));
java.lang.String _afterDataError = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterDataError"));
java.lang.String _afterDataRequest = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterDataRequest"));
java.lang.String _afterDataReturn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterDataReturn"));
java.lang.String _afterDataSourceChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterDataSourceChange"));
java.lang.String _afterDataSourceTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterDataSourceTypeChange"));
java.lang.String _afterDelimCharChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterDelimCharChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterDisabledChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterFocusedChange"));
java.lang.String _afterForceSelectionChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterForceSelectionChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterHeightChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterHideClassChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterInitializedChange"));
java.lang.String _afterInputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterInputChange"));
java.lang.String _afterItemArrowFrom = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterItemArrowFrom"));
java.lang.String _afterItemArrowTo = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterItemArrowTo"));
java.lang.String _afterItemMouseOut = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterItemMouseOut"));
java.lang.String _afterItemMouseOver = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterItemMouseOver"));
java.lang.String _afterItemSelect = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterItemSelect"));
java.lang.String _afterMatchKeyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterMatchKeyChange"));
java.lang.String _afterMaxResultsDisplayedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterMaxResultsDisplayedChange"));
java.lang.String _afterMinQueryLengthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterMinQueryLengthChange"));
java.lang.String _afterQueryDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterQueryDelayChange"));
java.lang.String _afterQueryIntervalChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterQueryIntervalChange"));
java.lang.String _afterQueryMatchCaseChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterQueryMatchCaseChange"));
java.lang.String _afterQueryMatchContainsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterQueryMatchContainsChange"));
java.lang.String _afterQueryQuestionMarkChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterQueryQuestionMarkChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterRenderedChange"));
java.lang.String _afterSchemaChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterSchemaChange"));
java.lang.String _afterSchemaTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterSchemaTypeChange"));
java.lang.String _afterSelectionEnforce = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterSelectionEnforce"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterSrcNodeChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterStringsChange"));
java.lang.String _afterSuppressInputUpdateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterSuppressInputUpdateChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterTabIndexChange"));
java.lang.String _afterTextboxBlur = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterTextboxBlur"));
java.lang.String _afterTextboxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterTextboxChange"));
java.lang.String _afterTextboxFocus = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterTextboxFocus"));
java.lang.String _afterTextboxKey = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterTextboxKey"));
java.lang.String _afterTypeAhead = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterTypeAhead"));
java.lang.String _afterTypeAheadChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterTypeAheadChange"));
java.lang.String _afterTypeAheadDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterTypeAheadDelayChange"));
java.lang.String _afterUniqueNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterUniqueNameChange"));
java.lang.String _afterUnmatchedItemSelect = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterUnmatchedItemSelect"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:afterWidthChange"));
java.lang.String _onAlwaysShowContainerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onAlwaysShowContainerChange"));
java.lang.String _onApplyLocalFilterChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onApplyLocalFilterChange"));
java.lang.String _onAutoHighlightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onAutoHighlightChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onBoundingBoxChange"));
java.lang.String _onButtonChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onButtonChange"));
java.lang.String _onContainerCollapse = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onContainerCollapse"));
java.lang.String _onContainerExpand = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onContainerExpand"));
java.lang.String _onContainerPopulate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onContainerPopulate"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onCssClassChange"));
java.lang.String _onDataError = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onDataError"));
java.lang.String _onDataRequest = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onDataRequest"));
java.lang.String _onDataReturn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onDataReturn"));
java.lang.String _onDataSourceChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onDataSourceChange"));
java.lang.String _onDataSourceTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onDataSourceTypeChange"));
java.lang.String _onDelimCharChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onDelimCharChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onDisabledChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onFocusedChange"));
java.lang.String _onForceSelectionChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onForceSelectionChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onHeightChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onHideClassChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onInitializedChange"));
java.lang.String _onInputChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onInputChange"));
java.lang.String _onItemArrowFrom = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onItemArrowFrom"));
java.lang.String _onItemArrowTo = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onItemArrowTo"));
java.lang.String _onItemMouseOut = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onItemMouseOut"));
java.lang.String _onItemMouseOver = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onItemMouseOver"));
java.lang.String _onItemSelect = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onItemSelect"));
java.lang.String _onMatchKeyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onMatchKeyChange"));
java.lang.String _onMaxResultsDisplayedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onMaxResultsDisplayedChange"));
java.lang.String _onMinQueryLengthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onMinQueryLengthChange"));
java.lang.String _onQueryDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onQueryDelayChange"));
java.lang.String _onQueryIntervalChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onQueryIntervalChange"));
java.lang.String _onQueryMatchCaseChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onQueryMatchCaseChange"));
java.lang.String _onQueryMatchContainsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onQueryMatchContainsChange"));
java.lang.String _onQueryQuestionMarkChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onQueryQuestionMarkChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onRenderedChange"));
java.lang.String _onSchemaChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onSchemaChange"));
java.lang.String _onSchemaTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onSchemaTypeChange"));
java.lang.String _onSelectionEnforce = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onSelectionEnforce"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onSrcNodeChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onStringsChange"));
java.lang.String _onSuppressInputUpdateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onSuppressInputUpdateChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onTabIndexChange"));
java.lang.String _onTextboxBlur = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onTextboxBlur"));
java.lang.String _onTextboxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onTextboxChange"));
java.lang.String _onTextboxFocus = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onTextboxFocus"));
java.lang.String _onTextboxKey = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onTextboxKey"));
java.lang.String _onTypeAhead = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onTypeAhead"));
java.lang.String _onTypeAheadChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onTypeAheadChange"));
java.lang.String _onTypeAheadDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onTypeAheadDelayChange"));
java.lang.String _onUniqueNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onUniqueNameChange"));
java.lang.String _onUnmatchedItemSelect = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onUnmatchedItemSelect"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:textboxlist:onWidthChange"));
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
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>