package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

/**
 * <a href="BaseProgressBarTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseProgressBarTag extends IncludeTag {

	public void init() {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);
	}

	public java.lang.String getMin() {
		return _min;
	}

	public java.lang.String getOrientation() {
		return _orientation;
	}

	public java.lang.String getTextNode() {
		return _textNode;
	}

	public java.lang.String getHeight() {
		return _height;
	}

	public java.lang.String getStatusNode() {
		return _statusNode;
	}

	public java.lang.String getMax() {
		return _max;
	}

	public java.lang.String getRatio() {
		return _ratio;
	}

	public java.lang.Integer getValue() {
		return _value;
	}

	public java.lang.String getLabel() {
		return _label;
	}

	public java.lang.String getStep() {
		return _step;
	}

	public void setMin(java.lang.String min) {
		_min = min;

		setScopedAttribute("min", min);
	}

	public void setOrientation(java.lang.String orientation) {
		_orientation = orientation;

		setScopedAttribute("orientation", orientation);
	}

	public void setTextNode(java.lang.String textNode) {
		_textNode = textNode;

		setScopedAttribute("textNode", textNode);
	}

	public void setHeight(java.lang.String height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setStatusNode(java.lang.String statusNode) {
		_statusNode = statusNode;

		setScopedAttribute("statusNode", statusNode);
	}

	public void setMax(java.lang.String max) {
		_max = max;

		setScopedAttribute("max", max);
	}

	public void setRatio(java.lang.String ratio) {
		_ratio = ratio;

		setScopedAttribute("ratio", ratio);
	}

	public void setValue(java.lang.Integer value) {
		_value = value;

		setScopedAttribute("value", value);
	}

	public void setLabel(java.lang.String label) {
		_label = label;

		setScopedAttribute("label", label);
	}

	public void setStep(java.lang.String step) {
		_step = step;

		setScopedAttribute("step", step);
	}

	protected String getPage() {
		return _PAGE;
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:progress-bar:";

	private static final String _PAGE =
		"/html/taglib/alloy/progress_bar/page.jsp";

	private java.lang.String _min;
	private java.lang.String _orientation;
	private java.lang.String _textNode;
	private java.lang.String _height;
	private java.lang.String _statusNode;
	private java.lang.String _max;
	private java.lang.String _ratio;
	private java.lang.Integer _value;
	private java.lang.String _label;
	private java.lang.String _step;

}
