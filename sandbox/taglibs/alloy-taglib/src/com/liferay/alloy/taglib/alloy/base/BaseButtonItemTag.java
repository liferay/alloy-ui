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
public class BaseButtonItemTag extends com.liferay.taglib.util.IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public boolean getActiveState() {
		return _activeState;
	}

	public java.lang.String getBoundingBox() {
		return _boundingBox;
	}

	public java.lang.Object getClassNames() {
		return _classNames;
	}

	public java.lang.String getContentBox() {
		return _contentBox;
	}

	public java.lang.String getCssClass() {
		return _cssClass;
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

	public java.lang.Object getHandler() {
		return _handler;
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

	public java.lang.String getIcon() {
		return _icon;
	}

	public java.lang.String getIconNode() {
		return _iconNode;
	}

	public java.lang.String getButtonitemId() {
		return _buttonitemId;
	}

	public boolean getInitialized() {
		return _initialized;
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

	public boolean getVisible() {
		return _visible;
	}

	public java.lang.Object getWidth() {
		return _width;
	}

	public java.lang.Object getAfterActiveStateChange() {
		return _afterActiveStateChange;
	}

	public java.lang.Object getAfterBoundingBoxChange() {
		return _afterBoundingBoxChange;
	}

	public java.lang.Object getAfterClassNamesChange() {
		return _afterClassNamesChange;
	}

	public java.lang.Object getAfterContentBoxChange() {
		return _afterContentBoxChange;
	}

	public java.lang.Object getAfterCssClassChange() {
		return _afterCssClassChange;
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

	public java.lang.Object getAfterHandlerChange() {
		return _afterHandlerChange;
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

	public java.lang.Object getAfterIconChange() {
		return _afterIconChange;
	}

	public java.lang.Object getAfterIconNodeChange() {
		return _afterIconNodeChange;
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

	public java.lang.Object getOnActiveStateChange() {
		return _onActiveStateChange;
	}

	public java.lang.Object getOnBoundingBoxChange() {
		return _onBoundingBoxChange;
	}

	public java.lang.Object getOnClassNamesChange() {
		return _onClassNamesChange;
	}

	public java.lang.Object getOnContentBoxChange() {
		return _onContentBoxChange;
	}

	public java.lang.Object getOnCssClassChange() {
		return _onCssClassChange;
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

	public java.lang.Object getOnHandlerChange() {
		return _onHandlerChange;
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

	public java.lang.Object getOnIconChange() {
		return _onIconChange;
	}

	public java.lang.Object getOnIconNodeChange() {
		return _onIconNodeChange;
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

	public void setActiveState(boolean activeState) {
		_activeState = activeState;

		setScopedAttribute("activeState", activeState);
	}

	public void setBoundingBox(java.lang.String boundingBox) {
		_boundingBox = boundingBox;

		setScopedAttribute("boundingBox", boundingBox);
	}

	public void setClassNames(java.lang.Object classNames) {
		_classNames = classNames;

		setScopedAttribute("classNames", classNames);
	}

	public void setContentBox(java.lang.String contentBox) {
		_contentBox = contentBox;

		setScopedAttribute("contentBox", contentBox);
	}

	public void setCssClass(java.lang.String cssClass) {
		_cssClass = cssClass;

		setScopedAttribute("cssClass", cssClass);
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

	public void setHandler(java.lang.Object handler) {
		_handler = handler;

		setScopedAttribute("handler", handler);
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

	public void setIcon(java.lang.String icon) {
		_icon = icon;

		setScopedAttribute("icon", icon);
	}

	public void setIconNode(java.lang.String iconNode) {
		_iconNode = iconNode;

		setScopedAttribute("iconNode", iconNode);
	}

	public void setButtonitemId(java.lang.String buttonitemId) {
		_buttonitemId = buttonitemId;

		setScopedAttribute("buttonitemId", buttonitemId);
	}

	public void setInitialized(boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
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

	public void setVisible(boolean visible) {
		_visible = visible;

		setScopedAttribute("visible", visible);
	}

	public void setWidth(java.lang.Object width) {
		_width = width;

		setScopedAttribute("width", width);
	}

	public void setAfterActiveStateChange(java.lang.Object afterActiveStateChange) {
		_afterActiveStateChange = afterActiveStateChange;

		setScopedAttribute("afterActiveStateChange", afterActiveStateChange);
	}

	public void setAfterBoundingBoxChange(java.lang.Object afterBoundingBoxChange) {
		_afterBoundingBoxChange = afterBoundingBoxChange;

		setScopedAttribute("afterBoundingBoxChange", afterBoundingBoxChange);
	}

	public void setAfterClassNamesChange(java.lang.Object afterClassNamesChange) {
		_afterClassNamesChange = afterClassNamesChange;

		setScopedAttribute("afterClassNamesChange", afterClassNamesChange);
	}

	public void setAfterContentBoxChange(java.lang.Object afterContentBoxChange) {
		_afterContentBoxChange = afterContentBoxChange;

		setScopedAttribute("afterContentBoxChange", afterContentBoxChange);
	}

	public void setAfterCssClassChange(java.lang.Object afterCssClassChange) {
		_afterCssClassChange = afterCssClassChange;

		setScopedAttribute("afterCssClassChange", afterCssClassChange);
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

	public void setAfterHandlerChange(java.lang.Object afterHandlerChange) {
		_afterHandlerChange = afterHandlerChange;

		setScopedAttribute("afterHandlerChange", afterHandlerChange);
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

	public void setAfterIconChange(java.lang.Object afterIconChange) {
		_afterIconChange = afterIconChange;

		setScopedAttribute("afterIconChange", afterIconChange);
	}

	public void setAfterIconNodeChange(java.lang.Object afterIconNodeChange) {
		_afterIconNodeChange = afterIconNodeChange;

		setScopedAttribute("afterIconNodeChange", afterIconNodeChange);
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

	public void setOnActiveStateChange(java.lang.Object onActiveStateChange) {
		_onActiveStateChange = onActiveStateChange;

		setScopedAttribute("onActiveStateChange", onActiveStateChange);
	}

	public void setOnBoundingBoxChange(java.lang.Object onBoundingBoxChange) {
		_onBoundingBoxChange = onBoundingBoxChange;

		setScopedAttribute("onBoundingBoxChange", onBoundingBoxChange);
	}

	public void setOnClassNamesChange(java.lang.Object onClassNamesChange) {
		_onClassNamesChange = onClassNamesChange;

		setScopedAttribute("onClassNamesChange", onClassNamesChange);
	}

	public void setOnContentBoxChange(java.lang.Object onContentBoxChange) {
		_onContentBoxChange = onContentBoxChange;

		setScopedAttribute("onContentBoxChange", onContentBoxChange);
	}

	public void setOnCssClassChange(java.lang.Object onCssClassChange) {
		_onCssClassChange = onCssClassChange;

		setScopedAttribute("onCssClassChange", onCssClassChange);
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

	public void setOnHandlerChange(java.lang.Object onHandlerChange) {
		_onHandlerChange = onHandlerChange;

		setScopedAttribute("onHandlerChange", onHandlerChange);
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

	public void setOnIconChange(java.lang.Object onIconChange) {
		_onIconChange = onIconChange;

		setScopedAttribute("onIconChange", onIconChange);
	}

	public void setOnIconNodeChange(java.lang.Object onIconNodeChange) {
		_onIconNodeChange = onIconNodeChange;

		setScopedAttribute("onIconNodeChange", onIconNodeChange);
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

	protected void cleanUp() {
		_activeState = false;
		_boundingBox = null;
		_classNames = null;
		_contentBox = null;
		_cssClass = null;
		_defaultState = true;
		_destroyed = false;
		_disabled = false;
		_focused = false;
		_handler = null;
		_height = null;
		_hideClass = "yui3-aui-helper-hidden";
		_hoverState = true;
		_icon = null;
		_iconNode = null;
		_buttonitemId = null;
		_initialized = false;
		_label = null;
		_labelNode = null;
		_render = null;
		_rendered = false;
		_srcNode = null;
		_strings = null;
		_tabIndex = 0;
		_title = null;
		_visible = true;
		_width = null;
		_afterActiveStateChange = null;
		_afterBoundingBoxChange = null;
		_afterClassNamesChange = null;
		_afterContentBoxChange = null;
		_afterCssClassChange = null;
		_afterDefaultStateChange = null;
		_afterDestroy = null;
		_afterDestroyedChange = null;
		_afterDisabledChange = null;
		_afterFocusedChange = null;
		_afterHandlerChange = null;
		_afterHeightChange = null;
		_afterHideClassChange = null;
		_afterHoverStateChange = null;
		_afterIconChange = null;
		_afterIconNodeChange = null;
		_afterIdChange = null;
		_afterInit = null;
		_afterInitializedChange = null;
		_afterLabelChange = null;
		_afterLabelNodeChange = null;
		_afterRenderChange = null;
		_afterRenderedChange = null;
		_afterSrcNodeChange = null;
		_afterStringsChange = null;
		_afterTabIndexChange = null;
		_afterTitleChange = null;
		_afterVisibleChange = null;
		_afterContentUpdate = null;
		_afterRender = null;
		_afterWidthChange = null;
		_onActiveStateChange = null;
		_onBoundingBoxChange = null;
		_onClassNamesChange = null;
		_onContentBoxChange = null;
		_onCssClassChange = null;
		_onDefaultStateChange = null;
		_onDestroy = null;
		_onDestroyedChange = null;
		_onDisabledChange = null;
		_onFocusedChange = null;
		_onHandlerChange = null;
		_onHeightChange = null;
		_onHideClassChange = null;
		_onHoverStateChange = null;
		_onIconChange = null;
		_onIconNodeChange = null;
		_onIdChange = null;
		_onInit = null;
		_onInitializedChange = null;
		_onLabelChange = null;
		_onLabelNodeChange = null;
		_onRenderChange = null;
		_onRenderedChange = null;
		_onSrcNodeChange = null;
		_onStringsChange = null;
		_onTabIndexChange = null;
		_onTitleChange = null;
		_onVisibleChange = null;
		_onContentUpdate = null;
		_onRender = null;
		_onWidthChange = null;
	}

	protected String getPage() {
		return _PAGE;
	}

	protected void setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "activeState", _activeState);
		setNamespacedAttribute(request, "boundingBox", _boundingBox);
		setNamespacedAttribute(request, "classNames", _classNames);
		setNamespacedAttribute(request, "contentBox", _contentBox);
		setNamespacedAttribute(request, "cssClass", _cssClass);
		setNamespacedAttribute(request, "defaultState", _defaultState);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "disabled", _disabled);
		setNamespacedAttribute(request, "focused", _focused);
		setNamespacedAttribute(request, "handler", _handler);
		setNamespacedAttribute(request, "height", _height);
		setNamespacedAttribute(request, "hideClass", _hideClass);
		setNamespacedAttribute(request, "hoverState", _hoverState);
		setNamespacedAttribute(request, "icon", _icon);
		setNamespacedAttribute(request, "iconNode", _iconNode);
		setNamespacedAttribute(request, "buttonitemId", _buttonitemId);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "label", _label);
		setNamespacedAttribute(request, "labelNode", _labelNode);
		setNamespacedAttribute(request, "render", _render);
		setNamespacedAttribute(request, "rendered", _rendered);
		setNamespacedAttribute(request, "srcNode", _srcNode);
		setNamespacedAttribute(request, "strings", _strings);
		setNamespacedAttribute(request, "tabIndex", _tabIndex);
		setNamespacedAttribute(request, "title", _title);
		setNamespacedAttribute(request, "visible", _visible);
		setNamespacedAttribute(request, "width", _width);
		setNamespacedAttribute(request, "afterActiveStateChange", _afterActiveStateChange);
		setNamespacedAttribute(request, "afterBoundingBoxChange", _afterBoundingBoxChange);
		setNamespacedAttribute(request, "afterClassNamesChange", _afterClassNamesChange);
		setNamespacedAttribute(request, "afterContentBoxChange", _afterContentBoxChange);
		setNamespacedAttribute(request, "afterCssClassChange", _afterCssClassChange);
		setNamespacedAttribute(request, "afterDefaultStateChange", _afterDefaultStateChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDisabledChange", _afterDisabledChange);
		setNamespacedAttribute(request, "afterFocusedChange", _afterFocusedChange);
		setNamespacedAttribute(request, "afterHandlerChange", _afterHandlerChange);
		setNamespacedAttribute(request, "afterHeightChange", _afterHeightChange);
		setNamespacedAttribute(request, "afterHideClassChange", _afterHideClassChange);
		setNamespacedAttribute(request, "afterHoverStateChange", _afterHoverStateChange);
		setNamespacedAttribute(request, "afterIconChange", _afterIconChange);
		setNamespacedAttribute(request, "afterIconNodeChange", _afterIconNodeChange);
		setNamespacedAttribute(request, "afterIdChange", _afterIdChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterLabelChange", _afterLabelChange);
		setNamespacedAttribute(request, "afterLabelNodeChange", _afterLabelNodeChange);
		setNamespacedAttribute(request, "afterRenderChange", _afterRenderChange);
		setNamespacedAttribute(request, "afterRenderedChange", _afterRenderedChange);
		setNamespacedAttribute(request, "afterSrcNodeChange", _afterSrcNodeChange);
		setNamespacedAttribute(request, "afterStringsChange", _afterStringsChange);
		setNamespacedAttribute(request, "afterTabIndexChange", _afterTabIndexChange);
		setNamespacedAttribute(request, "afterTitleChange", _afterTitleChange);
		setNamespacedAttribute(request, "afterVisibleChange", _afterVisibleChange);
		setNamespacedAttribute(request, "afterContentUpdate", _afterContentUpdate);
		setNamespacedAttribute(request, "afterRender", _afterRender);
		setNamespacedAttribute(request, "afterWidthChange", _afterWidthChange);
		setNamespacedAttribute(request, "onActiveStateChange", _onActiveStateChange);
		setNamespacedAttribute(request, "onBoundingBoxChange", _onBoundingBoxChange);
		setNamespacedAttribute(request, "onClassNamesChange", _onClassNamesChange);
		setNamespacedAttribute(request, "onContentBoxChange", _onContentBoxChange);
		setNamespacedAttribute(request, "onCssClassChange", _onCssClassChange);
		setNamespacedAttribute(request, "onDefaultStateChange", _onDefaultStateChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDisabledChange", _onDisabledChange);
		setNamespacedAttribute(request, "onFocusedChange", _onFocusedChange);
		setNamespacedAttribute(request, "onHandlerChange", _onHandlerChange);
		setNamespacedAttribute(request, "onHeightChange", _onHeightChange);
		setNamespacedAttribute(request, "onHideClassChange", _onHideClassChange);
		setNamespacedAttribute(request, "onHoverStateChange", _onHoverStateChange);
		setNamespacedAttribute(request, "onIconChange", _onIconChange);
		setNamespacedAttribute(request, "onIconNodeChange", _onIconNodeChange);
		setNamespacedAttribute(request, "onIdChange", _onIdChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onLabelChange", _onLabelChange);
		setNamespacedAttribute(request, "onLabelNodeChange", _onLabelNodeChange);
		setNamespacedAttribute(request, "onRenderChange", _onRenderChange);
		setNamespacedAttribute(request, "onRenderedChange", _onRenderedChange);
		setNamespacedAttribute(request, "onSrcNodeChange", _onSrcNodeChange);
		setNamespacedAttribute(request, "onStringsChange", _onStringsChange);
		setNamespacedAttribute(request, "onTabIndexChange", _onTabIndexChange);
		setNamespacedAttribute(request, "onTitleChange", _onTitleChange);
		setNamespacedAttribute(request, "onVisibleChange", _onVisibleChange);
		setNamespacedAttribute(request, "onContentUpdate", _onContentUpdate);
		setNamespacedAttribute(request, "onRender", _onRender);
		setNamespacedAttribute(request, "onWidthChange", _onWidthChange);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:button-item:";

	private static final String _PAGE =
		"/html/taglib/alloy/button_item/page.jsp";

	protected boolean _activeState;
	protected java.lang.String _boundingBox;
	protected java.lang.Object _classNames;
	protected java.lang.String _contentBox;
	protected java.lang.String _cssClass;
	protected boolean _defaultState;
	protected boolean _destroyed;
	protected boolean _disabled;
	protected boolean _focused;
	protected java.lang.Object _handler;
	protected java.lang.Object _height;
	protected java.lang.String _hideClass;
	protected boolean _hoverState;
	protected java.lang.String _icon;
	protected java.lang.String _iconNode;
	protected java.lang.String _buttonitemId;
	protected boolean _initialized;
	protected java.lang.String _label;
	protected java.lang.String _labelNode;
	protected java.lang.Object _render;
	protected boolean _rendered;
	protected java.lang.String _srcNode;
	protected java.lang.Object _strings;
	protected java.lang.Object _tabIndex;
	protected java.lang.String _title;
	protected boolean _visible;
	protected java.lang.Object _width;
	protected java.lang.Object _afterActiveStateChange;
	protected java.lang.Object _afterBoundingBoxChange;
	protected java.lang.Object _afterClassNamesChange;
	protected java.lang.Object _afterContentBoxChange;
	protected java.lang.Object _afterCssClassChange;
	protected java.lang.Object _afterDefaultStateChange;
	protected java.lang.Object _afterDestroy;
	protected java.lang.Object _afterDestroyedChange;
	protected java.lang.Object _afterDisabledChange;
	protected java.lang.Object _afterFocusedChange;
	protected java.lang.Object _afterHandlerChange;
	protected java.lang.Object _afterHeightChange;
	protected java.lang.Object _afterHideClassChange;
	protected java.lang.Object _afterHoverStateChange;
	protected java.lang.Object _afterIconChange;
	protected java.lang.Object _afterIconNodeChange;
	protected java.lang.Object _afterIdChange;
	protected java.lang.Object _afterInit;
	protected java.lang.Object _afterInitializedChange;
	protected java.lang.Object _afterLabelChange;
	protected java.lang.Object _afterLabelNodeChange;
	protected java.lang.Object _afterRenderChange;
	protected java.lang.Object _afterRenderedChange;
	protected java.lang.Object _afterSrcNodeChange;
	protected java.lang.Object _afterStringsChange;
	protected java.lang.Object _afterTabIndexChange;
	protected java.lang.Object _afterTitleChange;
	protected java.lang.Object _afterVisibleChange;
	protected java.lang.Object _afterContentUpdate;
	protected java.lang.Object _afterRender;
	protected java.lang.Object _afterWidthChange;
	protected java.lang.Object _onActiveStateChange;
	protected java.lang.Object _onBoundingBoxChange;
	protected java.lang.Object _onClassNamesChange;
	protected java.lang.Object _onContentBoxChange;
	protected java.lang.Object _onCssClassChange;
	protected java.lang.Object _onDefaultStateChange;
	protected java.lang.Object _onDestroy;
	protected java.lang.Object _onDestroyedChange;
	protected java.lang.Object _onDisabledChange;
	protected java.lang.Object _onFocusedChange;
	protected java.lang.Object _onHandlerChange;
	protected java.lang.Object _onHeightChange;
	protected java.lang.Object _onHideClassChange;
	protected java.lang.Object _onHoverStateChange;
	protected java.lang.Object _onIconChange;
	protected java.lang.Object _onIconNodeChange;
	protected java.lang.Object _onIdChange;
	protected java.lang.Object _onInit;
	protected java.lang.Object _onInitializedChange;
	protected java.lang.Object _onLabelChange;
	protected java.lang.Object _onLabelNodeChange;
	protected java.lang.Object _onRenderChange;
	protected java.lang.Object _onRenderedChange;
	protected java.lang.Object _onSrcNodeChange;
	protected java.lang.Object _onStringsChange;
	protected java.lang.Object _onTabIndexChange;
	protected java.lang.Object _onTitleChange;
	protected java.lang.Object _onVisibleChange;
	protected java.lang.Object _onContentUpdate;
	protected java.lang.Object _onRender;
	protected java.lang.Object _onWidthChange;

}