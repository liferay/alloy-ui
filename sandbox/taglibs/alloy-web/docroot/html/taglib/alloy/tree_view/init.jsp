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
--%>

<%@ include file="/html/taglib/init-taglib.jsp" %>

<%
java.lang.String NAMESPACE = "alloy:tree-view:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:tree-view:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.util.ArrayList children = _getArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:children"), "[]"));
java.lang.String container = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:container"));
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tree-view:destroyed")), false);
java.util.HashMap index = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:index"), "{}"));
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:tree-view:initialized")), false);
java.util.HashMap io = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view:io")));
java.lang.Object lastSelected = (java.lang.Object)request.getAttribute("alloy:tree-view:lastSelected");
java.lang.String type = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view:type"), "file");
java.lang.Object afterChildrenChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterChildrenChange");
java.lang.Object afterContainerChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterContainerChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:tree-view:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterDestroyedChange");
java.lang.Object afterIndexChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterIndexChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:tree-view:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterInitializedChange");
java.lang.Object afterIoChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterIoChange");
java.lang.Object afterLastSelectedChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterLastSelectedChange");
java.lang.Object afterTypeChange = (java.lang.Object)request.getAttribute("alloy:tree-view:afterTypeChange");
java.lang.Object onChildrenChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onChildrenChange");
java.lang.Object onContainerChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onContainerChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:tree-view:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onDestroyedChange");
java.lang.Object onIndexChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onIndexChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:tree-view:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onInitializedChange");
java.lang.Object onIoChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onIoChange");
java.lang.Object onLastSelectedChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onLastSelectedChange");
java.lang.Object onTypeChange = (java.lang.Object)request.getAttribute("alloy:tree-view:onTypeChange");

_updateOptions(_options, "children", children);
_updateOptions(_options, "container", container);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "index", index);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "io", io);
_updateOptions(_options, "lastSelected", lastSelected);
_updateOptions(_options, "type", type);
_updateOptions(_options, "afterChildrenChange", afterChildrenChange);
_updateOptions(_options, "afterContainerChange", afterContainerChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterIndexChange", afterIndexChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterIoChange", afterIoChange);
_updateOptions(_options, "afterLastSelectedChange", afterLastSelectedChange);
_updateOptions(_options, "afterTypeChange", afterTypeChange);
_updateOptions(_options, "onChildrenChange", onChildrenChange);
_updateOptions(_options, "onContainerChange", onContainerChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onIndexChange", onIndexChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onIoChange", onIoChange);
_updateOptions(_options, "onLastSelectedChange", onLastSelectedChange);
_updateOptions(_options, "onTypeChange", onTypeChange);
%>

<%@ include file="init-ext.jsp" %>