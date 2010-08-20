package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseProgressBarTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseProgressBarTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.String getDestroyed() {
		return _destroyed;
	}

	public java.lang.String getHeight() {
		return _height;
	}

	public java.lang.String getInitialized() {
		return _initialized;
	}

	public java.lang.String getLabel() {
		return _label;
	}

	public java.lang.String getMax() {
		return _max;
	}

	public java.lang.String getMin() {
		return _min;
	}

	public java.lang.String getOrientation() {
		return _orientation;
	}

	public java.lang.String getRatio() {
		return _ratio;
	}

	public java.lang.String getStatusNode() {
		return _statusNode;
	}

	public java.lang.String getStep() {
		return _step;
	}

	public java.lang.String getTextNode() {
		return _textNode;
	}

	public java.lang.String getProgressbarValue() {
		return _progressbarValue;
	}

	public java.lang.String getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.String getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.String getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.String getAfterInit() {
		return _afterInit;
	}

	public java.lang.String getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.String getAfterLabelChange() {
		return _afterLabelChange;
	}

	public java.lang.String getAfterMaxChange() {
		return _afterMaxChange;
	}

	public java.lang.String getAfterMinChange() {
		return _afterMinChange;
	}

	public java.lang.String getAfterOrientationChange() {
		return _afterOrientationChange;
	}

	public java.lang.String getAfterRatioChange() {
		return _afterRatioChange;
	}

	public java.lang.String getAfterStatusNodeChange() {
		return _afterStatusNodeChange;
	}

	public java.lang.String getAfterStepChange() {
		return _afterStepChange;
	}

	public java.lang.String getAfterTextNodeChange() {
		return _afterTextNodeChange;
	}

	public java.lang.String getAfterValueChange() {
		return _afterValueChange;
	}

	public java.lang.String getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.String getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.String getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.String getOnInit() {
		return _onInit;
	}

	public java.lang.String getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.String getOnLabelChange() {
		return _onLabelChange;
	}

	public java.lang.String getOnMaxChange() {
		return _onMaxChange;
	}

	public java.lang.String getOnMinChange() {
		return _onMinChange;
	}

	public java.lang.String getOnOrientationChange() {
		return _onOrientationChange;
	}

	public java.lang.String getOnRatioChange() {
		return _onRatioChange;
	}

	public java.lang.String getOnStatusNodeChange() {
		return _onStatusNodeChange;
	}

	public java.lang.String getOnStepChange() {
		return _onStepChange;
	}

	public java.lang.String getOnTextNodeChange() {
		return _onTextNodeChange;
	}

	public java.lang.String getOnValueChange() {
		return _onValueChange;
	}

	public void setDestroyed(java.lang.String destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setHeight(java.lang.String height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setInitialized(java.lang.String initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setLabel(java.lang.String label) {
		_label = label;

		setScopedAttribute("label", label);
	}

	public void setMax(java.lang.String max) {
		_max = max;

		setScopedAttribute("max", max);
	}

	public void setMin(java.lang.String min) {
		_min = min;

		setScopedAttribute("min", min);
	}

	public void setOrientation(java.lang.String orientation) {
		_orientation = orientation;

		setScopedAttribute("orientation", orientation);
	}

	public void setRatio(java.lang.String ratio) {
		_ratio = ratio;

		setScopedAttribute("ratio", ratio);
	}

	public void setStatusNode(java.lang.String statusNode) {
		_statusNode = statusNode;

		setScopedAttribute("statusNode", statusNode);
	}

	public void setStep(java.lang.String step) {
		_step = step;

		setScopedAttribute("step", step);
	}

	public void setTextNode(java.lang.String textNode) {
		_textNode = textNode;

		setScopedAttribute("textNode", textNode);
	}

	public void setProgressbarValue(java.lang.String progressbarValue) {
		_progressbarValue = progressbarValue;

		setScopedAttribute("progressbarValue", progressbarValue);
	}

	public void setAfterDestroy(java.lang.String afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.String afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterHeightChange(java.lang.String afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterInit(java.lang.String afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.String afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterLabelChange(java.lang.String afterLabelChange) {
		_afterLabelChange = afterLabelChange;

		setScopedAttribute("afterLabelChange", afterLabelChange);
	}

	public void setAfterMaxChange(java.lang.String afterMaxChange) {
		_afterMaxChange = afterMaxChange;

		setScopedAttribute("afterMaxChange", afterMaxChange);
	}

	public void setAfterMinChange(java.lang.String afterMinChange) {
		_afterMinChange = afterMinChange;

		setScopedAttribute("afterMinChange", afterMinChange);
	}

	public void setAfterOrientationChange(java.lang.String afterOrientationChange) {
		_afterOrientationChange = afterOrientationChange;

		setScopedAttribute("afterOrientationChange", afterOrientationChange);
	}

	public void setAfterRatioChange(java.lang.String afterRatioChange) {
		_afterRatioChange = afterRatioChange;

		setScopedAttribute("afterRatioChange", afterRatioChange);
	}

	public void setAfterStatusNodeChange(java.lang.String afterStatusNodeChange) {
		_afterStatusNodeChange = afterStatusNodeChange;

		setScopedAttribute("afterStatusNodeChange", afterStatusNodeChange);
	}

	public void setAfterStepChange(java.lang.String afterStepChange) {
		_afterStepChange = afterStepChange;

		setScopedAttribute("afterStepChange", afterStepChange);
	}

	public void setAfterTextNodeChange(java.lang.String afterTextNodeChange) {
		_afterTextNodeChange = afterTextNodeChange;

		setScopedAttribute("afterTextNodeChange", afterTextNodeChange);
	}

	public void setAfterValueChange(java.lang.String afterValueChange) {
		_afterValueChange = afterValueChange;

		setScopedAttribute("afterValueChange", afterValueChange);
	}

	public void setOnDestroy(java.lang.String onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.String onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnHeightChange(java.lang.String onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnInit(java.lang.String onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.String onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnLabelChange(java.lang.String onLabelChange) {
		_onLabelChange = onLabelChange;

		setScopedAttribute("onLabelChange", onLabelChange);
	}

	public void setOnMaxChange(java.lang.String onMaxChange) {
		_onMaxChange = onMaxChange;

		setScopedAttribute("onMaxChange", onMaxChange);
	}

	public void setOnMinChange(java.lang.String onMinChange) {
		_onMinChange = onMinChange;

		setScopedAttribute("onMinChange", onMinChange);
	}

	public void setOnOrientationChange(java.lang.String onOrientationChange) {
		_onOrientationChange = onOrientationChange;

		setScopedAttribute("onOrientationChange", onOrientationChange);
	}

	public void setOnRatioChange(java.lang.String onRatioChange) {
		_onRatioChange = onRatioChange;

		setScopedAttribute("onRatioChange", onRatioChange);
	}

	public void setOnStatusNodeChange(java.lang.String onStatusNodeChange) {
		_onStatusNodeChange = onStatusNodeChange;

		setScopedAttribute("onStatusNodeChange", onStatusNodeChange);
	}

	public void setOnStepChange(java.lang.String onStepChange) {
		_onStepChange = onStepChange;

		setScopedAttribute("onStepChange", onStepChange);
	}

	public void setOnTextNodeChange(java.lang.String onTextNodeChange) {
		_onTextNodeChange = onTextNodeChange;

		setScopedAttribute("onTextNodeChange", onTextNodeChange);
	}

	public void setOnValueChange(java.lang.String onValueChange) {
		_onValueChange = onValueChange;

		setScopedAttribute("onValueChange", onValueChange);
	}

	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "label", _label);
		setNamespacedAttribute(request, "max", _max);
		setNamespacedAttribute(request, "min", _min);
		setNamespacedAttribute(request, "orientation", _orientation);
		setNamespacedAttribute(request, "ratio", _ratio);
		setNamespacedAttribute(request, "statusNode", _statusNode);
		setNamespacedAttribute(request, "step", _step);
		setNamespacedAttribute(request, "textNode", _textNode);
		setNamespacedAttribute(request, "progressbarValue", _progressbarValue);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterLabelChange", _afterLabelChange);
		setNamespacedAttribute(request, "afterMaxChange", _afterMaxChange);
		setNamespacedAttribute(request, "afterMinChange", _afterMinChange);
		setNamespacedAttribute(request, "afterOrientationChange", _afterOrientationChange);
		setNamespacedAttribute(request, "afterRatioChange", _afterRatioChange);
		setNamespacedAttribute(request, "afterStatusNodeChange", _afterStatusNodeChange);
		setNamespacedAttribute(request, "afterStepChange", _afterStepChange);
		setNamespacedAttribute(request, "afterTextNodeChange", _afterTextNodeChange);
		setNamespacedAttribute(request, "afterValueChange", _afterValueChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onLabelChange", _onLabelChange);
		setNamespacedAttribute(request, "onMaxChange", _onMaxChange);
		setNamespacedAttribute(request, "onMinChange", _onMinChange);
		setNamespacedAttribute(request, "onOrientationChange", _onOrientationChange);
		setNamespacedAttribute(request, "onRatioChange", _onRatioChange);
		setNamespacedAttribute(request, "onStatusNodeChange", _onStatusNodeChange);
		setNamespacedAttribute(request, "onStepChange", _onStepChange);
		setNamespacedAttribute(request, "onTextNodeChange", _onTextNodeChange);
		setNamespacedAttribute(request, "onValueChange", _onValueChange);
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:progress-bar:";

	private static final String _PAGE =
		"/html/taglib/alloy/progress_bar/page.jsp";

	private java.lang.String _destroyed;
	private java.lang.String _height;
	private java.lang.String _initialized;
	private java.lang.String _label;
	private java.lang.String _max;
	private java.lang.String _min;
	private java.lang.String _orientation;
	private java.lang.String _ratio;
	private java.lang.String _statusNode;
	private java.lang.String _step;
	private java.lang.String _textNode;
	private java.lang.String _progressbarValue;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterHeightChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterLabelChange;
	private java.lang.String _afterMaxChange;
	private java.lang.String _afterMinChange;
	private java.lang.String _afterOrientationChange;
	private java.lang.String _afterRatioChange;
	private java.lang.String _afterStatusNodeChange;
	private java.lang.String _afterStepChange;
	private java.lang.String _afterTextNodeChange;
	private java.lang.String _afterValueChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onHeightChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onLabelChange;
	private java.lang.String _onMaxChange;
	private java.lang.String _onMinChange;
	private java.lang.String _onOrientationChange;
	private java.lang.String _onRatioChange;
	private java.lang.String _onStatusNodeChange;
	private java.lang.String _onStepChange;
	private java.lang.String _onTextNodeChange;
	private java.lang.String _onValueChange;

}
