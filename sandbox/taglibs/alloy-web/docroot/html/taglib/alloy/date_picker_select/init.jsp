<%--
/**
 * Copyright (c) 2000-2011 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */
--%>

<%@ include file="/html/taglib/taglib-init.jsp" %>

<%
java.lang.String NAMESPACE = "alloy:date-picker-select:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:date-picker-select:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:date-picker-select:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:date-picker-select:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.util.ArrayList appendOrder = _getArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:appendOrder"), "[ 'm', 'd', 'y' ]"));
java.lang.String buttonNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:buttonNode"));
java.util.HashMap calendar = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:calendar"), "{}"));
java.lang.String cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:cssClass"));
java.lang.String dayNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:dayNode"));
java.lang.String dayNodeName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:dayNodeName"), "day");
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:date-picker-select:destroyed")), false);
boolean disabled = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:date-picker-select:disabled")), false);
boolean focused = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:date-picker-select:focused")), false);
java.lang.Object height = (java.lang.Object)request.getAttribute("alloy:date-picker-select:height");
java.lang.String hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:hideClass"), "aui-helper-hidden");
java.lang.String datepickerselectId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:datepickerselectId"));
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:date-picker-select:initialized")), false);
java.lang.String monthNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:monthNode"));
java.lang.String monthNodeName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:monthNodeName"), "month");
boolean populateDay = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:date-picker-select:populateDay")), true);
boolean populateMonth = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:date-picker-select:populateMonth")), true);
boolean populateYear = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:date-picker-select:populateYear")), true);
java.lang.Object render = (java.lang.Object)request.getAttribute("alloy:date-picker-select:render");
boolean rendered = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:date-picker-select:rendered")), false);
java.lang.String selectWrapperNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:selectWrapperNode"));
java.util.HashMap strings = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:strings")));
java.lang.Number tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:date-picker-select:tabIndex")), 0);
java.lang.Object trigger = (java.lang.Object)request.getAttribute("alloy:date-picker-select:trigger");
boolean visible = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:date-picker-select:visible")), true);
java.lang.Object width = (java.lang.Object)request.getAttribute("alloy:date-picker-select:width");
java.lang.String yearNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:yearNode"));
java.lang.String yearNodeName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:date-picker-select:yearNodeName"), "year");
java.util.ArrayList yearRange = _getArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:date-picker-select:yearRange"), "[ year - 10, year + 10 ]"));
java.lang.Object afterAppendOrderChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterAppendOrderChange");
java.lang.Object afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterBoundingBoxChange");
java.lang.Object afterButtonNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterButtonNodeChange");
java.lang.Object afterCalendarChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterCalendarChange");
java.lang.Object afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterContentBoxChange");
java.lang.Object afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterCssClassChange");
java.lang.Object afterDayNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDayNodeChange");
java.lang.Object afterDayNodeNameChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDayNodeNameChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDestroyedChange");
java.lang.Object afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterDisabledChange");
java.lang.Object afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterFocusedChange");
java.lang.Object afterHeightChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterHeightChange");
java.lang.Object afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterHideClassChange");
java.lang.Object afterIdChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterIdChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterInitializedChange");
java.lang.Object afterMonthNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterMonthNodeChange");
java.lang.Object afterMonthNodeNameChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterMonthNodeNameChange");
java.lang.Object afterPopulateDayChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterPopulateDayChange");
java.lang.Object afterPopulateMonthChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterPopulateMonthChange");
java.lang.Object afterPopulateYearChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterPopulateYearChange");
java.lang.Object afterRenderChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterRenderChange");
java.lang.Object afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterRenderedChange");
java.lang.Object afterSelectWrapperNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterSelectWrapperNodeChange");
java.lang.Object afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterSrcNodeChange");
java.lang.Object afterStringsChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterStringsChange");
java.lang.Object afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterTabIndexChange");
java.lang.Object afterTriggerChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterTriggerChange");
java.lang.Object afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterVisibleChange");
java.lang.Object afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterContentUpdate");
java.lang.Object afterRender = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterRender");
java.lang.Object afterWidthChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterWidthChange");
java.lang.Object afterYearNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterYearNodeChange");
java.lang.Object afterYearNodeNameChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterYearNodeNameChange");
java.lang.Object afterYearRangeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:afterYearRangeChange");
java.lang.Object onAppendOrderChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onAppendOrderChange");
java.lang.Object onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onBoundingBoxChange");
java.lang.Object onButtonNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onButtonNodeChange");
java.lang.Object onCalendarChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onCalendarChange");
java.lang.Object onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onContentBoxChange");
java.lang.Object onCssClassChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onCssClassChange");
java.lang.Object onDayNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onDayNodeChange");
java.lang.Object onDayNodeNameChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onDayNodeNameChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onDestroyedChange");
java.lang.Object onDisabledChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onDisabledChange");
java.lang.Object onFocusedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onFocusedChange");
java.lang.Object onHeightChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onHeightChange");
java.lang.Object onHideClassChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onHideClassChange");
java.lang.Object onIdChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onIdChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onInitializedChange");
java.lang.Object onMonthNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onMonthNodeChange");
java.lang.Object onMonthNodeNameChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onMonthNodeNameChange");
java.lang.Object onPopulateDayChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onPopulateDayChange");
java.lang.Object onPopulateMonthChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onPopulateMonthChange");
java.lang.Object onPopulateYearChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onPopulateYearChange");
java.lang.Object onRenderChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onRenderChange");
java.lang.Object onRenderedChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onRenderedChange");
java.lang.Object onSelectWrapperNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onSelectWrapperNodeChange");
java.lang.Object onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onSrcNodeChange");
java.lang.Object onStringsChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onStringsChange");
java.lang.Object onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onTabIndexChange");
java.lang.Object onTriggerChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onTriggerChange");
java.lang.Object onVisibleChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onVisibleChange");
java.lang.Object onContentUpdate = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onContentUpdate");
java.lang.Object onRender = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onRender");
java.lang.Object onWidthChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onWidthChange");
java.lang.Object onYearNodeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onYearNodeChange");
java.lang.Object onYearNodeNameChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onYearNodeNameChange");
java.lang.Object onYearRangeChange = (java.lang.Object)request.getAttribute("alloy:date-picker-select:onYearRangeChange");

_updateOptions(_options, "appendOrder", appendOrder);
_updateOptions(_options, "boundingBox", boundingBox);
_updateOptions(_options, "buttonNode", buttonNode);
_updateOptions(_options, "calendar", calendar);
_updateOptions(_options, "contentBox", contentBox);
_updateOptions(_options, "cssClass", cssClass);
_updateOptions(_options, "dayNode", dayNode);
_updateOptions(_options, "dayNodeName", dayNodeName);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "disabled", disabled);
_updateOptions(_options, "focused", focused);
_updateOptions(_options, "height", height);
_updateOptions(_options, "hideClass", hideClass);
_updateOptions(_options, "datepickerselectId", datepickerselectId);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "monthNode", monthNode);
_updateOptions(_options, "monthNodeName", monthNodeName);
_updateOptions(_options, "populateDay", populateDay);
_updateOptions(_options, "populateMonth", populateMonth);
_updateOptions(_options, "populateYear", populateYear);
_updateOptions(_options, "render", render);
_updateOptions(_options, "rendered", rendered);
_updateOptions(_options, "selectWrapperNode", selectWrapperNode);
_updateOptions(_options, "srcNode", srcNode);
_updateOptions(_options, "strings", strings);
_updateOptions(_options, "tabIndex", tabIndex);
_updateOptions(_options, "trigger", trigger);
_updateOptions(_options, "visible", visible);
_updateOptions(_options, "width", width);
_updateOptions(_options, "yearNode", yearNode);
_updateOptions(_options, "yearNodeName", yearNodeName);
_updateOptions(_options, "yearRange", yearRange);
_updateOptions(_options, "afterAppendOrderChange", afterAppendOrderChange);
_updateOptions(_options, "afterBoundingBoxChange", afterBoundingBoxChange);
_updateOptions(_options, "afterButtonNodeChange", afterButtonNodeChange);
_updateOptions(_options, "afterCalendarChange", afterCalendarChange);
_updateOptions(_options, "afterContentBoxChange", afterContentBoxChange);
_updateOptions(_options, "afterCssClassChange", afterCssClassChange);
_updateOptions(_options, "afterDayNodeChange", afterDayNodeChange);
_updateOptions(_options, "afterDayNodeNameChange", afterDayNodeNameChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterDisabledChange", afterDisabledChange);
_updateOptions(_options, "afterFocusedChange", afterFocusedChange);
_updateOptions(_options, "afterHeightChange", afterHeightChange);
_updateOptions(_options, "afterHideClassChange", afterHideClassChange);
_updateOptions(_options, "afterIdChange", afterIdChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterMonthNodeChange", afterMonthNodeChange);
_updateOptions(_options, "afterMonthNodeNameChange", afterMonthNodeNameChange);
_updateOptions(_options, "afterPopulateDayChange", afterPopulateDayChange);
_updateOptions(_options, "afterPopulateMonthChange", afterPopulateMonthChange);
_updateOptions(_options, "afterPopulateYearChange", afterPopulateYearChange);
_updateOptions(_options, "afterRenderChange", afterRenderChange);
_updateOptions(_options, "afterRenderedChange", afterRenderedChange);
_updateOptions(_options, "afterSelectWrapperNodeChange", afterSelectWrapperNodeChange);
_updateOptions(_options, "afterSrcNodeChange", afterSrcNodeChange);
_updateOptions(_options, "afterStringsChange", afterStringsChange);
_updateOptions(_options, "afterTabIndexChange", afterTabIndexChange);
_updateOptions(_options, "afterTriggerChange", afterTriggerChange);
_updateOptions(_options, "afterVisibleChange", afterVisibleChange);
_updateOptions(_options, "afterContentUpdate", afterContentUpdate);
_updateOptions(_options, "afterRender", afterRender);
_updateOptions(_options, "afterWidthChange", afterWidthChange);
_updateOptions(_options, "afterYearNodeChange", afterYearNodeChange);
_updateOptions(_options, "afterYearNodeNameChange", afterYearNodeNameChange);
_updateOptions(_options, "afterYearRangeChange", afterYearRangeChange);
_updateOptions(_options, "onAppendOrderChange", onAppendOrderChange);
_updateOptions(_options, "onBoundingBoxChange", onBoundingBoxChange);
_updateOptions(_options, "onButtonNodeChange", onButtonNodeChange);
_updateOptions(_options, "onCalendarChange", onCalendarChange);
_updateOptions(_options, "onContentBoxChange", onContentBoxChange);
_updateOptions(_options, "onCssClassChange", onCssClassChange);
_updateOptions(_options, "onDayNodeChange", onDayNodeChange);
_updateOptions(_options, "onDayNodeNameChange", onDayNodeNameChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onDisabledChange", onDisabledChange);
_updateOptions(_options, "onFocusedChange", onFocusedChange);
_updateOptions(_options, "onHeightChange", onHeightChange);
_updateOptions(_options, "onHideClassChange", onHideClassChange);
_updateOptions(_options, "onIdChange", onIdChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onMonthNodeChange", onMonthNodeChange);
_updateOptions(_options, "onMonthNodeNameChange", onMonthNodeNameChange);
_updateOptions(_options, "onPopulateDayChange", onPopulateDayChange);
_updateOptions(_options, "onPopulateMonthChange", onPopulateMonthChange);
_updateOptions(_options, "onPopulateYearChange", onPopulateYearChange);
_updateOptions(_options, "onRenderChange", onRenderChange);
_updateOptions(_options, "onRenderedChange", onRenderedChange);
_updateOptions(_options, "onSelectWrapperNodeChange", onSelectWrapperNodeChange);
_updateOptions(_options, "onSrcNodeChange", onSrcNodeChange);
_updateOptions(_options, "onStringsChange", onStringsChange);
_updateOptions(_options, "onTabIndexChange", onTabIndexChange);
_updateOptions(_options, "onTriggerChange", onTriggerChange);
_updateOptions(_options, "onVisibleChange", onVisibleChange);
_updateOptions(_options, "onContentUpdate", onContentUpdate);
_updateOptions(_options, "onRender", onRender);
_updateOptions(_options, "onWidthChange", onWidthChange);
_updateOptions(_options, "onYearNodeChange", onYearNodeChange);
_updateOptions(_options, "onYearNodeNameChange", onYearNodeNameChange);
_updateOptions(_options, "onYearRangeChange", onYearRangeChange);
%>

<%@ include file="init-ext.jsp" %>