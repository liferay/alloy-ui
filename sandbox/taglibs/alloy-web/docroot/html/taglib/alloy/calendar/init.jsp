<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:calendar:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:calendar:scopedAttributes");

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:calendar:align");
java.lang.String _boundingBox = (java.lang.String)request.getAttribute("alloy:calendar:boundingBox");
java.lang.Boolean _cancellableHide = (java.lang.Boolean)request.getAttribute("alloy:calendar:cancellableHide");
java.lang.String _contentBox = (java.lang.String)request.getAttribute("alloy:calendar:contentBox");
java.lang.String _cssClass = (java.lang.String)request.getAttribute("alloy:calendar:cssClass");
java.lang.Number _currentDay = (java.lang.Number)request.getAttribute("alloy:calendar:currentDay");
java.lang.Number _currentMonth = (java.lang.Number)request.getAttribute("alloy:calendar:currentMonth");
java.lang.String _currentNode = (java.lang.String)request.getAttribute("alloy:calendar:currentNode");
java.lang.Number _currentYear = (java.lang.Number)request.getAttribute("alloy:calendar:currentYear");
java.lang.String _dateFormat = (java.lang.String)request.getAttribute("alloy:calendar:dateFormat");
java.lang.String _dates = (java.lang.String)request.getAttribute("alloy:calendar:dates");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:calendar:destroyed");
java.lang.Boolean _disabled = (java.lang.Boolean)request.getAttribute("alloy:calendar:disabled");
java.lang.Number _firstDayOfWeek = (java.lang.Number)request.getAttribute("alloy:calendar:firstDayOfWeek");
java.lang.Boolean _focused = (java.lang.Boolean)request.getAttribute("alloy:calendar:focused");
java.lang.String _height = (java.lang.String)request.getAttribute("alloy:calendar:height");
java.lang.String _hideClass = (java.lang.String)request.getAttribute("alloy:calendar:hideClass");
java.lang.Number _hideDelay = (java.lang.Number)request.getAttribute("alloy:calendar:hideDelay");
java.lang.String _hideOn = (java.lang.String)request.getAttribute("alloy:calendar:hideOn");
java.lang.Boolean _hideOnDocumentClick = (java.lang.Boolean)request.getAttribute("alloy:calendar:hideOnDocumentClick");
java.lang.String _calendarId = (java.lang.String)request.getAttribute("alloy:calendar:calendarId");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:calendar:initialized");
java.lang.String _maxDate = (java.lang.String)request.getAttribute("alloy:calendar:maxDate");
java.lang.String _minDate = (java.lang.String)request.getAttribute("alloy:calendar:minDate");
java.lang.Boolean _render = (java.lang.Boolean)request.getAttribute("alloy:calendar:render");
java.lang.Boolean _rendered = (java.lang.Boolean)request.getAttribute("alloy:calendar:rendered");
java.lang.Boolean _selectMultipleDates = (java.lang.Boolean)request.getAttribute("alloy:calendar:selectMultipleDates");
java.lang.Boolean _setValue = (java.lang.Boolean)request.getAttribute("alloy:calendar:setValue");
java.lang.Number _showDelay = (java.lang.Number)request.getAttribute("alloy:calendar:showDelay");
java.lang.String _showOn = (java.lang.String)request.getAttribute("alloy:calendar:showOn");
java.lang.String _srcNode = (java.lang.String)request.getAttribute("alloy:calendar:srcNode");
java.lang.Boolean _stack = (java.lang.Boolean)request.getAttribute("alloy:calendar:stack");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:calendar:strings");
java.lang.Number _tabIndex = (java.lang.Number)request.getAttribute("alloy:calendar:tabIndex");
java.lang.String _trigger = (java.lang.String)request.getAttribute("alloy:calendar:trigger");
java.lang.Boolean _visible = (java.lang.Boolean)request.getAttribute("alloy:calendar:visible");
java.lang.String _width = (java.lang.String)request.getAttribute("alloy:calendar:width");
java.lang.String _afterAlignChange = (java.lang.String)request.getAttribute("alloy:calendar:afterAlignChange");
java.lang.String _afterBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:calendar:afterBoundingBoxChange");
java.lang.String _afterCancellableHideChange = (java.lang.String)request.getAttribute("alloy:calendar:afterCancellableHideChange");
java.lang.String _afterContentBoxChange = (java.lang.String)request.getAttribute("alloy:calendar:afterContentBoxChange");
java.lang.String _afterCssClassChange = (java.lang.String)request.getAttribute("alloy:calendar:afterCssClassChange");
java.lang.String _afterCurrentDayChange = (java.lang.String)request.getAttribute("alloy:calendar:afterCurrentDayChange");
java.lang.String _afterCurrentMonthChange = (java.lang.String)request.getAttribute("alloy:calendar:afterCurrentMonthChange");
java.lang.String _afterCurrentNodeChange = (java.lang.String)request.getAttribute("alloy:calendar:afterCurrentNodeChange");
java.lang.String _afterCurrentYearChange = (java.lang.String)request.getAttribute("alloy:calendar:afterCurrentYearChange");
java.lang.String _afterDateFormatChange = (java.lang.String)request.getAttribute("alloy:calendar:afterDateFormatChange");
java.lang.String _afterDatesChange = (java.lang.String)request.getAttribute("alloy:calendar:afterDatesChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:calendar:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:calendar:afterDestroyedChange");
java.lang.String _afterDisabledChange = (java.lang.String)request.getAttribute("alloy:calendar:afterDisabledChange");
java.lang.String _afterFirstDayOfWeekChange = (java.lang.String)request.getAttribute("alloy:calendar:afterFirstDayOfWeekChange");
java.lang.String _afterFocusedChange = (java.lang.String)request.getAttribute("alloy:calendar:afterFocusedChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:calendar:afterHeightChange");
java.lang.String _afterHideClassChange = (java.lang.String)request.getAttribute("alloy:calendar:afterHideClassChange");
java.lang.String _afterHideDelayChange = (java.lang.String)request.getAttribute("alloy:calendar:afterHideDelayChange");
java.lang.String _afterHideOnChange = (java.lang.String)request.getAttribute("alloy:calendar:afterHideOnChange");
java.lang.String _afterHideOnDocumentClickChange = (java.lang.String)request.getAttribute("alloy:calendar:afterHideOnDocumentClickChange");
java.lang.String _afterIdChange = (java.lang.String)request.getAttribute("alloy:calendar:afterIdChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:calendar:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:calendar:afterInitializedChange");
java.lang.String _afterMaxDateChange = (java.lang.String)request.getAttribute("alloy:calendar:afterMaxDateChange");
java.lang.String _afterMinDateChange = (java.lang.String)request.getAttribute("alloy:calendar:afterMinDateChange");
java.lang.String _afterRenderChange = (java.lang.String)request.getAttribute("alloy:calendar:afterRenderChange");
java.lang.String _afterRenderedChange = (java.lang.String)request.getAttribute("alloy:calendar:afterRenderedChange");
java.lang.String _afterSelectMultipleDatesChange = (java.lang.String)request.getAttribute("alloy:calendar:afterSelectMultipleDatesChange");
java.lang.String _afterSetValueChange = (java.lang.String)request.getAttribute("alloy:calendar:afterSetValueChange");
java.lang.String _afterShowDelayChange = (java.lang.String)request.getAttribute("alloy:calendar:afterShowDelayChange");
java.lang.String _afterShowOnChange = (java.lang.String)request.getAttribute("alloy:calendar:afterShowOnChange");
java.lang.String _afterSrcNodeChange = (java.lang.String)request.getAttribute("alloy:calendar:afterSrcNodeChange");
java.lang.String _afterStackChange = (java.lang.String)request.getAttribute("alloy:calendar:afterStackChange");
java.lang.String _afterStringsChange = (java.lang.String)request.getAttribute("alloy:calendar:afterStringsChange");
java.lang.String _afterTabIndexChange = (java.lang.String)request.getAttribute("alloy:calendar:afterTabIndexChange");
java.lang.String _afterTriggerChange = (java.lang.String)request.getAttribute("alloy:calendar:afterTriggerChange");
java.lang.String _afterVisibleChange = (java.lang.String)request.getAttribute("alloy:calendar:afterVisibleChange");
java.lang.String _afterContentUpdate = (java.lang.String)request.getAttribute("alloy:calendar:afterContentUpdate");
java.lang.String _afterRender = (java.lang.String)request.getAttribute("alloy:calendar:afterRender");
java.lang.String _afterWidthChange = (java.lang.String)request.getAttribute("alloy:calendar:afterWidthChange");
java.lang.String _onAlignChange = (java.lang.String)request.getAttribute("alloy:calendar:onAlignChange");
java.lang.String _onBoundingBoxChange = (java.lang.String)request.getAttribute("alloy:calendar:onBoundingBoxChange");
java.lang.String _onCancellableHideChange = (java.lang.String)request.getAttribute("alloy:calendar:onCancellableHideChange");
java.lang.String _onContentBoxChange = (java.lang.String)request.getAttribute("alloy:calendar:onContentBoxChange");
java.lang.String _onCssClassChange = (java.lang.String)request.getAttribute("alloy:calendar:onCssClassChange");
java.lang.String _onCurrentDayChange = (java.lang.String)request.getAttribute("alloy:calendar:onCurrentDayChange");
java.lang.String _onCurrentMonthChange = (java.lang.String)request.getAttribute("alloy:calendar:onCurrentMonthChange");
java.lang.String _onCurrentNodeChange = (java.lang.String)request.getAttribute("alloy:calendar:onCurrentNodeChange");
java.lang.String _onCurrentYearChange = (java.lang.String)request.getAttribute("alloy:calendar:onCurrentYearChange");
java.lang.String _onDateFormatChange = (java.lang.String)request.getAttribute("alloy:calendar:onDateFormatChange");
java.lang.String _onDatesChange = (java.lang.String)request.getAttribute("alloy:calendar:onDatesChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:calendar:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:calendar:onDestroyedChange");
java.lang.String _onDisabledChange = (java.lang.String)request.getAttribute("alloy:calendar:onDisabledChange");
java.lang.String _onFirstDayOfWeekChange = (java.lang.String)request.getAttribute("alloy:calendar:onFirstDayOfWeekChange");
java.lang.String _onFocusedChange = (java.lang.String)request.getAttribute("alloy:calendar:onFocusedChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:calendar:onHeightChange");
java.lang.String _onHideClassChange = (java.lang.String)request.getAttribute("alloy:calendar:onHideClassChange");
java.lang.String _onHideDelayChange = (java.lang.String)request.getAttribute("alloy:calendar:onHideDelayChange");
java.lang.String _onHideOnChange = (java.lang.String)request.getAttribute("alloy:calendar:onHideOnChange");
java.lang.String _onHideOnDocumentClickChange = (java.lang.String)request.getAttribute("alloy:calendar:onHideOnDocumentClickChange");
java.lang.String _onIdChange = (java.lang.String)request.getAttribute("alloy:calendar:onIdChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:calendar:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:calendar:onInitializedChange");
java.lang.String _onMaxDateChange = (java.lang.String)request.getAttribute("alloy:calendar:onMaxDateChange");
java.lang.String _onMinDateChange = (java.lang.String)request.getAttribute("alloy:calendar:onMinDateChange");
java.lang.String _onRenderChange = (java.lang.String)request.getAttribute("alloy:calendar:onRenderChange");
java.lang.String _onRenderedChange = (java.lang.String)request.getAttribute("alloy:calendar:onRenderedChange");
java.lang.String _onSelectMultipleDatesChange = (java.lang.String)request.getAttribute("alloy:calendar:onSelectMultipleDatesChange");
java.lang.String _onSetValueChange = (java.lang.String)request.getAttribute("alloy:calendar:onSetValueChange");
java.lang.String _onShowDelayChange = (java.lang.String)request.getAttribute("alloy:calendar:onShowDelayChange");
java.lang.String _onShowOnChange = (java.lang.String)request.getAttribute("alloy:calendar:onShowOnChange");
java.lang.String _onSrcNodeChange = (java.lang.String)request.getAttribute("alloy:calendar:onSrcNodeChange");
java.lang.String _onStackChange = (java.lang.String)request.getAttribute("alloy:calendar:onStackChange");
java.lang.String _onStringsChange = (java.lang.String)request.getAttribute("alloy:calendar:onStringsChange");
java.lang.String _onTabIndexChange = (java.lang.String)request.getAttribute("alloy:calendar:onTabIndexChange");
java.lang.String _onTriggerChange = (java.lang.String)request.getAttribute("alloy:calendar:onTriggerChange");
java.lang.String _onVisibleChange = (java.lang.String)request.getAttribute("alloy:calendar:onVisibleChange");
java.lang.String _onContentUpdate = (java.lang.String)request.getAttribute("alloy:calendar:onContentUpdate");
java.lang.String _onRender = (java.lang.String)request.getAttribute("alloy:calendar:onRender");
java.lang.String _onWidthChange = (java.lang.String)request.getAttribute("alloy:calendar:onWidthChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_align != null) {
	scopedAttributes.put("align", _align);
}

if (_boundingBox != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
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

if (_calendarId != null) {
	scopedAttributes.put("calendarId", _calendarId);
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

if (_render != null) {
	scopedAttributes.put("render", _render);
}

if (_rendered != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (_selectMultipleDates != null) {
	scopedAttributes.put("selectMultipleDates", _selectMultipleDates);
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

if (_afterAlignChange != null) {
	scopedAttributes.put("afterAlignChange", _afterAlignChange);
}

if (_afterBoundingBoxChange != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
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

if (_afterRenderChange != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (_afterRenderedChange != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (_afterSelectMultipleDatesChange != null) {
	scopedAttributes.put("afterSelectMultipleDatesChange", _afterSelectMultipleDatesChange);
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

if (_onAlignChange != null) {
	scopedAttributes.put("onAlignChange", _onAlignChange);
}

if (_onBoundingBoxChange != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
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

if (_onRenderChange != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (_onRenderedChange != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (_onSelectMultipleDatesChange != null) {
	scopedAttributes.put("onSelectMultipleDatesChange", _onSelectMultipleDatesChange);
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

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>