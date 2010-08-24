package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseResizeTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseResizeTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.String getActiveHandle() {
		return _activeHandle;
	}

	public java.lang.String getActiveHandleEl() {
		return _activeHandleEl;
	}

	public java.lang.String getAutoHide() {
		return _autoHide;
	}

	public java.lang.String getConstrain() {
		return _constrain;
	}

	public java.lang.String getDestroyed() {
		return _destroyed;
	}

	public java.lang.String getHandles() {
		return _handles;
	}

	public java.lang.String getInitialized() {
		return _initialized;
	}

	public java.lang.String getMaxHeight() {
		return _maxHeight;
	}

	public java.lang.String getMaxWidth() {
		return _maxWidth;
	}

	public java.lang.String getMinHeight() {
		return _minHeight;
	}

	public java.lang.String getMinWidth() {
		return _minWidth;
	}

	public java.lang.String getNode() {
		return _node;
	}

	public java.lang.String getPreserveRatio() {
		return _preserveRatio;
	}

	public java.lang.String getProxy() {
		return _proxy;
	}

	public java.lang.String getProxyEl() {
		return _proxyEl;
	}

	public java.lang.String getResizing() {
		return _resizing;
	}

	public java.lang.String getTickX() {
		return _tickX;
	}

	public java.lang.String getTickY() {
		return _tickY;
	}

	public java.lang.String getWrap() {
		return _wrap;
	}

	public java.lang.String getWrapTypes() {
		return _wrapTypes;
	}

	public java.lang.String getWrapper() {
		return _wrapper;
	}

	public java.lang.String getAfterActiveHandleChange() {
		return _afterActiveHandleChange;
	}

	public java.lang.String getAfterActiveHandleElChange() {
		return _afterActiveHandleElChange;
	}

	public java.lang.String getAfterAutoHideChange() {
		return _afterAutoHideChange;
	}

	public java.lang.String getAfterConstrainChange() {
		return _afterConstrainChange;
	}

	public java.lang.String getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.String getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.String getAfterHandlesChange() {
		return _afterHandlesChange;
	}

	public java.lang.String getAfterInit() {
		return _afterInit;
	}

	public java.lang.String getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.String getAfterMaxHeightChange() {
		return _afterMaxHeightChange;
	}

	public java.lang.String getAfterMaxWidthChange() {
		return _afterMaxWidthChange;
	}

	public java.lang.String getAfterMinHeightChange() {
		return _afterMinHeightChange;
	}

	public java.lang.String getAfterMinWidthChange() {
		return _afterMinWidthChange;
	}

	public java.lang.String getAfterNodeChange() {
		return _afterNodeChange;
	}

	public java.lang.String getAfterPreserveRatioChange() {
		return _afterPreserveRatioChange;
	}

	public java.lang.String getAfterProxyChange() {
		return _afterProxyChange;
	}

	public java.lang.String getAfterProxyElChange() {
		return _afterProxyElChange;
	}

	public java.lang.String getAfterEnd() {
		return _afterEnd;
	}

	public java.lang.String getAfterMouseUp() {
		return _afterMouseUp;
	}

	public java.lang.String getAfterResize() {
		return _afterResize;
	}

	public java.lang.String getAfterStart() {
		return _afterStart;
	}

	public java.lang.String getAfterResizingChange() {
		return _afterResizingChange;
	}

	public java.lang.String getAfterTickXChange() {
		return _afterTickXChange;
	}

	public java.lang.String getAfterTickYChange() {
		return _afterTickYChange;
	}

	public java.lang.String getAfterWrapChange() {
		return _afterWrapChange;
	}

	public java.lang.String getAfterWrapTypesChange() {
		return _afterWrapTypesChange;
	}

	public java.lang.String getAfterWrapperChange() {
		return _afterWrapperChange;
	}

	public java.lang.String getOnActiveHandleChange() {
		return _onActiveHandleChange;
	}

	public java.lang.String getOnActiveHandleElChange() {
		return _onActiveHandleElChange;
	}

	public java.lang.String getOnAutoHideChange() {
		return _onAutoHideChange;
	}

	public java.lang.String getOnConstrainChange() {
		return _onConstrainChange;
	}

	public java.lang.String getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.String getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.String getOnHandlesChange() {
		return _onHandlesChange;
	}

	public java.lang.String getOnInit() {
		return _onInit;
	}

	public java.lang.String getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.String getOnMaxHeightChange() {
		return _onMaxHeightChange;
	}

	public java.lang.String getOnMaxWidthChange() {
		return _onMaxWidthChange;
	}

	public java.lang.String getOnMinHeightChange() {
		return _onMinHeightChange;
	}

	public java.lang.String getOnMinWidthChange() {
		return _onMinWidthChange;
	}

	public java.lang.String getOnNodeChange() {
		return _onNodeChange;
	}

	public java.lang.String getOnPreserveRatioChange() {
		return _onPreserveRatioChange;
	}

	public java.lang.String getOnProxyChange() {
		return _onProxyChange;
	}

	public java.lang.String getOnProxyElChange() {
		return _onProxyElChange;
	}

	public java.lang.String getOnEnd() {
		return _onEnd;
	}

	public java.lang.String getOnMouseUp() {
		return _onMouseUp;
	}

	public java.lang.String getOnResize() {
		return _onResize;
	}

	public java.lang.String getOnStart() {
		return _onStart;
	}

	public java.lang.String getOnResizingChange() {
		return _onResizingChange;
	}

	public java.lang.String getOnTickXChange() {
		return _onTickXChange;
	}

	public java.lang.String getOnTickYChange() {
		return _onTickYChange;
	}

	public java.lang.String getOnWrapChange() {
		return _onWrapChange;
	}

	public java.lang.String getOnWrapTypesChange() {
		return _onWrapTypesChange;
	}

	public java.lang.String getOnWrapperChange() {
		return _onWrapperChange;
	}

	public void setActiveHandle(java.lang.String activeHandle) {
		_activeHandle = activeHandle;

		setScopedAttribute("activeHandle", activeHandle);
	}

	public void setActiveHandleEl(java.lang.String activeHandleEl) {
		_activeHandleEl = activeHandleEl;

		setScopedAttribute("activeHandleEl", activeHandleEl);
	}

	public void setAutoHide(java.lang.String autoHide) {
		_autoHide = autoHide;

		setScopedAttribute("autoHide", autoHide);
	}

	public void setConstrain(java.lang.String constrain) {
		_constrain = constrain;

		setScopedAttribute("constrain", constrain);
	}

	public void setDestroyed(java.lang.String destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setHandles(java.lang.String handles) {
		_handles = handles;

		setScopedAttribute("handles", handles);
	}

	public void setInitialized(java.lang.String initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setMaxHeight(java.lang.String maxHeight) {
		_maxHeight = maxHeight;

		setScopedAttribute("maxHeight", maxHeight);
	}

	public void setMaxWidth(java.lang.String maxWidth) {
		_maxWidth = maxWidth;

		setScopedAttribute("maxWidth", maxWidth);
	}

	public void setMinHeight(java.lang.String minHeight) {
		_minHeight = minHeight;

		setScopedAttribute("minHeight", minHeight);
	}

	public void setMinWidth(java.lang.String minWidth) {
		_minWidth = minWidth;

		setScopedAttribute("minWidth", minWidth);
	}

	public void setNode(java.lang.String node) {
		_node = node;

		setScopedAttribute("node", node);
	}

	public void setPreserveRatio(java.lang.String preserveRatio) {
		_preserveRatio = preserveRatio;

		setScopedAttribute("preserveRatio", preserveRatio);
	}

	public void setProxy(java.lang.String proxy) {
		_proxy = proxy;

		setScopedAttribute("proxy", proxy);
	}

	public void setProxyEl(java.lang.String proxyEl) {
		_proxyEl = proxyEl;

		setScopedAttribute("proxyEl", proxyEl);
	}

	public void setResizing(java.lang.String resizing) {
		_resizing = resizing;

		setScopedAttribute("resizing", resizing);
	}

	public void setTickX(java.lang.String tickX) {
		_tickX = tickX;

		setScopedAttribute("tickX", tickX);
	}

	public void setTickY(java.lang.String tickY) {
		_tickY = tickY;

		setScopedAttribute("tickY", tickY);
	}

	public void setWrap(java.lang.String wrap) {
		_wrap = wrap;

		setScopedAttribute("wrap", wrap);
	}

	public void setWrapTypes(java.lang.String wrapTypes) {
		_wrapTypes = wrapTypes;

		setScopedAttribute("wrapTypes", wrapTypes);
	}

	public void setWrapper(java.lang.String wrapper) {
		_wrapper = wrapper;

		setScopedAttribute("wrapper", wrapper);
	}

	public void setAfterActiveHandleChange(java.lang.String afterActiveHandleChange) {
		_afterActiveHandleChange = afterActiveHandleChange;

		setScopedAttribute("afterActiveHandleChange", afterActiveHandleChange);
	}

	public void setAfterActiveHandleElChange(java.lang.String afterActiveHandleElChange) {
		_afterActiveHandleElChange = afterActiveHandleElChange;

		setScopedAttribute("afterActiveHandleElChange", afterActiveHandleElChange);
	}

	public void setAfterAutoHideChange(java.lang.String afterAutoHideChange) {
		_afterAutoHideChange = afterAutoHideChange;

		setScopedAttribute("afterAutoHideChange", afterAutoHideChange);
	}

	public void setAfterConstrainChange(java.lang.String afterConstrainChange) {
		_afterConstrainChange = afterConstrainChange;

		setScopedAttribute("afterConstrainChange", afterConstrainChange);
	}

	public void setAfterDestroy(java.lang.String afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.String afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterHandlesChange(java.lang.String afterHandlesChange) {
		_afterHandlesChange = afterHandlesChange;

		setScopedAttribute("afterHandlesChange", afterHandlesChange);
	}

	public void setAfterInit(java.lang.String afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.String afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterMaxHeightChange(java.lang.String afterMaxHeightChange) {
		_afterMaxHeightChange = afterMaxHeightChange;

		setScopedAttribute("afterMaxHeightChange", afterMaxHeightChange);
	}

	public void setAfterMaxWidthChange(java.lang.String afterMaxWidthChange) {
		_afterMaxWidthChange = afterMaxWidthChange;

		setScopedAttribute("afterMaxWidthChange", afterMaxWidthChange);
	}

	public void setAfterMinHeightChange(java.lang.String afterMinHeightChange) {
		_afterMinHeightChange = afterMinHeightChange;

		setScopedAttribute("afterMinHeightChange", afterMinHeightChange);
	}

	public void setAfterMinWidthChange(java.lang.String afterMinWidthChange) {
		_afterMinWidthChange = afterMinWidthChange;

		setScopedAttribute("afterMinWidthChange", afterMinWidthChange);
	}

	public void setAfterNodeChange(java.lang.String afterNodeChange) {
		_afterNodeChange = afterNodeChange;

		setScopedAttribute("afterNodeChange", afterNodeChange);
	}

	public void setAfterPreserveRatioChange(java.lang.String afterPreserveRatioChange) {
		_afterPreserveRatioChange = afterPreserveRatioChange;

		setScopedAttribute("afterPreserveRatioChange", afterPreserveRatioChange);
	}

	public void setAfterProxyChange(java.lang.String afterProxyChange) {
		_afterProxyChange = afterProxyChange;

		setScopedAttribute("afterProxyChange", afterProxyChange);
	}

	public void setAfterProxyElChange(java.lang.String afterProxyElChange) {
		_afterProxyElChange = afterProxyElChange;

		setScopedAttribute("afterProxyElChange", afterProxyElChange);
	}

	public void setAfterEnd(java.lang.String afterEnd) {
		_afterEnd = afterEnd;

		setScopedAttribute("afterEnd", afterEnd);
	}

	public void setAfterMouseUp(java.lang.String afterMouseUp) {
		_afterMouseUp = afterMouseUp;

		setScopedAttribute("afterMouseUp", afterMouseUp);
	}

	public void setAfterResize(java.lang.String afterResize) {
		_afterResize = afterResize;

		setScopedAttribute("afterResize", afterResize);
	}

	public void setAfterStart(java.lang.String afterStart) {
		_afterStart = afterStart;

		setScopedAttribute("afterStart", afterStart);
	}

	public void setAfterResizingChange(java.lang.String afterResizingChange) {
		_afterResizingChange = afterResizingChange;

		setScopedAttribute("afterResizingChange", afterResizingChange);
	}

	public void setAfterTickXChange(java.lang.String afterTickXChange) {
		_afterTickXChange = afterTickXChange;

		setScopedAttribute("afterTickXChange", afterTickXChange);
	}

	public void setAfterTickYChange(java.lang.String afterTickYChange) {
		_afterTickYChange = afterTickYChange;

		setScopedAttribute("afterTickYChange", afterTickYChange);
	}

	public void setAfterWrapChange(java.lang.String afterWrapChange) {
		_afterWrapChange = afterWrapChange;

		setScopedAttribute("afterWrapChange", afterWrapChange);
	}

	public void setAfterWrapTypesChange(java.lang.String afterWrapTypesChange) {
		_afterWrapTypesChange = afterWrapTypesChange;

		setScopedAttribute("afterWrapTypesChange", afterWrapTypesChange);
	}

	public void setAfterWrapperChange(java.lang.String afterWrapperChange) {
		_afterWrapperChange = afterWrapperChange;

		setScopedAttribute("afterWrapperChange", afterWrapperChange);
	}

	public void setOnActiveHandleChange(java.lang.String onActiveHandleChange) {
		_onActiveHandleChange = onActiveHandleChange;

		setScopedAttribute("onActiveHandleChange", onActiveHandleChange);
	}

	public void setOnActiveHandleElChange(java.lang.String onActiveHandleElChange) {
		_onActiveHandleElChange = onActiveHandleElChange;

		setScopedAttribute("onActiveHandleElChange", onActiveHandleElChange);
	}

	public void setOnAutoHideChange(java.lang.String onAutoHideChange) {
		_onAutoHideChange = onAutoHideChange;

		setScopedAttribute("onAutoHideChange", onAutoHideChange);
	}

	public void setOnConstrainChange(java.lang.String onConstrainChange) {
		_onConstrainChange = onConstrainChange;

		setScopedAttribute("onConstrainChange", onConstrainChange);
	}

	public void setOnDestroy(java.lang.String onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.String onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnHandlesChange(java.lang.String onHandlesChange) {
		_onHandlesChange = onHandlesChange;

		setScopedAttribute("onHandlesChange", onHandlesChange);
	}

	public void setOnInit(java.lang.String onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.String onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnMaxHeightChange(java.lang.String onMaxHeightChange) {
		_onMaxHeightChange = onMaxHeightChange;

		setScopedAttribute("onMaxHeightChange", onMaxHeightChange);
	}

	public void setOnMaxWidthChange(java.lang.String onMaxWidthChange) {
		_onMaxWidthChange = onMaxWidthChange;

		setScopedAttribute("onMaxWidthChange", onMaxWidthChange);
	}

	public void setOnMinHeightChange(java.lang.String onMinHeightChange) {
		_onMinHeightChange = onMinHeightChange;

		setScopedAttribute("onMinHeightChange", onMinHeightChange);
	}

	public void setOnMinWidthChange(java.lang.String onMinWidthChange) {
		_onMinWidthChange = onMinWidthChange;

		setScopedAttribute("onMinWidthChange", onMinWidthChange);
	}

	public void setOnNodeChange(java.lang.String onNodeChange) {
		_onNodeChange = onNodeChange;

		setScopedAttribute("onNodeChange", onNodeChange);
	}

	public void setOnPreserveRatioChange(java.lang.String onPreserveRatioChange) {
		_onPreserveRatioChange = onPreserveRatioChange;

		setScopedAttribute("onPreserveRatioChange", onPreserveRatioChange);
	}

	public void setOnProxyChange(java.lang.String onProxyChange) {
		_onProxyChange = onProxyChange;

		setScopedAttribute("onProxyChange", onProxyChange);
	}

	public void setOnProxyElChange(java.lang.String onProxyElChange) {
		_onProxyElChange = onProxyElChange;

		setScopedAttribute("onProxyElChange", onProxyElChange);
	}

	public void setOnEnd(java.lang.String onEnd) {
		_onEnd = onEnd;

		setScopedAttribute("onEnd", onEnd);
	}

	public void setOnMouseUp(java.lang.String onMouseUp) {
		_onMouseUp = onMouseUp;

		setScopedAttribute("onMouseUp", onMouseUp);
	}

	public void setOnResize(java.lang.String onResize) {
		_onResize = onResize;

		setScopedAttribute("onResize", onResize);
	}

	public void setOnStart(java.lang.String onStart) {
		_onStart = onStart;

		setScopedAttribute("onStart", onStart);
	}

	public void setOnResizingChange(java.lang.String onResizingChange) {
		_onResizingChange = onResizingChange;

		setScopedAttribute("onResizingChange", onResizingChange);
	}

	public void setOnTickXChange(java.lang.String onTickXChange) {
		_onTickXChange = onTickXChange;

		setScopedAttribute("onTickXChange", onTickXChange);
	}

	public void setOnTickYChange(java.lang.String onTickYChange) {
		_onTickYChange = onTickYChange;

		setScopedAttribute("onTickYChange", onTickYChange);
	}

	public void setOnWrapChange(java.lang.String onWrapChange) {
		_onWrapChange = onWrapChange;

		setScopedAttribute("onWrapChange", onWrapChange);
	}

	public void setOnWrapTypesChange(java.lang.String onWrapTypesChange) {
		_onWrapTypesChange = onWrapTypesChange;

		setScopedAttribute("onWrapTypesChange", onWrapTypesChange);
	}

	public void setOnWrapperChange(java.lang.String onWrapperChange) {
		_onWrapperChange = onWrapperChange;

		setScopedAttribute("onWrapperChange", onWrapperChange);
	}

	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "activeHandle", _activeHandle);
		setNamespacedAttribute(request, "activeHandleEl", _activeHandleEl);
		setNamespacedAttribute(request, "autoHide", _autoHide);
		setNamespacedAttribute(request, "constrain", _constrain);
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
		setNamespacedAttribute(request, "resizing", _resizing);
		setNamespacedAttribute(request, "tickX", _tickX);
		setNamespacedAttribute(request, "tickY", _tickY);
		setNamespacedAttribute(request, "wrap", _wrap);
		setNamespacedAttribute(request, "wrapTypes", _wrapTypes);
		setNamespacedAttribute(request, "wrapper", _wrapper);
		setNamespacedAttribute(request, "afterActiveHandleChange", _afterActiveHandleChange);
		setNamespacedAttribute(request, "afterActiveHandleElChange", _afterActiveHandleElChange);
		setNamespacedAttribute(request, "afterAutoHideChange", _afterAutoHideChange);
		setNamespacedAttribute(request, "afterConstrainChange", _afterConstrainChange);
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
		setNamespacedAttribute(request, "onAutoHideChange", _onAutoHideChange);
		setNamespacedAttribute(request, "onConstrainChange", _onConstrainChange);
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

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:resize:";

	private static final String _PAGE =
		"/html/taglib/alloy/resize/page.jsp";

	private java.lang.String _activeHandle;
	private java.lang.String _activeHandleEl;
	private java.lang.String _autoHide;
	private java.lang.String _constrain;
	private java.lang.String _destroyed;
	private java.lang.String _handles;
	private java.lang.String _initialized;
	private java.lang.String _maxHeight;
	private java.lang.String _maxWidth;
	private java.lang.String _minHeight;
	private java.lang.String _minWidth;
	private java.lang.String _node;
	private java.lang.String _preserveRatio;
	private java.lang.String _proxy;
	private java.lang.String _proxyEl;
	private java.lang.String _resizing;
	private java.lang.String _tickX;
	private java.lang.String _tickY;
	private java.lang.String _wrap;
	private java.lang.String _wrapTypes;
	private java.lang.String _wrapper;
	private java.lang.String _afterActiveHandleChange;
	private java.lang.String _afterActiveHandleElChange;
	private java.lang.String _afterAutoHideChange;
	private java.lang.String _afterConstrainChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterHandlesChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterMaxHeightChange;
	private java.lang.String _afterMaxWidthChange;
	private java.lang.String _afterMinHeightChange;
	private java.lang.String _afterMinWidthChange;
	private java.lang.String _afterNodeChange;
	private java.lang.String _afterPreserveRatioChange;
	private java.lang.String _afterProxyChange;
	private java.lang.String _afterProxyElChange;
	private java.lang.String _afterEnd;
	private java.lang.String _afterMouseUp;
	private java.lang.String _afterResize;
	private java.lang.String _afterStart;
	private java.lang.String _afterResizingChange;
	private java.lang.String _afterTickXChange;
	private java.lang.String _afterTickYChange;
	private java.lang.String _afterWrapChange;
	private java.lang.String _afterWrapTypesChange;
	private java.lang.String _afterWrapperChange;
	private java.lang.String _onActiveHandleChange;
	private java.lang.String _onActiveHandleElChange;
	private java.lang.String _onAutoHideChange;
	private java.lang.String _onConstrainChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onHandlesChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onMaxHeightChange;
	private java.lang.String _onMaxWidthChange;
	private java.lang.String _onMinHeightChange;
	private java.lang.String _onMinWidthChange;
	private java.lang.String _onNodeChange;
	private java.lang.String _onPreserveRatioChange;
	private java.lang.String _onProxyChange;
	private java.lang.String _onProxyElChange;
	private java.lang.String _onEnd;
	private java.lang.String _onMouseUp;
	private java.lang.String _onResize;
	private java.lang.String _onStart;
	private java.lang.String _onResizingChange;
	private java.lang.String _onTickXChange;
	private java.lang.String _onTickYChange;
	private java.lang.String _onWrapChange;
	private java.lang.String _onWrapTypesChange;
	private java.lang.String _onWrapperChange;

}
