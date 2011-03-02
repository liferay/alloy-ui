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
java.lang.String NAMESPACE = "alloy:io-request:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:io-request:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:io-request:scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("alloy:io-request:customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
boolean active = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:io-request:active")), false);
java.util.HashMap arguments = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:arguments")));
boolean autoLoad = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:io-request:autoLoad")), true);
boolean cache = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:io-request:cache")), true);
java.lang.String cfg = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:cfg"));
java.util.HashMap context = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:context")));
java.util.HashMap data = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:data")));
java.lang.String dataType = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:dataType"));
boolean destroyed = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:io-request:destroyed")), false);
java.util.HashMap form = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:form")));
java.util.HashMap headers = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:headers"), "{}"));
java.lang.Object host = (java.lang.Object)request.getAttribute("alloy:io-request:host");
boolean initialized = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:io-request:initialized")), false);
java.lang.String method = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:method"));
java.lang.Object responseData = (java.lang.Object)request.getAttribute("alloy:io-request:responseData");
boolean sync = GetterUtil.getBoolean(String.valueOf(request.getAttribute("alloy:io-request:sync")), false);
java.lang.Number timeout = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:io-request:timeout")), 0);
java.util.HashMap transaction = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:transaction")));
java.lang.String uri = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:uri"));
java.util.HashMap xdr = _getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:io-request:xdr")));
java.lang.Object afterActiveChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterActiveChange");
java.lang.Object afterArgumentsChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterArgumentsChange");
java.lang.Object afterAutoLoadChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterAutoLoadChange");
java.lang.Object afterCacheChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterCacheChange");
java.lang.Object afterCfgChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterCfgChange");
java.lang.Object afterContextChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterContextChange");
java.lang.Object afterDataChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterDataChange");
java.lang.Object afterDataTypeChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterDataTypeChange");
java.lang.Object afterDestroy = (java.lang.Object)request.getAttribute("alloy:io-request:afterDestroy");
java.lang.Object afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterDestroyedChange");
java.lang.Object afterFormChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterFormChange");
java.lang.Object afterHeadersChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterHeadersChange");
java.lang.Object afterHostChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterHostChange");
java.lang.Object afterInit = (java.lang.Object)request.getAttribute("alloy:io-request:afterInit");
java.lang.Object afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterInitializedChange");
java.lang.Object afterComplete = (java.lang.Object)request.getAttribute("alloy:io-request:afterComplete");
java.lang.Object afterEnd = (java.lang.Object)request.getAttribute("alloy:io-request:afterEnd");
java.lang.Object afterFailure = (java.lang.Object)request.getAttribute("alloy:io-request:afterFailure");
java.lang.Object afterStart = (java.lang.Object)request.getAttribute("alloy:io-request:afterStart");
java.lang.Object afterSuccess = (java.lang.Object)request.getAttribute("alloy:io-request:afterSuccess");
java.lang.Object afterXdrReady = (java.lang.Object)request.getAttribute("alloy:io-request:afterXdrReady");
java.lang.Object afterMethodChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterMethodChange");
java.lang.Object afterResponseDataChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterResponseDataChange");
java.lang.Object afterSyncChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterSyncChange");
java.lang.Object afterTimeoutChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterTimeoutChange");
java.lang.Object afterTransactionChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterTransactionChange");
java.lang.Object afterUriChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterUriChange");
java.lang.Object afterXdrChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterXdrChange");
java.lang.Object onActiveChange = (java.lang.Object)request.getAttribute("alloy:io-request:onActiveChange");
java.lang.Object onArgumentsChange = (java.lang.Object)request.getAttribute("alloy:io-request:onArgumentsChange");
java.lang.Object onAutoLoadChange = (java.lang.Object)request.getAttribute("alloy:io-request:onAutoLoadChange");
java.lang.Object onCacheChange = (java.lang.Object)request.getAttribute("alloy:io-request:onCacheChange");
java.lang.Object onCfgChange = (java.lang.Object)request.getAttribute("alloy:io-request:onCfgChange");
java.lang.Object onContextChange = (java.lang.Object)request.getAttribute("alloy:io-request:onContextChange");
java.lang.Object onDataChange = (java.lang.Object)request.getAttribute("alloy:io-request:onDataChange");
java.lang.Object onDataTypeChange = (java.lang.Object)request.getAttribute("alloy:io-request:onDataTypeChange");
java.lang.Object onDestroy = (java.lang.Object)request.getAttribute("alloy:io-request:onDestroy");
java.lang.Object onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:io-request:onDestroyedChange");
java.lang.Object onFormChange = (java.lang.Object)request.getAttribute("alloy:io-request:onFormChange");
java.lang.Object onHeadersChange = (java.lang.Object)request.getAttribute("alloy:io-request:onHeadersChange");
java.lang.Object onHostChange = (java.lang.Object)request.getAttribute("alloy:io-request:onHostChange");
java.lang.Object onInit = (java.lang.Object)request.getAttribute("alloy:io-request:onInit");
java.lang.Object onInitializedChange = (java.lang.Object)request.getAttribute("alloy:io-request:onInitializedChange");
java.lang.Object onComplete = (java.lang.Object)request.getAttribute("alloy:io-request:onComplete");
java.lang.Object onEnd = (java.lang.Object)request.getAttribute("alloy:io-request:onEnd");
java.lang.Object onFailure = (java.lang.Object)request.getAttribute("alloy:io-request:onFailure");
java.lang.Object onStart = (java.lang.Object)request.getAttribute("alloy:io-request:onStart");
java.lang.Object onSuccess = (java.lang.Object)request.getAttribute("alloy:io-request:onSuccess");
java.lang.Object onXdrReady = (java.lang.Object)request.getAttribute("alloy:io-request:onXdrReady");
java.lang.Object onMethodChange = (java.lang.Object)request.getAttribute("alloy:io-request:onMethodChange");
java.lang.Object onResponseDataChange = (java.lang.Object)request.getAttribute("alloy:io-request:onResponseDataChange");
java.lang.Object onSyncChange = (java.lang.Object)request.getAttribute("alloy:io-request:onSyncChange");
java.lang.Object onTimeoutChange = (java.lang.Object)request.getAttribute("alloy:io-request:onTimeoutChange");
java.lang.Object onTransactionChange = (java.lang.Object)request.getAttribute("alloy:io-request:onTransactionChange");
java.lang.Object onUriChange = (java.lang.Object)request.getAttribute("alloy:io-request:onUriChange");
java.lang.Object onXdrChange = (java.lang.Object)request.getAttribute("alloy:io-request:onXdrChange");

_updateOptions(_options, "active", active);
_updateOptions(_options, "arguments", arguments);
_updateOptions(_options, "autoLoad", autoLoad);
_updateOptions(_options, "cache", cache);
_updateOptions(_options, "cfg", cfg);
_updateOptions(_options, "context", context);
_updateOptions(_options, "data", data);
_updateOptions(_options, "dataType", dataType);
_updateOptions(_options, "destroyed", destroyed);
_updateOptions(_options, "form", form);
_updateOptions(_options, "headers", headers);
_updateOptions(_options, "host", host);
_updateOptions(_options, "initialized", initialized);
_updateOptions(_options, "method", method);
_updateOptions(_options, "responseData", responseData);
_updateOptions(_options, "sync", sync);
_updateOptions(_options, "timeout", timeout);
_updateOptions(_options, "transaction", transaction);
_updateOptions(_options, "uri", uri);
_updateOptions(_options, "xdr", xdr);
_updateOptions(_options, "afterActiveChange", afterActiveChange);
_updateOptions(_options, "afterArgumentsChange", afterArgumentsChange);
_updateOptions(_options, "afterAutoLoadChange", afterAutoLoadChange);
_updateOptions(_options, "afterCacheChange", afterCacheChange);
_updateOptions(_options, "afterCfgChange", afterCfgChange);
_updateOptions(_options, "afterContextChange", afterContextChange);
_updateOptions(_options, "afterDataChange", afterDataChange);
_updateOptions(_options, "afterDataTypeChange", afterDataTypeChange);
_updateOptions(_options, "afterDestroy", afterDestroy);
_updateOptions(_options, "afterDestroyedChange", afterDestroyedChange);
_updateOptions(_options, "afterFormChange", afterFormChange);
_updateOptions(_options, "afterHeadersChange", afterHeadersChange);
_updateOptions(_options, "afterHostChange", afterHostChange);
_updateOptions(_options, "afterInit", afterInit);
_updateOptions(_options, "afterInitializedChange", afterInitializedChange);
_updateOptions(_options, "afterComplete", afterComplete);
_updateOptions(_options, "afterEnd", afterEnd);
_updateOptions(_options, "afterFailure", afterFailure);
_updateOptions(_options, "afterStart", afterStart);
_updateOptions(_options, "afterSuccess", afterSuccess);
_updateOptions(_options, "afterXdrReady", afterXdrReady);
_updateOptions(_options, "afterMethodChange", afterMethodChange);
_updateOptions(_options, "afterResponseDataChange", afterResponseDataChange);
_updateOptions(_options, "afterSyncChange", afterSyncChange);
_updateOptions(_options, "afterTimeoutChange", afterTimeoutChange);
_updateOptions(_options, "afterTransactionChange", afterTransactionChange);
_updateOptions(_options, "afterUriChange", afterUriChange);
_updateOptions(_options, "afterXdrChange", afterXdrChange);
_updateOptions(_options, "onActiveChange", onActiveChange);
_updateOptions(_options, "onArgumentsChange", onArgumentsChange);
_updateOptions(_options, "onAutoLoadChange", onAutoLoadChange);
_updateOptions(_options, "onCacheChange", onCacheChange);
_updateOptions(_options, "onCfgChange", onCfgChange);
_updateOptions(_options, "onContextChange", onContextChange);
_updateOptions(_options, "onDataChange", onDataChange);
_updateOptions(_options, "onDataTypeChange", onDataTypeChange);
_updateOptions(_options, "onDestroy", onDestroy);
_updateOptions(_options, "onDestroyedChange", onDestroyedChange);
_updateOptions(_options, "onFormChange", onFormChange);
_updateOptions(_options, "onHeadersChange", onHeadersChange);
_updateOptions(_options, "onHostChange", onHostChange);
_updateOptions(_options, "onInit", onInit);
_updateOptions(_options, "onInitializedChange", onInitializedChange);
_updateOptions(_options, "onComplete", onComplete);
_updateOptions(_options, "onEnd", onEnd);
_updateOptions(_options, "onFailure", onFailure);
_updateOptions(_options, "onStart", onStart);
_updateOptions(_options, "onSuccess", onSuccess);
_updateOptions(_options, "onXdrReady", onXdrReady);
_updateOptions(_options, "onMethodChange", onMethodChange);
_updateOptions(_options, "onResponseDataChange", onResponseDataChange);
_updateOptions(_options, "onSyncChange", onSyncChange);
_updateOptions(_options, "onTimeoutChange", onTimeoutChange);
_updateOptions(_options, "onTransactionChange", onTransactionChange);
_updateOptions(_options, "onUriChange", onUriChange);
_updateOptions(_options, "onXdrChange", onXdrChange);
%>

<%@ include file="init-ext.jsp" %>