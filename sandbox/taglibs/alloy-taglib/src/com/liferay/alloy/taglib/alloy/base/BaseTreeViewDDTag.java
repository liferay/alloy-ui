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

	public java.lang.Object getChildren() {
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

	public java.lang.Object getLastSelected() {
		return _lastSelected;
	}

	public java.lang.Object getLastY() {
		return _lastY;
	}

	public java.lang.Object getNodeContent() {
		return _nodeContent;
	}

	public java.lang.Object getScrollDelay() {
		return _scrollDelay;
	}

	public java.lang.String getType() {
		return _type;
	}

	public java.lang.Object getAfterCheckContainerElChange() {
		return _afterCheckContainerElChange;
	}

	public java.lang.Object getAfterCheckElChange() {
		return _afterCheckElChange;
	}

	public java.lang.Object getAfterCheckNameChange() {
		return _afterCheckNameChange;
	}

	public java.lang.Object getAfterCheckedChange() {
		return _afterCheckedChange;
	}

	public java.lang.Object getAfterChildrenChange() {
		return _afterChildrenChange;
	}

	public java.lang.Object getAfterContainerChange() {
		return _afterContainerChange;
	}

	public java.lang.Object getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.Object getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.Object getAfterDropActionChange() {
		return _afterDropActionChange;
	}

	public java.lang.Object getAfterHelperChange() {
		return _afterHelperChange;
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

	public java.lang.Object getAfterIoChange() {
		return _afterIoChange;
	}

	public java.lang.Object getAfterLastSelectedChange() {
		return _afterLastSelectedChange;
	}

	public java.lang.Object getAfterLastYChange() {
		return _afterLastYChange;
	}

	public java.lang.Object getAfterNodeContentChange() {
		return _afterNodeContentChange;
	}

	public java.lang.Object getAfterScrollDelayChange() {
		return _afterScrollDelayChange;
	}

	public java.lang.Object getAfterTypeChange() {
		return _afterTypeChange;
	}

	public java.lang.Object getOnCheckContainerElChange() {
		return _onCheckContainerElChange;
	}

	public java.lang.Object getOnCheckElChange() {
		return _onCheckElChange;
	}

	public java.lang.Object getOnCheckNameChange() {
		return _onCheckNameChange;
	}

	public java.lang.Object getOnCheckedChange() {
		return _onCheckedChange;
	}

	public java.lang.Object getOnChildrenChange() {
		return _onChildrenChange;
	}

	public java.lang.Object getOnContainerChange() {
		return _onContainerChange;
	}

	public java.lang.Object getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.Object getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.Object getOnDropActionChange() {
		return _onDropActionChange;
	}

	public java.lang.Object getOnHelperChange() {
		return _onHelperChange;
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

	public java.lang.Object getOnIoChange() {
		return _onIoChange;
	}

	public java.lang.Object getOnLastSelectedChange() {
		return _onLastSelectedChange;
	}

	public java.lang.Object getOnLastYChange() {
		return _onLastYChange;
	}

	public java.lang.Object getOnNodeContentChange() {
		return _onNodeContentChange;
	}

	public java.lang.Object getOnScrollDelayChange() {
		return _onScrollDelayChange;
	}

	public java.lang.Object getOnTypeChange() {
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

	public void setChildren(java.lang.Object children) {
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

	public void setLastSelected(java.lang.Object lastSelected) {
		_lastSelected = lastSelected;

		setScopedAttribute("lastSelected", lastSelected);
	}

	public void setLastY(java.lang.Object lastY) {
		_lastY = lastY;

		setScopedAttribute("lastY", lastY);
	}

	public void setNodeContent(java.lang.Object nodeContent) {
		_nodeContent = nodeContent;

		setScopedAttribute("nodeContent", nodeContent);
	}

	public void setScrollDelay(java.lang.Object scrollDelay) {
		_scrollDelay = scrollDelay;

		setScopedAttribute("scrollDelay", scrollDelay);
	}

	public void setType(java.lang.String type) {
		_type = type;

		setScopedAttribute("type", type);
	}

	public void setAfterCheckContainerElChange(java.lang.Object afterCheckContainerElChange) {
		_afterCheckContainerElChange = afterCheckContainerElChange;

		setScopedAttribute("afterCheckContainerElChange", afterCheckContainerElChange);
	}

	public void setAfterCheckElChange(java.lang.Object afterCheckElChange) {
		_afterCheckElChange = afterCheckElChange;

		setScopedAttribute("afterCheckElChange", afterCheckElChange);
	}

	public void setAfterCheckNameChange(java.lang.Object afterCheckNameChange) {
		_afterCheckNameChange = afterCheckNameChange;

		setScopedAttribute("afterCheckNameChange", afterCheckNameChange);
	}

	public void setAfterCheckedChange(java.lang.Object afterCheckedChange) {
		_afterCheckedChange = afterCheckedChange;

		setScopedAttribute("afterCheckedChange", afterCheckedChange);
	}

	public void setAfterChildrenChange(java.lang.Object afterChildrenChange) {
		_afterChildrenChange = afterChildrenChange;

		setScopedAttribute("afterChildrenChange", afterChildrenChange);
	}

	public void setAfterContainerChange(java.lang.Object afterContainerChange) {
		_afterContainerChange = afterContainerChange;

		setScopedAttribute("afterContainerChange", afterContainerChange);
	}

	public void setAfterDestroy(java.lang.Object afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.Object afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterDropActionChange(java.lang.Object afterDropActionChange) {
		_afterDropActionChange = afterDropActionChange;

		setScopedAttribute("afterDropActionChange", afterDropActionChange);
	}

	public void setAfterHelperChange(java.lang.Object afterHelperChange) {
		_afterHelperChange = afterHelperChange;

		setScopedAttribute("afterHelperChange", afterHelperChange);
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

	public void setAfterIoChange(java.lang.Object afterIoChange) {
		_afterIoChange = afterIoChange;

		setScopedAttribute("afterIoChange", afterIoChange);
	}

	public void setAfterLastSelectedChange(java.lang.Object afterLastSelectedChange) {
		_afterLastSelectedChange = afterLastSelectedChange;

		setScopedAttribute("afterLastSelectedChange", afterLastSelectedChange);
	}

	public void setAfterLastYChange(java.lang.Object afterLastYChange) {
		_afterLastYChange = afterLastYChange;

		setScopedAttribute("afterLastYChange", afterLastYChange);
	}

	public void setAfterNodeContentChange(java.lang.Object afterNodeContentChange) {
		_afterNodeContentChange = afterNodeContentChange;

		setScopedAttribute("afterNodeContentChange", afterNodeContentChange);
	}

	public void setAfterScrollDelayChange(java.lang.Object afterScrollDelayChange) {
		_afterScrollDelayChange = afterScrollDelayChange;

		setScopedAttribute("afterScrollDelayChange", afterScrollDelayChange);
	}

	public void setAfterTypeChange(java.lang.Object afterTypeChange) {
		_afterTypeChange = afterTypeChange;

		setScopedAttribute("afterTypeChange", afterTypeChange);
	}

	public void setOnCheckContainerElChange(java.lang.Object onCheckContainerElChange) {
		_onCheckContainerElChange = onCheckContainerElChange;

		setScopedAttribute("onCheckContainerElChange", onCheckContainerElChange);
	}

	public void setOnCheckElChange(java.lang.Object onCheckElChange) {
		_onCheckElChange = onCheckElChange;

		setScopedAttribute("onCheckElChange", onCheckElChange);
	}

	public void setOnCheckNameChange(java.lang.Object onCheckNameChange) {
		_onCheckNameChange = onCheckNameChange;

		setScopedAttribute("onCheckNameChange", onCheckNameChange);
	}

	public void setOnCheckedChange(java.lang.Object onCheckedChange) {
		_onCheckedChange = onCheckedChange;

		setScopedAttribute("onCheckedChange", onCheckedChange);
	}

	public void setOnChildrenChange(java.lang.Object onChildrenChange) {
		_onChildrenChange = onChildrenChange;

		setScopedAttribute("onChildrenChange", onChildrenChange);
	}

	public void setOnContainerChange(java.lang.Object onContainerChange) {
		_onContainerChange = onContainerChange;

		setScopedAttribute("onContainerChange", onContainerChange);
	}

	public void setOnDestroy(java.lang.Object onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.Object onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnDropActionChange(java.lang.Object onDropActionChange) {
		_onDropActionChange = onDropActionChange;

		setScopedAttribute("onDropActionChange", onDropActionChange);
	}

	public void setOnHelperChange(java.lang.Object onHelperChange) {
		_onHelperChange = onHelperChange;

		setScopedAttribute("onHelperChange", onHelperChange);
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

	public void setOnIoChange(java.lang.Object onIoChange) {
		_onIoChange = onIoChange;

		setScopedAttribute("onIoChange", onIoChange);
	}

	public void setOnLastSelectedChange(java.lang.Object onLastSelectedChange) {
		_onLastSelectedChange = onLastSelectedChange;

		setScopedAttribute("onLastSelectedChange", onLastSelectedChange);
	}

	public void setOnLastYChange(java.lang.Object onLastYChange) {
		_onLastYChange = onLastYChange;

		setScopedAttribute("onLastYChange", onLastYChange);
	}

	public void setOnNodeContentChange(java.lang.Object onNodeContentChange) {
		_onNodeContentChange = onNodeContentChange;

		setScopedAttribute("onNodeContentChange", onNodeContentChange);
	}

	public void setOnScrollDelayChange(java.lang.Object onScrollDelayChange) {
		_onScrollDelayChange = onScrollDelayChange;

		setScopedAttribute("onScrollDelayChange", onScrollDelayChange);
	}

	public void setOnTypeChange(java.lang.Object onTypeChange) {
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
	private java.lang.Object _children;
	private java.lang.String _container;
	private java.lang.Boolean _destroyed;
	private java.lang.String _dropAction;
	private java.lang.String _helper;
	private java.lang.Object _index;
	private java.lang.Boolean _initialized;
	private java.lang.Object _io;
	private java.lang.Object _lastSelected;
	private java.lang.Object _lastY;
	private java.lang.Object _nodeContent;
	private java.lang.Object _scrollDelay;
	private java.lang.String _type;
	private java.lang.Object _afterCheckContainerElChange;
	private java.lang.Object _afterCheckElChange;
	private java.lang.Object _afterCheckNameChange;
	private java.lang.Object _afterCheckedChange;
	private java.lang.Object _afterChildrenChange;
	private java.lang.Object _afterContainerChange;
	private java.lang.Object _afterDestroy;
	private java.lang.Object _afterDestroyedChange;
	private java.lang.Object _afterDropActionChange;
	private java.lang.Object _afterHelperChange;
	private java.lang.Object _afterIndexChange;
	private java.lang.Object _afterInit;
	private java.lang.Object _afterInitializedChange;
	private java.lang.Object _afterIoChange;
	private java.lang.Object _afterLastSelectedChange;
	private java.lang.Object _afterLastYChange;
	private java.lang.Object _afterNodeContentChange;
	private java.lang.Object _afterScrollDelayChange;
	private java.lang.Object _afterTypeChange;
	private java.lang.Object _onCheckContainerElChange;
	private java.lang.Object _onCheckElChange;
	private java.lang.Object _onCheckNameChange;
	private java.lang.Object _onCheckedChange;
	private java.lang.Object _onChildrenChange;
	private java.lang.Object _onContainerChange;
	private java.lang.Object _onDestroy;
	private java.lang.Object _onDestroyedChange;
	private java.lang.Object _onDropActionChange;
	private java.lang.Object _onHelperChange;
	private java.lang.Object _onIndexChange;
	private java.lang.Object _onInit;
	private java.lang.Object _onInitializedChange;
	private java.lang.Object _onIoChange;
	private java.lang.Object _onLastSelectedChange;
	private java.lang.Object _onLastYChange;
	private java.lang.Object _onNodeContentChange;
	private java.lang.Object _onScrollDelayChange;
	private java.lang.Object _onTypeChange;

}
