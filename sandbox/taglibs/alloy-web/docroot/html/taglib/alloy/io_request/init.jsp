<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:io-request:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:io-request:scopedAttributes");

String uniqueId = StringPool.BLANK;

boolean useMarkup = Boolean.valueOf((String)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	if ((String)request.getAttribute("alloy:io-request:boundingBox") == null) {
		scopedAttributes.put("boundingBox", StringPool.POUND.concat(uniqueId).concat("BoundingBox"));
	}
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}

java.lang.Boolean _active = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:io-request:active"), false);
java.lang.Object _arguments = (java.lang.Object)request.getAttribute("alloy:io-request:arguments");
java.lang.Boolean _autoLoad = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:io-request:autoLoad"), true);
java.lang.Boolean _cache = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:io-request:cache"), true);
java.lang.Object _cfg = (java.lang.Object)request.getAttribute("alloy:io-request:cfg");
java.lang.Object _context = (java.lang.Object)request.getAttribute("alloy:io-request:context");
java.lang.Object _data = (java.lang.Object)request.getAttribute("alloy:io-request:data");
java.lang.Object _dataType = (java.lang.Object)request.getAttribute("alloy:io-request:dataType");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:io-request:destroyed"), false);
java.lang.Object _form = (java.lang.Object)request.getAttribute("alloy:io-request:form");
java.lang.Object _headers = (java.lang.Object)request.getAttribute("alloy:io-request:headers");
java.lang.Object _host = (java.lang.Object)request.getAttribute("alloy:io-request:host");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:io-request:initialized"), false);
java.lang.Object _method = (java.lang.Object)request.getAttribute("alloy:io-request:method");
java.lang.Object _responseData = (java.lang.Object)request.getAttribute("alloy:io-request:responseData");
java.lang.Boolean _sync = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:io-request:sync"), false);
java.lang.Number _timeout = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:io-request:timeout"), 0);
java.lang.Object _transaction = (java.lang.Object)request.getAttribute("alloy:io-request:transaction");
java.lang.Object _uri = (java.lang.Object)request.getAttribute("alloy:io-request:uri");
java.lang.Object _xdr = (java.lang.Object)request.getAttribute("alloy:io-request:xdr");
java.lang.Object _afterActiveChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterActiveChange");
java.lang.Object _afterArgumentsChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterArgumentsChange");
java.lang.Object _afterAutoLoadChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterAutoLoadChange");
java.lang.Object _afterCacheChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterCacheChange");
java.lang.Object _afterCfgChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterCfgChange");
java.lang.Object _afterContextChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterContextChange");
java.lang.Object _afterDataChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterDataChange");
java.lang.Object _afterDataTypeChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterDataTypeChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:io-request:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterDestroyedChange");
java.lang.Object _afterFormChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterFormChange");
java.lang.Object _afterHeadersChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterHeadersChange");
java.lang.Object _afterHostChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterHostChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:io-request:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterInitializedChange");
java.lang.Object _afterComplete = (java.lang.Object)request.getAttribute("alloy:io-request:afterComplete");
java.lang.Object _afterEnd = (java.lang.Object)request.getAttribute("alloy:io-request:afterEnd");
java.lang.Object _afterFailure = (java.lang.Object)request.getAttribute("alloy:io-request:afterFailure");
java.lang.Object _afterStart = (java.lang.Object)request.getAttribute("alloy:io-request:afterStart");
java.lang.Object _afterSuccess = (java.lang.Object)request.getAttribute("alloy:io-request:afterSuccess");
java.lang.Object _afterXdrReady = (java.lang.Object)request.getAttribute("alloy:io-request:afterXdrReady");
java.lang.Object _afterMethodChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterMethodChange");
java.lang.Object _afterResponseDataChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterResponseDataChange");
java.lang.Object _afterSyncChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterSyncChange");
java.lang.Object _afterTimeoutChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterTimeoutChange");
java.lang.Object _afterTransactionChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterTransactionChange");
java.lang.Object _afterUriChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterUriChange");
java.lang.Object _afterXdrChange = (java.lang.Object)request.getAttribute("alloy:io-request:afterXdrChange");
java.lang.Object _onActiveChange = (java.lang.Object)request.getAttribute("alloy:io-request:onActiveChange");
java.lang.Object _onArgumentsChange = (java.lang.Object)request.getAttribute("alloy:io-request:onArgumentsChange");
java.lang.Object _onAutoLoadChange = (java.lang.Object)request.getAttribute("alloy:io-request:onAutoLoadChange");
java.lang.Object _onCacheChange = (java.lang.Object)request.getAttribute("alloy:io-request:onCacheChange");
java.lang.Object _onCfgChange = (java.lang.Object)request.getAttribute("alloy:io-request:onCfgChange");
java.lang.Object _onContextChange = (java.lang.Object)request.getAttribute("alloy:io-request:onContextChange");
java.lang.Object _onDataChange = (java.lang.Object)request.getAttribute("alloy:io-request:onDataChange");
java.lang.Object _onDataTypeChange = (java.lang.Object)request.getAttribute("alloy:io-request:onDataTypeChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:io-request:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:io-request:onDestroyedChange");
java.lang.Object _onFormChange = (java.lang.Object)request.getAttribute("alloy:io-request:onFormChange");
java.lang.Object _onHeadersChange = (java.lang.Object)request.getAttribute("alloy:io-request:onHeadersChange");
java.lang.Object _onHostChange = (java.lang.Object)request.getAttribute("alloy:io-request:onHostChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:io-request:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:io-request:onInitializedChange");
java.lang.Object _onComplete = (java.lang.Object)request.getAttribute("alloy:io-request:onComplete");
java.lang.Object _onEnd = (java.lang.Object)request.getAttribute("alloy:io-request:onEnd");
java.lang.Object _onFailure = (java.lang.Object)request.getAttribute("alloy:io-request:onFailure");
java.lang.Object _onStart = (java.lang.Object)request.getAttribute("alloy:io-request:onStart");
java.lang.Object _onSuccess = (java.lang.Object)request.getAttribute("alloy:io-request:onSuccess");
java.lang.Object _onXdrReady = (java.lang.Object)request.getAttribute("alloy:io-request:onXdrReady");
java.lang.Object _onMethodChange = (java.lang.Object)request.getAttribute("alloy:io-request:onMethodChange");
java.lang.Object _onResponseDataChange = (java.lang.Object)request.getAttribute("alloy:io-request:onResponseDataChange");
java.lang.Object _onSyncChange = (java.lang.Object)request.getAttribute("alloy:io-request:onSyncChange");
java.lang.Object _onTimeoutChange = (java.lang.Object)request.getAttribute("alloy:io-request:onTimeoutChange");
java.lang.Object _onTransactionChange = (java.lang.Object)request.getAttribute("alloy:io-request:onTransactionChange");
java.lang.Object _onUriChange = (java.lang.Object)request.getAttribute("alloy:io-request:onUriChange");
java.lang.Object _onXdrChange = (java.lang.Object)request.getAttribute("alloy:io-request:onXdrChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:io-request:active") != null) {
	scopedAttributes.put("active", _active);
}

if (request.getAttribute("alloy:io-request:arguments") != null) {
	scopedAttributes.put("arguments", _arguments);
}

if (request.getAttribute("alloy:io-request:autoLoad") != null) {
	scopedAttributes.put("autoLoad", _autoLoad);
}

if (request.getAttribute("alloy:io-request:cache") != null) {
	scopedAttributes.put("cache", _cache);
}

if (request.getAttribute("alloy:io-request:cfg") != null) {
	scopedAttributes.put("cfg", _cfg);
}

if (request.getAttribute("alloy:io-request:context") != null) {
	scopedAttributes.put("context", _context);
}

if (request.getAttribute("alloy:io-request:data") != null) {
	scopedAttributes.put("data", _data);
}

if (request.getAttribute("alloy:io-request:dataType") != null) {
	scopedAttributes.put("dataType", _dataType);
}

if (request.getAttribute("alloy:io-request:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:io-request:form") != null) {
	scopedAttributes.put("form", _form);
}

if (request.getAttribute("alloy:io-request:headers") != null) {
	scopedAttributes.put("headers", _headers);
}

if (request.getAttribute("alloy:io-request:host") != null) {
	scopedAttributes.put("host", _host);
}

if (request.getAttribute("alloy:io-request:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:io-request:method") != null) {
	scopedAttributes.put("method", _method);
}

if (request.getAttribute("alloy:io-request:responseData") != null) {
	scopedAttributes.put("responseData", _responseData);
}

if (request.getAttribute("alloy:io-request:sync") != null) {
	scopedAttributes.put("sync", _sync);
}

if (request.getAttribute("alloy:io-request:timeout") != null) {
	scopedAttributes.put("timeout", _timeout);
}

if (request.getAttribute("alloy:io-request:transaction") != null) {
	scopedAttributes.put("transaction", _transaction);
}

if (request.getAttribute("alloy:io-request:uri") != null) {
	scopedAttributes.put("uri", _uri);
}

if (request.getAttribute("alloy:io-request:xdr") != null) {
	scopedAttributes.put("xdr", _xdr);
}

if (request.getAttribute("alloy:io-request:afterActiveChange") != null) {
	scopedAttributes.put("afterActiveChange", _afterActiveChange);
}

if (request.getAttribute("alloy:io-request:afterArgumentsChange") != null) {
	scopedAttributes.put("afterArgumentsChange", _afterArgumentsChange);
}

if (request.getAttribute("alloy:io-request:afterAutoLoadChange") != null) {
	scopedAttributes.put("afterAutoLoadChange", _afterAutoLoadChange);
}

if (request.getAttribute("alloy:io-request:afterCacheChange") != null) {
	scopedAttributes.put("afterCacheChange", _afterCacheChange);
}

if (request.getAttribute("alloy:io-request:afterCfgChange") != null) {
	scopedAttributes.put("afterCfgChange", _afterCfgChange);
}

if (request.getAttribute("alloy:io-request:afterContextChange") != null) {
	scopedAttributes.put("afterContextChange", _afterContextChange);
}

if (request.getAttribute("alloy:io-request:afterDataChange") != null) {
	scopedAttributes.put("afterDataChange", _afterDataChange);
}

if (request.getAttribute("alloy:io-request:afterDataTypeChange") != null) {
	scopedAttributes.put("afterDataTypeChange", _afterDataTypeChange);
}

if (request.getAttribute("alloy:io-request:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:io-request:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:io-request:afterFormChange") != null) {
	scopedAttributes.put("afterFormChange", _afterFormChange);
}

if (request.getAttribute("alloy:io-request:afterHeadersChange") != null) {
	scopedAttributes.put("afterHeadersChange", _afterHeadersChange);
}

if (request.getAttribute("alloy:io-request:afterHostChange") != null) {
	scopedAttributes.put("afterHostChange", _afterHostChange);
}

if (request.getAttribute("alloy:io-request:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:io-request:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:io-request:afterComplete") != null) {
	scopedAttributes.put("afterComplete", _afterComplete);
}

if (request.getAttribute("alloy:io-request:afterEnd") != null) {
	scopedAttributes.put("afterEnd", _afterEnd);
}

if (request.getAttribute("alloy:io-request:afterFailure") != null) {
	scopedAttributes.put("afterFailure", _afterFailure);
}

if (request.getAttribute("alloy:io-request:afterStart") != null) {
	scopedAttributes.put("afterStart", _afterStart);
}

if (request.getAttribute("alloy:io-request:afterSuccess") != null) {
	scopedAttributes.put("afterSuccess", _afterSuccess);
}

if (request.getAttribute("alloy:io-request:afterXdrReady") != null) {
	scopedAttributes.put("afterXdrReady", _afterXdrReady);
}

if (request.getAttribute("alloy:io-request:afterMethodChange") != null) {
	scopedAttributes.put("afterMethodChange", _afterMethodChange);
}

if (request.getAttribute("alloy:io-request:afterResponseDataChange") != null) {
	scopedAttributes.put("afterResponseDataChange", _afterResponseDataChange);
}

if (request.getAttribute("alloy:io-request:afterSyncChange") != null) {
	scopedAttributes.put("afterSyncChange", _afterSyncChange);
}

if (request.getAttribute("alloy:io-request:afterTimeoutChange") != null) {
	scopedAttributes.put("afterTimeoutChange", _afterTimeoutChange);
}

if (request.getAttribute("alloy:io-request:afterTransactionChange") != null) {
	scopedAttributes.put("afterTransactionChange", _afterTransactionChange);
}

if (request.getAttribute("alloy:io-request:afterUriChange") != null) {
	scopedAttributes.put("afterUriChange", _afterUriChange);
}

if (request.getAttribute("alloy:io-request:afterXdrChange") != null) {
	scopedAttributes.put("afterXdrChange", _afterXdrChange);
}

if (request.getAttribute("alloy:io-request:onActiveChange") != null) {
	scopedAttributes.put("onActiveChange", _onActiveChange);
}

if (request.getAttribute("alloy:io-request:onArgumentsChange") != null) {
	scopedAttributes.put("onArgumentsChange", _onArgumentsChange);
}

if (request.getAttribute("alloy:io-request:onAutoLoadChange") != null) {
	scopedAttributes.put("onAutoLoadChange", _onAutoLoadChange);
}

if (request.getAttribute("alloy:io-request:onCacheChange") != null) {
	scopedAttributes.put("onCacheChange", _onCacheChange);
}

if (request.getAttribute("alloy:io-request:onCfgChange") != null) {
	scopedAttributes.put("onCfgChange", _onCfgChange);
}

if (request.getAttribute("alloy:io-request:onContextChange") != null) {
	scopedAttributes.put("onContextChange", _onContextChange);
}

if (request.getAttribute("alloy:io-request:onDataChange") != null) {
	scopedAttributes.put("onDataChange", _onDataChange);
}

if (request.getAttribute("alloy:io-request:onDataTypeChange") != null) {
	scopedAttributes.put("onDataTypeChange", _onDataTypeChange);
}

if (request.getAttribute("alloy:io-request:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:io-request:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:io-request:onFormChange") != null) {
	scopedAttributes.put("onFormChange", _onFormChange);
}

if (request.getAttribute("alloy:io-request:onHeadersChange") != null) {
	scopedAttributes.put("onHeadersChange", _onHeadersChange);
}

if (request.getAttribute("alloy:io-request:onHostChange") != null) {
	scopedAttributes.put("onHostChange", _onHostChange);
}

if (request.getAttribute("alloy:io-request:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:io-request:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:io-request:onComplete") != null) {
	scopedAttributes.put("onComplete", _onComplete);
}

if (request.getAttribute("alloy:io-request:onEnd") != null) {
	scopedAttributes.put("onEnd", _onEnd);
}

if (request.getAttribute("alloy:io-request:onFailure") != null) {
	scopedAttributes.put("onFailure", _onFailure);
}

if (request.getAttribute("alloy:io-request:onStart") != null) {
	scopedAttributes.put("onStart", _onStart);
}

if (request.getAttribute("alloy:io-request:onSuccess") != null) {
	scopedAttributes.put("onSuccess", _onSuccess);
}

if (request.getAttribute("alloy:io-request:onXdrReady") != null) {
	scopedAttributes.put("onXdrReady", _onXdrReady);
}

if (request.getAttribute("alloy:io-request:onMethodChange") != null) {
	scopedAttributes.put("onMethodChange", _onMethodChange);
}

if (request.getAttribute("alloy:io-request:onResponseDataChange") != null) {
	scopedAttributes.put("onResponseDataChange", _onResponseDataChange);
}

if (request.getAttribute("alloy:io-request:onSyncChange") != null) {
	scopedAttributes.put("onSyncChange", _onSyncChange);
}

if (request.getAttribute("alloy:io-request:onTimeoutChange") != null) {
	scopedAttributes.put("onTimeoutChange", _onTimeoutChange);
}

if (request.getAttribute("alloy:io-request:onTransactionChange") != null) {
	scopedAttributes.put("onTransactionChange", _onTransactionChange);
}

if (request.getAttribute("alloy:io-request:onUriChange") != null) {
	scopedAttributes.put("onUriChange", _onUriChange);
}

if (request.getAttribute("alloy:io-request:onXdrChange") != null) {
	scopedAttributes.put("onXdrChange", _onXdrChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>