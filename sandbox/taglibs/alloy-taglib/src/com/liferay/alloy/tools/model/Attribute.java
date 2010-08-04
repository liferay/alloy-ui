package com.liferay.alloy.tools.model;

import com.liferay.alloy.util.TypeUtil;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.StringUtil;
import org.apache.commons.lang.StringUtils;

import java.util.HashMap;

public class Attribute extends BaseModel {

	public Attribute(String name, String type, boolean required) {
		setName(name);
		setType(type);
		setRequired(required);
	}

	public String getCapitalizedName() {
		return StringUtils.capitalize(getSafeName());
	}

	public String getJavaType() {
		return TypeUtil.getJavaType(_type);
	}

	public String getSafeName() {
		return StringUtil.replace(getName(), StringPool.COLON,
			StringPool.UNDERLINE);
	}

	public String getType() {
		return _type;
	}

	public boolean isRequired() {
		return _required;
	}

	public void setRequired(boolean required) {
		_required = required;
	}

	public void setType(String type) {
		_type = type;
	}

	private boolean _required;
	private String _type;

}
