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

	public java.lang.String getBoundingBox() {
		return _boundingBox;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.String getCssClass() {
		return _cssClass;
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

	public java.lang.String getProgressbarId() {
		return _progressbarId;
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

	public java.lang.String getRender() {
		return _render;
	}

	public java.lang.String getRendered() {
		return _rendered;
	}

	public java.lang.String getSrcNode() {
		return _srcNode;
	}

	public java.lang.String getStatusNode() {
		return _statusNode;
	}

	public java.lang.String getStep() {
		return _step;
	}

	public java.lang.Object getStrings() {
		return _strings;
	}

	public java.lang.String getTabIndex() {
		return _tabIndex;
	}

	public java.lang.String getTextNode() {
		return _textNode;
	}

	public java.lang.String getProgressbarValue() {
		return _progressbarValue;
	}

	public java.lang.String getVisible() {
		return _visible;
	}

	public java.lang.String getWidth() {
		return _width;
	}

	public java.lang.String getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.String getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.String getAfterCssClassChange() {
		return _afterCssClassChange;
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

	public java.lang.String getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.String getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.String getAfterSrcNodeChange() {
		return _afterSrcNodeChange;
	}

	public java.lang.String getAfterStatusNodeChange() {
		return _afterStatusNodeChange;
	}

	public java.lang.String getAfterStepChange() {
		return _afterStepChange;
	}

	public java.lang.String getAfterStringsChange() {
		return _afterStringsChange;
	}

	public java.lang.String getAfterTabIndexChange() {
		return _afterTabIndexChange;
	}

	public java.lang.String getAfterTextNodeChange() {
		return _afterTextNodeChange;
	}

	public java.lang.String getAfterValueChange() {
		return _afterValueChange;
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

	public java.lang.String getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.String getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.String getOnCssClassChange() {
		return _onCssClassChange;
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

	public java.lang.String getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.String getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.String getOnSrcNodeChange() {
		return _onSrcNodeChange;
	}

	public java.lang.String getOnStatusNodeChange() {
		return _onStatusNodeChange;
	}

	public java.lang.String getOnStepChange() {
		return _onStepChange;
	}

	public java.lang.String getOnStringsChange() {
		return _onStringsChange;
	}

	public java.lang.String getOnTabIndexChange() {
		return _onTabIndexChange;
	}

	public java.lang.String getOnTextNodeChange() {
		return _onTextNodeChange;
	}

	public java.lang.String getOnValueChange() {
		return _onValueChange;
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

	public void setBoundingBox(java.lang.String boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setContentBox(java.lang.String contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setCssClass(java.lang.String cssClass) {
		_cssClass = cssClass;

		setScopedAttribute("cssClass", cssClass);
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

	public void setProgressbarId(java.lang.String progressbarId) {
		_progressbarId = progressbarId;

		setScopedAttribute("progressbarId", progressbarId);
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

	public void setRender(java.lang.String render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(java.lang.String rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setSrcNode(java.lang.String srcNode) {
		_srcNode = srcNode;

		setScopedAttribute("srcNode", srcNode);
	}

	public void setStatusNode(java.lang.String statusNode) {
		_statusNode = statusNode;

		setScopedAttribute("statusNode", statusNode);
	}

	public void setStep(java.lang.String step) {
		_step = step;

		setScopedAttribute("step", step);
	}

	public void setStrings(java.lang.Object strings) {
		_strings = strings;

		setScopedAttribute("strings", strings);
	}

	public void setTabIndex(java.lang.String tabIndex) {
		_tabIndex = tabIndex;

		setScopedAttribute("tabIndex", tabIndex);
	}

	public void setTextNode(java.lang.String textNode) {
		_textNode = textNode;

		setScopedAttribute("textNode", textNode);
	}

	public void setProgressbarValue(java.lang.String progressbarValue) {
		_progressbarValue = progressbarValue;

		setScopedAttribute("progressbarValue", progressbarValue);
	}

	public void setVisible(java.lang.String visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setWidth(java.lang.String width) {
		_width = width;

		setScopedAttribute("width", width);
	}

	public void setAfterBoundingBoxChange(java.lang.String afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterContentBoxChange(java.lang.String afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.String afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
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

	public void setAfterRenderChange(java.lang.String afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderedChange(java.lang.String afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterSrcNodeChange(java.lang.String afterSrcNodeChange) {
		_afterSrcNodeChange = afterSrcNodeChange;

		setScopedAttribute("afterSrcNodeChange", afterSrcNodeChange);
	}

	public void setAfterStatusNodeChange(java.lang.String afterStatusNodeChange) {
		_afterStatusNodeChange = afterStatusNodeChange;

		setScopedAttribute("afterStatusNodeChange", afterStatusNodeChange);
	}

	public void setAfterStepChange(java.lang.String afterStepChange) {
		_afterStepChange = afterStepChange;

		setScopedAttribute("afterStepChange", afterStepChange);
	}

	public void setAfterStringsChange(java.lang.String afterStringsChange) {
		_afterStringsChange = afterStringsChange;

		setScopedAttribute("afterStringsChange", afterStringsChange);
	}

	public void setAfterTabIndexChange(java.lang.String afterTabIndexChange) {
		_afterTabIndexChange = afterTabIndexChange;

		setScopedAttribute("afterTabIndexChange", afterTabIndexChange);
	}

	public void setAfterTextNodeChange(java.lang.String afterTextNodeChange) {
		_afterTextNodeChange = afterTextNodeChange;

		setScopedAttribute("afterTextNodeChange", afterTextNodeChange);
	}

	public void setAfterValueChange(java.lang.String afterValueChange) {
		_afterValueChange = afterValueChange;

		setScopedAttribute("afterValueChange", afterValueChange);
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

	public void setOnBoundingBoxChange(java.lang.String onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnContentBoxChange(java.lang.String onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.String onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
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

	public void setOnRenderChange(java.lang.String onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderedChange(java.lang.String onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnSrcNodeChange(java.lang.String onSrcNodeChange) {
		_onSrcNodeChange = onSrcNodeChange;

		setScopedAttribute("onSrcNodeChange", onSrcNodeChange);
	}

	public void setOnStatusNodeChange(java.lang.String onStatusNodeChange) {
		_onStatusNodeChange = onStatusNodeChange;

		setScopedAttribute("onStatusNodeChange", onStatusNodeChange);
	}

	public void setOnStepChange(java.lang.String onStepChange) {
		_onStepChange = onStepChange;

		setScopedAttribute("onStepChange", onStepChange);
	}

	public void setOnStringsChange(java.lang.String onStringsChange) {
		_onStringsChange = onStringsChange;

		setScopedAttribute("onStringsChange", onStringsChange);
	}

	public void setOnTabIndexChange(java.lang.String onTabIndexChange) {
		_onTabIndexChange = onTabIndexChange;

		setScopedAttribute("onTabIndexChange", onTabIndexChange);
	}

	public void setOnTextNodeChange(java.lang.String onTextNodeChange) {
		_onTextNodeChange = onTextNodeChange;

		setScopedAttribute("onTextNodeChange", onTextNodeChange);
	}

	public void setOnValueChange(java.lang.String onValueChange) {
		_onValueChange = onValueChange;

		setScopedAttribute("onValueChange", onValueChange);
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

	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "progressbarId", _progressbarId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "label", _label);
		setNamespacedAttribute(request, "max", _max);
		setNamespacedAttribute(request, "min", _min);
		setNamespacedAttribute(request, "orientation", _orientation);
		setNamespacedAttribute(request, "ratio", _ratio);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "statusNode", _statusNode);
		setNamespacedAttribute(request, "step", _step);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "textNode", _textNode);
		setNamespacedAttribute(request, "progressbarValue", _progressbarValue);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterHideClassChange", _afterHideClassChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterLabelChange", _afterLabelChange);
		setNamespacedAttribute(request, "afterMaxChange", _afterMaxChange);
		setNamespacedAttribute(request, "afterMinChange", _afterMinChange);
		setNamespacedAttribute(request, "afterOrientationChange", _afterOrientationChange);
		setNamespacedAttribute(request, "afterRatioChange", _afterRatioChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStatusNodeChange", _afterStatusNodeChange);
		setNamespacedAttribute(request, "afterStepChange", _afterStepChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterTextNodeChange", _afterTextNodeChange);
		setNamespacedAttribute(request, "afterValueChange", _afterValueChange);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onHideClassChange", _onHideClassChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onLabelChange", _onLabelChange);
		setNamespacedAttribute(request, "onMaxChange", _onMaxChange);
		setNamespacedAttribute(request, "onMinChange", _onMinChange);
		setNamespacedAttribute(request, "onOrientationChange", _onOrientationChange);
		setNamespacedAttribute(request, "onRatioChange", _onRatioChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStatusNodeChange", _onStatusNodeChange);
		setNamespacedAttribute(request, "onStepChange", _onStepChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onTextNodeChange", _onTextNodeChange);
		setNamespacedAttribute(request, "onValueChange", _onValueChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:progress-bar:";

	private static final String _PAGE =
		"/html/taglib/alloy/progress_bar/page.jsp";

	private java.lang.String _boundingBox;
	private java.lang.String _contentBox;
	private java.lang.String _cssClass;
	private java.lang.String _destroyed;
	private java.lang.String _disabled;
	private java.lang.String _focused;
	private java.lang.String _height;
	private java.lang.String _hideClass;
	private java.lang.String _progressbarId;
	private java.lang.String _initialized;
	private java.lang.String _label;
	private java.lang.String _max;
	private java.lang.String _min;
	private java.lang.String _orientation;
	private java.lang.String _ratio;
	private java.lang.String _render;
	private java.lang.String _rendered;
	private java.lang.String _srcNode;
	private java.lang.String _statusNode;
	private java.lang.String _step;
	private java.lang.Object _strings;
	private java.lang.String _tabIndex;
	private java.lang.String _textNode;
	private java.lang.String _progressbarValue;
	private java.lang.String _visible;
	private java.lang.String _width;
	private java.lang.String _afterBoundingBoxChange;
	private java.lang.String _afterContentBoxChange;
	private java.lang.String _afterCssClassChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterDisabledChange;
	private java.lang.String _afterFocusedChange;
	private java.lang.String _afterHeightChange;
	private java.lang.String _afterHideClassChange;
	private java.lang.String _afterIdChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterLabelChange;
	private java.lang.String _afterMaxChange;
	private java.lang.String _afterMinChange;
	private java.lang.String _afterOrientationChange;
	private java.lang.String _afterRatioChange;
	private java.lang.String _afterRenderChange;
	private java.lang.String _afterRenderedChange;
	private java.lang.String _afterSrcNodeChange;
	private java.lang.String _afterStatusNodeChange;
	private java.lang.String _afterStepChange;
	private java.lang.String _afterStringsChange;
	private java.lang.String _afterTabIndexChange;
	private java.lang.String _afterTextNodeChange;
	private java.lang.String _afterValueChange;
	private java.lang.String _afterVisibleChange;
	private java.lang.String _afterContentUpdate;
	private java.lang.String _afterRender;
	private java.lang.String _afterWidthChange;
	private java.lang.String _onBoundingBoxChange;
	private java.lang.String _onContentBoxChange;
	private java.lang.String _onCssClassChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onDisabledChange;
	private java.lang.String _onFocusedChange;
	private java.lang.String _onHeightChange;
	private java.lang.String _onHideClassChange;
	private java.lang.String _onIdChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onLabelChange;
	private java.lang.String _onMaxChange;
	private java.lang.String _onMinChange;
	private java.lang.String _onOrientationChange;
	private java.lang.String _onRatioChange;
	private java.lang.String _onRenderChange;
	private java.lang.String _onRenderedChange;
	private java.lang.String _onSrcNodeChange;
	private java.lang.String _onStatusNodeChange;
	private java.lang.String _onStepChange;
	private java.lang.String _onStringsChange;
	private java.lang.String _onTabIndexChange;
	private java.lang.String _onTextNodeChange;
	private java.lang.String _onValueChange;
	private java.lang.String _onVisibleChange;
	private java.lang.String _onContentUpdate;
	private java.lang.String _onRender;
	private java.lang.String _onWidthChange;

}
