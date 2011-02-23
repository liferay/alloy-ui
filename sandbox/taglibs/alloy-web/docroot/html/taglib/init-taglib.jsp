<%@ page import="java.io.Serializable" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Locale" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.Set" %>
<%@ page import="com.liferay.alloy.util.MarkupUtil" %>
<%@ page import="com.liferay.alloy.util.MessageUtil" %>
<%@ page import="com.liferay.portal.json.JSONFactoryImpl" %>
<%@ page import="com.liferay.portal.kernel.json.JSONFactoryUtil" %>
<%@ page import="com.liferay.portal.kernel.servlet.taglib.aui.ScriptData" %>
<%@ page import="com.liferay.portal.kernel.util.GetterUtil" %>
<%@ page import="com.liferay.portal.kernel.util.StringBundler" %>
<%@ page import="com.liferay.portal.kernel.util.StringPool" %>
<%@ page import="com.liferay.portal.kernel.util.StringUtil" %>
<%@ page import="com.liferay.portal.kernel.util.Validator" %>
<%@ page import="com.liferay.portal.kernel.servlet.taglib.CustomAttributes" %>

<%!
public static ArrayList<Object> _getArrayList(Object obj) {
	return (ArrayList<Object>)_safeDeserialize(obj);
}

public static HashMap<String, Object> _getHashMap(Object obj) {
	return (HashMap)_safeDeserialize(obj);
}

public static void _initJSONFactoryUtil() {
	if (JSONFactoryUtil.getJSONFactory() == null) {
		(new JSONFactoryUtil()).setJSONFactory(new JSONFactoryImpl());
	}
}

public static Object _safeDeserialize(Object obj) {
	if (Validator.isNotNull(obj)) {
		return JSONFactoryUtil.looseDeserialize(StringUtil.unquote(JSONFactoryUtil.looseSerialize(obj)));
	}

	return null;
}

public static void _updateOptions(Map<String, Object> options, String key, Object value) {
	if ((options != null) && options.containsKey(key)) {
		options.put(key, value);
	}
}
%>

<%
_initJSONFactoryUtil();
%>