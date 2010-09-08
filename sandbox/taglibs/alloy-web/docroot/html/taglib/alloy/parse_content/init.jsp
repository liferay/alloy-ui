<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
java.lang.String NAMESPACE = "alloy:parse-content:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:parse-content:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:parse-content:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:parse-content:destroyed"), false);
java.lang.Object _host = (java.lang.Object)request.getAttribute("alloy:parse-content:host");
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:parse-content:initialized"), false);
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:parse-content:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:parse-content:afterDestroyedChange");
java.lang.Object _afterHostChange = (java.lang.Object)request.getAttribute("alloy:parse-content:afterHostChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:parse-content:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:parse-content:afterInitializedChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:parse-content:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:parse-content:onDestroyedChange");
java.lang.Object _onHostChange = (java.lang.Object)request.getAttribute("alloy:parse-content:onHostChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:parse-content:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:parse-content:onInitializedChange");

_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "host", _host);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterHostChange", _afterHostChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onHostChange", _onHostChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
%>

<%@ include file="init-ext.jsp" %>