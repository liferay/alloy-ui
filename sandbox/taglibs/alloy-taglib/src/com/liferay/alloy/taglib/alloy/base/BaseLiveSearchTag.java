package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseLiveSearchTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseLiveSearchTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.String getData() {
		return _data;
	}

	public java.lang.Number getDelay() {
		return _delay;
	}

	public java.lang.Boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.String getHide() {
		return _hide;
	}

	public java.lang.String getIndex() {
		return _index;
	}

	public java.lang.Boolean getInitialized() {
		return _initialized;
	}

	public java.lang.String getInput() {
		return _input;
	}

	public java.lang.String getMatchRegex() {
		return _matchRegex;
	}

	public java.lang.String getNodes() {
		return _nodes;
	}

	public java.lang.String getShow() {
		return _show;
	}

	public java.lang.String getAfterDataChange() {
		return _afterDataChange;
	}

	public java.lang.String getAfterDelayChange() {
		return _afterDelayChange;
	}

	public java.lang.String getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.String getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.String getAfterHideChange() {
		return _afterHideChange;
	}

	public java.lang.String getAfterIndexChange() {
		return _afterIndexChange;
	}

	public java.lang.String getAfterInit() {
		return _afterInit;
	}

	public java.lang.String getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.String getAfterInputChange() {
		return _afterInputChange;
	}

	public java.lang.String getAfterMatchRegexChange() {
		return _afterMatchRegexChange;
	}

	public java.lang.String getAfterNodesChange() {
		return _afterNodesChange;
	}

	public java.lang.String getAfterShowChange() {
		return _afterShowChange;
	}

	public java.lang.String getOnDataChange() {
		return _onDataChange;
	}

	public java.lang.String getOnDelayChange() {
		return _onDelayChange;
	}

	public java.lang.String getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.String getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.String getOnHideChange() {
		return _onHideChange;
	}

	public java.lang.String getOnIndexChange() {
		return _onIndexChange;
	}

	public java.lang.String getOnInit() {
		return _onInit;
	}

	public java.lang.String getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.String getOnInputChange() {
		return _onInputChange;
	}

	public java.lang.String getOnMatchRegexChange() {
		return _onMatchRegexChange;
	}

	public java.lang.String getOnNodesChange() {
		return _onNodesChange;
	}

	public java.lang.String getOnShowChange() {
		return _onShowChange;
	}

	public void setData(java.lang.String data) {
		_data = data;

		setScopedAttribute("data", data);
	}

	public void setDelay(java.lang.Number delay) {
		_delay = delay;

		setScopedAttribute("delay", delay);
	}

	public void setDestroyed(java.lang.Boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setHide(java.lang.String hide) {
		_hide = hide;

		setScopedAttribute("hide", hide);
	}

	public void setIndex(java.lang.String index) {
		_index = index;

		setScopedAttribute("index", index);
	}

	public void setInitialized(java.lang.Boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setInput(java.lang.String input) {
		_input = input;

		setScopedAttribute("input", input);
	}

	public void setMatchRegex(java.lang.String matchRegex) {
		_matchRegex = matchRegex;

		setScopedAttribute("matchRegex", matchRegex);
	}

	public void setNodes(java.lang.String nodes) {
		_nodes = nodes;

		setScopedAttribute("nodes", nodes);
	}

	public void setShow(java.lang.String show) {
		_show = show;

		setScopedAttribute("show", show);
	}

	public void setAfterDataChange(java.lang.String afterDataChange) {
		_afterDataChange = afterDataChange;

		setScopedAttribute("afterDataChange", afterDataChange);
	}

	public void setAfterDelayChange(java.lang.String afterDelayChange) {
		_afterDelayChange = afterDelayChange;

		setScopedAttribute("afterDelayChange", afterDelayChange);
	}

	public void setAfterDestroy(java.lang.String afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.String afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterHideChange(java.lang.String afterHideChange) {
		_afterHideChange = afterHideChange;

		setScopedAttribute("afterHideChange", afterHideChange);
	}

	public void setAfterIndexChange(java.lang.String afterIndexChange) {
		_afterIndexChange = afterIndexChange;

		setScopedAttribute("afterIndexChange", afterIndexChange);
	}

	public void setAfterInit(java.lang.String afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.String afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterInputChange(java.lang.String afterInputChange) {
		_afterInputChange = afterInputChange;

		setScopedAttribute("afterInputChange", afterInputChange);
	}

	public void setAfterMatchRegexChange(java.lang.String afterMatchRegexChange) {
		_afterMatchRegexChange = afterMatchRegexChange;

		setScopedAttribute("afterMatchRegexChange", afterMatchRegexChange);
	}

	public void setAfterNodesChange(java.lang.String afterNodesChange) {
		_afterNodesChange = afterNodesChange;

		setScopedAttribute("afterNodesChange", afterNodesChange);
	}

	public void setAfterShowChange(java.lang.String afterShowChange) {
		_afterShowChange = afterShowChange;

		setScopedAttribute("afterShowChange", afterShowChange);
	}

	public void setOnDataChange(java.lang.String onDataChange) {
		_onDataChange = onDataChange;

		setScopedAttribute("onDataChange", onDataChange);
	}

	public void setOnDelayChange(java.lang.String onDelayChange) {
		_onDelayChange = onDelayChange;

		setScopedAttribute("onDelayChange", onDelayChange);
	}

	public void setOnDestroy(java.lang.String onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.String onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnHideChange(java.lang.String onHideChange) {
		_onHideChange = onHideChange;

		setScopedAttribute("onHideChange", onHideChange);
	}

	public void setOnIndexChange(java.lang.String onIndexChange) {
		_onIndexChange = onIndexChange;

		setScopedAttribute("onIndexChange", onIndexChange);
	}

	public void setOnInit(java.lang.String onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.String onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnInputChange(java.lang.String onInputChange) {
		_onInputChange = onInputChange;

		setScopedAttribute("onInputChange", onInputChange);
	}

	public void setOnMatchRegexChange(java.lang.String onMatchRegexChange) {
		_onMatchRegexChange = onMatchRegexChange;

		setScopedAttribute("onMatchRegexChange", onMatchRegexChange);
	}

	public void setOnNodesChange(java.lang.String onNodesChange) {
		_onNodesChange = onNodesChange;

		setScopedAttribute("onNodesChange", onNodesChange);
	}

	public void setOnShowChange(java.lang.String onShowChange) {
		_onShowChange = onShowChange;

		setScopedAttribute("onShowChange", onShowChange);
	}


	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "data", _data);
		setNamespacedAttribute(request, "delay", _delay);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "hide", _hide);
		setNamespacedAttribute(request, "index", _index);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "input", _input);
		setNamespacedAttribute(request, "matchRegex", _matchRegex);
		setNamespacedAttribute(request, "nodes", _nodes);
		setNamespacedAttribute(request, "show", _show);
		setNamespacedAttribute(request, "afterDataChange", _afterDataChange);
		setNamespacedAttribute(request, "afterDelayChange", _afterDelayChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterHideChange", _afterHideChange);
		setNamespacedAttribute(request, "afterIndexChange", _afterIndexChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterInputChange", _afterInputChange);
		setNamespacedAttribute(request, "afterMatchRegexChange", _afterMatchRegexChange);
		setNamespacedAttribute(request, "afterNodesChange", _afterNodesChange);
		setNamespacedAttribute(request, "afterShowChange", _afterShowChange);
		setNamespacedAttribute(request, "onDataChange", _onDataChange);
		setNamespacedAttribute(request, "onDelayChange", _onDelayChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onHideChange", _onHideChange);
		setNamespacedAttribute(request, "onIndexChange", _onIndexChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onInputChange", _onInputChange);
		setNamespacedAttribute(request, "onMatchRegexChange", _onMatchRegexChange);
		setNamespacedAttribute(request, "onNodesChange", _onNodesChange);
		setNamespacedAttribute(request, "onShowChange", _onShowChange);
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:live-search:";

	private static final String _PAGE =
		"/html/taglib/alloy/live_search/page.jsp";

	private java.lang.String _data;
	private java.lang.Number _delay;
	private java.lang.Boolean _destroyed;
	private java.lang.String _hide;
	private java.lang.String _index;
	private java.lang.Boolean _initialized;
	private java.lang.String _input;
	private java.lang.String _matchRegex;
	private java.lang.String _nodes;
	private java.lang.String _show;
	private java.lang.String _afterDataChange;
	private java.lang.String _afterDelayChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterHideChange;
	private java.lang.String _afterIndexChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterInputChange;
	private java.lang.String _afterMatchRegexChange;
	private java.lang.String _afterNodesChange;
	private java.lang.String _afterShowChange;
	private java.lang.String _onDataChange;
	private java.lang.String _onDelayChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onHideChange;
	private java.lang.String _onIndexChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onInputChange;
	private java.lang.String _onMatchRegexChange;
	private java.lang.String _onNodesChange;
	private java.lang.String _onShowChange;

}
