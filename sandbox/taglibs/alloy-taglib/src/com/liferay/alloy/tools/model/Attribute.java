package com.liferay.alloy.tools.model;

import com.liferay.alloy.util.ReservedAttributeUtil;
import com.liferay.alloy.util.StringUtil;
import com.liferay.alloy.util.TypeUtil;
import com.liferay.portal.kernel.util.StringPool;
import org.apache.commons.lang.StringUtils;

public class Attribute extends BaseModel {

	public Attribute(
		String name, String type, boolean required) {

		setName(name);
		setType(type);
		setRequired(required);
	}

	public String getCapitalizedName() {
		return StringUtils.capitalize(getSafeName());
	}

	public Component getComponent() {
		return _component;
	}

	public String getJavaType() {
		return TypeUtil.getJavaType(_type);
	}

	public String getSafeName() {
		return ReservedAttributeUtil.getSafeName(this);
	}

	public String getType() {
		return _type;
	}

	public boolean isRequired() {
		return _required;
	}

	public void setComponent(Component component) {
		this._component = component;
	}

	public void setRequired(boolean required) {
		_required = required;
	}

	public void setType(String type) {
		_type = type;
	}

	private Component _component;
	private boolean _required;
	private String _type;

}
