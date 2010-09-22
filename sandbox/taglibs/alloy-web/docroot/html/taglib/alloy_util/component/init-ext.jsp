<%@ taglib prefix="alloy-util" uri="http://alloy.liferay.com/tld/alloy_util" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
JSONObject optionsJSON = (JSONObject)request.getAttribute("alloy_util:component:optionsJSON");

Object _render = String.valueOf(_options.get("render"));

if (Validator.isNull(_render)) {
	_render = true;
}
else if (_render.equals("true") || _render.equals("false")) {
	_render = GetterUtil.getBoolean((Serializable)_render);
}

optionsJSON.put("render", _render);

String scriptPosition = GetterUtil.getString((Serializable)_options.get("scriptPosition"), "inline");

boolean useJavaScript = GetterUtil.getBoolean((Serializable)_options.get("useJavaScript"), true);

_defineVar = GetterUtil.getBoolean((Serializable)_options.get("defineVar"), _defineVar);

if (Validator.isNull(_var)) {
	_var = (String)_options.get("var");
}
%>