package com.liferay.alloy.taglib.alloy.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseLiveSearchTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseLiveSearchTag extends com.liferay.taglib.util.IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	public java.lang.Object getData() {
		return _data;
	}

	public java.lang.Object getDelay() {
		return _delay;
	}

	public java.lang.Boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.Object getHide() {
		return _hide;
	}

	public java.lang.Object getIndex() {
		return _index;
	}

	public java.lang.Boolean getInitialized() {
		return _initialized;
	}

	public java.lang.String getInput() {
		return _input;
	}

	public java.lang.Object getMatchRegex() {
		return _matchRegex;
	}

	public java.lang.Object getNodes() {
		return _nodes;
	}

	public java.lang.Object getShow() {
		return _show;
	}

	public java.lang.Object getAfterDataChange() {
		return _afterDataChange;
	}

	public java.lang.Object getAfterDelayChange() {
		return _afterDelayChange;
	}

	public java.lang.Object getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.Object getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.Object getAfterHideChange() {
		return _afterHideChange;
	}

	public java.lang.Object getAfterIndexChange() {
		return _afterIndexChange;
	}

	public java.lang.Object getAfterInit() {
		return _afterInit;
	}

	public java.lang.Object getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.Object getAfterInputChange() {
		return _afterInputChange;
	}

	public java.lang.Object getAfterMatchRegexChange() {
		return _afterMatchRegexChange;
	}

	public java.lang.Object getAfterNodesChange() {
		return _afterNodesChange;
	}

	public java.lang.Object getAfterShowChange() {
		return _afterShowChange;
	}

	public java.lang.Object getOnDataChange() {
		return _onDataChange;
	}

	public java.lang.Object getOnDelayChange() {
		return _onDelayChange;
	}

	public java.lang.Object getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.Object getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.Object getOnHideChange() {
		return _onHideChange;
	}

	public java.lang.Object getOnIndexChange() {
		return _onIndexChange;
	}

	public java.lang.Object getOnInit() {
		return _onInit;
	}

	public java.lang.Object getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.Object getOnInputChange() {
		return _onInputChange;
	}

	public java.lang.Object getOnMatchRegexChange() {
		return _onMatchRegexChange;
	}

	public java.lang.Object getOnNodesChange() {
		return _onNodesChange;
	}

	public java.lang.Object getOnShowChange() {
		return _onShowChange;
	}

	public void setData(java.lang.Object data) {
		_data = data;

		setScopedAttribute("data", data);
	}

	public void setDelay(java.lang.Object delay) {
		_delay = delay;

		setScopedAttribute("delay", delay);
	}

	public void setDestroyed(java.lang.Boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setHide(java.lang.Object hide) {
		_hide = hide;

		setScopedAttribute("hide", hide);
	}

	public void setIndex(java.lang.Object index) {
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

	public void setMatchRegex(java.lang.Object matchRegex) {
		_matchRegex = matchRegex;

		setScopedAttribute("matchRegex", matchRegex);
	}

	public void setNodes(java.lang.Object nodes) {
		_nodes = nodes;

		setScopedAttribute("nodes", nodes);
	}

	public void setShow(java.lang.Object show) {
		_show = show;

		setScopedAttribute("show", show);
	}

	public void setAfterDataChange(java.lang.Object afterDataChange) {
		_afterDataChange = afterDataChange;

		setScopedAttribute("afterDataChange", afterDataChange);
	}

	public void setAfterDelayChange(java.lang.Object afterDelayChange) {
		_afterDelayChange = afterDelayChange;

		setScopedAttribute("afterDelayChange", afterDelayChange);
	}

	public void setAfterDestroy(java.lang.Object afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.Object afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterHideChange(java.lang.Object afterHideChange) {
		_afterHideChange = afterHideChange;

		setScopedAttribute("afterHideChange", afterHideChange);
	}

	public void setAfterIndexChange(java.lang.Object afterIndexChange) {
		_afterIndexChange = afterIndexChange;

		setScopedAttribute("afterIndexChange", afterIndexChange);
	}

	public void setAfterInit(java.lang.Object afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.Object afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterInputChange(java.lang.Object afterInputChange) {
		_afterInputChange = afterInputChange;

		setScopedAttribute("afterInputChange", afterInputChange);
	}

	public void setAfterMatchRegexChange(java.lang.Object afterMatchRegexChange) {
		_afterMatchRegexChange = afterMatchRegexChange;

		setScopedAttribute("afterMatchRegexChange", afterMatchRegexChange);
	}

	public void setAfterNodesChange(java.lang.Object afterNodesChange) {
		_afterNodesChange = afterNodesChange;

		setScopedAttribute("afterNodesChange", afterNodesChange);
	}

	public void setAfterShowChange(java.lang.Object afterShowChange) {
		_afterShowChange = afterShowChange;

		setScopedAttribute("afterShowChange", afterShowChange);
	}

	public void setOnDataChange(java.lang.Object onDataChange) {
		_onDataChange = onDataChange;

		setScopedAttribute("onDataChange", onDataChange);
	}

	public void setOnDelayChange(java.lang.Object onDelayChange) {
		_onDelayChange = onDelayChange;

		setScopedAttribute("onDelayChange", onDelayChange);
	}

	public void setOnDestroy(java.lang.Object onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.Object onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnHideChange(java.lang.Object onHideChange) {
		_onHideChange = onHideChange;

		setScopedAttribute("onHideChange", onHideChange);
	}

	public void setOnIndexChange(java.lang.Object onIndexChange) {
		_onIndexChange = onIndexChange;

		setScopedAttribute("onIndexChange", onIndexChange);
	}

	public void setOnInit(java.lang.Object onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.Object onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnInputChange(java.lang.Object onInputChange) {
		_onInputChange = onInputChange;

		setScopedAttribute("onInputChange", onInputChange);
	}

	public void setOnMatchRegexChange(java.lang.Object onMatchRegexChange) {
		_onMatchRegexChange = onMatchRegexChange;

		setScopedAttribute("onMatchRegexChange", onMatchRegexChange);
	}

	public void setOnNodesChange(java.lang.Object onNodesChange) {
		_onNodesChange = onNodesChange;

		setScopedAttribute("onNodesChange", onNodesChange);
	}

	public void setOnShowChange(java.lang.Object onShowChange) {
		_onShowChange = onShowChange;

		setScopedAttribute("onShowChange", onShowChange);
	}


	protected void cleanUp() {
		_data = null;
		_delay = 250;
		_destroyed = false;
		_hide = null;
		_index = null;
		_initialized = false;
		_input = null;
		_matchRegex = null;
		_nodes = null;
		_show = null;
		_afterDataChange = null;
		_afterDelayChange = null;
		_afterDestroy = null;
		_afterDestroyedChange = null;
		_afterHideChange = null;
		_afterIndexChange = null;
		_afterInit = null;
		_afterInitializedChange = null;
		_afterInputChange = null;
		_afterMatchRegexChange = null;
		_afterNodesChange = null;
		_afterShowChange = null;
		_onDataChange = null;
		_onDelayChange = null;
		_onDestroy = null;
		_onDestroyedChange = null;
		_onHideChange = null;
		_onIndexChange = null;
		_onInit = null;
		_onInitializedChange = null;
		_onInputChange = null;
		_onMatchRegexChange = null;
		_onNodesChange = null;
		_onShowChange = null;
	}

	protected String getPage() {
		return _PAGE;
	}
	
	protected void setAttributes(HttpServletRequest request) {
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

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy:live-search:";

	private static final String _PAGE =
		"/html/taglib/alloy/live_search/page.jsp";

	protected java.lang.Object _data;
	protected java.lang.Object _delay;
	protected java.lang.Boolean _destroyed;
	protected java.lang.Object _hide;
	protected java.lang.Object _index;
	protected java.lang.Boolean _initialized;
	protected java.lang.String _input;
	protected java.lang.Object _matchRegex;
	protected java.lang.Object _nodes;
	protected java.lang.Object _show;
	protected java.lang.Object _afterDataChange;
	protected java.lang.Object _afterDelayChange;
	protected java.lang.Object _afterDestroy;
	protected java.lang.Object _afterDestroyedChange;
	protected java.lang.Object _afterHideChange;
	protected java.lang.Object _afterIndexChange;
	protected java.lang.Object _afterInit;
	protected java.lang.Object _afterInitializedChange;
	protected java.lang.Object _afterInputChange;
	protected java.lang.Object _afterMatchRegexChange;
	protected java.lang.Object _afterNodesChange;
	protected java.lang.Object _afterShowChange;
	protected java.lang.Object _onDataChange;
	protected java.lang.Object _onDelayChange;
	protected java.lang.Object _onDestroy;
	protected java.lang.Object _onDestroyedChange;
	protected java.lang.Object _onHideChange;
	protected java.lang.Object _onIndexChange;
	protected java.lang.Object _onInit;
	protected java.lang.Object _onInitializedChange;
	protected java.lang.Object _onInputChange;
	protected java.lang.Object _onMatchRegexChange;
	protected java.lang.Object _onNodesChange;
	protected java.lang.Object _onShowChange;

}
