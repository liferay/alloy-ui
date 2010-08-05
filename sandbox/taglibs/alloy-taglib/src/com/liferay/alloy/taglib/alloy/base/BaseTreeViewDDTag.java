package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseTreeViewDDTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseTreeViewDDTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.String getCheckContainerEl() {
		return _checkContainerEl;
	}

	public java.lang.String getCheckEl() {
		return _checkEl;
	}

	public java.lang.String getCheckName() {
		return _checkName;
	}

	public java.lang.Boolean getChecked() {
		return _checked;
	}

	public java.lang.String getChildren() {
		return _children;
	}

	public java.lang.String getContainer() {
		return _container;
	}

	public java.lang.Boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.String getDropAction() {
		return _dropAction;
	}

	public java.lang.String getHelper() {
		return _helper;
	}

	public java.lang.Object getIndex() {
		return _index;
	}

	public java.lang.Boolean getInitialized() {
		return _initialized;
	}

	public java.lang.Object getIo() {
		return _io;
	}

	public java.lang.String getLastSelected() {
		return _lastSelected;
	}

	public java.lang.Number getLastY() {
		return _lastY;
	}

	public java.lang.String getNodeContent() {
		return _nodeContent;
	}

	public java.lang.Number getScrollDelay() {
		return _scrollDelay;
	}

	public java.lang.String getType() {
		return _type;
	}

	public java.lang.String getAfterCheckContainerElChange() {
		return _afterCheckContainerElChange;
	}

	public java.lang.String getAfterCheckElChange() {
		return _afterCheckElChange;
	}

	public java.lang.String getAfterCheckNameChange() {
		return _afterCheckNameChange;
	}

	public java.lang.String getAfterCheckedChange() {
		return _afterCheckedChange;
	}

	public java.lang.String getAfterChildrenChange() {
		return _afterChildrenChange;
	}

	public java.lang.String getAfterContainerChange() {
		return _afterContainerChange;
	}

	public java.lang.String getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.String getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.String getAfterDropActionChange() {
		return _afterDropActionChange;
	}

	public java.lang.String getAfterHelperChange() {
		return _afterHelperChange;
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

	public java.lang.String getAfterIoChange() {
		return _afterIoChange;
	}

	public java.lang.String getAfterLastSelectedChange() {
		return _afterLastSelectedChange;
	}

	public java.lang.String getAfterLastYChange() {
		return _afterLastYChange;
	}

	public java.lang.String getAfterNodeContentChange() {
		return _afterNodeContentChange;
	}

	public java.lang.String getAfterScrollDelayChange() {
		return _afterScrollDelayChange;
	}

	public java.lang.String getAfterTypeChange() {
		return _afterTypeChange;
	}

	public java.lang.String getOnCheckContainerElChange() {
		return _onCheckContainerElChange;
	}

	public java.lang.String getOnCheckElChange() {
		return _onCheckElChange;
	}

	public java.lang.String getOnCheckNameChange() {
		return _onCheckNameChange;
	}

	public java.lang.String getOnCheckedChange() {
		return _onCheckedChange;
	}

	public java.lang.String getOnChildrenChange() {
		return _onChildrenChange;
	}

	public java.lang.String getOnContainerChange() {
		return _onContainerChange;
	}

	public java.lang.String getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.String getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.String getOnDropActionChange() {
		return _onDropActionChange;
	}

	public java.lang.String getOnHelperChange() {
		return _onHelperChange;
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

	public java.lang.String getOnIoChange() {
		return _onIoChange;
	}

	public java.lang.String getOnLastSelectedChange() {
		return _onLastSelectedChange;
	}

	public java.lang.String getOnLastYChange() {
		return _onLastYChange;
	}

	public java.lang.String getOnNodeContentChange() {
		return _onNodeContentChange;
	}

	public java.lang.String getOnScrollDelayChange() {
		return _onScrollDelayChange;
	}

	public java.lang.String getOnTypeChange() {
		return _onTypeChange;
	}

	public void setCheckContainerEl(java.lang.String checkContainerEl) {
		_checkContainerEl = checkContainerEl;

		setScopedAttribute("checkContainerEl", checkContainerEl);
	}

	public void setCheckEl(java.lang.String checkEl) {
		_checkEl = checkEl;

		setScopedAttribute("checkEl", checkEl);
	}

	public void setCheckName(java.lang.String checkName) {
		_checkName = checkName;

		setScopedAttribute("checkName", checkName);
	}

	public void setChecked(java.lang.Boolean checked) {
		_checked = checked;

		setScopedAttribute("checked", checked);
	}

	public void setChildren(java.lang.String children) {
		_children = children;

		setScopedAttribute("children", children);
	}

	public void setContainer(java.lang.String container) {
		_container = container;

		setScopedAttribute("container", container);
	}

	public void setDestroyed(java.lang.Boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setDropAction(java.lang.String dropAction) {
		_dropAction = dropAction;

		setScopedAttribute("dropAction", dropAction);
	}

	public void setHelper(java.lang.String helper) {
		_helper = helper;

		setScopedAttribute("helper", helper);
	}

	public void setIndex(java.lang.Object index) {
		_index = index;

		setScopedAttribute("index", index);
	}

	public void setInitialized(java.lang.Boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setIo(java.lang.Object io) {
		_io = io;

		setScopedAttribute("io", io);
	}

	public void setLastSelected(java.lang.String lastSelected) {
		_lastSelected = lastSelected;

		setScopedAttribute("lastSelected", lastSelected);
	}

	public void setLastY(java.lang.Number lastY) {
		_lastY = lastY;

		setScopedAttribute("lastY", lastY);
	}

	public void setNodeContent(java.lang.String nodeContent) {
		_nodeContent = nodeContent;

		setScopedAttribute("nodeContent", nodeContent);
	}

	public void setScrollDelay(java.lang.Number scrollDelay) {
		_scrollDelay = scrollDelay;

		setScopedAttribute("scrollDelay", scrollDelay);
	}

	public void setType(java.lang.String type) {
		_type = type;

		setScopedAttribute("type", type);
	}

	public void setAfterCheckContainerElChange(java.lang.String afterCheckContainerElChange) {
		_afterCheckContainerElChange = afterCheckContainerElChange;

		setScopedAttribute("afterCheckContainerElChange", afterCheckContainerElChange);
	}

	public void setAfterCheckElChange(java.lang.String afterCheckElChange) {
		_afterCheckElChange = afterCheckElChange;

		setScopedAttribute("afterCheckElChange", afterCheckElChange);
	}

	public void setAfterCheckNameChange(java.lang.String afterCheckNameChange) {
		_afterCheckNameChange = afterCheckNameChange;

		setScopedAttribute("afterCheckNameChange", afterCheckNameChange);
	}

	public void setAfterCheckedChange(java.lang.String afterCheckedChange) {
		_afterCheckedChange = afterCheckedChange;

		setScopedAttribute("afterCheckedChange", afterCheckedChange);
	}

	public void setAfterChildrenChange(java.lang.String afterChildrenChange) {
		_afterChildrenChange = afterChildrenChange;

		setScopedAttribute("afterChildrenChange", afterChildrenChange);
	}

	public void setAfterContainerChange(java.lang.String afterContainerChange) {
		_afterContainerChange = afterContainerChange;

		setScopedAttribute("afterContainerChange", afterContainerChange);
	}

	public void setAfterDestroy(java.lang.String afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.String afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterDropActionChange(java.lang.String afterDropActionChange) {
		_afterDropActionChange = afterDropActionChange;

		setScopedAttribute("afterDropActionChange", afterDropActionChange);
	}

	public void setAfterHelperChange(java.lang.String afterHelperChange) {
		_afterHelperChange = afterHelperChange;

		setScopedAttribute("afterHelperChange", afterHelperChange);
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

	public void setAfterIoChange(java.lang.String afterIoChange) {
		_afterIoChange = afterIoChange;

		setScopedAttribute("afterIoChange", afterIoChange);
	}

	public void setAfterLastSelectedChange(java.lang.String afterLastSelectedChange) {
		_afterLastSelectedChange = afterLastSelectedChange;

		setScopedAttribute("afterLastSelectedChange", afterLastSelectedChange);
	}

	public void setAfterLastYChange(java.lang.String afterLastYChange) {
		_afterLastYChange = afterLastYChange;

		setScopedAttribute("afterLastYChange", afterLastYChange);
	}

	public void setAfterNodeContentChange(java.lang.String afterNodeContentChange) {
		_afterNodeContentChange = afterNodeContentChange;

		setScopedAttribute("afterNodeContentChange", afterNodeContentChange);
	}

	public void setAfterScrollDelayChange(java.lang.String afterScrollDelayChange) {
		_afterScrollDelayChange = afterScrollDelayChange;

		setScopedAttribute("afterScrollDelayChange", afterScrollDelayChange);
	}

	public void setAfterTypeChange(java.lang.String afterTypeChange) {
		_afterTypeChange = afterTypeChange;

		setScopedAttribute("afterTypeChange", afterTypeChange);
	}

	public void setOnCheckContainerElChange(java.lang.String onCheckContainerElChange) {
		_onCheckContainerElChange = onCheckContainerElChange;

		setScopedAttribute("onCheckContainerElChange", onCheckContainerElChange);
	}

	public void setOnCheckElChange(java.lang.String onCheckElChange) {
		_onCheckElChange = onCheckElChange;

		setScopedAttribute("onCheckElChange", onCheckElChange);
	}

	public void setOnCheckNameChange(java.lang.String onCheckNameChange) {
		_onCheckNameChange = onCheckNameChange;

		setScopedAttribute("onCheckNameChange", onCheckNameChange);
	}

	public void setOnCheckedChange(java.lang.String onCheckedChange) {
		_onCheckedChange = onCheckedChange;

		setScopedAttribute("onCheckedChange", onCheckedChange);
	}

	public void setOnChildrenChange(java.lang.String onChildrenChange) {
		_onChildrenChange = onChildrenChange;

		setScopedAttribute("onChildrenChange", onChildrenChange);
	}

	public void setOnContainerChange(java.lang.String onContainerChange) {
		_onContainerChange = onContainerChange;

		setScopedAttribute("onContainerChange", onContainerChange);
	}

	public void setOnDestroy(java.lang.String onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.String onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnDropActionChange(java.lang.String onDropActionChange) {
		_onDropActionChange = onDropActionChange;

		setScopedAttribute("onDropActionChange", onDropActionChange);
	}

	public void setOnHelperChange(java.lang.String onHelperChange) {
		_onHelperChange = onHelperChange;

		setScopedAttribute("onHelperChange", onHelperChange);
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

	public void setOnIoChange(java.lang.String onIoChange) {
		_onIoChange = onIoChange;

		setScopedAttribute("onIoChange", onIoChange);
	}

	public void setOnLastSelectedChange(java.lang.String onLastSelectedChange) {
		_onLastSelectedChange = onLastSelectedChange;

		setScopedAttribute("onLastSelectedChange", onLastSelectedChange);
	}

	public void setOnLastYChange(java.lang.String onLastYChange) {
		_onLastYChange = onLastYChange;

		setScopedAttribute("onLastYChange", onLastYChange);
	}

	public void setOnNodeContentChange(java.lang.String onNodeContentChange) {
		_onNodeContentChange = onNodeContentChange;

		setScopedAttribute("onNodeContentChange", onNodeContentChange);
	}

	public void setOnScrollDelayChange(java.lang.String onScrollDelayChange) {
		_onScrollDelayChange = onScrollDelayChange;

		setScopedAttribute("onScrollDelayChange", onScrollDelayChange);
	}

	public void setOnTypeChange(java.lang.String onTypeChange) {
		_onTypeChange = onTypeChange;

		setScopedAttribute("onTypeChange", onTypeChange);
	}


	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "checkContainerEl", _checkContainerEl);
		setNamespacedAttribute(request, "checkEl", _checkEl);
		setNamespacedAttribute(request, "checkName", _checkName);
		setNamespacedAttribute(request, "checked", _checked);
		setNamespacedAttribute(request, "children", _children);
		setNamespacedAttribute(request, "container", _container);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "dropAction", _dropAction);
		setNamespacedAttribute(request, "helper", _helper);
		setNamespacedAttribute(request, "index", _index);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "io", _io);
		setNamespacedAttribute(request, "lastSelected", _lastSelected);
		setNamespacedAttribute(request, "lastY", _lastY);
		setNamespacedAttribute(request, "nodeContent", _nodeContent);
		setNamespacedAttribute(request, "scrollDelay", _scrollDelay);
		setNamespacedAttribute(request, "type", _type);
		setNamespacedAttribute(request, "afterCheckContainerElChange", _afterCheckContainerElChange);
		setNamespacedAttribute(request, "afterCheckElChange", _afterCheckElChange);
		setNamespacedAttribute(request, "afterCheckNameChange", _afterCheckNameChange);
		setNamespacedAttribute(request, "afterCheckedChange", _afterCheckedChange);
		setNamespacedAttribute(request, "afterChildrenChange", _afterChildrenChange);
		setNamespacedAttribute(request, "afterContainerChange", _afterContainerChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterDropActionChange", _afterDropActionChange);
		setNamespacedAttribute(request, "afterHelperChange", _afterHelperChange);
		setNamespacedAttribute(request, "afterIndexChange", _afterIndexChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterIoChange", _afterIoChange);
		setNamespacedAttribute(request, "afterLastSelectedChange", _afterLastSelectedChange);
		setNamespacedAttribute(request, "afterLastYChange", _afterLastYChange);
		setNamespacedAttribute(request, "afterNodeContentChange", _afterNodeContentChange);
		setNamespacedAttribute(request, "afterScrollDelayChange", _afterScrollDelayChange);
		setNamespacedAttribute(request, "afterTypeChange", _afterTypeChange);
		setNamespacedAttribute(request, "onCheckContainerElChange", _onCheckContainerElChange);
		setNamespacedAttribute(request, "onCheckElChange", _onCheckElChange);
		setNamespacedAttribute(request, "onCheckNameChange", _onCheckNameChange);
		setNamespacedAttribute(request, "onCheckedChange", _onCheckedChange);
		setNamespacedAttribute(request, "onChildrenChange", _onChildrenChange);
		setNamespacedAttribute(request, "onContainerChange", _onContainerChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onDropActionChange", _onDropActionChange);
		setNamespacedAttribute(request, "onHelperChange", _onHelperChange);
		setNamespacedAttribute(request, "onIndexChange", _onIndexChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onIoChange", _onIoChange);
		setNamespacedAttribute(request, "onLastSelectedChange", _onLastSelectedChange);
		setNamespacedAttribute(request, "onLastYChange", _onLastYChange);
		setNamespacedAttribute(request, "onNodeContentChange", _onNodeContentChange);
		setNamespacedAttribute(request, "onScrollDelayChange", _onScrollDelayChange);
		setNamespacedAttribute(request, "onTypeChange", _onTypeChange);
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:tree-view-dd:";

	private static final String _PAGE =
		"/html/taglib/alloy/tree_view_dd/page.jsp";

	private java.lang.String _checkContainerEl;
	private java.lang.String _checkEl;
	private java.lang.String _checkName;
	private java.lang.Boolean _checked;
	private java.lang.String _children;
	private java.lang.String _container;
	private java.lang.Boolean _destroyed;
	private java.lang.String _dropAction;
	private java.lang.String _helper;
	private java.lang.Object _index;
	private java.lang.Boolean _initialized;
	private java.lang.Object _io;
	private java.lang.String _lastSelected;
	private java.lang.Number _lastY;
	private java.lang.String _nodeContent;
	private java.lang.Number _scrollDelay;
	private java.lang.String _type;
	private java.lang.String _afterCheckContainerElChange;
	private java.lang.String _afterCheckElChange;
	private java.lang.String _afterCheckNameChange;
	private java.lang.String _afterCheckedChange;
	private java.lang.String _afterChildrenChange;
	private java.lang.String _afterContainerChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterDropActionChange;
	private java.lang.String _afterHelperChange;
	private java.lang.String _afterIndexChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterIoChange;
	private java.lang.String _afterLastSelectedChange;
	private java.lang.String _afterLastYChange;
	private java.lang.String _afterNodeContentChange;
	private java.lang.String _afterScrollDelayChange;
	private java.lang.String _afterTypeChange;
	private java.lang.String _onCheckContainerElChange;
	private java.lang.String _onCheckElChange;
	private java.lang.String _onCheckNameChange;
	private java.lang.String _onCheckedChange;
	private java.lang.String _onChildrenChange;
	private java.lang.String _onContainerChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onDropActionChange;
	private java.lang.String _onHelperChange;
	private java.lang.String _onIndexChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onIoChange;
	private java.lang.String _onLastSelectedChange;
	private java.lang.String _onLastYChange;
	private java.lang.String _onNodeContentChange;
	private java.lang.String _onScrollDelayChange;
	private java.lang.String _onTypeChange;

}
