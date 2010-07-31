package com.liferay.alloy.tools.tagbuilder.model;

import com.liferay.alloy.util.StringUtils;
import com.liferay.portal.kernel.util.StringPool;

import java.util.List;

public class ComponentModel {

	public ComponentModel(String namespace, String name, String module,
		boolean bodyContent, List<AttributeModel> attributes) {

		_namespace = namespace;
		_name = name;
		_module = module;
		_bodyContent = bodyContent;
		_attributes = attributes;
	}

	public String getAttributeNamespace() {
		StringBuilder sb = new StringBuilder();

		sb.append(_namespace);
		sb.append(StringPool.COLON);
		sb.append(getUncamelizedName());
		sb.append(StringPool.COLON);

		return sb.toString().toLowerCase();
	}

	public List<AttributeModel> getAttributes() {
		return _attributes;
	}

	public String getCamelizedName() {
		return StringUtils.camelize(_name);
	}

	public String getModule() {
		return _module;
	}

	public String getName() {
		return _name;
	}

	public String getNamespace() {
		return _namespace;
	}

	public String getUncamelizedName() {
		return StringUtils.uncamelize(_name);
	}

	public String getUncamelizedName(String delimiter) {
		return StringUtils.uncamelize(_name, delimiter);
	}

	public boolean isBodyContent() {
		return _bodyContent;
	}

	public void setAttributes(List<AttributeModel> attributes) {
		_attributes = attributes;
	}

	public void setBodyContent(boolean bodyContent) {
		_bodyContent = bodyContent;
	}

	public void setModule(String type) {
		_module = type;
	}

	public void setName(String name) {
		_name = name;
	}

	public void setNamespace(String namespace) {
		_namespace = namespace;
	}

	private List<AttributeModel> _attributes;
	private boolean _bodyContent;
	private String _module;
	private String _name;
	private String _namespace;

}
