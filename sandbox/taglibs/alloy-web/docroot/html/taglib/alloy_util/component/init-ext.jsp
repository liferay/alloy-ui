<%@ page import="com.liferay.alloy.util.json.StringTransformer"%>
<%@ page import="java.util.Arrays"%>

<%@ taglib prefix="alloy-util" uri="http://alloy.liferay.com/tld/alloy_util" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
HashMap<String, Object> optionsJSON = (HashMap<String, Object>)request.getAttribute("alloy_util:component:optionsJSON");

Object render = String.valueOf(options.get("render"));

if (Validator.isNull(render)) {
	render = true;
}
else if (render.equals("true") || render.equals("false")) {
	render = GetterUtil.getBoolean((Serializable)render);
}

optionsJSON.put("render", render);

String scriptPosition = GetterUtil.getString((Serializable)options.get("scriptPosition"), "inline");

boolean useJavaScript = GetterUtil.getBoolean((Serializable)options.get("useJavaScript"), true);

defineVar = GetterUtil.getBoolean((Serializable)options.get("defineVar"), defineVar);

if (Validator.isNull(var)) {
	var = (String)options.get("var");
}
%>

<%!
public String _serialize(Object value, String javaScriptAttributes) {
	StringTransformer stringTransformer = new StringTransformer();

	stringTransformer.setJavaScriptAttributes(
		Arrays.asList(StringUtil.split(javaScriptAttributes)));

	return JSONFactoryUtil.looseSerialize(value, stringTransformer, String.class);
}
%>