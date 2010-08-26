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
java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:date-picker-select:boundingBox");
java.lang.Object _buttonNode = (java.lang.Object)request.getAttribute("alloy:date-picker-select:buttonNode");
java.lang.Object _calendar = (java.lang.Object)request.getAttribute("alloy:date-picker-select:calendar");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:date-picker-select:contentBox");
java.lang.Object _cssClass = (java.lang.Object)request.getAttribute("alloy:date-picker-select:cssClass");
java.lang.Object _dayNode = (java.lang.Object)request.getAttribute("alloy:date-picker-select:dayNode");
java.lang.Object _dayNodeName = (java.lang.Object)request.getAttribute("alloy:date-picker-select:dayNodeName");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:disabled"), false);
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:focused"), false);
java.lang.Object _height = (java.lang.Object)request.getAttribute("alloy:date-picker-select:height");
java.lang.Object _hideClass = (java.lang.Object)request.getAttribute("alloy:date-picker-select:hideClass");
java.lang.Object _datepickerselectId = (java.lang.Object)request.getAttribute("alloy:date-picker-select:datepickerselectId");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:initialized"), false);
java.lang.Object _monthNode = (java.lang.Object)request.getAttribute("alloy:date-picker-select:monthNode");
java.lang.Object _monthNodeName = (java.lang.Object)request.getAttribute("alloy:date-picker-select:monthNodeName");
java.lang.Boolean _populateDay = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:populateDay"), true);
java.lang.Boolean _populateMonth = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:populateMonth"), true);
java.lang.Boolean _populateYear = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:populateYear"), true);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:rendered"), false);
java.lang.Object _selectWrapperNode = (java.lang.Object)request.getAttribute("alloy:date-picker-select:selectWrapperNode");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:date-picker-select:srcNode");
java.lang.Object _strings = (java.lang.Object)request.getAttribute("alloy:date-picker-select:strings");
java.lang.Number _tabIndex = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:date-picker-select:tabIndex"), 0);
java.lang.Object _trigger = (java.lang.Object)request.getAttribute("alloy:date-picker-select:trigger");
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:date-picker-select:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:date-picker-select:width");
java.lang.Object _yearNode = (java.lang.Object)request.getAttribute("alloy:date-picker-select:yearNode");
java.lang.Object _yearNodeName = (java.lang.Object)request.getAttribute("alloy:date-picker-select:yearNodeName");
java.lang.Object _yearRange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:yearRange");
java.lang.Object _afterAppendOrderChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterAppendOrderChange");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterBoundingBoxChange");
java.lang.Object _afterButtonNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterButtonNodeChange");
java.lang.Object _afterCalendarChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterCalendarChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterCssClassChange");
java.lang.Object _afterDayNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDayNodeChange");
java.lang.Object _afterDayNodeNameChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDayNodeNameChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDisabledChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterFocusedChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterHideClassChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterInitializedChange");
java.lang.Object _afterMonthNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterMonthNodeChange");
java.lang.Object _afterMonthNodeNameChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterMonthNodeNameChange");
java.lang.Object _afterPopulateDayChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterPopulateDayChange");
java.lang.Object _afterPopulateMonthChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterPopulateMonthChange");
java.lang.Object _afterPopulateYearChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterPopulateYearChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterRenderedChange");
java.lang.Object _afterSelectWrapperNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterSelectWrapperNodeChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterSrcNodeChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterTabIndexChange");
java.lang.Object _afterTriggerChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterTriggerChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterWidthChange");
java.lang.Object _afterYearNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterYearNodeChange");
java.lang.Object _afterYearNodeNameChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterYearNodeNameChange");
java.lang.Object _afterYearRangeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterYearRangeChange");
java.lang.Object _onAppendOrderChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onAppendOrderChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onBoundingBoxChange");
java.lang.Object _onButtonNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onButtonNodeChange");
java.lang.Object _onCalendarChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onCalendarChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onCssClassChange");
java.lang.Object _onDayNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onDayNodeChange");
java.lang.Object _onDayNodeNameChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onDayNodeNameChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onDisabledChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onFocusedChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onHideClassChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onInitializedChange");
java.lang.Object _onMonthNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onMonthNodeChange");
java.lang.Object _onMonthNodeNameChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onMonthNodeNameChange");
java.lang.Object _onPopulateDayChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onPopulateDayChange");
java.lang.Object _onPopulateMonthChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onPopulateMonthChange");
java.lang.Object _onPopulateYearChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onPopulateYearChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onRenderedChange");
java.lang.Object _onSelectWrapperNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onSelectWrapperNodeChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onSrcNodeChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onTabIndexChange");
java.lang.Object _onTriggerChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onTriggerChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onWidthChange");
java.lang.Object _onYearNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onYearNodeChange");
java.lang.Object _onYearNodeNameChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onYearNodeNameChange");
java.lang.Object _onYearRangeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onYearRangeChange");
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