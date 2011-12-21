<%--
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

@generated
--%>

<%@ include file="/html/taglib/taglib-init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view-dd:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view-dd:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:tree-view-dd:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

if ((scopedAttributes != null) && !scopedAttributes.isEmpty()) {
	_options.putAll(scopedAttributes);
}

if ((dynamicAttributes != null) && !dynamicAttributes.isEmpty()) {
	_options.putAll(dynamicAttributes);
}

%>

<%@ include file="/html/taglib/aui/init-alloy.jspf" %>

<%
java.lang.String checkContainerEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:checkContainerEl"));
java.lang.String checkEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:checkEl"));
java.lang.String checkName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:checkName"), "tree-node-check");
boolean checked = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tree-view-dd:checked")), false);
java.util.ArrayList children = _toArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view-dd:children"), "[]"));
java.lang.String container = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:container"));
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tree-view-dd:destroyed")), false);
java.lang.String dropAction = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:dropAction"));
java.lang.String helper = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:helper"));
java.util.HashMap index = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view-dd:index"), "{}"));
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tree-view-dd:initialized")), false);
java.util.HashMap io = _toHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view-dd:io")));
java.lang.Object lastSelected = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:lastSelected");
java.lang.Number lastY = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:tree-view-dd:lastY")), 0);
java.lang.Object nodeContent = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:nodeContent");
java.lang.Number scrollDelay = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:tree-view-dd:scrollDelay")), 100);
java.lang.String type = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:type"), "file");
java.lang.Object afterCheckContainerElChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterCheckContainerElChange");
java.lang.Object afterCheckElChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterCheckElChange");
java.lang.Object afterCheckNameChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterCheckNameChange");
java.lang.Object afterCheckedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterCheckedChange");
java.lang.Object afterChildrenChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterChildrenChange");
java.lang.Object afterContainerChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterContainerChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterDestroyedChange");
java.lang.Object afterDropActionChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterDropActionChange");
java.lang.Object afterHelperChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterHelperChange");
java.lang.Object afterIndexChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterIndexChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterInitializedChange");
java.lang.Object afterIoChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterIoChange");
java.lang.Object afterLastSelectedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterLastSelectedChange");
java.lang.Object afterLastYChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterLastYChange");
java.lang.Object afterNodeContentChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterNodeContentChange");
java.lang.Object afterScrollDelayChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterScrollDelayChange");
java.lang.Object afterTypeChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterTypeChange");
java.lang.Object onCheckContainerElChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onCheckContainerElChange");
java.lang.Object onCheckElChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onCheckElChange");
java.lang.Object onCheckNameChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onCheckNameChange");
java.lang.Object onCheckedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onCheckedChange");
java.lang.Object onChildrenChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onChildrenChange");
java.lang.Object onContainerChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onContainerChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onDestroyedChange");
java.lang.Object onDropActionChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onDropActionChange");
java.lang.Object onHelperChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onHelperChange");
java.lang.Object onIndexChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onIndexChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onInitializedChange");
java.lang.Object onIoChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onIoChange");
java.lang.Object onLastSelectedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onLastSelectedChange");
java.lang.Object onLastYChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onLastYChange");
java.lang.Object onNodeContentChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onNodeContentChange");
java.lang.Object onScrollDelayChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onScrollDelayChange");
java.lang.Object onTypeChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onTypeChange");

_updateOptions(_options, "checkContainerEl", checkContainerEl);
_updateOptions(_options, "checkEl", checkEl);
_updateOptions(_options, "checkName", checkName);
_updateOptions(_options, "checked", checked);
_updateOptions(_options, "children", children);
_updateOptions(_options, "container", container);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "dropAction", dropAction);
_updateOptions(_options, "helper", helper);
_updateOptions(_options, "index", index);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "io", io);
_updateOptions(_options, "lastSelected", lastSelected);
_updateOptions(_options, "lastY", lastY);
_updateOptions(_options, "nodeContent", nodeContent);
_updateOptions(_options, "scrollDelay", scrollDelay);
_updateOptions(_options, "type", type);
_updateOptions(_options, "afterCheckContainerElChange", afterCheckContainerElChange);
_updateOptions(_options, "afterCheckElChange", afterCheckElChange);
_updateOptions(_options, "afterCheckNameChange", afterCheckNameChange);
_updateOptions(_options, "afterCheckedChange", afterCheckedChange);
_updateOptions(_options, "afterChildrenChange", afterChildrenChange);
_updateOptions(_options, "afterContainerChange", afterContainerChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterDropActionChange", afterDropActionChange);
_updateOptions(_options, "afterHelperChange", afterHelperChange);
_updateOptions(_options, "afterIndexChange", afterIndexChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterIoChange", afterIoChange);
_updateOptions(_options, "afterLastSelectedChange", afterLastSelectedChange);
_updateOptions(_options, "afterLastYChange", afterLastYChange);
_updateOptions(_options, "afterNodeContentChange", afterNodeContentChange);
_updateOptions(_options, "afterScrollDelayChange", afterScrollDelayChange);
_updateOptions(_options, "afterTypeChange", afterTypeChange);
_updateOptions(_options, "onCheckContainerElChange", onCheckContainerElChange);
_updateOptions(_options, "onCheckElChange", onCheckElChange);
_updateOptions(_options, "onCheckNameChange", onCheckNameChange);
_updateOptions(_options, "onCheckedChange", onCheckedChange);
_updateOptions(_options, "onChildrenChange", onChildrenChange);
_updateOptions(_options, "onContainerChange", onContainerChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onDropActionChange", onDropActionChange);
_updateOptions(_options, "onHelperChange", onHelperChange);
_updateOptions(_options, "onIndexChange", onIndexChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onIoChange", onIoChange);
_updateOptions(_options, "onLastSelectedChange", onLastSelectedChange);
_updateOptions(_options, "onLastYChange", onLastYChange);
_updateOptions(_options, "onNodeContentChange", onNodeContentChange);
_updateOptions(_options, "onScrollDelayChange", onScrollDelayChange);
_updateOptions(_options, "onTypeChange", onTypeChange);
%>

<%@ include file="/html/taglib/alloy/tree_view_dd/init-ext.jspf" %>

<%!
private static final String _NAMESPACE = "alloy:tree-view-dd:";
%>