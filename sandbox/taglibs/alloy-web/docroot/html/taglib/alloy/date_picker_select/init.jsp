<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:date-picker-select:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:date-picker-select:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("alloy:date-picker-select:boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("alloy:date-picker-select:contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("alloy:date-picker-select:srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

java.util.ArrayList _appendOrder = JSONFactoryUtil.getArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:appendOrder"), "[ 'm', 'd', 'y' ]"));
java.lang.String _buttonNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:buttonNode"));
java.util.HashMap _calendar = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:calendar"), "{}"));
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:cssClass"));
java.lang.String _dayNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:dayNode"));
java.lang.String _dayNodeName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:dayNodeName"), "day");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:date-picker-select:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:date-picker-select:disabled"), false);
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:date-picker-select:focused"), false);
java.lang.Object _height = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:height"));
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:hideClass"), "aui-helper-hidden");
java.lang.String _datepickerselectId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:datepickerselectId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:date-picker-select:initialized"), false);
java.lang.String _monthNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:monthNode"));
java.lang.String _monthNodeName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:monthNodeName"), "month");
java.lang.Boolean _populateDay = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:date-picker-select:populateDay"), true);
java.lang.Boolean _populateMonth = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:date-picker-select:populateMonth"), true);
java.lang.Boolean _populateYear = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:date-picker-select:populateYear"), true);
java.lang.Boolean _render = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:date-picker-select:render"), false);
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:date-picker-select:rendered"), false);
java.lang.String _selectWrapperNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:selectWrapperNode"));
java.util.HashMap _strings = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:strings")));
java.lang.Number _tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:date-picker-select:tabIndex")), 0);
java.lang.Object _trigger = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:trigger"));
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:date-picker-select:visible"), true);
java.lang.Object _width = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:width"));
java.lang.String _yearNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:yearNode"));
java.lang.String _yearNodeName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:yearNodeName"), "year");
java.util.ArrayList _yearRange = JSONFactoryUtil.getArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:yearRange"), "[ year - 10, year + 10 ]"));
java.lang.Object _afterAppendOrderChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterAppendOrderChange"));
java.lang.Object _afterBoundingBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterBoundingBoxChange"));
java.lang.Object _afterButtonNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterButtonNodeChange"));
java.lang.Object _afterCalendarChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterCalendarChange"));
java.lang.Object _afterContentBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterContentBoxChange"));
java.lang.Object _afterCssClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterCssClassChange"));
java.lang.Object _afterDayNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDayNodeChange"));
java.lang.Object _afterDayNodeNameChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDayNodeNameChange"));
java.lang.Object _afterDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDestroy"));
java.lang.Object _afterDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDestroyedChange"));
java.lang.Object _afterDisabledChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDisabledChange"));
java.lang.Object _afterFocusedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterFocusedChange"));
java.lang.Object _afterHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterHeightChange"));
java.lang.Object _afterHideClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterHideClassChange"));
java.lang.Object _afterIdChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterIdChange"));
java.lang.Object _afterInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterInit"));
java.lang.Object _afterInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterInitializedChange"));
java.lang.Object _afterMonthNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterMonthNodeChange"));
java.lang.Object _afterMonthNodeNameChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterMonthNodeNameChange"));
java.lang.Object _afterPopulateDayChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterPopulateDayChange"));
java.lang.Object _afterPopulateMonthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterPopulateMonthChange"));
java.lang.Object _afterPopulateYearChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterPopulateYearChange"));
java.lang.Object _afterRenderChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterRenderChange"));
java.lang.Object _afterRenderedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterRenderedChange"));
java.lang.Object _afterSelectWrapperNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterSelectWrapperNodeChange"));
java.lang.Object _afterSrcNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterSrcNodeChange"));
java.lang.Object _afterStringsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterStringsChange"));
java.lang.Object _afterTabIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterTabIndexChange"));
java.lang.Object _afterTriggerChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterTriggerChange"));
java.lang.Object _afterVisibleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterVisibleChange"));
java.lang.Object _afterContentUpdate = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterContentUpdate"));
java.lang.Object _afterRender = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterRender"));
java.lang.Object _afterWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterWidthChange"));
java.lang.Object _afterYearNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterYearNodeChange"));
java.lang.Object _afterYearNodeNameChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterYearNodeNameChange"));
java.lang.Object _afterYearRangeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:afterYearRangeChange"));
java.lang.Object _onAppendOrderChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onAppendOrderChange"));
java.lang.Object _onBoundingBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onBoundingBoxChange"));
java.lang.Object _onButtonNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onButtonNodeChange"));
java.lang.Object _onCalendarChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onCalendarChange"));
java.lang.Object _onContentBoxChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onContentBoxChange"));
java.lang.Object _onCssClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onCssClassChange"));
java.lang.Object _onDayNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onDayNodeChange"));
java.lang.Object _onDayNodeNameChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onDayNodeNameChange"));
java.lang.Object _onDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onDestroy"));
java.lang.Object _onDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onDestroyedChange"));
java.lang.Object _onDisabledChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onDisabledChange"));
java.lang.Object _onFocusedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onFocusedChange"));
java.lang.Object _onHeightChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onHeightChange"));
java.lang.Object _onHideClassChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onHideClassChange"));
java.lang.Object _onIdChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onIdChange"));
java.lang.Object _onInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onInit"));
java.lang.Object _onInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onInitializedChange"));
java.lang.Object _onMonthNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onMonthNodeChange"));
java.lang.Object _onMonthNodeNameChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onMonthNodeNameChange"));
java.lang.Object _onPopulateDayChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onPopulateDayChange"));
java.lang.Object _onPopulateMonthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onPopulateMonthChange"));
java.lang.Object _onPopulateYearChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onPopulateYearChange"));
java.lang.Object _onRenderChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onRenderChange"));
java.lang.Object _onRenderedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onRenderedChange"));
java.lang.Object _onSelectWrapperNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onSelectWrapperNodeChange"));
java.lang.Object _onSrcNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onSrcNodeChange"));
java.lang.Object _onStringsChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onStringsChange"));
java.lang.Object _onTabIndexChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onTabIndexChange"));
java.lang.Object _onTriggerChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onTriggerChange"));
java.lang.Object _onVisibleChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onVisibleChange"));
java.lang.Object _onContentUpdate = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onContentUpdate"));
java.lang.Object _onRender = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onRender"));
java.lang.Object _onWidthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onWidthChange"));
java.lang.Object _onYearNodeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onYearNodeChange"));
java.lang.Object _onYearNodeNameChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onYearNodeNameChange"));
java.lang.Object _onYearRangeChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:onYearRangeChange"));

String uniqueId = StringPool.BLANK;

boolean useJavaScript = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useJavaScript"), true);
boolean useMarkup = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useMarkup"), true);

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

_updateOptions(options, "appendOrder", _appendOrder);
_updateOptions(options, "boundingBox", _boundingBox);
_updateOptions(options, "buttonNode", _buttonNode);
_updateOptions(options, "calendar", _calendar);
_updateOptions(options, "contentBox", _contentBox);
_updateOptions(options, "cssClass", _cssClass);
_updateOptions(options, "dayNode", _dayNode);
_updateOptions(options, "dayNodeName", _dayNodeName);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "disabled", _disabled);
_updateOptions(options, "focused", _focused);
_updateOptions(options, "height", _height);
_updateOptions(options, "hideClass", _hideClass);
_updateOptions(options, "datepickerselectId", _datepickerselectId);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "monthNode", _monthNode);
_updateOptions(options, "monthNodeName", _monthNodeName);
_updateOptions(options, "populateDay", _populateDay);
_updateOptions(options, "populateMonth", _populateMonth);
_updateOptions(options, "populateYear", _populateYear);
_updateOptions(options, "render", _render);
_updateOptions(options, "rendered", _rendered);
_updateOptions(options, "selectWrapperNode", _selectWrapperNode);
_updateOptions(options, "srcNode", _srcNode);
_updateOptions(options, "strings", _strings);
_updateOptions(options, "tabIndex", _tabIndex);
_updateOptions(options, "trigger", _trigger);
_updateOptions(options, "visible", _visible);
_updateOptions(options, "width", _width);
_updateOptions(options, "yearNode", _yearNode);
_updateOptions(options, "yearNodeName", _yearNodeName);
_updateOptions(options, "yearRange", _yearRange);
_updateOptions(options, "afterAppendOrderChange", _afterAppendOrderChange);
_updateOptions(options, "afterBoundingBoxChange", _afterBoundingBoxChange);
_updateOptions(options, "afterButtonNodeChange", _afterButtonNodeChange);
_updateOptions(options, "afterCalendarChange", _afterCalendarChange);
_updateOptions(options, "afterContentBoxChange", _afterContentBoxChange);
_updateOptions(options, "afterCssClassChange", _afterCssClassChange);
_updateOptions(options, "afterDayNodeChange", _afterDayNodeChange);
_updateOptions(options, "afterDayNodeNameChange", _afterDayNodeNameChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterDisabledChange", _afterDisabledChange);
_updateOptions(options, "afterFocusedChange", _afterFocusedChange);
_updateOptions(options, "afterHeightChange", _afterHeightChange);
_updateOptions(options, "afterHideClassChange", _afterHideClassChange);
_updateOptions(options, "afterIdChange", _afterIdChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterMonthNodeChange", _afterMonthNodeChange);
_updateOptions(options, "afterMonthNodeNameChange", _afterMonthNodeNameChange);
_updateOptions(options, "afterPopulateDayChange", _afterPopulateDayChange);
_updateOptions(options, "afterPopulateMonthChange", _afterPopulateMonthChange);
_updateOptions(options, "afterPopulateYearChange", _afterPopulateYearChange);
_updateOptions(options, "afterRenderChange", _afterRenderChange);
_updateOptions(options, "afterRenderedChange", _afterRenderedChange);
_updateOptions(options, "afterSelectWrapperNodeChange", _afterSelectWrapperNodeChange);
_updateOptions(options, "afterSrcNodeChange", _afterSrcNodeChange);
_updateOptions(options, "afterStringsChange", _afterStringsChange);
_updateOptions(options, "afterTabIndexChange", _afterTabIndexChange);
_updateOptions(options, "afterTriggerChange", _afterTriggerChange);
_updateOptions(options, "afterVisibleChange", _afterVisibleChange);
_updateOptions(options, "afterContentUpdate", _afterContentUpdate);
_updateOptions(options, "afterRender", _afterRender);
_updateOptions(options, "afterWidthChange", _afterWidthChange);
_updateOptions(options, "afterYearNodeChange", _afterYearNodeChange);
_updateOptions(options, "afterYearNodeNameChange", _afterYearNodeNameChange);
_updateOptions(options, "afterYearRangeChange", _afterYearRangeChange);
_updateOptions(options, "onAppendOrderChange", _onAppendOrderChange);
_updateOptions(options, "onBoundingBoxChange", _onBoundingBoxChange);
_updateOptions(options, "onButtonNodeChange", _onButtonNodeChange);
_updateOptions(options, "onCalendarChange", _onCalendarChange);
_updateOptions(options, "onContentBoxChange", _onContentBoxChange);
_updateOptions(options, "onCssClassChange", _onCssClassChange);
_updateOptions(options, "onDayNodeChange", _onDayNodeChange);
_updateOptions(options, "onDayNodeNameChange", _onDayNodeNameChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onDisabledChange", _onDisabledChange);
_updateOptions(options, "onFocusedChange", _onFocusedChange);
_updateOptions(options, "onHeightChange", _onHeightChange);
_updateOptions(options, "onHideClassChange", _onHideClassChange);
_updateOptions(options, "onIdChange", _onIdChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onMonthNodeChange", _onMonthNodeChange);
_updateOptions(options, "onMonthNodeNameChange", _onMonthNodeNameChange);
_updateOptions(options, "onPopulateDayChange", _onPopulateDayChange);
_updateOptions(options, "onPopulateMonthChange", _onPopulateMonthChange);
_updateOptions(options, "onPopulateYearChange", _onPopulateYearChange);
_updateOptions(options, "onRenderChange", _onRenderChange);
_updateOptions(options, "onRenderedChange", _onRenderedChange);
_updateOptions(options, "onSelectWrapperNodeChange", _onSelectWrapperNodeChange);
_updateOptions(options, "onSrcNodeChange", _onSrcNodeChange);
_updateOptions(options, "onStringsChange", _onStringsChange);
_updateOptions(options, "onTabIndexChange", _onTabIndexChange);
_updateOptions(options, "onTriggerChange", _onTriggerChange);
_updateOptions(options, "onVisibleChange", _onVisibleChange);
_updateOptions(options, "onContentUpdate", _onContentUpdate);
_updateOptions(options, "onRender", _onRender);
_updateOptions(options, "onWidthChange", _onWidthChange);
_updateOptions(options, "onYearNodeChange", _onYearNodeChange);
_updateOptions(options, "onYearNodeNameChange", _onYearNodeNameChange);
_updateOptions(options, "onYearRangeChange", _onYearRangeChange);
%>

<%@ include file="init-ext.jsp" %>