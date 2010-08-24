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

java.lang.Boolean _active = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:io-request:active"));
java.lang.Object _arguments = (java.lang.Object)request.getAttribute("alloy:io-request:arguments");
java.lang.Boolean _autoLoad = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:io-request:autoLoad"));
java.lang.Boolean _cache = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:io-request:cache"));
java.lang.String _cfg = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:cfg"));
java.lang.Object _context = (java.lang.Object)request.getAttribute("alloy:io-request:context");
java.lang.Object _data = (java.lang.Object)request.getAttribute("alloy:io-request:data");
java.lang.String _dataType = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:dataType"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:io-request:destroyed"));
java.lang.Object _form = (java.lang.Object)request.getAttribute("alloy:io-request:form");
java.lang.Object _headers = (java.lang.Object)request.getAttribute("alloy:io-request:headers");
java.lang.String _host = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:host"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:io-request:initialized"));
java.lang.String _method = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:method"));
java.lang.String _responseData = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:responseData"));
java.lang.Boolean _sync = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:io-request:sync"));
java.lang.Number _timeout = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:io-request:timeout"));
java.lang.Object _transaction = (java.lang.Object)request.getAttribute("alloy:io-request:transaction");
java.lang.String _uri = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:uri"));
java.lang.Object _xdr = (java.lang.Object)request.getAttribute("alloy:io-request:xdr");
java.lang.String _afterActiveChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterActiveChange"));
java.lang.String _afterArgumentsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterArgumentsChange"));
java.lang.String _afterAutoLoadChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterAutoLoadChange"));
java.lang.String _afterCacheChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterCacheChange"));
java.lang.String _afterCfgChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterCfgChange"));
java.lang.String _afterContextChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterContextChange"));
java.lang.String _afterDataChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterDataChange"));
java.lang.String _afterDataTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterDataTypeChange"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterDestroyedChange"));
java.lang.String _afterFormChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterFormChange"));
java.lang.String _afterHeadersChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterHeadersChange"));
java.lang.String _afterHostChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterHostChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterInitializedChange"));
java.lang.String _afterComplete = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterComplete"));
java.lang.String _afterEnd = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterEnd"));
java.lang.String _afterFailure = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterFailure"));
java.lang.String _afterStart = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterStart"));
java.lang.String _afterSuccess = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterSuccess"));
java.lang.String _afterXdrReady = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterXdrReady"));
java.lang.String _afterMethodChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterMethodChange"));
java.lang.String _afterResponseDataChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterResponseDataChange"));
java.lang.String _afterSyncChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterSyncChange"));
java.lang.String _afterTimeoutChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterTimeoutChange"));
java.lang.String _afterTransactionChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterTransactionChange"));
java.lang.String _afterUriChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterUriChange"));
java.lang.String _afterXdrChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:afterXdrChange"));
java.lang.String _onActiveChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onActiveChange"));
java.lang.String _onArgumentsChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onArgumentsChange"));
java.lang.String _onAutoLoadChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onAutoLoadChange"));
java.lang.String _onCacheChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onCacheChange"));
java.lang.String _onCfgChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onCfgChange"));
java.lang.String _onContextChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onContextChange"));
java.lang.String _onDataChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onDataChange"));
java.lang.String _onDataTypeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onDataTypeChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onDestroyedChange"));
java.lang.String _onFormChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onFormChange"));
java.lang.String _onHeadersChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onHeadersChange"));
java.lang.String _onHostChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onHostChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onInitializedChange"));
java.lang.String _onComplete = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onComplete"));
java.lang.String _onEnd = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onEnd"));
java.lang.String _onFailure = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onFailure"));
java.lang.String _onStart = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onStart"));
java.lang.String _onSuccess = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onSuccess"));
java.lang.String _onXdrReady = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onXdrReady"));
java.lang.String _onMethodChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onMethodChange"));
java.lang.String _onResponseDataChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onResponseDataChange"));
java.lang.String _onSyncChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onSyncChange"));
java.lang.String _onTimeoutChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onTimeoutChange"));
java.lang.String _onTransactionChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onTransactionChange"));
java.lang.String _onUriChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onUriChange"));
java.lang.String _onXdrChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:io-request:onXdrChange"));
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