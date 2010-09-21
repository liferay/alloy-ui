package com.liferay.alloy.taglib.alloy_util.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

/**
 * <a href="BaseComponentTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class BaseComponentTag extends com.liferay.alloy.taglib.alloy_util.IncludeTag {

	public int doStartTag() throws JspException {
		setAttributeNamespace(_ATTRIBUTE_NAMESPACE);

		return super.doStartTag();
	}

	protected String _getPage() {
		return _PAGE;
	}

	public java.lang.Boolean getDefineVar() {
		return _defineVar;
	}

	public java.lang.String getExcludeAttributes() {
		return _excludeAttributes;
	}

	public java.lang.String getJavaScriptAttributes() {
		return _javaScriptAttributes;
	}

	public java.lang.Object getTagPageContext() {
		return _tagPageContext;
	}

	public java.lang.String getVar() {
		return _var;
	}

	public java.lang.String getModule() {
		return _module;
	}

	public java.lang.String getName() {
		return _name;
	}

	public java.util.Map getOptions() {
		return _options;
	}

	public void setDefineVar(java.lang.Boolean defineVar) {
		_defineVar = defineVar;

		setScopedAttribute("defineVar", defineVar);
	}

	public void setExcludeAttributes(java.lang.String excludeAttributes) {
		_excludeAttributes = excludeAttributes;

		setScopedAttribute("excludeAttributes", excludeAttributes);
	}

	public void setJavaScriptAttributes(java.lang.String javaScriptAttributes) {
		_javaScriptAttributes = javaScriptAttributes;

		setScopedAttribute("javaScriptAttributes", javaScriptAttributes);
	}

	public void setTagPageContext(java.lang.Object tagPageContext) {
		_tagPageContext = tagPageContext;

		setScopedAttribute("tagPageContext", tagPageContext);
	}

	public void setVar(java.lang.String var) {
		_var = var;

		setScopedAttribute("var", var);
	}

	public void setModule(java.lang.String module) {
		_module = module;

		setScopedAttribute("module", module);
	}

	public void setName(java.lang.String name) {
		_name = name;

		setScopedAttribute("name", name);
	}

	public void setOptions(java.util.Map options) {
		_options = options;

		setScopedAttribute("options", options);
	}

	protected void _setAttributes(HttpServletRequest request) {
		setNamespacedAttribute(request, "defineVar", _defineVar);
		setNamespacedAttribute(request, "excludeAttributes", _excludeAttributes);
		setNamespacedAttribute(request, "javaScriptAttributes", _javaScriptAttributes);
		setNamespacedAttribute(request, "tagPageContext", _tagPageContext);
		setNamespacedAttribute(request, "var", _var);
		setNamespacedAttribute(request, "module", _module);
		setNamespacedAttribute(request, "name", _name);
		setNamespacedAttribute(request, "options", _options);
	}

	protected static final String _ATTRIBUTE_NAMESPACE = "alloy_util:component:";

	private static final String _PAGE =
		"/html/taglib/alloy_util/component/page.jsp";

	private java.lang.Boolean _defineVar;
	private java.lang.String _excludeAttributes;
	private java.lang.String _javaScriptAttributes;
	private java.lang.Object _tagPageContext;
	private java.lang.String _var;
	private java.lang.String _module;
	private java.lang.String _name;
	private java.util.Map _options;

}
