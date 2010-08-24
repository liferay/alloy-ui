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

	public java.lang.String getBoundingBox() {
		return _boundingBox;
	}

	public java.lang.String getCancelButton() {
		return _cancelButton;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.String getContentText() {
		return _contentText;
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

	public java.lang.String getEventType() {
		return _eventType;
	}

	public java.lang.String getFocused() {
		return _focused;
	}

	public java.lang.String getFormatInput() {
		return _formatInput;
	}

	public java.lang.String getFormatOutput() {
		return _formatOutput;
	}

	public java.lang.String getHeight() {
		return _height;
	}

	public java.lang.String getHideClass() {
		return _hideClass;
	}

	public java.lang.Object getIcons() {
		return _icons;
	}

	public java.lang.String getEditableId() {
		return _editableId;
	}

	public java.lang.String getInitialized() {
		return _initialized;
	}

	public java.lang.String getInputType() {
		return _inputType;
	}

	public java.lang.String getNode() {
		return _node;
	}

	public java.lang.String getRender() {
		return _render;
	}

	public java.lang.String getRenderTo() {
		return _renderTo;
	}

	public java.lang.String getRendered() {
		return _rendered;
	}

	public java.lang.String getSaveButton() {
		return _saveButton;
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

	public java.lang.String getVisible() {
		return _visible;
	}

	public java.lang.String getWidth() {
		return _width;
	}

	public java.lang.String getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.String getAfterCancel() {
		return _afterCancel;
	}

	public java.lang.String getAfterCancelButtonChange() {
		return _afterCancelButtonChange;
	}

	public java.lang.String getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.String getAfterContentTextChange() {
		return _afterContentTextChange;
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

	public java.lang.String getAfterEventTypeChange() {
		return _afterEventTypeChange;
	}

	public java.lang.String getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.String getAfterFormatInputChange() {
		return _afterFormatInputChange;
	}

	public java.lang.String getAfterFormatOutputChange() {
		return _afterFormatOutputChange;
	}

	public java.lang.String getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.String getAfterHideClassChange() {
		return _afterHideClassChange;
	}

	public java.lang.String getAfterIconsChange() {
		return _afterIconsChange;
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

	public java.lang.String getAfterInputTypeChange() {
		return _afterInputTypeChange;
	}

	public java.lang.String getAfterNodeChange() {
		return _afterNodeChange;
	}

	public java.lang.String getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.String getAfterRenderToChange() {
		return _afterRenderToChange;
	}

	public java.lang.String getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.String getAfterSave() {
		return _afterSave;
	}

	public java.lang.String getAfterSaveButtonChange() {
		return _afterSaveButtonChange;
	}

	public java.lang.String getAfterSrcNodeChange() {
		return _afterSrcNodeChange;
	}

	public java.lang.String getAfterStartEditing() {
		return _afterStartEditing;
	}

	public java.lang.String getAfterStopEditing() {
		return _afterStopEditing;
	}

	public java.lang.String getAfterStringsChange() {
		return _afterStringsChange;
	}

	public java.lang.String getAfterTabIndexChange() {
		return _afterTabIndexChange;
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

	public java.lang.String getOnCancel() {
		return _onCancel;
	}

	public java.lang.String getOnCancelButtonChange() {
		return _onCancelButtonChange;
	}

	public java.lang.String getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.String getOnContentTextChange() {
		return _onContentTextChange;
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

	public java.lang.String getOnEventTypeChange() {
		return _onEventTypeChange;
	}

	public java.lang.String getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.String getOnFormatInputChange() {
		return _onFormatInputChange;
	}

	public java.lang.String getOnFormatOutputChange() {
		return _onFormatOutputChange;
	}

	public java.lang.String getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.String getOnHideClassChange() {
		return _onHideClassChange;
	}

	public java.lang.String getOnIconsChange() {
		return _onIconsChange;
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

	public java.lang.String getOnInputTypeChange() {
		return _onInputTypeChange;
	}

	public java.lang.String getOnNodeChange() {
		return _onNodeChange;
	}

	public java.lang.String getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.String getOnRenderToChange() {
		return _onRenderToChange;
	}

	public java.lang.String getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.String getOnSave() {
		return _onSave;
	}

	public java.lang.String getOnSaveButtonChange() {
		return _onSaveButtonChange;
	}

	public java.lang.String getOnSrcNodeChange() {
		return _onSrcNodeChange;
	}

	public java.lang.String getOnStartEditing() {
		return _onStartEditing;
	}

	public java.lang.String getOnStopEditing() {
		return _onStopEditing;
	}

	public java.lang.String getOnStringsChange() {
		return _onStringsChange;
	}

	public java.lang.String getOnTabIndexChange() {
		return _onTabIndexChange;
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

	public void setCancelButton(java.lang.String cancelButton) {
		_cancelButton = cancelButton;

		setScopedAttribute("cancelButton", cancelButton);
	}

	public void setContentBox(java.lang.String contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setContentText(java.lang.String contentText) {
		_contentText = contentText;

		setScopedAttribute("contentText", contentText);
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

	public void setEventType(java.lang.String eventType) {
		_eventType = eventType;

		setScopedAttribute("eventType", eventType);
	}

	public void setFocused(java.lang.String focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setFormatInput(java.lang.String formatInput) {
		_formatInput = formatInput;

		setScopedAttribute("formatInput", formatInput);
	}

	public void setFormatOutput(java.lang.String formatOutput) {
		_formatOutput = formatOutput;

		setScopedAttribute("formatOutput", formatOutput);
	}

	public void setHeight(java.lang.String height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setHideClass(java.lang.String hideClass) {
		_hideClass = hideClass;

		setScopedAttribute("hideClass", hideClass);
	}

	public void setIcons(java.lang.Object icons) {
		_icons = icons;

		setScopedAttribute("icons", icons);
	}

	public void setEditableId(java.lang.String editableId) {
		_editableId = editableId;

		setScopedAttribute("editableId", editableId);
	}

	public void setInitialized(java.lang.String initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setInputType(java.lang.String inputType) {
		_inputType = inputType;

		setScopedAttribute("inputType", inputType);
	}

	public void setNode(java.lang.String node) {
		_node = node;

		setScopedAttribute("node", node);
	}

	public void setRender(java.lang.String render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRenderTo(java.lang.String renderTo) {
		_renderTo = renderTo;

		setScopedAttribute("renderTo", renderTo);
	}

	public void setRendered(java.lang.String rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setSaveButton(java.lang.String saveButton) {
		_saveButton = saveButton;

		setScopedAttribute("saveButton", saveButton);
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

	public void setAfterCancel(java.lang.String afterCancel) {
		_afterCancel = afterCancel;

		setScopedAttribute("afterCancel", afterCancel);
	}

	public void setAfterCancelButtonChange(java.lang.String afterCancelButtonChange) {
		_afterCancelButtonChange = afterCancelButtonChange;

		setScopedAttribute("afterCancelButtonChange", afterCancelButtonChange);
	}

	public void setAfterContentBoxChange(java.lang.String afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterContentTextChange(java.lang.String afterContentTextChange) {
		_afterContentTextChange = afterContentTextChange;

		setScopedAttribute("afterContentTextChange", afterContentTextChange);
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

	public void setAfterEventTypeChange(java.lang.String afterEventTypeChange) {
		_afterEventTypeChange = afterEventTypeChange;

		setScopedAttribute("afterEventTypeChange", afterEventTypeChange);
	}

	public void setAfterFocusedChange(java.lang.String afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterFormatInputChange(java.lang.String afterFormatInputChange) {
		_afterFormatInputChange = afterFormatInputChange;

		setScopedAttribute("afterFormatInputChange", afterFormatInputChange);
	}

	public void setAfterFormatOutputChange(java.lang.String afterFormatOutputChange) {
		_afterFormatOutputChange = afterFormatOutputChange;

		setScopedAttribute("afterFormatOutputChange", afterFormatOutputChange);
	}

	public void setAfterHeightChange(java.lang.String afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterHideClassChange(java.lang.String afterHideClassChange) {
		_afterHideClassChange = afterHideClassChange;

		setScopedAttribute("afterHideClassChange", afterHideClassChange);
	}

	public void setAfterIconsChange(java.lang.String afterIconsChange) {
		_afterIconsChange = afterIconsChange;

		setScopedAttribute("afterIconsChange", afterIconsChange);
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

	public void setAfterInputTypeChange(java.lang.String afterInputTypeChange) {
		_afterInputTypeChange = afterInputTypeChange;

		setScopedAttribute("afterInputTypeChange", afterInputTypeChange);
	}

	public void setAfterNodeChange(java.lang.String afterNodeChange) {
		_afterNodeChange = afterNodeChange;

		setScopedAttribute("afterNodeChange", afterNodeChange);
	}

	public void setAfterRenderChange(java.lang.String afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderToChange(java.lang.String afterRenderToChange) {
		_afterRenderToChange = afterRenderToChange;

		setScopedAttribute("afterRenderToChange", afterRenderToChange);
	}

	public void setAfterRenderedChange(java.lang.String afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterSave(java.lang.String afterSave) {
		_afterSave = afterSave;

		setScopedAttribute("afterSave", afterSave);
	}

	public void setAfterSaveButtonChange(java.lang.String afterSaveButtonChange) {
		_afterSaveButtonChange = afterSaveButtonChange;

		setScopedAttribute("afterSaveButtonChange", afterSaveButtonChange);
	}

	public void setAfterSrcNodeChange(java.lang.String afterSrcNodeChange) {
		_afterSrcNodeChange = afterSrcNodeChange;

		setScopedAttribute("afterSrcNodeChange", afterSrcNodeChange);
	}

	public void setAfterStartEditing(java.lang.String afterStartEditing) {
		_afterStartEditing = afterStartEditing;

		setScopedAttribute("afterStartEditing", afterStartEditing);
	}

	public void setAfterStopEditing(java.lang.String afterStopEditing) {
		_afterStopEditing = afterStopEditing;

		setScopedAttribute("afterStopEditing", afterStopEditing);
	}

	public void setAfterStringsChange(java.lang.String afterStringsChange) {
		_afterStringsChange = afterStringsChange;

		setScopedAttribute("afterStringsChange", afterStringsChange);
	}

	public void setAfterTabIndexChange(java.lang.String afterTabIndexChange) {
		_afterTabIndexChange = afterTabIndexChange;

		setScopedAttribute("afterTabIndexChange", afterTabIndexChange);
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

	public void setOnCancel(java.lang.String onCancel) {
		_onCancel = onCancel;

		setScopedAttribute("onCancel", onCancel);
	}

	public void setOnCancelButtonChange(java.lang.String onCancelButtonChange) {
		_onCancelButtonChange = onCancelButtonChange;

		setScopedAttribute("onCancelButtonChange", onCancelButtonChange);
	}

	public void setOnContentBoxChange(java.lang.String onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnContentTextChange(java.lang.String onContentTextChange) {
		_onContentTextChange = onContentTextChange;

		setScopedAttribute("onContentTextChange", onContentTextChange);
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

	public void setOnEventTypeChange(java.lang.String onEventTypeChange) {
		_onEventTypeChange = onEventTypeChange;

		setScopedAttribute("onEventTypeChange", onEventTypeChange);
	}

	public void setOnFocusedChange(java.lang.String onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnFormatInputChange(java.lang.String onFormatInputChange) {
		_onFormatInputChange = onFormatInputChange;

		setScopedAttribute("onFormatInputChange", onFormatInputChange);
	}

	public void setOnFormatOutputChange(java.lang.String onFormatOutputChange) {
		_onFormatOutputChange = onFormatOutputChange;

		setScopedAttribute("onFormatOutputChange", onFormatOutputChange);
	}

	public void setOnHeightChange(java.lang.String onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnHideClassChange(java.lang.String onHideClassChange) {
		_onHideClassChange = onHideClassChange;

		setScopedAttribute("onHideClassChange", onHideClassChange);
	}

	public void setOnIconsChange(java.lang.String onIconsChange) {
		_onIconsChange = onIconsChange;

		setScopedAttribute("onIconsChange", onIconsChange);
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

	public void setOnInputTypeChange(java.lang.String onInputTypeChange) {
		_onInputTypeChange = onInputTypeChange;

		setScopedAttribute("onInputTypeChange", onInputTypeChange);
	}

	public void setOnNodeChange(java.lang.String onNodeChange) {
		_onNodeChange = onNodeChange;

		setScopedAttribute("onNodeChange", onNodeChange);
	}

	public void setOnRenderChange(java.lang.String onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderToChange(java.lang.String onRenderToChange) {
		_onRenderToChange = onRenderToChange;

		setScopedAttribute("onRenderToChange", onRenderToChange);
	}

	public void setOnRenderedChange(java.lang.String onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnSave(java.lang.String onSave) {
		_onSave = onSave;

		setScopedAttribute("onSave", onSave);
	}

	public void setOnSaveButtonChange(java.lang.String onSaveButtonChange) {
		_onSaveButtonChange = onSaveButtonChange;

		setScopedAttribute("onSaveButtonChange", onSaveButtonChange);
	}

	public void setOnSrcNodeChange(java.lang.String onSrcNodeChange) {
		_onSrcNodeChange = onSrcNodeChange;

		setScopedAttribute("onSrcNodeChange", onSrcNodeChange);
	}

	public void setOnStartEditing(java.lang.String onStartEditing) {
		_onStartEditing = onStartEditing;

		setScopedAttribute("onStartEditing", onStartEditing);
	}

	public void setOnStopEditing(java.lang.String onStopEditing) {
		_onStopEditing = onStopEditing;

		setScopedAttribute("onStopEditing", onStopEditing);
	}

	public void setOnStringsChange(java.lang.String onStringsChange) {
		_onStringsChange = onStringsChange;

		setScopedAttribute("onStringsChange", onStringsChange);
	}

	public void setOnTabIndexChange(java.lang.String onTabIndexChange) {
		_onTabIndexChange = onTabIndexChange;

		setScopedAttribute("onTabIndexChange", onTabIndexChange);
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

	private java.lang.String _boundingBox;
	private java.lang.String _cancelButton;
	private java.lang.String _contentBox;
	private java.lang.String _contentText;
	private java.lang.String _cssClass;
	private java.lang.String _destroyed;
	private java.lang.String _disabled;
	private java.lang.String _eventType;
	private java.lang.String _focused;
	private java.lang.String _formatInput;
	private java.lang.String _formatOutput;
	private java.lang.String _height;
	private java.lang.String _hideClass;
	private java.lang.Object _icons;
	private java.lang.String _editableId;
	private java.lang.String _initialized;
	private java.lang.String _inputType;
	private java.lang.String _node;
	private java.lang.String _render;
	private java.lang.String _renderTo;
	private java.lang.String _rendered;
	private java.lang.String _saveButton;
	private java.lang.String _srcNode;
	private java.lang.Object _strings;
	private java.lang.String _tabIndex;
	private java.lang.String _visible;
	private java.lang.String _width;
	private java.lang.String _afterBoundingBoxChange;
	private java.lang.String _afterCancel;
	private java.lang.String _afterCancelButtonChange;
	private java.lang.String _afterContentBoxChange;
	private java.lang.String _afterContentTextChange;
	private java.lang.String _afterCssClassChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterDisabledChange;
	private java.lang.String _afterEventTypeChange;
	private java.lang.String _afterFocusedChange;
	private java.lang.String _afterFormatInputChange;
	private java.lang.String _afterFormatOutputChange;
	private java.lang.String _afterHeightChange;
	private java.lang.String _afterHideClassChange;
	private java.lang.String _afterIconsChange;
	private java.lang.String _afterIdChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterInputTypeChange;
	private java.lang.String _afterNodeChange;
	private java.lang.String _afterRenderChange;
	private java.lang.String _afterRenderToChange;
	private java.lang.String _afterRenderedChange;
	private java.lang.String _afterSave;
	private java.lang.String _afterSaveButtonChange;
	private java.lang.String _afterSrcNodeChange;
	private java.lang.String _afterStartEditing;
	private java.lang.String _afterStopEditing;
	private java.lang.String _afterStringsChange;
	private java.lang.String _afterTabIndexChange;
	private java.lang.String _afterVisibleChange;
	private java.lang.String _afterContentUpdate;
	private java.lang.String _afterRender;
	private java.lang.String _afterWidthChange;
	private java.lang.String _onBoundingBoxChange;
	private java.lang.String _onCancel;
	private java.lang.String _onCancelButtonChange;
	private java.lang.String _onContentBoxChange;
	private java.lang.String _onContentTextChange;
	private java.lang.String _onCssClassChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onDisabledChange;
	private java.lang.String _onEventTypeChange;
	private java.lang.String _onFocusedChange;
	private java.lang.String _onFormatInputChange;
	private java.lang.String _onFormatOutputChange;
	private java.lang.String _onHeightChange;
	private java.lang.String _onHideClassChange;
	private java.lang.String _onIconsChange;
	private java.lang.String _onIdChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onInputTypeChange;
	private java.lang.String _onNodeChange;
	private java.lang.String _onRenderChange;
	private java.lang.String _onRenderToChange;
	private java.lang.String _onRenderedChange;
	private java.lang.String _onSave;
	private java.lang.String _onSaveButtonChange;
	private java.lang.String _onSrcNodeChange;
	private java.lang.String _onStartEditing;
	private java.lang.String _onStopEditing;
	private java.lang.String _onStringsChange;
	private java.lang.String _onTabIndexChange;
	private java.lang.String _onVisibleChange;
	private java.lang.String _onContentUpdate;
	private java.lang.String _onRender;
	private java.lang.String _onWidthChange;

}
