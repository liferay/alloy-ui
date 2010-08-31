<?xml version="1.0" encoding="UTF-8"?>

<taglib
	version="2.0"
	xmlns="http://java.sun.com/xml/ns/j2ee"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-jsptaglibrary_2_0.xsd"
>
	<tlib-version>1.0</tlib-version>
	<short-name>alloy</short-name>
	<uri>http://alloy.liferay.com/tld/alloy</uri>

	<tag>
		<name>component</name>
		<tag-class>com.liferay.alloy.taglib.util.ComponentTag</tag-class>
		<body-content>JSP</body-content>
		<attribute>
			<name>excludeAttributes</name>
			<required>false</required>
			<rtexprvalue>true</rtexprvalue>
			<type>java.lang.String</type>
		</attribute>
		<attribute>
			<name>javaScriptAttributes</name>
			<required>false</required>
			<rtexprvalue>true</rtexprvalue>
			<type>java.lang.String</type>
		</attribute>
		<attribute>
			<name>tagPageContext</name>
			<required>true</required>
			<rtexprvalue>true</rtexprvalue>
			<type>javax.servlet.jsp.JspContext</type>
		</attribute>
		<attribute>
			<name>var</name>
			<required>false</required>
			<rtexprvalue>true</rtexprvalue>
			<type>java.lang.String</type>
		</attribute>
		<attribute>
			<name>module</name>
			<required>false</required>
			<rtexprvalue>true</rtexprvalue>
			<type>java.lang.String</type>
		</attribute>
		<attribute>
			<name>name</name>
			<required>false</required>
			<rtexprvalue>true</rtexprvalue>
			<type>java.lang.String</type>
		</attribute>
		<attribute>
			<name>options</name>
			<rtexprvalue>true</rtexprvalue>
			<type>java.util.Map</type>
		</attribute>
		<attribute>
			<name>yuiVariable</name>
			<rtexprvalue>true</rtexprvalue>
			<type>java.lang.String</type>
		</attribute>
		<dynamic-attributes>true</dynamic-attributes>
	</tag>

	<#list components as component>
	<tag>
		<name>${component.getUncamelizedName()}</name>
		<tag-class>${packagePath}.${component.getSafeName()}Tag</tag-class>
		<body-content>JSP</body-content>
		<#list component.getAttributesAndEvents() as attribute>
		<attribute>
			<#if attribute.getDescription()??>
			<description><![CDATA[${attribute.getDescription()}]]></description>
			</#if>
			<name>${attribute.getSafeName()}</name>
			<required>${attribute.isRequired()?string("true", "false")}</required>
			<rtexprvalue>true</rtexprvalue>
			<type>${attribute.getSafeJavaType()}</type>
		</attribute>
		</#list>
		<dynamic-attributes>true</dynamic-attributes>
	</tag>
	</#list>
</taglib>