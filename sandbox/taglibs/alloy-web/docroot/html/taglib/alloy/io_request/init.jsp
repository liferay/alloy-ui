<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:io-request:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:io-request:scopedAttributes");

java.lang.Boolean _active = (java.lang.Boolean)request.getAttribute("alloy:io-request:active");
java.lang.Object _arguments = (java.lang.Object)request.getAttribute("alloy:io-request:arguments");
java.lang.Boolean _autoLoad = (java.lang.Boolean)request.getAttribute("alloy:io-request:autoLoad");
java.lang.Boolean _cache = (java.lang.Boolean)request.getAttribute("alloy:io-request:cache");
java.lang.String _cfg = (java.lang.String)request.getAttribute("alloy:io-request:cfg");
java.lang.Object _context = (java.lang.Object)request.getAttribute("alloy:io-request:context");
java.lang.Object _data = (java.lang.Object)request.getAttribute("alloy:io-request:data");
java.lang.String _dataType = (java.lang.String)request.getAttribute("alloy:io-request:dataType");
java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:io-request:destroyed");
java.lang.Object _form = (java.lang.Object)request.getAttribute("alloy:io-request:form");
java.lang.Object _headers = (java.lang.Object)request.getAttribute("alloy:io-request:headers");
java.lang.String _host = (java.lang.String)request.getAttribute("alloy:io-request:host");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:io-request:initialized");
java.lang.String _method = (java.lang.String)request.getAttribute("alloy:io-request:method");
java.lang.String _responseData = (java.lang.String)request.getAttribute("alloy:io-request:responseData");
java.lang.Boolean _sync = (java.lang.Boolean)request.getAttribute("alloy:io-request:sync");
java.lang.Number _timeout = (java.lang.Number)request.getAttribute("alloy:io-request:timeout");
java.lang.Object _transaction = (java.lang.Object)request.getAttribute("alloy:io-request:transaction");
java.lang.String _uri = (java.lang.String)request.getAttribute("alloy:io-request:uri");
java.lang.Object _xdr = (java.lang.Object)request.getAttribute("alloy:io-request:xdr");
java.lang.String _afterActiveChange = (java.lang.String)request.getAttribute("alloy:io-request:afterActiveChange");
java.lang.String _afterArgumentsChange = (java.lang.String)request.getAttribute("alloy:io-request:afterArgumentsChange");
java.lang.String _afterAutoLoadChange = (java.lang.String)request.getAttribute("alloy:io-request:afterAutoLoadChange");
java.lang.String _afterCacheChange = (java.lang.String)request.getAttribute("alloy:io-request:afterCacheChange");
java.lang.String _afterCfgChange = (java.lang.String)request.getAttribute("alloy:io-request:afterCfgChange");
java.lang.String _afterContextChange = (java.lang.String)request.getAttribute("alloy:io-request:afterContextChange");
java.lang.String _afterDataChange = (java.lang.String)request.getAttribute("alloy:io-request:afterDataChange");
java.lang.String _afterDataTypeChange = (java.lang.String)request.getAttribute("alloy:io-request:afterDataTypeChange");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:io-request:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:io-request:afterDestroyedChange");
java.lang.String _afterFormChange = (java.lang.String)request.getAttribute("alloy:io-request:afterFormChange");
java.lang.String _afterHeadersChange = (java.lang.String)request.getAttribute("alloy:io-request:afterHeadersChange");
java.lang.String _afterHostChange = (java.lang.String)request.getAttribute("alloy:io-request:afterHostChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:io-request:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:io-request:afterInitializedChange");
java.lang.String _afterMethodChange = (java.lang.String)request.getAttribute("alloy:io-request:afterMethodChange");
java.lang.String _afterResponseDataChange = (java.lang.String)request.getAttribute("alloy:io-request:afterResponseDataChange");
java.lang.String _afterSyncChange = (java.lang.String)request.getAttribute("alloy:io-request:afterSyncChange");
java.lang.String _afterTimeoutChange = (java.lang.String)request.getAttribute("alloy:io-request:afterTimeoutChange");
java.lang.String _afterTransactionChange = (java.lang.String)request.getAttribute("alloy:io-request:afterTransactionChange");
java.lang.String _afterUriChange = (java.lang.String)request.getAttribute("alloy:io-request:afterUriChange");
java.lang.String _afterXdrChange = (java.lang.String)request.getAttribute("alloy:io-request:afterXdrChange");
java.lang.String _onActiveChange = (java.lang.String)request.getAttribute("alloy:io-request:onActiveChange");
java.lang.String _onArgumentsChange = (java.lang.String)request.getAttribute("alloy:io-request:onArgumentsChange");
java.lang.String _onAutoLoadChange = (java.lang.String)request.getAttribute("alloy:io-request:onAutoLoadChange");
java.lang.String _onCacheChange = (java.lang.String)request.getAttribute("alloy:io-request:onCacheChange");
java.lang.String _onCfgChange = (java.lang.String)request.getAttribute("alloy:io-request:onCfgChange");
java.lang.String _onContextChange = (java.lang.String)request.getAttribute("alloy:io-request:onContextChange");
java.lang.String _onDataChange = (java.lang.String)request.getAttribute("alloy:io-request:onDataChange");
java.lang.String _onDataTypeChange = (java.lang.String)request.getAttribute("alloy:io-request:onDataTypeChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:io-request:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:io-request:onDestroyedChange");
java.lang.String _onFormChange = (java.lang.String)request.getAttribute("alloy:io-request:onFormChange");
java.lang.String _onHeadersChange = (java.lang.String)request.getAttribute("alloy:io-request:onHeadersChange");
java.lang.String _onHostChange = (java.lang.String)request.getAttribute("alloy:io-request:onHostChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:io-request:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:io-request:onInitializedChange");
java.lang.String _onMethodChange = (java.lang.String)request.getAttribute("alloy:io-request:onMethodChange");
java.lang.String _onResponseDataChange = (java.lang.String)request.getAttribute("alloy:io-request:onResponseDataChange");
java.lang.String _onSyncChange = (java.lang.String)request.getAttribute("alloy:io-request:onSyncChange");
java.lang.String _onTimeoutChange = (java.lang.String)request.getAttribute("alloy:io-request:onTimeoutChange");
java.lang.String _onTransactionChange = (java.lang.String)request.getAttribute("alloy:io-request:onTransactionChange");
java.lang.String _onUriChange = (java.lang.String)request.getAttribute("alloy:io-request:onUriChange");
java.lang.String _onXdrChange = (java.lang.String)request.getAttribute("alloy:io-request:onXdrChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_active != null) {
	scopedAttributes.put("active", _active);
}

if (_arguments != null) {
	scopedAttributes.put("arguments", _arguments);
}

if (_autoLoad != null) {
	scopedAttributes.put("autoLoad", _autoLoad);
}

if (_cache != null) {
	scopedAttributes.put("cache", _cache);
}

if (_cfg != null) {
	scopedAttributes.put("cfg", _cfg);
}

if (_context != null) {
	scopedAttributes.put("context", _context);
}

if (_data != null) {
	scopedAttributes.put("data", _data);
}

if (_dataType != null) {
	scopedAttributes.put("dataType", _dataType);
}

if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_form != null) {
	scopedAttributes.put("form", _form);
}

if (_headers != null) {
	scopedAttributes.put("headers", _headers);
}

if (_host != null) {
	scopedAttributes.put("host", _host);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_method != null) {
	scopedAttributes.put("method", _method);
}

if (_responseData != null) {
	scopedAttributes.put("responseData", _responseData);
}

if (_sync != null) {
	scopedAttributes.put("sync", _sync);
}

if (_timeout != null) {
	scopedAttributes.put("timeout", _timeout);
}

if (_transaction != null) {
	scopedAttributes.put("transaction", _transaction);
}

if (_uri != null) {
	scopedAttributes.put("uri", _uri);
}

if (_xdr != null) {
	scopedAttributes.put("xdr", _xdr);
}

if (_afterActiveChange != null) {
	scopedAttributes.put("afterActiveChange", _afterActiveChange);
}

if (_afterArgumentsChange != null) {
	scopedAttributes.put("afterArgumentsChange", _afterArgumentsChange);
}

if (_afterAutoLoadChange != null) {
	scopedAttributes.put("afterAutoLoadChange", _afterAutoLoadChange);
}

if (_afterCacheChange != null) {
	scopedAttributes.put("afterCacheChange", _afterCacheChange);
}

if (_afterCfgChange != null) {
	scopedAttributes.put("afterCfgChange", _afterCfgChange);
}

if (_afterContextChange != null) {
	scopedAttributes.put("afterContextChange", _afterContextChange);
}

if (_afterDataChange != null) {
	scopedAttributes.put("afterDataChange", _afterDataChange);
}

if (_afterDataTypeChange != null) {
	scopedAttributes.put("afterDataTypeChange", _afterDataTypeChange);
}

if (_afterDestroy != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (_afterDestroyedChange != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (_afterFormChange != null) {
	scopedAttributes.put("afterFormChange", _afterFormChange);
}

if (_afterHeadersChange != null) {
	scopedAttributes.put("afterHeadersChange", _afterHeadersChange);
}

if (_afterHostChange != null) {
	scopedAttributes.put("afterHostChange", _afterHostChange);
}

if (_afterInit != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (_afterInitializedChange != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (_afterMethodChange != null) {
	scopedAttributes.put("afterMethodChange", _afterMethodChange);
}

if (_afterResponseDataChange != null) {
	scopedAttributes.put("afterResponseDataChange", _afterResponseDataChange);
}

if (_afterSyncChange != null) {
	scopedAttributes.put("afterSyncChange", _afterSyncChange);
}

if (_afterTimeoutChange != null) {
	scopedAttributes.put("afterTimeoutChange", _afterTimeoutChange);
}

if (_afterTransactionChange != null) {
	scopedAttributes.put("afterTransactionChange", _afterTransactionChange);
}

if (_afterUriChange != null) {
	scopedAttributes.put("afterUriChange", _afterUriChange);
}

if (_afterXdrChange != null) {
	scopedAttributes.put("afterXdrChange", _afterXdrChange);
}

if (_onActiveChange != null) {
	scopedAttributes.put("onActiveChange", _onActiveChange);
}

if (_onArgumentsChange != null) {
	scopedAttributes.put("onArgumentsChange", _onArgumentsChange);
}

if (_onAutoLoadChange != null) {
	scopedAttributes.put("onAutoLoadChange", _onAutoLoadChange);
}

if (_onCacheChange != null) {
	scopedAttributes.put("onCacheChange", _onCacheChange);
}

if (_onCfgChange != null) {
	scopedAttributes.put("onCfgChange", _onCfgChange);
}

if (_onContextChange != null) {
	scopedAttributes.put("onContextChange", _onContextChange);
}

if (_onDataChange != null) {
	scopedAttributes.put("onDataChange", _onDataChange);
}

if (_onDataTypeChange != null) {
	scopedAttributes.put("onDataTypeChange", _onDataTypeChange);
}

if (_onDestroy != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (_onDestroyedChange != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (_onFormChange != null) {
	scopedAttributes.put("onFormChange", _onFormChange);
}

if (_onHeadersChange != null) {
	scopedAttributes.put("onHeadersChange", _onHeadersChange);
}

if (_onHostChange != null) {
	scopedAttributes.put("onHostChange", _onHostChange);
}

if (_onInit != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (_onInitializedChange != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (_onMethodChange != null) {
	scopedAttributes.put("onMethodChange", _onMethodChange);
}

if (_onResponseDataChange != null) {
	scopedAttributes.put("onResponseDataChange", _onResponseDataChange);
}

if (_onSyncChange != null) {
	scopedAttributes.put("onSyncChange", _onSyncChange);
}

if (_onTimeoutChange != null) {
	scopedAttributes.put("onTimeoutChange", _onTimeoutChange);
}

if (_onTransactionChange != null) {
	scopedAttributes.put("onTransactionChange", _onTransactionChange);
}

if (_onUriChange != null) {
	scopedAttributes.put("onUriChange", _onUriChange);
}

if (_onXdrChange != null) {
	scopedAttributes.put("onXdrChange", _onXdrChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>