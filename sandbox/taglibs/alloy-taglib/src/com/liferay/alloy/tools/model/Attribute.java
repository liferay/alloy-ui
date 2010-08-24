package com.liferay.alloy.tools.model;

import com.liferay.alloy.util.ReservedAttributeUtil;
import com.liferay.alloy.util.StringUtil;
import com.liferay.alloy.util.TypeUtil;
import com.liferay.portal.kernel.util.StringPool;
import org.apache.commons.lang.StringUtils;

public class Attribute extends BaseModel {

	public Attribute(
		String name, String type, String defaultValue, String description,
		boolean required) {

		setName(name);
		setType(type);
		setDefaultValue(defaultValue);
		setDescription(description);
		setRequired(required);
	}

	public String getCapitalizedName() {
		return StringUtils.capitalize(getSafeName());
	}

	public Component getComponent() {
		return _component;
	}

	public String getDefaultValue() {
		return _defaultValue;
	}

	public String getDescription() {
		return _description;
	}

	public String getJavaType() {
		return TypeUtil.getJavaType(_type);
	}

	public String getJavaTypeSimpleClassName() {
		try {
			return Class.forName(TypeUtil.getJavaType(_type)).getSimpleName();
		}
		catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		return StringPool.BLANK;
	}

	public String getSafeJavaType() {
		String safeType = _DEFAULT_JAVA_TYPE;

		if (getJavaType().equals(_JAVA_LANG_OBJECT)) {
			safeType = _JAVA_LANG_OBJECT;
		}

		return safeType;
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
		_component = component;
	}

	public void setDefaultValue(String defaultValue) {
		_defaultValue = defaultValue;
	}

	public void setDescription(String description) {
		_description = description;
	}

	public void setRequired(boolean required) {
		_required = required;
	}

	public void setType(String type) {
		_type = type;
	}

	private static final String _DEFAULT_JAVA_TYPE = "java.lang.String";
	private static final String _JAVA_LANG_OBJECT = "java.lang.Object";

	private Component _component;
	private String _defaultValue;
	private String _description;
	private boolean _required;
	private String _type;

}
