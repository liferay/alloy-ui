<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:date-picker-select:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:date-picker-select:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:date-picker-select:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Object _appendOrder = (java.lang.Object)request.getAttribute("alloy:date-picker-select:appendOrder");
java.lang.String _boundingBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:boundingBox"));
java.lang.String _buttonNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:buttonNode"));
java.lang.Object _calendar = (java.lang.Object)request.getAttribute("alloy:date-picker-select:calendar");
java.lang.String _contentBox = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:contentBox"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:cssClass"));
java.lang.String _dayNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:dayNode"));
java.lang.String _dayNodeName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:dayNodeName"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:disabled"), false);
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:focused"), false);
java.lang.String _height = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:hideClass"), "aui-helper-hidden");
java.lang.String _datepickerselectId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:datepickerselectId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:initialized"), false);
java.lang.String _monthNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:monthNode"));
java.lang.String _monthNodeName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:monthNodeName"));
java.lang.Boolean _populateDay = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:populateDay"), true);
java.lang.Boolean _populateMonth = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:populateMonth"), true);
java.lang.Boolean _populateYear = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:populateYear"), true);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:rendered"), false);
java.lang.String _selectWrapperNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:selectWrapperNode"));
java.lang.String _srcNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:srcNode"));
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:date-picker-select:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:date-picker-select:tabIndex"), 0);
java.lang.String _trigger = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:trigger"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:visible"), true);
java.lang.String _width = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:width"));
java.lang.String _yearNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:yearNode"));
java.lang.String _yearNodeName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:yearNodeName"));
java.lang.Object _yearRange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:yearRange");
java.lang.String _afterAppendOrderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterAppendOrderChange"));
java.lang.String _afterBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterBoundingBoxChange"));
java.lang.String _afterButtonNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterButtonNodeChange"));
java.lang.String _afterCalendarChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterCalendarChange"));
java.lang.String _afterContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterContentBoxChange"));
java.lang.String _afterCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterCssClassChange"));
java.lang.String _afterDayNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterDayNodeChange"));
java.lang.String _afterDayNodeNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterDayNodeNameChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterDestroyedChange"));
java.lang.String _afterDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterDisabledChange"));
java.lang.String _afterFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterFocusedChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterHeightChange"));
java.lang.String _afterHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterHideClassChange"));
java.lang.String _afterIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterIdChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterInitializedChange"));
java.lang.String _afterMonthNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterMonthNodeChange"));
java.lang.String _afterMonthNodeNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterMonthNodeNameChange"));
java.lang.String _afterPopulateDayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterPopulateDayChange"));
java.lang.String _afterPopulateMonthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterPopulateMonthChange"));
java.lang.String _afterPopulateYearChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterPopulateYearChange"));
java.lang.String _afterRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterRenderChange"));
java.lang.String _afterRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterRenderedChange"));
java.lang.String _afterSelectWrapperNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterSelectWrapperNodeChange"));
java.lang.String _afterSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterSrcNodeChange"));
java.lang.String _afterStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterStringsChange"));
java.lang.String _afterTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterTabIndexChange"));
java.lang.String _afterTriggerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterTriggerChange"));
java.lang.String _afterVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterVisibleChange"));
java.lang.String _afterContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterContentUpdate"));
java.lang.String _afterRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterRender"));
java.lang.String _afterWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterWidthChange"));
java.lang.String _afterYearNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterYearNodeChange"));
java.lang.String _afterYearNodeNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterYearNodeNameChange"));
java.lang.String _afterYearRangeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:afterYearRangeChange"));
java.lang.String _onAppendOrderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onAppendOrderChange"));
java.lang.String _onBoundingBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onBoundingBoxChange"));
java.lang.String _onButtonNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onButtonNodeChange"));
java.lang.String _onCalendarChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onCalendarChange"));
java.lang.String _onContentBoxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onContentBoxChange"));
java.lang.String _onCssClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onCssClassChange"));
java.lang.String _onDayNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onDayNodeChange"));
java.lang.String _onDayNodeNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onDayNodeNameChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onDestroyedChange"));
java.lang.String _onDisabledChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onDisabledChange"));
java.lang.String _onFocusedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onFocusedChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onHeightChange"));
java.lang.String _onHideClassChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onHideClassChange"));
java.lang.String _onIdChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onIdChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onInitializedChange"));
java.lang.String _onMonthNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onMonthNodeChange"));
java.lang.String _onMonthNodeNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onMonthNodeNameChange"));
java.lang.String _onPopulateDayChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onPopulateDayChange"));
java.lang.String _onPopulateMonthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onPopulateMonthChange"));
java.lang.String _onPopulateYearChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onPopulateYearChange"));
java.lang.String _onRenderChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onRenderChange"));
java.lang.String _onRenderedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onRenderedChange"));
java.lang.String _onSelectWrapperNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onSelectWrapperNodeChange"));
java.lang.String _onSrcNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onSrcNodeChange"));
java.lang.String _onStringsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onStringsChange"));
java.lang.String _onTabIndexChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onTabIndexChange"));
java.lang.String _onTriggerChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onTriggerChange"));
java.lang.String _onVisibleChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onVisibleChange"));
java.lang.String _onContentUpdate = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onContentUpdate"));
java.lang.String _onRender = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onRender"));
java.lang.String _onWidthChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onWidthChange"));
java.lang.String _onYearNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onYearNodeChange"));
java.lang.String _onYearNodeNameChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onYearNodeNameChange"));
java.lang.String _onYearRangeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:onYearRangeChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:date-picker-select:appendOrder") != null) {
	scopedAttributes.put("appendOrder", _appendOrder);
}

if (request.getAttribute("alloy:date-picker-select:boundingBox") != null) {
	scopedAttributes.put("boundingBox", _boundingBox);
}

if (request.getAttribute("alloy:date-picker-select:buttonNode") != null) {
	scopedAttributes.put("buttonNode", _buttonNode);
}

if (request.getAttribute("alloy:date-picker-select:calendar") != null) {
	scopedAttributes.put("calendar", _calendar);
}

if (request.getAttribute("alloy:date-picker-select:contentBox") != null) {
	scopedAttributes.put("contentBox", _contentBox);
}

if (request.getAttribute("alloy:date-picker-select:cssClass") != null) {
	scopedAttributes.put("cssClass", _cssClass);
}

if (request.getAttribute("alloy:date-picker-select:dayNode") != null) {
	scopedAttributes.put("dayNode", _dayNode);
}

if (request.getAttribute("alloy:date-picker-select:dayNodeName") != null) {
	scopedAttributes.put("dayNodeName", _dayNodeName);
}

if (request.getAttribute("alloy:date-picker-select:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:date-picker-select:disabled") != null) {
	scopedAttributes.put("disabled", _disabled);
}

if (request.getAttribute("alloy:date-picker-select:focused") != null) {
	scopedAttributes.put("focused", _focused);
}

if (request.getAttribute("alloy:date-picker-select:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:date-picker-select:hideClass") != null) {
	scopedAttributes.put("hideClass", _hideClass);
}

if (request.getAttribute("alloy:date-picker-select:datepickerselectId") != null) {
	scopedAttributes.put("datepickerselectId", _datepickerselectId);
}

if (request.getAttribute("alloy:date-picker-select:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:date-picker-select:monthNode") != null) {
	scopedAttributes.put("monthNode", _monthNode);
}

if (request.getAttribute("alloy:date-picker-select:monthNodeName") != null) {
	scopedAttributes.put("monthNodeName", _monthNodeName);
}

if (request.getAttribute("alloy:date-picker-select:populateDay") != null) {
	scopedAttributes.put("populateDay", _populateDay);
}

if (request.getAttribute("alloy:date-picker-select:populateMonth") != null) {
	scopedAttributes.put("populateMonth", _populateMonth);
}

if (request.getAttribute("alloy:date-picker-select:populateYear") != null) {
	scopedAttributes.put("populateYear", _populateYear);
}

if (request.getAttribute("alloy:date-picker-select:render") != null) {
	scopedAttributes.put("render", _render);
}

if (request.getAttribute("alloy:date-picker-select:rendered") != null) {
	scopedAttributes.put("rendered", _rendered);
}

if (request.getAttribute("alloy:date-picker-select:selectWrapperNode") != null) {
	scopedAttributes.put("selectWrapperNode", _selectWrapperNode);
}

if (request.getAttribute("alloy:date-picker-select:srcNode") != null) {
	scopedAttributes.put("srcNode", _srcNode);
}

if (request.getAttribute("alloy:date-picker-select:strings") != null) {
	scopedAttributes.put("strings", _strings);
}

if (request.getAttribute("alloy:date-picker-select:tabIndex") != null) {
	scopedAttributes.put("tabIndex", _tabIndex);
}

if (request.getAttribute("alloy:date-picker-select:trigger") != null) {
	scopedAttributes.put("trigger", _trigger);
}

if (request.getAttribute("alloy:date-picker-select:visible") != null) {
	scopedAttributes.put("visible", _visible);
}

if (request.getAttribute("alloy:date-picker-select:width") != null) {
	scopedAttributes.put("width", _width);
}

if (request.getAttribute("alloy:date-picker-select:yearNode") != null) {
	scopedAttributes.put("yearNode", _yearNode);
}

if (request.getAttribute("alloy:date-picker-select:yearNodeName") != null) {
	scopedAttributes.put("yearNodeName", _yearNodeName);
}

if (request.getAttribute("alloy:date-picker-select:yearRange") != null) {
	scopedAttributes.put("yearRange", _yearRange);
}

if (request.getAttribute("alloy:date-picker-select:afterAppendOrderChange") != null) {
	scopedAttributes.put("afterAppendOrderChange", _afterAppendOrderChange);
}

if (request.getAttribute("alloy:date-picker-select:afterBoundingBoxChange") != null) {
	scopedAttributes.put("afterBoundingBoxChange", _afterBoundingBoxChange);
}

if (request.getAttribute("alloy:date-picker-select:afterButtonNodeChange") != null) {
	scopedAttributes.put("afterButtonNodeChange", _afterButtonNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterCalendarChange") != null) {
	scopedAttributes.put("afterCalendarChange", _afterCalendarChange);
}

if (request.getAttribute("alloy:date-picker-select:afterContentBoxChange") != null) {
	scopedAttributes.put("afterContentBoxChange", _afterContentBoxChange);
}

if (request.getAttribute("alloy:date-picker-select:afterCssClassChange") != null) {
	scopedAttributes.put("afterCssClassChange", _afterCssClassChange);
}

if (request.getAttribute("alloy:date-picker-select:afterDayNodeChange") != null) {
	scopedAttributes.put("afterDayNodeChange", _afterDayNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterDayNodeNameChange") != null) {
	scopedAttributes.put("afterDayNodeNameChange", _afterDayNodeNameChange);
}

if (request.getAttribute("alloy:date-picker-select:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:date-picker-select:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:date-picker-select:afterDisabledChange") != null) {
	scopedAttributes.put("afterDisabledChange", _afterDisabledChange);
}

if (request.getAttribute("alloy:date-picker-select:afterFocusedChange") != null) {
	scopedAttributes.put("afterFocusedChange", _afterFocusedChange);
}

if (request.getAttribute("alloy:date-picker-select:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:date-picker-select:afterHideClassChange") != null) {
	scopedAttributes.put("afterHideClassChange", _afterHideClassChange);
}

if (request.getAttribute("alloy:date-picker-select:afterIdChange") != null) {
	scopedAttributes.put("afterIdChange", _afterIdChange);
}

if (request.getAttribute("alloy:date-picker-select:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:date-picker-select:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:date-picker-select:afterMonthNodeChange") != null) {
	scopedAttributes.put("afterMonthNodeChange", _afterMonthNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterMonthNodeNameChange") != null) {
	scopedAttributes.put("afterMonthNodeNameChange", _afterMonthNodeNameChange);
}

if (request.getAttribute("alloy:date-picker-select:afterPopulateDayChange") != null) {
	scopedAttributes.put("afterPopulateDayChange", _afterPopulateDayChange);
}

if (request.getAttribute("alloy:date-picker-select:afterPopulateMonthChange") != null) {
	scopedAttributes.put("afterPopulateMonthChange", _afterPopulateMonthChange);
}

if (request.getAttribute("alloy:date-picker-select:afterPopulateYearChange") != null) {
	scopedAttributes.put("afterPopulateYearChange", _afterPopulateYearChange);
}

if (request.getAttribute("alloy:date-picker-select:afterRenderChange") != null) {
	scopedAttributes.put("afterRenderChange", _afterRenderChange);
}

if (request.getAttribute("alloy:date-picker-select:afterRenderedChange") != null) {
	scopedAttributes.put("afterRenderedChange", _afterRenderedChange);
}

if (request.getAttribute("alloy:date-picker-select:afterSelectWrapperNodeChange") != null) {
	scopedAttributes.put("afterSelectWrapperNodeChange", _afterSelectWrapperNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterSrcNodeChange") != null) {
	scopedAttributes.put("afterSrcNodeChange", _afterSrcNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterStringsChange") != null) {
	scopedAttributes.put("afterStringsChange", _afterStringsChange);
}

if (request.getAttribute("alloy:date-picker-select:afterTabIndexChange") != null) {
	scopedAttributes.put("afterTabIndexChange", _afterTabIndexChange);
}

if (request.getAttribute("alloy:date-picker-select:afterTriggerChange") != null) {
	scopedAttributes.put("afterTriggerChange", _afterTriggerChange);
}

if (request.getAttribute("alloy:date-picker-select:afterVisibleChange") != null) {
	scopedAttributes.put("afterVisibleChange", _afterVisibleChange);
}

if (request.getAttribute("alloy:date-picker-select:afterContentUpdate") != null) {
	scopedAttributes.put("afterContentUpdate", _afterContentUpdate);
}

if (request.getAttribute("alloy:date-picker-select:afterRender") != null) {
	scopedAttributes.put("afterRender", _afterRender);
}

if (request.getAttribute("alloy:date-picker-select:afterWidthChange") != null) {
	scopedAttributes.put("afterWidthChange", _afterWidthChange);
}

if (request.getAttribute("alloy:date-picker-select:afterYearNodeChange") != null) {
	scopedAttributes.put("afterYearNodeChange", _afterYearNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:afterYearNodeNameChange") != null) {
	scopedAttributes.put("afterYearNodeNameChange", _afterYearNodeNameChange);
}

if (request.getAttribute("alloy:date-picker-select:afterYearRangeChange") != null) {
	scopedAttributes.put("afterYearRangeChange", _afterYearRangeChange);
}

if (request.getAttribute("alloy:date-picker-select:onAppendOrderChange") != null) {
	scopedAttributes.put("onAppendOrderChange", _onAppendOrderChange);
}

if (request.getAttribute("alloy:date-picker-select:onBoundingBoxChange") != null) {
	scopedAttributes.put("onBoundingBoxChange", _onBoundingBoxChange);
}

if (request.getAttribute("alloy:date-picker-select:onButtonNodeChange") != null) {
	scopedAttributes.put("onButtonNodeChange", _onButtonNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:onCalendarChange") != null) {
	scopedAttributes.put("onCalendarChange", _onCalendarChange);
}

if (request.getAttribute("alloy:date-picker-select:onContentBoxChange") != null) {
	scopedAttributes.put("onContentBoxChange", _onContentBoxChange);
}

if (request.getAttribute("alloy:date-picker-select:onCssClassChange") != null) {
	scopedAttributes.put("onCssClassChange", _onCssClassChange);
}

if (request.getAttribute("alloy:date-picker-select:onDayNodeChange") != null) {
	scopedAttributes.put("onDayNodeChange", _onDayNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:onDayNodeNameChange") != null) {
	scopedAttributes.put("onDayNodeNameChange", _onDayNodeNameChange);
}

if (request.getAttribute("alloy:date-picker-select:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:date-picker-select:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:date-picker-select:onDisabledChange") != null) {
	scopedAttributes.put("onDisabledChange", _onDisabledChange);
}

if (request.getAttribute("alloy:date-picker-select:onFocusedChange") != null) {
	scopedAttributes.put("onFocusedChange", _onFocusedChange);
}

if (request.getAttribute("alloy:date-picker-select:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:date-picker-select:onHideClassChange") != null) {
	scopedAttributes.put("onHideClassChange", _onHideClassChange);
}

if (request.getAttribute("alloy:date-picker-select:onIdChange") != null) {
	scopedAttributes.put("onIdChange", _onIdChange);
}

if (request.getAttribute("alloy:date-picker-select:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:date-picker-select:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:date-picker-select:onMonthNodeChange") != null) {
	scopedAttributes.put("onMonthNodeChange", _onMonthNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:onMonthNodeNameChange") != null) {
	scopedAttributes.put("onMonthNodeNameChange", _onMonthNodeNameChange);
}

if (request.getAttribute("alloy:date-picker-select:onPopulateDayChange") != null) {
	scopedAttributes.put("onPopulateDayChange", _onPopulateDayChange);
}

if (request.getAttribute("alloy:date-picker-select:onPopulateMonthChange") != null) {
	scopedAttributes.put("onPopulateMonthChange", _onPopulateMonthChange);
}

if (request.getAttribute("alloy:date-picker-select:onPopulateYearChange") != null) {
	scopedAttributes.put("onPopulateYearChange", _onPopulateYearChange);
}

if (request.getAttribute("alloy:date-picker-select:onRenderChange") != null) {
	scopedAttributes.put("onRenderChange", _onRenderChange);
}

if (request.getAttribute("alloy:date-picker-select:onRenderedChange") != null) {
	scopedAttributes.put("onRenderedChange", _onRenderedChange);
}

if (request.getAttribute("alloy:date-picker-select:onSelectWrapperNodeChange") != null) {
	scopedAttributes.put("onSelectWrapperNodeChange", _onSelectWrapperNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:onSrcNodeChange") != null) {
	scopedAttributes.put("onSrcNodeChange", _onSrcNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:onStringsChange") != null) {
	scopedAttributes.put("onStringsChange", _onStringsChange);
}

if (request.getAttribute("alloy:date-picker-select:onTabIndexChange") != null) {
	scopedAttributes.put("onTabIndexChange", _onTabIndexChange);
}

if (request.getAttribute("alloy:date-picker-select:onTriggerChange") != null) {
	scopedAttributes.put("onTriggerChange", _onTriggerChange);
}

if (request.getAttribute("alloy:date-picker-select:onVisibleChange") != null) {
	scopedAttributes.put("onVisibleChange", _onVisibleChange);
}

if (request.getAttribute("alloy:date-picker-select:onContentUpdate") != null) {
	scopedAttributes.put("onContentUpdate", _onContentUpdate);
}

if (request.getAttribute("alloy:date-picker-select:onRender") != null) {
	scopedAttributes.put("onRender", _onRender);
}

if (request.getAttribute("alloy:date-picker-select:onWidthChange") != null) {
	scopedAttributes.put("onWidthChange", _onWidthChange);
}

if (request.getAttribute("alloy:date-picker-select:onYearNodeChange") != null) {
	scopedAttributes.put("onYearNodeChange", _onYearNodeChange);
}

if (request.getAttribute("alloy:date-picker-select:onYearNodeNameChange") != null) {
	scopedAttributes.put("onYearNodeNameChange", _onYearNodeNameChange);
}

if (request.getAttribute("alloy:date-picker-select:onYearRangeChange") != null) {
	scopedAttributes.put("onYearRangeChange", _onYearRangeChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>