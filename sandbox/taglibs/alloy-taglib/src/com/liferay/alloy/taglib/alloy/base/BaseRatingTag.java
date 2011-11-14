/**
 * Copyright (c) 2000-2011 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.alloy.taglib.alloy.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 * @generated
 */
public class BaseRatingTag extends com.liferay.taglib.util.IncludeTag {

	@Override
	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public java.lang.String getBoundingBox() {
		return _boundingBox;
	}

	public boolean getCanReset() {
		return _canReset;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.String getCssClass() {
		return _cssClass;
	}

	public java.lang.Object getDefaultSelected() {
		return _defaultSelected;
	}

	public boolean getDestroyed() {
		return _destroyed;
	}

	public boolean getDisabled() {
		return _disabled;
	}

	public java.lang.Object getElements() {
		return _elements;
	}

	public boolean getFocused() {
		return _focused;
	}

	public java.lang.Object getHeight() {
		return _height;
	}

	public java.lang.Object getHiddenInput() {
		return _hiddenInput;
	}

	public java.lang.String getHideClass() {
		return _hideClass;
	}

	public java.lang.String getRatingId() {
		return _ratingId;
	}

	public boolean getInitialized() {
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

	public java.lang.Object getRender() {
		return _render;
	}

	public boolean getRendered() {
		return _rendered;
	}

	public java.lang.Object getSelectedIndex() {
		return _selectedIndex;
	}

	public boolean getShowTitle() {
		return _showTitle;
	}

	public java.lang.Object getSize() {
		return _size;
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

	public java.lang.String getTitle() {
		return _title;
	}

	public boolean getUseARIA() {
		return _useARIA;
	}

	public java.lang.String getRatingValue() {
		return _ratingValue;
	}

	public boolean getVisible() {
		return _visible;
	}

	public java.lang.Object getWidth() {
		return _width;
	}

	public java.lang.Object getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.Object getAfterCanResetChange() {
		return _afterCanResetChange;
	}

	public java.lang.Object getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.Object getAfterCssClassChange() {
		return _afterCssClassChange;
	}

	public java.lang.Object getAfterDefaultSelectedChange() {
		return _afterDefaultSelectedChange;
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

	public java.lang.Object getAfterElementsChange() {
		return _afterElementsChange;
	}

	public java.lang.Object getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.Object getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.Object getAfterHiddenInputChange() {
		return _afterHiddenInputChange;
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

	public java.lang.Object getAfterInputNameChange() {
		return _afterInputNameChange;
	}

	public java.lang.Object getAfterItemClick() {
		return _afterItemClick;
	}

	public java.lang.Object getAfterItemOut() {
		return _afterItemOut;
	}

	public java.lang.Object getAfterItemSelect() {
		return _afterItemSelect;
	}

	public java.lang.Object getAfterLabelChange() {
		return _afterLabelChange;
	}

	public java.lang.Object getAfterLabelNodeChange() {
		return _afterLabelNodeChange;
	}

	public java.lang.Object getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.Object getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.Object getAfterSelectedIndexChange() {
		return _afterSelectedIndexChange;
	}

	public java.lang.Object getAfterShowTitleChange() {
		return _afterShowTitleChange;
	}

	public java.lang.Object getAfterSizeChange() {
		return _afterSizeChange;
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

	public java.lang.Object getAfterTitleChange() {
		return _afterTitleChange;
	}

	public java.lang.Object getAfterUseARIAChange() {
		return _afterUseARIAChange;
	}

	public java.lang.Object getAfterValueChange() {
		return _afterValueChange;
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

	public java.lang.Object getOnCanResetChange() {
		return _onCanResetChange;
	}

	public java.lang.Object getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.Object getOnCssClassChange() {
		return _onCssClassChange;
	}

	public java.lang.Object getOnDefaultSelectedChange() {
		return _onDefaultSelectedChange;
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

	public java.lang.Object getOnElementsChange() {
		return _onElementsChange;
	}

	public java.lang.Object getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.Object getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.Object getOnHiddenInputChange() {
		return _onHiddenInputChange;
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

	public java.lang.Object getOnInputNameChange() {
		return _onInputNameChange;
	}

	public java.lang.Object getOnItemClick() {
		return _onItemClick;
	}

	public java.lang.Object getOnItemOut() {
		return _onItemOut;
	}

	public java.lang.Object getOnItemSelect() {
		return _onItemSelect;
	}

	public java.lang.Object getOnLabelChange() {
		return _onLabelChange;
	}

	public java.lang.Object getOnLabelNodeChange() {
		return _onLabelNodeChange;
	}

	public java.lang.Object getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.Object getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.Object getOnSelectedIndexChange() {
		return _onSelectedIndexChange;
	}

	public java.lang.Object getOnShowTitleChange() {
		return _onShowTitleChange;
	}

	public java.lang.Object getOnSizeChange() {
		return _onSizeChange;
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

	public java.lang.Object getOnTitleChange() {
		return _onTitleChange;
	}

	public java.lang.Object getOnUseARIAChange() {
		return _onUseARIAChange;
	}

	public java.lang.Object getOnValueChange() {
		return _onValueChange;
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

	public void setBoundingBox(java.lang.String boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setCanReset(boolean canReset) {
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

	public void setDefaultSelected(java.lang.Object defaultSelected) {
		_defaultSelected = defaultSelected;

		setScopedAttribute("defaultSelected", defaultSelected);
	}

	public void setDestroyed(boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDisabled(boolean disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	public void setElements(java.lang.Object elements) {
		_elements = elements;

		setScopedAttribute("elements", elements);
	}

	public void setFocused(boolean focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setHeight(java.lang.Object height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setHiddenInput(java.lang.Object hiddenInput) {
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

	public void setInitialized(boolean initialized) {
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

	public void setRender(java.lang.Object render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(boolean rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setSelectedIndex(java.lang.Object selectedIndex) {
		_selectedIndex = selectedIndex;

		setScopedAttribute("selectedIndex", selectedIndex);
	}

	public void setShowTitle(boolean showTitle) {
		_showTitle = showTitle;

		setScopedAttribute("showTitle", showTitle);
	}

	public void setSize(java.lang.Object size) {
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

	public void setTabIndex(java.lang.Object tabIndex) {
		_tabIndex = tabIndex;

		setScopedAttribute("tabIndex", tabIndex);
	}

	public void setTitle(java.lang.String title) {
		_title = title;

		setScopedAttribute("title", title);
	}

	public void setUseARIA(boolean useARIA) {
		_useARIA = useARIA;

		setScopedAttribute("useARIA", useARIA);
	}

	public void setRatingValue(java.lang.String ratingValue) {
		_ratingValue = ratingValue;

		setScopedAttribute("ratingValue", ratingValue);
	}

	public void setVisible(boolean visible) {
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

	public void setAfterCanResetChange(java.lang.Object afterCanResetChange) {
		_afterCanResetChange = afterCanResetChange;

		setScopedAttribute("afterCanResetChange", afterCanResetChange);
	}

	public void setAfterContentBoxChange(java.lang.Object afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.Object afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
	}

	public void setAfterDefaultSelectedChange(java.lang.Object afterDefaultSelectedChange) {
		_afterDefaultSelectedChange = afterDefaultSelectedChange;

		setScopedAttribute("afterDefaultSelectedChange", afterDefaultSelectedChange);
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

	public void setAfterElementsChange(java.lang.Object afterElementsChange) {
		_afterElementsChange = afterElementsChange;

		setScopedAttribute("afterElementsChange", afterElementsChange);
	}

	public void setAfterFocusedChange(java.lang.Object afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterHeightChange(java.lang.Object afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterHiddenInputChange(java.lang.Object afterHiddenInputChange) {
		_afterHiddenInputChange = afterHiddenInputChange;

		setScopedAttribute("afterHiddenInputChange", afterHiddenInputChange);
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

	public void setAfterInputNameChange(java.lang.Object afterInputNameChange) {
		_afterInputNameChange = afterInputNameChange;

		setScopedAttribute("afterInputNameChange", afterInputNameChange);
	}

	public void setAfterItemClick(java.lang.Object afterItemClick) {
		_afterItemClick = afterItemClick;

		setScopedAttribute("afterItemClick", afterItemClick);
	}

	public void setAfterItemOut(java.lang.Object afterItemOut) {
		_afterItemOut = afterItemOut;

		setScopedAttribute("afterItemOut", afterItemOut);
	}

	public void setAfterItemSelect(java.lang.Object afterItemSelect) {
		_afterItemSelect = afterItemSelect;

		setScopedAttribute("afterItemSelect", afterItemSelect);
	}

	public void setAfterLabelChange(java.lang.Object afterLabelChange) {
		_afterLabelChange = afterLabelChange;

		setScopedAttribute("afterLabelChange", afterLabelChange);
	}

	public void setAfterLabelNodeChange(java.lang.Object afterLabelNodeChange) {
		_afterLabelNodeChange = afterLabelNodeChange;

		setScopedAttribute("afterLabelNodeChange", afterLabelNodeChange);
	}

	public void setAfterRenderChange(java.lang.Object afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderedChange(java.lang.Object afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterSelectedIndexChange(java.lang.Object afterSelectedIndexChange) {
		_afterSelectedIndexChange = afterSelectedIndexChange;

		setScopedAttribute("afterSelectedIndexChange", afterSelectedIndexChange);
	}

	public void setAfterShowTitleChange(java.lang.Object afterShowTitleChange) {
		_afterShowTitleChange = afterShowTitleChange;

		setScopedAttribute("afterShowTitleChange", afterShowTitleChange);
	}

	public void setAfterSizeChange(java.lang.Object afterSizeChange) {
		_afterSizeChange = afterSizeChange;

		setScopedAttribute("afterSizeChange", afterSizeChange);
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

	public void setAfterTitleChange(java.lang.Object afterTitleChange) {
		_afterTitleChange = afterTitleChange;

		setScopedAttribute("afterTitleChange", afterTitleChange);
	}

	public void setAfterUseARIAChange(java.lang.Object afterUseARIAChange) {
		_afterUseARIAChange = afterUseARIAChange;

		setScopedAttribute("afterUseARIAChange", afterUseARIAChange);
	}

	public void setAfterValueChange(java.lang.Object afterValueChange) {
		_afterValueChange = afterValueChange;

		setScopedAttribute("afterValueChange", afterValueChange);
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

	public void setOnCanResetChange(java.lang.Object onCanResetChange) {
		_onCanResetChange = onCanResetChange;

		setScopedAttribute("onCanResetChange", onCanResetChange);
	}

	public void setOnContentBoxChange(java.lang.Object onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.Object onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
	}

	public void setOnDefaultSelectedChange(java.lang.Object onDefaultSelectedChange) {
		_onDefaultSelectedChange = onDefaultSelectedChange;

		setScopedAttribute("onDefaultSelectedChange", onDefaultSelectedChange);
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

	public void setOnElementsChange(java.lang.Object onElementsChange) {
		_onElementsChange = onElementsChange;

		setScopedAttribute("onElementsChange", onElementsChange);
	}

	public void setOnFocusedChange(java.lang.Object onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnHeightChange(java.lang.Object onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnHiddenInputChange(java.lang.Object onHiddenInputChange) {
		_onHiddenInputChange = onHiddenInputChange;

		setScopedAttribute("onHiddenInputChange", onHiddenInputChange);
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

	public void setOnInputNameChange(java.lang.Object onInputNameChange) {
		_onInputNameChange = onInputNameChange;

		setScopedAttribute("onInputNameChange", onInputNameChange);
	}

	public void setOnItemClick(java.lang.Object onItemClick) {
		_onItemClick = onItemClick;

		setScopedAttribute("onItemClick", onItemClick);
	}

	public void setOnItemOut(java.lang.Object onItemOut) {
		_onItemOut = onItemOut;

		setScopedAttribute("onItemOut", onItemOut);
	}

	public void setOnItemSelect(java.lang.Object onItemSelect) {
		_onItemSelect = onItemSelect;

		setScopedAttribute("onItemSelect", onItemSelect);
	}

	public void setOnLabelChange(java.lang.Object onLabelChange) {
		_onLabelChange = onLabelChange;

		setScopedAttribute("onLabelChange", onLabelChange);
	}

	public void setOnLabelNodeChange(java.lang.Object onLabelNodeChange) {
		_onLabelNodeChange = onLabelNodeChange;

		setScopedAttribute("onLabelNodeChange", onLabelNodeChange);
	}

	public void setOnRenderChange(java.lang.Object onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderedChange(java.lang.Object onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnSelectedIndexChange(java.lang.Object onSelectedIndexChange) {
		_onSelectedIndexChange = onSelectedIndexChange;

		setScopedAttribute("onSelectedIndexChange", onSelectedIndexChange);
	}

	public void setOnShowTitleChange(java.lang.Object onShowTitleChange) {
		_onShowTitleChange = onShowTitleChange;

		setScopedAttribute("onShowTitleChange", onShowTitleChange);
	}

	public void setOnSizeChange(java.lang.Object onSizeChange) {
		_onSizeChange = onSizeChange;

		setScopedAttribute("onSizeChange", onSizeChange);
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

	public void setOnTitleChange(java.lang.Object onTitleChange) {
		_onTitleChange = onTitleChange;

		setScopedAttribute("onTitleChange", onTitleChange);
	}

	public void setOnUseARIAChange(java.lang.Object onUseARIAChange) {
		_onUseARIAChange = onUseARIAChange;

		setScopedAttribute("onUseARIAChange", onUseARIAChange);
	}

	public void setOnValueChange(java.lang.Object onValueChange) {
		_onValueChange = onValueChange;

		setScopedAttribute("onValueChange", onValueChange);
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

	@Override
	protected void cleanUp() {
		_boundingBox = null;
		_canReset = true;
		_contentBox = null;
		_cssClass = null;
		_defaultSelected = 0;
		_destroyed = false;
		_disabled = false;
		_elements = null;
		_focused = false;
		_height = null;
		_hiddenInput = null;
		_hideClass = "aui-helper-hidden";
		_ratingId = null;
		_initialized = false;
		_inputName = null;
		_label = null;
		_labelNode = null;
		_render = null;
		_rendered = false;
		_selectedIndex = -1;
		_showTitle = true;
		_size = 5;
		_srcNode = null;
		_strings = null;
		_tabIndex = 0;
		_title = null;
		_useARIA = true;
		_ratingValue = null;
		_visible = true;
		_width = null;
		_afterBoundingBoxChange = null;
		_afterCanResetChange = null;
		_afterContentBoxChange = null;
		_afterCssClassChange = null;
		_afterDefaultSelectedChange = null;
		_afterDestroy = null;
		_afterDestroyedChange = null;
		_afterDisabledChange = null;
		_afterElementsChange = null;
		_afterFocusedChange = null;
		_afterHeightChange = null;
		_afterHiddenInputChange = null;
		_afterHideClassChange = null;
		_afterIdChange = null;
		_afterInit = null;
		_afterInitializedChange = null;
		_afterInputNameChange = null;
		_afterItemClick = null;
		_afterItemOut = null;
		_afterItemSelect = null;
		_afterLabelChange = null;
		_afterLabelNodeChange = null;
		_afterRenderChange = null;
		_afterRenderedChange = null;
		_afterSelectedIndexChange = null;
		_afterShowTitleChange = null;
		_afterSizeChange = null;
		_afterSrcNodeChange = null;
		_afterStringsChange = null;
		_afterTabIndexChange = null;
		_afterTitleChange = null;
		_afterUseARIAChange = null;
		_afterValueChange = null;
		_afterVisibleChange = null;
		_afterContentUpdate = null;
		_afterRender = null;
		_afterWidthChange = null;
		_onBoundingBoxChange = null;
		_onCanResetChange = null;
		_onContentBoxChange = null;
		_onCssClassChange = null;
		_onDefaultSelectedChange = null;
		_onDestroy = null;
		_onDestroyedChange = null;
		_onDisabledChange = null;
		_onElementsChange = null;
		_onFocusedChange = null;
		_onHeightChange = null;
		_onHiddenInputChange = null;
		_onHideClassChange = null;
		_onIdChange = null;
		_onInit = null;
		_onInitializedChange = null;
		_onInputNameChange = null;
		_onItemClick = null;
		_onItemOut = null;
		_onItemSelect = null;
		_onLabelChange = null;
		_onLabelNodeChange = null;
		_onRenderChange = null;
		_onRenderedChange = null;
		_onSelectedIndexChange = null;
		_onShowTitleChange = null;
		_onSizeChange = null;
		_onSrcNodeChange = null;
		_onStringsChange = null;
		_onTabIndexChange = null;
		_onTitleChange = null;
		_onUseARIAChange = null;
		_onValueChange = null;
		_onVisibleChange = null;
		_onContentUpdate = null;
		_onRender = null;
		_onWidthChange = null;
	}

	@Override
	protected String getPage() {
		return _PAGE;
	}

	@Override
	protected void setAttributes(HttpServletRequest request) {
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
		setNamespacedAttribute(request, "useARIA", _useARIA);
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
		setNamespacedAttribute(request, "afterUseARIAChange", _afterUseARIAChange);
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
		setNamespacedAttribute(request, "onUseARIAChange", _onUseARIAChange);
		setNamespacedAttribute(request, "onValueChange", _onValueChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:rating:";

	private static final String _PAGE =
		"/html/taglib/alloy/rating/page.jsp";

	private java.lang.String _boundingBox = null;
	private boolean _canReset = true;
	private java.lang.String _contentBox = null;
	private java.lang.String _cssClass = null;
	private java.lang.Object _defaultSelected = 0;
	private boolean _destroyed = false;
	private boolean _disabled = false;
	private java.lang.Object _elements = null;
	private boolean _focused = false;
	private java.lang.Object _height = null;
	private java.lang.Object _hiddenInput = null;
	private java.lang.String _hideClass = "aui-helper-hidden";
	private java.lang.String _ratingId = null;
	private boolean _initialized = false;
	private java.lang.String _inputName = null;
	private java.lang.String _label = null;
	private java.lang.String _labelNode = null;
	private java.lang.Object _render = null;
	private boolean _rendered = false;
	private java.lang.Object _selectedIndex = -1;
	private boolean _showTitle = true;
	private java.lang.Object _size = 5;
	private java.lang.String _srcNode = null;
	private java.lang.Object _strings = null;
	private java.lang.Object _tabIndex = 0;
	private java.lang.String _title = null;
	private boolean _useARIA = true;
	private java.lang.String _ratingValue = null;
	private boolean _visible = true;
	private java.lang.Object _width = null;
	private java.lang.Object _afterBoundingBoxChange = null;
	private java.lang.Object _afterCanResetChange = null;
	private java.lang.Object _afterContentBoxChange = null;
	private java.lang.Object _afterCssClassChange = null;
	private java.lang.Object _afterDefaultSelectedChange = null;
	private java.lang.Object _afterDestroy = null;
	private java.lang.Object _afterDestroyedChange = null;
	private java.lang.Object _afterDisabledChange = null;
	private java.lang.Object _afterElementsChange = null;
	private java.lang.Object _afterFocusedChange = null;
	private java.lang.Object _afterHeightChange = null;
	private java.lang.Object _afterHiddenInputChange = null;
	private java.lang.Object _afterHideClassChange = null;
	private java.lang.Object _afterIdChange = null;
	private java.lang.Object _afterInit = null;
	private java.lang.Object _afterInitializedChange = null;
	private java.lang.Object _afterInputNameChange = null;
	private java.lang.Object _afterItemClick = null;
	private java.lang.Object _afterItemOut = null;
	private java.lang.Object _afterItemSelect = null;
	private java.lang.Object _afterLabelChange = null;
	private java.lang.Object _afterLabelNodeChange = null;
	private java.lang.Object _afterRenderChange = null;
	private java.lang.Object _afterRenderedChange = null;
	private java.lang.Object _afterSelectedIndexChange = null;
	private java.lang.Object _afterShowTitleChange = null;
	private java.lang.Object _afterSizeChange = null;
	private java.lang.Object _afterSrcNodeChange = null;
	private java.lang.Object _afterStringsChange = null;
	private java.lang.Object _afterTabIndexChange = null;
	private java.lang.Object _afterTitleChange = null;
	private java.lang.Object _afterUseARIAChange = null;
	private java.lang.Object _afterValueChange = null;
	private java.lang.Object _afterVisibleChange = null;
	private java.lang.Object _afterContentUpdate = null;
	private java.lang.Object _afterRender = null;
	private java.lang.Object _afterWidthChange = null;
	private java.lang.Object _onBoundingBoxChange = null;
	private java.lang.Object _onCanResetChange = null;
	private java.lang.Object _onContentBoxChange = null;
	private java.lang.Object _onCssClassChange = null;
	private java.lang.Object _onDefaultSelectedChange = null;
	private java.lang.Object _onDestroy = null;
	private java.lang.Object _onDestroyedChange = null;
	private java.lang.Object _onDisabledChange = null;
	private java.lang.Object _onElementsChange = null;
	private java.lang.Object _onFocusedChange = null;
	private java.lang.Object _onHeightChange = null;
	private java.lang.Object _onHiddenInputChange = null;
	private java.lang.Object _onHideClassChange = null;
	private java.lang.Object _onIdChange = null;
	private java.lang.Object _onInit = null;
	private java.lang.Object _onInitializedChange = null;
	private java.lang.Object _onInputNameChange = null;
	private java.lang.Object _onItemClick = null;
	private java.lang.Object _onItemOut = null;
	private java.lang.Object _onItemSelect = null;
	private java.lang.Object _onLabelChange = null;
	private java.lang.Object _onLabelNodeChange = null;
	private java.lang.Object _onRenderChange = null;
	private java.lang.Object _onRenderedChange = null;
	private java.lang.Object _onSelectedIndexChange = null;
	private java.lang.Object _onShowTitleChange = null;
	private java.lang.Object _onSizeChange = null;
	private java.lang.Object _onSrcNodeChange = null;
	private java.lang.Object _onStringsChange = null;
	private java.lang.Object _onTabIndexChange = null;
	private java.lang.Object _onTitleChange = null;
	private java.lang.Object _onUseARIAChange = null;
	private java.lang.Object _onValueChange = null;
	private java.lang.Object _onVisibleChange = null;
	private java.lang.Object _onContentUpdate = null;
	private java.lang.Object _onRender = null;
	private java.lang.Object _onWidthChange = null;

}