package ${packageBasePath};

import com.liferay.alloy.taglib.util.IncludeTag;

/**
 * <a href="Base${component.getName()}Tag.java.html"><b><i>View Source</i></b></a>
 *
<#list authors as author>
 * @author ${author}
</#list>
 */
public class Base${component.getName()}Tag extends IncludeTag {

	public void init() {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);
	}

	<#list component.getAttributes() as attribute>
	public ${attribute.getType()} get${attribute.getCapitalizedName()}() {
		return _${attribute.getName()};
	}

	</#list>
	<#list component.getAttributes() as attribute>
	public void set${attribute.getCapitalizedName()}(${attribute.getType()} ${attribute.getName()}) {
		_${attribute.getName()} = ${attribute.getName()};

		setScopedAttribute("${attribute.getName()}", ${attribute.getName()});
	}

	</#list>
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

	private static final String _ATTRIBUTE_NAMESPACE = "${namespace}";

	<#if component.isBodyContent() == true>
	private static final String _END_PAGE =
		"${jspRelativePath}/end.jsp";

	private static final String _START_PAGE =
		"${jspRelativePath}/start.jsp";
	<#else>
	private static final String _PAGE =
		"${jspRelativePath}/page.jsp";
	</#if>

	<#list component.getAttributes() as attribute>
	private ${attribute.getType()} _${attribute.getName()};
	</#list>

}
