package com.liferay.alloy.taglib.alloy.base;

import com.liferay.alloy.taglib.util.IncludeTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseIORequestTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseIORequestTag extends IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.Boolean getActive() {
		return _active;
	}

	public java.lang.Object getArguments() {
		return _arguments;
	}

	public java.lang.Boolean getAutoLoad() {
		return _autoLoad;
	}

	public java.lang.Boolean getCache() {
		return _cache;
	}

	public java.lang.String getCfg() {
		return _cfg;
	}

	public java.lang.Object getContext() {
		return _context;
	}

	public java.lang.Object getData() {
		return _data;
	}

	public java.lang.String getDataType() {
		return _dataType;
	}

	public java.lang.Boolean getDestroyed() {
		return _destroyed;
	}

	public java.lang.Object getForm() {
		return _form;
	}

	public java.lang.Object getHeaders() {
		return _headers;
	}

	public java.lang.String getHost() {
		return _host;
	}

	public java.lang.Boolean getInitialized() {
		return _initialized;
	}

	public java.lang.String getMethod() {
		return _method;
	}

	public java.lang.String getResponseData() {
		return _responseData;
	}

	public java.lang.Boolean getSync() {
		return _sync;
	}

	public java.lang.Number getTimeout() {
		return _timeout;
	}

	public java.lang.Object getTransaction() {
		return _transaction;
	}

	public java.lang.String getUri() {
		return _uri;
	}

	public java.lang.Object getXdr() {
		return _xdr;
	}

	public java.lang.String getAfterActiveChange() {
		return _afterActiveChange;
	}

	public java.lang.String getAfterArgumentsChange() {
		return _afterArgumentsChange;
	}

	public java.lang.String getAfterAutoLoadChange() {
		return _afterAutoLoadChange;
	}

	public java.lang.String getAfterCacheChange() {
		return _afterCacheChange;
	}

	public java.lang.String getAfterCfgChange() {
		return _afterCfgChange;
	}

	public java.lang.String getAfterContextChange() {
		return _afterContextChange;
	}

	public java.lang.String getAfterDataChange() {
		return _afterDataChange;
	}

	public java.lang.String getAfterDataTypeChange() {
		return _afterDataTypeChange;
	}

	public java.lang.String getAfterDestroy() {
		return _afterDestroy;
	}

	public java.lang.String getAfterDestroyedChange() {
		return _afterDestroyedChange;
	}

	public java.lang.String getAfterFormChange() {
		return _afterFormChange;
	}

	public java.lang.String getAfterHeadersChange() {
		return _afterHeadersChange;
	}

	public java.lang.String getAfterHostChange() {
		return _afterHostChange;
	}

	public java.lang.String getAfterInit() {
		return _afterInit;
	}

	public java.lang.String getAfterInitializedChange() {
		return _afterInitializedChange;
	}

	public java.lang.String getAfterComplete() {
		return _afterComplete;
	}

	public java.lang.String getAfterEnd() {
		return _afterEnd;
	}

	public java.lang.String getAfterFailure() {
		return _afterFailure;
	}

	public java.lang.String getAfterStart() {
		return _afterStart;
	}

	public java.lang.String getAfterSuccess() {
		return _afterSuccess;
	}

	public java.lang.String getAfterXdrReady() {
		return _afterXdrReady;
	}

	public java.lang.String getAfterMethodChange() {
		return _afterMethodChange;
	}

	public java.lang.String getAfterResponseDataChange() {
		return _afterResponseDataChange;
	}

	public java.lang.String getAfterSyncChange() {
		return _afterSyncChange;
	}

	public java.lang.String getAfterTimeoutChange() {
		return _afterTimeoutChange;
	}

	public java.lang.String getAfterTransactionChange() {
		return _afterTransactionChange;
	}

	public java.lang.String getAfterUriChange() {
		return _afterUriChange;
	}

	public java.lang.String getAfterXdrChange() {
		return _afterXdrChange;
	}

	public java.lang.String getOnActiveChange() {
		return _onActiveChange;
	}

	public java.lang.String getOnArgumentsChange() {
		return _onArgumentsChange;
	}

	public java.lang.String getOnAutoLoadChange() {
		return _onAutoLoadChange;
	}

	public java.lang.String getOnCacheChange() {
		return _onCacheChange;
	}

	public java.lang.String getOnCfgChange() {
		return _onCfgChange;
	}

	public java.lang.String getOnContextChange() {
		return _onContextChange;
	}

	public java.lang.String getOnDataChange() {
		return _onDataChange;
	}

	public java.lang.String getOnDataTypeChange() {
		return _onDataTypeChange;
	}

	public java.lang.String getOnDestroy() {
		return _onDestroy;
	}

	public java.lang.String getOnDestroyedChange() {
		return _onDestroyedChange;
	}

	public java.lang.String getOnFormChange() {
		return _onFormChange;
	}

	public java.lang.String getOnHeadersChange() {
		return _onHeadersChange;
	}

	public java.lang.String getOnHostChange() {
		return _onHostChange;
	}

	public java.lang.String getOnInit() {
		return _onInit;
	}

	public java.lang.String getOnInitializedChange() {
		return _onInitializedChange;
	}

	public java.lang.String getOnComplete() {
		return _onComplete;
	}

	public java.lang.String getOnEnd() {
		return _onEnd;
	}

	public java.lang.String getOnFailure() {
		return _onFailure;
	}

	public java.lang.String getOnStart() {
		return _onStart;
	}

	public java.lang.String getOnSuccess() {
		return _onSuccess;
	}

	public java.lang.String getOnXdrReady() {
		return _onXdrReady;
	}

	public java.lang.String getOnMethodChange() {
		return _onMethodChange;
	}

	public java.lang.String getOnResponseDataChange() {
		return _onResponseDataChange;
	}

	public java.lang.String getOnSyncChange() {
		return _onSyncChange;
	}

	public java.lang.String getOnTimeoutChange() {
		return _onTimeoutChange;
	}

	public java.lang.String getOnTransactionChange() {
		return _onTransactionChange;
	}

	public java.lang.String getOnUriChange() {
		return _onUriChange;
	}

	public java.lang.String getOnXdrChange() {
		return _onXdrChange;
	}

	public void setActive(java.lang.Boolean active) {
		_active = active;

		setScopedAttribute("active", active);
	}

	public void setArguments(java.lang.Object arguments) {
		_arguments = arguments;

		setScopedAttribute("arguments", arguments);
	}

	public void setAutoLoad(java.lang.Boolean autoLoad) {
		_autoLoad = autoLoad;

		setScopedAttribute("autoLoad", autoLoad);
	}

	public void setCache(java.lang.Boolean cache) {
		_cache = cache;

		setScopedAttribute("cache", cache);
	}

	public void setCfg(java.lang.String cfg) {
		_cfg = cfg;

		setScopedAttribute("cfg", cfg);
	}

	public void setContext(java.lang.Object context) {
		_context = context;

		setScopedAttribute("context", context);
	}

	public void setData(java.lang.Object data) {
		_data = data;

		setScopedAttribute("data", data);
	}

	public void setDataType(java.lang.String dataType) {
		_dataType = dataType;

		setScopedAttribute("dataType", dataType);
	}

	public void setDestroyed(java.lang.Boolean destroyed) {
		_destroyed = destroyed;

		setScopedAttribute("destroyed", destroyed);
	}

	public void setForm(java.lang.Object form) {
		_form = form;

		setScopedAttribute("form", form);
	}

	public void setHeaders(java.lang.Object headers) {
		_headers = headers;

		setScopedAttribute("headers", headers);
	}

	public void setHost(java.lang.String host) {
		_host = host;

		setScopedAttribute("host", host);
	}

	public void setInitialized(java.lang.Boolean initialized) {
		_initialized = initialized;

		setScopedAttribute("initialized", initialized);
	}

	public void setMethod(java.lang.String method) {
		_method = method;

		setScopedAttribute("method", method);
	}

	public void setResponseData(java.lang.String responseData) {
		_responseData = responseData;

		setScopedAttribute("responseData", responseData);
	}

	public void setSync(java.lang.Boolean sync) {
		_sync = sync;

		setScopedAttribute("sync", sync);
	}

	public void setTimeout(java.lang.Number timeout) {
		_timeout = timeout;

		setScopedAttribute("timeout", timeout);
	}

	public void setTransaction(java.lang.Object transaction) {
		_transaction = transaction;

		setScopedAttribute("transaction", transaction);
	}

	public void setUri(java.lang.String uri) {
		_uri = uri;

		setScopedAttribute("uri", uri);
	}

	public void setXdr(java.lang.Object xdr) {
		_xdr = xdr;

		setScopedAttribute("xdr", xdr);
	}

	public void setAfterActiveChange(java.lang.String afterActiveChange) {
		_afterActiveChange = afterActiveChange;

		setScopedAttribute("afterActiveChange", afterActiveChange);
	}

	public void setAfterArgumentsChange(java.lang.String afterArgumentsChange) {
		_afterArgumentsChange = afterArgumentsChange;

		setScopedAttribute("afterArgumentsChange", afterArgumentsChange);
	}

	public void setAfterAutoLoadChange(java.lang.String afterAutoLoadChange) {
		_afterAutoLoadChange = afterAutoLoadChange;

		setScopedAttribute("afterAutoLoadChange", afterAutoLoadChange);
	}

	public void setAfterCacheChange(java.lang.String afterCacheChange) {
		_afterCacheChange = afterCacheChange;

		setScopedAttribute("afterCacheChange", afterCacheChange);
	}

	public void setAfterCfgChange(java.lang.String afterCfgChange) {
		_afterCfgChange = afterCfgChange;

		setScopedAttribute("afterCfgChange", afterCfgChange);
	}

	public void setAfterContextChange(java.lang.String afterContextChange) {
		_afterContextChange = afterContextChange;

		setScopedAttribute("afterContextChange", afterContextChange);
	}

	public void setAfterDataChange(java.lang.String afterDataChange) {
		_afterDataChange = afterDataChange;

		setScopedAttribute("afterDataChange", afterDataChange);
	}

	public void setAfterDataTypeChange(java.lang.String afterDataTypeChange) {
		_afterDataTypeChange = afterDataTypeChange;

		setScopedAttribute("afterDataTypeChange", afterDataTypeChange);
	}

	public void setAfterDestroy(java.lang.String afterDestroy) {
		_afterDestroy = afterDestroy;

		setScopedAttribute("afterDestroy", afterDestroy);
	}

	public void setAfterDestroyedChange(java.lang.String afterDestroyedChange) {
		_afterDestroyedChange = afterDestroyedChange;

		setScopedAttribute("afterDestroyedChange", afterDestroyedChange);
	}

	public void setAfterFormChange(java.lang.String afterFormChange) {
		_afterFormChange = afterFormChange;

		setScopedAttribute("afterFormChange", afterFormChange);
	}

	public void setAfterHeadersChange(java.lang.String afterHeadersChange) {
		_afterHeadersChange = afterHeadersChange;

		setScopedAttribute("afterHeadersChange", afterHeadersChange);
	}

	public void setAfterHostChange(java.lang.String afterHostChange) {
		_afterHostChange = afterHostChange;

		setScopedAttribute("afterHostChange", afterHostChange);
	}

	public void setAfterInit(java.lang.String afterInit) {
		_afterInit = afterInit;

		setScopedAttribute("afterInit", afterInit);
	}

	public void setAfterInitializedChange(java.lang.String afterInitializedChange) {
		_afterInitializedChange = afterInitializedChange;

		setScopedAttribute("afterInitializedChange", afterInitializedChange);
	}

	public void setAfterComplete(java.lang.String afterComplete) {
		_afterComplete = afterComplete;

		setScopedAttribute("afterComplete", afterComplete);
	}

	public void setAfterEnd(java.lang.String afterEnd) {
		_afterEnd = afterEnd;

		setScopedAttribute("afterEnd", afterEnd);
	}

	public void setAfterFailure(java.lang.String afterFailure) {
		_afterFailure = afterFailure;

		setScopedAttribute("afterFailure", afterFailure);
	}

	public void setAfterStart(java.lang.String afterStart) {
		_afterStart = afterStart;

		setScopedAttribute("afterStart", afterStart);
	}

	public void setAfterSuccess(java.lang.String afterSuccess) {
		_afterSuccess = afterSuccess;

		setScopedAttribute("afterSuccess", afterSuccess);
	}

	public void setAfterXdrReady(java.lang.String afterXdrReady) {
		_afterXdrReady = afterXdrReady;

		setScopedAttribute("afterXdrReady", afterXdrReady);
	}

	public void setAfterMethodChange(java.lang.String afterMethodChange) {
		_afterMethodChange = afterMethodChange;

		setScopedAttribute("afterMethodChange", afterMethodChange);
	}

	public void setAfterResponseDataChange(java.lang.String afterResponseDataChange) {
		_afterResponseDataChange = afterResponseDataChange;

		setScopedAttribute("afterResponseDataChange", afterResponseDataChange);
	}

	public void setAfterSyncChange(java.lang.String afterSyncChange) {
		_afterSyncChange = afterSyncChange;

		setScopedAttribute("afterSyncChange", afterSyncChange);
	}

	public void setAfterTimeoutChange(java.lang.String afterTimeoutChange) {
		_afterTimeoutChange = afterTimeoutChange;

		setScopedAttribute("afterTimeoutChange", afterTimeoutChange);
	}

	public void setAfterTransactionChange(java.lang.String afterTransactionChange) {
		_afterTransactionChange = afterTransactionChange;

		setScopedAttribute("afterTransactionChange", afterTransactionChange);
	}

	public void setAfterUriChange(java.lang.String afterUriChange) {
		_afterUriChange = afterUriChange;

		setScopedAttribute("afterUriChange", afterUriChange);
	}

	public void setAfterXdrChange(java.lang.String afterXdrChange) {
		_afterXdrChange = afterXdrChange;

		setScopedAttribute("afterXdrChange", afterXdrChange);
	}

	public void setOnActiveChange(java.lang.String onActiveChange) {
		_onActiveChange = onActiveChange;

		setScopedAttribute("onActiveChange", onActiveChange);
	}

	public void setOnArgumentsChange(java.lang.String onArgumentsChange) {
		_onArgumentsChange = onArgumentsChange;

		setScopedAttribute("onArgumentsChange", onArgumentsChange);
	}

	public void setOnAutoLoadChange(java.lang.String onAutoLoadChange) {
		_onAutoLoadChange = onAutoLoadChange;

		setScopedAttribute("onAutoLoadChange", onAutoLoadChange);
	}

	public void setOnCacheChange(java.lang.String onCacheChange) {
		_onCacheChange = onCacheChange;

		setScopedAttribute("onCacheChange", onCacheChange);
	}

	public void setOnCfgChange(java.lang.String onCfgChange) {
		_onCfgChange = onCfgChange;

		setScopedAttribute("onCfgChange", onCfgChange);
	}

	public void setOnContextChange(java.lang.String onContextChange) {
		_onContextChange = onContextChange;

		setScopedAttribute("onContextChange", onContextChange);
	}

	public void setOnDataChange(java.lang.String onDataChange) {
		_onDataChange = onDataChange;

		setScopedAttribute("onDataChange", onDataChange);
	}

	public void setOnDataTypeChange(java.lang.String onDataTypeChange) {
		_onDataTypeChange = onDataTypeChange;

		setScopedAttribute("onDataTypeChange", onDataTypeChange);
	}

	public void setOnDestroy(java.lang.String onDestroy) {
		_onDestroy = onDestroy;

		setScopedAttribute("onDestroy", onDestroy);
	}

	public void setOnDestroyedChange(java.lang.String onDestroyedChange) {
		_onDestroyedChange = onDestroyedChange;

		setScopedAttribute("onDestroyedChange", onDestroyedChange);
	}

	public void setOnFormChange(java.lang.String onFormChange) {
		_onFormChange = onFormChange;

		setScopedAttribute("onFormChange", onFormChange);
	}

	public void setOnHeadersChange(java.lang.String onHeadersChange) {
		_onHeadersChange = onHeadersChange;

		setScopedAttribute("onHeadersChange", onHeadersChange);
	}

	public void setOnHostChange(java.lang.String onHostChange) {
		_onHostChange = onHostChange;

		setScopedAttribute("onHostChange", onHostChange);
	}

	public void setOnInit(java.lang.String onInit) {
		_onInit = onInit;

		setScopedAttribute("onInit", onInit);
	}

	public void setOnInitializedChange(java.lang.String onInitializedChange) {
		_onInitializedChange = onInitializedChange;

		setScopedAttribute("onInitializedChange", onInitializedChange);
	}

	public void setOnComplete(java.lang.String onComplete) {
		_onComplete = onComplete;

		setScopedAttribute("onComplete", onComplete);
	}

	public void setOnEnd(java.lang.String onEnd) {
		_onEnd = onEnd;

		setScopedAttribute("onEnd", onEnd);
	}

	public void setOnFailure(java.lang.String onFailure) {
		_onFailure = onFailure;

		setScopedAttribute("onFailure", onFailure);
	}

	public void setOnStart(java.lang.String onStart) {
		_onStart = onStart;

		setScopedAttribute("onStart", onStart);
	}

	public void setOnSuccess(java.lang.String onSuccess) {
		_onSuccess = onSuccess;

		setScopedAttribute("onSuccess", onSuccess);
	}

	public void setOnXdrReady(java.lang.String onXdrReady) {
		_onXdrReady = onXdrReady;

		setScopedAttribute("onXdrReady", onXdrReady);
	}

	public void setOnMethodChange(java.lang.String onMethodChange) {
		_onMethodChange = onMethodChange;

		setScopedAttribute("onMethodChange", onMethodChange);
	}

	public void setOnResponseDataChange(java.lang.String onResponseDataChange) {
		_onResponseDataChange = onResponseDataChange;

		setScopedAttribute("onResponseDataChange", onResponseDataChange);
	}

	public void setOnSyncChange(java.lang.String onSyncChange) {
		_onSyncChange = onSyncChange;

		setScopedAttribute("onSyncChange", onSyncChange);
	}

	public void setOnTimeoutChange(java.lang.String onTimeoutChange) {
		_onTimeoutChange = onTimeoutChange;

		setScopedAttribute("onTimeoutChange", onTimeoutChange);
	}

	public void setOnTransactionChange(java.lang.String onTransactionChange) {
		_onTransactionChange = onTransactionChange;

		setScopedAttribute("onTransactionChange", onTransactionChange);
	}

	public void setOnUriChange(java.lang.String onUriChange) {
		_onUriChange = onUriChange;

		setScopedAttribute("onUriChange", onUriChange);
	}

	public void setOnXdrChange(java.lang.String onXdrChange) {
		_onXdrChange = onXdrChange;

		setScopedAttribute("onXdrChange", onXdrChange);
	}

	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "active", _active);
		setNamespacedAttribute(request, "arguments", _arguments);
		setNamespacedAttribute(request, "autoLoad", _autoLoad);
		setNamespacedAttribute(request, "cache", _cache);
		setNamespacedAttribute(request, "cfg", _cfg);
		setNamespacedAttribute(request, "context", _context);
		setNamespacedAttribute(request, "data", _data);
		setNamespacedAttribute(request, "dataType", _dataType);
		setNamespacedAttribute(request, "destroyed", _destroyed);
		setNamespacedAttribute(request, "form", _form);
		setNamespacedAttribute(request, "headers", _headers);
		setNamespacedAttribute(request, "host", _host);
		setNamespacedAttribute(request, "initialized", _initialized);
		setNamespacedAttribute(request, "method", _method);
		setNamespacedAttribute(request, "responseData", _responseData);
		setNamespacedAttribute(request, "sync", _sync);
		setNamespacedAttribute(request, "timeout", _timeout);
		setNamespacedAttribute(request, "transaction", _transaction);
		setNamespacedAttribute(request, "uri", _uri);
		setNamespacedAttribute(request, "xdr", _xdr);
		setNamespacedAttribute(request, "afterActiveChange", _afterActiveChange);
		setNamespacedAttribute(request, "afterArgumentsChange", _afterArgumentsChange);
		setNamespacedAttribute(request, "afterAutoLoadChange", _afterAutoLoadChange);
		setNamespacedAttribute(request, "afterCacheChange", _afterCacheChange);
		setNamespacedAttribute(request, "afterCfgChange", _afterCfgChange);
		setNamespacedAttribute(request, "afterContextChange", _afterContextChange);
		setNamespacedAttribute(request, "afterDataChange", _afterDataChange);
		setNamespacedAttribute(request, "afterDataTypeChange", _afterDataTypeChange);
		setNamespacedAttribute(request, "afterDestroy", _afterDestroy);
		setNamespacedAttribute(request, "afterDestroyedChange", _afterDestroyedChange);
		setNamespacedAttribute(request, "afterFormChange", _afterFormChange);
		setNamespacedAttribute(request, "afterHeadersChange", _afterHeadersChange);
		setNamespacedAttribute(request, "afterHostChange", _afterHostChange);
		setNamespacedAttribute(request, "afterInit", _afterInit);
		setNamespacedAttribute(request, "afterInitializedChange", _afterInitializedChange);
		setNamespacedAttribute(request, "afterComplete", _afterComplete);
		setNamespacedAttribute(request, "afterEnd", _afterEnd);
		setNamespacedAttribute(request, "afterFailure", _afterFailure);
		setNamespacedAttribute(request, "afterStart", _afterStart);
		setNamespacedAttribute(request, "afterSuccess", _afterSuccess);
		setNamespacedAttribute(request, "afterXdrReady", _afterXdrReady);
		setNamespacedAttribute(request, "afterMethodChange", _afterMethodChange);
		setNamespacedAttribute(request, "afterResponseDataChange", _afterResponseDataChange);
		setNamespacedAttribute(request, "afterSyncChange", _afterSyncChange);
		setNamespacedAttribute(request, "afterTimeoutChange", _afterTimeoutChange);
		setNamespacedAttribute(request, "afterTransactionChange", _afterTransactionChange);
		setNamespacedAttribute(request, "afterUriChange", _afterUriChange);
		setNamespacedAttribute(request, "afterXdrChange", _afterXdrChange);
		setNamespacedAttribute(request, "onActiveChange", _onActiveChange);
		setNamespacedAttribute(request, "onArgumentsChange", _onArgumentsChange);
		setNamespacedAttribute(request, "onAutoLoadChange", _onAutoLoadChange);
		setNamespacedAttribute(request, "onCacheChange", _onCacheChange);
		setNamespacedAttribute(request, "onCfgChange", _onCfgChange);
		setNamespacedAttribute(request, "onContextChange", _onContextChange);
		setNamespacedAttribute(request, "onDataChange", _onDataChange);
		setNamespacedAttribute(request, "onDataTypeChange", _onDataTypeChange);
		setNamespacedAttribute(request, "onDestroy", _onDestroy);
		setNamespacedAttribute(request, "onDestroyedChange", _onDestroyedChange);
		setNamespacedAttribute(request, "onFormChange", _onFormChange);
		setNamespacedAttribute(request, "onHeadersChange", _onHeadersChange);
		setNamespacedAttribute(request, "onHostChange", _onHostChange);
		setNamespacedAttribute(request, "onInit", _onInit);
		setNamespacedAttribute(request, "onInitializedChange", _onInitializedChange);
		setNamespacedAttribute(request, "onComplete", _onComplete);
		setNamespacedAttribute(request, "onEnd", _onEnd);
		setNamespacedAttribute(request, "onFailure", _onFailure);
		setNamespacedAttribute(request, "onStart", _onStart);
		setNamespacedAttribute(request, "onSuccess", _onSuccess);
		setNamespacedAttribute(request, "onXdrReady", _onXdrReady);
		setNamespacedAttribute(request, "onMethodChange", _onMethodChange);
		setNamespacedAttribute(request, "onResponseDataChange", _onResponseDataChange);
		setNamespacedAttribute(request, "onSyncChange", _onSyncChange);
		setNamespacedAttribute(request, "onTimeoutChange", _onTimeoutChange);
		setNamespacedAttribute(request, "onTransactionChange", _onTransactionChange);
		setNamespacedAttribute(request, "onUriChange", _onUriChange);
		setNamespacedAttribute(request, "onXdrChange", _onXdrChange);
	}

	private static final String _ATTRIBUTE_NAMESPACE = "alloy:io-request:";

	private static final String _PAGE =
		"/html/taglib/alloy/io_request/page.jsp";

	private java.lang.Boolean _active;
	private java.lang.Object _arguments;
	private java.lang.Boolean _autoLoad;
	private java.lang.Boolean _cache;
	private java.lang.String _cfg;
	private java.lang.Object _context;
	private java.lang.Object _data;
	private java.lang.String _dataType;
	private java.lang.Boolean _destroyed;
	private java.lang.Object _form;
	private java.lang.Object _headers;
	private java.lang.String _host;
	private java.lang.Boolean _initialized;
	private java.lang.String _method;
	private java.lang.String _responseData;
	private java.lang.Boolean _sync;
	private java.lang.Number _timeout;
	private java.lang.Object _transaction;
	private java.lang.String _uri;
	private java.lang.Object _xdr;
	private java.lang.String _afterActiveChange;
	private java.lang.String _afterArgumentsChange;
	private java.lang.String _afterAutoLoadChange;
	private java.lang.String _afterCacheChange;
	private java.lang.String _afterCfgChange;
	private java.lang.String _afterContextChange;
	private java.lang.String _afterDataChange;
	private java.lang.String _afterDataTypeChange;
	private java.lang.String _afterDestroy;
	private java.lang.String _afterDestroyedChange;
	private java.lang.String _afterFormChange;
	private java.lang.String _afterHeadersChange;
	private java.lang.String _afterHostChange;
	private java.lang.String _afterInit;
	private java.lang.String _afterInitializedChange;
	private java.lang.String _afterComplete;
	private java.lang.String _afterEnd;
	private java.lang.String _afterFailure;
	private java.lang.String _afterStart;
	private java.lang.String _afterSuccess;
	private java.lang.String _afterXdrReady;
	private java.lang.String _afterMethodChange;
	private java.lang.String _afterResponseDataChange;
	private java.lang.String _afterSyncChange;
	private java.lang.String _afterTimeoutChange;
	private java.lang.String _afterTransactionChange;
	private java.lang.String _afterUriChange;
	private java.lang.String _afterXdrChange;
	private java.lang.String _onActiveChange;
	private java.lang.String _onArgumentsChange;
	private java.lang.String _onAutoLoadChange;
	private java.lang.String _onCacheChange;
	private java.lang.String _onCfgChange;
	private java.lang.String _onContextChange;
	private java.lang.String _onDataChange;
	private java.lang.String _onDataTypeChange;
	private java.lang.String _onDestroy;
	private java.lang.String _onDestroyedChange;
	private java.lang.String _onFormChange;
	private java.lang.String _onHeadersChange;
	private java.lang.String _onHostChange;
	private java.lang.String _onInit;
	private java.lang.String _onInitializedChange;
	private java.lang.String _onComplete;
	private java.lang.String _onEnd;
	private java.lang.String _onFailure;
	private java.lang.String _onStart;
	private java.lang.String _onSuccess;
	private java.lang.String _onXdrReady;
	private java.lang.String _onMethodChange;
	private java.lang.String _onResponseDataChange;
	private java.lang.String _onSyncChange;
	private java.lang.String _onTimeoutChange;
	private java.lang.String _onTransactionChange;
	private java.lang.String _onUriChange;
	private java.lang.String _onXdrChange;

}
