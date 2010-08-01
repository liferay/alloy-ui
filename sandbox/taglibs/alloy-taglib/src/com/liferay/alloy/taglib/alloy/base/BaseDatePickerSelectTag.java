package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

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

	public java.lang.String getAppendOrder() {
		return _appendOrder;
	}

	public java.lang.String getTrigger() {
		return _trigger;
	}

	public java.lang.String getPopulateDay() {
		return _populateDay;
	}

	public java.lang.String getButtonNode() {
		return _buttonNode;
	}

	public java.lang.String getVisible() {
		return _visible;
	}

	public java.lang.String getPopulateYear() {
		return _populateYear;
	}

	public java.lang.String getDayNodeName() {
		return _dayNodeName;
	}

	public java.lang.String getPopulateMonth() {
		return _populateMonth;
	}

	public java.lang.String getSetValue() {
		return _setValue;
	}

	public java.lang.String getYearNodeName() {
		return _yearNodeName;
	}

	public java.lang.String getDayNode() {
		return _dayNode;
	}

	public java.lang.String getYearNode() {
		return _yearNode;
	}

	public java.lang.String getMonthNodeName() {
		return _monthNodeName;
	}

	public java.lang.String getMonthNode() {
		return _monthNode;
	}

	public java.lang.String getBaseName() {
		return _baseName;
	}

	public java.lang.String getYearRange() {
		return _yearRange;
	}

	public java.lang.String getSelectWrapperNode() {
		return _selectWrapperNode;
	}

	public void setAppendOrder(java.lang.String appendOrder) {
		_appendOrder = appendOrder;

		setScopedAttribute("appendOrder", appendOrder);
	}

	public void setTrigger(java.lang.String trigger) {
		_trigger = trigger;

		setScopedAttribute("trigger", trigger);
	}

	public void setPopulateDay(java.lang.String populateDay) {
		_populateDay = populateDay;

		setScopedAttribute("populateDay", populateDay);
	}

	public void setButtonNode(java.lang.String buttonNode) {
		_buttonNode = buttonNode;

		setScopedAttribute("buttonNode", buttonNode);
	}

	public void setVisible(java.lang.String visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setPopulateYear(java.lang.String populateYear) {
		_populateYear = populateYear;

		setScopedAttribute("populateYear", populateYear);
	}

	public void setDayNodeName(java.lang.String dayNodeName) {
		_dayNodeName = dayNodeName;

		setScopedAttribute("dayNodeName", dayNodeName);
	}

	public void setPopulateMonth(java.lang.String populateMonth) {
		_populateMonth = populateMonth;

		setScopedAttribute("populateMonth", populateMonth);
	}

	public void setSetValue(java.lang.String setValue) {
		_setValue = setValue;

		setScopedAttribute("setValue", setValue);
	}

	public void setYearNodeName(java.lang.String yearNodeName) {
		_yearNodeName = yearNodeName;

		setScopedAttribute("yearNodeName", yearNodeName);
	}

	public void setDayNode(java.lang.String dayNode) {
		_dayNode = dayNode;

		setScopedAttribute("dayNode", dayNode);
	}

	public void setYearNode(java.lang.String yearNode) {
		_yearNode = yearNode;

		setScopedAttribute("yearNode", yearNode);
	}

	public void setMonthNodeName(java.lang.String monthNodeName) {
		_monthNodeName = monthNodeName;

		setScopedAttribute("monthNodeName", monthNodeName);
	}

	public void setMonthNode(java.lang.String monthNode) {
		_monthNode = monthNode;

		setScopedAttribute("monthNode", monthNode);
	}

	public void setBaseName(java.lang.String baseName) {
		_baseName = baseName;

		setScopedAttribute("baseName", baseName);
	}

	public void setYearRange(java.lang.String yearRange) {
		_yearRange = yearRange;

		setScopedAttribute("yearRange", yearRange);
	}

	public void setSelectWrapperNode(java.lang.String selectWrapperNode) {
		_selectWrapperNode = selectWrapperNode;

		setScopedAttribute("selectWrapperNode", selectWrapperNode);
	}

	protected String getPage() {
		return _PAGE;
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:date-picker-select:";

	private static final String _PAGE =
		"/html/taglib/alloy/date_picker_select/page.jsp";

	private java.lang.String _appendOrder;
	private java.lang.String _trigger;
	private java.lang.String _populateDay;
	private java.lang.String _buttonNode;
	private java.lang.String _visible;
	private java.lang.String _populateYear;
	private java.lang.String _dayNodeName;
	private java.lang.String _populateMonth;
	private java.lang.String _setValue;
	private java.lang.String _yearNodeName;
	private java.lang.String _dayNode;
	private java.lang.String _yearNode;
	private java.lang.String _monthNodeName;
	private java.lang.String _monthNode;
	private java.lang.String _baseName;
	private java.lang.String _yearRange;
	private java.lang.String _selectWrapperNode;

}
