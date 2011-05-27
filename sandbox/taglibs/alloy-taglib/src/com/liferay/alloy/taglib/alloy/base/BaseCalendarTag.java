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

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public java.lang.Object getAlign() {
		return _align;
	}

	public boolean getAllowNone() {
		return _allowNone;
	}

	public java.lang.String getBlankDays() {
		return _blankDays;
	}

	public java.lang.Object getCalendarBodyContent() {
		return _calendarBodyContent;
	}

	public java.lang.String getBoundingBox() {
		return _boundingBox;
	}

	public boolean getCancellableHide() {
		return _cancellableHide;
	}

	public java.lang.Object getCentered() {
		return _centered;
	}

	public java.lang.Object getConstrain() {
		return _constrain;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.String getCssClass() {
		return _cssClass;
	}

	public java.lang.Object getCurrentDay() {
		return _currentDay;
	}

	public java.lang.Object getCurrentMonth() {
		return _currentMonth;
	}

	public java.lang.Object getCurrentNode() {
		return _currentNode;
	}

	public java.lang.Object getCurrentYear() {
		return _currentYear;
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

	public java.lang.Object getFillHeight() {
		return _fillHeight;
	}

	public java.lang.Object getFirstDayOfWeek() {
		return _firstDayOfWeek;
	}

	public boolean getFocused() {
		return _focused;
	}

	public java.lang.Object getFooterContent() {
		return _footerContent;
	}

	public java.lang.Object getHeaderContent() {
		return _headerContent;
	}

	public java.lang.String getHeaderContentNode() {
		return _headerContentNode;
	}

	public java.lang.String getHeaderTitleNode() {
		return _headerTitleNode;
	}

	public java.lang.Object getHeight() {
		return _height;
	}

	public java.lang.String getHideClass() {
		return _hideClass;
	}

	public java.lang.Object getHideDelay() {
		return _hideDelay;
	}

	public java.lang.String getHideOn() {
		return _hideOn;
	}

	public boolean getHideOnDocumentClick() {
		return _hideOnDocumentClick;
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

	public java.lang.String getLocale() {
		return _locale;
	}

	public java.lang.Object getMaxDate() {
		return _maxDate;
	}

	public java.lang.Object getMinDate() {
		return _minDate;
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

	public boolean getPreventOverlap() {
		return _preventOverlap;
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

	public boolean getSetValue() {
		return _setValue;
	}

	public boolean getShim() {
		return _shim;
	}

	public java.lang.Object getShowDelay() {
		return _showDelay;
	}

	public java.lang.String getShowOn() {
		return _showOn;
	}

	public boolean getShowOtherMonth() {
		return _showOtherMonth;
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

	public java.lang.Object getTrigger() {
		return _trigger;
	}

	public boolean getUseARIA() {
		return _useARIA;
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

	public java.lang.Object getX() {
		return _x;
	}

	public java.lang.Object getXy() {
		return _xy;
	}

	public java.lang.Object getY() {
		return _y;
	}

	public java.lang.Object getZIndex() {
		return _zIndex;
	}

	public java.lang.Object getAfterAlignChange() {
		return _afterAlignChange;
	}

	public java.lang.Object getAfterAllowNoneChange() {
		return _afterAllowNoneChange;
	}

	public java.lang.Object getAfterBlankDaysChange() {
		return _afterBlankDaysChange;
	}

	public java.lang.Object getAfterBodyContentChange() {
		return _afterBodyContentChange;
	}

	public java.lang.Object getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.Object getAfterCancellableHideChange() {
		return _afterCancellableHideChange;
	}

	public java.lang.Object getAfterCenteredChange() {
		return _afterCenteredChange;
	}

	public java.lang.Object getAfterConstrainChange() {
		return _afterConstrainChange;
	}

	public java.lang.Object getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.Object getAfterCssClassChange() {
		return _afterCssClassChange;
	}

	public java.lang.Object getAfterCurrentDayChange() {
		return _afterCurrentDayChange;
	}

	public java.lang.Object getAfterCurrentMonthChange() {
		return _afterCurrentMonthChange;
	}

	public java.lang.Object getAfterCurrentNodeChange() {
		return _afterCurrentNodeChange;
	}

	public java.lang.Object getAfterCurrentYearChange() {
		return _afterCurrentYearChange;
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

	public java.lang.Object getAfterFillHeightChange() {
		return _afterFillHeightChange;
	}

	public java.lang.Object getAfterFirstDayOfWeekChange() {
		return _afterFirstDayOfWeekChange;
	}

	public java.lang.Object getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.Object getAfterFooterContentChange() {
		return _afterFooterContentChange;
	}

	public java.lang.Object getAfterHeaderContentChange() {
		return _afterHeaderContentChange;
	}

	public java.lang.Object getAfterHeaderContentNodeChange() {
		return _afterHeaderContentNodeChange;
	}

	public java.lang.Object getAfterHeaderTitleNodeChange() {
		return _afterHeaderTitleNodeChange;
	}

	public java.lang.Object getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.Object getAfterHideClassChange() {
		return _afterHideClassChange;
	}

	public java.lang.Object getAfterHideDelayChange() {
		return _afterHideDelayChange;
	}

	public java.lang.Object getAfterHideOnChange() {
		return _afterHideOnChange;
	}

	public java.lang.Object getAfterHideOnDocumentClickChange() {
		return _afterHideOnDocumentClickChange;
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

	public java.lang.Object getAfterLocaleChange() {
		return _afterLocaleChange;
	}

	public java.lang.Object getAfterMaxDateChange() {
		return _afterMaxDateChange;
	}

	public java.lang.Object getAfterMinDateChange() {
		return _afterMinDateChange;
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

	public java.lang.Object getAfterPreventOverlapChange() {
		return _afterPreventOverlapChange;
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

	public java.lang.Object getAfterSetValueChange() {
		return _afterSetValueChange;
	}

	public java.lang.Object getAfterShimChange() {
		return _afterShimChange;
	}

	public java.lang.Object getAfterShowDelayChange() {
		return _afterShowDelayChange;
	}

	public java.lang.Object getAfterShowOnChange() {
		return _afterShowOnChange;
	}

	public java.lang.Object getAfterShowOtherMonthChange() {
		return _afterShowOtherMonthChange;
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

	public java.lang.Object getAfterTriggerChange() {
		return _afterTriggerChange;
	}

	public java.lang.Object getAfterUseARIAChange() {
		return _afterUseARIAChange;
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

	public java.lang.Object getAfterXChange() {
		return _afterXChange;
	}

	public java.lang.Object getAfterXyChange() {
		return _afterXyChange;
	}

	public java.lang.Object getAfterYChange() {
		return _afterYChange;
	}

	public java.lang.Object getAfterZIndexChange() {
		return _afterZIndexChange;
	}

	public java.lang.Object getOnAlignChange() {
		return _onAlignChange;
	}

	public java.lang.Object getOnAllowNoneChange() {
		return _onAllowNoneChange;
	}

	public java.lang.Object getOnBlankDaysChange() {
		return _onBlankDaysChange;
	}

	public java.lang.Object getOnBodyContentChange() {
		return _onBodyContentChange;
	}

	public java.lang.Object getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.Object getOnCancellableHideChange() {
		return _onCancellableHideChange;
	}

	public java.lang.Object getOnCenteredChange() {
		return _onCenteredChange;
	}

	public java.lang.Object getOnConstrainChange() {
		return _onConstrainChange;
	}

	public java.lang.Object getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.Object getOnCssClassChange() {
		return _onCssClassChange;
	}

	public java.lang.Object getOnCurrentDayChange() {
		return _onCurrentDayChange;
	}

	public java.lang.Object getOnCurrentMonthChange() {
		return _onCurrentMonthChange;
	}

	public java.lang.Object getOnCurrentNodeChange() {
		return _onCurrentNodeChange;
	}

	public java.lang.Object getOnCurrentYearChange() {
		return _onCurrentYearChange;
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

	public java.lang.Object getOnFillHeightChange() {
		return _onFillHeightChange;
	}

	public java.lang.Object getOnFirstDayOfWeekChange() {
		return _onFirstDayOfWeekChange;
	}

	public java.lang.Object getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.Object getOnFooterContentChange() {
		return _onFooterContentChange;
	}

	public java.lang.Object getOnHeaderContentChange() {
		return _onHeaderContentChange;
	}

	public java.lang.Object getOnHeaderContentNodeChange() {
		return _onHeaderContentNodeChange;
	}

	public java.lang.Object getOnHeaderTitleNodeChange() {
		return _onHeaderTitleNodeChange;
	}

	public java.lang.Object getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.Object getOnHideClassChange() {
		return _onHideClassChange;
	}

	public java.lang.Object getOnHideDelayChange() {
		return _onHideDelayChange;
	}

	public java.lang.Object getOnHideOnChange() {
		return _onHideOnChange;
	}

	public java.lang.Object getOnHideOnDocumentClickChange() {
		return _onHideOnDocumentClickChange;
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

	public java.lang.Object getOnLocaleChange() {
		return _onLocaleChange;
	}

	public java.lang.Object getOnMaxDateChange() {
		return _onMaxDateChange;
	}

	public java.lang.Object getOnMinDateChange() {
		return _onMinDateChange;
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

	public java.lang.Object getOnPreventOverlapChange() {
		return _onPreventOverlapChange;
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

	public java.lang.Object getOnSetValueChange() {
		return _onSetValueChange;
	}

	public java.lang.Object getOnShimChange() {
		return _onShimChange;
	}

	public java.lang.Object getOnShowDelayChange() {
		return _onShowDelayChange;
	}

	public java.lang.Object getOnShowOnChange() {
		return _onShowOnChange;
	}

	public java.lang.Object getOnShowOtherMonthChange() {
		return _onShowOtherMonthChange;
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

	public java.lang.Object getOnTriggerChange() {
		return _onTriggerChange;
	}

	public java.lang.Object getOnUseARIAChange() {
		return _onUseARIAChange;
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

	public java.lang.Object getOnXChange() {
		return _onXChange;
	}

	public java.lang.Object getOnXyChange() {
		return _onXyChange;
	}

	public java.lang.Object getOnYChange() {
		return _onYChange;
	}

	public java.lang.Object getOnZIndexChange() {
		return _onZIndexChange;
	}

	public void setAlign(java.lang.Object align) {
		_align = align;

		setScopedAttribute("align", align);
	}

	public void setAllowNone(boolean allowNone) {
		_allowNone = allowNone;

		setScopedAttribute("allowNone", allowNone);
	}

	public void setBlankDays(java.lang.String blankDays) {
		_blankDays = blankDays;

		setScopedAttribute("blankDays", blankDays);
	}

	public void setCalendarBodyContent(java.lang.Object calendarBodyContent) {
		_calendarBodyContent = calendarBodyContent;

		setScopedAttribute("calendarBodyContent", calendarBodyContent);
	}

	public void setBoundingBox(java.lang.String boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setCancellableHide(boolean cancellableHide) {
		_cancellableHide = cancellableHide;

		setScopedAttribute("cancellableHide", cancellableHide);
	}

	public void setCentered(java.lang.Object centered) {
		_centered = centered;

		setScopedAttribute("centered", centered);
	}

	public void setConstrain(java.lang.Object constrain) {
		_constrain = constrain;

		setScopedAttribute("constrain", constrain);
	}

	public void setContentBox(java.lang.String contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setCssClass(java.lang.String cssClass) {
		_cssClass = cssClass;

		setScopedAttribute("cssClass", cssClass);
	}

	public void setCurrentDay(java.lang.Object currentDay) {
		_currentDay = currentDay;

		setScopedAttribute("currentDay", currentDay);
	}

	public void setCurrentMonth(java.lang.Object currentMonth) {
		_currentMonth = currentMonth;

		setScopedAttribute("currentMonth", currentMonth);
	}

	public void setCurrentNode(java.lang.Object currentNode) {
		_currentNode = currentNode;

		setScopedAttribute("currentNode", currentNode);
	}

	public void setCurrentYear(java.lang.Object currentYear) {
		_currentYear = currentYear;

		setScopedAttribute("currentYear", currentYear);
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

	public void setFillHeight(java.lang.Object fillHeight) {
		_fillHeight = fillHeight;

		setScopedAttribute("fillHeight", fillHeight);
	}

	public void setFirstDayOfWeek(java.lang.Object firstDayOfWeek) {
		_firstDayOfWeek = firstDayOfWeek;

		setScopedAttribute("firstDayOfWeek", firstDayOfWeek);
	}

	public void setFocused(boolean focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setFooterContent(java.lang.Object footerContent) {
		_footerContent = footerContent;

		setScopedAttribute("footerContent", footerContent);
	}

	public void setHeaderContent(java.lang.Object headerContent) {
		_headerContent = headerContent;

		setScopedAttribute("headerContent", headerContent);
	}

	public void setHeaderContentNode(java.lang.String headerContentNode) {
		_headerContentNode = headerContentNode;

		setScopedAttribute("headerContentNode", headerContentNode);
	}

	public void setHeaderTitleNode(java.lang.String headerTitleNode) {
		_headerTitleNode = headerTitleNode;

		setScopedAttribute("headerTitleNode", headerTitleNode);
	}

	public void setHeight(java.lang.Object height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setHideClass(java.lang.String hideClass) {
		_hideClass = hideClass;

		setScopedAttribute("hideClass", hideClass);
	}

	public void setHideDelay(java.lang.Object hideDelay) {
		_hideDelay = hideDelay;

		setScopedAttribute("hideDelay", hideDelay);
	}

	public void setHideOn(java.lang.String hideOn) {
		_hideOn = hideOn;

		setScopedAttribute("hideOn", hideOn);
	}

	public void setHideOnDocumentClick(boolean hideOnDocumentClick) {
		_hideOnDocumentClick = hideOnDocumentClick;

		setScopedAttribute("hideOnDocumentClick", hideOnDocumentClick);
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

	public void setLocale(java.lang.String locale) {
		_locale = locale;

		setScopedAttribute("locale", locale);
	}

	public void setMaxDate(java.lang.Object maxDate) {
		_maxDate = maxDate;

		setScopedAttribute("maxDate", maxDate);
	}

	public void setMinDate(java.lang.Object minDate) {
		_minDate = minDate;

		setScopedAttribute("minDate", minDate);
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

	public void setPreventOverlap(boolean preventOverlap) {
		_preventOverlap = preventOverlap;

		setScopedAttribute("preventOverlap", preventOverlap);
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

	public void setSetValue(boolean setValue) {
		_setValue = setValue;

		setScopedAttribute("setValue", setValue);
	}

	public void setShim(boolean shim) {
		_shim = shim;

		setScopedAttribute("shim", shim);
	}

	public void setShowDelay(java.lang.Object showDelay) {
		_showDelay = showDelay;

		setScopedAttribute("showDelay", showDelay);
	}

	public void setShowOn(java.lang.String showOn) {
		_showOn = showOn;

		setScopedAttribute("showOn", showOn);
	}

	public void setShowOtherMonth(boolean showOtherMonth) {
		_showOtherMonth = showOtherMonth;

		setScopedAttribute("showOtherMonth", showOtherMonth);
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

	public void setTrigger(java.lang.Object trigger) {
		_trigger = trigger;

		setScopedAttribute("trigger", trigger);
	}

	public void setUseARIA(boolean useARIA) {
		_useARIA = useARIA;

		setScopedAttribute("useARIA", useARIA);
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

	public void setX(java.lang.Object x) {
		_x = x;

		setScopedAttribute("x", x);
	}

	public void setXy(java.lang.Object xy) {
		_xy = xy;

		setScopedAttribute("xy", xy);
	}

	public void setY(java.lang.Object y) {
		_y = y;

		setScopedAttribute("y", y);
	}

	public void setZIndex(java.lang.Object zIndex) {
		_zIndex = zIndex;

		setScopedAttribute("zIndex", zIndex);
	}

	public void setAfterAlignChange(java.lang.Object afterAlignChange) {
		_afterAlignChange = afterAlignChange;

		setScopedAttribute("afterAlignChange", afterAlignChange);
	}

	public void setAfterAllowNoneChange(java.lang.Object afterAllowNoneChange) {
		_afterAllowNoneChange = afterAllowNoneChange;

		setScopedAttribute("afterAllowNoneChange", afterAllowNoneChange);
	}

	public void setAfterBlankDaysChange(java.lang.Object afterBlankDaysChange) {
		_afterBlankDaysChange = afterBlankDaysChange;

		setScopedAttribute("afterBlankDaysChange", afterBlankDaysChange);
	}

	public void setAfterBodyContentChange(java.lang.Object afterBodyContentChange) {
		_afterBodyContentChange = afterBodyContentChange;

		setScopedAttribute("afterBodyContentChange", afterBodyContentChange);
	}

	public void setAfterBoundingBoxChange(java.lang.Object afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterCancellableHideChange(java.lang.Object afterCancellableHideChange) {
		_afterCancellableHideChange = afterCancellableHideChange;

		setScopedAttribute("afterCancellableHideChange", afterCancellableHideChange);
	}

	public void setAfterCenteredChange(java.lang.Object afterCenteredChange) {
		_afterCenteredChange = afterCenteredChange;

		setScopedAttribute("afterCenteredChange", afterCenteredChange);
	}

	public void setAfterConstrainChange(java.lang.Object afterConstrainChange) {
		_afterConstrainChange = afterConstrainChange;

		setScopedAttribute("afterConstrainChange", afterConstrainChange);
	}

	public void setAfterContentBoxChange(java.lang.Object afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.Object afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
	}

	public void setAfterCurrentDayChange(java.lang.Object afterCurrentDayChange) {
		_afterCurrentDayChange = afterCurrentDayChange;

		setScopedAttribute("afterCurrentDayChange", afterCurrentDayChange);
	}

	public void setAfterCurrentMonthChange(java.lang.Object afterCurrentMonthChange) {
		_afterCurrentMonthChange = afterCurrentMonthChange;

		setScopedAttribute("afterCurrentMonthChange", afterCurrentMonthChange);
	}

	public void setAfterCurrentNodeChange(java.lang.Object afterCurrentNodeChange) {
		_afterCurrentNodeChange = afterCurrentNodeChange;

		setScopedAttribute("afterCurrentNodeChange", afterCurrentNodeChange);
	}

	public void setAfterCurrentYearChange(java.lang.Object afterCurrentYearChange) {
		_afterCurrentYearChange = afterCurrentYearChange;

		setScopedAttribute("afterCurrentYearChange", afterCurrentYearChange);
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

	public void setAfterFillHeightChange(java.lang.Object afterFillHeightChange) {
		_afterFillHeightChange = afterFillHeightChange;

		setScopedAttribute("afterFillHeightChange", afterFillHeightChange);
	}

	public void setAfterFirstDayOfWeekChange(java.lang.Object afterFirstDayOfWeekChange) {
		_afterFirstDayOfWeekChange = afterFirstDayOfWeekChange;

		setScopedAttribute("afterFirstDayOfWeekChange", afterFirstDayOfWeekChange);
	}

	public void setAfterFocusedChange(java.lang.Object afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterFooterContentChange(java.lang.Object afterFooterContentChange) {
		_afterFooterContentChange = afterFooterContentChange;

		setScopedAttribute("afterFooterContentChange", afterFooterContentChange);
	}

	public void setAfterHeaderContentChange(java.lang.Object afterHeaderContentChange) {
		_afterHeaderContentChange = afterHeaderContentChange;

		setScopedAttribute("afterHeaderContentChange", afterHeaderContentChange);
	}

	public void setAfterHeaderContentNodeChange(java.lang.Object afterHeaderContentNodeChange) {
		_afterHeaderContentNodeChange = afterHeaderContentNodeChange;

		setScopedAttribute("afterHeaderContentNodeChange", afterHeaderContentNodeChange);
	}

	public void setAfterHeaderTitleNodeChange(java.lang.Object afterHeaderTitleNodeChange) {
		_afterHeaderTitleNodeChange = afterHeaderTitleNodeChange;

		setScopedAttribute("afterHeaderTitleNodeChange", afterHeaderTitleNodeChange);
	}

	public void setAfterHeightChange(java.lang.Object afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterHideClassChange(java.lang.Object afterHideClassChange) {
		_afterHideClassChange = afterHideClassChange;

		setScopedAttribute("afterHideClassChange", afterHideClassChange);
	}

	public void setAfterHideDelayChange(java.lang.Object afterHideDelayChange) {
		_afterHideDelayChange = afterHideDelayChange;

		setScopedAttribute("afterHideDelayChange", afterHideDelayChange);
	}

	public void setAfterHideOnChange(java.lang.Object afterHideOnChange) {
		_afterHideOnChange = afterHideOnChange;

		setScopedAttribute("afterHideOnChange", afterHideOnChange);
	}

	public void setAfterHideOnDocumentClickChange(java.lang.Object afterHideOnDocumentClickChange) {
		_afterHideOnDocumentClickChange = afterHideOnDocumentClickChange;

		setScopedAttribute("afterHideOnDocumentClickChange", afterHideOnDocumentClickChange);
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

	public void setAfterLocaleChange(java.lang.Object afterLocaleChange) {
		_afterLocaleChange = afterLocaleChange;

		setScopedAttribute("afterLocaleChange", afterLocaleChange);
	}

	public void setAfterMaxDateChange(java.lang.Object afterMaxDateChange) {
		_afterMaxDateChange = afterMaxDateChange;

		setScopedAttribute("afterMaxDateChange", afterMaxDateChange);
	}

	public void setAfterMinDateChange(java.lang.Object afterMinDateChange) {
		_afterMinDateChange = afterMinDateChange;

		setScopedAttribute("afterMinDateChange", afterMinDateChange);
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

	public void setAfterPreventOverlapChange(java.lang.Object afterPreventOverlapChange) {
		_afterPreventOverlapChange = afterPreventOverlapChange;

		setScopedAttribute("afterPreventOverlapChange", afterPreventOverlapChange);
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

	public void setAfterSetValueChange(java.lang.Object afterSetValueChange) {
		_afterSetValueChange = afterSetValueChange;

		setScopedAttribute("afterSetValueChange", afterSetValueChange);
	}

	public void setAfterShimChange(java.lang.Object afterShimChange) {
		_afterShimChange = afterShimChange;

		setScopedAttribute("afterShimChange", afterShimChange);
	}

	public void setAfterShowDelayChange(java.lang.Object afterShowDelayChange) {
		_afterShowDelayChange = afterShowDelayChange;

		setScopedAttribute("afterShowDelayChange", afterShowDelayChange);
	}

	public void setAfterShowOnChange(java.lang.Object afterShowOnChange) {
		_afterShowOnChange = afterShowOnChange;

		setScopedAttribute("afterShowOnChange", afterShowOnChange);
	}

	public void setAfterShowOtherMonthChange(java.lang.Object afterShowOtherMonthChange) {
		_afterShowOtherMonthChange = afterShowOtherMonthChange;

		setScopedAttribute("afterShowOtherMonthChange", afterShowOtherMonthChange);
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

	public void setAfterTriggerChange(java.lang.Object afterTriggerChange) {
		_afterTriggerChange = afterTriggerChange;

		setScopedAttribute("afterTriggerChange", afterTriggerChange);
	}

	public void setAfterUseARIAChange(java.lang.Object afterUseARIAChange) {
		_afterUseARIAChange = afterUseARIAChange;

		setScopedAttribute("afterUseARIAChange", afterUseARIAChange);
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

	public void setAfterXChange(java.lang.Object afterXChange) {
		_afterXChange = afterXChange;

		setScopedAttribute("afterXChange", afterXChange);
	}

	public void setAfterXyChange(java.lang.Object afterXyChange) {
		_afterXyChange = afterXyChange;

		setScopedAttribute("afterXyChange", afterXyChange);
	}

	public void setAfterYChange(java.lang.Object afterYChange) {
		_afterYChange = afterYChange;

		setScopedAttribute("afterYChange", afterYChange);
	}

	public void setAfterZIndexChange(java.lang.Object afterZIndexChange) {
		_afterZIndexChange = afterZIndexChange;

		setScopedAttribute("afterZIndexChange", afterZIndexChange);
	}

	public void setOnAlignChange(java.lang.Object onAlignChange) {
		_onAlignChange = onAlignChange;

		setScopedAttribute("onAlignChange", onAlignChange);
	}

	public void setOnAllowNoneChange(java.lang.Object onAllowNoneChange) {
		_onAllowNoneChange = onAllowNoneChange;

		setScopedAttribute("onAllowNoneChange", onAllowNoneChange);
	}

	public void setOnBlankDaysChange(java.lang.Object onBlankDaysChange) {
		_onBlankDaysChange = onBlankDaysChange;

		setScopedAttribute("onBlankDaysChange", onBlankDaysChange);
	}

	public void setOnBodyContentChange(java.lang.Object onBodyContentChange) {
		_onBodyContentChange = onBodyContentChange;

		setScopedAttribute("onBodyContentChange", onBodyContentChange);
	}

	public void setOnBoundingBoxChange(java.lang.Object onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnCancellableHideChange(java.lang.Object onCancellableHideChange) {
		_onCancellableHideChange = onCancellableHideChange;

		setScopedAttribute("onCancellableHideChange", onCancellableHideChange);
	}

	public void setOnCenteredChange(java.lang.Object onCenteredChange) {
		_onCenteredChange = onCenteredChange;

		setScopedAttribute("onCenteredChange", onCenteredChange);
	}

	public void setOnConstrainChange(java.lang.Object onConstrainChange) {
		_onConstrainChange = onConstrainChange;

		setScopedAttribute("onConstrainChange", onConstrainChange);
	}

	public void setOnContentBoxChange(java.lang.Object onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.Object onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
	}

	public void setOnCurrentDayChange(java.lang.Object onCurrentDayChange) {
		_onCurrentDayChange = onCurrentDayChange;

		setScopedAttribute("onCurrentDayChange", onCurrentDayChange);
	}

	public void setOnCurrentMonthChange(java.lang.Object onCurrentMonthChange) {
		_onCurrentMonthChange = onCurrentMonthChange;

		setScopedAttribute("onCurrentMonthChange", onCurrentMonthChange);
	}

	public void setOnCurrentNodeChange(java.lang.Object onCurrentNodeChange) {
		_onCurrentNodeChange = onCurrentNodeChange;

		setScopedAttribute("onCurrentNodeChange", onCurrentNodeChange);
	}

	public void setOnCurrentYearChange(java.lang.Object onCurrentYearChange) {
		_onCurrentYearChange = onCurrentYearChange;

		setScopedAttribute("onCurrentYearChange", onCurrentYearChange);
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

	public void setOnFillHeightChange(java.lang.Object onFillHeightChange) {
		_onFillHeightChange = onFillHeightChange;

		setScopedAttribute("onFillHeightChange", onFillHeightChange);
	}

	public void setOnFirstDayOfWeekChange(java.lang.Object onFirstDayOfWeekChange) {
		_onFirstDayOfWeekChange = onFirstDayOfWeekChange;

		setScopedAttribute("onFirstDayOfWeekChange", onFirstDayOfWeekChange);
	}

	public void setOnFocusedChange(java.lang.Object onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnFooterContentChange(java.lang.Object onFooterContentChange) {
		_onFooterContentChange = onFooterContentChange;

		setScopedAttribute("onFooterContentChange", onFooterContentChange);
	}

	public void setOnHeaderContentChange(java.lang.Object onHeaderContentChange) {
		_onHeaderContentChange = onHeaderContentChange;

		setScopedAttribute("onHeaderContentChange", onHeaderContentChange);
	}

	public void setOnHeaderContentNodeChange(java.lang.Object onHeaderContentNodeChange) {
		_onHeaderContentNodeChange = onHeaderContentNodeChange;

		setScopedAttribute("onHeaderContentNodeChange", onHeaderContentNodeChange);
	}

	public void setOnHeaderTitleNodeChange(java.lang.Object onHeaderTitleNodeChange) {
		_onHeaderTitleNodeChange = onHeaderTitleNodeChange;

		setScopedAttribute("onHeaderTitleNodeChange", onHeaderTitleNodeChange);
	}

	public void setOnHeightChange(java.lang.Object onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnHideClassChange(java.lang.Object onHideClassChange) {
		_onHideClassChange = onHideClassChange;

		setScopedAttribute("onHideClassChange", onHideClassChange);
	}

	public void setOnHideDelayChange(java.lang.Object onHideDelayChange) {
		_onHideDelayChange = onHideDelayChange;

		setScopedAttribute("onHideDelayChange", onHideDelayChange);
	}

	public void setOnHideOnChange(java.lang.Object onHideOnChange) {
		_onHideOnChange = onHideOnChange;

		setScopedAttribute("onHideOnChange", onHideOnChange);
	}

	public void setOnHideOnDocumentClickChange(java.lang.Object onHideOnDocumentClickChange) {
		_onHideOnDocumentClickChange = onHideOnDocumentClickChange;

		setScopedAttribute("onHideOnDocumentClickChange", onHideOnDocumentClickChange);
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

	public void setOnLocaleChange(java.lang.Object onLocaleChange) {
		_onLocaleChange = onLocaleChange;

		setScopedAttribute("onLocaleChange", onLocaleChange);
	}

	public void setOnMaxDateChange(java.lang.Object onMaxDateChange) {
		_onMaxDateChange = onMaxDateChange;

		setScopedAttribute("onMaxDateChange", onMaxDateChange);
	}

	public void setOnMinDateChange(java.lang.Object onMinDateChange) {
		_onMinDateChange = onMinDateChange;

		setScopedAttribute("onMinDateChange", onMinDateChange);
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

	public void setOnPreventOverlapChange(java.lang.Object onPreventOverlapChange) {
		_onPreventOverlapChange = onPreventOverlapChange;

		setScopedAttribute("onPreventOverlapChange", onPreventOverlapChange);
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

	public void setOnSetValueChange(java.lang.Object onSetValueChange) {
		_onSetValueChange = onSetValueChange;

		setScopedAttribute("onSetValueChange", onSetValueChange);
	}

	public void setOnShimChange(java.lang.Object onShimChange) {
		_onShimChange = onShimChange;

		setScopedAttribute("onShimChange", onShimChange);
	}

	public void setOnShowDelayChange(java.lang.Object onShowDelayChange) {
		_onShowDelayChange = onShowDelayChange;

		setScopedAttribute("onShowDelayChange", onShowDelayChange);
	}

	public void setOnShowOnChange(java.lang.Object onShowOnChange) {
		_onShowOnChange = onShowOnChange;

		setScopedAttribute("onShowOnChange", onShowOnChange);
	}

	public void setOnShowOtherMonthChange(java.lang.Object onShowOtherMonthChange) {
		_onShowOtherMonthChange = onShowOtherMonthChange;

		setScopedAttribute("onShowOtherMonthChange", onShowOtherMonthChange);
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

	public void setOnTriggerChange(java.lang.Object onTriggerChange) {
		_onTriggerChange = onTriggerChange;

		setScopedAttribute("onTriggerChange", onTriggerChange);
	}

	public void setOnUseARIAChange(java.lang.Object onUseARIAChange) {
		_onUseARIAChange = onUseARIAChange;

		setScopedAttribute("onUseARIAChange", onUseARIAChange);
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

	public void setOnXChange(java.lang.Object onXChange) {
		_onXChange = onXChange;

		setScopedAttribute("onXChange", onXChange);
	}

	public void setOnXyChange(java.lang.Object onXyChange) {
		_onXyChange = onXyChange;

		setScopedAttribute("onXyChange", onXyChange);
	}

	public void setOnYChange(java.lang.Object onYChange) {
		_onYChange = onYChange;

		setScopedAttribute("onYChange", onYChange);
	}

	public void setOnZIndexChange(java.lang.Object onZIndexChange) {
		_onZIndexChange = onZIndexChange;

		setScopedAttribute("onZIndexChange", onZIndexChange);
	}

	protected void cleanUp() {
		_align = null;
		_allowNone = true;
		_blankDays = null;
		_calendarBodyContent = null;
		_boundingBox = null;
		_cancellableHide = true;
		_centered = null;
		_constrain = null;
		_contentBox = null;
		_cssClass = null;
		_currentDay = 0;
		_currentMonth = 0;
		_currentNode = null;
		_currentYear = 0;
		_dateFormat = "%m/%d/%Y";
		_dates = null;
		_destroyed = false;
		_disabled = false;
		_fillHeight = null;
		_firstDayOfWeek = 0;
		_focused = false;
		_footerContent = null;
		_headerContent = null;
		_headerContentNode = null;
		_headerTitleNode = null;
		_height = null;
		_hideClass = "aui-helper-hidden";
		_hideDelay = 0;
		_hideOn = "mouseout";
		_hideOnDocumentClick = true;
		_iconNextNode = null;
		_iconPrevNode = null;
		_calendarId = null;
		_initialized = false;
		_locale = "en";
		_maxDate = null;
		_minDate = null;
		_monthDays = null;
		_monthDaysNode = null;
		_noneLinkNode = null;
		_paddingDaysEnd = null;
		_paddingDaysStart = null;
		_preventOverlap = false;
		_render = null;
		_rendered = false;
		_selectMultipleDates = false;
		_setValue = true;
		_shim = false;
		_showDelay = 0;
		_showOn = "mouseover";
		_showOtherMonth = true;
		_showToday = true;
		_srcNode = null;
		_strings = null;
		_tabIndex = 0;
		_todayLinkNode = null;
		_trigger = null;
		_useARIA = true;
		_visible = false;
		_weekDays = null;
		_weekDaysNode = null;
		_width = null;
		_x = 0;
		_xy = null;
		_y = 0;
		_zIndex = 0;
		_afterAlignChange = null;
		_afterAllowNoneChange = null;
		_afterBlankDaysChange = null;
		_afterBodyContentChange = null;
		_afterBoundingBoxChange = null;
		_afterCancellableHideChange = null;
		_afterCenteredChange = null;
		_afterConstrainChange = null;
		_afterContentBoxChange = null;
		_afterCssClassChange = null;
		_afterCurrentDayChange = null;
		_afterCurrentMonthChange = null;
		_afterCurrentNodeChange = null;
		_afterCurrentYearChange = null;
		_afterDateFormatChange = null;
		_afterDatesChange = null;
		_afterDestroy = null;
		_afterDestroyedChange = null;
		_afterDisabledChange = null;
		_afterFillHeightChange = null;
		_afterFirstDayOfWeekChange = null;
		_afterFocusedChange = null;
		_afterFooterContentChange = null;
		_afterHeaderContentChange = null;
		_afterHeaderContentNodeChange = null;
		_afterHeaderTitleNodeChange = null;
		_afterHeightChange = null;
		_afterHideClassChange = null;
		_afterHideDelayChange = null;
		_afterHideOnChange = null;
		_afterHideOnDocumentClickChange = null;
		_afterIconNextNodeChange = null;
		_afterIconPrevNodeChange = null;
		_afterIdChange = null;
		_afterInit = null;
		_afterInitializedChange = null;
		_afterLocaleChange = null;
		_afterMaxDateChange = null;
		_afterMinDateChange = null;
		_afterMonthDaysChange = null;
		_afterMonthDaysNodeChange = null;
		_afterNoneLinkNodeChange = null;
		_afterPaddingDaysEndChange = null;
		_afterPaddingDaysStartChange = null;
		_afterPreventOverlapChange = null;
		_afterRenderChange = null;
		_afterRenderedChange = null;
		_afterSelectMultipleDatesChange = null;
		_afterSetValueChange = null;
		_afterShimChange = null;
		_afterShowDelayChange = null;
		_afterShowOnChange = null;
		_afterShowOtherMonthChange = null;
		_afterShowTodayChange = null;
		_afterSrcNodeChange = null;
		_afterStringsChange = null;
		_afterTabIndexChange = null;
		_afterTodayLinkNodeChange = null;
		_afterTriggerChange = null;
		_afterUseARIAChange = null;
		_afterVisibleChange = null;
		_afterWeekDaysChange = null;
		_afterWeekDaysNodeChange = null;
		_afterContentUpdate = null;
		_afterRender = null;
		_afterWidthChange = null;
		_afterXChange = null;
		_afterXyChange = null;
		_afterYChange = null;
		_afterZIndexChange = null;
		_onAlignChange = null;
		_onAllowNoneChange = null;
		_onBlankDaysChange = null;
		_onBodyContentChange = null;
		_onBoundingBoxChange = null;
		_onCancellableHideChange = null;
		_onCenteredChange = null;
		_onConstrainChange = null;
		_onContentBoxChange = null;
		_onCssClassChange = null;
		_onCurrentDayChange = null;
		_onCurrentMonthChange = null;
		_onCurrentNodeChange = null;
		_onCurrentYearChange = null;
		_onDateFormatChange = null;
		_onDatesChange = null;
		_onDestroy = null;
		_onDestroyedChange = null;
		_onDisabledChange = null;
		_onFillHeightChange = null;
		_onFirstDayOfWeekChange = null;
		_onFocusedChange = null;
		_onFooterContentChange = null;
		_onHeaderContentChange = null;
		_onHeaderContentNodeChange = null;
		_onHeaderTitleNodeChange = null;
		_onHeightChange = null;
		_onHideClassChange = null;
		_onHideDelayChange = null;
		_onHideOnChange = null;
		_onHideOnDocumentClickChange = null;
		_onIconNextNodeChange = null;
		_onIconPrevNodeChange = null;
		_onIdChange = null;
		_onInit = null;
		_onInitializedChange = null;
		_onLocaleChange = null;
		_onMaxDateChange = null;
		_onMinDateChange = null;
		_onMonthDaysChange = null;
		_onMonthDaysNodeChange = null;
		_onNoneLinkNodeChange = null;
		_onPaddingDaysEndChange = null;
		_onPaddingDaysStartChange = null;
		_onPreventOverlapChange = null;
		_onRenderChange = null;
		_onRenderedChange = null;
		_onSelectMultipleDatesChange = null;
		_onSetValueChange = null;
		_onShimChange = null;
		_onShowDelayChange = null;
		_onShowOnChange = null;
		_onShowOtherMonthChange = null;
		_onShowTodayChange = null;
		_onSrcNodeChange = null;
		_onStringsChange = null;
		_onTabIndexChange = null;
		_onTodayLinkNodeChange = null;
		_onTriggerChange = null;
		_onUseARIAChange = null;
		_onVisibleChange = null;
		_onWeekDaysChange = null;
		_onWeekDaysNodeChange = null;
		_onContentUpdate = null;
		_onRender = null;
		_onWidthChange = null;
		_onXChange = null;
		_onXyChange = null;
		_onYChange = null;
		_onZIndexChange = null;
	}

	protected String getPage() {
		return _PAGE;
	}

	protected void setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "align", _align);
		setNamespacedAttribute(request, "allowNone", _allowNone);
		setNamespacedAttribute(request, "blankDays", _blankDays);
		setNamespacedAttribute(request, "calendarBodyContent", _calendarBodyContent);
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "cancellableHide", _cancellableHide);
		setNamespacedAttribute(request, "centered", _centered);
		setNamespacedAttribute(request, "constrain", _constrain);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "currentDay", _currentDay);
		setNamespacedAttribute(request, "currentMonth", _currentMonth);
		setNamespacedAttribute(request, "currentNode", _currentNode);
		setNamespacedAttribute(request, "currentYear", _currentYear);
		setNamespacedAttribute(request, "dateFormat", _dateFormat);
		setNamespacedAttribute(request, "dates", _dates);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "fillHeight", _fillHeight);
		setNamespacedAttribute(request, "firstDayOfWeek", _firstDayOfWeek);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "footerContent", _footerContent);
		setNamespacedAttribute(request, "headerContent", _headerContent);
		setNamespacedAttribute(request, "headerContentNode", _headerContentNode);
		setNamespacedAttribute(request, "headerTitleNode", _headerTitleNode);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "hideDelay", _hideDelay);
		setNamespacedAttribute(request, "hideOn", _hideOn);
		setNamespacedAttribute(request, "hideOnDocumentClick", _hideOnDocumentClick);
		setNamespacedAttribute(request, "iconNextNode", _iconNextNode);
		setNamespacedAttribute(request, "iconPrevNode", _iconPrevNode);
		setNamespacedAttribute(request, "calendarId", _calendarId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "locale", _locale);
		setNamespacedAttribute(request, "maxDate", _maxDate);
		setNamespacedAttribute(request, "minDate", _minDate);
		setNamespacedAttribute(request, "monthDays", _monthDays);
		setNamespacedAttribute(request, "monthDaysNode", _monthDaysNode);
		setNamespacedAttribute(request, "noneLinkNode", _noneLinkNode);
		setNamespacedAttribute(request, "paddingDaysEnd", _paddingDaysEnd);
		setNamespacedAttribute(request, "paddingDaysStart", _paddingDaysStart);
		setNamespacedAttribute(request, "preventOverlap", _preventOverlap);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "selectMultipleDates", _selectMultipleDates);
		setNamespacedAttribute(request, "setValue", _setValue);
		setNamespacedAttribute(request, "shim", _shim);
		setNamespacedAttribute(request, "showDelay", _showDelay);
		setNamespacedAttribute(request, "showOn", _showOn);
		setNamespacedAttribute(request, "showOtherMonth", _showOtherMonth);
		setNamespacedAttribute(request, "showToday", _showToday);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "todayLinkNode", _todayLinkNode);
		setNamespacedAttribute(request, "trigger", _trigger);
		setNamespacedAttribute(request, "useARIA", _useARIA);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "weekDays", _weekDays);
		setNamespacedAttribute(request, "weekDaysNode", _weekDaysNode);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "x", _x);
		setNamespacedAttribute(request, "xy", _xy);
		setNamespacedAttribute(request, "y", _y);
		setNamespacedAttribute(request, "zIndex", _zIndex);
		setNamespacedAttribute(request, "afterAlignChange", _afterAlignChange);
		setNamespacedAttribute(request, "afterAllowNoneChange", _afterAllowNoneChange);
		setNamespacedAttribute(request, "afterBlankDaysChange", _afterBlankDaysChange);
		setNamespacedAttribute(request, "afterBodyContentChange", _afterBodyContentChange);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterCancellableHideChange", _afterCancellableHideChange);
		setNamespacedAttribute(request, "afterCenteredChange", _afterCenteredChange);
		setNamespacedAttribute(request, "afterConstrainChange", _afterConstrainChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterCurrentDayChange", _afterCurrentDayChange);
		setNamespacedAttribute(request, "afterCurrentMonthChange", _afterCurrentMonthChange);
		setNamespacedAttribute(request, "afterCurrentNodeChange", _afterCurrentNodeChange);
		setNamespacedAttribute(request, "afterCurrentYearChange", _afterCurrentYearChange);
		setNamespacedAttribute(request, "afterDateFormatChange", _afterDateFormatChange);
		setNamespacedAttribute(request, "afterDatesChange", _afterDatesChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterFillHeightChange", _afterFillHeightChange);
		setNamespacedAttribute(request, "afterFirstDayOfWeekChange", _afterFirstDayOfWeekChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterFooterContentChange", _afterFooterContentChange);
		setNamespacedAttribute(request, "afterHeaderContentChange", _afterHeaderContentChange);
		setNamespacedAttribute(request, "afterHeaderContentNodeChange", _afterHeaderContentNodeChange);
		setNamespacedAttribute(request, "afterHeaderTitleNodeChange", _afterHeaderTitleNodeChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterHideClassChange", _afterHideClassChange);
		setNamespacedAttribute(request, "afterHideDelayChange", _afterHideDelayChange);
		setNamespacedAttribute(request, "afterHideOnChange", _afterHideOnChange);
		setNamespacedAttribute(request, "afterHideOnDocumentClickChange", _afterHideOnDocumentClickChange);
		setNamespacedAttribute(request, "afterIconNextNodeChange", _afterIconNextNodeChange);
		setNamespacedAttribute(request, "afterIconPrevNodeChange", _afterIconPrevNodeChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterLocaleChange", _afterLocaleChange);
		setNamespacedAttribute(request, "afterMaxDateChange", _afterMaxDateChange);
		setNamespacedAttribute(request, "afterMinDateChange", _afterMinDateChange);
		setNamespacedAttribute(request, "afterMonthDaysChange", _afterMonthDaysChange);
		setNamespacedAttribute(request, "afterMonthDaysNodeChange", _afterMonthDaysNodeChange);
		setNamespacedAttribute(request, "afterNoneLinkNodeChange", _afterNoneLinkNodeChange);
		setNamespacedAttribute(request, "afterPaddingDaysEndChange", _afterPaddingDaysEndChange);
		setNamespacedAttribute(request, "afterPaddingDaysStartChange", _afterPaddingDaysStartChange);
		setNamespacedAttribute(request, "afterPreventOverlapChange", _afterPreventOverlapChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterSelectMultipleDatesChange", _afterSelectMultipleDatesChange);
		setNamespacedAttribute(request, "afterSetValueChange", _afterSetValueChange);
		setNamespacedAttribute(request, "afterShimChange", _afterShimChange);
		setNamespacedAttribute(request, "afterShowDelayChange", _afterShowDelayChange);
		setNamespacedAttribute(request, "afterShowOnChange", _afterShowOnChange);
		setNamespacedAttribute(request, "afterShowOtherMonthChange", _afterShowOtherMonthChange);
		setNamespacedAttribute(request, "afterShowTodayChange", _afterShowTodayChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterTodayLinkNodeChange", _afterTodayLinkNodeChange);
		setNamespacedAttribute(request, "afterTriggerChange", _afterTriggerChange);
		setNamespacedAttribute(request, "afterUseARIAChange", _afterUseARIAChange);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterWeekDaysChange", _afterWeekDaysChange);
		setNamespacedAttribute(request, "afterWeekDaysNodeChange", _afterWeekDaysNodeChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "afterXChange", _afterXChange);
		setNamespacedAttribute(request, "afterXyChange", _afterXyChange);
		setNamespacedAttribute(request, "afterYChange", _afterYChange);
		setNamespacedAttribute(request, "afterZIndexChange", _afterZIndexChange);
		setNamespacedAttribute(request, "onAlignChange", _onAlignChange);
		setNamespacedAttribute(request, "onAllowNoneChange", _onAllowNoneChange);
		setNamespacedAttribute(request, "onBlankDaysChange", _onBlankDaysChange);
		setNamespacedAttribute(request, "onBodyContentChange", _onBodyContentChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onCancellableHideChange", _onCancellableHideChange);
		setNamespacedAttribute(request, "onCenteredChange", _onCenteredChange);
		setNamespacedAttribute(request, "onConstrainChange", _onConstrainChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onCurrentDayChange", _onCurrentDayChange);
		setNamespacedAttribute(request, "onCurrentMonthChange", _onCurrentMonthChange);
		setNamespacedAttribute(request, "onCurrentNodeChange", _onCurrentNodeChange);
		setNamespacedAttribute(request, "onCurrentYearChange", _onCurrentYearChange);
		setNamespacedAttribute(request, "onDateFormatChange", _onDateFormatChange);
		setNamespacedAttribute(request, "onDatesChange", _onDatesChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onFillHeightChange", _onFillHeightChange);
		setNamespacedAttribute(request, "onFirstDayOfWeekChange", _onFirstDayOfWeekChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onFooterContentChange", _onFooterContentChange);
		setNamespacedAttribute(request, "onHeaderContentChange", _onHeaderContentChange);
		setNamespacedAttribute(request, "onHeaderContentNodeChange", _onHeaderContentNodeChange);
		setNamespacedAttribute(request, "onHeaderTitleNodeChange", _onHeaderTitleNodeChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onHideClassChange", _onHideClassChange);
		setNamespacedAttribute(request, "onHideDelayChange", _onHideDelayChange);
		setNamespacedAttribute(request, "onHideOnChange", _onHideOnChange);
		setNamespacedAttribute(request, "onHideOnDocumentClickChange", _onHideOnDocumentClickChange);
		setNamespacedAttribute(request, "onIconNextNodeChange", _onIconNextNodeChange);
		setNamespacedAttribute(request, "onIconPrevNodeChange", _onIconPrevNodeChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onLocaleChange", _onLocaleChange);
		setNamespacedAttribute(request, "onMaxDateChange", _onMaxDateChange);
		setNamespacedAttribute(request, "onMinDateChange", _onMinDateChange);
		setNamespacedAttribute(request, "onMonthDaysChange", _onMonthDaysChange);
		setNamespacedAttribute(request, "onMonthDaysNodeChange", _onMonthDaysNodeChange);
		setNamespacedAttribute(request, "onNoneLinkNodeChange", _onNoneLinkNodeChange);
		setNamespacedAttribute(request, "onPaddingDaysEndChange", _onPaddingDaysEndChange);
		setNamespacedAttribute(request, "onPaddingDaysStartChange", _onPaddingDaysStartChange);
		setNamespacedAttribute(request, "onPreventOverlapChange", _onPreventOverlapChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onSelectMultipleDatesChange", _onSelectMultipleDatesChange);
		setNamespacedAttribute(request, "onSetValueChange", _onSetValueChange);
		setNamespacedAttribute(request, "onShimChange", _onShimChange);
		setNamespacedAttribute(request, "onShowDelayChange", _onShowDelayChange);
		setNamespacedAttribute(request, "onShowOnChange", _onShowOnChange);
		setNamespacedAttribute(request, "onShowOtherMonthChange", _onShowOtherMonthChange);
		setNamespacedAttribute(request, "onShowTodayChange", _onShowTodayChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onTodayLinkNodeChange", _onTodayLinkNodeChange);
		setNamespacedAttribute(request, "onTriggerChange", _onTriggerChange);
		setNamespacedAttribute(request, "onUseARIAChange", _onUseARIAChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onWeekDaysChange", _onWeekDaysChange);
		setNamespacedAttribute(request, "onWeekDaysNodeChange", _onWeekDaysNodeChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
		setNamespacedAttribute(request, "onXChange", _onXChange);
		setNamespacedAttribute(request, "onXyChange", _onXyChange);
		setNamespacedAttribute(request, "onYChange", _onYChange);
		setNamespacedAttribute(request, "onZIndexChange", _onZIndexChange);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:calendar:";

	private static final String _PAGE =
		"/html/taglib/alloy/calendar/page.jsp";

	private java.lang.Object _align = null;
	private boolean _allowNone = true;
	private java.lang.String _blankDays = null;
	private java.lang.Object _calendarBodyContent = null;
	private java.lang.String _boundingBox = null;
	private boolean _cancellableHide = true;
	private java.lang.Object _centered = null;
	private java.lang.Object _constrain = null;
	private java.lang.String _contentBox = null;
	private java.lang.String _cssClass = null;
	private java.lang.Object _currentDay = 0;
	private java.lang.Object _currentMonth = 0;
	private java.lang.Object _currentNode = null;
	private java.lang.Object _currentYear = 0;
	private java.lang.String _dateFormat = "%m/%d/%Y";
	private java.lang.Object _dates = null;
	private boolean _destroyed = false;
	private boolean _disabled = false;
	private java.lang.Object _fillHeight = null;
	private java.lang.Object _firstDayOfWeek = 0;
	private boolean _focused = false;
	private java.lang.Object _footerContent = null;
	private java.lang.Object _headerContent = null;
	private java.lang.String _headerContentNode = null;
	private java.lang.String _headerTitleNode = null;
	private java.lang.Object _height = null;
	private java.lang.String _hideClass = "aui-helper-hidden";
	private java.lang.Object _hideDelay = 0;
	private java.lang.String _hideOn = "mouseout";
	private boolean _hideOnDocumentClick = true;
	private java.lang.String _iconNextNode = null;
	private java.lang.String _iconPrevNode = null;
	private java.lang.String _calendarId = null;
	private boolean _initialized = false;
	private java.lang.String _locale = "en";
	private java.lang.Object _maxDate = null;
	private java.lang.Object _minDate = null;
	private java.lang.String _monthDays = null;
	private java.lang.String _monthDaysNode = null;
	private java.lang.Object _noneLinkNode = null;
	private java.lang.Object _paddingDaysEnd = null;
	private java.lang.Object _paddingDaysStart = null;
	private boolean _preventOverlap = false;
	private java.lang.Object _render = null;
	private boolean _rendered = false;
	private boolean _selectMultipleDates = false;
	private boolean _setValue = true;
	private boolean _shim = false;
	private java.lang.Object _showDelay = 0;
	private java.lang.String _showOn = "mouseover";
	private boolean _showOtherMonth = true;
	private boolean _showToday = true;
	private java.lang.String _srcNode = null;
	private java.lang.Object _strings = null;
	private java.lang.Object _tabIndex = 0;
	private java.lang.Object _todayLinkNode = null;
	private java.lang.Object _trigger = null;
	private boolean _useARIA = true;
	private boolean _visible = false;
	private java.lang.String _weekDays = null;
	private java.lang.String _weekDaysNode = null;
	private java.lang.Object _width = null;
	private java.lang.Object _x = 0;
	private java.lang.Object _xy = null;
	private java.lang.Object _y = 0;
	private java.lang.Object _zIndex = 0;
	private java.lang.Object _afterAlignChange = null;
	private java.lang.Object _afterAllowNoneChange = null;
	private java.lang.Object _afterBlankDaysChange = null;
	private java.lang.Object _afterBodyContentChange = null;
	private java.lang.Object _afterBoundingBoxChange = null;
	private java.lang.Object _afterCancellableHideChange = null;
	private java.lang.Object _afterCenteredChange = null;
	private java.lang.Object _afterConstrainChange = null;
	private java.lang.Object _afterContentBoxChange = null;
	private java.lang.Object _afterCssClassChange = null;
	private java.lang.Object _afterCurrentDayChange = null;
	private java.lang.Object _afterCurrentMonthChange = null;
	private java.lang.Object _afterCurrentNodeChange = null;
	private java.lang.Object _afterCurrentYearChange = null;
	private java.lang.Object _afterDateFormatChange = null;
	private java.lang.Object _afterDatesChange = null;
	private java.lang.Object _afterDestroy = null;
	private java.lang.Object _afterDestroyedChange = null;
	private java.lang.Object _afterDisabledChange = null;
	private java.lang.Object _afterFillHeightChange = null;
	private java.lang.Object _afterFirstDayOfWeekChange = null;
	private java.lang.Object _afterFocusedChange = null;
	private java.lang.Object _afterFooterContentChange = null;
	private java.lang.Object _afterHeaderContentChange = null;
	private java.lang.Object _afterHeaderContentNodeChange = null;
	private java.lang.Object _afterHeaderTitleNodeChange = null;
	private java.lang.Object _afterHeightChange = null;
	private java.lang.Object _afterHideClassChange = null;
	private java.lang.Object _afterHideDelayChange = null;
	private java.lang.Object _afterHideOnChange = null;
	private java.lang.Object _afterHideOnDocumentClickChange = null;
	private java.lang.Object _afterIconNextNodeChange = null;
	private java.lang.Object _afterIconPrevNodeChange = null;
	private java.lang.Object _afterIdChange = null;
	private java.lang.Object _afterInit = null;
	private java.lang.Object _afterInitializedChange = null;
	private java.lang.Object _afterLocaleChange = null;
	private java.lang.Object _afterMaxDateChange = null;
	private java.lang.Object _afterMinDateChange = null;
	private java.lang.Object _afterMonthDaysChange = null;
	private java.lang.Object _afterMonthDaysNodeChange = null;
	private java.lang.Object _afterNoneLinkNodeChange = null;
	private java.lang.Object _afterPaddingDaysEndChange = null;
	private java.lang.Object _afterPaddingDaysStartChange = null;
	private java.lang.Object _afterPreventOverlapChange = null;
	private java.lang.Object _afterRenderChange = null;
	private java.lang.Object _afterRenderedChange = null;
	private java.lang.Object _afterSelectMultipleDatesChange = null;
	private java.lang.Object _afterSetValueChange = null;
	private java.lang.Object _afterShimChange = null;
	private java.lang.Object _afterShowDelayChange = null;
	private java.lang.Object _afterShowOnChange = null;
	private java.lang.Object _afterShowOtherMonthChange = null;
	private java.lang.Object _afterShowTodayChange = null;
	private java.lang.Object _afterSrcNodeChange = null;
	private java.lang.Object _afterStringsChange = null;
	private java.lang.Object _afterTabIndexChange = null;
	private java.lang.Object _afterTodayLinkNodeChange = null;
	private java.lang.Object _afterTriggerChange = null;
	private java.lang.Object _afterUseARIAChange = null;
	private java.lang.Object _afterVisibleChange = null;
	private java.lang.Object _afterWeekDaysChange = null;
	private java.lang.Object _afterWeekDaysNodeChange = null;
	private java.lang.Object _afterContentUpdate = null;
	private java.lang.Object _afterRender = null;
	private java.lang.Object _afterWidthChange = null;
	private java.lang.Object _afterXChange = null;
	private java.lang.Object _afterXyChange = null;
	private java.lang.Object _afterYChange = null;
	private java.lang.Object _afterZIndexChange = null;
	private java.lang.Object _onAlignChange = null;
	private java.lang.Object _onAllowNoneChange = null;
	private java.lang.Object _onBlankDaysChange = null;
	private java.lang.Object _onBodyContentChange = null;
	private java.lang.Object _onBoundingBoxChange = null;
	private java.lang.Object _onCancellableHideChange = null;
	private java.lang.Object _onCenteredChange = null;
	private java.lang.Object _onConstrainChange = null;
	private java.lang.Object _onContentBoxChange = null;
	private java.lang.Object _onCssClassChange = null;
	private java.lang.Object _onCurrentDayChange = null;
	private java.lang.Object _onCurrentMonthChange = null;
	private java.lang.Object _onCurrentNodeChange = null;
	private java.lang.Object _onCurrentYearChange = null;
	private java.lang.Object _onDateFormatChange = null;
	private java.lang.Object _onDatesChange = null;
	private java.lang.Object _onDestroy = null;
	private java.lang.Object _onDestroyedChange = null;
	private java.lang.Object _onDisabledChange = null;
	private java.lang.Object _onFillHeightChange = null;
	private java.lang.Object _onFirstDayOfWeekChange = null;
	private java.lang.Object _onFocusedChange = null;
	private java.lang.Object _onFooterContentChange = null;
	private java.lang.Object _onHeaderContentChange = null;
	private java.lang.Object _onHeaderContentNodeChange = null;
	private java.lang.Object _onHeaderTitleNodeChange = null;
	private java.lang.Object _onHeightChange = null;
	private java.lang.Object _onHideClassChange = null;
	private java.lang.Object _onHideDelayChange = null;
	private java.lang.Object _onHideOnChange = null;
	private java.lang.Object _onHideOnDocumentClickChange = null;
	private java.lang.Object _onIconNextNodeChange = null;
	private java.lang.Object _onIconPrevNodeChange = null;
	private java.lang.Object _onIdChange = null;
	private java.lang.Object _onInit = null;
	private java.lang.Object _onInitializedChange = null;
	private java.lang.Object _onLocaleChange = null;
	private java.lang.Object _onMaxDateChange = null;
	private java.lang.Object _onMinDateChange = null;
	private java.lang.Object _onMonthDaysChange = null;
	private java.lang.Object _onMonthDaysNodeChange = null;
	private java.lang.Object _onNoneLinkNodeChange = null;
	private java.lang.Object _onPaddingDaysEndChange = null;
	private java.lang.Object _onPaddingDaysStartChange = null;
	private java.lang.Object _onPreventOverlapChange = null;
	private java.lang.Object _onRenderChange = null;
	private java.lang.Object _onRenderedChange = null;
	private java.lang.Object _onSelectMultipleDatesChange = null;
	private java.lang.Object _onSetValueChange = null;
	private java.lang.Object _onShimChange = null;
	private java.lang.Object _onShowDelayChange = null;
	private java.lang.Object _onShowOnChange = null;
	private java.lang.Object _onShowOtherMonthChange = null;
	private java.lang.Object _onShowTodayChange = null;
	private java.lang.Object _onSrcNodeChange = null;
	private java.lang.Object _onStringsChange = null;
	private java.lang.Object _onTabIndexChange = null;
	private java.lang.Object _onTodayLinkNodeChange = null;
	private java.lang.Object _onTriggerChange = null;
	private java.lang.Object _onUseARIAChange = null;
	private java.lang.Object _onVisibleChange = null;
	private java.lang.Object _onWeekDaysChange = null;
	private java.lang.Object _onWeekDaysNodeChange = null;
	private java.lang.Object _onContentUpdate = null;
	private java.lang.Object _onRender = null;
	private java.lang.Object _onWidthChange = null;
	private java.lang.Object _onXChange = null;
	private java.lang.Object _onXyChange = null;
	private java.lang.Object _onYChange = null;
	private java.lang.Object _onZIndexChange = null;

}