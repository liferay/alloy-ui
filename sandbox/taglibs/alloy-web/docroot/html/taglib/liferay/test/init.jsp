<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
java.lang.String NAMESPACE = "liferay:test:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("liferay:test:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("liferay:test:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.String _test = GetterUtil.getString((java.lang.String)request.getAttribute("liferay:test:test"));

_updateOptions(options, "test", _test);
%>

<%@ include file="init-ext.jsp" %>