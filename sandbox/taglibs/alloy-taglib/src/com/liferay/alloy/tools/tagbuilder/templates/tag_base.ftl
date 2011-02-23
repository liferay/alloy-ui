<#compress>
<#assign BLANK = "">
<#assign QUOTE = "\"">

<#function isQuoted simpleClassName>
	<#return (simpleClassName == "String") />
</#function>

<#function useDefaultValue simpleClassName>
	<#return ((simpleClassName == "String") || (simpleClassName == "Integer") || (simpleClassName == "Boolean") || (simpleClassName == "Double") || (simpleClassName == "Float") || (simpleClassName == "Long") || (simpleClassName == "Short") || (simpleClassName == "Number")) />
</#function>

<#function getDefaultValue simpleClassName defaultValue>
	<#assign defaultValueOutput = "null">

	<#if (defaultValue?? && (defaultValue != BLANK) && useDefaultValue(simpleClassName))>
		<#if isQuoted(simpleClassName)>
			<#assign defaultValueOutput = QUOTE + defaultValue + QUOTE>
		<#else>
			<#assign defaultValueOutput = defaultValue>
		</#if>
	</#if>

	<#return defaultValueOutput />
</#function>
</#compress>
package ${packagePath}.${component.getPackage()}.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="Base${component.getSafeName()}Tag.java.html"><b><i>View Source</i></b></a>
 *
<#list authors as author>
 * @author ${author}
</#list>
 */
public class Base${component.getSafeName()}Tag extends ${component.getParentClass()} {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	<#list component.getAttributesAndEvents() as attribute>
	public ${attribute.getInputType()} get${attribute.getCapitalizedName()}() {
		return _${attribute.getSafeName()};
	}

	</#list>
	<#list component.getAttributesAndEvents() as attribute>
	public void set${attribute.getCapitalizedName()}(${attribute.getInputType()} ${attribute.getSafeName()}) {
		_${attribute.getSafeName()} = ${attribute.getSafeName()};

		setScopedAttribute("${attribute.getSafeName()}", ${attribute.getSafeName()});
	}

	</#list>

	protected void cleanUp() {
	<#list component.getAttributesAndEvents() as attribute>
		<#compress>
		<#assign outputSimpleClassName = attribute.getOutputTypeSimpleClassName()>

		<#assign defaultValue = "null">

		<#if attribute.getDefaultValue()??>
			<#assign defaultValue = getDefaultValue(outputSimpleClassName, attribute.getDefaultValue())>
		</#if>
		</#compress>
		_${attribute.getSafeName()} = ${defaultValue};
	</#list>
	}

	<#if component.isBodyContent() == true>
	protected String getEndPage() {
		return _END_PAGE;
	}

	protected String getStartPage() {
		return _START_PAGE;
	}

	<#else>
	protected String getPage() {
		return _PAGE;
	}

	</#if>
	
	protected void setAttributes(HttpServletRequest request) {
		<#list component.getAttributesAndEvents() as attribute>
		setNamespacedAttribute(request, "${attribute.getSafeName()}", _${attribute.getSafeName()});
		</#list>
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "${namespace}";

	<#if component.isBodyContent() == true>
	private static final String _END_PAGE =
		"${jspRelativePath}/end.jsp";

	private static final String _START_PAGE =
		"${jspRelativePath}/start.jsp";
	<#else>
	private static final String _PAGE =
		"${jspRelativePath}/page.jsp";
	</#if>

	<#list component.getAttributesAndEvents() as attribute>
	protected ${attribute.getInputType()} _${attribute.getSafeName()};
	</#list>

}
