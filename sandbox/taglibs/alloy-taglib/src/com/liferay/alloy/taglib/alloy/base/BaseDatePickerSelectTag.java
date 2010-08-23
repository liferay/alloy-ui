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

	public java.lang.String getAppendOrder() {
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

	public java.lang.String getDestroyed() {
		return _destroyed;
	}

	public java.lang.String getDisabled() {
		return _disabled;
	}

	public java.lang.String getFocused() {
		return _focused;
	}

	public java.lang.String getHeight() {
		return _height;
	}

	public java.lang.String getHideClass() {
		return _hideClass;
	}

	public java.lang.String getDatepickerselectId() {
		return _datepickerselectId;
	}

	public java.lang.String getInitialized() {
		return _initialized;
	}

	public java.lang.String getMonthNode() {
		return _monthNode;
	}

	public java.lang.String getMonthNodeName() {
		return _monthNodeName;
	}

	public java.lang.String getPopulateDay() {
		return _populateDay;
	}

	public java.lang.String getPopulateMonth() {
		return _populateMonth;
	}

	public java.lang.String getPopulateYear() {
		return _populateYear;
	}

	public java.lang.String getRender() {
		return _render;
	}

	public java.lang.String getRendered() {
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

	public java.lang.String getTabIndex() {
		return _tabIndex;
	}

	public java.lang.String getTrigger() {
		return _trigger;
	}

	public java.lang.String getVisible() {
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

	public java.lang.String getAfterAppendOrderChange() {
		return _afterAppendOrderChange;
	}

	public java.lang.String getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.String getAfterButtonNodeChange() {
		return _afterButtonNodeChange;
	}

	public java.lang.String getAfterCalendarChange() {
		return _afterCalendarChange;
	}

	public java.lang.String getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.String getAfterCssClassChange() {
		return _afterCssClassChange;
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

	public java.lang.String getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.String getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.String getAfterHideClassChange() {
		return _afterHideClassChange;
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

	public java.lang.String getAfterSelectWrapperNodeChange() {
		return _afterSelectWrapperNodeChange;
	}

	public java.lang.String getAfterSrcNodeChange() {
		return _afterSrcNodeChange;
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

	public java.lang.String getOnAppendOrderChange() {
		return _onAppendOrderChange;
	}

	public java.lang.String getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.String getOnButtonNodeChange() {
		return _onButtonNodeChange;
	}

	public java.lang.String getOnCalendarChange() {
		return _onCalendarChange;
	}

	public java.lang.String getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.String getOnCssClassChange() {
		return _onCssClassChange;
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

	public java.lang.String getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.String getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.String getOnHideClassChange() {
		return _onHideClassChange;
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

	public java.lang.String getOnSelectWrapperNodeChange() {
		return _onSelectWrapperNodeChange;
	}

	public java.lang.String getOnSrcNodeChange() {
		return _onSrcNodeChange;
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

	public void setAppendOrder(java.lang.String appendOrder) {
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

	public void setDestroyed(java.lang.String destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDisabled(java.lang.String disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	public void setFocused(java.lang.String focused) {
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

	public void setDatepickerselectId(java.lang.String datepickerselectId) {
		_datepickerselectId = datepickerselectId;

		setScopedAttribute("datepickerselectId", datepickerselectId);
	}

	public void setInitialized(java.lang.String initialized) {
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

	public void setPopulateDay(java.lang.String populateDay) {
		_populateDay = populateDay;

		setScopedAttribute("populateDay", populateDay);
	}

	public void setPopulateMonth(java.lang.String populateMonth) {
		_populateMonth = populateMonth;

		setScopedAttribute("populateMonth", populateMonth);
	}

	public void setPopulateYear(java.lang.String populateYear) {
		_populateYear = populateYear;

		setScopedAttribute("populateYear", populateYear);
	}

	public void setRender(java.lang.String render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(java.lang.String rendered) {
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

	public void setTabIndex(java.lang.String tabIndex) {
		_tabIndex = tabIndex;

		setScopedAttribute("tabIndex", tabIndex);
	}

	public void setTrigger(java.lang.String trigger) {
		_trigger = trigger;

		setScopedAttribute("trigger", trigger);
	}

	public void setVisible(java.lang.String visible) {
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

	public void setAfterAppendOrderChange(java.lang.String afterAppendOrderChange) {
		_afterAppendOrderChange = afterAppendOrderChange;

		setScopedAttribute("afterAppendOrderChange", afterAppendOrderChange);
	}

	public void setAfterBoundingBoxChange(java.lang.String afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterButtonNodeChange(java.lang.String afterButtonNodeChange) {
		_afterButtonNodeChange = afterButtonNodeChange;

		setScopedAttribute("afterButtonNodeChange", afterButtonNodeChange);
	}

	public void setAfterCalendarChange(java.lang.String afterCalendarChange) {
		_afterCalendarChange = afterCalendarChange;

		setScopedAttribute("afterCalendarChange", afterCalendarChange);
	}

	public void setAfterContentBoxChange(java.lang.String afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.String afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
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

	public void setAfterSelectWrapperNodeChange(java.lang.String afterSelectWrapperNodeChange) {
		_afterSelectWrapperNodeChange = afterSelectWrapperNodeChange;

		setScopedAttribute("afterSelectWrapperNodeChange", afterSelectWrapperNodeChange);
	}

	public void setAfterSrcNodeChange(java.lang.String afterSrcNodeChange) {
		_afterSrcNodeChange = afterSrcNodeChange;

		setScopedAttribute("afterSrcNodeChange", afterSrcNodeChange);
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

	public void setOnAppendOrderChange(java.lang.String onAppendOrderChange) {
		_onAppendOrderChange = onAppendOrderChange;

		setScopedAttribute("onAppendOrderChange", onAppendOrderChange);
	}

	public void setOnBoundingBoxChange(java.lang.String onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnButtonNodeChange(java.lang.String onButtonNodeChange) {
		_onButtonNodeChange = onButtonNodeChange;

		setScopedAttribute("onButtonNodeChange", onButtonNodeChange);
	}

	public void setOnCalendarChange(java.lang.String onCalendarChange) {
		_onCalendarChange = onCalendarChange;

		setScopedAttribute("onCalendarChange", onCalendarChange);
	}

	public void setOnContentBoxChange(java.lang.String onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.String onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
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

	public void setOnSelectWrapperNodeChange(java.lang.String onSelectWrapperNodeChange) {
		_onSelectWrapperNodeChange = onSelectWrapperNodeChange;

		setScopedAttribute("onSelectWrapperNodeChange", onSelectWrapperNodeChange);
	}

	public void setOnSrcNodeChange(java.lang.String onSrcNodeChange) {
		_onSrcNodeChange = onSrcNodeChange;

		setScopedAttribute("onSrcNodeChange", onSrcNodeChange);
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

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:date-picker-select:";

	private static final String _PAGE =
		"/html/taglib/alloy/date_picker_select/page.jsp";

	private java.lang.String _appendOrder;
	private java.lang.String _boundingBox;
	private java.lang.String _buttonNode;
	private java.lang.Object _calendar;
	private java.lang.String _contentBox;
	private java.lang.String _cssClass;
	private java.lang.String _dayNode;
	private java.lang.String _dayNodeName;
	private java.lang.String _destroyed;
	private java.lang.String _disabled;
	private java.lang.String _focused;
	private java.lang.String _height;
	private java.lang.String _hideClass;
	private java.lang.String _datepickerselectId;
	private java.lang.String _initialized;
	private java.lang.String _monthNode;
	private java.lang.String _monthNodeName;
	private java.lang.String _populateDay;
	private java.lang.String _populateMonth;
	private java.lang.String _populateYear;
	private java.lang.String _render;
	private java.lang.String _rendered;
	private java.lang.String _selectWrapperNode;
	private java.lang.String _srcNode;
	private java.lang.Object _strings;
	private java.lang.String _tabIndex;
	private java.lang.String _trigger;
	private java.lang.String _visible;
	private java.lang.String _width;
	private java.lang.String _yearNode;
	private java.lang.String _yearNodeName;
	private java.lang.String _yearRange;
	private java.lang.String _afterAppendOrderChange;
	private java.lang.String _afterBoundingBoxChange;
	private java.lang.String _afterButtonNodeChange;
	private java.lang.String _afterCalendarChange;
	private java.lang.String _afterContentBoxChange;
	private java.lang.String _afterCssClassChange;
	private java.lang.String _afterDayNodeChange;
	private java.lang.String _afterDayNodeNameChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterDisabledChange;
	private java.lang.String _afterFocusedChange;
	private java.lang.String _afterHeightChange;
	private java.lang.String _afterHideClassChange;
	private java.lang.String _afterIdChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterMonthNodeChange;
	private java.lang.String _afterMonthNodeNameChange;
	private java.lang.String _afterPopulateDayChange;
	private java.lang.String _afterPopulateMonthChange;
	private java.lang.String _afterPopulateYearChange;
	private java.lang.String _afterRenderChange;
	private java.lang.String _afterRenderedChange;
	private java.lang.String _afterSelectWrapperNodeChange;
	private java.lang.String _afterSrcNodeChange;
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
	private java.lang.String _onAppendOrderChange;
	private java.lang.String _onBoundingBoxChange;
	private java.lang.String _onButtonNodeChange;
	private java.lang.String _onCalendarChange;
	private java.lang.String _onContentBoxChange;
	private java.lang.String _onCssClassChange;
	private java.lang.String _onDayNodeChange;
	private java.lang.String _onDayNodeNameChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onDisabledChange;
	private java.lang.String _onFocusedChange;
	private java.lang.String _onHeightChange;
	private java.lang.String _onHideClassChange;
	private java.lang.String _onIdChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onMonthNodeChange;
	private java.lang.String _onMonthNodeNameChange;
	private java.lang.String _onPopulateDayChange;
	private java.lang.String _onPopulateMonthChange;
	private java.lang.String _onPopulateYearChange;
	private java.lang.String _onRenderChange;
	private java.lang.String _onRenderedChange;
	private java.lang.String _onSelectWrapperNodeChange;
	private java.lang.String _onSrcNodeChange;
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
