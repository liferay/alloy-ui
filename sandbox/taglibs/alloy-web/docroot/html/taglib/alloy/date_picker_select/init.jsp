<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:date-picker-select:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:date-picker-select:scopedAttributes");

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:date-picker-select:align");
java.lang.String _appendOrder = (java.lang.String)request.getAttribute("alloy:date-picker-select:appendOrder");
java.lang.String _baseName = (java.lang.String)request.getAttribute("alloy:date-picker-select:baseName");
java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:date-picker-select:boundingBox");
java.lang.String _buttonNode = (java.lang.String)request.getAttribute("alloy:date-picker-select:buttonNode");
java.lang.Boolean _cancellableHide = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:cancellableHide");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:date-picker-select:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:date-picker-select:cssClass");
java.lang.Number _currentDay = (java.lang.Number)request.getAttribute("alloy:date-picker-select:currentDay");
java.lang.Number _currentMonth = (java.lang.Number)request.getAttribute("alloy:date-picker-select:currentMonth");
java.lang.String _currentNode = (java.lang.String)request.getAttribute("alloy:date-picker-select:currentNode");
java.lang.Number _currentYear = (java.lang.Number)request.getAttribute("alloy:date-picker-select:currentYear");
java.lang.String _dateFormat = (java.lang.String)request.getAttribute("alloy:date-picker-select:dateFormat");
java.lang.String _dates = (java.lang.String)request.getAttribute("alloy:date-picker-select:dates");
java.lang.String _dayNode = (java.lang.String)request.getAttribute("alloy:date-picker-select:dayNode");
java.lang.String _dayNodeName = (java.lang.String)request.getAttribute("alloy:date-picker-select:dayNodeName");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:disabled");
java.lang.Number _firstDayOfWeek = (java.lang.Number)request.getAttribute("alloy:date-picker-select:firstDayOfWeek");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:focused");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:date-picker-select:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:date-picker-select:hideClass");
java.lang.Number _hideDelay = (java.lang.Number)request.getAttribute("alloy:date-picker-select:hideDelay");
java.lang.String _hideOn = (java.lang.String)request.getAttribute("alloy:date-picker-select:hideOn");
java.lang.Boolean _hideOnDocumentClick = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:hideOnDocumentClick");
java.lang.String _datepickerselectId = (java.lang.String)request.getAttribute("alloy:date-picker-select:datepickerselectId");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:initialized");
java.lang.String _maxDate = (java.lang.String)request.getAttribute("alloy:date-picker-select:maxDate");
java.lang.String _minDate = (java.lang.String)request.getAttribute("alloy:date-picker-select:minDate");
java.lang.String _monthNode = (java.lang.String)request.getAttribute("alloy:date-picker-select:monthNode");
java.lang.String _monthNodeName = (java.lang.String)request.getAttribute("alloy:date-picker-select:monthNodeName");
java.lang.Boolean _populateDay = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:populateDay");
java.lang.Boolean _populateMonth = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:populateMonth");
java.lang.Boolean _populateYear = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:populateYear");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:rendered");
java.lang.Boolean _selectMultipleDates = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:selectMultipleDates");
java.lang.String _selectWrapperNode = (java.lang.String)request.getAttribute("alloy:date-picker-select:selectWrapperNode");
java.lang.Boolean _setValue = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:setValue");
java.lang.Number _showDelay = (java.lang.Number)request.getAttribute("alloy:date-picker-select:showDelay");
java.lang.String _showOn = (java.lang.String)request.getAttribute("alloy:date-picker-select:showOn");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:date-picker-select:srcNode");
java.lang.Boolean _stack = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:stack");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:date-picker-select:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:date-picker-select:tabIndex");
java.lang.String _trigger = (java.lang.String)request.getAttribute("alloy:date-picker-select:trigger");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:date-picker-select:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:date-picker-select:width");
java.lang.String _yearNode = (java.lang.String)request.getAttribute("alloy:date-picker-select:yearNode");
java.lang.String _yearNodeName = (java.lang.String)request.getAttribute("alloy:date-picker-select:yearNodeName");
java.lang.String _yearRange = (java.lang.String)request.getAttribute("alloy:date-picker-select:yearRange");
java.lang.String _afterAlignChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterAlignChange");
java.lang.String _afterAppendOrderChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterAppendOrderChange");
java.lang.String _afterBaseNameChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterBaseNameChange");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterBoundingBoxChange");
java.lang.String _afterButtonNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterButtonNodeChange");
java.lang.String _afterCancellableHideChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterCancellableHideChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterCssClassChange");
java.lang.String _afterCurrentDayChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterCurrentDayChange");
java.lang.String _afterCurrentMonthChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterCurrentMonthChange");
java.lang.String _afterCurrentNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterCurrentNodeChange");
java.lang.String _afterCurrentYearChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterCurrentYearChange");
java.lang.String _afterDateFormatChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterDateFormatChange");
java.lang.String _afterDatesChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterDatesChange");
java.lang.String _afterDayNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterDayNodeChange");
java.lang.String _afterDayNodeNameChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterDayNodeNameChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterDisabledChange");
java.lang.String _afterFirstDayOfWeekChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterFirstDayOfWeekChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterFocusedChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterHideClassChange");
java.lang.String _afterHideDelayChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterHideDelayChange");
java.lang.String _afterHideOnChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterHideOnChange");
java.lang.String _afterHideOnDocumentClickChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterHideOnDocumentClickChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterIdChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterInitializedChange");
java.lang.String _afterMaxDateChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterMaxDateChange");
java.lang.String _afterMinDateChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterMinDateChange");
java.lang.String _afterMonthNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterMonthNodeChange");
java.lang.String _afterMonthNodeNameChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterMonthNodeNameChange");
java.lang.String _afterPopulateDayChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterPopulateDayChange");
java.lang.String _afterPopulateMonthChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterPopulateMonthChange");
java.lang.String _afterPopulateYearChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterPopulateYearChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterRenderedChange");
java.lang.String _afterSelectMultipleDatesChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterSelectMultipleDatesChange");
java.lang.String _afterSelectWrapperNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterSelectWrapperNodeChange");
java.lang.String _afterSetValueChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterSetValueChange");
java.lang.String _afterShowDelayChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterShowDelayChange");
java.lang.String _afterShowOnChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterShowOnChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterSrcNodeChange");
java.lang.String _afterStackChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterStackChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterTabIndexChange");
java.lang.String _afterTriggerChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterTriggerChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterWidthChange");
java.lang.String _afterYearNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterYearNodeChange");
java.lang.String _afterYearNodeNameChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterYearNodeNameChange");
java.lang.String _afterYearRangeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:afterYearRangeChange");
java.lang.String _onAlignChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onAlignChange");
java.lang.String _onAppendOrderChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onAppendOrderChange");
java.lang.String _onBaseNameChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onBaseNameChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onBoundingBoxChange");
java.lang.String _onButtonNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onButtonNodeChange");
java.lang.String _onCancellableHideChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onCancellableHideChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onCssClassChange");
java.lang.String _onCurrentDayChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onCurrentDayChange");
java.lang.String _onCurrentMonthChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onCurrentMonthChange");
java.lang.String _onCurrentNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onCurrentNodeChange");
java.lang.String _onCurrentYearChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onCurrentYearChange");
java.lang.String _onDateFormatChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onDateFormatChange");
java.lang.String _onDatesChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onDatesChange");
java.lang.String _onDayNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onDayNodeChange");
java.lang.String _onDayNodeNameChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onDayNodeNameChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:date-picker-select:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onDisabledChange");
java.lang.String _onFirstDayOfWeekChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onFirstDayOfWeekChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onFocusedChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onHideClassChange");
java.lang.String _onHideDelayChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onHideDelayChange");
java.lang.String _onHideOnChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onHideOnChange");
java.lang.String _onHideOnDocumentClickChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onHideOnDocumentClickChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onIdChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:date-picker-select:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onInitializedChange");
java.lang.String _onMaxDateChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onMaxDateChange");
java.lang.String _onMinDateChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onMinDateChange");
java.lang.String _onMonthNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onMonthNodeChange");
java.lang.String _onMonthNodeNameChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onMonthNodeNameChange");
java.lang.String _onPopulateDayChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onPopulateDayChange");
java.lang.String _onPopulateMonthChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onPopulateMonthChange");
java.lang.String _onPopulateYearChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onPopulateYearChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onRenderedChange");
java.lang.String _onSelectMultipleDatesChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onSelectMultipleDatesChange");
java.lang.String _onSelectWrapperNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onSelectWrapperNodeChange");
java.lang.String _onSetValueChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onSetValueChange");
java.lang.String _onShowDelayChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onShowDelayChange");
java.lang.String _onShowOnChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onShowOnChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onSrcNodeChange");
java.lang.String _onStackChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onStackChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onTabIndexChange");
java.lang.String _onTriggerChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onTriggerChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:date-picker-select:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:date-picker-select:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onWidthChange");
java.lang.String _onYearNodeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onYearNodeChange");
java.lang.String _onYearNodeNameChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onYearNodeNameChange");
java.lang.String _onYearRangeChange = (java.lang.String)request.getAttribute("alloy:date-picker-select:onYearRangeChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_align != null) {
	scopedAttributes.put("align", _align);
}

if (_appendOrder != null) {
	scopedAttributes.put("appendOrder", _appendOrder);
}

if (_baseName != null) {
	scopedAttributes.put("baseName", _baseName);
}

if (_boundingBox != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (_buttonNode != null) {
	scopedAttributes.put("buttonNode", _buttonNode);
}

if (_cancellableHide != null) {
	scopedAttributes.put("cancellableHide", _cancellableHide);
}

if (_contentBox != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (_cssClass != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (_currentDay != null) {
	scopedAttributes.put("currentDay", _currentDay);
}

if (_currentMonth != null) {
	scopedAttributes.put("currentMonth", _currentMonth);
}

if (_currentNode != null) {
	scopedAttributes.put("currentNode", _currentNode);
}

if (_currentYear != null) {
	scopedAttributes.put("currentYear", _currentYear);
}

if (_dateFormat != null) {
	scopedAttributes.put("dateFormat", _dateFormat);
}

if (_dates != null) {
	scopedAttributes.put("dates", _dates);
}

if (_dayNode != null) {
	scopedAttributes.put("dayNode", _dayNode);
}

if (_dayNodeName != null) {
	scopedAttributes.put("dayNodeName", _dayNodeName);
}

if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_disabled != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (_firstDayOfWeek != null) {
	scopedAttributes.put("firstDayOfWeek", _firstDayOfWeek);
}

if (_focused != null) {
	scopedAttributes.put("focused", _focused);
}

if (_height != null) {
	scopedAttributes.put("height", _height);
}

if (_hideClass != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (_hideDelay != null) {
	scopedAttributes.put("hideDelay", _hideDelay);
}

if (_hideOn != null) {
	scopedAttributes.put("hideOn", _hideOn);
}

if (_hideOnDocumentClick != null) {
	scopedAttributes.put("hideOnDocumentClick", _hideOnDocumentClick);
}

if (_datepickerselectId != null) {
	scopedAttributes.put("datepickerselectId", _datepickerselectId);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_maxDate != null) {
	scopedAttributes.put("maxDate", _maxDate);
}

if (_minDate != null) {
	scopedAttributes.put("minDate", _minDate);
}

if (_monthNode != null) {
	scopedAttributes.put("monthNode", _monthNode);
}

if (_monthNodeName != null) {
	scopedAttributes.put("monthNodeName", _monthNodeName);
}

if (_populateDay != null) {
	scopedAttributes.put("populateDay", _populateDay);
}

if (_populateMonth != null) {
	scopedAttributes.put("populateMonth", _populateMonth);
}

if (_populateYear != null) {
	scopedAttributes.put("populateYear", _populateYear);
}

if (_render != null) {
	scopedAttributes.put("render", _render);
}

if (_rendered != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (_selectMultipleDates != null) {
	scopedAttributes.put("selectMultipleDates", _selectMultipleDates);
}

if (_selectWrapperNode != null) {
	scopedAttributes.put("selectWrapperNode", _selectWrapperNode);
}

if (_setValue != null) {
	scopedAttributes.put("setValue", _setValue);
}

if (_showDelay != null) {
	scopedAttributes.put("showDelay", _showDelay);
}

if (_showOn != null) {
	scopedAttributes.put("showOn", _showOn);
}

if (_srcNode != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (_stack != null) {
	scopedAttributes.put("stack", _stack);
}

if (_strings != null) {
	scopedAttributes.put("strings", _strings);
}

if (_tabIndex != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (_trigger != null) {
	scopedAttributes.put("trigger", _trigger);
}

if (_visible != null) {
	scopedAttributes.put("visible", _visible);
}

if (_width != null) {
	scopedAttributes.put("width", _width);
}

if (_yearNode != null) {
	scopedAttributes.put("yearNode", _yearNode);
}

if (_yearNodeName != null) {
	scopedAttributes.put("yearNodeName", _yearNodeName);
}

if (_yearRange != null) {
	scopedAttributes.put("yearRange", _yearRange);
}

if (_afterAlignChange != null) {
	scopedAttributes.put("afterAlignChange", _afterAlignChange);
}

if (_afterAppendOrderChange != null) {
	scopedAttributes.put("afterAppendOrderChange", _afterAppendOrderChange);
}

if (_afterBaseNameChange != null) {
	scopedAttributes.put("afterBaseNameChange", _afterBaseNameChange);
}

if (_afterBoundingBoxChange != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (_afterButtonNodeChange != null) {
	scopedAttributes.put("afterButtonNodeChange", _afterButtonNodeChange);
}

if (_afterCancellableHideChange != null) {
	scopedAttributes.put("afterCancellableHideChange", _afterCancellableHideChange);
}

if (_afterContentBoxChange != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (_afterCssClassChange != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (_afterCurrentDayChange != null) {
	scopedAttributes.put("afterCurrentDayChange", _afterCurrentDayChange);
}

if (_afterCurrentMonthChange != null) {
	scopedAttributes.put("afterCurrentMonthChange", _afterCurrentMonthChange);
}

if (_afterCurrentNodeChange != null) {
	scopedAttributes.put("afterCurrentNodeChange", _afterCurrentNodeChange);
}

if (_afterCurrentYearChange != null) {
	scopedAttributes.put("afterCurrentYearChange", _afterCurrentYearChange);
}

if (_afterDateFormatChange != null) {
	scopedAttributes.put("afterDateFormatChange", _afterDateFormatChange);
}

if (_afterDatesChange != null) {
	scopedAttributes.put("afterDatesChange", _afterDatesChange);
}

if (_afterDayNodeChange != null) {
	scopedAttributes.put("afterDayNodeChange", _afterDayNodeChange);
}

if (_afterDayNodeNameChange != null) {
	scopedAttributes.put("afterDayNodeNameChange", _afterDayNodeNameChange);
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

if (_afterFirstDayOfWeekChange != null) {
	scopedAttributes.put("afterFirstDayOfWeekChange", _afterFirstDayOfWeekChange);
}

if (_afterFocusedChange != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (_afterHeightChange != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (_afterHideClassChange != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (_afterHideDelayChange != null) {
	scopedAttributes.put("afterHideDelayChange", _afterHideDelayChange);
}

if (_afterHideOnChange != null) {
	scopedAttributes.put("afterHideOnChange", _afterHideOnChange);
}

if (_afterHideOnDocumentClickChange != null) {
	scopedAttributes.put("afterHideOnDocumentClickChange", _afterHideOnDocumentClickChange);
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

if (_afterMaxDateChange != null) {
	scopedAttributes.put("afterMaxDateChange", _afterMaxDateChange);
}

if (_afterMinDateChange != null) {
	scopedAttributes.put("afterMinDateChange", _afterMinDateChange);
}

if (_afterMonthNodeChange != null) {
	scopedAttributes.put("afterMonthNodeChange", _afterMonthNodeChange);
}

if (_afterMonthNodeNameChange != null) {
	scopedAttributes.put("afterMonthNodeNameChange", _afterMonthNodeNameChange);
}

if (_afterPopulateDayChange != null) {
	scopedAttributes.put("afterPopulateDayChange", _afterPopulateDayChange);
}

if (_afterPopulateMonthChange != null) {
	scopedAttributes.put("afterPopulateMonthChange", _afterPopulateMonthChange);
}

if (_afterPopulateYearChange != null) {
	scopedAttributes.put("afterPopulateYearChange", _afterPopulateYearChange);
}

if (_afterRenderChange != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (_afterRenderedChange != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (_afterSelectMultipleDatesChange != null) {
	scopedAttributes.put("afterSelectMultipleDatesChange", _afterSelectMultipleDatesChange);
}

if (_afterSelectWrapperNodeChange != null) {
	scopedAttributes.put("afterSelectWrapperNodeChange", _afterSelectWrapperNodeChange);
}

if (_afterSetValueChange != null) {
	scopedAttributes.put("afterSetValueChange", _afterSetValueChange);
}

if (_afterShowDelayChange != null) {
	scopedAttributes.put("afterShowDelayChange", _afterShowDelayChange);
}

if (_afterShowOnChange != null) {
	scopedAttributes.put("afterShowOnChange", _afterShowOnChange);
}

if (_afterSrcNodeChange != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (_afterStackChange != null) {
	scopedAttributes.put("afterStackChange", _afterStackChange);
}

if (_afterStringsChange != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (_afterTabIndexChange != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (_afterTriggerChange != null) {
	scopedAttributes.put("afterTriggerChange", _afterTriggerChange);
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

if (_afterYearNodeChange != null) {
	scopedAttributes.put("afterYearNodeChange", _afterYearNodeChange);
}

if (_afterYearNodeNameChange != null) {
	scopedAttributes.put("afterYearNodeNameChange", _afterYearNodeNameChange);
}

if (_afterYearRangeChange != null) {
	scopedAttributes.put("afterYearRangeChange", _afterYearRangeChange);
}

if (_onAlignChange != null) {
	scopedAttributes.put("onAlignChange", _onAlignChange);
}

if (_onAppendOrderChange != null) {
	scopedAttributes.put("onAppendOrderChange", _onAppendOrderChange);
}

if (_onBaseNameChange != null) {
	scopedAttributes.put("onBaseNameChange", _onBaseNameChange);
}

if (_onBoundingBoxChange != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (_onButtonNodeChange != null) {
	scopedAttributes.put("onButtonNodeChange", _onButtonNodeChange);
}

if (_onCancellableHideChange != null) {
	scopedAttributes.put("onCancellableHideChange", _onCancellableHideChange);
}

if (_onContentBoxChange != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (_onCssClassChange != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (_onCurrentDayChange != null) {
	scopedAttributes.put("onCurrentDayChange", _onCurrentDayChange);
}

if (_onCurrentMonthChange != null) {
	scopedAttributes.put("onCurrentMonthChange", _onCurrentMonthChange);
}

if (_onCurrentNodeChange != null) {
	scopedAttributes.put("onCurrentNodeChange", _onCurrentNodeChange);
}

if (_onCurrentYearChange != null) {
	scopedAttributes.put("onCurrentYearChange", _onCurrentYearChange);
}

if (_onDateFormatChange != null) {
	scopedAttributes.put("onDateFormatChange", _onDateFormatChange);
}

if (_onDatesChange != null) {
	scopedAttributes.put("onDatesChange", _onDatesChange);
}

if (_onDayNodeChange != null) {
	scopedAttributes.put("onDayNodeChange", _onDayNodeChange);
}

if (_onDayNodeNameChange != null) {
	scopedAttributes.put("onDayNodeNameChange", _onDayNodeNameChange);
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

if (_onFirstDayOfWeekChange != null) {
	scopedAttributes.put("onFirstDayOfWeekChange", _onFirstDayOfWeekChange);
}

if (_onFocusedChange != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (_onHeightChange != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (_onHideClassChange != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (_onHideDelayChange != null) {
	scopedAttributes.put("onHideDelayChange", _onHideDelayChange);
}

if (_onHideOnChange != null) {
	scopedAttributes.put("onHideOnChange", _onHideOnChange);
}

if (_onHideOnDocumentClickChange != null) {
	scopedAttributes.put("onHideOnDocumentClickChange", _onHideOnDocumentClickChange);
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

if (_onMaxDateChange != null) {
	scopedAttributes.put("onMaxDateChange", _onMaxDateChange);
}

if (_onMinDateChange != null) {
	scopedAttributes.put("onMinDateChange", _onMinDateChange);
}

if (_onMonthNodeChange != null) {
	scopedAttributes.put("onMonthNodeChange", _onMonthNodeChange);
}

if (_onMonthNodeNameChange != null) {
	scopedAttributes.put("onMonthNodeNameChange", _onMonthNodeNameChange);
}

if (_onPopulateDayChange != null) {
	scopedAttributes.put("onPopulateDayChange", _onPopulateDayChange);
}

if (_onPopulateMonthChange != null) {
	scopedAttributes.put("onPopulateMonthChange", _onPopulateMonthChange);
}

if (_onPopulateYearChange != null) {
	scopedAttributes.put("onPopulateYearChange", _onPopulateYearChange);
}

if (_onRenderChange != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (_onRenderedChange != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (_onSelectMultipleDatesChange != null) {
	scopedAttributes.put("onSelectMultipleDatesChange", _onSelectMultipleDatesChange);
}

if (_onSelectWrapperNodeChange != null) {
	scopedAttributes.put("onSelectWrapperNodeChange", _onSelectWrapperNodeChange);
}

if (_onSetValueChange != null) {
	scopedAttributes.put("onSetValueChange", _onSetValueChange);
}

if (_onShowDelayChange != null) {
	scopedAttributes.put("onShowDelayChange", _onShowDelayChange);
}

if (_onShowOnChange != null) {
	scopedAttributes.put("onShowOnChange", _onShowOnChange);
}

if (_onSrcNodeChange != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (_onStackChange != null) {
	scopedAttributes.put("onStackChange", _onStackChange);
}

if (_onStringsChange != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (_onTabIndexChange != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (_onTriggerChange != null) {
	scopedAttributes.put("onTriggerChange", _onTriggerChange);
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

if (_onYearNodeChange != null) {
	scopedAttributes.put("onYearNodeChange", _onYearNodeChange);
}

if (_onYearNodeNameChange != null) {
	scopedAttributes.put("onYearNodeNameChange", _onYearNodeNameChange);
}

if (_onYearRangeChange != null) {
	scopedAttributes.put("onYearRangeChange", _onYearRangeChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>