package com.liferay.alloy.tools.model;

import java.util.ArrayList;
import java.util.List;

import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.kernel.util.TextFormatter;

public class Component extends BaseModel {

	public Component(
		String componentPackage, String name, boolean alloyComponent,
		String module, boolean bodyContent, List<Attribute> attributes,
		List<Attribute> events) {

		setAlloyComponent(alloyComponent);
		setEvents(events);
		setAttributes(attributes);
		setBodyContent(bodyContent);
		setModule(module);
		setPackage(componentPackage);
		setName(name);
	}

	public String getAttributeNamespace() {
		StringBuilder sb = new StringBuilder();

		sb.append(_package);
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
		return TextFormatter.format(getName(), TextFormatter.M);
	}

	public List<Attribute> getEvents() {
		return _events;
	}

	public String getModule() {
		return _module;
	}

	public String getPackage() {
		return _package;
	}

	public String getParentClass() {
		return _parentClass;
	}

	public String getSafeName() {
		return StringUtil.replace(
			getName(), StringPool.PERIOD, StringPool.BLANK);
	}

	public String getUncamelizedName() {
		String name = getName().replaceAll("\\.", StringPool.DASH);

		return TextFormatter.format(name, TextFormatter.P);
	}

	public String getUncamelizedName(String delimiter) {
		return getUncamelizedName().replaceAll("\\-", delimiter);
	}

	public boolean isAlloyComponent() {
		return _alloyComponent;
	}

	public boolean isBodyContent() {
		return _bodyContent;
	}

	public void setAlloyComponent(boolean alloyComponent) {
		_alloyComponent = alloyComponent;
	}

	public void setAttributes(List<Attribute> attributes) {
		_attributes = attributes;

		for (Attribute attribute : attributes) {
			attribute.setComponent(this);
		}
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

	public void setPackage(String componentPackage) {
		_package = componentPackage;
	}

	public void setParentClass(String parentClass) {
		_parentClass = parentClass;
	}

	private boolean _alloyComponent;
	private List<Attribute> _attributes;
	private boolean _bodyContent;
	private List<Attribute> _events;
	private String _module;
	private String _package;
	private String _parentClass;

}