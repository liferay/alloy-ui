package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseEditableTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseEditableTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.Object getBoundingBox() {
		return _boundingBox;
	}

	public java.lang.Object getCancelButton() {
		return _cancelButton;
	}

	public java.lang.Object getContentBox() {
		return _contentBox;
	}

	public java.lang.Object getContentText() {
		return _contentText;
	}

	public java.lang.Object getCssClass() {
		return _cssClass;
	}

	public java.lang.String getDestroyed() {
		return _destroyed;
	}

	public java.lang.String getDisabled() {
		return _disabled;
	}

	public java.lang.Object getEventType() {
		return _eventType;
	}

	public java.lang.String getFocused() {
		return _focused;
	}

	public java.lang.Object getFormatInput() {
		return _formatInput;
	}

	public java.lang.Object getFormatOutput() {
		return _formatOutput;
	}

	public java.lang.Object getHeight() {
		return _height;
	}

	public java.lang.Object getHideClass() {
		return _hideClass;
	}

	public java.lang.Object getIcons() {
		return _icons;
	}

	public java.lang.Object getEditableId() {
		return _editableId;
	}

	public java.lang.String getInitialized() {
		return _initialized;
	}

	public java.lang.Object getInputType() {
		return _inputType;
	}

	public java.lang.Object getNode() {
		return _node;
	}

	public java.lang.String getRender() {
		return _render;
	}

	public java.lang.Object getRenderTo() {
		return _renderTo;
	}

	public java.lang.String getRendered() {
		return _rendered;
	}

	public java.lang.Object getSaveButton() {
		return _saveButton;
	}

	public java.lang.Object getSrcNode() {
		return _srcNode;
	}

	public java.lang.Object getStrings() {
		return _strings;
	}

	public java.lang.String getTabIndex() {
		return _tabIndex;
	}

	public java.lang.String getVisible() {
		return _visible;
	}

	public java.lang.Object getWidth() {
		return _width;
	}

	public java.lang.Object getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.Object getAfterCancel() {
		return _afterCancel;
	}

	public java.lang.Object getAfterCancelButtonChange() {
		return _afterCancelButtonChange;
	}

	public java.lang.Object getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.Object getAfterContentTextChange() {
		return _afterContentTextChange;
	}

	public java.lang.Object getAfterCssClassChange() {
		return _afterCssClassChange;
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

	public java.lang.Object getAfterEventTypeChange() {
		return _afterEventTypeChange;
	}

	public java.lang.Object getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.Object getAfterFormatInputChange() {
		return _afterFormatInputChange;
	}

	public java.lang.Object getAfterFormatOutputChange() {
		return _afterFormatOutputChange;
	}

	public java.lang.Object getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.Object getAfterHideClassChange() {
		return _afterHideClassChange;
	}

	public java.lang.Object getAfterIconsChange() {
		return _afterIconsChange;
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

	public java.lang.Object getAfterInputTypeChange() {
		return _afterInputTypeChange;
	}

	public java.lang.Object getAfterNodeChange() {
		return _afterNodeChange;
	}

	public java.lang.Object getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.Object getAfterRenderToChange() {
		return _afterRenderToChange;
	}

	public java.lang.Object getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.Object getAfterSave() {
		return _afterSave;
	}

	public java.lang.Object getAfterSaveButtonChange() {
		return _afterSaveButtonChange;
	}

	public java.lang.Object getAfterSrcNodeChange() {
		return _afterSrcNodeChange;
	}

	public java.lang.Object getAfterStartEditing() {
		return _afterStartEditing;
	}

	public java.lang.Object getAfterStopEditing() {
		return _afterStopEditing;
	}

	public java.lang.Object getAfterStringsChange() {
		return _afterStringsChange;
	}

	public java.lang.Object getAfterTabIndexChange() {
		return _afterTabIndexChange;
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

	public java.lang.Object getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.Object getOnCancel() {
		return _onCancel;
	}

	public java.lang.Object getOnCancelButtonChange() {
		return _onCancelButtonChange;
	}

	public java.lang.Object getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.Object getOnContentTextChange() {
		return _onContentTextChange;
	}

	public java.lang.Object getOnCssClassChange() {
		return _onCssClassChange;
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

	public java.lang.Object getOnEventTypeChange() {
		return _onEventTypeChange;
	}

	public java.lang.Object getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.Object getOnFormatInputChange() {
		return _onFormatInputChange;
	}

	public java.lang.Object getOnFormatOutputChange() {
		return _onFormatOutputChange;
	}

	public java.lang.Object getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.Object getOnHideClassChange() {
		return _onHideClassChange;
	}

	public java.lang.Object getOnIconsChange() {
		return _onIconsChange;
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

	public java.lang.Object getOnInputTypeChange() {
		return _onInputTypeChange;
	}

	public java.lang.Object getOnNodeChange() {
		return _onNodeChange;
	}

	public java.lang.Object getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.Object getOnRenderToChange() {
		return _onRenderToChange;
	}

	public java.lang.Object getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.Object getOnSave() {
		return _onSave;
	}

	public java.lang.Object getOnSaveButtonChange() {
		return _onSaveButtonChange;
	}

	public java.lang.Object getOnSrcNodeChange() {
		return _onSrcNodeChange;
	}

	public java.lang.Object getOnStartEditing() {
		return _onStartEditing;
	}

	public java.lang.Object getOnStopEditing() {
		return _onStopEditing;
	}

	public java.lang.Object getOnStringsChange() {
		return _onStringsChange;
	}

	public java.lang.Object getOnTabIndexChange() {
		return _onTabIndexChange;
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

	public void setBoundingBox(java.lang.Object boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setCancelButton(java.lang.Object cancelButton) {
		_cancelButton = cancelButton;

		setScopedAttribute("cancelButton", cancelButton);
	}

	public void setContentBox(java.lang.Object contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setContentText(java.lang.Object contentText) {
		_contentText = contentText;

		setScopedAttribute("contentText", contentText);
	}

	public void setCssClass(java.lang.Object cssClass) {
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

	public void setEventType(java.lang.Object eventType) {
		_eventType = eventType;

		setScopedAttribute("eventType", eventType);
	}

	public void setFocused(java.lang.String focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setFormatInput(java.lang.Object formatInput) {
		_formatInput = formatInput;

		setScopedAttribute("formatInput", formatInput);
	}

	public void setFormatOutput(java.lang.Object formatOutput) {
		_formatOutput = formatOutput;

		setScopedAttribute("formatOutput", formatOutput);
	}

	public void setHeight(java.lang.Object height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setHideClass(java.lang.Object hideClass) {
		_hideClass = hideClass;

		setScopedAttribute("hideClass", hideClass);
	}

	public void setIcons(java.lang.Object icons) {
		_icons = icons;

		setScopedAttribute("icons", icons);
	}

	public void setEditableId(java.lang.Object editableId) {
		_editableId = editableId;

		setScopedAttribute("editableId", editableId);
	}

	public void setInitialized(java.lang.String initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setInputType(java.lang.Object inputType) {
		_inputType = inputType;

		setScopedAttribute("inputType", inputType);
	}

	public void setNode(java.lang.Object node) {
		_node = node;

		setScopedAttribute("node", node);
	}

	public void setRender(java.lang.String render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRenderTo(java.lang.Object renderTo) {
		_renderTo = renderTo;

		setScopedAttribute("renderTo", renderTo);
	}

	public void setRendered(java.lang.String rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setSaveButton(java.lang.Object saveButton) {
		_saveButton = saveButton;

		setScopedAttribute("saveButton", saveButton);
	}

	public void setSrcNode(java.lang.Object srcNode) {
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

	public void setVisible(java.lang.String visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setWidth(java.lang.Object width) {
		_width = width;

		setScopedAttribute("width", width);
	}

	public void setAfterBoundingBoxChange(java.lang.Object afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterCancel(java.lang.Object afterCancel) {
		_afterCancel = afterCancel;

		setScopedAttribute("afterCancel", afterCancel);
	}

	public void setAfterCancelButtonChange(java.lang.Object afterCancelButtonChange) {
		_afterCancelButtonChange = afterCancelButtonChange;

		setScopedAttribute("afterCancelButtonChange", afterCancelButtonChange);
	}

	public void setAfterContentBoxChange(java.lang.Object afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterContentTextChange(java.lang.Object afterContentTextChange) {
		_afterContentTextChange = afterContentTextChange;

		setScopedAttribute("afterContentTextChange", afterContentTextChange);
	}

	public void setAfterCssClassChange(java.lang.Object afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
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

	public void setAfterEventTypeChange(java.lang.Object afterEventTypeChange) {
		_afterEventTypeChange = afterEventTypeChange;

		setScopedAttribute("afterEventTypeChange", afterEventTypeChange);
	}

	public void setAfterFocusedChange(java.lang.Object afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterFormatInputChange(java.lang.Object afterFormatInputChange) {
		_afterFormatInputChange = afterFormatInputChange;

		setScopedAttribute("afterFormatInputChange", afterFormatInputChange);
	}

	public void setAfterFormatOutputChange(java.lang.Object afterFormatOutputChange) {
		_afterFormatOutputChange = afterFormatOutputChange;

		setScopedAttribute("afterFormatOutputChange", afterFormatOutputChange);
	}

	public void setAfterHeightChange(java.lang.Object afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterHideClassChange(java.lang.Object afterHideClassChange) {
		_afterHideClassChange = afterHideClassChange;

		setScopedAttribute("afterHideClassChange", afterHideClassChange);
	}

	public void setAfterIconsChange(java.lang.Object afterIconsChange) {
		_afterIconsChange = afterIconsChange;

		setScopedAttribute("afterIconsChange", afterIconsChange);
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

	public void setAfterInputTypeChange(java.lang.Object afterInputTypeChange) {
		_afterInputTypeChange = afterInputTypeChange;

		setScopedAttribute("afterInputTypeChange", afterInputTypeChange);
	}

	public void setAfterNodeChange(java.lang.Object afterNodeChange) {
		_afterNodeChange = afterNodeChange;

		setScopedAttribute("afterNodeChange", afterNodeChange);
	}

	public void setAfterRenderChange(java.lang.Object afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderToChange(java.lang.Object afterRenderToChange) {
		_afterRenderToChange = afterRenderToChange;

		setScopedAttribute("afterRenderToChange", afterRenderToChange);
	}

	public void setAfterRenderedChange(java.lang.Object afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterSave(java.lang.Object afterSave) {
		_afterSave = afterSave;

		setScopedAttribute("afterSave", afterSave);
	}

	public void setAfterSaveButtonChange(java.lang.Object afterSaveButtonChange) {
		_afterSaveButtonChange = afterSaveButtonChange;

		setScopedAttribute("afterSaveButtonChange", afterSaveButtonChange);
	}

	public void setAfterSrcNodeChange(java.lang.Object afterSrcNodeChange) {
		_afterSrcNodeChange = afterSrcNodeChange;

		setScopedAttribute("afterSrcNodeChange", afterSrcNodeChange);
	}

	public void setAfterStartEditing(java.lang.Object afterStartEditing) {
		_afterStartEditing = afterStartEditing;

		setScopedAttribute("afterStartEditing", afterStartEditing);
	}

	public void setAfterStopEditing(java.lang.Object afterStopEditing) {
		_afterStopEditing = afterStopEditing;

		setScopedAttribute("afterStopEditing", afterStopEditing);
	}

	public void setAfterStringsChange(java.lang.Object afterStringsChange) {
		_afterStringsChange = afterStringsChange;

		setScopedAttribute("afterStringsChange", afterStringsChange);
	}

	public void setAfterTabIndexChange(java.lang.Object afterTabIndexChange) {
		_afterTabIndexChange = afterTabIndexChange;

		setScopedAttribute("afterTabIndexChange", afterTabIndexChange);
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

	public void setOnBoundingBoxChange(java.lang.Object onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnCancel(java.lang.Object onCancel) {
		_onCancel = onCancel;

		setScopedAttribute("onCancel", onCancel);
	}

	public void setOnCancelButtonChange(java.lang.Object onCancelButtonChange) {
		_onCancelButtonChange = onCancelButtonChange;

		setScopedAttribute("onCancelButtonChange", onCancelButtonChange);
	}

	public void setOnContentBoxChange(java.lang.Object onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnContentTextChange(java.lang.Object onContentTextChange) {
		_onContentTextChange = onContentTextChange;

		setScopedAttribute("onContentTextChange", onContentTextChange);
	}

	public void setOnCssClassChange(java.lang.Object onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
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

	public void setOnEventTypeChange(java.lang.Object onEventTypeChange) {
		_onEventTypeChange = onEventTypeChange;

		setScopedAttribute("onEventTypeChange", onEventTypeChange);
	}

	public void setOnFocusedChange(java.lang.Object onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnFormatInputChange(java.lang.Object onFormatInputChange) {
		_onFormatInputChange = onFormatInputChange;

		setScopedAttribute("onFormatInputChange", onFormatInputChange);
	}

	public void setOnFormatOutputChange(java.lang.Object onFormatOutputChange) {
		_onFormatOutputChange = onFormatOutputChange;

		setScopedAttribute("onFormatOutputChange", onFormatOutputChange);
	}

	public void setOnHeightChange(java.lang.Object onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnHideClassChange(java.lang.Object onHideClassChange) {
		_onHideClassChange = onHideClassChange;

		setScopedAttribute("onHideClassChange", onHideClassChange);
	}

	public void setOnIconsChange(java.lang.Object onIconsChange) {
		_onIconsChange = onIconsChange;

		setScopedAttribute("onIconsChange", onIconsChange);
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

	public void setOnInputTypeChange(java.lang.Object onInputTypeChange) {
		_onInputTypeChange = onInputTypeChange;

		setScopedAttribute("onInputTypeChange", onInputTypeChange);
	}

	public void setOnNodeChange(java.lang.Object onNodeChange) {
		_onNodeChange = onNodeChange;

		setScopedAttribute("onNodeChange", onNodeChange);
	}

	public void setOnRenderChange(java.lang.Object onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderToChange(java.lang.Object onRenderToChange) {
		_onRenderToChange = onRenderToChange;

		setScopedAttribute("onRenderToChange", onRenderToChange);
	}

	public void setOnRenderedChange(java.lang.Object onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnSave(java.lang.Object onSave) {
		_onSave = onSave;

		setScopedAttribute("onSave", onSave);
	}

	public void setOnSaveButtonChange(java.lang.Object onSaveButtonChange) {
		_onSaveButtonChange = onSaveButtonChange;

		setScopedAttribute("onSaveButtonChange", onSaveButtonChange);
	}

	public void setOnSrcNodeChange(java.lang.Object onSrcNodeChange) {
		_onSrcNodeChange = onSrcNodeChange;

		setScopedAttribute("onSrcNodeChange", onSrcNodeChange);
	}

	public void setOnStartEditing(java.lang.Object onStartEditing) {
		_onStartEditing = onStartEditing;

		setScopedAttribute("onStartEditing", onStartEditing);
	}

	public void setOnStopEditing(java.lang.Object onStopEditing) {
		_onStopEditing = onStopEditing;

		setScopedAttribute("onStopEditing", onStopEditing);
	}

	public void setOnStringsChange(java.lang.Object onStringsChange) {
		_onStringsChange = onStringsChange;

		setScopedAttribute("onStringsChange", onStringsChange);
	}

	public void setOnTabIndexChange(java.lang.Object onTabIndexChange) {
		_onTabIndexChange = onTabIndexChange;

		setScopedAttribute("onTabIndexChange", onTabIndexChange);
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

	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "cancelButton", _cancelButton);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "contentText", _contentText);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "eventType", _eventType);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "formatInput", _formatInput);
		setNamespacedAttribute(request, "formatOutput", _formatOutput);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "icons", _icons);
		setNamespacedAttribute(request, "editableId", _editableId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "inputType", _inputType);
		setNamespacedAttribute(request, "node", _node);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "renderTo", _renderTo);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "saveButton", _saveButton);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterCancel", _afterCancel);
		setNamespacedAttribute(request, "afterCancelButtonChange", _afterCancelButtonChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterContentTextChange", _afterContentTextChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterEventTypeChange", _afterEventTypeChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterFormatInputChange", _afterFormatInputChange);
		setNamespacedAttribute(request, "afterFormatOutputChange", _afterFormatOutputChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterHideClassChange", _afterHideClassChange);
		setNamespacedAttribute(request, "afterIconsChange", _afterIconsChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterInputTypeChange", _afterInputTypeChange);
		setNamespacedAttribute(request, "afterNodeChange", _afterNodeChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderToChange", _afterRenderToChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterSave", _afterSave);
		setNamespacedAttribute(request, "afterSaveButtonChange", _afterSaveButtonChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStartEditing", _afterStartEditing);
		setNamespacedAttribute(request, "afterStopEditing", _afterStopEditing);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onCancel", _onCancel);
		setNamespacedAttribute(request, "onCancelButtonChange", _onCancelButtonChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onContentTextChange", _onContentTextChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onEventTypeChange", _onEventTypeChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onFormatInputChange", _onFormatInputChange);
		setNamespacedAttribute(request, "onFormatOutputChange", _onFormatOutputChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onHideClassChange", _onHideClassChange);
		setNamespacedAttribute(request, "onIconsChange", _onIconsChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onInputTypeChange", _onInputTypeChange);
		setNamespacedAttribute(request, "onNodeChange", _onNodeChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderToChange", _onRenderToChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onSave", _onSave);
		setNamespacedAttribute(request, "onSaveButtonChange", _onSaveButtonChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStartEditing", _onStartEditing);
		setNamespacedAttribute(request, "onStopEditing", _onStopEditing);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:editable:";

	private static final String _PAGE =
		"/html/taglib/alloy/editable/page.jsp";

	private java.lang.Object _boundingBox;
	private java.lang.Object _cancelButton;
	private java.lang.Object _contentBox;
	private java.lang.Object _contentText;
	private java.lang.Object _cssClass;
	private java.lang.String _destroyed;
	private java.lang.String _disabled;
	private java.lang.Object _eventType;
	private java.lang.String _focused;
	private java.lang.Object _formatInput;
	private java.lang.Object _formatOutput;
	private java.lang.Object _height;
	private java.lang.Object _hideClass;
	private java.lang.Object _icons;
	private java.lang.Object _editableId;
	private java.lang.String _initialized;
	private java.lang.Object _inputType;
	private java.lang.Object _node;
	private java.lang.String _render;
	private java.lang.Object _renderTo;
	private java.lang.String _rendered;
	private java.lang.Object _saveButton;
	private java.lang.Object _srcNode;
	private java.lang.Object _strings;
	private java.lang.String _tabIndex;
	private java.lang.String _visible;
	private java.lang.Object _width;
	private java.lang.Object _afterBoundingBoxChange;
	private java.lang.Object _afterCancel;
	private java.lang.Object _afterCancelButtonChange;
	private java.lang.Object _afterContentBoxChange;
	private java.lang.Object _afterContentTextChange;
	private java.lang.Object _afterCssClassChange;
	private java.lang.Object _afterDestroy;
	private java.lang.Object _afterDestroyedChange;
	private java.lang.Object _afterDisabledChange;
	private java.lang.Object _afterEventTypeChange;
	private java.lang.Object _afterFocusedChange;
	private java.lang.Object _afterFormatInputChange;
	private java.lang.Object _afterFormatOutputChange;
	private java.lang.Object _afterHeightChange;
	private java.lang.Object _afterHideClassChange;
	private java.lang.Object _afterIconsChange;
	private java.lang.Object _afterIdChange;
	private java.lang.Object _afterInit;
	private java.lang.Object _afterInitializedChange;
	private java.lang.Object _afterInputTypeChange;
	private java.lang.Object _afterNodeChange;
	private java.lang.Object _afterRenderChange;
	private java.lang.Object _afterRenderToChange;
	private java.lang.Object _afterRenderedChange;
	private java.lang.Object _afterSave;
	private java.lang.Object _afterSaveButtonChange;
	private java.lang.Object _afterSrcNodeChange;
	private java.lang.Object _afterStartEditing;
	private java.lang.Object _afterStopEditing;
	private java.lang.Object _afterStringsChange;
	private java.lang.Object _afterTabIndexChange;
	private java.lang.Object _afterVisibleChange;
	private java.lang.Object _afterContentUpdate;
	private java.lang.Object _afterRender;
	private java.lang.Object _afterWidthChange;
	private java.lang.Object _onBoundingBoxChange;
	private java.lang.Object _onCancel;
	private java.lang.Object _onCancelButtonChange;
	private java.lang.Object _onContentBoxChange;
	private java.lang.Object _onContentTextChange;
	private java.lang.Object _onCssClassChange;
	private java.lang.Object _onDestroy;
	private java.lang.Object _onDestroyedChange;
	private java.lang.Object _onDisabledChange;
	private java.lang.Object _onEventTypeChange;
	private java.lang.Object _onFocusedChange;
	private java.lang.Object _onFormatInputChange;
	private java.lang.Object _onFormatOutputChange;
	private java.lang.Object _onHeightChange;
	private java.lang.Object _onHideClassChange;
	private java.lang.Object _onIconsChange;
	private java.lang.Object _onIdChange;
	private java.lang.Object _onInit;
	private java.lang.Object _onInitializedChange;
	private java.lang.Object _onInputTypeChange;
	private java.lang.Object _onNodeChange;
	private java.lang.Object _onRenderChange;
	private java.lang.Object _onRenderToChange;
	private java.lang.Object _onRenderedChange;
	private java.lang.Object _onSave;
	private java.lang.Object _onSaveButtonChange;
	private java.lang.Object _onSrcNodeChange;
	private java.lang.Object _onStartEditing;
	private java.lang.Object _onStopEditing;
	private java.lang.Object _onStringsChange;
	private java.lang.Object _onTabIndexChange;
	private java.lang.Object _onVisibleChange;
	private java.lang.Object _onContentUpdate;
	private java.lang.Object _onRender;
	private java.lang.Object _onWidthChange;

}
