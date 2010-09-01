<#compress>
<#assign BLANK = "">
<#assign SPACE = " ">
<#assign COMMA = ",">
<#assign QUOTE = "\"">

<#function isValidAttribute attributeName>
	<#return ((attributeName != "boundingBox") && (attributeName != "contentBox") && (attributeName != "srcNode")) />
</#function>

<#function isNumericAttribute outputSimpleClassName>
	<#return ((outputSimpleClassName == "Number") || (outputSimpleClassName == "Integer") || (outputSimpleClassName == "Float") || (outputSimpleClassName == "Double")) />
</#function>

<#function getDefaultValueSuffix outputSimpleClassName defaultValue>
	<#assign defaultValueSuffix = BLANK>

	<#if (defaultValue?? && (defaultValue != BLANK))>
		<#if (outputSimpleClassName == "String")>
			<#assign defaultValueSuffix = COMMA + SPACE + QUOTE + defaultValue + QUOTE>
		<#else>
			<#assign defaultValueSuffix = COMMA + SPACE + defaultValue>
		</#if>
	</#if>

	<#return defaultValueSuffix />
</#function>
</#compress>
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
			${attribute.getOutputType()} _${attribute.getSafeName()} = JSONFactoryUtil.getArrayList(GetterUtil.getObject(${value}${defaultValueSuffix}));
		<#elseif outputSimpleClassName == "HashMap">
			${attribute.getOutputType()} _${attribute.getSafeName()} = JSONFactoryUtil.getHashMap(GetterUtil.getObject(${value}${defaultValueSuffix}));
		<#else>
			${attribute.getOutputType()} _${attribute.getSafeName()} = GetterUtil.get${outputSimpleClassName}(${value}${defaultValueSuffix});
		</#if>
	</#if>
</#list>
</#compress>


String uniqueId = StringPool.BLANK;

boolean useJavaScript = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useJavaScript"), true);
boolean useMarkup = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useMarkup"), true);

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