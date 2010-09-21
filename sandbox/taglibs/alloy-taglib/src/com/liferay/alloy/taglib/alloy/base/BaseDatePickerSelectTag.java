package com.liferay.alloy.taglib.alloy.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseDatePickerSelectTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseDatePickerSelectTag extends com.liferay.alloy.taglib.alloy_util.IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.Object getAppendOrder() {
		return _appendOrder;
	}

	public java.lang.String getBoundingBox() {
		return _boundingBox;
	}

	public java.lang.String getButtonNode() {
		return _buttonNode;
	}

	public java.lang.Object getCalendar() {
		return _calendar;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.String getCssClass() {
		return _cssClass;
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

	public java.lang.Boolean getFocused() {
		return _focused;
	}

	public java.lang.Object getHeight() {
		return _height;
	}

	public java.lang.String getHideClass() {
		return _hideClass;
	}

	public java.lang.String getDatepickerselectId() {
		return _datepickerselectId;
	}

	public java.lang.Boolean getInitialized() {
		return _initialized;
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

	public java.lang.Object getRender() {
		return _render;
	}

	public java.lang.Boolean getRendered() {
		return _rendered;
	}

	public java.lang.String getSelectWrapperNode() {
		return _selectWrapperNode;
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

	public java.lang.Object getTrigger() {
		return _trigger;
	}

	public java.lang.Boolean getVisible() {
		return _visible;
	}

	public java.lang.Object getWidth() {
		return _width;
	}

	public java.lang.String getYearNode() {
		return _yearNode;
	}

	public java.lang.String getYearNodeName() {
		return _yearNodeName;
	}

	public java.lang.Object getYearRange() {
		return _yearRange;
	}

	public java.lang.Object getAfterAppendOrderChange() {
		return _afterAppendOrderChange;
	}

	public java.lang.Object getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.Object getAfterButtonNodeChange() {
		return _afterButtonNodeChange;
	}

	public java.lang.Object getAfterCalendarChange() {
		return _afterCalendarChange;
	}

	public java.lang.Object getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.Object getAfterCssClassChange() {
		return _afterCssClassChange;
	}

	public java.lang.Object getAfterDayNodeChange() {
		return _afterDayNodeChange;
	}

	public java.lang.Object getAfterDayNodeNameChange() {
		return _afterDayNodeNameChange;
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

	public java.lang.Object getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.Object getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.Object getAfterHideClassChange() {
		return _afterHideClassChange;
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

	public java.lang.Object getAfterMonthNodeChange() {
		return _afterMonthNodeChange;
	}

	public java.lang.Object getAfterMonthNodeNameChange() {
		return _afterMonthNodeNameChange;
	}

	public java.lang.Object getAfterPopulateDayChange() {
		return _afterPopulateDayChange;
	}

	public java.lang.Object getAfterPopulateMonthChange() {
		return _afterPopulateMonthChange;
	}

	public java.lang.Object getAfterPopulateYearChange() {
		return _afterPopulateYearChange;
	}

	public java.lang.Object getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.Object getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.Object getAfterSelectWrapperNodeChange() {
		return _afterSelectWrapperNodeChange;
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

	public java.lang.Object getAfterTriggerChange() {
		return _afterTriggerChange;
	}

	public java.lang.Object getAfterVisibleChange() {
		return _afterVisibleChange;
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

	public java.lang.Object getAfterYearNodeChange() {
		return _afterYearNodeChange;
	}

	public java.lang.Object getAfterYearNodeNameChange() {
		return _afterYearNodeNameChange;
	}

	public java.lang.Object getAfterYearRangeChange() {
		return _afterYearRangeChange;
	}

	public java.lang.Object getOnAppendOrderChange() {
		return _onAppendOrderChange;
	}

	public java.lang.Object getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.Object getOnButtonNodeChange() {
		return _onButtonNodeChange;
	}

	public java.lang.Object getOnCalendarChange() {
		return _onCalendarChange;
	}

	public java.lang.Object getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.Object getOnCssClassChange() {
		return _onCssClassChange;
	}

	public java.lang.Object getOnDayNodeChange() {
		return _onDayNodeChange;
	}

	public java.lang.Object getOnDayNodeNameChange() {
		return _onDayNodeNameChange;
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

	public java.lang.Object getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.Object getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.Object getOnHideClassChange() {
		return _onHideClassChange;
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

	public java.lang.Object getOnMonthNodeChange() {
		return _onMonthNodeChange;
	}

	public java.lang.Object getOnMonthNodeNameChange() {
		return _onMonthNodeNameChange;
	}

	public java.lang.Object getOnPopulateDayChange() {
		return _onPopulateDayChange;
	}

	public java.lang.Object getOnPopulateMonthChange() {
		return _onPopulateMonthChange;
	}

	public java.lang.Object getOnPopulateYearChange() {
		return _onPopulateYearChange;
	}

	public java.lang.Object getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.Object getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.Object getOnSelectWrapperNodeChange() {
		return _onSelectWrapperNodeChange;
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

	public java.lang.Object getOnTriggerChange() {
		return _onTriggerChange;
	}

	public java.lang.Object getOnVisibleChange() {
		return _onVisibleChange;
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

	public java.lang.Object getOnYearNodeChange() {
		return _onYearNodeChange;
	}

	public java.lang.Object getOnYearNodeNameChange() {
		return _onYearNodeNameChange;
	}

	public java.lang.Object getOnYearRangeChange() {
		return _onYearRangeChange;
	}

	public void setAppendOrder(java.lang.Object appendOrder) {
		_appendOrder = appendOrder;

		setScopedAttribute("appendOrder", appendOrder);
	}

	public void setBoundingBox(java.lang.String boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setButtonNode(java.lang.String buttonNode) {
		_buttonNode = buttonNode;

		setScopedAttribute("buttonNode", buttonNode);
	}

	public void setCalendar(java.lang.Object calendar) {
		_calendar = calendar;

		setScopedAttribute("calendar", calendar);
	}

	public void setContentBox(java.lang.String contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setCssClass(java.lang.String cssClass) {
		_cssClass = cssClass;

		setScopedAttribute("cssClass", cssClass);
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

	public void setFocused(java.lang.Boolean focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setHeight(java.lang.Object height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setHideClass(java.lang.String hideClass) {
		_hideClass = hideClass;

		setScopedAttribute("hideClass", hideClass);
	}

	public void setDatepickerselectId(java.lang.String datepickerselectId) {
		_datepickerselectId = datepickerselectId;

		setScopedAttribute("datepickerselectId", datepickerselectId);
	}

	public void setInitialized(java.lang.Boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
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

	public void setRender(java.lang.Object render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(java.lang.Boolean rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setSelectWrapperNode(java.lang.String selectWrapperNode) {
		_selectWrapperNode = selectWrapperNode;

		setScopedAttribute("selectWrapperNode", selectWrapperNode);
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

	public void setTrigger(java.lang.Object trigger) {
		_trigger = trigger;

		setScopedAttribute("trigger", trigger);
	}

	public void setVisible(java.lang.Boolean visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setWidth(java.lang.Object width) {
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

	public void setYearRange(java.lang.Object yearRange) {
		_yearRange = yearRange;

		setScopedAttribute("yearRange", yearRange);
	}

	public void setAfterAppendOrderChange(java.lang.Object afterAppendOrderChange) {
		_afterAppendOrderChange = afterAppendOrderChange;

		setScopedAttribute("afterAppendOrderChange", afterAppendOrderChange);
	}

	public void setAfterBoundingBoxChange(java.lang.Object afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterButtonNodeChange(java.lang.Object afterButtonNodeChange) {
		_afterButtonNodeChange = afterButtonNodeChange;

		setScopedAttribute("afterButtonNodeChange", afterButtonNodeChange);
	}

	public void setAfterCalendarChange(java.lang.Object afterCalendarChange) {
		_afterCalendarChange = afterCalendarChange;

		setScopedAttribute("afterCalendarChange", afterCalendarChange);
	}

	public void setAfterContentBoxChange(java.lang.Object afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.Object afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
	}

	public void setAfterDayNodeChange(java.lang.Object afterDayNodeChange) {
		_afterDayNodeChange = afterDayNodeChange;

		setScopedAttribute("afterDayNodeChange", afterDayNodeChange);
	}

	public void setAfterDayNodeNameChange(java.lang.Object afterDayNodeNameChange) {
		_afterDayNodeNameChange = afterDayNodeNameChange;

		setScopedAttribute("afterDayNodeNameChange", afterDayNodeNameChange);
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

	public void setAfterFocusedChange(java.lang.Object afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterHeightChange(java.lang.Object afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterHideClassChange(java.lang.Object afterHideClassChange) {
		_afterHideClassChange = afterHideClassChange;

		setScopedAttribute("afterHideClassChange", afterHideClassChange);
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

	public void setAfterMonthNodeChange(java.lang.Object afterMonthNodeChange) {
		_afterMonthNodeChange = afterMonthNodeChange;

		setScopedAttribute("afterMonthNodeChange", afterMonthNodeChange);
	}

	public void setAfterMonthNodeNameChange(java.lang.Object afterMonthNodeNameChange) {
		_afterMonthNodeNameChange = afterMonthNodeNameChange;

		setScopedAttribute("afterMonthNodeNameChange", afterMonthNodeNameChange);
	}

	public void setAfterPopulateDayChange(java.lang.Object afterPopulateDayChange) {
		_afterPopulateDayChange = afterPopulateDayChange;

		setScopedAttribute("afterPopulateDayChange", afterPopulateDayChange);
	}

	public void setAfterPopulateMonthChange(java.lang.Object afterPopulateMonthChange) {
		_afterPopulateMonthChange = afterPopulateMonthChange;

		setScopedAttribute("afterPopulateMonthChange", afterPopulateMonthChange);
	}

	public void setAfterPopulateYearChange(java.lang.Object afterPopulateYearChange) {
		_afterPopulateYearChange = afterPopulateYearChange;

		setScopedAttribute("afterPopulateYearChange", afterPopulateYearChange);
	}

	public void setAfterRenderChange(java.lang.Object afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderedChange(java.lang.Object afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterSelectWrapperNodeChange(java.lang.Object afterSelectWrapperNodeChange) {
		_afterSelectWrapperNodeChange = afterSelectWrapperNodeChange;

		setScopedAttribute("afterSelectWrapperNodeChange", afterSelectWrapperNodeChange);
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

	public void setAfterTriggerChange(java.lang.Object afterTriggerChange) {
		_afterTriggerChange = afterTriggerChange;

		setScopedAttribute("afterTriggerChange", afterTriggerChange);
	}

	public void setAfterVisibleChange(java.lang.Object afterVisibleChange) {
		_afterVisibleChange = afterVisibleChange;

		setScopedAttribute("afterVisibleChange", afterVisibleChange);
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

	public void setAfterYearNodeChange(java.lang.Object afterYearNodeChange) {
		_afterYearNodeChange = afterYearNodeChange;

		setScopedAttribute("afterYearNodeChange", afterYearNodeChange);
	}

	public void setAfterYearNodeNameChange(java.lang.Object afterYearNodeNameChange) {
		_afterYearNodeNameChange = afterYearNodeNameChange;

		setScopedAttribute("afterYearNodeNameChange", afterYearNodeNameChange);
	}

	public void setAfterYearRangeChange(java.lang.Object afterYearRangeChange) {
		_afterYearRangeChange = afterYearRangeChange;

		setScopedAttribute("afterYearRangeChange", afterYearRangeChange);
	}

	public void setOnAppendOrderChange(java.lang.Object onAppendOrderChange) {
		_onAppendOrderChange = onAppendOrderChange;

		setScopedAttribute("onAppendOrderChange", onAppendOrderChange);
	}

	public void setOnBoundingBoxChange(java.lang.Object onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnButtonNodeChange(java.lang.Object onButtonNodeChange) {
		_onButtonNodeChange = onButtonNodeChange;

		setScopedAttribute("onButtonNodeChange", onButtonNodeChange);
	}

	public void setOnCalendarChange(java.lang.Object onCalendarChange) {
		_onCalendarChange = onCalendarChange;

		setScopedAttribute("onCalendarChange", onCalendarChange);
	}

	public void setOnContentBoxChange(java.lang.Object onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.Object onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
	}

	public void setOnDayNodeChange(java.lang.Object onDayNodeChange) {
		_onDayNodeChange = onDayNodeChange;

		setScopedAttribute("onDayNodeChange", onDayNodeChange);
	}

	public void setOnDayNodeNameChange(java.lang.Object onDayNodeNameChange) {
		_onDayNodeNameChange = onDayNodeNameChange;

		setScopedAttribute("onDayNodeNameChange", onDayNodeNameChange);
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

	public void setOnFocusedChange(java.lang.Object onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnHeightChange(java.lang.Object onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnHideClassChange(java.lang.Object onHideClassChange) {
		_onHideClassChange = onHideClassChange;

		setScopedAttribute("onHideClassChange", onHideClassChange);
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

	public void setOnMonthNodeChange(java.lang.Object onMonthNodeChange) {
		_onMonthNodeChange = onMonthNodeChange;

		setScopedAttribute("onMonthNodeChange", onMonthNodeChange);
	}

	public void setOnMonthNodeNameChange(java.lang.Object onMonthNodeNameChange) {
		_onMonthNodeNameChange = onMonthNodeNameChange;

		setScopedAttribute("onMonthNodeNameChange", onMonthNodeNameChange);
	}

	public void setOnPopulateDayChange(java.lang.Object onPopulateDayChange) {
		_onPopulateDayChange = onPopulateDayChange;

		setScopedAttribute("onPopulateDayChange", onPopulateDayChange);
	}

	public void setOnPopulateMonthChange(java.lang.Object onPopulateMonthChange) {
		_onPopulateMonthChange = onPopulateMonthChange;

		setScopedAttribute("onPopulateMonthChange", onPopulateMonthChange);
	}

	public void setOnPopulateYearChange(java.lang.Object onPopulateYearChange) {
		_onPopulateYearChange = onPopulateYearChange;

		setScopedAttribute("onPopulateYearChange", onPopulateYearChange);
	}

	public void setOnRenderChange(java.lang.Object onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderedChange(java.lang.Object onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnSelectWrapperNodeChange(java.lang.Object onSelectWrapperNodeChange) {
		_onSelectWrapperNodeChange = onSelectWrapperNodeChange;

		setScopedAttribute("onSelectWrapperNodeChange", onSelectWrapperNodeChange);
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

	public void setOnTriggerChange(java.lang.Object onTriggerChange) {
		_onTriggerChange = onTriggerChange;

		setScopedAttribute("onTriggerChange", onTriggerChange);
	}

	public void setOnVisibleChange(java.lang.Object onVisibleChange) {
		_onVisibleChange = onVisibleChange;

		setScopedAttribute("onVisibleChange", onVisibleChange);
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

	public void setOnYearNodeChange(java.lang.Object onYearNodeChange) {
		_onYearNodeChange = onYearNodeChange;

		setScopedAttribute("onYearNodeChange", onYearNodeChange);
	}

	public void setOnYearNodeNameChange(java.lang.Object onYearNodeNameChange) {
		_onYearNodeNameChange = onYearNodeNameChange;

		setScopedAttribute("onYearNodeNameChange", onYearNodeNameChange);
	}

	public void setOnYearRangeChange(java.lang.Object onYearRangeChange) {
		_onYearRangeChange = onYearRangeChange;

		setScopedAttribute("onYearRangeChange", onYearRangeChange);
	}

	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "appendOrder", _appendOrder);
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "buttonNode", _buttonNode);
		setNamespacedAttribute(request, "calendar", _calendar);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "dayNode", _dayNode);
		setNamespacedAttribute(request, "dayNodeName", _dayNodeName);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "datepickerselectId", _datepickerselectId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "monthNode", _monthNode);
		setNamespacedAttribute(request, "monthNodeName", _monthNodeName);
		setNamespacedAttribute(request, "populateDay", _populateDay);
		setNamespacedAttribute(request, "populateMonth", _populateMonth);
		setNamespacedAttribute(request, "populateYear", _populateYear);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "selectWrapperNode", _selectWrapperNode);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "trigger", _trigger);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "yearNode", _yearNode);
		setNamespacedAttribute(request, "yearNodeName", _yearNodeName);
		setNamespacedAttribute(request, "yearRange", _yearRange);
		setNamespacedAttribute(request, "afterAppendOrderChange", _afterAppendOrderChange);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterButtonNodeChange", _afterButtonNodeChange);
		setNamespacedAttribute(request, "afterCalendarChange", _afterCalendarChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterDayNodeChange", _afterDayNodeChange);
		setNamespacedAttribute(request, "afterDayNodeNameChange", _afterDayNodeNameChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterHideClassChange", _afterHideClassChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterMonthNodeChange", _afterMonthNodeChange);
		setNamespacedAttribute(request, "afterMonthNodeNameChange", _afterMonthNodeNameChange);
		setNamespacedAttribute(request, "afterPopulateDayChange", _afterPopulateDayChange);
		setNamespacedAttribute(request, "afterPopulateMonthChange", _afterPopulateMonthChange);
		setNamespacedAttribute(request, "afterPopulateYearChange", _afterPopulateYearChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterSelectWrapperNodeChange", _afterSelectWrapperNodeChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
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
		setNamespacedAttribute(request, "onAppendOrderChange", _onAppendOrderChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onButtonNodeChange", _onButtonNodeChange);
		setNamespacedAttribute(request, "onCalendarChange", _onCalendarChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onDayNodeChange", _onDayNodeChange);
		setNamespacedAttribute(request, "onDayNodeNameChange", _onDayNodeNameChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onHideClassChange", _onHideClassChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onMonthNodeChange", _onMonthNodeChange);
		setNamespacedAttribute(request, "onMonthNodeNameChange", _onMonthNodeNameChange);
		setNamespacedAttribute(request, "onPopulateDayChange", _onPopulateDayChange);
		setNamespacedAttribute(request, "onPopulateMonthChange", _onPopulateMonthChange);
		setNamespacedAttribute(request, "onPopulateYearChange", _onPopulateYearChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onSelectWrapperNodeChange", _onSelectWrapperNodeChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
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

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:date-picker-select:";

	private static final String _PAGE =
		"/html/taglib/alloy/date_picker_select/page.jsp";

	private java.lang.Object _appendOrder;
	private java.lang.String _boundingBox;
	private java.lang.String _buttonNode;
	private java.lang.Object _calendar;
	private java.lang.String _contentBox;
	private java.lang.String _cssClass;
	private java.lang.String _dayNode;
	private java.lang.String _dayNodeName;
	private java.lang.Boolean _destroyed;
	private java.lang.Boolean _disabled;
	private java.lang.Boolean _focused;
	private java.lang.Object _height;
	private java.lang.String _hideClass;
	private java.lang.String _datepickerselectId;
	private java.lang.Boolean _initialized;
	private java.lang.String _monthNode;
	private java.lang.String _monthNodeName;
	private java.lang.Boolean _populateDay;
	private java.lang.Boolean _populateMonth;
	private java.lang.Boolean _populateYear;
	private java.lang.Object _render;
	private java.lang.Boolean _rendered;
	private java.lang.String _selectWrapperNode;
	private java.lang.String _srcNode;
	private java.lang.Object _strings;
	private java.lang.Object _tabIndex;
	private java.lang.Object _trigger;
	private java.lang.Boolean _visible;
	private java.lang.Object _width;
	private java.lang.String _yearNode;
	private java.lang.String _yearNodeName;
	private java.lang.Object _yearRange;
	private java.lang.Object _afterAppendOrderChange;
	private java.lang.Object _afterBoundingBoxChange;
	private java.lang.Object _afterButtonNodeChange;
	private java.lang.Object _afterCalendarChange;
	private java.lang.Object _afterContentBoxChange;
	private java.lang.Object _afterCssClassChange;
	private java.lang.Object _afterDayNodeChange;
	private java.lang.Object _afterDayNodeNameChange;
	private java.lang.Object _afterDestroy;
	private java.lang.Object _afterDestroyedChange;
	private java.lang.Object _afterDisabledChange;
	private java.lang.Object _afterFocusedChange;
	private java.lang.Object _afterHeightChange;
	private java.lang.Object _afterHideClassChange;
	private java.lang.Object _afterIdChange;
	private java.lang.Object _afterInit;
	private java.lang.Object _afterInitializedChange;
	private java.lang.Object _afterMonthNodeChange;
	private java.lang.Object _afterMonthNodeNameChange;
	private java.lang.Object _afterPopulateDayChange;
	private java.lang.Object _afterPopulateMonthChange;
	private java.lang.Object _afterPopulateYearChange;
	private java.lang.Object _afterRenderChange;
	private java.lang.Object _afterRenderedChange;
	private java.lang.Object _afterSelectWrapperNodeChange;
	private java.lang.Object _afterSrcNodeChange;
	private java.lang.Object _afterStringsChange;
	private java.lang.Object _afterTabIndexChange;
	private java.lang.Object _afterTriggerChange;
	private java.lang.Object _afterVisibleChange;
	private java.lang.Object _afterContentUpdate;
	private java.lang.Object _afterRender;
	private java.lang.Object _afterWidthChange;
	private java.lang.Object _afterYearNodeChange;
	private java.lang.Object _afterYearNodeNameChange;
	private java.lang.Object _afterYearRangeChange;
	private java.lang.Object _onAppendOrderChange;
	private java.lang.Object _onBoundingBoxChange;
	private java.lang.Object _onButtonNodeChange;
	private java.lang.Object _onCalendarChange;
	private java.lang.Object _onContentBoxChange;
	private java.lang.Object _onCssClassChange;
	private java.lang.Object _onDayNodeChange;
	private java.lang.Object _onDayNodeNameChange;
	private java.lang.Object _onDestroy;
	private java.lang.Object _onDestroyedChange;
	private java.lang.Object _onDisabledChange;
	private java.lang.Object _onFocusedChange;
	private java.lang.Object _onHeightChange;
	private java.lang.Object _onHideClassChange;
	private java.lang.Object _onIdChange;
	private java.lang.Object _onInit;
	private java.lang.Object _onInitializedChange;
	private java.lang.Object _onMonthNodeChange;
	private java.lang.Object _onMonthNodeNameChange;
	private java.lang.Object _onPopulateDayChange;
	private java.lang.Object _onPopulateMonthChange;
	private java.lang.Object _onPopulateYearChange;
	private java.lang.Object _onRenderChange;
	private java.lang.Object _onRenderedChange;
	private java.lang.Object _onSelectWrapperNodeChange;
	private java.lang.Object _onSrcNodeChange;
	private java.lang.Object _onStringsChange;
	private java.lang.Object _onTabIndexChange;
	private java.lang.Object _onTriggerChange;
	private java.lang.Object _onVisibleChange;
	private java.lang.Object _onContentUpdate;
	private java.lang.Object _onRender;
	private java.lang.Object _onWidthChange;
	private java.lang.Object _onYearNodeChange;
	private java.lang.Object _onYearNodeNameChange;
	private java.lang.Object _onYearRangeChange;

}
