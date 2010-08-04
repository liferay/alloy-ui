package com.liferay.alloy.tools.model;

import com.liferay.alloy.util.TypeUtil;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.StringUtil;
import org.apache.commons.lang.StringUtils;

import java.util.HashMap;

public class Attribute implements Comparable<Attribute> {

	public Attribute(String name, String type, boolean required) {
		this.setName(name);
		this.setType(type);
		this.setRequired(required);
	}

	public int compareTo(Attribute o) {
		return _name.compareTo(o.getName());
	}

	public boolean equals(Object o) {
		Attribute attribute = (Attribute)o;

		return _name.equals(attribute.getName());
	}

	public String getSafeName() {
		return StringUtil.replace(_name, StringPool.COLON,
			StringPool.UNDERLINE);
	}

	public String getCapitalizedName() {
		return StringUtils.capitalize(getSafeName());
	}

	public String getJavaType() {
		return TypeUtil.getJavaType(_type);
	}

	public String getName() {
		return _name;
	}

	public String getType() {
		return _type;
	}

	public int hashCode() {
		return _name.hashCode();
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
