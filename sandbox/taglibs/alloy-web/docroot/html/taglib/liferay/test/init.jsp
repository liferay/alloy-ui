<%@ include file="/html/taglib/init-taglib.jsp" %>

<%
java.lang.String NAMESPACE = "liferay:test:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("liferay:test:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("liferay:test:scopedAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

java.lang.String test = GetterUtil.getString((java.lang.String)request.getAttribute("liferay:test:test"));

_updateOptions(_options, "test", test);
%>

<%@ include file="init-ext.jsp" %>