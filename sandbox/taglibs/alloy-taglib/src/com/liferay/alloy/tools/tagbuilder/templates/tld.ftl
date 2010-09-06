<?xml version="1.0" encoding="UTF-8"?>

<taglib
	version="2.0"
	xmlns="http://java.sun.com/xml/ns/j2ee"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-jsptaglibrary_2_0.xsd"
>
	<tlib-version>${version}</tlib-version>
	<short-name>${shortName}</short-name>
	<uri>${uri}</uri>
<#list components as component>
	<tag>
		<name>${component.getUncamelizedName()}</name>
		<tag-class>${packagePath}.${component.getNamespace()}.${component.getSafeName()}Tag</tag-class>
		<body-content>JSP</body-content>
		<#list component.getAttributesAndEvents() as attribute>
		<attribute>
			<#if attribute.getDescription()??>
			<description><![CDATA[${attribute.getDescription()}]]></description>
			</#if>
			<name>${attribute.getSafeName()}</name>
			<required>${attribute.isRequired()?string("true", "false")}</required>
			<rtexprvalue>true</rtexprvalue>
			<type>${attribute.getInputType()}</type>
		</attribute>
		</#list>
		<dynamic-attributes>true</dynamic-attributes>
	</tag>
</#list>
</taglib>