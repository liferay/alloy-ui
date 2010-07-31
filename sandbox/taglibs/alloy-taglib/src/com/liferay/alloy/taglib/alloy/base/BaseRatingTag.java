package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

/**
 * <a href="BaseRatingTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseRatingTag extends IncludeTag {

	public void init() {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);
	}

	public java.lang.Integer getSelectedIndex() {
		return _selectedIndex;
	}

	public java.lang.Integer getDefaultSelected() {
		return _defaultSelected;
	}

	public java.lang.String getLabelNode() {
		return _labelNode;
	}

	public java.lang.String getLabel() {
		return _label;
	}

	public java.lang.String getInputName() {
		return _inputName;
	}

	public java.lang.Integer getSize() {
		return _size;
	}

	public java.lang.String getTitle() {
		return _title;
	}

	public java.lang.String getHiddenInput() {
		return _hiddenInput;
	}

	public java.lang.String getValue() {
		return _value;
	}

	public java.lang.String getCanReset() {
		return _canReset;
	}

	public java.lang.String getShowTitle() {
		return _showTitle;
	}

	public java.lang.String getElements() {
		return _elements;
	}

	public java.lang.String getDisabled() {
		return _disabled;
	}

	public void setSelectedIndex(java.lang.Integer selectedIndex) {
		_selectedIndex = selectedIndex;

		setScopedAttribute("selectedIndex", selectedIndex);
	}

	public void setDefaultSelected(java.lang.Integer defaultSelected) {
		_defaultSelected = defaultSelected;

		setScopedAttribute("defaultSelected", defaultSelected);
	}

	public void setLabelNode(java.lang.String labelNode) {
		_labelNode = labelNode;

		setScopedAttribute("labelNode", labelNode);
	}

	public void setLabel(java.lang.String label) {
		_label = label;

		setScopedAttribute("label", label);
	}

	public void setInputName(java.lang.String inputName) {
		_inputName = inputName;

		setScopedAttribute("inputName", inputName);
	}

	public void setSize(java.lang.Integer size) {
		_size = size;

		setScopedAttribute("size", size);
	}

	public void setTitle(java.lang.String title) {
		_title = title;

		setScopedAttribute("title", title);
	}

	public void setHiddenInput(java.lang.String hiddenInput) {
		_hiddenInput = hiddenInput;

		setScopedAttribute("hiddenInput", hiddenInput);
	}

	public void setValue(java.lang.String value) {
		_value = value;

		setScopedAttribute("value", value);
	}

	public void setCanReset(java.lang.String canReset) {
		_canReset = canReset;

		setScopedAttribute("canReset", canReset);
	}

	public void setShowTitle(java.lang.String showTitle) {
		_showTitle = showTitle;

		setScopedAttribute("showTitle", showTitle);
	}

	public void setElements(java.lang.String elements) {
		_elements = elements;

		setScopedAttribute("elements", elements);
	}

	public void setDisabled(java.lang.String disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	protected String getPage() {
		return _PAGE;
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:rating:";

	private static final String _PAGE =
		"/html/taglib/alloy/rating/page.jsp";

	private java.lang.Integer _selectedIndex;
	private java.lang.Integer _defaultSelected;
	private java.lang.String _labelNode;
	private java.lang.String _label;
	private java.lang.String _inputName;
	private java.lang.Integer _size;
	private java.lang.String _title;
	private java.lang.String _hiddenInput;
	private java.lang.String _value;
	private java.lang.String _canReset;
	private java.lang.String _showTitle;
	private java.lang.String _elements;
	private java.lang.String _disabled;

}
