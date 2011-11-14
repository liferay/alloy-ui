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

package com.liferay.alloy.taglib.alloy.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 * @generated
 */
public class BaseCalendarTag extends com.liferay.taglib.util.IncludeTag {

	@Override
	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public boolean getAllowNone() {
		return _allowNone;
	}

	public java.lang.String getBlankDays() {
		return _blankDays;
	}

	public java.lang.String getBoundingBox() {
		return _boundingBox;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.Object getCurrentDay() {
		return _currentDay;
	}

	public java.lang.Object getCurrentMonth() {
		return _currentMonth;
	}

	public java.lang.Object getCurrentYear() {
		return _currentYear;
	}

	public java.lang.Object getCustomRenderer() {
		return _customRenderer;
	}

	public java.lang.Object getDate() {
		return _date;
	}

	public java.lang.String getDateFormat() {
		return _dateFormat;
	}

	public java.lang.Object getDates() {
		return _dates;
	}

	public boolean getDestroyed() {
		return _destroyed;
	}

	public boolean getDisabled() {
		return _disabled;
	}

	public java.lang.String getDisabledDatesRule() {
		return _disabledDatesRule;
	}

	public java.lang.String getEnabledDatesRule() {
		return _enabledDatesRule;
	}

	public java.lang.Object getFirstDayOfWeek() {
		return _firstDayOfWeek;
	}

	public boolean getFocused() {
		return _focused;
	}

	public java.lang.String getHeaderContentNode() {
		return _headerContentNode;
	}

	public java.lang.Object getHeaderRenderer() {
		return _headerRenderer;
	}

	public java.lang.String getHeaderTitleNode() {
		return _headerTitleNode;
	}

	public java.lang.Object getHeight() {
		return _height;
	}

	public java.lang.String getIconNextNode() {
		return _iconNextNode;
	}

	public java.lang.String getIconPrevNode() {
		return _iconPrevNode;
	}

	public java.lang.String getCalendarId() {
		return _calendarId;
	}

	public boolean getInitialized() {
		return _initialized;
	}

	public java.lang.Object getMaxDate() {
		return _maxDate;
	}

	public java.lang.Object getMaximumDate() {
		return _maximumDate;
	}

	public java.lang.Object getMinDate() {
		return _minDate;
	}

	public java.lang.Object getMinimumDate() {
		return _minimumDate;
	}

	public java.lang.String getMonthDays() {
		return _monthDays;
	}

	public java.lang.String getMonthDaysNode() {
		return _monthDaysNode;
	}

	public java.lang.Object getNoneLinkNode() {
		return _noneLinkNode;
	}

	public java.lang.Object getPaddingDaysEnd() {
		return _paddingDaysEnd;
	}

	public java.lang.Object getPaddingDaysStart() {
		return _paddingDaysStart;
	}

	public java.lang.Object getRender() {
		return _render;
	}

	public boolean getRendered() {
		return _rendered;
	}

	public boolean getSelectMultipleDates() {
		return _selectMultipleDates;
	}

	public java.lang.Object getSelectedDates() {
		return _selectedDates;
	}

	public java.lang.String getSelectionMode() {
		return _selectionMode;
	}

	public boolean getSetValue() {
		return _setValue;
	}

	public boolean getShowNextMonth() {
		return _showNextMonth;
	}

	public boolean getShowOtherMonth() {
		return _showOtherMonth;
	}

	public boolean getShowPrevMonth() {
		return _showPrevMonth;
	}

	public boolean getShowToday() {
		return _showToday;
	}

	public java.lang.String getSrcNode() {
		return _srcNode;
	}

	public java.lang.Object getStrings() {
		return _strings;
	}

	public java.lang.Object getTabIndex() {
		return _tabIndex;
	}

	public java.lang.Object getTodayLinkNode() {
		return _todayLinkNode;
	}

	public boolean getVisible() {
		return _visible;
	}

	public java.lang.String getWeekDays() {
		return _weekDays;
	}

	public java.lang.String getWeekDaysNode() {
		return _weekDaysNode;
	}

	public java.lang.Object getWidth() {
		return _width;
	}

	public java.lang.Object getAfterAllowNoneChange() {
		return _afterAllowNoneChange;
	}

	public java.lang.Object getAfterBlankDaysChange() {
		return _afterBlankDaysChange;
	}

	public java.lang.Object getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.Object getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.Object getAfterCurrentDayChange() {
		return _afterCurrentDayChange;
	}

	public java.lang.Object getAfterCurrentMonthChange() {
		return _afterCurrentMonthChange;
	}

	public java.lang.Object getAfterCurrentYearChange() {
		return _afterCurrentYearChange;
	}

	public java.lang.Object getAfterCustomRendererChange() {
		return _afterCustomRendererChange;
	}

	public java.lang.Object getAfterDateChange() {
		return _afterDateChange;
	}

	public java.lang.Object getAfterDateFormatChange() {
		return _afterDateFormatChange;
	}

	public java.lang.Object getAfterDatesChange() {
		return _afterDatesChange;
	}

	public java.lang.Object getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.Object getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.Object getAfterDisabledChange() {
		return _afterDisabledChange;
	}

	public java.lang.Object getAfterDisabledDatesRuleChange() {
		return _afterDisabledDatesRuleChange;
	}

	public java.lang.Object getAfterEnabledDatesRuleChange() {
		return _afterEnabledDatesRuleChange;
	}

	public java.lang.Object getAfterFirstDayOfWeekChange() {
		return _afterFirstDayOfWeekChange;
	}

	public java.lang.Object getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.Object getAfterHeaderContentNodeChange() {
		return _afterHeaderContentNodeChange;
	}

	public java.lang.Object getAfterHeaderRendererChange() {
		return _afterHeaderRendererChange;
	}

	public java.lang.Object getAfterHeaderTitleNodeChange() {
		return _afterHeaderTitleNodeChange;
	}

	public java.lang.Object getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.Object getAfterIconNextNodeChange() {
		return _afterIconNextNodeChange;
	}

	public java.lang.Object getAfterIconPrevNodeChange() {
		return _afterIconPrevNodeChange;
	}

	public java.lang.Object getAfterIdChange() {
		return _afterIdChange;
	}

	public java.lang.Object getAfterInit() {
		return _afterInit;
	}

	public java.lang.Object getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.Object getAfterMaxDateChange() {
		return _afterMaxDateChange;
	}

	public java.lang.Object getAfterMaximumDateChange() {
		return _afterMaximumDateChange;
	}

	public java.lang.Object getAfterMinDateChange() {
		return _afterMinDateChange;
	}

	public java.lang.Object getAfterMinimumDateChange() {
		return _afterMinimumDateChange;
	}

	public java.lang.Object getAfterMonthDaysChange() {
		return _afterMonthDaysChange;
	}

	public java.lang.Object getAfterMonthDaysNodeChange() {
		return _afterMonthDaysNodeChange;
	}

	public java.lang.Object getAfterNoneLinkNodeChange() {
		return _afterNoneLinkNodeChange;
	}

	public java.lang.Object getAfterPaddingDaysEndChange() {
		return _afterPaddingDaysEndChange;
	}

	public java.lang.Object getAfterPaddingDaysStartChange() {
		return _afterPaddingDaysStartChange;
	}

	public java.lang.Object getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.Object getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.Object getAfterSelectMultipleDatesChange() {
		return _afterSelectMultipleDatesChange;
	}

	public java.lang.Object getAfterSelectedDatesChange() {
		return _afterSelectedDatesChange;
	}

	public java.lang.Object getAfterSelectionModeChange() {
		return _afterSelectionModeChange;
	}

	public java.lang.Object getAfterSetValueChange() {
		return _afterSetValueChange;
	}

	public java.lang.Object getAfterShowNextMonthChange() {
		return _afterShowNextMonthChange;
	}

	public java.lang.Object getAfterShowOtherMonthChange() {
		return _afterShowOtherMonthChange;
	}

	public java.lang.Object getAfterShowPrevMonthChange() {
		return _afterShowPrevMonthChange;
	}

	public java.lang.Object getAfterShowTodayChange() {
		return _afterShowTodayChange;
	}

	public java.lang.Object getAfterSrcNodeChange() {
		return _afterSrcNodeChange;
	}

	public java.lang.Object getAfterStringsChange() {
		return _afterStringsChange;
	}

	public java.lang.Object getAfterTabIndexChange() {
		return _afterTabIndexChange;
	}

	public java.lang.Object getAfterTodayLinkNodeChange() {
		return _afterTodayLinkNodeChange;
	}

	public java.lang.Object getAfterVisibleChange() {
		return _afterVisibleChange;
	}

	public java.lang.Object getAfterWeekDaysChange() {
		return _afterWeekDaysChange;
	}

	public java.lang.Object getAfterWeekDaysNodeChange() {
		return _afterWeekDaysNodeChange;
	}

	public java.lang.Object getAfterContentUpdate() {
		return _afterContentUpdate;
	}

	public java.lang.Object getAfterRender() {
		return _afterRender;
	}

	public java.lang.Object getAfterWidthChange() {
		return _afterWidthChange;
	}

	public java.lang.Object getOnAllowNoneChange() {
		return _onAllowNoneChange;
	}

	public java.lang.Object getOnBlankDaysChange() {
		return _onBlankDaysChange;
	}

	public java.lang.Object getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.Object getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.Object getOnCurrentDayChange() {
		return _onCurrentDayChange;
	}

	public java.lang.Object getOnCurrentMonthChange() {
		return _onCurrentMonthChange;
	}

	public java.lang.Object getOnCurrentYearChange() {
		return _onCurrentYearChange;
	}

	public java.lang.Object getOnCustomRendererChange() {
		return _onCustomRendererChange;
	}

	public java.lang.Object getOnDateChange() {
		return _onDateChange;
	}

	public java.lang.Object getOnDateFormatChange() {
		return _onDateFormatChange;
	}

	public java.lang.Object getOnDatesChange() {
		return _onDatesChange;
	}

	public java.lang.Object getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.Object getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.Object getOnDisabledChange() {
		return _onDisabledChange;
	}

	public java.lang.Object getOnDisabledDatesRuleChange() {
		return _onDisabledDatesRuleChange;
	}

	public java.lang.Object getOnEnabledDatesRuleChange() {
		return _onEnabledDatesRuleChange;
	}

	public java.lang.Object getOnFirstDayOfWeekChange() {
		return _onFirstDayOfWeekChange;
	}

	public java.lang.Object getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.Object getOnHeaderContentNodeChange() {
		return _onHeaderContentNodeChange;
	}

	public java.lang.Object getOnHeaderRendererChange() {
		return _onHeaderRendererChange;
	}

	public java.lang.Object getOnHeaderTitleNodeChange() {
		return _onHeaderTitleNodeChange;
	}

	public java.lang.Object getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.Object getOnIconNextNodeChange() {
		return _onIconNextNodeChange;
	}

	public java.lang.Object getOnIconPrevNodeChange() {
		return _onIconPrevNodeChange;
	}

	public java.lang.Object getOnIdChange() {
		return _onIdChange;
	}

	public java.lang.Object getOnInit() {
		return _onInit;
	}

	public java.lang.Object getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.Object getOnMaxDateChange() {
		return _onMaxDateChange;
	}

	public java.lang.Object getOnMaximumDateChange() {
		return _onMaximumDateChange;
	}

	public java.lang.Object getOnMinDateChange() {
		return _onMinDateChange;
	}

	public java.lang.Object getOnMinimumDateChange() {
		return _onMinimumDateChange;
	}

	public java.lang.Object getOnMonthDaysChange() {
		return _onMonthDaysChange;
	}

	public java.lang.Object getOnMonthDaysNodeChange() {
		return _onMonthDaysNodeChange;
	}

	public java.lang.Object getOnNoneLinkNodeChange() {
		return _onNoneLinkNodeChange;
	}

	public java.lang.Object getOnPaddingDaysEndChange() {
		return _onPaddingDaysEndChange;
	}

	public java.lang.Object getOnPaddingDaysStartChange() {
		return _onPaddingDaysStartChange;
	}

	public java.lang.Object getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.Object getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.Object getOnSelectMultipleDatesChange() {
		return _onSelectMultipleDatesChange;
	}

	public java.lang.Object getOnSelectedDatesChange() {
		return _onSelectedDatesChange;
	}

	public java.lang.Object getOnSelectionModeChange() {
		return _onSelectionModeChange;
	}

	public java.lang.Object getOnSetValueChange() {
		return _onSetValueChange;
	}

	public java.lang.Object getOnShowNextMonthChange() {
		return _onShowNextMonthChange;
	}

	public java.lang.Object getOnShowOtherMonthChange() {
		return _onShowOtherMonthChange;
	}

	public java.lang.Object getOnShowPrevMonthChange() {
		return _onShowPrevMonthChange;
	}

	public java.lang.Object getOnShowTodayChange() {
		return _onShowTodayChange;
	}

	public java.lang.Object getOnSrcNodeChange() {
		return _onSrcNodeChange;
	}

	public java.lang.Object getOnStringsChange() {
		return _onStringsChange;
	}

	public java.lang.Object getOnTabIndexChange() {
		return _onTabIndexChange;
	}

	public java.lang.Object getOnTodayLinkNodeChange() {
		return _onTodayLinkNodeChange;
	}

	public java.lang.Object getOnVisibleChange() {
		return _onVisibleChange;
	}

	public java.lang.Object getOnWeekDaysChange() {
		return _onWeekDaysChange;
	}

	public java.lang.Object getOnWeekDaysNodeChange() {
		return _onWeekDaysNodeChange;
	}

	public java.lang.Object getOnContentUpdate() {
		return _onContentUpdate;
	}

	public java.lang.Object getOnRender() {
		return _onRender;
	}

	public java.lang.Object getOnWidthChange() {
		return _onWidthChange;
	}

	public void setAllowNone(boolean allowNone) {
		_allowNone = allowNone;

		setScopedAttribute("allowNone", allowNone);
	}

	public void setBlankDays(java.lang.String blankDays) {
		_blankDays = blankDays;

		setScopedAttribute("blankDays", blankDays);
	}

	public void setBoundingBox(java.lang.String boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setContentBox(java.lang.String contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setCurrentDay(java.lang.Object currentDay) {
		_currentDay = currentDay;

		setScopedAttribute("currentDay", currentDay);
	}

	public void setCurrentMonth(java.lang.Object currentMonth) {
		_currentMonth = currentMonth;

		setScopedAttribute("currentMonth", currentMonth);
	}

	public void setCurrentYear(java.lang.Object currentYear) {
		_currentYear = currentYear;

		setScopedAttribute("currentYear", currentYear);
	}

	public void setCustomRenderer(java.lang.Object customRenderer) {
		_customRenderer = customRenderer;

		setScopedAttribute("customRenderer", customRenderer);
	}

	public void setDate(java.lang.Object date) {
		_date = date;

		setScopedAttribute("date", date);
	}

	public void setDateFormat(java.lang.String dateFormat) {
		_dateFormat = dateFormat;

		setScopedAttribute("dateFormat", dateFormat);
	}

	public void setDates(java.lang.Object dates) {
		_dates = dates;

		setScopedAttribute("dates", dates);
	}

	public void setDestroyed(boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDisabled(boolean disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	public void setDisabledDatesRule(java.lang.String disabledDatesRule) {
		_disabledDatesRule = disabledDatesRule;

		setScopedAttribute("disabledDatesRule", disabledDatesRule);
	}

	public void setEnabledDatesRule(java.lang.String enabledDatesRule) {
		_enabledDatesRule = enabledDatesRule;

		setScopedAttribute("enabledDatesRule", enabledDatesRule);
	}

	public void setFirstDayOfWeek(java.lang.Object firstDayOfWeek) {
		_firstDayOfWeek = firstDayOfWeek;

		setScopedAttribute("firstDayOfWeek", firstDayOfWeek);
	}

	public void setFocused(boolean focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setHeaderContentNode(java.lang.String headerContentNode) {
		_headerContentNode = headerContentNode;

		setScopedAttribute("headerContentNode", headerContentNode);
	}

	public void setHeaderRenderer(java.lang.Object headerRenderer) {
		_headerRenderer = headerRenderer;

		setScopedAttribute("headerRenderer", headerRenderer);
	}

	public void setHeaderTitleNode(java.lang.String headerTitleNode) {
		_headerTitleNode = headerTitleNode;

		setScopedAttribute("headerTitleNode", headerTitleNode);
	}

	public void setHeight(java.lang.Object height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setIconNextNode(java.lang.String iconNextNode) {
		_iconNextNode = iconNextNode;

		setScopedAttribute("iconNextNode", iconNextNode);
	}

	public void setIconPrevNode(java.lang.String iconPrevNode) {
		_iconPrevNode = iconPrevNode;

		setScopedAttribute("iconPrevNode", iconPrevNode);
	}

	public void setCalendarId(java.lang.String calendarId) {
		_calendarId = calendarId;

		setScopedAttribute("calendarId", calendarId);
	}

	public void setInitialized(boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setMaxDate(java.lang.Object maxDate) {
		_maxDate = maxDate;

		setScopedAttribute("maxDate", maxDate);
	}

	public void setMaximumDate(java.lang.Object maximumDate) {
		_maximumDate = maximumDate;

		setScopedAttribute("maximumDate", maximumDate);
	}

	public void setMinDate(java.lang.Object minDate) {
		_minDate = minDate;

		setScopedAttribute("minDate", minDate);
	}

	public void setMinimumDate(java.lang.Object minimumDate) {
		_minimumDate = minimumDate;

		setScopedAttribute("minimumDate", minimumDate);
	}

	public void setMonthDays(java.lang.String monthDays) {
		_monthDays = monthDays;

		setScopedAttribute("monthDays", monthDays);
	}

	public void setMonthDaysNode(java.lang.String monthDaysNode) {
		_monthDaysNode = monthDaysNode;

		setScopedAttribute("monthDaysNode", monthDaysNode);
	}

	public void setNoneLinkNode(java.lang.Object noneLinkNode) {
		_noneLinkNode = noneLinkNode;

		setScopedAttribute("noneLinkNode", noneLinkNode);
	}

	public void setPaddingDaysEnd(java.lang.Object paddingDaysEnd) {
		_paddingDaysEnd = paddingDaysEnd;

		setScopedAttribute("paddingDaysEnd", paddingDaysEnd);
	}

	public void setPaddingDaysStart(java.lang.Object paddingDaysStart) {
		_paddingDaysStart = paddingDaysStart;

		setScopedAttribute("paddingDaysStart", paddingDaysStart);
	}

	public void setRender(java.lang.Object render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(boolean rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setSelectMultipleDates(boolean selectMultipleDates) {
		_selectMultipleDates = selectMultipleDates;

		setScopedAttribute("selectMultipleDates", selectMultipleDates);
	}

	public void setSelectedDates(java.lang.Object selectedDates) {
		_selectedDates = selectedDates;

		setScopedAttribute("selectedDates", selectedDates);
	}

	public void setSelectionMode(java.lang.String selectionMode) {
		_selectionMode = selectionMode;

		setScopedAttribute("selectionMode", selectionMode);
	}

	public void setSetValue(boolean setValue) {
		_setValue = setValue;

		setScopedAttribute("setValue", setValue);
	}

	public void setShowNextMonth(boolean showNextMonth) {
		_showNextMonth = showNextMonth;

		setScopedAttribute("showNextMonth", showNextMonth);
	}

	public void setShowOtherMonth(boolean showOtherMonth) {
		_showOtherMonth = showOtherMonth;

		setScopedAttribute("showOtherMonth", showOtherMonth);
	}

	public void setShowPrevMonth(boolean showPrevMonth) {
		_showPrevMonth = showPrevMonth;

		setScopedAttribute("showPrevMonth", showPrevMonth);
	}

	public void setShowToday(boolean showToday) {
		_showToday = showToday;

		setScopedAttribute("showToday", showToday);
	}

	public void setSrcNode(java.lang.String srcNode) {
		_srcNode = srcNode;

		setScopedAttribute("srcNode", srcNode);
	}

	public void setStrings(java.lang.Object strings) {
		_strings = strings;

		setScopedAttribute("strings", strings);
	}

	public void setTabIndex(java.lang.Object tabIndex) {
		_tabIndex = tabIndex;

		setScopedAttribute("tabIndex", tabIndex);
	}

	public void setTodayLinkNode(java.lang.Object todayLinkNode) {
		_todayLinkNode = todayLinkNode;

		setScopedAttribute("todayLinkNode", todayLinkNode);
	}

	public void setVisible(boolean visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setWeekDays(java.lang.String weekDays) {
		_weekDays = weekDays;

		setScopedAttribute("weekDays", weekDays);
	}

	public void setWeekDaysNode(java.lang.String weekDaysNode) {
		_weekDaysNode = weekDaysNode;

		setScopedAttribute("weekDaysNode", weekDaysNode);
	}

	public void setWidth(java.lang.Object width) {
		_width = width;

		setScopedAttribute("width", width);
	}

	public void setAfterAllowNoneChange(java.lang.Object afterAllowNoneChange) {
		_afterAllowNoneChange = afterAllowNoneChange;

		setScopedAttribute("afterAllowNoneChange", afterAllowNoneChange);
	}

	public void setAfterBlankDaysChange(java.lang.Object afterBlankDaysChange) {
		_afterBlankDaysChange = afterBlankDaysChange;

		setScopedAttribute("afterBlankDaysChange", afterBlankDaysChange);
	}

	public void setAfterBoundingBoxChange(java.lang.Object afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterContentBoxChange(java.lang.Object afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCurrentDayChange(java.lang.Object afterCurrentDayChange) {
		_afterCurrentDayChange = afterCurrentDayChange;

		setScopedAttribute("afterCurrentDayChange", afterCurrentDayChange);
	}

	public void setAfterCurrentMonthChange(java.lang.Object afterCurrentMonthChange) {
		_afterCurrentMonthChange = afterCurrentMonthChange;

		setScopedAttribute("afterCurrentMonthChange", afterCurrentMonthChange);
	}

	public void setAfterCurrentYearChange(java.lang.Object afterCurrentYearChange) {
		_afterCurrentYearChange = afterCurrentYearChange;

		setScopedAttribute("afterCurrentYearChange", afterCurrentYearChange);
	}

	public void setAfterCustomRendererChange(java.lang.Object afterCustomRendererChange) {
		_afterCustomRendererChange = afterCustomRendererChange;

		setScopedAttribute("afterCustomRendererChange", afterCustomRendererChange);
	}

	public void setAfterDateChange(java.lang.Object afterDateChange) {
		_afterDateChange = afterDateChange;

		setScopedAttribute("afterDateChange", afterDateChange);
	}

	public void setAfterDateFormatChange(java.lang.Object afterDateFormatChange) {
		_afterDateFormatChange = afterDateFormatChange;

		setScopedAttribute("afterDateFormatChange", afterDateFormatChange);
	}

	public void setAfterDatesChange(java.lang.Object afterDatesChange) {
		_afterDatesChange = afterDatesChange;

		setScopedAttribute("afterDatesChange", afterDatesChange);
	}

	public void setAfterDestroy(java.lang.Object afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.Object afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterDisabledChange(java.lang.Object afterDisabledChange) {
		_afterDisabledChange = afterDisabledChange;

		setScopedAttribute("afterDisabledChange", afterDisabledChange);
	}

	public void setAfterDisabledDatesRuleChange(java.lang.Object afterDisabledDatesRuleChange) {
		_afterDisabledDatesRuleChange = afterDisabledDatesRuleChange;

		setScopedAttribute("afterDisabledDatesRuleChange", afterDisabledDatesRuleChange);
	}

	public void setAfterEnabledDatesRuleChange(java.lang.Object afterEnabledDatesRuleChange) {
		_afterEnabledDatesRuleChange = afterEnabledDatesRuleChange;

		setScopedAttribute("afterEnabledDatesRuleChange", afterEnabledDatesRuleChange);
	}

	public void setAfterFirstDayOfWeekChange(java.lang.Object afterFirstDayOfWeekChange) {
		_afterFirstDayOfWeekChange = afterFirstDayOfWeekChange;

		setScopedAttribute("afterFirstDayOfWeekChange", afterFirstDayOfWeekChange);
	}

	public void setAfterFocusedChange(java.lang.Object afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterHeaderContentNodeChange(java.lang.Object afterHeaderContentNodeChange) {
		_afterHeaderContentNodeChange = afterHeaderContentNodeChange;

		setScopedAttribute("afterHeaderContentNodeChange", afterHeaderContentNodeChange);
	}

	public void setAfterHeaderRendererChange(java.lang.Object afterHeaderRendererChange) {
		_afterHeaderRendererChange = afterHeaderRendererChange;

		setScopedAttribute("afterHeaderRendererChange", afterHeaderRendererChange);
	}

	public void setAfterHeaderTitleNodeChange(java.lang.Object afterHeaderTitleNodeChange) {
		_afterHeaderTitleNodeChange = afterHeaderTitleNodeChange;

		setScopedAttribute("afterHeaderTitleNodeChange", afterHeaderTitleNodeChange);
	}

	public void setAfterHeightChange(java.lang.Object afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterIconNextNodeChange(java.lang.Object afterIconNextNodeChange) {
		_afterIconNextNodeChange = afterIconNextNodeChange;

		setScopedAttribute("afterIconNextNodeChange", afterIconNextNodeChange);
	}

	public void setAfterIconPrevNodeChange(java.lang.Object afterIconPrevNodeChange) {
		_afterIconPrevNodeChange = afterIconPrevNodeChange;

		setScopedAttribute("afterIconPrevNodeChange", afterIconPrevNodeChange);
	}

	public void setAfterIdChange(java.lang.Object afterIdChange) {
		_afterIdChange = afterIdChange;

		setScopedAttribute("afterIdChange", afterIdChange);
	}

	public void setAfterInit(java.lang.Object afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.Object afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterMaxDateChange(java.lang.Object afterMaxDateChange) {
		_afterMaxDateChange = afterMaxDateChange;

		setScopedAttribute("afterMaxDateChange", afterMaxDateChange);
	}

	public void setAfterMaximumDateChange(java.lang.Object afterMaximumDateChange) {
		_afterMaximumDateChange = afterMaximumDateChange;

		setScopedAttribute("afterMaximumDateChange", afterMaximumDateChange);
	}

	public void setAfterMinDateChange(java.lang.Object afterMinDateChange) {
		_afterMinDateChange = afterMinDateChange;

		setScopedAttribute("afterMinDateChange", afterMinDateChange);
	}

	public void setAfterMinimumDateChange(java.lang.Object afterMinimumDateChange) {
		_afterMinimumDateChange = afterMinimumDateChange;

		setScopedAttribute("afterMinimumDateChange", afterMinimumDateChange);
	}

	public void setAfterMonthDaysChange(java.lang.Object afterMonthDaysChange) {
		_afterMonthDaysChange = afterMonthDaysChange;

		setScopedAttribute("afterMonthDaysChange", afterMonthDaysChange);
	}

	public void setAfterMonthDaysNodeChange(java.lang.Object afterMonthDaysNodeChange) {
		_afterMonthDaysNodeChange = afterMonthDaysNodeChange;

		setScopedAttribute("afterMonthDaysNodeChange", afterMonthDaysNodeChange);
	}

	public void setAfterNoneLinkNodeChange(java.lang.Object afterNoneLinkNodeChange) {
		_afterNoneLinkNodeChange = afterNoneLinkNodeChange;

		setScopedAttribute("afterNoneLinkNodeChange", afterNoneLinkNodeChange);
	}

	public void setAfterPaddingDaysEndChange(java.lang.Object afterPaddingDaysEndChange) {
		_afterPaddingDaysEndChange = afterPaddingDaysEndChange;

		setScopedAttribute("afterPaddingDaysEndChange", afterPaddingDaysEndChange);
	}

	public void setAfterPaddingDaysStartChange(java.lang.Object afterPaddingDaysStartChange) {
		_afterPaddingDaysStartChange = afterPaddingDaysStartChange;

		setScopedAttribute("afterPaddingDaysStartChange", afterPaddingDaysStartChange);
	}

	public void setAfterRenderChange(java.lang.Object afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderedChange(java.lang.Object afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterSelectMultipleDatesChange(java.lang.Object afterSelectMultipleDatesChange) {
		_afterSelectMultipleDatesChange = afterSelectMultipleDatesChange;

		setScopedAttribute("afterSelectMultipleDatesChange", afterSelectMultipleDatesChange);
	}

	public void setAfterSelectedDatesChange(java.lang.Object afterSelectedDatesChange) {
		_afterSelectedDatesChange = afterSelectedDatesChange;

		setScopedAttribute("afterSelectedDatesChange", afterSelectedDatesChange);
	}

	public void setAfterSelectionModeChange(java.lang.Object afterSelectionModeChange) {
		_afterSelectionModeChange = afterSelectionModeChange;

		setScopedAttribute("afterSelectionModeChange", afterSelectionModeChange);
	}

	public void setAfterSetValueChange(java.lang.Object afterSetValueChange) {
		_afterSetValueChange = afterSetValueChange;

		setScopedAttribute("afterSetValueChange", afterSetValueChange);
	}

	public void setAfterShowNextMonthChange(java.lang.Object afterShowNextMonthChange) {
		_afterShowNextMonthChange = afterShowNextMonthChange;

		setScopedAttribute("afterShowNextMonthChange", afterShowNextMonthChange);
	}

	public void setAfterShowOtherMonthChange(java.lang.Object afterShowOtherMonthChange) {
		_afterShowOtherMonthChange = afterShowOtherMonthChange;

		setScopedAttribute("afterShowOtherMonthChange", afterShowOtherMonthChange);
	}

	public void setAfterShowPrevMonthChange(java.lang.Object afterShowPrevMonthChange) {
		_afterShowPrevMonthChange = afterShowPrevMonthChange;

		setScopedAttribute("afterShowPrevMonthChange", afterShowPrevMonthChange);
	}

	public void setAfterShowTodayChange(java.lang.Object afterShowTodayChange) {
		_afterShowTodayChange = afterShowTodayChange;

		setScopedAttribute("afterShowTodayChange", afterShowTodayChange);
	}

	public void setAfterSrcNodeChange(java.lang.Object afterSrcNodeChange) {
		_afterSrcNodeChange = afterSrcNodeChange;

		setScopedAttribute("afterSrcNodeChange", afterSrcNodeChange);
	}

	public void setAfterStringsChange(java.lang.Object afterStringsChange) {
		_afterStringsChange = afterStringsChange;

		setScopedAttribute("afterStringsChange", afterStringsChange);
	}

	public void setAfterTabIndexChange(java.lang.Object afterTabIndexChange) {
		_afterTabIndexChange = afterTabIndexChange;

		setScopedAttribute("afterTabIndexChange", afterTabIndexChange);
	}

	public void setAfterTodayLinkNodeChange(java.lang.Object afterTodayLinkNodeChange) {
		_afterTodayLinkNodeChange = afterTodayLinkNodeChange;

		setScopedAttribute("afterTodayLinkNodeChange", afterTodayLinkNodeChange);
	}

	public void setAfterVisibleChange(java.lang.Object afterVisibleChange) {
		_afterVisibleChange = afterVisibleChange;

		setScopedAttribute("afterVisibleChange", afterVisibleChange);
	}

	public void setAfterWeekDaysChange(java.lang.Object afterWeekDaysChange) {
		_afterWeekDaysChange = afterWeekDaysChange;

		setScopedAttribute("afterWeekDaysChange", afterWeekDaysChange);
	}

	public void setAfterWeekDaysNodeChange(java.lang.Object afterWeekDaysNodeChange) {
		_afterWeekDaysNodeChange = afterWeekDaysNodeChange;

		setScopedAttribute("afterWeekDaysNodeChange", afterWeekDaysNodeChange);
	}

	public void setAfterContentUpdate(java.lang.Object afterContentUpdate) {
		_afterContentUpdate = afterContentUpdate;

		setScopedAttribute("afterContentUpdate", afterContentUpdate);
	}

	public void setAfterRender(java.lang.Object afterRender) {
		_afterRender = afterRender;

		setScopedAttribute("afterRender", afterRender);
	}

	public void setAfterWidthChange(java.lang.Object afterWidthChange) {
		_afterWidthChange = afterWidthChange;

		setScopedAttribute("afterWidthChange", afterWidthChange);
	}

	public void setOnAllowNoneChange(java.lang.Object onAllowNoneChange) {
		_onAllowNoneChange = onAllowNoneChange;

		setScopedAttribute("onAllowNoneChange", onAllowNoneChange);
	}

	public void setOnBlankDaysChange(java.lang.Object onBlankDaysChange) {
		_onBlankDaysChange = onBlankDaysChange;

		setScopedAttribute("onBlankDaysChange", onBlankDaysChange);
	}

	public void setOnBoundingBoxChange(java.lang.Object onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnContentBoxChange(java.lang.Object onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCurrentDayChange(java.lang.Object onCurrentDayChange) {
		_onCurrentDayChange = onCurrentDayChange;

		setScopedAttribute("onCurrentDayChange", onCurrentDayChange);
	}

	public void setOnCurrentMonthChange(java.lang.Object onCurrentMonthChange) {
		_onCurrentMonthChange = onCurrentMonthChange;

		setScopedAttribute("onCurrentMonthChange", onCurrentMonthChange);
	}

	public void setOnCurrentYearChange(java.lang.Object onCurrentYearChange) {
		_onCurrentYearChange = onCurrentYearChange;

		setScopedAttribute("onCurrentYearChange", onCurrentYearChange);
	}

	public void setOnCustomRendererChange(java.lang.Object onCustomRendererChange) {
		_onCustomRendererChange = onCustomRendererChange;

		setScopedAttribute("onCustomRendererChange", onCustomRendererChange);
	}

	public void setOnDateChange(java.lang.Object onDateChange) {
		_onDateChange = onDateChange;

		setScopedAttribute("onDateChange", onDateChange);
	}

	public void setOnDateFormatChange(java.lang.Object onDateFormatChange) {
		_onDateFormatChange = onDateFormatChange;

		setScopedAttribute("onDateFormatChange", onDateFormatChange);
	}

	public void setOnDatesChange(java.lang.Object onDatesChange) {
		_onDatesChange = onDatesChange;

		setScopedAttribute("onDatesChange", onDatesChange);
	}

	public void setOnDestroy(java.lang.Object onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.Object onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnDisabledChange(java.lang.Object onDisabledChange) {
		_onDisabledChange = onDisabledChange;

		setScopedAttribute("onDisabledChange", onDisabledChange);
	}

	public void setOnDisabledDatesRuleChange(java.lang.Object onDisabledDatesRuleChange) {
		_onDisabledDatesRuleChange = onDisabledDatesRuleChange;

		setScopedAttribute("onDisabledDatesRuleChange", onDisabledDatesRuleChange);
	}

	public void setOnEnabledDatesRuleChange(java.lang.Object onEnabledDatesRuleChange) {
		_onEnabledDatesRuleChange = onEnabledDatesRuleChange;

		setScopedAttribute("onEnabledDatesRuleChange", onEnabledDatesRuleChange);
	}

	public void setOnFirstDayOfWeekChange(java.lang.Object onFirstDayOfWeekChange) {
		_onFirstDayOfWeekChange = onFirstDayOfWeekChange;

		setScopedAttribute("onFirstDayOfWeekChange", onFirstDayOfWeekChange);
	}

	public void setOnFocusedChange(java.lang.Object onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnHeaderContentNodeChange(java.lang.Object onHeaderContentNodeChange) {
		_onHeaderContentNodeChange = onHeaderContentNodeChange;

		setScopedAttribute("onHeaderContentNodeChange", onHeaderContentNodeChange);
	}

	public void setOnHeaderRendererChange(java.lang.Object onHeaderRendererChange) {
		_onHeaderRendererChange = onHeaderRendererChange;

		setScopedAttribute("onHeaderRendererChange", onHeaderRendererChange);
	}

	public void setOnHeaderTitleNodeChange(java.lang.Object onHeaderTitleNodeChange) {
		_onHeaderTitleNodeChange = onHeaderTitleNodeChange;

		setScopedAttribute("onHeaderTitleNodeChange", onHeaderTitleNodeChange);
	}

	public void setOnHeightChange(java.lang.Object onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnIconNextNodeChange(java.lang.Object onIconNextNodeChange) {
		_onIconNextNodeChange = onIconNextNodeChange;

		setScopedAttribute("onIconNextNodeChange", onIconNextNodeChange);
	}

	public void setOnIconPrevNodeChange(java.lang.Object onIconPrevNodeChange) {
		_onIconPrevNodeChange = onIconPrevNodeChange;

		setScopedAttribute("onIconPrevNodeChange", onIconPrevNodeChange);
	}

	public void setOnIdChange(java.lang.Object onIdChange) {
		_onIdChange = onIdChange;

		setScopedAttribute("onIdChange", onIdChange);
	}

	public void setOnInit(java.lang.Object onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.Object onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnMaxDateChange(java.lang.Object onMaxDateChange) {
		_onMaxDateChange = onMaxDateChange;

		setScopedAttribute("onMaxDateChange", onMaxDateChange);
	}

	public void setOnMaximumDateChange(java.lang.Object onMaximumDateChange) {
		_onMaximumDateChange = onMaximumDateChange;

		setScopedAttribute("onMaximumDateChange", onMaximumDateChange);
	}

	public void setOnMinDateChange(java.lang.Object onMinDateChange) {
		_onMinDateChange = onMinDateChange;

		setScopedAttribute("onMinDateChange", onMinDateChange);
	}

	public void setOnMinimumDateChange(java.lang.Object onMinimumDateChange) {
		_onMinimumDateChange = onMinimumDateChange;

		setScopedAttribute("onMinimumDateChange", onMinimumDateChange);
	}

	public void setOnMonthDaysChange(java.lang.Object onMonthDaysChange) {
		_onMonthDaysChange = onMonthDaysChange;

		setScopedAttribute("onMonthDaysChange", onMonthDaysChange);
	}

	public void setOnMonthDaysNodeChange(java.lang.Object onMonthDaysNodeChange) {
		_onMonthDaysNodeChange = onMonthDaysNodeChange;

		setScopedAttribute("onMonthDaysNodeChange", onMonthDaysNodeChange);
	}

	public void setOnNoneLinkNodeChange(java.lang.Object onNoneLinkNodeChange) {
		_onNoneLinkNodeChange = onNoneLinkNodeChange;

		setScopedAttribute("onNoneLinkNodeChange", onNoneLinkNodeChange);
	}

	public void setOnPaddingDaysEndChange(java.lang.Object onPaddingDaysEndChange) {
		_onPaddingDaysEndChange = onPaddingDaysEndChange;

		setScopedAttribute("onPaddingDaysEndChange", onPaddingDaysEndChange);
	}

	public void setOnPaddingDaysStartChange(java.lang.Object onPaddingDaysStartChange) {
		_onPaddingDaysStartChange = onPaddingDaysStartChange;

		setScopedAttribute("onPaddingDaysStartChange", onPaddingDaysStartChange);
	}

	public void setOnRenderChange(java.lang.Object onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderedChange(java.lang.Object onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnSelectMultipleDatesChange(java.lang.Object onSelectMultipleDatesChange) {
		_onSelectMultipleDatesChange = onSelectMultipleDatesChange;

		setScopedAttribute("onSelectMultipleDatesChange", onSelectMultipleDatesChange);
	}

	public void setOnSelectedDatesChange(java.lang.Object onSelectedDatesChange) {
		_onSelectedDatesChange = onSelectedDatesChange;

		setScopedAttribute("onSelectedDatesChange", onSelectedDatesChange);
	}

	public void setOnSelectionModeChange(java.lang.Object onSelectionModeChange) {
		_onSelectionModeChange = onSelectionModeChange;

		setScopedAttribute("onSelectionModeChange", onSelectionModeChange);
	}

	public void setOnSetValueChange(java.lang.Object onSetValueChange) {
		_onSetValueChange = onSetValueChange;

		setScopedAttribute("onSetValueChange", onSetValueChange);
	}

	public void setOnShowNextMonthChange(java.lang.Object onShowNextMonthChange) {
		_onShowNextMonthChange = onShowNextMonthChange;

		setScopedAttribute("onShowNextMonthChange", onShowNextMonthChange);
	}

	public void setOnShowOtherMonthChange(java.lang.Object onShowOtherMonthChange) {
		_onShowOtherMonthChange = onShowOtherMonthChange;

		setScopedAttribute("onShowOtherMonthChange", onShowOtherMonthChange);
	}

	public void setOnShowPrevMonthChange(java.lang.Object onShowPrevMonthChange) {
		_onShowPrevMonthChange = onShowPrevMonthChange;

		setScopedAttribute("onShowPrevMonthChange", onShowPrevMonthChange);
	}

	public void setOnShowTodayChange(java.lang.Object onShowTodayChange) {
		_onShowTodayChange = onShowTodayChange;

		setScopedAttribute("onShowTodayChange", onShowTodayChange);
	}

	public void setOnSrcNodeChange(java.lang.Object onSrcNodeChange) {
		_onSrcNodeChange = onSrcNodeChange;

		setScopedAttribute("onSrcNodeChange", onSrcNodeChange);
	}

	public void setOnStringsChange(java.lang.Object onStringsChange) {
		_onStringsChange = onStringsChange;

		setScopedAttribute("onStringsChange", onStringsChange);
	}

	public void setOnTabIndexChange(java.lang.Object onTabIndexChange) {
		_onTabIndexChange = onTabIndexChange;

		setScopedAttribute("onTabIndexChange", onTabIndexChange);
	}

	public void setOnTodayLinkNodeChange(java.lang.Object onTodayLinkNodeChange) {
		_onTodayLinkNodeChange = onTodayLinkNodeChange;

		setScopedAttribute("onTodayLinkNodeChange", onTodayLinkNodeChange);
	}

	public void setOnVisibleChange(java.lang.Object onVisibleChange) {
		_onVisibleChange = onVisibleChange;

		setScopedAttribute("onVisibleChange", onVisibleChange);
	}

	public void setOnWeekDaysChange(java.lang.Object onWeekDaysChange) {
		_onWeekDaysChange = onWeekDaysChange;

		setScopedAttribute("onWeekDaysChange", onWeekDaysChange);
	}

	public void setOnWeekDaysNodeChange(java.lang.Object onWeekDaysNodeChange) {
		_onWeekDaysNodeChange = onWeekDaysNodeChange;

		setScopedAttribute("onWeekDaysNodeChange", onWeekDaysNodeChange);
	}

	public void setOnContentUpdate(java.lang.Object onContentUpdate) {
		_onContentUpdate = onContentUpdate;

		setScopedAttribute("onContentUpdate", onContentUpdate);
	}

	public void setOnRender(java.lang.Object onRender) {
		_onRender = onRender;

		setScopedAttribute("onRender", onRender);
	}

	public void setOnWidthChange(java.lang.Object onWidthChange) {
		_onWidthChange = onWidthChange;

		setScopedAttribute("onWidthChange", onWidthChange);
	}

	@Override
	protected void cleanUp() {
		_allowNone = true;
		_blankDays = null;
		_boundingBox = null;
		_contentBox = null;
		_currentDay = 0;
		_currentMonth = 0;
		_currentYear = 0;
		_customRenderer = null;
		_date = null;
		_dateFormat = "%m/%d/%Y";
		_dates = null;
		_destroyed = false;
		_disabled = false;
		_disabledDatesRule = null;
		_enabledDatesRule = null;
		_firstDayOfWeek = 0;
		_focused = false;
		_headerContentNode = null;
		_headerRenderer = null;
		_headerTitleNode = null;
		_height = null;
		_iconNextNode = null;
		_iconPrevNode = null;
		_calendarId = null;
		_initialized = false;
		_maxDate = null;
		_maximumDate = null;
		_minDate = null;
		_minimumDate = null;
		_monthDays = null;
		_monthDaysNode = null;
		_noneLinkNode = null;
		_paddingDaysEnd = null;
		_paddingDaysStart = null;
		_render = null;
		_rendered = false;
		_selectMultipleDates = false;
		_selectedDates = null;
		_selectionMode = "single";
		_setValue = true;
		_showNextMonth = false;
		_showOtherMonth = true;
		_showPrevMonth = false;
		_showToday = true;
		_srcNode = null;
		_strings = null;
		_tabIndex = 0;
		_todayLinkNode = null;
		_visible = true;
		_weekDays = null;
		_weekDaysNode = null;
		_width = null;
		_afterAllowNoneChange = null;
		_afterBlankDaysChange = null;
		_afterBoundingBoxChange = null;
		_afterContentBoxChange = null;
		_afterCurrentDayChange = null;
		_afterCurrentMonthChange = null;
		_afterCurrentYearChange = null;
		_afterCustomRendererChange = null;
		_afterDateChange = null;
		_afterDateFormatChange = null;
		_afterDatesChange = null;
		_afterDestroy = null;
		_afterDestroyedChange = null;
		_afterDisabledChange = null;
		_afterDisabledDatesRuleChange = null;
		_afterEnabledDatesRuleChange = null;
		_afterFirstDayOfWeekChange = null;
		_afterFocusedChange = null;
		_afterHeaderContentNodeChange = null;
		_afterHeaderRendererChange = null;
		_afterHeaderTitleNodeChange = null;
		_afterHeightChange = null;
		_afterIconNextNodeChange = null;
		_afterIconPrevNodeChange = null;
		_afterIdChange = null;
		_afterInit = null;
		_afterInitializedChange = null;
		_afterMaxDateChange = null;
		_afterMaximumDateChange = null;
		_afterMinDateChange = null;
		_afterMinimumDateChange = null;
		_afterMonthDaysChange = null;
		_afterMonthDaysNodeChange = null;
		_afterNoneLinkNodeChange = null;
		_afterPaddingDaysEndChange = null;
		_afterPaddingDaysStartChange = null;
		_afterRenderChange = null;
		_afterRenderedChange = null;
		_afterSelectMultipleDatesChange = null;
		_afterSelectedDatesChange = null;
		_afterSelectionModeChange = null;
		_afterSetValueChange = null;
		_afterShowNextMonthChange = null;
		_afterShowOtherMonthChange = null;
		_afterShowPrevMonthChange = null;
		_afterShowTodayChange = null;
		_afterSrcNodeChange = null;
		_afterStringsChange = null;
		_afterTabIndexChange = null;
		_afterTodayLinkNodeChange = null;
		_afterVisibleChange = null;
		_afterWeekDaysChange = null;
		_afterWeekDaysNodeChange = null;
		_afterContentUpdate = null;
		_afterRender = null;
		_afterWidthChange = null;
		_onAllowNoneChange = null;
		_onBlankDaysChange = null;
		_onBoundingBoxChange = null;
		_onContentBoxChange = null;
		_onCurrentDayChange = null;
		_onCurrentMonthChange = null;
		_onCurrentYearChange = null;
		_onCustomRendererChange = null;
		_onDateChange = null;
		_onDateFormatChange = null;
		_onDatesChange = null;
		_onDestroy = null;
		_onDestroyedChange = null;
		_onDisabledChange = null;
		_onDisabledDatesRuleChange = null;
		_onEnabledDatesRuleChange = null;
		_onFirstDayOfWeekChange = null;
		_onFocusedChange = null;
		_onHeaderContentNodeChange = null;
		_onHeaderRendererChange = null;
		_onHeaderTitleNodeChange = null;
		_onHeightChange = null;
		_onIconNextNodeChange = null;
		_onIconPrevNodeChange = null;
		_onIdChange = null;
		_onInit = null;
		_onInitializedChange = null;
		_onMaxDateChange = null;
		_onMaximumDateChange = null;
		_onMinDateChange = null;
		_onMinimumDateChange = null;
		_onMonthDaysChange = null;
		_onMonthDaysNodeChange = null;
		_onNoneLinkNodeChange = null;
		_onPaddingDaysEndChange = null;
		_onPaddingDaysStartChange = null;
		_onRenderChange = null;
		_onRenderedChange = null;
		_onSelectMultipleDatesChange = null;
		_onSelectedDatesChange = null;
		_onSelectionModeChange = null;
		_onSetValueChange = null;
		_onShowNextMonthChange = null;
		_onShowOtherMonthChange = null;
		_onShowPrevMonthChange = null;
		_onShowTodayChange = null;
		_onSrcNodeChange = null;
		_onStringsChange = null;
		_onTabIndexChange = null;
		_onTodayLinkNodeChange = null;
		_onVisibleChange = null;
		_onWeekDaysChange = null;
		_onWeekDaysNodeChange = null;
		_onContentUpdate = null;
		_onRender = null;
		_onWidthChange = null;
	}

	@Override
	protected String getPage() {
		return _PAGE;
	}

	@Override
	protected void setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "allowNone", _allowNone);
		setNamespacedAttribute(request, "blankDays", _blankDays);
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "currentDay", _currentDay);
		setNamespacedAttribute(request, "currentMonth", _currentMonth);
		setNamespacedAttribute(request, "currentYear", _currentYear);
		setNamespacedAttribute(request, "customRenderer", _customRenderer);
		setNamespacedAttribute(request, "date", _date);
		setNamespacedAttribute(request, "dateFormat", _dateFormat);
		setNamespacedAttribute(request, "dates", _dates);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "disabledDatesRule", _disabledDatesRule);
		setNamespacedAttribute(request, "enabledDatesRule", _enabledDatesRule);
		setNamespacedAttribute(request, "firstDayOfWeek", _firstDayOfWeek);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "headerContentNode", _headerContentNode);
		setNamespacedAttribute(request, "headerRenderer", _headerRenderer);
		setNamespacedAttribute(request, "headerTitleNode", _headerTitleNode);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "iconNextNode", _iconNextNode);
		setNamespacedAttribute(request, "iconPrevNode", _iconPrevNode);
		setNamespacedAttribute(request, "calendarId", _calendarId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "maxDate", _maxDate);
		setNamespacedAttribute(request, "maximumDate", _maximumDate);
		setNamespacedAttribute(request, "minDate", _minDate);
		setNamespacedAttribute(request, "minimumDate", _minimumDate);
		setNamespacedAttribute(request, "monthDays", _monthDays);
		setNamespacedAttribute(request, "monthDaysNode", _monthDaysNode);
		setNamespacedAttribute(request, "noneLinkNode", _noneLinkNode);
		setNamespacedAttribute(request, "paddingDaysEnd", _paddingDaysEnd);
		setNamespacedAttribute(request, "paddingDaysStart", _paddingDaysStart);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "selectMultipleDates", _selectMultipleDates);
		setNamespacedAttribute(request, "selectedDates", _selectedDates);
		setNamespacedAttribute(request, "selectionMode", _selectionMode);
		setNamespacedAttribute(request, "setValue", _setValue);
		setNamespacedAttribute(request, "showNextMonth", _showNextMonth);
		setNamespacedAttribute(request, "showOtherMonth", _showOtherMonth);
		setNamespacedAttribute(request, "showPrevMonth", _showPrevMonth);
		setNamespacedAttribute(request, "showToday", _showToday);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "todayLinkNode", _todayLinkNode);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "weekDays", _weekDays);
		setNamespacedAttribute(request, "weekDaysNode", _weekDaysNode);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "afterAllowNoneChange", _afterAllowNoneChange);
		setNamespacedAttribute(request, "afterBlankDaysChange", _afterBlankDaysChange);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCurrentDayChange", _afterCurrentDayChange);
		setNamespacedAttribute(request, "afterCurrentMonthChange", _afterCurrentMonthChange);
		setNamespacedAttribute(request, "afterCurrentYearChange", _afterCurrentYearChange);
		setNamespacedAttribute(request, "afterCustomRendererChange", _afterCustomRendererChange);
		setNamespacedAttribute(request, "afterDateChange", _afterDateChange);
		setNamespacedAttribute(request, "afterDateFormatChange", _afterDateFormatChange);
		setNamespacedAttribute(request, "afterDatesChange", _afterDatesChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterDisabledDatesRuleChange", _afterDisabledDatesRuleChange);
		setNamespacedAttribute(request, "afterEnabledDatesRuleChange", _afterEnabledDatesRuleChange);
		setNamespacedAttribute(request, "afterFirstDayOfWeekChange", _afterFirstDayOfWeekChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterHeaderContentNodeChange", _afterHeaderContentNodeChange);
		setNamespacedAttribute(request, "afterHeaderRendererChange", _afterHeaderRendererChange);
		setNamespacedAttribute(request, "afterHeaderTitleNodeChange", _afterHeaderTitleNodeChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterIconNextNodeChange", _afterIconNextNodeChange);
		setNamespacedAttribute(request, "afterIconPrevNodeChange", _afterIconPrevNodeChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterMaxDateChange", _afterMaxDateChange);
		setNamespacedAttribute(request, "afterMaximumDateChange", _afterMaximumDateChange);
		setNamespacedAttribute(request, "afterMinDateChange", _afterMinDateChange);
		setNamespacedAttribute(request, "afterMinimumDateChange", _afterMinimumDateChange);
		setNamespacedAttribute(request, "afterMonthDaysChange", _afterMonthDaysChange);
		setNamespacedAttribute(request, "afterMonthDaysNodeChange", _afterMonthDaysNodeChange);
		setNamespacedAttribute(request, "afterNoneLinkNodeChange", _afterNoneLinkNodeChange);
		setNamespacedAttribute(request, "afterPaddingDaysEndChange", _afterPaddingDaysEndChange);
		setNamespacedAttribute(request, "afterPaddingDaysStartChange", _afterPaddingDaysStartChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterSelectMultipleDatesChange", _afterSelectMultipleDatesChange);
		setNamespacedAttribute(request, "afterSelectedDatesChange", _afterSelectedDatesChange);
		setNamespacedAttribute(request, "afterSelectionModeChange", _afterSelectionModeChange);
		setNamespacedAttribute(request, "afterSetValueChange", _afterSetValueChange);
		setNamespacedAttribute(request, "afterShowNextMonthChange", _afterShowNextMonthChange);
		setNamespacedAttribute(request, "afterShowOtherMonthChange", _afterShowOtherMonthChange);
		setNamespacedAttribute(request, "afterShowPrevMonthChange", _afterShowPrevMonthChange);
		setNamespacedAttribute(request, "afterShowTodayChange", _afterShowTodayChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterTodayLinkNodeChange", _afterTodayLinkNodeChange);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterWeekDaysChange", _afterWeekDaysChange);
		setNamespacedAttribute(request, "afterWeekDaysNodeChange", _afterWeekDaysNodeChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "onAllowNoneChange", _onAllowNoneChange);
		setNamespacedAttribute(request, "onBlankDaysChange", _onBlankDaysChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCurrentDayChange", _onCurrentDayChange);
		setNamespacedAttribute(request, "onCurrentMonthChange", _onCurrentMonthChange);
		setNamespacedAttribute(request, "onCurrentYearChange", _onCurrentYearChange);
		setNamespacedAttribute(request, "onCustomRendererChange", _onCustomRendererChange);
		setNamespacedAttribute(request, "onDateChange", _onDateChange);
		setNamespacedAttribute(request, "onDateFormatChange", _onDateFormatChange);
		setNamespacedAttribute(request, "onDatesChange", _onDatesChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onDisabledDatesRuleChange", _onDisabledDatesRuleChange);
		setNamespacedAttribute(request, "onEnabledDatesRuleChange", _onEnabledDatesRuleChange);
		setNamespacedAttribute(request, "onFirstDayOfWeekChange", _onFirstDayOfWeekChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onHeaderContentNodeChange", _onHeaderContentNodeChange);
		setNamespacedAttribute(request, "onHeaderRendererChange", _onHeaderRendererChange);
		setNamespacedAttribute(request, "onHeaderTitleNodeChange", _onHeaderTitleNodeChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onIconNextNodeChange", _onIconNextNodeChange);
		setNamespacedAttribute(request, "onIconPrevNodeChange", _onIconPrevNodeChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onMaxDateChange", _onMaxDateChange);
		setNamespacedAttribute(request, "onMaximumDateChange", _onMaximumDateChange);
		setNamespacedAttribute(request, "onMinDateChange", _onMinDateChange);
		setNamespacedAttribute(request, "onMinimumDateChange", _onMinimumDateChange);
		setNamespacedAttribute(request, "onMonthDaysChange", _onMonthDaysChange);
		setNamespacedAttribute(request, "onMonthDaysNodeChange", _onMonthDaysNodeChange);
		setNamespacedAttribute(request, "onNoneLinkNodeChange", _onNoneLinkNodeChange);
		setNamespacedAttribute(request, "onPaddingDaysEndChange", _onPaddingDaysEndChange);
		setNamespacedAttribute(request, "onPaddingDaysStartChange", _onPaddingDaysStartChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onSelectMultipleDatesChange", _onSelectMultipleDatesChange);
		setNamespacedAttribute(request, "onSelectedDatesChange", _onSelectedDatesChange);
		setNamespacedAttribute(request, "onSelectionModeChange", _onSelectionModeChange);
		setNamespacedAttribute(request, "onSetValueChange", _onSetValueChange);
		setNamespacedAttribute(request, "onShowNextMonthChange", _onShowNextMonthChange);
		setNamespacedAttribute(request, "onShowOtherMonthChange", _onShowOtherMonthChange);
		setNamespacedAttribute(request, "onShowPrevMonthChange", _onShowPrevMonthChange);
		setNamespacedAttribute(request, "onShowTodayChange", _onShowTodayChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onTodayLinkNodeChange", _onTodayLinkNodeChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onWeekDaysChange", _onWeekDaysChange);
		setNamespacedAttribute(request, "onWeekDaysNodeChange", _onWeekDaysNodeChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:calendar:";

	private static final String _PAGE =
		"/html/taglib/alloy/calendar/page.jsp";

	private boolean _allowNone = true;
	private java.lang.String _blankDays = null;
	private java.lang.String _boundingBox = null;
	private java.lang.String _contentBox = null;
	private java.lang.Object _currentDay = 0;
	private java.lang.Object _currentMonth = 0;
	private java.lang.Object _currentYear = 0;
	private java.lang.Object _customRenderer = null;
	private java.lang.Object _date = null;
	private java.lang.String _dateFormat = "%m/%d/%Y";
	private java.lang.Object _dates = null;
	private boolean _destroyed = false;
	private boolean _disabled = false;
	private java.lang.String _disabledDatesRule = null;
	private java.lang.String _enabledDatesRule = null;
	private java.lang.Object _firstDayOfWeek = 0;
	private boolean _focused = false;
	private java.lang.String _headerContentNode = null;
	private java.lang.Object _headerRenderer = null;
	private java.lang.String _headerTitleNode = null;
	private java.lang.Object _height = null;
	private java.lang.String _iconNextNode = null;
	private java.lang.String _iconPrevNode = null;
	private java.lang.String _calendarId = null;
	private boolean _initialized = false;
	private java.lang.Object _maxDate = null;
	private java.lang.Object _maximumDate = null;
	private java.lang.Object _minDate = null;
	private java.lang.Object _minimumDate = null;
	private java.lang.String _monthDays = null;
	private java.lang.String _monthDaysNode = null;
	private java.lang.Object _noneLinkNode = null;
	private java.lang.Object _paddingDaysEnd = null;
	private java.lang.Object _paddingDaysStart = null;
	private java.lang.Object _render = null;
	private boolean _rendered = false;
	private boolean _selectMultipleDates = false;
	private java.lang.Object _selectedDates = null;
	private java.lang.String _selectionMode = "single";
	private boolean _setValue = true;
	private boolean _showNextMonth = false;
	private boolean _showOtherMonth = true;
	private boolean _showPrevMonth = false;
	private boolean _showToday = true;
	private java.lang.String _srcNode = null;
	private java.lang.Object _strings = null;
	private java.lang.Object _tabIndex = 0;
	private java.lang.Object _todayLinkNode = null;
	private boolean _visible = true;
	private java.lang.String _weekDays = null;
	private java.lang.String _weekDaysNode = null;
	private java.lang.Object _width = null;
	private java.lang.Object _afterAllowNoneChange = null;
	private java.lang.Object _afterBlankDaysChange = null;
	private java.lang.Object _afterBoundingBoxChange = null;
	private java.lang.Object _afterContentBoxChange = null;
	private java.lang.Object _afterCurrentDayChange = null;
	private java.lang.Object _afterCurrentMonthChange = null;
	private java.lang.Object _afterCurrentYearChange = null;
	private java.lang.Object _afterCustomRendererChange = null;
	private java.lang.Object _afterDateChange = null;
	private java.lang.Object _afterDateFormatChange = null;
	private java.lang.Object _afterDatesChange = null;
	private java.lang.Object _afterDestroy = null;
	private java.lang.Object _afterDestroyedChange = null;
	private java.lang.Object _afterDisabledChange = null;
	private java.lang.Object _afterDisabledDatesRuleChange = null;
	private java.lang.Object _afterEnabledDatesRuleChange = null;
	private java.lang.Object _afterFirstDayOfWeekChange = null;
	private java.lang.Object _afterFocusedChange = null;
	private java.lang.Object _afterHeaderContentNodeChange = null;
	private java.lang.Object _afterHeaderRendererChange = null;
	private java.lang.Object _afterHeaderTitleNodeChange = null;
	private java.lang.Object _afterHeightChange = null;
	private java.lang.Object _afterIconNextNodeChange = null;
	private java.lang.Object _afterIconPrevNodeChange = null;
	private java.lang.Object _afterIdChange = null;
	private java.lang.Object _afterInit = null;
	private java.lang.Object _afterInitializedChange = null;
	private java.lang.Object _afterMaxDateChange = null;
	private java.lang.Object _afterMaximumDateChange = null;
	private java.lang.Object _afterMinDateChange = null;
	private java.lang.Object _afterMinimumDateChange = null;
	private java.lang.Object _afterMonthDaysChange = null;
	private java.lang.Object _afterMonthDaysNodeChange = null;
	private java.lang.Object _afterNoneLinkNodeChange = null;
	private java.lang.Object _afterPaddingDaysEndChange = null;
	private java.lang.Object _afterPaddingDaysStartChange = null;
	private java.lang.Object _afterRenderChange = null;
	private java.lang.Object _afterRenderedChange = null;
	private java.lang.Object _afterSelectMultipleDatesChange = null;
	private java.lang.Object _afterSelectedDatesChange = null;
	private java.lang.Object _afterSelectionModeChange = null;
	private java.lang.Object _afterSetValueChange = null;
	private java.lang.Object _afterShowNextMonthChange = null;
	private java.lang.Object _afterShowOtherMonthChange = null;
	private java.lang.Object _afterShowPrevMonthChange = null;
	private java.lang.Object _afterShowTodayChange = null;
	private java.lang.Object _afterSrcNodeChange = null;
	private java.lang.Object _afterStringsChange = null;
	private java.lang.Object _afterTabIndexChange = null;
	private java.lang.Object _afterTodayLinkNodeChange = null;
	private java.lang.Object _afterVisibleChange = null;
	private java.lang.Object _afterWeekDaysChange = null;
	private java.lang.Object _afterWeekDaysNodeChange = null;
	private java.lang.Object _afterContentUpdate = null;
	private java.lang.Object _afterRender = null;
	private java.lang.Object _afterWidthChange = null;
	private java.lang.Object _onAllowNoneChange = null;
	private java.lang.Object _onBlankDaysChange = null;
	private java.lang.Object _onBoundingBoxChange = null;
	private java.lang.Object _onContentBoxChange = null;
	private java.lang.Object _onCurrentDayChange = null;
	private java.lang.Object _onCurrentMonthChange = null;
	private java.lang.Object _onCurrentYearChange = null;
	private java.lang.Object _onCustomRendererChange = null;
	private java.lang.Object _onDateChange = null;
	private java.lang.Object _onDateFormatChange = null;
	private java.lang.Object _onDatesChange = null;
	private java.lang.Object _onDestroy = null;
	private java.lang.Object _onDestroyedChange = null;
	private java.lang.Object _onDisabledChange = null;
	private java.lang.Object _onDisabledDatesRuleChange = null;
	private java.lang.Object _onEnabledDatesRuleChange = null;
	private java.lang.Object _onFirstDayOfWeekChange = null;
	private java.lang.Object _onFocusedChange = null;
	private java.lang.Object _onHeaderContentNodeChange = null;
	private java.lang.Object _onHeaderRendererChange = null;
	private java.lang.Object _onHeaderTitleNodeChange = null;
	private java.lang.Object _onHeightChange = null;
	private java.lang.Object _onIconNextNodeChange = null;
	private java.lang.Object _onIconPrevNodeChange = null;
	private java.lang.Object _onIdChange = null;
	private java.lang.Object _onInit = null;
	private java.lang.Object _onInitializedChange = null;
	private java.lang.Object _onMaxDateChange = null;
	private java.lang.Object _onMaximumDateChange = null;
	private java.lang.Object _onMinDateChange = null;
	private java.lang.Object _onMinimumDateChange = null;
	private java.lang.Object _onMonthDaysChange = null;
	private java.lang.Object _onMonthDaysNodeChange = null;
	private java.lang.Object _onNoneLinkNodeChange = null;
	private java.lang.Object _onPaddingDaysEndChange = null;
	private java.lang.Object _onPaddingDaysStartChange = null;
	private java.lang.Object _onRenderChange = null;
	private java.lang.Object _onRenderedChange = null;
	private java.lang.Object _onSelectMultipleDatesChange = null;
	private java.lang.Object _onSelectedDatesChange = null;
	private java.lang.Object _onSelectionModeChange = null;
	private java.lang.Object _onSetValueChange = null;
	private java.lang.Object _onShowNextMonthChange = null;
	private java.lang.Object _onShowOtherMonthChange = null;
	private java.lang.Object _onShowPrevMonthChange = null;
	private java.lang.Object _onShowTodayChange = null;
	private java.lang.Object _onSrcNodeChange = null;
	private java.lang.Object _onStringsChange = null;
	private java.lang.Object _onTabIndexChange = null;
	private java.lang.Object _onTodayLinkNodeChange = null;
	private java.lang.Object _onVisibleChange = null;
	private java.lang.Object _onWeekDaysChange = null;
	private java.lang.Object _onWeekDaysNodeChange = null;
	private java.lang.Object _onContentUpdate = null;
	private java.lang.Object _onRender = null;
	private java.lang.Object _onWidthChange = null;

}