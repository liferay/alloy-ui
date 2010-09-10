<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
java.lang.String NAMESPACE = "alloy_util:component:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy_util:component:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy_util:component:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.String _excludeAttributes = GetterUtil.getString((java.lang.String)request.getAttribute("alloy_util:component:excludeAttributes"));
java.lang.String _javaScriptAttributes = GetterUtil.getString((java.lang.String)request.getAttribute("alloy_util:component:javaScriptAttributes"));
javax.servlet.jsp.JspContext _tagPageContext = (javax.servlet.jsp.JspContext)request.getAttribute("alloy_util:component:tagPageContext");
java.lang.String _var = GetterUtil.getString((java.lang.String)request.getAttribute("alloy_util:component:var"));
java.lang.String _module = GetterUtil.getString((java.lang.String)request.getAttribute("alloy_util:component:module"));
java.lang.String _name = GetterUtil.getString((java.lang.String)request.getAttribute("alloy_util:component:name"));
java.util.Map _options = (java.util.Map)request.getAttribute("alloy_util:component:options");

_updateOptions(options, "excludeAttributes", _excludeAttributes);
_updateOptions(options, "javaScriptAttributes", _javaScriptAttributes);
_updateOptions(options, "tagPageContext", _tagPageContext);
_updateOptions(options, "var", _var);
_updateOptions(options, "module", _module);
_updateOptions(options, "name", _name);
_updateOptions(options, "options", _options);
%>

<%@ include file="init-ext.jsp" %>