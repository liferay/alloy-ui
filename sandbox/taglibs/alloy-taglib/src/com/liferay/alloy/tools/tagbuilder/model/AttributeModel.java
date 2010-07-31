package com.liferay.alloy.tools.tagbuilder.model;

import com.liferay.portal.kernel.util.Validator;
import org.apache.commons.lang.StringUtils;

public class AttributeModel {

	public AttributeModel(String name, String type, boolean required) {
		this.setName(name);
		this.setType(type);
		this.setRequired(required);
	}

	public String getCapitalizedName() {
		return StringUtils.capitalize(_name);
	}

	public String getName() {
		return _name;
	}

	public String getType() {
		return _type;
	}

	public boolean isRequired() {
		return _required;
	}

	public void setName(String name) {
		_name = name;
	}

	public void setRequired(boolean required) {
		_required = required;
	}

	public void setType(String type) {
		_type = type;
	}

	private String _name;
	private boolean _required;
	private String _type;

}
