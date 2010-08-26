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
java.lang.Object _calendarBodyContent = (java.lang.Object)request.getAttribute("alloy:calendar:calendarBodyContent");
java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:calendar:boundingBox");
java.lang.Boolean _cancellableHide = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:cancellableHide"), true);
java.lang.Object _centered = (java.lang.Object)request.getAttribute("alloy:calendar:centered");
java.lang.Object _constrain = (java.lang.Object)request.getAttribute("alloy:calendar:constrain");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:calendar:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:calendar:cssClass");
java.lang.Number _currentDay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:currentDay"), 0);
java.lang.Number _currentMonth = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:currentMonth"), 0);
java.lang.Object _currentNode = (java.lang.Object)request.getAttribute("alloy:calendar:currentNode");
java.lang.Number _currentYear = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:currentYear"), 0);
java.lang.Object _dateFormat = (java.lang.Object)request.getAttribute("alloy:calendar:dateFormat");
java.lang.Object _dates = (java.lang.Object)request.getAttribute("alloy:calendar:dates");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:disabled"), false);
java.lang.Object _fillHeight = (java.lang.Object)request.getAttribute("alloy:calendar:fillHeight");
java.lang.Number _firstDayOfWeek = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:firstDayOfWeek"), 0);
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:focused"), false);
java.lang.Object _footerContent = (java.lang.Object)request.getAttribute("alloy:calendar:footerContent");
java.lang.Object _headerContent = (java.lang.Object)request.getAttribute("alloy:calendar:headerContent");
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:calendar:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:calendar:hideClass");
java.lang.Number _hideDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:hideDelay"), 0);
java.lang.Object _hideOn = (java.lang.Object)request.getAttribute("alloy:calendar:hideOn");
java.lang.Boolean _hideOnDocumentClick = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:hideOnDocumentClick"), true);
java.lang.Object _calendarId = (java.lang.Object)request.getAttribute("alloy:calendar:calendarId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:initialized"), false);
java.lang.Object _maxDate = (java.lang.Object)request.getAttribute("alloy:calendar:maxDate");
java.lang.Object _minDate = (java.lang.Object)request.getAttribute("alloy:calendar:minDate");
java.lang.Boolean _preventOverlap = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:preventOverlap"), false);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:rendered"), false);
java.lang.Boolean _selectMultipleDates = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:selectMultipleDates"), false);
java.lang.Boolean _setValue = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:setValue"), true);
java.lang.Boolean _shim = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:shim"), false);
java.lang.Number _showDelay = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:showDelay"), 0);
java.lang.Object _showOn = (java.lang.Object)request.getAttribute("alloy:calendar:showOn");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:calendar:srcNode");
java.lang.Boolean _stack = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:stack"), true);
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:calendar:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:tabIndex"), 0);
java.lang.Object _trigger = (java.lang.Object)request.getAttribute("alloy:calendar:trigger");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:calendar:visible"), false);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:calendar:width");
java.lang.Number _x = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:x"), 0);
java.lang.Object _xy = (java.lang.Object)request.getAttribute("alloy:calendar:xy");
java.lang.Number _y = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:y"), 0);
java.lang.Number _zIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:calendar:zIndex"), 0);
java.lang.Object _afterAlignChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterAlignChange");
java.lang.Object _afterBodyContentChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterBodyContentChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterBoundingBoxChange");
java.lang.Object _afterCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterCancellableHideChange");
java.lang.Object _afterCenteredChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterCenteredChange");
java.lang.Object _afterConstrainChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterConstrainChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterCssClassChange");
java.lang.Object _afterCurrentDayChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterCurrentDayChange");
java.lang.Object _afterCurrentMonthChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterCurrentMonthChange");
java.lang.Object _afterCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterCurrentNodeChange");
java.lang.Object _afterCurrentYearChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterCurrentYearChange");
java.lang.Object _afterDateFormatChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterDateFormatChange");
java.lang.Object _afterDatesChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterDatesChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:calendar:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterDisabledChange");
java.lang.Object _afterFillHeightChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterFillHeightChange");
java.lang.Object _afterFirstDayOfWeekChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterFirstDayOfWeekChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterFocusedChange");
java.lang.Object _afterFooterContentChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterFooterContentChange");
java.lang.Object _afterHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterHeaderContentChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterHideClassChange");
java.lang.Object _afterHideDelayChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterHideDelayChange");
java.lang.Object _afterHideOnChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterHideOnChange");
java.lang.Object _afterHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterHideOnDocumentClickChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:calendar:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterInitializedChange");
java.lang.Object _afterMaxDateChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterMaxDateChange");
java.lang.Object _afterMinDateChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterMinDateChange");
java.lang.Object _afterPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterPreventOverlapChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterRenderedChange");
java.lang.Object _afterSelectMultipleDatesChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterSelectMultipleDatesChange");
java.lang.Object _afterSetValueChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterSetValueChange");
java.lang.Object _afterShimChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterShimChange");
java.lang.Object _afterShowDelayChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterShowDelayChange");
java.lang.Object _afterShowOnChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterShowOnChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterSrcNodeChange");
java.lang.Object _afterStackChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterStackChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterTabIndexChange");
java.lang.Object _afterTriggerChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterTriggerChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:calendar:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:calendar:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterWidthChange");
java.lang.Object _afterXChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterXChange");
java.lang.Object _afterXyChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterXyChange");
java.lang.Object _afterYChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterYChange");
java.lang.Object _afterZIndexChange = (java.lang.Object)request.getAttribute("alloy:calendar:afterZIndexChange");
java.lang.Object _onAlignChange = (java.lang.Object)request.getAttribute("alloy:calendar:onAlignChange");
java.lang.Object _onBodyContentChange = (java.lang.Object)request.getAttribute("alloy:calendar:onBodyContentChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:calendar:onBoundingBoxChange");
java.lang.Object _onCancellableHideChange = (java.lang.Object)request.getAttribute("alloy:calendar:onCancellableHideChange");
java.lang.Object _onCenteredChange = (java.lang.Object)request.getAttribute("alloy:calendar:onCenteredChange");
java.lang.Object _onConstrainChange = (java.lang.Object)request.getAttribute("alloy:calendar:onConstrainChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:calendar:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:calendar:onCssClassChange");
java.lang.Object _onCurrentDayChange = (java.lang.Object)request.getAttribute("alloy:calendar:onCurrentDayChange");
java.lang.Object _onCurrentMonthChange = (java.lang.Object)request.getAttribute("alloy:calendar:onCurrentMonthChange");
java.lang.Object _onCurrentNodeChange = (java.lang.Object)request.getAttribute("alloy:calendar:onCurrentNodeChange");
java.lang.Object _onCurrentYearChange = (java.lang.Object)request.getAttribute("alloy:calendar:onCurrentYearChange");
java.lang.Object _onDateFormatChange = (java.lang.Object)request.getAttribute("alloy:calendar:onDateFormatChange");
java.lang.Object _onDatesChange = (java.lang.Object)request.getAttribute("alloy:calendar:onDatesChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:calendar:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:calendar:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:calendar:onDisabledChange");
java.lang.Object _onFillHeightChange = (java.lang.Object)request.getAttribute("alloy:calendar:onFillHeightChange");
java.lang.Object _onFirstDayOfWeekChange = (java.lang.Object)request.getAttribute("alloy:calendar:onFirstDayOfWeekChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:calendar:onFocusedChange");
java.lang.Object _onFooterContentChange = (java.lang.Object)request.getAttribute("alloy:calendar:onFooterContentChange");
java.lang.Object _onHeaderContentChange = (java.lang.Object)request.getAttribute("alloy:calendar:onHeaderContentChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:calendar:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:calendar:onHideClassChange");
java.lang.Object _onHideDelayChange = (java.lang.Object)request.getAttribute("alloy:calendar:onHideDelayChange");
java.lang.Object _onHideOnChange = (java.lang.Object)request.getAttribute("alloy:calendar:onHideOnChange");
java.lang.Object _onHideOnDocumentClickChange = (java.lang.Object)request.getAttribute("alloy:calendar:onHideOnDocumentClickChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:calendar:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:calendar:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:calendar:onInitializedChange");
java.lang.Object _onMaxDateChange = (java.lang.Object)request.getAttribute("alloy:calendar:onMaxDateChange");
java.lang.Object _onMinDateChange = (java.lang.Object)request.getAttribute("alloy:calendar:onMinDateChange");
java.lang.Object _onPreventOverlapChange = (java.lang.Object)request.getAttribute("alloy:calendar:onPreventOverlapChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:calendar:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:calendar:onRenderedChange");
java.lang.Object _onSelectMultipleDatesChange = (java.lang.Object)request.getAttribute("alloy:calendar:onSelectMultipleDatesChange");
java.lang.Object _onSetValueChange = (java.lang.Object)request.getAttribute("alloy:calendar:onSetValueChange");
java.lang.Object _onShimChange = (java.lang.Object)request.getAttribute("alloy:calendar:onShimChange");
java.lang.Object _onShowDelayChange = (java.lang.Object)request.getAttribute("alloy:calendar:onShowDelayChange");
java.lang.Object _onShowOnChange = (java.lang.Object)request.getAttribute("alloy:calendar:onShowOnChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:calendar:onSrcNodeChange");
java.lang.Object _onStackChange = (java.lang.Object)request.getAttribute("alloy:calendar:onStackChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:calendar:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:calendar:onTabIndexChange");
java.lang.Object _onTriggerChange = (java.lang.Object)request.getAttribute("alloy:calendar:onTriggerChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:calendar:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:calendar:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:calendar:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:calendar:onWidthChange");
java.lang.Object _onXChange = (java.lang.Object)request.getAttribute("alloy:calendar:onXChange");
java.lang.Object _onXyChange = (java.lang.Object)request.getAttribute("alloy:calendar:onXyChange");
java.lang.Object _onYChange = (java.lang.Object)request.getAttribute("alloy:calendar:onYChange");
java.lang.Object _onZIndexChange = (java.lang.Object)request.getAttribute("alloy:calendar:onZIndexChange");
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