<#compress>
<#assign BLANK = "">
<#assign SPACE = " ">
<#assign COMMA = ",">
<#assign QUOTE = "\"">

<#function isValidAttribute attributeName>
	<#return ((attributeName != "boundingBox") && (attributeName != "contentBox") && (attributeName != "srcNode")) />
</#function>

<#function isQuoted simpleClassName>
	<#return ((simpleClassName == "String") || (simpleClassName == "ArrayList") || (simpleClassName == "HashMap")) />
</#function>

<#function hasGetter simpleClassName>
	<#return ((simpleClassName == "String") || (simpleClassName == "Integer") || (simpleClassName == "Boolean") || (simpleClassName == "Date") || (simpleClassName == "Double") || (simpleClassName == "Float") || (simpleClassName == "Long") || (simpleClassName == "Short") || (simpleClassName == "Number")) />
</#function>

<#function isNumericAttribute simpleClassName>
	<#return ((simpleClassName == "Number") || (simpleClassName == "Integer") || (simpleClassName == "Float") || (simpleClassName == "Double") || (simpleClassName == "Long") || (simpleClassName == "Short")) />
</#function>

<#function getDefaultValueSuffix outputSimpleClassName defaultValue>
	<#assign defaultValueSuffix = BLANK>

	<#if (defaultValue?? && (defaultValue != BLANK))>
		<#if isQuoted(outputSimpleClassName)>
			<#assign value = QUOTE + defaultValue + QUOTE>
		<#else>
			<#assign value = defaultValue>
		</#if>

		<#assign defaultValueSuffix = COMMA + SPACE + value>
	</#if>

	<#return defaultValueSuffix />
</#function>
</#compress>
<%@ include file="${jspCommonInitPath}" %>

<%
java.lang.String NAMESPACE = "${namespace}";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("${namespace}dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("${namespace}scopedAttributes");
CustomAttributes customAttributes = (CustomAttributes)request.getAttribute("${namespace}customAttributes");

Map<String, Object> _options = new HashMap<String, Object>();

_options.putAll(scopedAttributes);
_options.putAll(dynamicAttributes);

<#if component.isAlloyComponent()>
%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
</#if>
<#compress>
<#list component.getAttributesAndEvents() as attribute>
	<#assign defaultValueSuffix = BLANK>
	<#assign outputSimpleClassName = attribute.getOutputTypeSimpleClassName()>

	<#if attribute.getDefaultValue()??>
		<#assign defaultValueSuffix = getDefaultValueSuffix(outputSimpleClassName, attribute.getDefaultValue())>
	</#if>

	<#if isValidAttribute(attribute.getName())>
		<#assign namespacedName = QUOTE + namespace + attribute.getSafeName() + QUOTE>

		<#if isNumericAttribute(outputSimpleClassName)>
			<#assign value = "String.valueOf(request.getAttribute(" + namespacedName + "))">
		<#else>
			<#assign value = "(" + attribute.getInputType() + ")request.getAttribute(" + namespacedName + ")">
		</#if>

		<#if outputSimpleClassName == "ArrayList">
			${attribute.getOutputType()} ${attribute.getSafeName()} = _getArrayList(GetterUtil.getObject(${value}${defaultValueSuffix}));
		<#elseif outputSimpleClassName == "HashMap">
			${attribute.getOutputType()} ${attribute.getSafeName()} = _getHashMap(GetterUtil.getObject(${value}${defaultValueSuffix}));
		<#elseif hasGetter(outputSimpleClassName)>
			${attribute.getOutputType()} ${attribute.getSafeName()} = GetterUtil.get${outputSimpleClassName}(${value}${defaultValueSuffix});
		<#else>
			${attribute.getOutputType()} ${attribute.getSafeName()} = (${attribute.getOutputType()})request.getAttribute(${namespacedName});
		</#if>
	</#if>
</#list>
</#compress>


<#list component.getAttributesAndEvents() as attribute>
_updateOptions(_options, "${attribute.getSafeName()}", ${attribute.getSafeName()});
</#list>
%>

<%@ include file="init-ext.jsp" %>