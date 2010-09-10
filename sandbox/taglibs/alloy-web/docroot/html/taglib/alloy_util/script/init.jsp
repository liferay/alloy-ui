<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
java.lang.String NAMESPACE = "alloy_util:script:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy_util:script:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy_util:script:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.String _position = GetterUtil.getString((java.lang.String)request.getAttribute("alloy_util:script:position"));
java.lang.Boolean _printBuffer = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy_util:script:printBuffer"));
java.lang.String _use = GetterUtil.getString((java.lang.String)request.getAttribute("alloy_util:script:use"));

_updateOptions(options, "position", _position);
_updateOptions(options, "printBuffer", _printBuffer);
_updateOptions(options, "use", _use);
%>

<%@ include file="init-ext.jsp" %>