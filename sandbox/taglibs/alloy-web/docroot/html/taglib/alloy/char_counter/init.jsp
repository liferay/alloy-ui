<%@ page import="java.io.Serializable"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.Locale"%>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.Set"%>
<%@ page import="com.liferay.alloy.util.PropsValues"%>
<%@ page import="com.liferay.alloy.util.GetterUtil" %>
<%@ page import="com.liferay.alloy.util.JSONFactoryUtil"%>
<%@ page import="com.liferay.alloy.util.MarkupUtil"%>
<%@ page import="com.liferay.alloy.util.StringUtil"%>
<%@ page import="com.liferay.portal.kernel.servlet.taglib.aui.ScriptData"%>
<%@ page import="com.liferay.portal.kernel.util.StringBundler"%>
<%@ page import="com.liferay.portal.kernel.util.StringPool" %>
<%@ page import="com.liferay.portal.kernel.util.Validator"%>
<%@ page import="org.json.JSONObject" %>
<%@ page import="org.json.JSONArray" %>

<%!
public static void _updateOptions(Map<String, Object> options, String key, Object value) {
	if ((options != null) && options.containsKey(key)) {
		options.put(key, value);
	}
}
%>

<%
java.lang.String NAMESPACE = "alloy:char-counter:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.lang.Object _counter = (java.lang.Object)request.getAttribute("alloy:char-counter:counter");
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:char-counter:destroyed"), false);
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:char-counter:initialized"), false);
java.lang.Object _input = (java.lang.Object)request.getAttribute("alloy:char-counter:input");
java.lang.Number _maxLength = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:char-counter:maxLength")), 2147483647);
java.lang.Object _afterCounterChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterCounterChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:char-counter:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterDestroyedChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:char-counter:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterInitializedChange");
java.lang.Object _afterInputChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterInputChange");
java.lang.Object _afterMaxLengthChange = (java.lang.Object)request.getAttribute("alloy:char-counter:afterMaxLengthChange");
java.lang.Object _onCounterChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onCounterChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:char-counter:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onDestroyedChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:char-counter:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onInitializedChange");
java.lang.Object _onInputChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onInputChange");
java.lang.Object _onMaxLengthChange = (java.lang.Object)request.getAttribute("alloy:char-counter:onMaxLengthChange");

_updateOptions(options, "counter", _counter);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "input", _input);
_updateOptions(options, "maxLength", _maxLength);
_updateOptions(options, "afterCounterChange", _afterCounterChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterInputChange", _afterInputChange);
_updateOptions(options, "afterMaxLengthChange", _afterMaxLengthChange);
_updateOptions(options, "onCounterChange", _onCounterChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onInputChange", _onInputChange);
_updateOptions(options, "onMaxLengthChange", _onMaxLengthChange);
%>

<%@ include file="init-ext.jsp" %>