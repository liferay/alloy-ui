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
java.lang.String NAMESPACE = "alloy:char-counter:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:char-counter:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.lang.Object counter = (java.lang.Object)request.getAttribute("alloy:char-counter:counter");
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:char-counter:destroyed")), false);
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:char-counter:initialized")), false);
java.lang.Object input = (java.lang.Object)request.getAttribute("alloy:char-counter:input");
java.lang.Number maxLength = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:char-counter:maxLength")), 2147483647);
java.lang.Object afterCounterChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterCounterChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:char-counter:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterDestroyedChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:char-counter:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterInitializedChange");
java.lang.Object afterInputChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterInputChange");
java.lang.Object afterMaxLengthChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterMaxLengthChange");
java.lang.Object onCounterChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onCounterChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:char-counter:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onDestroyedChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:char-counter:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onInitializedChange");
java.lang.Object onInputChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onInputChange");
java.lang.Object onMaxLengthChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onMaxLengthChange");

_updateOptions(_options, "counter", counter);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "input", input);
_updateOptions(_options, "maxLength", maxLength);
_updateOptions(_options, "afterCounterChange", afterCounterChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterInputChange", afterInputChange);
_updateOptions(_options, "afterMaxLengthChange", afterMaxLengthChange);
_updateOptions(_options, "onCounterChange", onCounterChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onInputChange", onInputChange);
_updateOptions(_options, "onMaxLengthChange", onMaxLengthChange);
%>

<%@ include file="init-ext.jsp" %>