package com.liferay.alloy.tools.model;

import com.liferay.alloy.util.StringUtils;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.StringUtil;

import java.util.ArrayList;
import java.util.List;

public class Component extends BaseModel {

	public Component(String namespace, String name, String module,
		boolean bodyContent, List<Attribute> attributes,
		List<Attribute> events) {

		setEvents(events);
		setAttributes(attributes);
		setBodyContent(bodyContent);
		setModule(module);
		setNamespace(namespace);
		setName(name);
	}

	public String getAttributeNamespace() {
		StringBuilder sb = new StringBuilder();

		sb.append(_namespace);
		sb.append(StringPool.COLON);
		sb.append(getUncamelizedName());
		sb.append(StringPool.COLON);

		return sb.toString().toLowerCase();
	}

	public List<Attribute> getAttributes() {
		return _attributes;
	}

	public List<Attribute> getAttributesAndEvents() {
		ArrayList<Attribute> attributes = new ArrayList<Attribute>();

		attributes.addAll(_attributes);
		attributes.addAll(_events);

		return attributes;
	}

	public String getCamelizedName() {
		return StringUtils.camelize(getName());
	}

	public List<Attribute> getEvents() {
		return _events;
	}

	public String getModule() {
		return _module;
	}

	public String getNamespace() {
		return _namespace;
	}

	public String getSafeName() {
		return StringUtil.replace(getName(), StringPool.PERIOD, StringPool.BLANK);
	}

	public String getUncamelizedName() {
		return StringUtils.uncamelize(getName());
	}

	public String getUncamelizedName(String delimiter) {
		return StringUtils.uncamelize(getName(), delimiter);
	}

	public boolean isBodyContent() {
		return _bodyContent;
	}

	public void setAttributes(List<Attribute> attributes) {
		_attributes = attributes;
	}

	public void setBodyContent(boolean bodyContent) {
		_bodyContent = bodyContent;
	}

	public void setEvents(List<Attribute> events) {
		_events = events;
	}

	public void setModule(String type) {
		_module = type;
	}

	public void setNamespace(String namespace) {
		_namespace = namespace;
	}

	private List<Attribute> _attributes;
	private boolean _bodyContent;
	private List<Attribute> _events;
	private String _module;
	private String _namespace;

}
