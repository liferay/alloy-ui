<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:calendar:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:calendar:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();
	
	if ((String)request.getAttribute("alloy:calendar:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _align = (java.lang.Object)request.getAttribute("alloy:calendar:align");
java.lang.String _calendarBodyContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:calendarBodyContent"));
java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:boundingBox"));
java.lang.Boolean _cancellableHide = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:cancellableHide"));
java.lang.String _centered = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:centered"));
java.lang.String _constrain = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:constrain"));
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:cssClass"));
java.lang.Number _currentDay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:currentDay"));
java.lang.Number _currentMonth = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:currentMonth"));
java.lang.String _currentNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:currentNode"));
java.lang.Number _currentYear = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:currentYear"));
java.lang.String _dateFormat = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:dateFormat"));
java.lang.String _dates = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:dates"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:destroyed"));
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:disabled"));
java.lang.String _fillHeight = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:fillHeight"));
java.lang.Number _firstDayOfWeek = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:firstDayOfWeek"));
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:focused"));
java.lang.String _footerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:footerContent"));
java.lang.String _headerContent = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:headerContent"));
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:hideClass"));
java.lang.Number _hideDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:hideDelay"));
java.lang.String _hideOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:hideOn"));
java.lang.Boolean _hideOnDocumentClick = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:hideOnDocumentClick"));
java.lang.String _calendarId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:calendarId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:initialized"));
java.lang.String _maxDate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:maxDate"));
java.lang.String _minDate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:minDate"));
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:preventOverlap"));
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:render"));
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:rendered"));
java.lang.Boolean _selectMultipleDates = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:selectMultipleDates"));
java.lang.Boolean _setValue = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:setValue"));
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:shim"));
java.lang.Number _showDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:showDelay"));
java.lang.String _showOn = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:showOn"));
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:srcNode"));
java.lang.Boolean _stack = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:stack"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:calendar:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:tabIndex"));
java.lang.String _trigger = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:trigger"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:visible"));
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:width"));
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:x"));
java.lang.String _xy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:xy"));
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:y"));
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:zIndex"));
java.lang.String _afterAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterAlignChange"));
java.lang.String _afterBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterBodyContentChange"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterBoundingBoxChange"));
java.lang.String _afterCancellableHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterCancellableHideChange"));
java.lang.String _afterCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterCenteredChange"));
java.lang.String _afterConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterConstrainChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterCssClassChange"));
java.lang.String _afterCurrentDayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterCurrentDayChange"));
java.lang.String _afterCurrentMonthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterCurrentMonthChange"));
java.lang.String _afterCurrentNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterCurrentNodeChange"));
java.lang.String _afterCurrentYearChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterCurrentYearChange"));
java.lang.String _afterDateFormatChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterDateFormatChange"));
java.lang.String _afterDatesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterDatesChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterDisabledChange"));
java.lang.String _afterFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterFillHeightChange"));
java.lang.String _afterFirstDayOfWeekChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterFirstDayOfWeekChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterFocusedChange"));
java.lang.String _afterFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterFooterContentChange"));
java.lang.String _afterHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterHeaderContentChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterHeightChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterHideClassChange"));
java.lang.String _afterHideDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterHideDelayChange"));
java.lang.String _afterHideOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterHideOnChange"));
java.lang.String _afterHideOnDocumentClickChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterHideOnDocumentClickChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterInitializedChange"));
java.lang.String _afterMaxDateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterMaxDateChange"));
java.lang.String _afterMinDateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterMinDateChange"));
java.lang.String _afterPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterPreventOverlapChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterRenderedChange"));
java.lang.String _afterSelectMultipleDatesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterSelectMultipleDatesChange"));
java.lang.String _afterSetValueChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterSetValueChange"));
java.lang.String _afterShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterShimChange"));
java.lang.String _afterShowDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterShowDelayChange"));
java.lang.String _afterShowOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterShowOnChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterSrcNodeChange"));
java.lang.String _afterStackChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterStackChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterTabIndexChange"));
java.lang.String _afterTriggerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterTriggerChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterWidthChange"));
java.lang.String _afterXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterXChange"));
java.lang.String _afterXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterXyChange"));
java.lang.String _afterYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterYChange"));
java.lang.String _afterZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:afterZIndexChange"));
java.lang.String _onAlignChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onAlignChange"));
java.lang.String _onBodyContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onBodyContentChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onBoundingBoxChange"));
java.lang.String _onCancellableHideChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onCancellableHideChange"));
java.lang.String _onCenteredChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onCenteredChange"));
java.lang.String _onConstrainChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onConstrainChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onCssClassChange"));
java.lang.String _onCurrentDayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onCurrentDayChange"));
java.lang.String _onCurrentMonthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onCurrentMonthChange"));
java.lang.String _onCurrentNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onCurrentNodeChange"));
java.lang.String _onCurrentYearChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onCurrentYearChange"));
java.lang.String _onDateFormatChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onDateFormatChange"));
java.lang.String _onDatesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onDatesChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onDisabledChange"));
java.lang.String _onFillHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onFillHeightChange"));
java.lang.String _onFirstDayOfWeekChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onFirstDayOfWeekChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onFocusedChange"));
java.lang.String _onFooterContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onFooterContentChange"));
java.lang.String _onHeaderContentChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onHeaderContentChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onHeightChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onHideClassChange"));
java.lang.String _onHideDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onHideDelayChange"));
java.lang.String _onHideOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onHideOnChange"));
java.lang.String _onHideOnDocumentClickChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onHideOnDocumentClickChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onInitializedChange"));
java.lang.String _onMaxDateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onMaxDateChange"));
java.lang.String _onMinDateChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onMinDateChange"));
java.lang.String _onPreventOverlapChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onPreventOverlapChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onRenderedChange"));
java.lang.String _onSelectMultipleDatesChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onSelectMultipleDatesChange"));
java.lang.String _onSetValueChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onSetValueChange"));
java.lang.String _onShimChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onShimChange"));
java.lang.String _onShowDelayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onShowDelayChange"));
java.lang.String _onShowOnChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onShowOnChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onSrcNodeChange"));
java.lang.String _onStackChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onStackChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onTabIndexChange"));
java.lang.String _onTriggerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onTriggerChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onWidthChange"));
java.lang.String _onXChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onXChange"));
java.lang.String _onXyChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onXyChange"));
java.lang.String _onYChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onYChange"));
java.lang.String _onZIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:calendar:onZIndexChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:calendar:align") != null) {
	scopedAttributes.put("align", _align);
}

if (request.getAttribute("alloy:calendar:calendarBodyContent") != null) {
	scopedAttributes.put("calendarBodyContent", _calendarBodyContent);
}

if (request.getAttribute("alloy:calendar:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:calendar:cancellableHide") != null) {
	scopedAttributes.put("cancellableHide", _cancellableHide);
}

if (request.getAttribute("alloy:calendar:centered") != null) {
	scopedAttributes.put("centered", _centered);
}

if (request.getAttribute("alloy:calendar:constrain") != null) {
	scopedAttributes.put("constrain", _constrain);
}

if (request.getAttribute("alloy:calendar:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:calendar:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:calendar:currentDay") != null) {
	scopedAttributes.put("currentDay", _currentDay);
}

if (request.getAttribute("alloy:calendar:currentMonth") != null) {
	scopedAttributes.put("currentMonth", _currentMonth);
}

if (request.getAttribute("alloy:calendar:currentNode") != null) {
	scopedAttributes.put("currentNode", _currentNode);
}

if (request.getAttribute("alloy:calendar:currentYear") != null) {
	scopedAttributes.put("currentYear", _currentYear);
}

if (request.getAttribute("alloy:calendar:dateFormat") != null) {
	scopedAttributes.put("dateFormat", _dateFormat);
}

if (request.getAttribute("alloy:calendar:dates") != null) {
	scopedAttributes.put("dates", _dates);
}

if (request.getAttribute("alloy:calendar:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:calendar:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:calendar:fillHeight") != null) {
	scopedAttributes.put("fillHeight", _fillHeight);
}

if (request.getAttribute("alloy:calendar:firstDayOfWeek") != null) {
	scopedAttributes.put("firstDayOfWeek", _firstDayOfWeek);
}

if (request.getAttribute("alloy:calendar:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:calendar:footerContent") != null) {
	scopedAttributes.put("footerContent", _footerContent);
}

if (request.getAttribute("alloy:calendar:headerContent") != null) {
	scopedAttributes.put("headerContent", _headerContent);
}

if (request.getAttribute("alloy:calendar:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:calendar:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:calendar:hideDelay") != null) {
	scopedAttributes.put("hideDelay", _hideDelay);
}

if (request.getAttribute("alloy:calendar:hideOn") != null) {
	scopedAttributes.put("hideOn", _hideOn);
}

if (request.getAttribute("alloy:calendar:hideOnDocumentClick") != null) {
	scopedAttributes.put("hideOnDocumentClick", _hideOnDocumentClick);
}

if (request.getAttribute("alloy:calendar:calendarId") != null) {
	scopedAttributes.put("calendarId", _calendarId);
}

if (request.getAttribute("alloy:calendar:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:calendar:maxDate") != null) {
	scopedAttributes.put("maxDate", _maxDate);
}

if (request.getAttribute("alloy:calendar:minDate") != null) {
	scopedAttributes.put("minDate", _minDate);
}

if (request.getAttribute("alloy:calendar:preventOverlap") != null) {
	scopedAttributes.put("preventOverlap", _preventOverlap);
}

if (request.getAttribute("alloy:calendar:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:calendar:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:calendar:selectMultipleDates") != null) {
	scopedAttributes.put("selectMultipleDates", _selectMultipleDates);
}

if (request.getAttribute("alloy:calendar:setValue") != null) {
	scopedAttributes.put("setValue", _setValue);
}

if (request.getAttribute("alloy:calendar:shim") != null) {
	scopedAttributes.put("shim", _shim);
}

if (request.getAttribute("alloy:calendar:showDelay") != null) {
	scopedAttributes.put("showDelay", _showDelay);
}

if (request.getAttribute("alloy:calendar:showOn") != null) {
	scopedAttributes.put("showOn", _showOn);
}

if (request.getAttribute("alloy:calendar:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:calendar:stack") != null) {
	scopedAttributes.put("stack", _stack);
}

if (request.getAttribute("alloy:calendar:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:calendar:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:calendar:trigger") != null) {
	scopedAttributes.put("trigger", _trigger);
}

if (request.getAttribute("alloy:calendar:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:calendar:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:calendar:x") != null) {
	scopedAttributes.put("x", _x);
}

if (request.getAttribute("alloy:calendar:xy") != null) {
	scopedAttributes.put("xy", _xy);
}

if (request.getAttribute("alloy:calendar:y") != null) {
	scopedAttributes.put("y", _y);
}

if (request.getAttribute("alloy:calendar:zIndex") != null) {
	scopedAttributes.put("zIndex", _zIndex);
}

if (request.getAttribute("alloy:calendar:afterAlignChange") != null) {
	scopedAttributes.put("afterAlignChange", _afterAlignChange);
}

if (request.getAttribute("alloy:calendar:afterBodyContentChange") != null) {
	scopedAttributes.put("afterBodyContentChange", _afterBodyContentChange);
}

if (request.getAttribute("alloy:calendar:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:calendar:afterCancellableHideChange") != null) {
	scopedAttributes.put("afterCancellableHideChange", _afterCancellableHideChange);
}

if (request.getAttribute("alloy:calendar:afterCenteredChange") != null) {
	scopedAttributes.put("afterCenteredChange", _afterCenteredChange);
}

if (request.getAttribute("alloy:calendar:afterConstrainChange") != null) {
	scopedAttributes.put("afterConstrainChange", _afterConstrainChange);
}

if (request.getAttribute("alloy:calendar:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:calendar:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:calendar:afterCurrentDayChange") != null) {
	scopedAttributes.put("afterCurrentDayChange", _afterCurrentDayChange);
}

if (request.getAttribute("alloy:calendar:afterCurrentMonthChange") != null) {
	scopedAttributes.put("afterCurrentMonthChange", _afterCurrentMonthChange);
}

if (request.getAttribute("alloy:calendar:afterCurrentNodeChange") != null) {
	scopedAttributes.put("afterCurrentNodeChange", _afterCurrentNodeChange);
}

if (request.getAttribute("alloy:calendar:afterCurrentYearChange") != null) {
	scopedAttributes.put("afterCurrentYearChange", _afterCurrentYearChange);
}

if (request.getAttribute("alloy:calendar:afterDateFormatChange") != null) {
	scopedAttributes.put("afterDateFormatChange", _afterDateFormatChange);
}

if (request.getAttribute("alloy:calendar:afterDatesChange") != null) {
	scopedAttributes.put("afterDatesChange", _afterDatesChange);
}

if (request.getAttribute("alloy:calendar:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:calendar:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:calendar:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:calendar:afterFillHeightChange") != null) {
	scopedAttributes.put("afterFillHeightChange", _afterFillHeightChange);
}

if (request.getAttribute("alloy:calendar:afterFirstDayOfWeekChange") != null) {
	scopedAttributes.put("afterFirstDayOfWeekChange", _afterFirstDayOfWeekChange);
}

if (request.getAttribute("alloy:calendar:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:calendar:afterFooterContentChange") != null) {
	scopedAttributes.put("afterFooterContentChange", _afterFooterContentChange);
}

if (request.getAttribute("alloy:calendar:afterHeaderContentChange") != null) {
	scopedAttributes.put("afterHeaderContentChange", _afterHeaderContentChange);
}

if (request.getAttribute("alloy:calendar:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:calendar:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:calendar:afterHideDelayChange") != null) {
	scopedAttributes.put("afterHideDelayChange", _afterHideDelayChange);
}

if (request.getAttribute("alloy:calendar:afterHideOnChange") != null) {
	scopedAttributes.put("afterHideOnChange", _afterHideOnChange);
}

if (request.getAttribute("alloy:calendar:afterHideOnDocumentClickChange") != null) {
	scopedAttributes.put("afterHideOnDocumentClickChange", _afterHideOnDocumentClickChange);
}

if (request.getAttribute("alloy:calendar:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:calendar:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:calendar:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:calendar:afterMaxDateChange") != null) {
	scopedAttributes.put("afterMaxDateChange", _afterMaxDateChange);
}

if (request.getAttribute("alloy:calendar:afterMinDateChange") != null) {
	scopedAttributes.put("afterMinDateChange", _afterMinDateChange);
}

if (request.getAttribute("alloy:calendar:afterPreventOverlapChange") != null) {
	scopedAttributes.put("afterPreventOverlapChange", _afterPreventOverlapChange);
}

if (request.getAttribute("alloy:calendar:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:calendar:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:calendar:afterSelectMultipleDatesChange") != null) {
	scopedAttributes.put("afterSelectMultipleDatesChange", _afterSelectMultipleDatesChange);
}

if (request.getAttribute("alloy:calendar:afterSetValueChange") != null) {
	scopedAttributes.put("afterSetValueChange", _afterSetValueChange);
}

if (request.getAttribute("alloy:calendar:afterShimChange") != null) {
	scopedAttributes.put("afterShimChange", _afterShimChange);
}

if (request.getAttribute("alloy:calendar:afterShowDelayChange") != null) {
	scopedAttributes.put("afterShowDelayChange", _afterShowDelayChange);
}

if (request.getAttribute("alloy:calendar:afterShowOnChange") != null) {
	scopedAttributes.put("afterShowOnChange", _afterShowOnChange);
}

if (request.getAttribute("alloy:calendar:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:calendar:afterStackChange") != null) {
	scopedAttributes.put("afterStackChange", _afterStackChange);
}

if (request.getAttribute("alloy:calendar:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:calendar:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:calendar:afterTriggerChange") != null) {
	scopedAttributes.put("afterTriggerChange", _afterTriggerChange);
}

if (request.getAttribute("alloy:calendar:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:calendar:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:calendar:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:calendar:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:calendar:afterXChange") != null) {
	scopedAttributes.put("afterXChange", _afterXChange);
}

if (request.getAttribute("alloy:calendar:afterXyChange") != null) {
	scopedAttributes.put("afterXyChange", _afterXyChange);
}

if (request.getAttribute("alloy:calendar:afterYChange") != null) {
	scopedAttributes.put("afterYChange", _afterYChange);
}

if (request.getAttribute("alloy:calendar:afterZIndexChange") != null) {
	scopedAttributes.put("afterZIndexChange", _afterZIndexChange);
}

if (request.getAttribute("alloy:calendar:onAlignChange") != null) {
	scopedAttributes.put("onAlignChange", _onAlignChange);
}

if (request.getAttribute("alloy:calendar:onBodyContentChange") != null) {
	scopedAttributes.put("onBodyContentChange", _onBodyContentChange);
}

if (request.getAttribute("alloy:calendar:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:calendar:onCancellableHideChange") != null) {
	scopedAttributes.put("onCancellableHideChange", _onCancellableHideChange);
}

if (request.getAttribute("alloy:calendar:onCenteredChange") != null) {
	scopedAttributes.put("onCenteredChange", _onCenteredChange);
}

if (request.getAttribute("alloy:calendar:onConstrainChange") != null) {
	scopedAttributes.put("onConstrainChange", _onConstrainChange);
}

if (request.getAttribute("alloy:calendar:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:calendar:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:calendar:onCurrentDayChange") != null) {
	scopedAttributes.put("onCurrentDayChange", _onCurrentDayChange);
}

if (request.getAttribute("alloy:calendar:onCurrentMonthChange") != null) {
	scopedAttributes.put("onCurrentMonthChange", _onCurrentMonthChange);
}

if (request.getAttribute("alloy:calendar:onCurrentNodeChange") != null) {
	scopedAttributes.put("onCurrentNodeChange", _onCurrentNodeChange);
}

if (request.getAttribute("alloy:calendar:onCurrentYearChange") != null) {
	scopedAttributes.put("onCurrentYearChange", _onCurrentYearChange);
}

if (request.getAttribute("alloy:calendar:onDateFormatChange") != null) {
	scopedAttributes.put("onDateFormatChange", _onDateFormatChange);
}

if (request.getAttribute("alloy:calendar:onDatesChange") != null) {
	scopedAttributes.put("onDatesChange", _onDatesChange);
}

if (request.getAttribute("alloy:calendar:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:calendar:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:calendar:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:calendar:onFillHeightChange") != null) {
	scopedAttributes.put("onFillHeightChange", _onFillHeightChange);
}

if (request.getAttribute("alloy:calendar:onFirstDayOfWeekChange") != null) {
	scopedAttributes.put("onFirstDayOfWeekChange", _onFirstDayOfWeekChange);
}

if (request.getAttribute("alloy:calendar:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:calendar:onFooterContentChange") != null) {
	scopedAttributes.put("onFooterContentChange", _onFooterContentChange);
}

if (request.getAttribute("alloy:calendar:onHeaderContentChange") != null) {
	scopedAttributes.put("onHeaderContentChange", _onHeaderContentChange);
}

if (request.getAttribute("alloy:calendar:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:calendar:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:calendar:onHideDelayChange") != null) {
	scopedAttributes.put("onHideDelayChange", _onHideDelayChange);
}

if (request.getAttribute("alloy:calendar:onHideOnChange") != null) {
	scopedAttributes.put("onHideOnChange", _onHideOnChange);
}

if (request.getAttribute("alloy:calendar:onHideOnDocumentClickChange") != null) {
	scopedAttributes.put("onHideOnDocumentClickChange", _onHideOnDocumentClickChange);
}

if (request.getAttribute("alloy:calendar:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:calendar:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:calendar:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:calendar:onMaxDateChange") != null) {
	scopedAttributes.put("onMaxDateChange", _onMaxDateChange);
}

if (request.getAttribute("alloy:calendar:onMinDateChange") != null) {
	scopedAttributes.put("onMinDateChange", _onMinDateChange);
}

if (request.getAttribute("alloy:calendar:onPreventOverlapChange") != null) {
	scopedAttributes.put("onPreventOverlapChange", _onPreventOverlapChange);
}

if (request.getAttribute("alloy:calendar:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:calendar:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:calendar:onSelectMultipleDatesChange") != null) {
	scopedAttributes.put("onSelectMultipleDatesChange", _onSelectMultipleDatesChange);
}

if (request.getAttribute("alloy:calendar:onSetValueChange") != null) {
	scopedAttributes.put("onSetValueChange", _onSetValueChange);
}

if (request.getAttribute("alloy:calendar:onShimChange") != null) {
	scopedAttributes.put("onShimChange", _onShimChange);
}

if (request.getAttribute("alloy:calendar:onShowDelayChange") != null) {
	scopedAttributes.put("onShowDelayChange", _onShowDelayChange);
}

if (request.getAttribute("alloy:calendar:onShowOnChange") != null) {
	scopedAttributes.put("onShowOnChange", _onShowOnChange);
}

if (request.getAttribute("alloy:calendar:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:calendar:onStackChange") != null) {
	scopedAttributes.put("onStackChange", _onStackChange);
}

if (request.getAttribute("alloy:calendar:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:calendar:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:calendar:onTriggerChange") != null) {
	scopedAttributes.put("onTriggerChange", _onTriggerChange);
}

if (request.getAttribute("alloy:calendar:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:calendar:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:calendar:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:calendar:onWidthChange") != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

if (request.getAttribute("alloy:calendar:onXChange") != null) {
	scopedAttributes.put("onXChange", _onXChange);
}

if (request.getAttribute("alloy:calendar:onXyChange") != null) {
	scopedAttributes.put("onXyChange", _onXyChange);
}

if (request.getAttribute("alloy:calendar:onYChange") != null) {
	scopedAttributes.put("onYChange", _onYChange);
}

if (request.getAttribute("alloy:calendar:onZIndexChange") != null) {
	scopedAttributes.put("onZIndexChange", _onZIndexChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>