package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseRatingTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseRatingTag extends IncludeTag {

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

	public java.lang.String getCanReset() {
		return _canReset;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.String getCssClass() {
		return _cssClass;
	}

	public java.lang.String getDefaultSelected() {
		return _defaultSelected;
	}

	public java.lang.String getDestroyed() {
		return _destroyed;
	}

	public java.lang.String getDisabled() {
		return _disabled;
	}

	public java.lang.String getElements() {
		return _elements;
	}

	public java.lang.String getFocused() {
		return _focused;
	}

	public java.lang.String getHeight() {
		return _height;
	}

	public java.lang.String getHiddenInput() {
		return _hiddenInput;
	}

	public java.lang.String getHideClass() {
		return _hideClass;
	}

	public java.lang.String getRatingId() {
		return _ratingId;
	}

	public java.lang.String getInitialized() {
		return _initialized;
	}

	public java.lang.String getInputName() {
		return _inputName;
	}

	public java.lang.String getLabel() {
		return _label;
	}

	public java.lang.String getLabelNode() {
		return _labelNode;
	}

	public java.lang.String getRender() {
		return _render;
	}

	public java.lang.String getRendered() {
		return _rendered;
	}

	public java.lang.String getSelectedIndex() {
		return _selectedIndex;
	}

	public java.lang.String getShowTitle() {
		return _showTitle;
	}

	public java.lang.String getSize() {
		return _size;
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

	public java.lang.String getTitle() {
		return _title;
	}

	public java.lang.String getRatingValue() {
		return _ratingValue;
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

	public java.lang.String getAfterCanResetChange() {
		return _afterCanResetChange;
	}

	public java.lang.String getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.String getAfterCssClassChange() {
		return _afterCssClassChange;
	}

	public java.lang.String getAfterDefaultSelectedChange() {
		return _afterDefaultSelectedChange;
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

	public java.lang.String getAfterElementsChange() {
		return _afterElementsChange;
	}

	public java.lang.String getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.String getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.String getAfterHiddenInputChange() {
		return _afterHiddenInputChange;
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

	public java.lang.String getAfterInputNameChange() {
		return _afterInputNameChange;
	}

	public java.lang.String getAfterItemClick() {
		return _afterItemClick;
	}

	public java.lang.String getAfterItemOut() {
		return _afterItemOut;
	}

	public java.lang.String getAfterItemSelect() {
		return _afterItemSelect;
	}

	public java.lang.String getAfterLabelChange() {
		return _afterLabelChange;
	}

	public java.lang.String getAfterLabelNodeChange() {
		return _afterLabelNodeChange;
	}

	public java.lang.String getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.String getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.String getAfterSelectedIndexChange() {
		return _afterSelectedIndexChange;
	}

	public java.lang.String getAfterShowTitleChange() {
		return _afterShowTitleChange;
	}

	public java.lang.String getAfterSizeChange() {
		return _afterSizeChange;
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

	public java.lang.String getAfterTitleChange() {
		return _afterTitleChange;
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

	public java.lang.String getOnCanResetChange() {
		return _onCanResetChange;
	}

	public java.lang.String getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.String getOnCssClassChange() {
		return _onCssClassChange;
	}

	public java.lang.String getOnDefaultSelectedChange() {
		return _onDefaultSelectedChange;
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

	public java.lang.String getOnElementsChange() {
		return _onElementsChange;
	}

	public java.lang.String getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.String getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.String getOnHiddenInputChange() {
		return _onHiddenInputChange;
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

	public java.lang.String getOnInputNameChange() {
		return _onInputNameChange;
	}

	public java.lang.String getOnItemClick() {
		return _onItemClick;
	}

	public java.lang.String getOnItemOut() {
		return _onItemOut;
	}

	public java.lang.String getOnItemSelect() {
		return _onItemSelect;
	}

	public java.lang.String getOnLabelChange() {
		return _onLabelChange;
	}

	public java.lang.String getOnLabelNodeChange() {
		return _onLabelNodeChange;
	}

	public java.lang.String getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.String getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.String getOnSelectedIndexChange() {
		return _onSelectedIndexChange;
	}

	public java.lang.String getOnShowTitleChange() {
		return _onShowTitleChange;
	}

	public java.lang.String getOnSizeChange() {
		return _onSizeChange;
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

	public java.lang.String getOnTitleChange() {
		return _onTitleChange;
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

	public void setCanReset(java.lang.String canReset) {
		_canReset = canReset;

		setScopedAttribute("canReset", canReset);
	}

	public void setContentBox(java.lang.String contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setCssClass(java.lang.String cssClass) {
		_cssClass = cssClass;

		setScopedAttribute("cssClass", cssClass);
	}

	public void setDefaultSelected(java.lang.String defaultSelected) {
		_defaultSelected = defaultSelected;

		setScopedAttribute("defaultSelected", defaultSelected);
	}

	public void setDestroyed(java.lang.String destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDisabled(java.lang.String disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	public void setElements(java.lang.String elements) {
		_elements = elements;

		setScopedAttribute("elements", elements);
	}

	public void setFocused(java.lang.String focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setHeight(java.lang.String height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setHiddenInput(java.lang.String hiddenInput) {
		_hiddenInput = hiddenInput;

		setScopedAttribute("hiddenInput", hiddenInput);
	}

	public void setHideClass(java.lang.String hideClass) {
		_hideClass = hideClass;

		setScopedAttribute("hideClass", hideClass);
	}

	public void setRatingId(java.lang.String ratingId) {
		_ratingId = ratingId;

		setScopedAttribute("ratingId", ratingId);
	}

	public void setInitialized(java.lang.String initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setInputName(java.lang.String inputName) {
		_inputName = inputName;

		setScopedAttribute("inputName", inputName);
	}

	public void setLabel(java.lang.String label) {
		_label = label;

		setScopedAttribute("label", label);
	}

	public void setLabelNode(java.lang.String labelNode) {
		_labelNode = labelNode;

		setScopedAttribute("labelNode", labelNode);
	}

	public void setRender(java.lang.String render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(java.lang.String rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setSelectedIndex(java.lang.String selectedIndex) {
		_selectedIndex = selectedIndex;

		setScopedAttribute("selectedIndex", selectedIndex);
	}

	public void setShowTitle(java.lang.String showTitle) {
		_showTitle = showTitle;

		setScopedAttribute("showTitle", showTitle);
	}

	public void setSize(java.lang.String size) {
		_size = size;

		setScopedAttribute("size", size);
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

	public void setTitle(java.lang.String title) {
		_title = title;

		setScopedAttribute("title", title);
	}

	public void setRatingValue(java.lang.String ratingValue) {
		_ratingValue = ratingValue;

		setScopedAttribute("ratingValue", ratingValue);
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

	public void setAfterCanResetChange(java.lang.String afterCanResetChange) {
		_afterCanResetChange = afterCanResetChange;

		setScopedAttribute("afterCanResetChange", afterCanResetChange);
	}

	public void setAfterContentBoxChange(java.lang.String afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.String afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
	}

	public void setAfterDefaultSelectedChange(java.lang.String afterDefaultSelectedChange) {
		_afterDefaultSelectedChange = afterDefaultSelectedChange;

		setScopedAttribute("afterDefaultSelectedChange", afterDefaultSelectedChange);
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

	public void setAfterElementsChange(java.lang.String afterElementsChange) {
		_afterElementsChange = afterElementsChange;

		setScopedAttribute("afterElementsChange", afterElementsChange);
	}

	public void setAfterFocusedChange(java.lang.String afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterHeightChange(java.lang.String afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterHiddenInputChange(java.lang.String afterHiddenInputChange) {
		_afterHiddenInputChange = afterHiddenInputChange;

		setScopedAttribute("afterHiddenInputChange", afterHiddenInputChange);
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

	public void setAfterInputNameChange(java.lang.String afterInputNameChange) {
		_afterInputNameChange = afterInputNameChange;

		setScopedAttribute("afterInputNameChange", afterInputNameChange);
	}

	public void setAfterItemClick(java.lang.String afterItemClick) {
		_afterItemClick = afterItemClick;

		setScopedAttribute("afterItemClick", afterItemClick);
	}

	public void setAfterItemOut(java.lang.String afterItemOut) {
		_afterItemOut = afterItemOut;

		setScopedAttribute("afterItemOut", afterItemOut);
	}

	public void setAfterItemSelect(java.lang.String afterItemSelect) {
		_afterItemSelect = afterItemSelect;

		setScopedAttribute("afterItemSelect", afterItemSelect);
	}

	public void setAfterLabelChange(java.lang.String afterLabelChange) {
		_afterLabelChange = afterLabelChange;

		setScopedAttribute("afterLabelChange", afterLabelChange);
	}

	public void setAfterLabelNodeChange(java.lang.String afterLabelNodeChange) {
		_afterLabelNodeChange = afterLabelNodeChange;

		setScopedAttribute("afterLabelNodeChange", afterLabelNodeChange);
	}

	public void setAfterRenderChange(java.lang.String afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderedChange(java.lang.String afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterSelectedIndexChange(java.lang.String afterSelectedIndexChange) {
		_afterSelectedIndexChange = afterSelectedIndexChange;

		setScopedAttribute("afterSelectedIndexChange", afterSelectedIndexChange);
	}

	public void setAfterShowTitleChange(java.lang.String afterShowTitleChange) {
		_afterShowTitleChange = afterShowTitleChange;

		setScopedAttribute("afterShowTitleChange", afterShowTitleChange);
	}

	public void setAfterSizeChange(java.lang.String afterSizeChange) {
		_afterSizeChange = afterSizeChange;

		setScopedAttribute("afterSizeChange", afterSizeChange);
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

	public void setAfterTitleChange(java.lang.String afterTitleChange) {
		_afterTitleChange = afterTitleChange;

		setScopedAttribute("afterTitleChange", afterTitleChange);
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

	public void setOnCanResetChange(java.lang.String onCanResetChange) {
		_onCanResetChange = onCanResetChange;

		setScopedAttribute("onCanResetChange", onCanResetChange);
	}

	public void setOnContentBoxChange(java.lang.String onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.String onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
	}

	public void setOnDefaultSelectedChange(java.lang.String onDefaultSelectedChange) {
		_onDefaultSelectedChange = onDefaultSelectedChange;

		setScopedAttribute("onDefaultSelectedChange", onDefaultSelectedChange);
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

	public void setOnElementsChange(java.lang.String onElementsChange) {
		_onElementsChange = onElementsChange;

		setScopedAttribute("onElementsChange", onElementsChange);
	}

	public void setOnFocusedChange(java.lang.String onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnHeightChange(java.lang.String onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnHiddenInputChange(java.lang.String onHiddenInputChange) {
		_onHiddenInputChange = onHiddenInputChange;

		setScopedAttribute("onHiddenInputChange", onHiddenInputChange);
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

	public void setOnInputNameChange(java.lang.String onInputNameChange) {
		_onInputNameChange = onInputNameChange;

		setScopedAttribute("onInputNameChange", onInputNameChange);
	}

	public void setOnItemClick(java.lang.String onItemClick) {
		_onItemClick = onItemClick;

		setScopedAttribute("onItemClick", onItemClick);
	}

	public void setOnItemOut(java.lang.String onItemOut) {
		_onItemOut = onItemOut;

		setScopedAttribute("onItemOut", onItemOut);
	}

	public void setOnItemSelect(java.lang.String onItemSelect) {
		_onItemSelect = onItemSelect;

		setScopedAttribute("onItemSelect", onItemSelect);
	}

	public void setOnLabelChange(java.lang.String onLabelChange) {
		_onLabelChange = onLabelChange;

		setScopedAttribute("onLabelChange", onLabelChange);
	}

	public void setOnLabelNodeChange(java.lang.String onLabelNodeChange) {
		_onLabelNodeChange = onLabelNodeChange;

		setScopedAttribute("onLabelNodeChange", onLabelNodeChange);
	}

	public void setOnRenderChange(java.lang.String onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderedChange(java.lang.String onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnSelectedIndexChange(java.lang.String onSelectedIndexChange) {
		_onSelectedIndexChange = onSelectedIndexChange;

		setScopedAttribute("onSelectedIndexChange", onSelectedIndexChange);
	}

	public void setOnShowTitleChange(java.lang.String onShowTitleChange) {
		_onShowTitleChange = onShowTitleChange;

		setScopedAttribute("onShowTitleChange", onShowTitleChange);
	}

	public void setOnSizeChange(java.lang.String onSizeChange) {
		_onSizeChange = onSizeChange;

		setScopedAttribute("onSizeChange", onSizeChange);
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

	public void setOnTitleChange(java.lang.String onTitleChange) {
		_onTitleChange = onTitleChange;

		setScopedAttribute("onTitleChange", onTitleChange);
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
		setNamespacedAttribute(request, "canReset", _canReset);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "defaultSelected", _defaultSelected);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "elements", _elements);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hiddenInput", _hiddenInput);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "ratingId", _ratingId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "inputName", _inputName);
		setNamespacedAttribute(request, "label", _label);
		setNamespacedAttribute(request, "labelNode", _labelNode);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "selectedIndex", _selectedIndex);
		setNamespacedAttribute(request, "showTitle", _showTitle);
		setNamespacedAttribute(request, "size", _size);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "title", _title);
		setNamespacedAttribute(request, "ratingValue", _ratingValue);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterCanResetChange", _afterCanResetChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterDefaultSelectedChange", _afterDefaultSelectedChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterElementsChange", _afterElementsChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterHiddenInputChange", _afterHiddenInputChange);
		setNamespacedAttribute(request, "afterHideClassChange", _afterHideClassChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterInputNameChange", _afterInputNameChange);
		setNamespacedAttribute(request, "afterItemClick", _afterItemClick);
		setNamespacedAttribute(request, "afterItemOut", _afterItemOut);
		setNamespacedAttribute(request, "afterItemSelect", _afterItemSelect);
		setNamespacedAttribute(request, "afterLabelChange", _afterLabelChange);
		setNamespacedAttribute(request, "afterLabelNodeChange", _afterLabelNodeChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterSelectedIndexChange", _afterSelectedIndexChange);
		setNamespacedAttribute(request, "afterShowTitleChange", _afterShowTitleChange);
		setNamespacedAttribute(request, "afterSizeChange", _afterSizeChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterTitleChange", _afterTitleChange);
		setNamespacedAttribute(request, "afterValueChange", _afterValueChange);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onCanResetChange", _onCanResetChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onDefaultSelectedChange", _onDefaultSelectedChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onElementsChange", _onElementsChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onHiddenInputChange", _onHiddenInputChange);
		setNamespacedAttribute(request, "onHideClassChange", _onHideClassChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onInputNameChange", _onInputNameChange);
		setNamespacedAttribute(request, "onItemClick", _onItemClick);
		setNamespacedAttribute(request, "onItemOut", _onItemOut);
		setNamespacedAttribute(request, "onItemSelect", _onItemSelect);
		setNamespacedAttribute(request, "onLabelChange", _onLabelChange);
		setNamespacedAttribute(request, "onLabelNodeChange", _onLabelNodeChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onSelectedIndexChange", _onSelectedIndexChange);
		setNamespacedAttribute(request, "onShowTitleChange", _onShowTitleChange);
		setNamespacedAttribute(request, "onSizeChange", _onSizeChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onTitleChange", _onTitleChange);
		setNamespacedAttribute(request, "onValueChange", _onValueChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:rating:";

	private static final String _PAGE =
		"/html/taglib/alloy/rating/page.jsp";

	private java.lang.String _boundingBox;
	private java.lang.String _canReset;
	private java.lang.String _contentBox;
	private java.lang.String _cssClass;
	private java.lang.String _defaultSelected;
	private java.lang.String _destroyed;
	private java.lang.String _disabled;
	private java.lang.String _elements;
	private java.lang.String _focused;
	private java.lang.String _height;
	private java.lang.String _hiddenInput;
	private java.lang.String _hideClass;
	private java.lang.String _ratingId;
	private java.lang.String _initialized;
	private java.lang.String _inputName;
	private java.lang.String _label;
	private java.lang.String _labelNode;
	private java.lang.String _render;
	private java.lang.String _rendered;
	private java.lang.String _selectedIndex;
	private java.lang.String _showTitle;
	private java.lang.String _size;
	private java.lang.String _srcNode;
	private java.lang.Object _strings;
	private java.lang.String _tabIndex;
	private java.lang.String _title;
	private java.lang.String _ratingValue;
	private java.lang.String _visible;
	private java.lang.String _width;
	private java.lang.String _afterBoundingBoxChange;
	private java.lang.String _afterCanResetChange;
	private java.lang.String _afterContentBoxChange;
	private java.lang.String _afterCssClassChange;
	private java.lang.String _afterDefaultSelectedChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterDisabledChange;
	private java.lang.String _afterElementsChange;
	private java.lang.String _afterFocusedChange;
	private java.lang.String _afterHeightChange;
	private java.lang.String _afterHiddenInputChange;
	private java.lang.String _afterHideClassChange;
	private java.lang.String _afterIdChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterInputNameChange;
	private java.lang.String _afterItemClick;
	private java.lang.String _afterItemOut;
	private java.lang.String _afterItemSelect;
	private java.lang.String _afterLabelChange;
	private java.lang.String _afterLabelNodeChange;
	private java.lang.String _afterRenderChange;
	private java.lang.String _afterRenderedChange;
	private java.lang.String _afterSelectedIndexChange;
	private java.lang.String _afterShowTitleChange;
	private java.lang.String _afterSizeChange;
	private java.lang.String _afterSrcNodeChange;
	private java.lang.String _afterStringsChange;
	private java.lang.String _afterTabIndexChange;
	private java.lang.String _afterTitleChange;
	private java.lang.String _afterValueChange;
	private java.lang.String _afterVisibleChange;
	private java.lang.String _afterContentUpdate;
	private java.lang.String _afterRender;
	private java.lang.String _afterWidthChange;
	private java.lang.String _onBoundingBoxChange;
	private java.lang.String _onCanResetChange;
	private java.lang.String _onContentBoxChange;
	private java.lang.String _onCssClassChange;
	private java.lang.String _onDefaultSelectedChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onDisabledChange;
	private java.lang.String _onElementsChange;
	private java.lang.String _onFocusedChange;
	private java.lang.String _onHeightChange;
	private java.lang.String _onHiddenInputChange;
	private java.lang.String _onHideClassChange;
	private java.lang.String _onIdChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onInputNameChange;
	private java.lang.String _onItemClick;
	private java.lang.String _onItemOut;
	private java.lang.String _onItemSelect;
	private java.lang.String _onLabelChange;
	private java.lang.String _onLabelNodeChange;
	private java.lang.String _onRenderChange;
	private java.lang.String _onRenderedChange;
	private java.lang.String _onSelectedIndexChange;
	private java.lang.String _onShowTitleChange;
	private java.lang.String _onSizeChange;
	private java.lang.String _onSrcNodeChange;
	private java.lang.String _onStringsChange;
	private java.lang.String _onTabIndexChange;
	private java.lang.String _onTitleChange;
	private java.lang.String _onValueChange;
	private java.lang.String _onVisibleChange;
	private java.lang.String _onContentUpdate;
	private java.lang.String _onRender;
	private java.lang.String _onWidthChange;

}
