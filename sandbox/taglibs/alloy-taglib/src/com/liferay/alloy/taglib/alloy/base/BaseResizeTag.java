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
public class BaseResizeTag extends com.liferay.taglib.util.IncludeTag {

	@Override
	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public java.lang.String getActiveHandle() {
		return _activeHandle;
	}

	public java.lang.Object getActiveHandleEl() {
		return _activeHandleEl;
	}

	public java.lang.Object getActiveHandleNode() {
		return _activeHandleNode;
	}

	public boolean getAutoHide() {
		return _autoHide;
	}

	public java.lang.Object getConstrain() {
		return _constrain;
	}

	public java.lang.Object getDefMinHeight() {
		return _defMinHeight;
	}

	public java.lang.Object getDefMinWidth() {
		return _defMinWidth;
	}

	public boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.Object getHandles() {
		return _handles;
	}

	public boolean getInitialized() {
		return _initialized;
	}

	public java.lang.Object getMaxHeight() {
		return _maxHeight;
	}

	public java.lang.Object getMaxWidth() {
		return _maxWidth;
	}

	public java.lang.Object getMinHeight() {
		return _minHeight;
	}

	public java.lang.Object getMinWidth() {
		return _minWidth;
	}

	public java.lang.Object getNode() {
		return _node;
	}

	public boolean getPreserveRatio() {
		return _preserveRatio;
	}

	public boolean getProxy() {
		return _proxy;
	}

	public java.lang.String getProxyEl() {
		return _proxyEl;
	}

	public java.lang.String getProxyNode() {
		return _proxyNode;
	}

	public boolean getResizing() {
		return _resizing;
	}

	public java.lang.Object getTickX() {
		return _tickX;
	}

	public java.lang.Object getTickY() {
		return _tickY;
	}

	public boolean getWrap() {
		return _wrap;
	}

	public java.lang.Object getWrapTypes() {
		return _wrapTypes;
	}

	public java.lang.String getWrapper() {
		return _wrapper;
	}

	public java.lang.Object getAfterActiveHandleChange() {
		return _afterActiveHandleChange;
	}

	public java.lang.Object getAfterActiveHandleElChange() {
		return _afterActiveHandleElChange;
	}

	public java.lang.Object getAfterActiveHandleNodeChange() {
		return _afterActiveHandleNodeChange;
	}

	public java.lang.Object getAfterAutoHideChange() {
		return _afterAutoHideChange;
	}

	public java.lang.Object getAfterConstrainChange() {
		return _afterConstrainChange;
	}

	public java.lang.Object getAfterDefMinHeightChange() {
		return _afterDefMinHeightChange;
	}

	public java.lang.Object getAfterDefMinWidthChange() {
		return _afterDefMinWidthChange;
	}

	public java.lang.Object getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.Object getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.Object getAfterHandlesChange() {
		return _afterHandlesChange;
	}

	public java.lang.Object getAfterInit() {
		return _afterInit;
	}

	public java.lang.Object getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.Object getAfterMaxHeightChange() {
		return _afterMaxHeightChange;
	}

	public java.lang.Object getAfterMaxWidthChange() {
		return _afterMaxWidthChange;
	}

	public java.lang.Object getAfterMinHeightChange() {
		return _afterMinHeightChange;
	}

	public java.lang.Object getAfterMinWidthChange() {
		return _afterMinWidthChange;
	}

	public java.lang.Object getAfterNodeChange() {
		return _afterNodeChange;
	}

	public java.lang.Object getAfterPreserveRatioChange() {
		return _afterPreserveRatioChange;
	}

	public java.lang.Object getAfterProxyChange() {
		return _afterProxyChange;
	}

	public java.lang.Object getAfterProxyElChange() {
		return _afterProxyElChange;
	}

	public java.lang.Object getAfterProxyNodeChange() {
		return _afterProxyNodeChange;
	}

	public java.lang.Object getAfterAlign() {
		return _afterAlign;
	}

	public java.lang.Object getAfterEnd() {
		return _afterEnd;
	}

	public java.lang.Object getAfterMouseUp() {
		return _afterMouseUp;
	}

	public java.lang.Object getAfterResize() {
		return _afterResize;
	}

	public java.lang.Object getAfterStart() {
		return _afterStart;
	}

	public java.lang.Object getAfterResizingChange() {
		return _afterResizingChange;
	}

	public java.lang.Object getAfterTickXChange() {
		return _afterTickXChange;
	}

	public java.lang.Object getAfterTickYChange() {
		return _afterTickYChange;
	}

	public java.lang.Object getAfterWrapChange() {
		return _afterWrapChange;
	}

	public java.lang.Object getAfterWrapTypesChange() {
		return _afterWrapTypesChange;
	}

	public java.lang.Object getAfterWrapperChange() {
		return _afterWrapperChange;
	}

	public java.lang.Object getOnActiveHandleChange() {
		return _onActiveHandleChange;
	}

	public java.lang.Object getOnActiveHandleElChange() {
		return _onActiveHandleElChange;
	}

	public java.lang.Object getOnActiveHandleNodeChange() {
		return _onActiveHandleNodeChange;
	}

	public java.lang.Object getOnAutoHideChange() {
		return _onAutoHideChange;
	}

	public java.lang.Object getOnConstrainChange() {
		return _onConstrainChange;
	}

	public java.lang.Object getOnDefMinHeightChange() {
		return _onDefMinHeightChange;
	}

	public java.lang.Object getOnDefMinWidthChange() {
		return _onDefMinWidthChange;
	}

	public java.lang.Object getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.Object getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.Object getOnHandlesChange() {
		return _onHandlesChange;
	}

	public java.lang.Object getOnInit() {
		return _onInit;
	}

	public java.lang.Object getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.Object getOnMaxHeightChange() {
		return _onMaxHeightChange;
	}

	public java.lang.Object getOnMaxWidthChange() {
		return _onMaxWidthChange;
	}

	public java.lang.Object getOnMinHeightChange() {
		return _onMinHeightChange;
	}

	public java.lang.Object getOnMinWidthChange() {
		return _onMinWidthChange;
	}

	public java.lang.Object getOnNodeChange() {
		return _onNodeChange;
	}

	public java.lang.Object getOnPreserveRatioChange() {
		return _onPreserveRatioChange;
	}

	public java.lang.Object getOnProxyChange() {
		return _onProxyChange;
	}

	public java.lang.Object getOnProxyElChange() {
		return _onProxyElChange;
	}

	public java.lang.Object getOnProxyNodeChange() {
		return _onProxyNodeChange;
	}

	public java.lang.Object getOnAlign() {
		return _onAlign;
	}

	public java.lang.Object getOnEnd() {
		return _onEnd;
	}

	public java.lang.Object getOnMouseUp() {
		return _onMouseUp;
	}

	public java.lang.Object getOnResize() {
		return _onResize;
	}

	public java.lang.Object getOnStart() {
		return _onStart;
	}

	public java.lang.Object getOnResizingChange() {
		return _onResizingChange;
	}

	public java.lang.Object getOnTickXChange() {
		return _onTickXChange;
	}

	public java.lang.Object getOnTickYChange() {
		return _onTickYChange;
	}

	public java.lang.Object getOnWrapChange() {
		return _onWrapChange;
	}

	public java.lang.Object getOnWrapTypesChange() {
		return _onWrapTypesChange;
	}

	public java.lang.Object getOnWrapperChange() {
		return _onWrapperChange;
	}

	public void setActiveHandle(java.lang.String activeHandle) {
		_activeHandle = activeHandle;

		setScopedAttribute("activeHandle", activeHandle);
	}

	public void setActiveHandleEl(java.lang.Object activeHandleEl) {
		_activeHandleEl = activeHandleEl;

		setScopedAttribute("activeHandleEl", activeHandleEl);
	}

	public void setActiveHandleNode(java.lang.Object activeHandleNode) {
		_activeHandleNode = activeHandleNode;

		setScopedAttribute("activeHandleNode", activeHandleNode);
	}

	public void setAutoHide(boolean autoHide) {
		_autoHide = autoHide;

		setScopedAttribute("autoHide", autoHide);
	}

	public void setConstrain(java.lang.Object constrain) {
		_constrain = constrain;

		setScopedAttribute("constrain", constrain);
	}

	public void setDefMinHeight(java.lang.Object defMinHeight) {
		_defMinHeight = defMinHeight;

		setScopedAttribute("defMinHeight", defMinHeight);
	}

	public void setDefMinWidth(java.lang.Object defMinWidth) {
		_defMinWidth = defMinWidth;

		setScopedAttribute("defMinWidth", defMinWidth);
	}

	public void setDestroyed(boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setHandles(java.lang.Object handles) {
		_handles = handles;

		setScopedAttribute("handles", handles);
	}

	public void setInitialized(boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setMaxHeight(java.lang.Object maxHeight) {
		_maxHeight = maxHeight;

		setScopedAttribute("maxHeight", maxHeight);
	}

	public void setMaxWidth(java.lang.Object maxWidth) {
		_maxWidth = maxWidth;

		setScopedAttribute("maxWidth", maxWidth);
	}

	public void setMinHeight(java.lang.Object minHeight) {
		_minHeight = minHeight;

		setScopedAttribute("minHeight", minHeight);
	}

	public void setMinWidth(java.lang.Object minWidth) {
		_minWidth = minWidth;

		setScopedAttribute("minWidth", minWidth);
	}

	public void setNode(java.lang.Object node) {
		_node = node;

		setScopedAttribute("node", node);
	}

	public void setPreserveRatio(boolean preserveRatio) {
		_preserveRatio = preserveRatio;

		setScopedAttribute("preserveRatio", preserveRatio);
	}

	public void setProxy(boolean proxy) {
		_proxy = proxy;

		setScopedAttribute("proxy", proxy);
	}

	public void setProxyEl(java.lang.String proxyEl) {
		_proxyEl = proxyEl;

		setScopedAttribute("proxyEl", proxyEl);
	}

	public void setProxyNode(java.lang.String proxyNode) {
		_proxyNode = proxyNode;

		setScopedAttribute("proxyNode", proxyNode);
	}

	public void setResizing(boolean resizing) {
		_resizing = resizing;

		setScopedAttribute("resizing", resizing);
	}

	public void setTickX(java.lang.Object tickX) {
		_tickX = tickX;

		setScopedAttribute("tickX", tickX);
	}

	public void setTickY(java.lang.Object tickY) {
		_tickY = tickY;

		setScopedAttribute("tickY", tickY);
	}

	public void setWrap(boolean wrap) {
		_wrap = wrap;

		setScopedAttribute("wrap", wrap);
	}

	public void setWrapTypes(java.lang.Object wrapTypes) {
		_wrapTypes = wrapTypes;

		setScopedAttribute("wrapTypes", wrapTypes);
	}

	public void setWrapper(java.lang.String wrapper) {
		_wrapper = wrapper;

		setScopedAttribute("wrapper", wrapper);
	}

	public void setAfterActiveHandleChange(java.lang.Object afterActiveHandleChange) {
		_afterActiveHandleChange = afterActiveHandleChange;

		setScopedAttribute("afterActiveHandleChange", afterActiveHandleChange);
	}

	public void setAfterActiveHandleElChange(java.lang.Object afterActiveHandleElChange) {
		_afterActiveHandleElChange = afterActiveHandleElChange;

		setScopedAttribute("afterActiveHandleElChange", afterActiveHandleElChange);
	}

	public void setAfterActiveHandleNodeChange(java.lang.Object afterActiveHandleNodeChange) {
		_afterActiveHandleNodeChange = afterActiveHandleNodeChange;

		setScopedAttribute("afterActiveHandleNodeChange", afterActiveHandleNodeChange);
	}

	public void setAfterAutoHideChange(java.lang.Object afterAutoHideChange) {
		_afterAutoHideChange = afterAutoHideChange;

		setScopedAttribute("afterAutoHideChange", afterAutoHideChange);
	}

	public void setAfterConstrainChange(java.lang.Object afterConstrainChange) {
		_afterConstrainChange = afterConstrainChange;

		setScopedAttribute("afterConstrainChange", afterConstrainChange);
	}

	public void setAfterDefMinHeightChange(java.lang.Object afterDefMinHeightChange) {
		_afterDefMinHeightChange = afterDefMinHeightChange;

		setScopedAttribute("afterDefMinHeightChange", afterDefMinHeightChange);
	}

	public void setAfterDefMinWidthChange(java.lang.Object afterDefMinWidthChange) {
		_afterDefMinWidthChange = afterDefMinWidthChange;

		setScopedAttribute("afterDefMinWidthChange", afterDefMinWidthChange);
	}

	public void setAfterDestroy(java.lang.Object afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.Object afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterHandlesChange(java.lang.Object afterHandlesChange) {
		_afterHandlesChange = afterHandlesChange;

		setScopedAttribute("afterHandlesChange", afterHandlesChange);
	}

	public void setAfterInit(java.lang.Object afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.Object afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterMaxHeightChange(java.lang.Object afterMaxHeightChange) {
		_afterMaxHeightChange = afterMaxHeightChange;

		setScopedAttribute("afterMaxHeightChange", afterMaxHeightChange);
	}

	public void setAfterMaxWidthChange(java.lang.Object afterMaxWidthChange) {
		_afterMaxWidthChange = afterMaxWidthChange;

		setScopedAttribute("afterMaxWidthChange", afterMaxWidthChange);
	}

	public void setAfterMinHeightChange(java.lang.Object afterMinHeightChange) {
		_afterMinHeightChange = afterMinHeightChange;

		setScopedAttribute("afterMinHeightChange", afterMinHeightChange);
	}

	public void setAfterMinWidthChange(java.lang.Object afterMinWidthChange) {
		_afterMinWidthChange = afterMinWidthChange;

		setScopedAttribute("afterMinWidthChange", afterMinWidthChange);
	}

	public void setAfterNodeChange(java.lang.Object afterNodeChange) {
		_afterNodeChange = afterNodeChange;

		setScopedAttribute("afterNodeChange", afterNodeChange);
	}

	public void setAfterPreserveRatioChange(java.lang.Object afterPreserveRatioChange) {
		_afterPreserveRatioChange = afterPreserveRatioChange;

		setScopedAttribute("afterPreserveRatioChange", afterPreserveRatioChange);
	}

	public void setAfterProxyChange(java.lang.Object afterProxyChange) {
		_afterProxyChange = afterProxyChange;

		setScopedAttribute("afterProxyChange", afterProxyChange);
	}

	public void setAfterProxyElChange(java.lang.Object afterProxyElChange) {
		_afterProxyElChange = afterProxyElChange;

		setScopedAttribute("afterProxyElChange", afterProxyElChange);
	}

	public void setAfterProxyNodeChange(java.lang.Object afterProxyNodeChange) {
		_afterProxyNodeChange = afterProxyNodeChange;

		setScopedAttribute("afterProxyNodeChange", afterProxyNodeChange);
	}

	public void setAfterAlign(java.lang.Object afterAlign) {
		_afterAlign = afterAlign;

		setScopedAttribute("afterAlign", afterAlign);
	}

	public void setAfterEnd(java.lang.Object afterEnd) {
		_afterEnd = afterEnd;

		setScopedAttribute("afterEnd", afterEnd);
	}

	public void setAfterMouseUp(java.lang.Object afterMouseUp) {
		_afterMouseUp = afterMouseUp;

		setScopedAttribute("afterMouseUp", afterMouseUp);
	}

	public void setAfterResize(java.lang.Object afterResize) {
		_afterResize = afterResize;

		setScopedAttribute("afterResize", afterResize);
	}

	public void setAfterStart(java.lang.Object afterStart) {
		_afterStart = afterStart;

		setScopedAttribute("afterStart", afterStart);
	}

	public void setAfterResizingChange(java.lang.Object afterResizingChange) {
		_afterResizingChange = afterResizingChange;

		setScopedAttribute("afterResizingChange", afterResizingChange);
	}

	public void setAfterTickXChange(java.lang.Object afterTickXChange) {
		_afterTickXChange = afterTickXChange;

		setScopedAttribute("afterTickXChange", afterTickXChange);
	}

	public void setAfterTickYChange(java.lang.Object afterTickYChange) {
		_afterTickYChange = afterTickYChange;

		setScopedAttribute("afterTickYChange", afterTickYChange);
	}

	public void setAfterWrapChange(java.lang.Object afterWrapChange) {
		_afterWrapChange = afterWrapChange;

		setScopedAttribute("afterWrapChange", afterWrapChange);
	}

	public void setAfterWrapTypesChange(java.lang.Object afterWrapTypesChange) {
		_afterWrapTypesChange = afterWrapTypesChange;

		setScopedAttribute("afterWrapTypesChange", afterWrapTypesChange);
	}

	public void setAfterWrapperChange(java.lang.Object afterWrapperChange) {
		_afterWrapperChange = afterWrapperChange;

		setScopedAttribute("afterWrapperChange", afterWrapperChange);
	}

	public void setOnActiveHandleChange(java.lang.Object onActiveHandleChange) {
		_onActiveHandleChange = onActiveHandleChange;

		setScopedAttribute("onActiveHandleChange", onActiveHandleChange);
	}

	public void setOnActiveHandleElChange(java.lang.Object onActiveHandleElChange) {
		_onActiveHandleElChange = onActiveHandleElChange;

		setScopedAttribute("onActiveHandleElChange", onActiveHandleElChange);
	}

	public void setOnActiveHandleNodeChange(java.lang.Object onActiveHandleNodeChange) {
		_onActiveHandleNodeChange = onActiveHandleNodeChange;

		setScopedAttribute("onActiveHandleNodeChange", onActiveHandleNodeChange);
	}

	public void setOnAutoHideChange(java.lang.Object onAutoHideChange) {
		_onAutoHideChange = onAutoHideChange;

		setScopedAttribute("onAutoHideChange", onAutoHideChange);
	}

	public void setOnConstrainChange(java.lang.Object onConstrainChange) {
		_onConstrainChange = onConstrainChange;

		setScopedAttribute("onConstrainChange", onConstrainChange);
	}

	public void setOnDefMinHeightChange(java.lang.Object onDefMinHeightChange) {
		_onDefMinHeightChange = onDefMinHeightChange;

		setScopedAttribute("onDefMinHeightChange", onDefMinHeightChange);
	}

	public void setOnDefMinWidthChange(java.lang.Object onDefMinWidthChange) {
		_onDefMinWidthChange = onDefMinWidthChange;

		setScopedAttribute("onDefMinWidthChange", onDefMinWidthChange);
	}

	public void setOnDestroy(java.lang.Object onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.Object onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnHandlesChange(java.lang.Object onHandlesChange) {
		_onHandlesChange = onHandlesChange;

		setScopedAttribute("onHandlesChange", onHandlesChange);
	}

	public void setOnInit(java.lang.Object onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.Object onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnMaxHeightChange(java.lang.Object onMaxHeightChange) {
		_onMaxHeightChange = onMaxHeightChange;

		setScopedAttribute("onMaxHeightChange", onMaxHeightChange);
	}

	public void setOnMaxWidthChange(java.lang.Object onMaxWidthChange) {
		_onMaxWidthChange = onMaxWidthChange;

		setScopedAttribute("onMaxWidthChange", onMaxWidthChange);
	}

	public void setOnMinHeightChange(java.lang.Object onMinHeightChange) {
		_onMinHeightChange = onMinHeightChange;

		setScopedAttribute("onMinHeightChange", onMinHeightChange);
	}

	public void setOnMinWidthChange(java.lang.Object onMinWidthChange) {
		_onMinWidthChange = onMinWidthChange;

		setScopedAttribute("onMinWidthChange", onMinWidthChange);
	}

	public void setOnNodeChange(java.lang.Object onNodeChange) {
		_onNodeChange = onNodeChange;

		setScopedAttribute("onNodeChange", onNodeChange);
	}

	public void setOnPreserveRatioChange(java.lang.Object onPreserveRatioChange) {
		_onPreserveRatioChange = onPreserveRatioChange;

		setScopedAttribute("onPreserveRatioChange", onPreserveRatioChange);
	}

	public void setOnProxyChange(java.lang.Object onProxyChange) {
		_onProxyChange = onProxyChange;

		setScopedAttribute("onProxyChange", onProxyChange);
	}

	public void setOnProxyElChange(java.lang.Object onProxyElChange) {
		_onProxyElChange = onProxyElChange;

		setScopedAttribute("onProxyElChange", onProxyElChange);
	}

	public void setOnProxyNodeChange(java.lang.Object onProxyNodeChange) {
		_onProxyNodeChange = onProxyNodeChange;

		setScopedAttribute("onProxyNodeChange", onProxyNodeChange);
	}

	public void setOnAlign(java.lang.Object onAlign) {
		_onAlign = onAlign;

		setScopedAttribute("onAlign", onAlign);
	}

	public void setOnEnd(java.lang.Object onEnd) {
		_onEnd = onEnd;

		setScopedAttribute("onEnd", onEnd);
	}

	public void setOnMouseUp(java.lang.Object onMouseUp) {
		_onMouseUp = onMouseUp;

		setScopedAttribute("onMouseUp", onMouseUp);
	}

	public void setOnResize(java.lang.Object onResize) {
		_onResize = onResize;

		setScopedAttribute("onResize", onResize);
	}

	public void setOnStart(java.lang.Object onStart) {
		_onStart = onStart;

		setScopedAttribute("onStart", onStart);
	}

	public void setOnResizingChange(java.lang.Object onResizingChange) {
		_onResizingChange = onResizingChange;

		setScopedAttribute("onResizingChange", onResizingChange);
	}

	public void setOnTickXChange(java.lang.Object onTickXChange) {
		_onTickXChange = onTickXChange;

		setScopedAttribute("onTickXChange", onTickXChange);
	}

	public void setOnTickYChange(java.lang.Object onTickYChange) {
		_onTickYChange = onTickYChange;

		setScopedAttribute("onTickYChange", onTickYChange);
	}

	public void setOnWrapChange(java.lang.Object onWrapChange) {
		_onWrapChange = onWrapChange;

		setScopedAttribute("onWrapChange", onWrapChange);
	}

	public void setOnWrapTypesChange(java.lang.Object onWrapTypesChange) {
		_onWrapTypesChange = onWrapTypesChange;

		setScopedAttribute("onWrapTypesChange", onWrapTypesChange);
	}

	public void setOnWrapperChange(java.lang.Object onWrapperChange) {
		_onWrapperChange = onWrapperChange;

		setScopedAttribute("onWrapperChange", onWrapperChange);
	}

	@Override
	protected void cleanUp() {
		_activeHandle = null;
		_activeHandleEl = null;
		_activeHandleNode = null;
		_autoHide = false;
		_constrain = null;
		_defMinHeight = 15;
		_defMinWidth = 15;
		_destroyed = false;
		_handles = null;
		_initialized = false;
		_maxHeight = 2147483647;
		_maxWidth = 2147483647;
		_minHeight = 15;
		_minWidth = 15;
		_node = null;
		_preserveRatio = false;
		_proxy = false;
		_proxyEl = null;
		_proxyNode = null;
		_resizing = false;
		_tickX = null;
		_tickY = null;
		_wrap = false;
		_wrapTypes = null;
		_wrapper = "div";
		_afterActiveHandleChange = null;
		_afterActiveHandleElChange = null;
		_afterActiveHandleNodeChange = null;
		_afterAutoHideChange = null;
		_afterConstrainChange = null;
		_afterDefMinHeightChange = null;
		_afterDefMinWidthChange = null;
		_afterDestroy = null;
		_afterDestroyedChange = null;
		_afterHandlesChange = null;
		_afterInit = null;
		_afterInitializedChange = null;
		_afterMaxHeightChange = null;
		_afterMaxWidthChange = null;
		_afterMinHeightChange = null;
		_afterMinWidthChange = null;
		_afterNodeChange = null;
		_afterPreserveRatioChange = null;
		_afterProxyChange = null;
		_afterProxyElChange = null;
		_afterProxyNodeChange = null;
		_afterAlign = null;
		_afterEnd = null;
		_afterMouseUp = null;
		_afterResize = null;
		_afterStart = null;
		_afterResizingChange = null;
		_afterTickXChange = null;
		_afterTickYChange = null;
		_afterWrapChange = null;
		_afterWrapTypesChange = null;
		_afterWrapperChange = null;
		_onActiveHandleChange = null;
		_onActiveHandleElChange = null;
		_onActiveHandleNodeChange = null;
		_onAutoHideChange = null;
		_onConstrainChange = null;
		_onDefMinHeightChange = null;
		_onDefMinWidthChange = null;
		_onDestroy = null;
		_onDestroyedChange = null;
		_onHandlesChange = null;
		_onInit = null;
		_onInitializedChange = null;
		_onMaxHeightChange = null;
		_onMaxWidthChange = null;
		_onMinHeightChange = null;
		_onMinWidthChange = null;
		_onNodeChange = null;
		_onPreserveRatioChange = null;
		_onProxyChange = null;
		_onProxyElChange = null;
		_onProxyNodeChange = null;
		_onAlign = null;
		_onEnd = null;
		_onMouseUp = null;
		_onResize = null;
		_onStart = null;
		_onResizingChange = null;
		_onTickXChange = null;
		_onTickYChange = null;
		_onWrapChange = null;
		_onWrapTypesChange = null;
		_onWrapperChange = null;
	}

	@Override
	protected String getPage() {
		return _PAGE;
	}

	@Override
	protected void setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "activeHandle", _activeHandle);
		setNamespacedAttribute(request, "activeHandleEl", _activeHandleEl);
		setNamespacedAttribute(request, "activeHandleNode", _activeHandleNode);
		setNamespacedAttribute(request, "autoHide", _autoHide);
		setNamespacedAttribute(request, "constrain", _constrain);
		setNamespacedAttribute(request, "defMinHeight", _defMinHeight);
		setNamespacedAttribute(request, "defMinWidth", _defMinWidth);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "handles", _handles);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "maxHeight", _maxHeight);
		setNamespacedAttribute(request, "maxWidth", _maxWidth);
		setNamespacedAttribute(request, "minHeight", _minHeight);
		setNamespacedAttribute(request, "minWidth", _minWidth);
		setNamespacedAttribute(request, "node", _node);
		setNamespacedAttribute(request, "preserveRatio", _preserveRatio);
		setNamespacedAttribute(request, "proxy", _proxy);
		setNamespacedAttribute(request, "proxyEl", _proxyEl);
		setNamespacedAttribute(request, "proxyNode", _proxyNode);
		setNamespacedAttribute(request, "resizing", _resizing);
		setNamespacedAttribute(request, "tickX", _tickX);
		setNamespacedAttribute(request, "tickY", _tickY);
		setNamespacedAttribute(request, "wrap", _wrap);
		setNamespacedAttribute(request, "wrapTypes", _wrapTypes);
		setNamespacedAttribute(request, "wrapper", _wrapper);
		setNamespacedAttribute(request, "afterActiveHandleChange", _afterActiveHandleChange);
		setNamespacedAttribute(request, "afterActiveHandleElChange", _afterActiveHandleElChange);
		setNamespacedAttribute(request, "afterActiveHandleNodeChange", _afterActiveHandleNodeChange);
		setNamespacedAttribute(request, "afterAutoHideChange", _afterAutoHideChange);
		setNamespacedAttribute(request, "afterConstrainChange", _afterConstrainChange);
		setNamespacedAttribute(request, "afterDefMinHeightChange", _afterDefMinHeightChange);
		setNamespacedAttribute(request, "afterDefMinWidthChange", _afterDefMinWidthChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterHandlesChange", _afterHandlesChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterMaxHeightChange", _afterMaxHeightChange);
		setNamespacedAttribute(request, "afterMaxWidthChange", _afterMaxWidthChange);
		setNamespacedAttribute(request, "afterMinHeightChange", _afterMinHeightChange);
		setNamespacedAttribute(request, "afterMinWidthChange", _afterMinWidthChange);
		setNamespacedAttribute(request, "afterNodeChange", _afterNodeChange);
		setNamespacedAttribute(request, "afterPreserveRatioChange", _afterPreserveRatioChange);
		setNamespacedAttribute(request, "afterProxyChange", _afterProxyChange);
		setNamespacedAttribute(request, "afterProxyElChange", _afterProxyElChange);
		setNamespacedAttribute(request, "afterProxyNodeChange", _afterProxyNodeChange);
		setNamespacedAttribute(request, "afterAlign", _afterAlign);
		setNamespacedAttribute(request, "afterEnd", _afterEnd);
		setNamespacedAttribute(request, "afterMouseUp", _afterMouseUp);
		setNamespacedAttribute(request, "afterResize", _afterResize);
		setNamespacedAttribute(request, "afterStart", _afterStart);
		setNamespacedAttribute(request, "afterResizingChange", _afterResizingChange);
		setNamespacedAttribute(request, "afterTickXChange", _afterTickXChange);
		setNamespacedAttribute(request, "afterTickYChange", _afterTickYChange);
		setNamespacedAttribute(request, "afterWrapChange", _afterWrapChange);
		setNamespacedAttribute(request, "afterWrapTypesChange", _afterWrapTypesChange);
		setNamespacedAttribute(request, "afterWrapperChange", _afterWrapperChange);
		setNamespacedAttribute(request, "onActiveHandleChange", _onActiveHandleChange);
		setNamespacedAttribute(request, "onActiveHandleElChange", _onActiveHandleElChange);
		setNamespacedAttribute(request, "onActiveHandleNodeChange", _onActiveHandleNodeChange);
		setNamespacedAttribute(request, "onAutoHideChange", _onAutoHideChange);
		setNamespacedAttribute(request, "onConstrainChange", _onConstrainChange);
		setNamespacedAttribute(request, "onDefMinHeightChange", _onDefMinHeightChange);
		setNamespacedAttribute(request, "onDefMinWidthChange", _onDefMinWidthChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onHandlesChange", _onHandlesChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onMaxHeightChange", _onMaxHeightChange);
		setNamespacedAttribute(request, "onMaxWidthChange", _onMaxWidthChange);
		setNamespacedAttribute(request, "onMinHeightChange", _onMinHeightChange);
		setNamespacedAttribute(request, "onMinWidthChange", _onMinWidthChange);
		setNamespacedAttribute(request, "onNodeChange", _onNodeChange);
		setNamespacedAttribute(request, "onPreserveRatioChange", _onPreserveRatioChange);
		setNamespacedAttribute(request, "onProxyChange", _onProxyChange);
		setNamespacedAttribute(request, "onProxyElChange", _onProxyElChange);
		setNamespacedAttribute(request, "onProxyNodeChange", _onProxyNodeChange);
		setNamespacedAttribute(request, "onAlign", _onAlign);
		setNamespacedAttribute(request, "onEnd", _onEnd);
		setNamespacedAttribute(request, "onMouseUp", _onMouseUp);
		setNamespacedAttribute(request, "onResize", _onResize);
		setNamespacedAttribute(request, "onStart", _onStart);
		setNamespacedAttribute(request, "onResizingChange", _onResizingChange);
		setNamespacedAttribute(request, "onTickXChange", _onTickXChange);
		setNamespacedAttribute(request, "onTickYChange", _onTickYChange);
		setNamespacedAttribute(request, "onWrapChange", _onWrapChange);
		setNamespacedAttribute(request, "onWrapTypesChange", _onWrapTypesChange);
		setNamespacedAttribute(request, "onWrapperChange", _onWrapperChange);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:resize:";

	private static final String _PAGE =
		"/html/taglib/alloy/resize/page.jsp";

	private java.lang.String _activeHandle = null;
	private java.lang.Object _activeHandleEl = null;
	private java.lang.Object _activeHandleNode = null;
	private boolean _autoHide = false;
	private java.lang.Object _constrain = null;
	private java.lang.Object _defMinHeight = 15;
	private java.lang.Object _defMinWidth = 15;
	private boolean _destroyed = false;
	private java.lang.Object _handles = null;
	private boolean _initialized = false;
	private java.lang.Object _maxHeight = 2147483647;
	private java.lang.Object _maxWidth = 2147483647;
	private java.lang.Object _minHeight = 15;
	private java.lang.Object _minWidth = 15;
	private java.lang.Object _node = null;
	private boolean _preserveRatio = false;
	private boolean _proxy = false;
	private java.lang.String _proxyEl = null;
	private java.lang.String _proxyNode = null;
	private boolean _resizing = false;
	private java.lang.Object _tickX = null;
	private java.lang.Object _tickY = null;
	private boolean _wrap = false;
	private java.lang.Object _wrapTypes = null;
	private java.lang.String _wrapper = "div";
	private java.lang.Object _afterActiveHandleChange = null;
	private java.lang.Object _afterActiveHandleElChange = null;
	private java.lang.Object _afterActiveHandleNodeChange = null;
	private java.lang.Object _afterAutoHideChange = null;
	private java.lang.Object _afterConstrainChange = null;
	private java.lang.Object _afterDefMinHeightChange = null;
	private java.lang.Object _afterDefMinWidthChange = null;
	private java.lang.Object _afterDestroy = null;
	private java.lang.Object _afterDestroyedChange = null;
	private java.lang.Object _afterHandlesChange = null;
	private java.lang.Object _afterInit = null;
	private java.lang.Object _afterInitializedChange = null;
	private java.lang.Object _afterMaxHeightChange = null;
	private java.lang.Object _afterMaxWidthChange = null;
	private java.lang.Object _afterMinHeightChange = null;
	private java.lang.Object _afterMinWidthChange = null;
	private java.lang.Object _afterNodeChange = null;
	private java.lang.Object _afterPreserveRatioChange = null;
	private java.lang.Object _afterProxyChange = null;
	private java.lang.Object _afterProxyElChange = null;
	private java.lang.Object _afterProxyNodeChange = null;
	private java.lang.Object _afterAlign = null;
	private java.lang.Object _afterEnd = null;
	private java.lang.Object _afterMouseUp = null;
	private java.lang.Object _afterResize = null;
	private java.lang.Object _afterStart = null;
	private java.lang.Object _afterResizingChange = null;
	private java.lang.Object _afterTickXChange = null;
	private java.lang.Object _afterTickYChange = null;
	private java.lang.Object _afterWrapChange = null;
	private java.lang.Object _afterWrapTypesChange = null;
	private java.lang.Object _afterWrapperChange = null;
	private java.lang.Object _onActiveHandleChange = null;
	private java.lang.Object _onActiveHandleElChange = null;
	private java.lang.Object _onActiveHandleNodeChange = null;
	private java.lang.Object _onAutoHideChange = null;
	private java.lang.Object _onConstrainChange = null;
	private java.lang.Object _onDefMinHeightChange = null;
	private java.lang.Object _onDefMinWidthChange = null;
	private java.lang.Object _onDestroy = null;
	private java.lang.Object _onDestroyedChange = null;
	private java.lang.Object _onHandlesChange = null;
	private java.lang.Object _onInit = null;
	private java.lang.Object _onInitializedChange = null;
	private java.lang.Object _onMaxHeightChange = null;
	private java.lang.Object _onMaxWidthChange = null;
	private java.lang.Object _onMinHeightChange = null;
	private java.lang.Object _onMinWidthChange = null;
	private java.lang.Object _onNodeChange = null;
	private java.lang.Object _onPreserveRatioChange = null;
	private java.lang.Object _onProxyChange = null;
	private java.lang.Object _onProxyElChange = null;
	private java.lang.Object _onProxyNodeChange = null;
	private java.lang.Object _onAlign = null;
	private java.lang.Object _onEnd = null;
	private java.lang.Object _onMouseUp = null;
	private java.lang.Object _onResize = null;
	private java.lang.Object _onStart = null;
	private java.lang.Object _onResizingChange = null;
	private java.lang.Object _onTickXChange = null;
	private java.lang.Object _onTickYChange = null;
	private java.lang.Object _onWrapChange = null;
	private java.lang.Object _onWrapTypesChange = null;
	private java.lang.Object _onWrapperChange = null;

}