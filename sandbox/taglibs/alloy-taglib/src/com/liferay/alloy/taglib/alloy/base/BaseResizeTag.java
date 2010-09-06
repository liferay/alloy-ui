package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.alloy_util.IncludeTag;

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

	public java.lang.Object getActiveHandleEl() {
		return _activeHandleEl;
	}

	public java.lang.Boolean getAutoHide() {
		return _autoHide;
	}

	public java.lang.Object getConstrain() {
		return _constrain;
	}

	public java.lang.Boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.Object getHandles() {
		return _handles;
	}

	public java.lang.Boolean getInitialized() {
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

	public java.lang.Boolean getPreserveRatio() {
		return _preserveRatio;
	}

	public java.lang.Boolean getProxy() {
		return _proxy;
	}

	public java.lang.String getProxyEl() {
		return _proxyEl;
	}

	public java.lang.Boolean getResizing() {
		return _resizing;
	}

	public java.lang.Object getTickX() {
		return _tickX;
	}

	public java.lang.Object getTickY() {
		return _tickY;
	}

	public java.lang.Boolean getWrap() {
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

	public java.lang.Object getAfterAutoHideChange() {
		return _afterAutoHideChange;
	}

	public java.lang.Object getAfterConstrainChange() {
		return _afterConstrainChange;
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

	public java.lang.Object getOnAutoHideChange() {
		return _onAutoHideChange;
	}

	public java.lang.Object getOnConstrainChange() {
		return _onConstrainChange;
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

	public void setAutoHide(java.lang.Boolean autoHide) {
		_autoHide = autoHide;

		setScopedAttribute("autoHide", autoHide);
	}

	public void setConstrain(java.lang.Object constrain) {
		_constrain = constrain;

		setScopedAttribute("constrain", constrain);
	}

	public void setDestroyed(java.lang.Boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setHandles(java.lang.Object handles) {
		_handles = handles;

		setScopedAttribute("handles", handles);
	}

	public void setInitialized(java.lang.Boolean initialized) {
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

	public void setPreserveRatio(java.lang.Boolean preserveRatio) {
		_preserveRatio = preserveRatio;

		setScopedAttribute("preserveRatio", preserveRatio);
	}

	public void setProxy(java.lang.Boolean proxy) {
		_proxy = proxy;

		setScopedAttribute("proxy", proxy);
	}

	public void setProxyEl(java.lang.String proxyEl) {
		_proxyEl = proxyEl;

		setScopedAttribute("proxyEl", proxyEl);
	}

	public void setResizing(java.lang.Boolean resizing) {
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

	public void setWrap(java.lang.Boolean wrap) {
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

	public void setAfterAutoHideChange(java.lang.Object afterAutoHideChange) {
		_afterAutoHideChange = afterAutoHideChange;

		setScopedAttribute("afterAutoHideChange", afterAutoHideChange);
	}

	public void setAfterConstrainChange(java.lang.Object afterConstrainChange) {
		_afterConstrainChange = afterConstrainChange;

		setScopedAttribute("afterConstrainChange", afterConstrainChange);
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

	public void setOnAutoHideChange(java.lang.Object onAutoHideChange) {
		_onAutoHideChange = onAutoHideChange;

		setScopedAttribute("onAutoHideChange", onAutoHideChange);
	}

	public void setOnConstrainChange(java.lang.Object onConstrainChange) {
		_onConstrainChange = onConstrainChange;

		setScopedAttribute("onConstrainChange", onConstrainChange);
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

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:resize:";

	private static final String _PAGE =
		"/html/taglib/alloy/resize/page.jsp";

	private java.lang.String _activeHandle;
	private java.lang.Object _activeHandleEl;
	private java.lang.Boolean _autoHide;
	private java.lang.Object _constrain;
	private java.lang.Boolean _destroyed;
	private java.lang.Object _handles;
	private java.lang.Boolean _initialized;
	private java.lang.Object _maxHeight;
	private java.lang.Object _maxWidth;
	private java.lang.Object _minHeight;
	private java.lang.Object _minWidth;
	private java.lang.Object _node;
	private java.lang.Boolean _preserveRatio;
	private java.lang.Boolean _proxy;
	private java.lang.String _proxyEl;
	private java.lang.Boolean _resizing;
	private java.lang.Object _tickX;
	private java.lang.Object _tickY;
	private java.lang.Boolean _wrap;
	private java.lang.Object _wrapTypes;
	private java.lang.String _wrapper;
	private java.lang.Object _afterActiveHandleChange;
	private java.lang.Object _afterActiveHandleElChange;
	private java.lang.Object _afterAutoHideChange;
	private java.lang.Object _afterConstrainChange;
	private java.lang.Object _afterDestroy;
	private java.lang.Object _afterDestroyedChange;
	private java.lang.Object _afterHandlesChange;
	private java.lang.Object _afterInit;
	private java.lang.Object _afterInitializedChange;
	private java.lang.Object _afterMaxHeightChange;
	private java.lang.Object _afterMaxWidthChange;
	private java.lang.Object _afterMinHeightChange;
	private java.lang.Object _afterMinWidthChange;
	private java.lang.Object _afterNodeChange;
	private java.lang.Object _afterPreserveRatioChange;
	private java.lang.Object _afterProxyChange;
	private java.lang.Object _afterProxyElChange;
	private java.lang.Object _afterAlign;
	private java.lang.Object _afterEnd;
	private java.lang.Object _afterMouseUp;
	private java.lang.Object _afterResize;
	private java.lang.Object _afterStart;
	private java.lang.Object _afterResizingChange;
	private java.lang.Object _afterTickXChange;
	private java.lang.Object _afterTickYChange;
	private java.lang.Object _afterWrapChange;
	private java.lang.Object _afterWrapTypesChange;
	private java.lang.Object _afterWrapperChange;
	private java.lang.Object _onActiveHandleChange;
	private java.lang.Object _onActiveHandleElChange;
	private java.lang.Object _onAutoHideChange;
	private java.lang.Object _onConstrainChange;
	private java.lang.Object _onDestroy;
	private java.lang.Object _onDestroyedChange;
	private java.lang.Object _onHandlesChange;
	private java.lang.Object _onInit;
	private java.lang.Object _onInitializedChange;
	private java.lang.Object _onMaxHeightChange;
	private java.lang.Object _onMaxWidthChange;
	private java.lang.Object _onMinHeightChange;
	private java.lang.Object _onMinWidthChange;
	private java.lang.Object _onNodeChange;
	private java.lang.Object _onPreserveRatioChange;
	private java.lang.Object _onProxyChange;
	private java.lang.Object _onProxyElChange;
	private java.lang.Object _onAlign;
	private java.lang.Object _onEnd;
	private java.lang.Object _onMouseUp;
	private java.lang.Object _onResize;
	private java.lang.Object _onStart;
	private java.lang.Object _onResizingChange;
	private java.lang.Object _onTickXChange;
	private java.lang.Object _onTickYChange;
	private java.lang.Object _onWrapChange;
	private java.lang.Object _onWrapTypesChange;
	private java.lang.Object _onWrapperChange;

}
