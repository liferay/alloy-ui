package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseDatePickerSelectTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseDatePickerSelectTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.Object getAlign() {
		return _align;
	}

	public java.lang.String getAppendOrder() {
		return _appendOrder;
	}

	public java.lang.String getBaseName() {
		return _baseName;
	}

	public java.lang.String getBoundingBox() {
		return _boundingBox;
	}

	public java.lang.String getButtonNode() {
		return _buttonNode;
	}

	public java.lang.Boolean getCancellableHide() {
		return _cancellableHide;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.String getCssClass() {
		return _cssClass;
	}

	public java.lang.Number getCurrentDay() {
		return _currentDay;
	}

	public java.lang.Number getCurrentMonth() {
		return _currentMonth;
	}

	public java.lang.String getCurrentNode() {
		return _currentNode;
	}

	public java.lang.Number getCurrentYear() {
		return _currentYear;
	}

	public java.lang.String getDateFormat() {
		return _dateFormat;
	}

	public java.lang.String getDates() {
		return _dates;
	}

	public java.lang.String getDayNode() {
		return _dayNode;
	}

	public java.lang.String getDayNodeName() {
		return _dayNodeName;
	}

	public java.lang.Boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.Boolean getDisabled() {
		return _disabled;
	}

	public java.lang.Number getFirstDayOfWeek() {
		return _firstDayOfWeek;
	}

	public java.lang.Boolean getFocused() {
		return _focused;
	}

	public java.lang.String getHeight() {
		return _height;
	}

	public java.lang.String getHideClass() {
		return _hideClass;
	}

	public java.lang.Number getHideDelay() {
		return _hideDelay;
	}

	public java.lang.String getHideOn() {
		return _hideOn;
	}

	public java.lang.Boolean getHideOnDocumentClick() {
		return _hideOnDocumentClick;
	}

	public java.lang.String getDatepickerselectId() {
		return _datepickerselectId;
	}

	public java.lang.Boolean getInitialized() {
		return _initialized;
	}

	public java.lang.String getMaxDate() {
		return _maxDate;
	}

	public java.lang.String getMinDate() {
		return _minDate;
	}

	public java.lang.String getMonthNode() {
		return _monthNode;
	}

	public java.lang.String getMonthNodeName() {
		return _monthNodeName;
	}

	public java.lang.Boolean getPopulateDay() {
		return _populateDay;
	}

	public java.lang.Boolean getPopulateMonth() {
		return _populateMonth;
	}

	public java.lang.Boolean getPopulateYear() {
		return _populateYear;
	}

	public java.lang.Boolean getRender() {
		return _render;
	}

	public java.lang.Boolean getRendered() {
		return _rendered;
	}

	public java.lang.Boolean getSelectMultipleDates() {
		return _selectMultipleDates;
	}

	public java.lang.String getSelectWrapperNode() {
		return _selectWrapperNode;
	}

	public java.lang.Boolean getSetValue() {
		return _setValue;
	}

	public java.lang.Number getShowDelay() {
		return _showDelay;
	}

	public java.lang.String getShowOn() {
		return _showOn;
	}

	public java.lang.String getSrcNode() {
		return _srcNode;
	}

	public java.lang.Boolean getStack() {
		return _stack;
	}

	public java.lang.Object getStrings() {
		return _strings;
	}

	public java.lang.Number getTabIndex() {
		return _tabIndex;
	}

	public java.lang.String getTrigger() {
		return _trigger;
	}

	public java.lang.Boolean getVisible() {
		return _visible;
	}

	public java.lang.String getWidth() {
		return _width;
	}

	public java.lang.String getYearNode() {
		return _yearNode;
	}

	public java.lang.String getYearNodeName() {
		return _yearNodeName;
	}

	public java.lang.String getYearRange() {
		return _yearRange;
	}

	public java.lang.String getAfterAlignChange() {
		return _afterAlignChange;
	}

	public java.lang.String getAfterAppendOrderChange() {
		return _afterAppendOrderChange;
	}

	public java.lang.String getAfterBaseNameChange() {
		return _afterBaseNameChange;
	}

	public java.lang.String getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.String getAfterButtonNodeChange() {
		return _afterButtonNodeChange;
	}

	public java.lang.String getAfterCancellableHideChange() {
		return _afterCancellableHideChange;
	}

	public java.lang.String getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.String getAfterCssClassChange() {
		return _afterCssClassChange;
	}

	public java.lang.String getAfterCurrentDayChange() {
		return _afterCurrentDayChange;
	}

	public java.lang.String getAfterCurrentMonthChange() {
		return _afterCurrentMonthChange;
	}

	public java.lang.String getAfterCurrentNodeChange() {
		return _afterCurrentNodeChange;
	}

	public java.lang.String getAfterCurrentYearChange() {
		return _afterCurrentYearChange;
	}

	public java.lang.String getAfterDateFormatChange() {
		return _afterDateFormatChange;
	}

	public java.lang.String getAfterDatesChange() {
		return _afterDatesChange;
	}

	public java.lang.String getAfterDayNodeChange() {
		return _afterDayNodeChange;
	}

	public java.lang.String getAfterDayNodeNameChange() {
		return _afterDayNodeNameChange;
	}

	public java.lang.String getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.String getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.String getAfterDisabledChange() {
		return _afterDisabledChange;
	}

	public java.lang.String getAfterFirstDayOfWeekChange() {
		return _afterFirstDayOfWeekChange;
	}

	public java.lang.String getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.String getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.String getAfterHideClassChange() {
		return _afterHideClassChange;
	}

	public java.lang.String getAfterHideDelayChange() {
		return _afterHideDelayChange;
	}

	public java.lang.String getAfterHideOnChange() {
		return _afterHideOnChange;
	}

	public java.lang.String getAfterHideOnDocumentClickChange() {
		return _afterHideOnDocumentClickChange;
	}

	public java.lang.String getAfterIdChange() {
		return _afterIdChange;
	}

	public java.lang.String getAfterInit() {
		return _afterInit;
	}

	public java.lang.String getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.String getAfterMaxDateChange() {
		return _afterMaxDateChange;
	}

	public java.lang.String getAfterMinDateChange() {
		return _afterMinDateChange;
	}

	public java.lang.String getAfterMonthNodeChange() {
		return _afterMonthNodeChange;
	}

	public java.lang.String getAfterMonthNodeNameChange() {
		return _afterMonthNodeNameChange;
	}

	public java.lang.String getAfterPopulateDayChange() {
		return _afterPopulateDayChange;
	}

	public java.lang.String getAfterPopulateMonthChange() {
		return _afterPopulateMonthChange;
	}

	public java.lang.String getAfterPopulateYearChange() {
		return _afterPopulateYearChange;
	}

	public java.lang.String getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.String getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.String getAfterSelectMultipleDatesChange() {
		return _afterSelectMultipleDatesChange;
	}

	public java.lang.String getAfterSelectWrapperNodeChange() {
		return _afterSelectWrapperNodeChange;
	}

	public java.lang.String getAfterSetValueChange() {
		return _afterSetValueChange;
	}

	public java.lang.String getAfterShowDelayChange() {
		return _afterShowDelayChange;
	}

	public java.lang.String getAfterShowOnChange() {
		return _afterShowOnChange;
	}

	public java.lang.String getAfterSrcNodeChange() {
		return _afterSrcNodeChange;
	}

	public java.lang.String getAfterStackChange() {
		return _afterStackChange;
	}

	public java.lang.String getAfterStringsChange() {
		return _afterStringsChange;
	}

	public java.lang.String getAfterTabIndexChange() {
		return _afterTabIndexChange;
	}

	public java.lang.String getAfterTriggerChange() {
		return _afterTriggerChange;
	}

	public java.lang.String getAfterVisibleChange() {
		return _afterVisibleChange;
	}

	public java.lang.String getAfterContentUpdate() {
		return _afterContentUpdate;
	}

	public java.lang.String getAfterRender() {
		return _afterRender;
	}

	public java.lang.String getAfterWidthChange() {
		return _afterWidthChange;
	}

	public java.lang.String getAfterYearNodeChange() {
		return _afterYearNodeChange;
	}

	public java.lang.String getAfterYearNodeNameChange() {
		return _afterYearNodeNameChange;
	}

	public java.lang.String getAfterYearRangeChange() {
		return _afterYearRangeChange;
	}

	public java.lang.String getOnAlignChange() {
		return _onAlignChange;
	}

	public java.lang.String getOnAppendOrderChange() {
		return _onAppendOrderChange;
	}

	public java.lang.String getOnBaseNameChange() {
		return _onBaseNameChange;
	}

	public java.lang.String getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.String getOnButtonNodeChange() {
		return _onButtonNodeChange;
	}

	public java.lang.String getOnCancellableHideChange() {
		return _onCancellableHideChange;
	}

	public java.lang.String getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.String getOnCssClassChange() {
		return _onCssClassChange;
	}

	public java.lang.String getOnCurrentDayChange() {
		return _onCurrentDayChange;
	}

	public java.lang.String getOnCurrentMonthChange() {
		return _onCurrentMonthChange;
	}

	public java.lang.String getOnCurrentNodeChange() {
		return _onCurrentNodeChange;
	}

	public java.lang.String getOnCurrentYearChange() {
		return _onCurrentYearChange;
	}

	public java.lang.String getOnDateFormatChange() {
		return _onDateFormatChange;
	}

	public java.lang.String getOnDatesChange() {
		return _onDatesChange;
	}

	public java.lang.String getOnDayNodeChange() {
		return _onDayNodeChange;
	}

	public java.lang.String getOnDayNodeNameChange() {
		return _onDayNodeNameChange;
	}

	public java.lang.String getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.String getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.String getOnDisabledChange() {
		return _onDisabledChange;
	}

	public java.lang.String getOnFirstDayOfWeekChange() {
		return _onFirstDayOfWeekChange;
	}

	public java.lang.String getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.String getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.String getOnHideClassChange() {
		return _onHideClassChange;
	}

	public java.lang.String getOnHideDelayChange() {
		return _onHideDelayChange;
	}

	public java.lang.String getOnHideOnChange() {
		return _onHideOnChange;
	}

	public java.lang.String getOnHideOnDocumentClickChange() {
		return _onHideOnDocumentClickChange;
	}

	public java.lang.String getOnIdChange() {
		return _onIdChange;
	}

	public java.lang.String getOnInit() {
		return _onInit;
	}

	public java.lang.String getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.String getOnMaxDateChange() {
		return _onMaxDateChange;
	}

	public java.lang.String getOnMinDateChange() {
		return _onMinDateChange;
	}

	public java.lang.String getOnMonthNodeChange() {
		return _onMonthNodeChange;
	}

	public java.lang.String getOnMonthNodeNameChange() {
		return _onMonthNodeNameChange;
	}

	public java.lang.String getOnPopulateDayChange() {
		return _onPopulateDayChange;
	}

	public java.lang.String getOnPopulateMonthChange() {
		return _onPopulateMonthChange;
	}

	public java.lang.String getOnPopulateYearChange() {
		return _onPopulateYearChange;
	}

	public java.lang.String getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.String getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.String getOnSelectMultipleDatesChange() {
		return _onSelectMultipleDatesChange;
	}

	public java.lang.String getOnSelectWrapperNodeChange() {
		return _onSelectWrapperNodeChange;
	}

	public java.lang.String getOnSetValueChange() {
		return _onSetValueChange;
	}

	public java.lang.String getOnShowDelayChange() {
		return _onShowDelayChange;
	}

	public java.lang.String getOnShowOnChange() {
		return _onShowOnChange;
	}

	public java.lang.String getOnSrcNodeChange() {
		return _onSrcNodeChange;
	}

	public java.lang.String getOnStackChange() {
		return _onStackChange;
	}

	public java.lang.String getOnStringsChange() {
		return _onStringsChange;
	}

	public java.lang.String getOnTabIndexChange() {
		return _onTabIndexChange;
	}

	public java.lang.String getOnTriggerChange() {
		return _onTriggerChange;
	}

	public java.lang.String getOnVisibleChange() {
		return _onVisibleChange;
	}

	public java.lang.String getOnContentUpdate() {
		return _onContentUpdate;
	}

	public java.lang.String getOnRender() {
		return _onRender;
	}

	public java.lang.String getOnWidthChange() {
		return _onWidthChange;
	}

	public java.lang.String getOnYearNodeChange() {
		return _onYearNodeChange;
	}

	public java.lang.String getOnYearNodeNameChange() {
		return _onYearNodeNameChange;
	}

	public java.lang.String getOnYearRangeChange() {
		return _onYearRangeChange;
	}

	public void setAlign(java.lang.Object align) {
		_align = align;

		setScopedAttribute("align", align);
	}

	public void setAppendOrder(java.lang.String appendOrder) {
		_appendOrder = appendOrder;

		setScopedAttribute("appendOrder", appendOrder);
	}

	public void setBaseName(java.lang.String baseName) {
		_baseName = baseName;

		setScopedAttribute("baseName", baseName);
	}

	public void setBoundingBox(java.lang.String boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setButtonNode(java.lang.String buttonNode) {
		_buttonNode = buttonNode;

		setScopedAttribute("buttonNode", buttonNode);
	}

	public void setCancellableHide(java.lang.Boolean cancellableHide) {
		_cancellableHide = cancellableHide;

		setScopedAttribute("cancellableHide", cancellableHide);
	}

	public void setContentBox(java.lang.String contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setCssClass(java.lang.String cssClass) {
		_cssClass = cssClass;

		setScopedAttribute("cssClass", cssClass);
	}

	public void setCurrentDay(java.lang.Number currentDay) {
		_currentDay = currentDay;

		setScopedAttribute("currentDay", currentDay);
	}

	public void setCurrentMonth(java.lang.Number currentMonth) {
		_currentMonth = currentMonth;

		setScopedAttribute("currentMonth", currentMonth);
	}

	public void setCurrentNode(java.lang.String currentNode) {
		_currentNode = currentNode;

		setScopedAttribute("currentNode", currentNode);
	}

	public void setCurrentYear(java.lang.Number currentYear) {
		_currentYear = currentYear;

		setScopedAttribute("currentYear", currentYear);
	}

	public void setDateFormat(java.lang.String dateFormat) {
		_dateFormat = dateFormat;

		setScopedAttribute("dateFormat", dateFormat);
	}

	public void setDates(java.lang.String dates) {
		_dates = dates;

		setScopedAttribute("dates", dates);
	}

	public void setDayNode(java.lang.String dayNode) {
		_dayNode = dayNode;

		setScopedAttribute("dayNode", dayNode);
	}

	public void setDayNodeName(java.lang.String dayNodeName) {
		_dayNodeName = dayNodeName;

		setScopedAttribute("dayNodeName", dayNodeName);
	}

	public void setDestroyed(java.lang.Boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDisabled(java.lang.Boolean disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	public void setFirstDayOfWeek(java.lang.Number firstDayOfWeek) {
		_firstDayOfWeek = firstDayOfWeek;

		setScopedAttribute("firstDayOfWeek", firstDayOfWeek);
	}

	public void setFocused(java.lang.Boolean focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setHeight(java.lang.String height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setHideClass(java.lang.String hideClass) {
		_hideClass = hideClass;

		setScopedAttribute("hideClass", hideClass);
	}

	public void setHideDelay(java.lang.Number hideDelay) {
		_hideDelay = hideDelay;

		setScopedAttribute("hideDelay", hideDelay);
	}

	public void setHideOn(java.lang.String hideOn) {
		_hideOn = hideOn;

		setScopedAttribute("hideOn", hideOn);
	}

	public void setHideOnDocumentClick(java.lang.Boolean hideOnDocumentClick) {
		_hideOnDocumentClick = hideOnDocumentClick;

		setScopedAttribute("hideOnDocumentClick", hideOnDocumentClick);
	}

	public void setDatepickerselectId(java.lang.String datepickerselectId) {
		_datepickerselectId = datepickerselectId;

		setScopedAttribute("datepickerselectId", datepickerselectId);
	}

	public void setInitialized(java.lang.Boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setMaxDate(java.lang.String maxDate) {
		_maxDate = maxDate;

		setScopedAttribute("maxDate", maxDate);
	}

	public void setMinDate(java.lang.String minDate) {
		_minDate = minDate;

		setScopedAttribute("minDate", minDate);
	}

	public void setMonthNode(java.lang.String monthNode) {
		_monthNode = monthNode;

		setScopedAttribute("monthNode", monthNode);
	}

	public void setMonthNodeName(java.lang.String monthNodeName) {
		_monthNodeName = monthNodeName;

		setScopedAttribute("monthNodeName", monthNodeName);
	}

	public void setPopulateDay(java.lang.Boolean populateDay) {
		_populateDay = populateDay;

		setScopedAttribute("populateDay", populateDay);
	}

	public void setPopulateMonth(java.lang.Boolean populateMonth) {
		_populateMonth = populateMonth;

		setScopedAttribute("populateMonth", populateMonth);
	}

	public void setPopulateYear(java.lang.Boolean populateYear) {
		_populateYear = populateYear;

		setScopedAttribute("populateYear", populateYear);
	}

	public void setRender(java.lang.Boolean render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(java.lang.Boolean rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setSelectMultipleDates(java.lang.Boolean selectMultipleDates) {
		_selectMultipleDates = selectMultipleDates;

		setScopedAttribute("selectMultipleDates", selectMultipleDates);
	}

	public void setSelectWrapperNode(java.lang.String selectWrapperNode) {
		_selectWrapperNode = selectWrapperNode;

		setScopedAttribute("selectWrapperNode", selectWrapperNode);
	}

	public void setSetValue(java.lang.Boolean setValue) {
		_setValue = setValue;

		setScopedAttribute("setValue", setValue);
	}

	public void setShowDelay(java.lang.Number showDelay) {
		_showDelay = showDelay;

		setScopedAttribute("showDelay", showDelay);
	}

	public void setShowOn(java.lang.String showOn) {
		_showOn = showOn;

		setScopedAttribute("showOn", showOn);
	}

	public void setSrcNode(java.lang.String srcNode) {
		_srcNode = srcNode;

		setScopedAttribute("srcNode", srcNode);
	}

	public void setStack(java.lang.Boolean stack) {
		_stack = stack;

		setScopedAttribute("stack", stack);
	}

	public void setStrings(java.lang.Object strings) {
		_strings = strings;

		setScopedAttribute("strings", strings);
	}

	public void setTabIndex(java.lang.Number tabIndex) {
		_tabIndex = tabIndex;

		setScopedAttribute("tabIndex", tabIndex);
	}

	public void setTrigger(java.lang.String trigger) {
		_trigger = trigger;

		setScopedAttribute("trigger", trigger);
	}

	public void setVisible(java.lang.Boolean visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setWidth(java.lang.String width) {
		_width = width;

		setScopedAttribute("width", width);
	}

	public void setYearNode(java.lang.String yearNode) {
		_yearNode = yearNode;

		setScopedAttribute("yearNode", yearNode);
	}

	public void setYearNodeName(java.lang.String yearNodeName) {
		_yearNodeName = yearNodeName;

		setScopedAttribute("yearNodeName", yearNodeName);
	}

	public void setYearRange(java.lang.String yearRange) {
		_yearRange = yearRange;

		setScopedAttribute("yearRange", yearRange);
	}

	public void setAfterAlignChange(java.lang.String afterAlignChange) {
		_afterAlignChange = afterAlignChange;

		setScopedAttribute("afterAlignChange", afterAlignChange);
	}

	public void setAfterAppendOrderChange(java.lang.String afterAppendOrderChange) {
		_afterAppendOrderChange = afterAppendOrderChange;

		setScopedAttribute("afterAppendOrderChange", afterAppendOrderChange);
	}

	public void setAfterBaseNameChange(java.lang.String afterBaseNameChange) {
		_afterBaseNameChange = afterBaseNameChange;

		setScopedAttribute("afterBaseNameChange", afterBaseNameChange);
	}

	public void setAfterBoundingBoxChange(java.lang.String afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterButtonNodeChange(java.lang.String afterButtonNodeChange) {
		_afterButtonNodeChange = afterButtonNodeChange;

		setScopedAttribute("afterButtonNodeChange", afterButtonNodeChange);
	}

	public void setAfterCancellableHideChange(java.lang.String afterCancellableHideChange) {
		_afterCancellableHideChange = afterCancellableHideChange;

		setScopedAttribute("afterCancellableHideChange", afterCancellableHideChange);
	}

	public void setAfterContentBoxChange(java.lang.String afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.String afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
	}

	public void setAfterCurrentDayChange(java.lang.String afterCurrentDayChange) {
		_afterCurrentDayChange = afterCurrentDayChange;

		setScopedAttribute("afterCurrentDayChange", afterCurrentDayChange);
	}

	public void setAfterCurrentMonthChange(java.lang.String afterCurrentMonthChange) {
		_afterCurrentMonthChange = afterCurrentMonthChange;

		setScopedAttribute("afterCurrentMonthChange", afterCurrentMonthChange);
	}

	public void setAfterCurrentNodeChange(java.lang.String afterCurrentNodeChange) {
		_afterCurrentNodeChange = afterCurrentNodeChange;

		setScopedAttribute("afterCurrentNodeChange", afterCurrentNodeChange);
	}

	public void setAfterCurrentYearChange(java.lang.String afterCurrentYearChange) {
		_afterCurrentYearChange = afterCurrentYearChange;

		setScopedAttribute("afterCurrentYearChange", afterCurrentYearChange);
	}

	public void setAfterDateFormatChange(java.lang.String afterDateFormatChange) {
		_afterDateFormatChange = afterDateFormatChange;

		setScopedAttribute("afterDateFormatChange", afterDateFormatChange);
	}

	public void setAfterDatesChange(java.lang.String afterDatesChange) {
		_afterDatesChange = afterDatesChange;

		setScopedAttribute("afterDatesChange", afterDatesChange);
	}

	public void setAfterDayNodeChange(java.lang.String afterDayNodeChange) {
		_afterDayNodeChange = afterDayNodeChange;

		setScopedAttribute("afterDayNodeChange", afterDayNodeChange);
	}

	public void setAfterDayNodeNameChange(java.lang.String afterDayNodeNameChange) {
		_afterDayNodeNameChange = afterDayNodeNameChange;

		setScopedAttribute("afterDayNodeNameChange", afterDayNodeNameChange);
	}

	public void setAfterDestroy(java.lang.String afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.String afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterDisabledChange(java.lang.String afterDisabledChange) {
		_afterDisabledChange = afterDisabledChange;

		setScopedAttribute("afterDisabledChange", afterDisabledChange);
	}

	public void setAfterFirstDayOfWeekChange(java.lang.String afterFirstDayOfWeekChange) {
		_afterFirstDayOfWeekChange = afterFirstDayOfWeekChange;

		setScopedAttribute("afterFirstDayOfWeekChange", afterFirstDayOfWeekChange);
	}

	public void setAfterFocusedChange(java.lang.String afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterHeightChange(java.lang.String afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterHideClassChange(java.lang.String afterHideClassChange) {
		_afterHideClassChange = afterHideClassChange;

		setScopedAttribute("afterHideClassChange", afterHideClassChange);
	}

	public void setAfterHideDelayChange(java.lang.String afterHideDelayChange) {
		_afterHideDelayChange = afterHideDelayChange;

		setScopedAttribute("afterHideDelayChange", afterHideDelayChange);
	}

	public void setAfterHideOnChange(java.lang.String afterHideOnChange) {
		_afterHideOnChange = afterHideOnChange;

		setScopedAttribute("afterHideOnChange", afterHideOnChange);
	}

	public void setAfterHideOnDocumentClickChange(java.lang.String afterHideOnDocumentClickChange) {
		_afterHideOnDocumentClickChange = afterHideOnDocumentClickChange;

		setScopedAttribute("afterHideOnDocumentClickChange", afterHideOnDocumentClickChange);
	}

	public void setAfterIdChange(java.lang.String afterIdChange) {
		_afterIdChange = afterIdChange;

		setScopedAttribute("afterIdChange", afterIdChange);
	}

	public void setAfterInit(java.lang.String afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.String afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterMaxDateChange(java.lang.String afterMaxDateChange) {
		_afterMaxDateChange = afterMaxDateChange;

		setScopedAttribute("afterMaxDateChange", afterMaxDateChange);
	}

	public void setAfterMinDateChange(java.lang.String afterMinDateChange) {
		_afterMinDateChange = afterMinDateChange;

		setScopedAttribute("afterMinDateChange", afterMinDateChange);
	}

	public void setAfterMonthNodeChange(java.lang.String afterMonthNodeChange) {
		_afterMonthNodeChange = afterMonthNodeChange;

		setScopedAttribute("afterMonthNodeChange", afterMonthNodeChange);
	}

	public void setAfterMonthNodeNameChange(java.lang.String afterMonthNodeNameChange) {
		_afterMonthNodeNameChange = afterMonthNodeNameChange;

		setScopedAttribute("afterMonthNodeNameChange", afterMonthNodeNameChange);
	}

	public void setAfterPopulateDayChange(java.lang.String afterPopulateDayChange) {
		_afterPopulateDayChange = afterPopulateDayChange;

		setScopedAttribute("afterPopulateDayChange", afterPopulateDayChange);
	}

	public void setAfterPopulateMonthChange(java.lang.String afterPopulateMonthChange) {
		_afterPopulateMonthChange = afterPopulateMonthChange;

		setScopedAttribute("afterPopulateMonthChange", afterPopulateMonthChange);
	}

	public void setAfterPopulateYearChange(java.lang.String afterPopulateYearChange) {
		_afterPopulateYearChange = afterPopulateYearChange;

		setScopedAttribute("afterPopulateYearChange", afterPopulateYearChange);
	}

	public void setAfterRenderChange(java.lang.String afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderedChange(java.lang.String afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterSelectMultipleDatesChange(java.lang.String afterSelectMultipleDatesChange) {
		_afterSelectMultipleDatesChange = afterSelectMultipleDatesChange;

		setScopedAttribute("afterSelectMultipleDatesChange", afterSelectMultipleDatesChange);
	}

	public void setAfterSelectWrapperNodeChange(java.lang.String afterSelectWrapperNodeChange) {
		_afterSelectWrapperNodeChange = afterSelectWrapperNodeChange;

		setScopedAttribute("afterSelectWrapperNodeChange", afterSelectWrapperNodeChange);
	}

	public void setAfterSetValueChange(java.lang.String afterSetValueChange) {
		_afterSetValueChange = afterSetValueChange;

		setScopedAttribute("afterSetValueChange", afterSetValueChange);
	}

	public void setAfterShowDelayChange(java.lang.String afterShowDelayChange) {
		_afterShowDelayChange = afterShowDelayChange;

		setScopedAttribute("afterShowDelayChange", afterShowDelayChange);
	}

	public void setAfterShowOnChange(java.lang.String afterShowOnChange) {
		_afterShowOnChange = afterShowOnChange;

		setScopedAttribute("afterShowOnChange", afterShowOnChange);
	}

	public void setAfterSrcNodeChange(java.lang.String afterSrcNodeChange) {
		_afterSrcNodeChange = afterSrcNodeChange;

		setScopedAttribute("afterSrcNodeChange", afterSrcNodeChange);
	}

	public void setAfterStackChange(java.lang.String afterStackChange) {
		_afterStackChange = afterStackChange;

		setScopedAttribute("afterStackChange", afterStackChange);
	}

	public void setAfterStringsChange(java.lang.String afterStringsChange) {
		_afterStringsChange = afterStringsChange;

		setScopedAttribute("afterStringsChange", afterStringsChange);
	}

	public void setAfterTabIndexChange(java.lang.String afterTabIndexChange) {
		_afterTabIndexChange = afterTabIndexChange;

		setScopedAttribute("afterTabIndexChange", afterTabIndexChange);
	}

	public void setAfterTriggerChange(java.lang.String afterTriggerChange) {
		_afterTriggerChange = afterTriggerChange;

		setScopedAttribute("afterTriggerChange", afterTriggerChange);
	}

	public void setAfterVisibleChange(java.lang.String afterVisibleChange) {
		_afterVisibleChange = afterVisibleChange;

		setScopedAttribute("afterVisibleChange", afterVisibleChange);
	}

	public void setAfterContentUpdate(java.lang.String afterContentUpdate) {
		_afterContentUpdate = afterContentUpdate;

		setScopedAttribute("afterContentUpdate", afterContentUpdate);
	}

	public void setAfterRender(java.lang.String afterRender) {
		_afterRender = afterRender;

		setScopedAttribute("afterRender", afterRender);
	}

	public void setAfterWidthChange(java.lang.String afterWidthChange) {
		_afterWidthChange = afterWidthChange;

		setScopedAttribute("afterWidthChange", afterWidthChange);
	}

	public void setAfterYearNodeChange(java.lang.String afterYearNodeChange) {
		_afterYearNodeChange = afterYearNodeChange;

		setScopedAttribute("afterYearNodeChange", afterYearNodeChange);
	}

	public void setAfterYearNodeNameChange(java.lang.String afterYearNodeNameChange) {
		_afterYearNodeNameChange = afterYearNodeNameChange;

		setScopedAttribute("afterYearNodeNameChange", afterYearNodeNameChange);
	}

	public void setAfterYearRangeChange(java.lang.String afterYearRangeChange) {
		_afterYearRangeChange = afterYearRangeChange;

		setScopedAttribute("afterYearRangeChange", afterYearRangeChange);
	}

	public void setOnAlignChange(java.lang.String onAlignChange) {
		_onAlignChange = onAlignChange;

		setScopedAttribute("onAlignChange", onAlignChange);
	}

	public void setOnAppendOrderChange(java.lang.String onAppendOrderChange) {
		_onAppendOrderChange = onAppendOrderChange;

		setScopedAttribute("onAppendOrderChange", onAppendOrderChange);
	}

	public void setOnBaseNameChange(java.lang.String onBaseNameChange) {
		_onBaseNameChange = onBaseNameChange;

		setScopedAttribute("onBaseNameChange", onBaseNameChange);
	}

	public void setOnBoundingBoxChange(java.lang.String onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnButtonNodeChange(java.lang.String onButtonNodeChange) {
		_onButtonNodeChange = onButtonNodeChange;

		setScopedAttribute("onButtonNodeChange", onButtonNodeChange);
	}

	public void setOnCancellableHideChange(java.lang.String onCancellableHideChange) {
		_onCancellableHideChange = onCancellableHideChange;

		setScopedAttribute("onCancellableHideChange", onCancellableHideChange);
	}

	public void setOnContentBoxChange(java.lang.String onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.String onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
	}

	public void setOnCurrentDayChange(java.lang.String onCurrentDayChange) {
		_onCurrentDayChange = onCurrentDayChange;

		setScopedAttribute("onCurrentDayChange", onCurrentDayChange);
	}

	public void setOnCurrentMonthChange(java.lang.String onCurrentMonthChange) {
		_onCurrentMonthChange = onCurrentMonthChange;

		setScopedAttribute("onCurrentMonthChange", onCurrentMonthChange);
	}

	public void setOnCurrentNodeChange(java.lang.String onCurrentNodeChange) {
		_onCurrentNodeChange = onCurrentNodeChange;

		setScopedAttribute("onCurrentNodeChange", onCurrentNodeChange);
	}

	public void setOnCurrentYearChange(java.lang.String onCurrentYearChange) {
		_onCurrentYearChange = onCurrentYearChange;

		setScopedAttribute("onCurrentYearChange", onCurrentYearChange);
	}

	public void setOnDateFormatChange(java.lang.String onDateFormatChange) {
		_onDateFormatChange = onDateFormatChange;

		setScopedAttribute("onDateFormatChange", onDateFormatChange);
	}

	public void setOnDatesChange(java.lang.String onDatesChange) {
		_onDatesChange = onDatesChange;

		setScopedAttribute("onDatesChange", onDatesChange);
	}

	public void setOnDayNodeChange(java.lang.String onDayNodeChange) {
		_onDayNodeChange = onDayNodeChange;

		setScopedAttribute("onDayNodeChange", onDayNodeChange);
	}

	public void setOnDayNodeNameChange(java.lang.String onDayNodeNameChange) {
		_onDayNodeNameChange = onDayNodeNameChange;

		setScopedAttribute("onDayNodeNameChange", onDayNodeNameChange);
	}

	public void setOnDestroy(java.lang.String onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.String onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnDisabledChange(java.lang.String onDisabledChange) {
		_onDisabledChange = onDisabledChange;

		setScopedAttribute("onDisabledChange", onDisabledChange);
	}

	public void setOnFirstDayOfWeekChange(java.lang.String onFirstDayOfWeekChange) {
		_onFirstDayOfWeekChange = onFirstDayOfWeekChange;

		setScopedAttribute("onFirstDayOfWeekChange", onFirstDayOfWeekChange);
	}

	public void setOnFocusedChange(java.lang.String onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnHeightChange(java.lang.String onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnHideClassChange(java.lang.String onHideClassChange) {
		_onHideClassChange = onHideClassChange;

		setScopedAttribute("onHideClassChange", onHideClassChange);
	}

	public void setOnHideDelayChange(java.lang.String onHideDelayChange) {
		_onHideDelayChange = onHideDelayChange;

		setScopedAttribute("onHideDelayChange", onHideDelayChange);
	}

	public void setOnHideOnChange(java.lang.String onHideOnChange) {
		_onHideOnChange = onHideOnChange;

		setScopedAttribute("onHideOnChange", onHideOnChange);
	}

	public void setOnHideOnDocumentClickChange(java.lang.String onHideOnDocumentClickChange) {
		_onHideOnDocumentClickChange = onHideOnDocumentClickChange;

		setScopedAttribute("onHideOnDocumentClickChange", onHideOnDocumentClickChange);
	}

	public void setOnIdChange(java.lang.String onIdChange) {
		_onIdChange = onIdChange;

		setScopedAttribute("onIdChange", onIdChange);
	}

	public void setOnInit(java.lang.String onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.String onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnMaxDateChange(java.lang.String onMaxDateChange) {
		_onMaxDateChange = onMaxDateChange;

		setScopedAttribute("onMaxDateChange", onMaxDateChange);
	}

	public void setOnMinDateChange(java.lang.String onMinDateChange) {
		_onMinDateChange = onMinDateChange;

		setScopedAttribute("onMinDateChange", onMinDateChange);
	}

	public void setOnMonthNodeChange(java.lang.String onMonthNodeChange) {
		_onMonthNodeChange = onMonthNodeChange;

		setScopedAttribute("onMonthNodeChange", onMonthNodeChange);
	}

	public void setOnMonthNodeNameChange(java.lang.String onMonthNodeNameChange) {
		_onMonthNodeNameChange = onMonthNodeNameChange;

		setScopedAttribute("onMonthNodeNameChange", onMonthNodeNameChange);
	}

	public void setOnPopulateDayChange(java.lang.String onPopulateDayChange) {
		_onPopulateDayChange = onPopulateDayChange;

		setScopedAttribute("onPopulateDayChange", onPopulateDayChange);
	}

	public void setOnPopulateMonthChange(java.lang.String onPopulateMonthChange) {
		_onPopulateMonthChange = onPopulateMonthChange;

		setScopedAttribute("onPopulateMonthChange", onPopulateMonthChange);
	}

	public void setOnPopulateYearChange(java.lang.String onPopulateYearChange) {
		_onPopulateYearChange = onPopulateYearChange;

		setScopedAttribute("onPopulateYearChange", onPopulateYearChange);
	}

	public void setOnRenderChange(java.lang.String onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderedChange(java.lang.String onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnSelectMultipleDatesChange(java.lang.String onSelectMultipleDatesChange) {
		_onSelectMultipleDatesChange = onSelectMultipleDatesChange;

		setScopedAttribute("onSelectMultipleDatesChange", onSelectMultipleDatesChange);
	}

	public void setOnSelectWrapperNodeChange(java.lang.String onSelectWrapperNodeChange) {
		_onSelectWrapperNodeChange = onSelectWrapperNodeChange;

		setScopedAttribute("onSelectWrapperNodeChange", onSelectWrapperNodeChange);
	}

	public void setOnSetValueChange(java.lang.String onSetValueChange) {
		_onSetValueChange = onSetValueChange;

		setScopedAttribute("onSetValueChange", onSetValueChange);
	}

	public void setOnShowDelayChange(java.lang.String onShowDelayChange) {
		_onShowDelayChange = onShowDelayChange;

		setScopedAttribute("onShowDelayChange", onShowDelayChange);
	}

	public void setOnShowOnChange(java.lang.String onShowOnChange) {
		_onShowOnChange = onShowOnChange;

		setScopedAttribute("onShowOnChange", onShowOnChange);
	}

	public void setOnSrcNodeChange(java.lang.String onSrcNodeChange) {
		_onSrcNodeChange = onSrcNodeChange;

		setScopedAttribute("onSrcNodeChange", onSrcNodeChange);
	}

	public void setOnStackChange(java.lang.String onStackChange) {
		_onStackChange = onStackChange;

		setScopedAttribute("onStackChange", onStackChange);
	}

	public void setOnStringsChange(java.lang.String onStringsChange) {
		_onStringsChange = onStringsChange;

		setScopedAttribute("onStringsChange", onStringsChange);
	}

	public void setOnTabIndexChange(java.lang.String onTabIndexChange) {
		_onTabIndexChange = onTabIndexChange;

		setScopedAttribute("onTabIndexChange", onTabIndexChange);
	}

	public void setOnTriggerChange(java.lang.String onTriggerChange) {
		_onTriggerChange = onTriggerChange;

		setScopedAttribute("onTriggerChange", onTriggerChange);
	}

	public void setOnVisibleChange(java.lang.String onVisibleChange) {
		_onVisibleChange = onVisibleChange;

		setScopedAttribute("onVisibleChange", onVisibleChange);
	}

	public void setOnContentUpdate(java.lang.String onContentUpdate) {
		_onContentUpdate = onContentUpdate;

		setScopedAttribute("onContentUpdate", onContentUpdate);
	}

	public void setOnRender(java.lang.String onRender) {
		_onRender = onRender;

		setScopedAttribute("onRender", onRender);
	}

	public void setOnWidthChange(java.lang.String onWidthChange) {
		_onWidthChange = onWidthChange;

		setScopedAttribute("onWidthChange", onWidthChange);
	}

	public void setOnYearNodeChange(java.lang.String onYearNodeChange) {
		_onYearNodeChange = onYearNodeChange;

		setScopedAttribute("onYearNodeChange", onYearNodeChange);
	}

	public void setOnYearNodeNameChange(java.lang.String onYearNodeNameChange) {
		_onYearNodeNameChange = onYearNodeNameChange;

		setScopedAttribute("onYearNodeNameChange", onYearNodeNameChange);
	}

	public void setOnYearRangeChange(java.lang.String onYearRangeChange) {
		_onYearRangeChange = onYearRangeChange;

		setScopedAttribute("onYearRangeChange", onYearRangeChange);
	}


	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "align", _align);
		setNamespacedAttribute(request, "appendOrder", _appendOrder);
		setNamespacedAttribute(request, "baseName", _baseName);
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "buttonNode", _buttonNode);
		setNamespacedAttribute(request, "cancellableHide", _cancellableHide);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "currentDay", _currentDay);
		setNamespacedAttribute(request, "currentMonth", _currentMonth);
		setNamespacedAttribute(request, "currentNode", _currentNode);
		setNamespacedAttribute(request, "currentYear", _currentYear);
		setNamespacedAttribute(request, "dateFormat", _dateFormat);
		setNamespacedAttribute(request, "dates", _dates);
		setNamespacedAttribute(request, "dayNode", _dayNode);
		setNamespacedAttribute(request, "dayNodeName", _dayNodeName);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "firstDayOfWeek", _firstDayOfWeek);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "hideDelay", _hideDelay);
		setNamespacedAttribute(request, "hideOn", _hideOn);
		setNamespacedAttribute(request, "hideOnDocumentClick", _hideOnDocumentClick);
		setNamespacedAttribute(request, "datepickerselectId", _datepickerselectId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "maxDate", _maxDate);
		setNamespacedAttribute(request, "minDate", _minDate);
		setNamespacedAttribute(request, "monthNode", _monthNode);
		setNamespacedAttribute(request, "monthNodeName", _monthNodeName);
		setNamespacedAttribute(request, "populateDay", _populateDay);
		setNamespacedAttribute(request, "populateMonth", _populateMonth);
		setNamespacedAttribute(request, "populateYear", _populateYear);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "selectMultipleDates", _selectMultipleDates);
		setNamespacedAttribute(request, "selectWrapperNode", _selectWrapperNode);
		setNamespacedAttribute(request, "setValue", _setValue);
		setNamespacedAttribute(request, "showDelay", _showDelay);
		setNamespacedAttribute(request, "showOn", _showOn);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "stack", _stack);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "trigger", _trigger);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "yearNode", _yearNode);
		setNamespacedAttribute(request, "yearNodeName", _yearNodeName);
		setNamespacedAttribute(request, "yearRange", _yearRange);
		setNamespacedAttribute(request, "afterAlignChange", _afterAlignChange);
		setNamespacedAttribute(request, "afterAppendOrderChange", _afterAppendOrderChange);
		setNamespacedAttribute(request, "afterBaseNameChange", _afterBaseNameChange);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterButtonNodeChange", _afterButtonNodeChange);
		setNamespacedAttribute(request, "afterCancellableHideChange", _afterCancellableHideChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterCurrentDayChange", _afterCurrentDayChange);
		setNamespacedAttribute(request, "afterCurrentMonthChange", _afterCurrentMonthChange);
		setNamespacedAttribute(request, "afterCurrentNodeChange", _afterCurrentNodeChange);
		setNamespacedAttribute(request, "afterCurrentYearChange", _afterCurrentYearChange);
		setNamespacedAttribute(request, "afterDateFormatChange", _afterDateFormatChange);
		setNamespacedAttribute(request, "afterDatesChange", _afterDatesChange);
		setNamespacedAttribute(request, "afterDayNodeChange", _afterDayNodeChange);
		setNamespacedAttribute(request, "afterDayNodeNameChange", _afterDayNodeNameChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterFirstDayOfWeekChange", _afterFirstDayOfWeekChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterHideClassChange", _afterHideClassChange);
		setNamespacedAttribute(request, "afterHideDelayChange", _afterHideDelayChange);
		setNamespacedAttribute(request, "afterHideOnChange", _afterHideOnChange);
		setNamespacedAttribute(request, "afterHideOnDocumentClickChange", _afterHideOnDocumentClickChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterMaxDateChange", _afterMaxDateChange);
		setNamespacedAttribute(request, "afterMinDateChange", _afterMinDateChange);
		setNamespacedAttribute(request, "afterMonthNodeChange", _afterMonthNodeChange);
		setNamespacedAttribute(request, "afterMonthNodeNameChange", _afterMonthNodeNameChange);
		setNamespacedAttribute(request, "afterPopulateDayChange", _afterPopulateDayChange);
		setNamespacedAttribute(request, "afterPopulateMonthChange", _afterPopulateMonthChange);
		setNamespacedAttribute(request, "afterPopulateYearChange", _afterPopulateYearChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterSelectMultipleDatesChange", _afterSelectMultipleDatesChange);
		setNamespacedAttribute(request, "afterSelectWrapperNodeChange", _afterSelectWrapperNodeChange);
		setNamespacedAttribute(request, "afterSetValueChange", _afterSetValueChange);
		setNamespacedAttribute(request, "afterShowDelayChange", _afterShowDelayChange);
		setNamespacedAttribute(request, "afterShowOnChange", _afterShowOnChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStackChange", _afterStackChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterTriggerChange", _afterTriggerChange);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "afterYearNodeChange", _afterYearNodeChange);
		setNamespacedAttribute(request, "afterYearNodeNameChange", _afterYearNodeNameChange);
		setNamespacedAttribute(request, "afterYearRangeChange", _afterYearRangeChange);
		setNamespacedAttribute(request, "onAlignChange", _onAlignChange);
		setNamespacedAttribute(request, "onAppendOrderChange", _onAppendOrderChange);
		setNamespacedAttribute(request, "onBaseNameChange", _onBaseNameChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onButtonNodeChange", _onButtonNodeChange);
		setNamespacedAttribute(request, "onCancellableHideChange", _onCancellableHideChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onCurrentDayChange", _onCurrentDayChange);
		setNamespacedAttribute(request, "onCurrentMonthChange", _onCurrentMonthChange);
		setNamespacedAttribute(request, "onCurrentNodeChange", _onCurrentNodeChange);
		setNamespacedAttribute(request, "onCurrentYearChange", _onCurrentYearChange);
		setNamespacedAttribute(request, "onDateFormatChange", _onDateFormatChange);
		setNamespacedAttribute(request, "onDatesChange", _onDatesChange);
		setNamespacedAttribute(request, "onDayNodeChange", _onDayNodeChange);
		setNamespacedAttribute(request, "onDayNodeNameChange", _onDayNodeNameChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onFirstDayOfWeekChange", _onFirstDayOfWeekChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onHideClassChange", _onHideClassChange);
		setNamespacedAttribute(request, "onHideDelayChange", _onHideDelayChange);
		setNamespacedAttribute(request, "onHideOnChange", _onHideOnChange);
		setNamespacedAttribute(request, "onHideOnDocumentClickChange", _onHideOnDocumentClickChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onMaxDateChange", _onMaxDateChange);
		setNamespacedAttribute(request, "onMinDateChange", _onMinDateChange);
		setNamespacedAttribute(request, "onMonthNodeChange", _onMonthNodeChange);
		setNamespacedAttribute(request, "onMonthNodeNameChange", _onMonthNodeNameChange);
		setNamespacedAttribute(request, "onPopulateDayChange", _onPopulateDayChange);
		setNamespacedAttribute(request, "onPopulateMonthChange", _onPopulateMonthChange);
		setNamespacedAttribute(request, "onPopulateYearChange", _onPopulateYearChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onSelectMultipleDatesChange", _onSelectMultipleDatesChange);
		setNamespacedAttribute(request, "onSelectWrapperNodeChange", _onSelectWrapperNodeChange);
		setNamespacedAttribute(request, "onSetValueChange", _onSetValueChange);
		setNamespacedAttribute(request, "onShowDelayChange", _onShowDelayChange);
		setNamespacedAttribute(request, "onShowOnChange", _onShowOnChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStackChange", _onStackChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onTriggerChange", _onTriggerChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
		setNamespacedAttribute(request, "onYearNodeChange", _onYearNodeChange);
		setNamespacedAttribute(request, "onYearNodeNameChange", _onYearNodeNameChange);
		setNamespacedAttribute(request, "onYearRangeChange", _onYearRangeChange);
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:date-picker-select:";

	private static final String _PAGE =
		"/html/taglib/alloy/date_picker_select/page.jsp";

	private java.lang.Object _align;
	private java.lang.String _appendOrder;
	private java.lang.String _baseName;
	private java.lang.String _boundingBox;
	private java.lang.String _buttonNode;
	private java.lang.Boolean _cancellableHide;
	private java.lang.String _contentBox;
	private java.lang.String _cssClass;
	private java.lang.Number _currentDay;
	private java.lang.Number _currentMonth;
	private java.lang.String _currentNode;
	private java.lang.Number _currentYear;
	private java.lang.String _dateFormat;
	private java.lang.String _dates;
	private java.lang.String _dayNode;
	private java.lang.String _dayNodeName;
	private java.lang.Boolean _destroyed;
	private java.lang.Boolean _disabled;
	private java.lang.Number _firstDayOfWeek;
	private java.lang.Boolean _focused;
	private java.lang.String _height;
	private java.lang.String _hideClass;
	private java.lang.Number _hideDelay;
	private java.lang.String _hideOn;
	private java.lang.Boolean _hideOnDocumentClick;
	private java.lang.String _datepickerselectId;
	private java.lang.Boolean _initialized;
	private java.lang.String _maxDate;
	private java.lang.String _minDate;
	private java.lang.String _monthNode;
	private java.lang.String _monthNodeName;
	private java.lang.Boolean _populateDay;
	private java.lang.Boolean _populateMonth;
	private java.lang.Boolean _populateYear;
	private java.lang.Boolean _render;
	private java.lang.Boolean _rendered;
	private java.lang.Boolean _selectMultipleDates;
	private java.lang.String _selectWrapperNode;
	private java.lang.Boolean _setValue;
	private java.lang.Number _showDelay;
	private java.lang.String _showOn;
	private java.lang.String _srcNode;
	private java.lang.Boolean _stack;
	private java.lang.Object _strings;
	private java.lang.Number _tabIndex;
	private java.lang.String _trigger;
	private java.lang.Boolean _visible;
	private java.lang.String _width;
	private java.lang.String _yearNode;
	private java.lang.String _yearNodeName;
	private java.lang.String _yearRange;
	private java.lang.String _afterAlignChange;
	private java.lang.String _afterAppendOrderChange;
	private java.lang.String _afterBaseNameChange;
	private java.lang.String _afterBoundingBoxChange;
	private java.lang.String _afterButtonNodeChange;
	private java.lang.String _afterCancellableHideChange;
	private java.lang.String _afterContentBoxChange;
	private java.lang.String _afterCssClassChange;
	private java.lang.String _afterCurrentDayChange;
	private java.lang.String _afterCurrentMonthChange;
	private java.lang.String _afterCurrentNodeChange;
	private java.lang.String _afterCurrentYearChange;
	private java.lang.String _afterDateFormatChange;
	private java.lang.String _afterDatesChange;
	private java.lang.String _afterDayNodeChange;
	private java.lang.String _afterDayNodeNameChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterDisabledChange;
	private java.lang.String _afterFirstDayOfWeekChange;
	private java.lang.String _afterFocusedChange;
	private java.lang.String _afterHeightChange;
	private java.lang.String _afterHideClassChange;
	private java.lang.String _afterHideDelayChange;
	private java.lang.String _afterHideOnChange;
	private java.lang.String _afterHideOnDocumentClickChange;
	private java.lang.String _afterIdChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterMaxDateChange;
	private java.lang.String _afterMinDateChange;
	private java.lang.String _afterMonthNodeChange;
	private java.lang.String _afterMonthNodeNameChange;
	private java.lang.String _afterPopulateDayChange;
	private java.lang.String _afterPopulateMonthChange;
	private java.lang.String _afterPopulateYearChange;
	private java.lang.String _afterRenderChange;
	private java.lang.String _afterRenderedChange;
	private java.lang.String _afterSelectMultipleDatesChange;
	private java.lang.String _afterSelectWrapperNodeChange;
	private java.lang.String _afterSetValueChange;
	private java.lang.String _afterShowDelayChange;
	private java.lang.String _afterShowOnChange;
	private java.lang.String _afterSrcNodeChange;
	private java.lang.String _afterStackChange;
	private java.lang.String _afterStringsChange;
	private java.lang.String _afterTabIndexChange;
	private java.lang.String _afterTriggerChange;
	private java.lang.String _afterVisibleChange;
	private java.lang.String _afterContentUpdate;
	private java.lang.String _afterRender;
	private java.lang.String _afterWidthChange;
	private java.lang.String _afterYearNodeChange;
	private java.lang.String _afterYearNodeNameChange;
	private java.lang.String _afterYearRangeChange;
	private java.lang.String _onAlignChange;
	private java.lang.String _onAppendOrderChange;
	private java.lang.String _onBaseNameChange;
	private java.lang.String _onBoundingBoxChange;
	private java.lang.String _onButtonNodeChange;
	private java.lang.String _onCancellableHideChange;
	private java.lang.String _onContentBoxChange;
	private java.lang.String _onCssClassChange;
	private java.lang.String _onCurrentDayChange;
	private java.lang.String _onCurrentMonthChange;
	private java.lang.String _onCurrentNodeChange;
	private java.lang.String _onCurrentYearChange;
	private java.lang.String _onDateFormatChange;
	private java.lang.String _onDatesChange;
	private java.lang.String _onDayNodeChange;
	private java.lang.String _onDayNodeNameChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onDisabledChange;
	private java.lang.String _onFirstDayOfWeekChange;
	private java.lang.String _onFocusedChange;
	private java.lang.String _onHeightChange;
	private java.lang.String _onHideClassChange;
	private java.lang.String _onHideDelayChange;
	private java.lang.String _onHideOnChange;
	private java.lang.String _onHideOnDocumentClickChange;
	private java.lang.String _onIdChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onMaxDateChange;
	private java.lang.String _onMinDateChange;
	private java.lang.String _onMonthNodeChange;
	private java.lang.String _onMonthNodeNameChange;
	private java.lang.String _onPopulateDayChange;
	private java.lang.String _onPopulateMonthChange;
	private java.lang.String _onPopulateYearChange;
	private java.lang.String _onRenderChange;
	private java.lang.String _onRenderedChange;
	private java.lang.String _onSelectMultipleDatesChange;
	private java.lang.String _onSelectWrapperNodeChange;
	private java.lang.String _onSetValueChange;
	private java.lang.String _onShowDelayChange;
	private java.lang.String _onShowOnChange;
	private java.lang.String _onSrcNodeChange;
	private java.lang.String _onStackChange;
	private java.lang.String _onStringsChange;
	private java.lang.String _onTabIndexChange;
	private java.lang.String _onTriggerChange;
	private java.lang.String _onVisibleChange;
	private java.lang.String _onContentUpdate;
	private java.lang.String _onRender;
	private java.lang.String _onWidthChange;
	private java.lang.String _onYearNodeChange;
	private java.lang.String _onYearNodeNameChange;
	private java.lang.String _onYearRangeChange;

}
