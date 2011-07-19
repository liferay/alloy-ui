package com.liferay.alloy.tools.model;

import com.liferay.alloy.util.ReservedAttributeUtil;
import com.liferay.alloy.util.TypeUtil;
import com.liferay.portal.kernel.util.StringPool;

import java.util.List;

import org.apache.commons.lang.StringUtils;

public class Attribute extends BaseModel {

	public Attribute(
		String name, String inputType, String outputType, String defaultValue,
		String description, boolean required) {

		setName(name);
		setInputType(inputType);
		setOutputType(outputType);
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

	public String getInputType() {
		return TypeUtil.getInputJavaType(_inputType, true);
	}

	public String getInputTypeSimpleClassName() {
		return getTypeSimpleClassName(getRawInputType());
	}

	public String getOutputType() {
		return TypeUtil.getOutputJavaType(_outputType, true);
	}

	public String getOutputTypeSimpleClassName() {
		return getTypeSimpleClassName(getRawOutputType());
	}

	public String getRawInputType() {
		return TypeUtil.getInputJavaType(_inputType, false);
	}

	public String getRawOutputType() {
		return TypeUtil.getOutputJavaType(_outputType, false);
	}

	public String getSafeName() {
		String safeName = getName();

		if (getComponent() != null && getComponent().isAlloyComponent()) {
			safeName = ReservedAttributeUtil.getSafeName(this);
		}

		if (safeName.indexOf(StringPool.COLON) > -1) {
			safeName = StringUtils.substringAfterLast(
				safeName, StringPool.COLON);
		}

		return safeName;
	}

	public String getTypeSimpleClassName(String type) {
		if (TypeUtil.isPrimitiveType(type)) {
			return type;
		}
		else {
			try {
				return Class.forName(type).getSimpleName();
			}
			catch (ClassNotFoundException e) {
			}
		}

		return StringPool.BLANK;
	}

	public boolean isEvent() {
		List<Attribute> events = _component.getEvents();

		return events.contains(this);
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

	public void setInputType(String inputType) {
		_inputType = inputType;
	}

	public void setOutputType(String outputType) {
		_outputType = outputType;
	}

	public void setRequired(boolean required) {
		_required = required;
	}

	private Component _component;
	private String _defaultValue;
	private String _description;
	private String _inputType;
	private String _outputType;
	private boolean _required;

}
