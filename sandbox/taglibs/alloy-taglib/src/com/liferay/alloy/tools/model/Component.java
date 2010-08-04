package com.liferay.alloy.tools.model;

import com.liferay.alloy.util.StringUtils;
import com.liferay.portal.kernel.util.StringPool;

import java.util.ArrayList;
import java.util.List;

public class Component implements Comparable<Component> {

	public Component(String namespace, String name, String module,
		boolean bodyContent, List<Attribute> attributes,
		List<Attribute> events) {

		_namespace = namespace;
		_name = name;
		_module = module;
		_bodyContent = bodyContent;
		_attributes = attributes;
		_events = events;
	}

	
	public int compareTo(Component o) {
		return _name.compareTo(o.getName());
	}

	public boolean equals(Object o) {
		Component component = (Component)o;

		return _name.equals(component.getName());
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
		return StringUtils.camelize(_name);
	}

	public List<Attribute> getEvents() {
		return _events;
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

	public int hashCode() {
		return _name.hashCode();
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

	public void setName(String name) {
		_name = name;
	}

	public void setNamespace(String namespace) {
		_namespace = namespace;
	}

	private List<Attribute> _attributes;
	private boolean _bodyContent;
	private List<Attribute> _events;
	private String _module;
	private String _name;
	private String _namespace;

}
