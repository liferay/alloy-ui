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
java.lang.String NAMESPACE = "alloy:loading-mask:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:loading-mask:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:loading-mask:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:loading-mask:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:loading-mask:destroyed")), false);
java.lang.Object host = (java.lang.Object)request.getAttribute("alloy:loading-mask:host");
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:loading-mask:initialized")), false);
java.lang.String messageEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:loading-mask:messageEl"));
java.util.HashMap strings = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:loading-mask:strings"), "{ loading: 'Loading&hellip;' }"));
java.lang.Object target = (java.lang.Object)request.getAttribute("alloy:loading-mask:target");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterDestroyedChange");
java.lang.Object afterHostChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterHostChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterInitializedChange");
java.lang.Object afterMessageElChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterMessageElChange");
java.lang.Object afterStringsChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterStringsChange");
java.lang.Object afterTargetChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:afterTargetChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:loading-mask:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:onDestroyedChange");
java.lang.Object onHostChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:onHostChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:loading-mask:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:onInitializedChange");
java.lang.Object onMessageElChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:onMessageElChange");
java.lang.Object onStringsChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:onStringsChange");
java.lang.Object onTargetChange = (java.lang.Object)request.getAttribute("alloy:loading-mask:onTargetChange");

_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "host", host);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "messageEl", messageEl);
_updateOptions(_options, "strings", strings);
_updateOptions(_options, "target", target);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterHostChange", afterHostChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterMessageElChange", afterMessageElChange);
_updateOptions(_options, "afterStringsChange", afterStringsChange);
_updateOptions(_options, "afterTargetChange", afterTargetChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onHostChange", onHostChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onMessageElChange", onMessageElChange);
_updateOptions(_options, "onStringsChange", onStringsChange);
_updateOptions(_options, "onTargetChange", onTargetChange);
%>

<%@ include file="init-ext.jsp" %>