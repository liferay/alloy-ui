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
public class BaseToolbarTag extends com.liferay.taglib.util.IncludeTag {

	@Override
	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public java.lang.Object getActiveDescendant() {
		return _activeDescendant;
	}

	public boolean getActiveState() {
		return _activeState;
	}

	public java.lang.String getBoundingBox() {
		return _boundingBox;
	}

	public java.lang.Object getChildren() {
		return _children;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.String getCssClass() {
		return _cssClass;
	}

	public java.lang.Object getDefaultChildType() {
		return _defaultChildType;
	}

	public boolean getDefaultState() {
		return _defaultState;
	}

	public boolean getDestroyed() {
		return _destroyed;
	}

	public boolean getDisabled() {
		return _disabled;
	}

	public boolean getFocused() {
		return _focused;
	}

	public java.lang.Object getHeight() {
		return _height;
	}

	public java.lang.String getHideClass() {
		return _hideClass;
	}

	public boolean getHoverState() {
		return _hoverState;
	}

	public java.lang.String getToolbarId() {
		return _toolbarId;
	}

	public boolean getInitialized() {
		return _initialized;
	}

	public boolean getMultiple() {
		return _multiple;
	}

	public java.lang.String getOrientation() {
		return _orientation;
	}

	public java.lang.Object getRender() {
		return _render;
	}

	public boolean getRendered() {
		return _rendered;
	}

	public java.lang.Object getSelection() {
		return _selection;
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

	public boolean getUseARIA() {
		return _useARIA;
	}

	public boolean getVisible() {
		return _visible;
	}

	public java.lang.Object getWidth() {
		return _width;
	}

	public java.lang.Object getAfterActiveDescendantChange() {
		return _afterActiveDescendantChange;
	}

	public java.lang.Object getAfterActiveStateChange() {
		return _afterActiveStateChange;
	}

	public java.lang.Object getAfterAddChild() {
		return _afterAddChild;
	}

	public java.lang.Object getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.Object getAfterChildrenChange() {
		return _afterChildrenChange;
	}

	public java.lang.Object getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.Object getAfterCssClassChange() {
		return _afterCssClassChange;
	}

	public java.lang.Object getAfterDefaultChildTypeChange() {
		return _afterDefaultChildTypeChange;
	}

	public java.lang.Object getAfterDefaultStateChange() {
		return _afterDefaultStateChange;
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

	public java.lang.Object getAfterFocusedChange() {
		return _afterFocusedChange;
	}

	public java.lang.Object getAfterHeightChange() {
		return _afterHeightChange;
	}

	public java.lang.Object getAfterHideClassChange() {
		return _afterHideClassChange;
	}

	public java.lang.Object getAfterHoverStateChange() {
		return _afterHoverStateChange;
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

	public java.lang.Object getAfterMultipleChange() {
		return _afterMultipleChange;
	}

	public java.lang.Object getAfterOrientationChange() {
		return _afterOrientationChange;
	}

	public java.lang.Object getAfterRemoveChild() {
		return _afterRemoveChild;
	}

	public java.lang.Object getAfterRenderChange() {
		return _afterRenderChange;
	}

	public java.lang.Object getAfterRenderedChange() {
		return _afterRenderedChange;
	}

	public java.lang.Object getAfterSelectionChange() {
		return _afterSelectionChange;
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

	public java.lang.Object getAfterUseARIAChange() {
		return _afterUseARIAChange;
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

	public java.lang.Object getOnActiveDescendantChange() {
		return _onActiveDescendantChange;
	}

	public java.lang.Object getOnActiveStateChange() {
		return _onActiveStateChange;
	}

	public java.lang.Object getOnAddChild() {
		return _onAddChild;
	}

	public java.lang.Object getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.Object getOnChildrenChange() {
		return _onChildrenChange;
	}

	public java.lang.Object getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.Object getOnCssClassChange() {
		return _onCssClassChange;
	}

	public java.lang.Object getOnDefaultChildTypeChange() {
		return _onDefaultChildTypeChange;
	}

	public java.lang.Object getOnDefaultStateChange() {
		return _onDefaultStateChange;
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

	public java.lang.Object getOnFocusedChange() {
		return _onFocusedChange;
	}

	public java.lang.Object getOnHeightChange() {
		return _onHeightChange;
	}

	public java.lang.Object getOnHideClassChange() {
		return _onHideClassChange;
	}

	public java.lang.Object getOnHoverStateChange() {
		return _onHoverStateChange;
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

	public java.lang.Object getOnMultipleChange() {
		return _onMultipleChange;
	}

	public java.lang.Object getOnOrientationChange() {
		return _onOrientationChange;
	}

	public java.lang.Object getOnRemoveChild() {
		return _onRemoveChild;
	}

	public java.lang.Object getOnRenderChange() {
		return _onRenderChange;
	}

	public java.lang.Object getOnRenderedChange() {
		return _onRenderedChange;
	}

	public java.lang.Object getOnSelectionChange() {
		return _onSelectionChange;
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

	public java.lang.Object getOnUseARIAChange() {
		return _onUseARIAChange;
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

	public void setActiveDescendant(java.lang.Object activeDescendant) {
		_activeDescendant = activeDescendant;

		setScopedAttribute("activeDescendant", activeDescendant);
	}

	public void setActiveState(boolean activeState) {
		_activeState = activeState;

		setScopedAttribute("activeState", activeState);
	}

	public void setBoundingBox(java.lang.String boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setChildren(java.lang.Object children) {
		_children = children;

		setScopedAttribute("children", children);
	}

	public void setContentBox(java.lang.String contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setCssClass(java.lang.String cssClass) {
		_cssClass = cssClass;

		setScopedAttribute("cssClass", cssClass);
	}

	public void setDefaultChildType(java.lang.Object defaultChildType) {
		_defaultChildType = defaultChildType;

		setScopedAttribute("defaultChildType", defaultChildType);
	}

	public void setDefaultState(boolean defaultState) {
		_defaultState = defaultState;

		setScopedAttribute("defaultState", defaultState);
	}

	public void setDestroyed(boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDisabled(boolean disabled) {
		_disabled = disabled;

		setScopedAttribute("disabled", disabled);
	}

	public void setFocused(boolean focused) {
		_focused = focused;

		setScopedAttribute("focused", focused);
	}

	public void setHeight(java.lang.Object height) {
		_height = height;

		setScopedAttribute("height", height);
	}

	public void setHideClass(java.lang.String hideClass) {
		_hideClass = hideClass;

		setScopedAttribute("hideClass", hideClass);
	}

	public void setHoverState(boolean hoverState) {
		_hoverState = hoverState;

		setScopedAttribute("hoverState", hoverState);
	}

	public void setToolbarId(java.lang.String toolbarId) {
		_toolbarId = toolbarId;

		setScopedAttribute("toolbarId", toolbarId);
	}

	public void setInitialized(boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setMultiple(boolean multiple) {
		_multiple = multiple;

		setScopedAttribute("multiple", multiple);
	}

	public void setOrientation(java.lang.String orientation) {
		_orientation = orientation;

		setScopedAttribute("orientation", orientation);
	}

	public void setRender(java.lang.Object render) {
		_render = render;

		setScopedAttribute("render", render);
	}

	public void setRendered(boolean rendered) {
		_rendered = rendered;

		setScopedAttribute("rendered", rendered);
	}

	public void setSelection(java.lang.Object selection) {
		_selection = selection;

		setScopedAttribute("selection", selection);
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

	public void setUseARIA(boolean useARIA) {
		_useARIA = useARIA;

		setScopedAttribute("useARIA", useARIA);
	}

	public void setVisible(boolean visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setWidth(java.lang.Object width) {
		_width = width;

		setScopedAttribute("width", width);
	}

	public void setAfterActiveDescendantChange(java.lang.Object afterActiveDescendantChange) {
		_afterActiveDescendantChange = afterActiveDescendantChange;

		setScopedAttribute("afterActiveDescendantChange", afterActiveDescendantChange);
	}

	public void setAfterActiveStateChange(java.lang.Object afterActiveStateChange) {
		_afterActiveStateChange = afterActiveStateChange;

		setScopedAttribute("afterActiveStateChange", afterActiveStateChange);
	}

	public void setAfterAddChild(java.lang.Object afterAddChild) {
		_afterAddChild = afterAddChild;

		setScopedAttribute("afterAddChild", afterAddChild);
	}

	public void setAfterBoundingBoxChange(java.lang.Object afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterChildrenChange(java.lang.Object afterChildrenChange) {
		_afterChildrenChange = afterChildrenChange;

		setScopedAttribute("afterChildrenChange", afterChildrenChange);
	}

	public void setAfterContentBoxChange(java.lang.Object afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.Object afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
	}

	public void setAfterDefaultChildTypeChange(java.lang.Object afterDefaultChildTypeChange) {
		_afterDefaultChildTypeChange = afterDefaultChildTypeChange;

		setScopedAttribute("afterDefaultChildTypeChange", afterDefaultChildTypeChange);
	}

	public void setAfterDefaultStateChange(java.lang.Object afterDefaultStateChange) {
		_afterDefaultStateChange = afterDefaultStateChange;

		setScopedAttribute("afterDefaultStateChange", afterDefaultStateChange);
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

	public void setAfterFocusedChange(java.lang.Object afterFocusedChange) {
		_afterFocusedChange = afterFocusedChange;

		setScopedAttribute("afterFocusedChange", afterFocusedChange);
	}

	public void setAfterHeightChange(java.lang.Object afterHeightChange) {
		_afterHeightChange = afterHeightChange;

		setScopedAttribute("afterHeightChange", afterHeightChange);
	}

	public void setAfterHideClassChange(java.lang.Object afterHideClassChange) {
		_afterHideClassChange = afterHideClassChange;

		setScopedAttribute("afterHideClassChange", afterHideClassChange);
	}

	public void setAfterHoverStateChange(java.lang.Object afterHoverStateChange) {
		_afterHoverStateChange = afterHoverStateChange;

		setScopedAttribute("afterHoverStateChange", afterHoverStateChange);
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

	public void setAfterMultipleChange(java.lang.Object afterMultipleChange) {
		_afterMultipleChange = afterMultipleChange;

		setScopedAttribute("afterMultipleChange", afterMultipleChange);
	}

	public void setAfterOrientationChange(java.lang.Object afterOrientationChange) {
		_afterOrientationChange = afterOrientationChange;

		setScopedAttribute("afterOrientationChange", afterOrientationChange);
	}

	public void setAfterRemoveChild(java.lang.Object afterRemoveChild) {
		_afterRemoveChild = afterRemoveChild;

		setScopedAttribute("afterRemoveChild", afterRemoveChild);
	}

	public void setAfterRenderChange(java.lang.Object afterRenderChange) {
		_afterRenderChange = afterRenderChange;

		setScopedAttribute("afterRenderChange", afterRenderChange);
	}

	public void setAfterRenderedChange(java.lang.Object afterRenderedChange) {
		_afterRenderedChange = afterRenderedChange;

		setScopedAttribute("afterRenderedChange", afterRenderedChange);
	}

	public void setAfterSelectionChange(java.lang.Object afterSelectionChange) {
		_afterSelectionChange = afterSelectionChange;

		setScopedAttribute("afterSelectionChange", afterSelectionChange);
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

	public void setAfterUseARIAChange(java.lang.Object afterUseARIAChange) {
		_afterUseARIAChange = afterUseARIAChange;

		setScopedAttribute("afterUseARIAChange", afterUseARIAChange);
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

	public void setOnActiveDescendantChange(java.lang.Object onActiveDescendantChange) {
		_onActiveDescendantChange = onActiveDescendantChange;

		setScopedAttribute("onActiveDescendantChange", onActiveDescendantChange);
	}

	public void setOnActiveStateChange(java.lang.Object onActiveStateChange) {
		_onActiveStateChange = onActiveStateChange;

		setScopedAttribute("onActiveStateChange", onActiveStateChange);
	}

	public void setOnAddChild(java.lang.Object onAddChild) {
		_onAddChild = onAddChild;

		setScopedAttribute("onAddChild", onAddChild);
	}

	public void setOnBoundingBoxChange(java.lang.Object onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnChildrenChange(java.lang.Object onChildrenChange) {
		_onChildrenChange = onChildrenChange;

		setScopedAttribute("onChildrenChange", onChildrenChange);
	}

	public void setOnContentBoxChange(java.lang.Object onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.Object onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
	}

	public void setOnDefaultChildTypeChange(java.lang.Object onDefaultChildTypeChange) {
		_onDefaultChildTypeChange = onDefaultChildTypeChange;

		setScopedAttribute("onDefaultChildTypeChange", onDefaultChildTypeChange);
	}

	public void setOnDefaultStateChange(java.lang.Object onDefaultStateChange) {
		_onDefaultStateChange = onDefaultStateChange;

		setScopedAttribute("onDefaultStateChange", onDefaultStateChange);
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

	public void setOnFocusedChange(java.lang.Object onFocusedChange) {
		_onFocusedChange = onFocusedChange;

		setScopedAttribute("onFocusedChange", onFocusedChange);
	}

	public void setOnHeightChange(java.lang.Object onHeightChange) {
		_onHeightChange = onHeightChange;

		setScopedAttribute("onHeightChange", onHeightChange);
	}

	public void setOnHideClassChange(java.lang.Object onHideClassChange) {
		_onHideClassChange = onHideClassChange;

		setScopedAttribute("onHideClassChange", onHideClassChange);
	}

	public void setOnHoverStateChange(java.lang.Object onHoverStateChange) {
		_onHoverStateChange = onHoverStateChange;

		setScopedAttribute("onHoverStateChange", onHoverStateChange);
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

	public void setOnMultipleChange(java.lang.Object onMultipleChange) {
		_onMultipleChange = onMultipleChange;

		setScopedAttribute("onMultipleChange", onMultipleChange);
	}

	public void setOnOrientationChange(java.lang.Object onOrientationChange) {
		_onOrientationChange = onOrientationChange;

		setScopedAttribute("onOrientationChange", onOrientationChange);
	}

	public void setOnRemoveChild(java.lang.Object onRemoveChild) {
		_onRemoveChild = onRemoveChild;

		setScopedAttribute("onRemoveChild", onRemoveChild);
	}

	public void setOnRenderChange(java.lang.Object onRenderChange) {
		_onRenderChange = onRenderChange;

		setScopedAttribute("onRenderChange", onRenderChange);
	}

	public void setOnRenderedChange(java.lang.Object onRenderedChange) {
		_onRenderedChange = onRenderedChange;

		setScopedAttribute("onRenderedChange", onRenderedChange);
	}

	public void setOnSelectionChange(java.lang.Object onSelectionChange) {
		_onSelectionChange = onSelectionChange;

		setScopedAttribute("onSelectionChange", onSelectionChange);
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

	public void setOnUseARIAChange(java.lang.Object onUseARIAChange) {
		_onUseARIAChange = onUseARIAChange;

		setScopedAttribute("onUseARIAChange", onUseARIAChange);
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
		_activeDescendant = null;
		_activeState = false;
		_boundingBox = null;
		_children = null;
		_contentBox = null;
		_cssClass = null;
		_defaultChildType = null;
		_defaultState = false;
		_destroyed = false;
		_disabled = false;
		_focused = false;
		_height = null;
		_hideClass = "aui-helper-hidden";
		_hoverState = false;
		_toolbarId = null;
		_initialized = false;
		_multiple = false;
		_orientation = "horizontal";
		_render = null;
		_rendered = false;
		_selection = null;
		_srcNode = null;
		_strings = null;
		_tabIndex = 0;
		_useARIA = true;
		_visible = true;
		_width = null;
		_afterActiveDescendantChange = null;
		_afterActiveStateChange = null;
		_afterAddChild = null;
		_afterBoundingBoxChange = null;
		_afterChildrenChange = null;
		_afterContentBoxChange = null;
		_afterCssClassChange = null;
		_afterDefaultChildTypeChange = null;
		_afterDefaultStateChange = null;
		_afterDestroy = null;
		_afterDestroyedChange = null;
		_afterDisabledChange = null;
		_afterFocusedChange = null;
		_afterHeightChange = null;
		_afterHideClassChange = null;
		_afterHoverStateChange = null;
		_afterIdChange = null;
		_afterInit = null;
		_afterInitializedChange = null;
		_afterMultipleChange = null;
		_afterOrientationChange = null;
		_afterRemoveChild = null;
		_afterRenderChange = null;
		_afterRenderedChange = null;
		_afterSelectionChange = null;
		_afterSrcNodeChange = null;
		_afterStringsChange = null;
		_afterTabIndexChange = null;
		_afterUseARIAChange = null;
		_afterVisibleChange = null;
		_afterContentUpdate = null;
		_afterRender = null;
		_afterWidthChange = null;
		_onActiveDescendantChange = null;
		_onActiveStateChange = null;
		_onAddChild = null;
		_onBoundingBoxChange = null;
		_onChildrenChange = null;
		_onContentBoxChange = null;
		_onCssClassChange = null;
		_onDefaultChildTypeChange = null;
		_onDefaultStateChange = null;
		_onDestroy = null;
		_onDestroyedChange = null;
		_onDisabledChange = null;
		_onFocusedChange = null;
		_onHeightChange = null;
		_onHideClassChange = null;
		_onHoverStateChange = null;
		_onIdChange = null;
		_onInit = null;
		_onInitializedChange = null;
		_onMultipleChange = null;
		_onOrientationChange = null;
		_onRemoveChild = null;
		_onRenderChange = null;
		_onRenderedChange = null;
		_onSelectionChange = null;
		_onSrcNodeChange = null;
		_onStringsChange = null;
		_onTabIndexChange = null;
		_onUseARIAChange = null;
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
		setNamespacedAttribute(request, "activeDescendant", _activeDescendant);
		setNamespacedAttribute(request, "activeState", _activeState);
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "children", _children);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "defaultChildType", _defaultChildType);
		setNamespacedAttribute(request, "defaultState", _defaultState);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "hoverState", _hoverState);
		setNamespacedAttribute(request, "toolbarId", _toolbarId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "multiple", _multiple);
		setNamespacedAttribute(request, "orientation", _orientation);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "selection", _selection);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "useARIA", _useARIA);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "afterActiveDescendantChange", _afterActiveDescendantChange);
		setNamespacedAttribute(request, "afterActiveStateChange", _afterActiveStateChange);
		setNamespacedAttribute(request, "afterAddChild", _afterAddChild);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterChildrenChange", _afterChildrenChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterDefaultChildTypeChange", _afterDefaultChildTypeChange);
		setNamespacedAttribute(request, "afterDefaultStateChange", _afterDefaultStateChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterHideClassChange", _afterHideClassChange);
		setNamespacedAttribute(request, "afterHoverStateChange", _afterHoverStateChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterMultipleChange", _afterMultipleChange);
		setNamespacedAttribute(request, "afterOrientationChange", _afterOrientationChange);
		setNamespacedAttribute(request, "afterRemoveChild", _afterRemoveChild);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterSelectionChange", _afterSelectionChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterUseARIAChange", _afterUseARIAChange);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "onActiveDescendantChange", _onActiveDescendantChange);
		setNamespacedAttribute(request, "onActiveStateChange", _onActiveStateChange);
		setNamespacedAttribute(request, "onAddChild", _onAddChild);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onChildrenChange", _onChildrenChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onDefaultChildTypeChange", _onDefaultChildTypeChange);
		setNamespacedAttribute(request, "onDefaultStateChange", _onDefaultStateChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onHideClassChange", _onHideClassChange);
		setNamespacedAttribute(request, "onHoverStateChange", _onHoverStateChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onMultipleChange", _onMultipleChange);
		setNamespacedAttribute(request, "onOrientationChange", _onOrientationChange);
		setNamespacedAttribute(request, "onRemoveChild", _onRemoveChild);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onSelectionChange", _onSelectionChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onUseARIAChange", _onUseARIAChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:toolbar:";

	private static final String _PAGE =
		"/html/taglib/alloy/toolbar/page.jsp";

	private java.lang.Object _activeDescendant = null;
	private boolean _activeState = false;
	private java.lang.String _boundingBox = null;
	private java.lang.Object _children = null;
	private java.lang.String _contentBox = null;
	private java.lang.String _cssClass = null;
	private java.lang.Object _defaultChildType = null;
	private boolean _defaultState = false;
	private boolean _destroyed = false;
	private boolean _disabled = false;
	private boolean _focused = false;
	private java.lang.Object _height = null;
	private java.lang.String _hideClass = "aui-helper-hidden";
	private boolean _hoverState = false;
	private java.lang.String _toolbarId = null;
	private boolean _initialized = false;
	private boolean _multiple = false;
	private java.lang.String _orientation = "horizontal";
	private java.lang.Object _render = null;
	private boolean _rendered = false;
	private java.lang.Object _selection = null;
	private java.lang.String _srcNode = null;
	private java.lang.Object _strings = null;
	private java.lang.Object _tabIndex = 0;
	private boolean _useARIA = true;
	private boolean _visible = true;
	private java.lang.Object _width = null;
	private java.lang.Object _afterActiveDescendantChange = null;
	private java.lang.Object _afterActiveStateChange = null;
	private java.lang.Object _afterAddChild = null;
	private java.lang.Object _afterBoundingBoxChange = null;
	private java.lang.Object _afterChildrenChange = null;
	private java.lang.Object _afterContentBoxChange = null;
	private java.lang.Object _afterCssClassChange = null;
	private java.lang.Object _afterDefaultChildTypeChange = null;
	private java.lang.Object _afterDefaultStateChange = null;
	private java.lang.Object _afterDestroy = null;
	private java.lang.Object _afterDestroyedChange = null;
	private java.lang.Object _afterDisabledChange = null;
	private java.lang.Object _afterFocusedChange = null;
	private java.lang.Object _afterHeightChange = null;
	private java.lang.Object _afterHideClassChange = null;
	private java.lang.Object _afterHoverStateChange = null;
	private java.lang.Object _afterIdChange = null;
	private java.lang.Object _afterInit = null;
	private java.lang.Object _afterInitializedChange = null;
	private java.lang.Object _afterMultipleChange = null;
	private java.lang.Object _afterOrientationChange = null;
	private java.lang.Object _afterRemoveChild = null;
	private java.lang.Object _afterRenderChange = null;
	private java.lang.Object _afterRenderedChange = null;
	private java.lang.Object _afterSelectionChange = null;
	private java.lang.Object _afterSrcNodeChange = null;
	private java.lang.Object _afterStringsChange = null;
	private java.lang.Object _afterTabIndexChange = null;
	private java.lang.Object _afterUseARIAChange = null;
	private java.lang.Object _afterVisibleChange = null;
	private java.lang.Object _afterContentUpdate = null;
	private java.lang.Object _afterRender = null;
	private java.lang.Object _afterWidthChange = null;
	private java.lang.Object _onActiveDescendantChange = null;
	private java.lang.Object _onActiveStateChange = null;
	private java.lang.Object _onAddChild = null;
	private java.lang.Object _onBoundingBoxChange = null;
	private java.lang.Object _onChildrenChange = null;
	private java.lang.Object _onContentBoxChange = null;
	private java.lang.Object _onCssClassChange = null;
	private java.lang.Object _onDefaultChildTypeChange = null;
	private java.lang.Object _onDefaultStateChange = null;
	private java.lang.Object _onDestroy = null;
	private java.lang.Object _onDestroyedChange = null;
	private java.lang.Object _onDisabledChange = null;
	private java.lang.Object _onFocusedChange = null;
	private java.lang.Object _onHeightChange = null;
	private java.lang.Object _onHideClassChange = null;
	private java.lang.Object _onHoverStateChange = null;
	private java.lang.Object _onIdChange = null;
	private java.lang.Object _onInit = null;
	private java.lang.Object _onInitializedChange = null;
	private java.lang.Object _onMultipleChange = null;
	private java.lang.Object _onOrientationChange = null;
	private java.lang.Object _onRemoveChild = null;
	private java.lang.Object _onRenderChange = null;
	private java.lang.Object _onRenderedChange = null;
	private java.lang.Object _onSelectionChange = null;
	private java.lang.Object _onSrcNodeChange = null;
	private java.lang.Object _onStringsChange = null;
	private java.lang.Object _onTabIndexChange = null;
	private java.lang.Object _onUseARIAChange = null;
	private java.lang.Object _onVisibleChange = null;
	private java.lang.Object _onContentUpdate = null;
	private java.lang.Object _onRender = null;
	private java.lang.Object _onWidthChange = null;

}