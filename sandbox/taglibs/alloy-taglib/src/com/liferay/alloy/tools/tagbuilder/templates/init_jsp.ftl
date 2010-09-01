<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("${namespace}dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("${namespace}scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

java.lang.Object _boundingBox = (java.lang.Object)request.getAttribute("${namespace}boundingBox");
java.lang.Object _contentBox = (java.lang.Object)request.getAttribute("${namespace}contentBox");
java.lang.Object _srcNode = (java.lang.Object)request.getAttribute("${namespace}srcNode");

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(_boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(_contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(_srcNode));

<#list component.getAttributesAndEvents() as attribute>
<#assign name = attribute.getName()>
<#assign simpleClassName = attribute.getJavaTypeSimpleClassName()>
<#if ((name != "boundingBox") && (name != "contentBox") && (name != "srcNode"))>
<#if simpleClassName == "Object">
${attribute.getJavaType()} _${attribute.getSafeName()} = (${attribute.getJavaType()})request.getAttribute("${namespace}${attribute.getSafeName()}");
<#else>
<#if attribute.getDefaultValue()?? && (attribute.getDefaultValue() != "")>
<#if (simpleClassName == "String")>
${attribute.getJavaType()} _${attribute.getSafeName()} = GetterUtil.get${simpleClassName}((java.lang.String)request.getAttribute("${namespace}${attribute.getSafeName()}"), "${attribute.getDefaultValue()}");
<#else>
${attribute.getJavaType()} _${attribute.getSafeName()} = GetterUtil.get${simpleClassName}((java.lang.String)request.getAttribute("${namespace}${attribute.getSafeName()}"), ${attribute.getDefaultValue()});
</#if>
<#else>
${attribute.getJavaType()} _${attribute.getSafeName()} = GetterUtil.get${simpleClassName}((java.lang.String)request.getAttribute("${namespace}${attribute.getSafeName()}"));
</#if>
</#if>
</#if>
</#list>

String uniqueId = StringPool.BLANK;

boolean useJavaScript = GetterUtil.getBoolean(String.valueOf(dynamicAttributes.get("useJavaScript")));
boolean useMarkup = GetterUtil.getBoolean(String.valueOf(dynamicAttributes.get("useMarkup")));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	String prefix = StringPool.POUND.concat(uniqueId);

	if (!hasBoundingBox) {
		_boundingBox = prefix.concat("BoundingBox");

		options.put("boundingBox", _boundingBox);
	}

	if (!hasSrcNode && !hasContentBox) {
		_srcNode = prefix.concat("SrcNode");

		options.put("srcNode", _srcNode);
	}

	if (!hasSrcNode && hasContentBox) {
		_contentBox = prefix.concat("ContentBox");

		options.put("contentBox", _contentBox);
	}
}

<#list component.getAttributesAndEvents() as attribute>
_updateOptions(options, "${attribute.getSafeName()}", _${attribute.getSafeName()});
</#list>
%>

<%@ include file="init-ext.jsp" %>