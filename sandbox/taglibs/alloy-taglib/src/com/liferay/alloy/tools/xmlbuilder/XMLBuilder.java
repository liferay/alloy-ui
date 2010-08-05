/**
 * Copyright (c) 2000-2010 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.alloy.tools.xmlbuilder;

import com.liferay.alloy.tools.model.Attribute;
import com.liferay.alloy.tools.model.Component;
import com.liferay.alloy.util.FileUtil;
import com.liferay.alloy.util.JSONUtil;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.StringUtil;
import org.dom4j.Document;
import org.dom4j.DocumentFactory;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

/**
 * <a href="XMLBuilder.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public class XMLBuilder {

	public XMLBuilder(String componentsJSON, String componentsXML,
			String componentExcluded)
		throws Exception {

		_componentJSON = componentsJSON;
		_componentXML = componentsXML;
		_componentExcluded = Arrays.asList(StringUtil.split(componentExcluded));

		_fileXML = new File(_componentXML);
		_fileJSON = new File(_componentJSON);

		_json = new JSONObject(FileUtil.read(_fileJSON));
		_classMapJSON = _json.getJSONObject("classmap");

		_create();
	}

	public static void main(String[] args) throws Exception {
		String componentsJSON = System.getProperty("xmlbuilder.components.json");
		String componentsXML = System.getProperty("tagbuilder.components.xml");
		String componentExcluded = System.getProperty("xmlbuilder.components.excluded");

		new XMLBuilder(componentsJSON, componentsXML, componentExcluded);
	}

	public ArrayList<Attribute> getComponentAttributes(String className) {
		return _getComponentAttributes(className, "configs");
	}

	public ArrayList<Attribute> getComponentEvents(String className) {
		return _getComponentAttributes(className, "events");
	}

	public ArrayList<String> getComponentHierarchy(String className) {
		return _getComponentHierarchy(className, new ArrayList<String>());
	}

	public ArrayList<Component> getComponents() {
		Set<Component> components = new HashSet<Component>();
		Iterator<String> it = _classMapJSON.keys();

		while (it.hasNext()) {
			String className = it.next();

			JSONObject componentJSON =
				JSONUtil.getJSONObject(_classMapJSON, className);

			String namespace = GetterUtil.getString(_DEFAULT_NAMESPACE);

			String name = JSONUtil.getString(componentJSON, "name");
			String module = JSONUtil.getString(componentJSON, "module");
			boolean bodyContent = GetterUtil.getBoolean(
				JSONUtil.getString(componentJSON, "bodyContent"));

			List<Attribute> attributes = new ArrayList<Attribute>(
				getComponentAttributes(className));

			List<Attribute> events = new ArrayList<Attribute>(
				getComponentEvents(className));

			Component component = new Component(
				namespace, name, module, bodyContent, attributes, events);

			if (!isExcludedComponent(component)) {
				components.add(component);
			}
		}

		ArrayList<Component> sortedComponents =
			new ArrayList<Component>(components);

		Collections.sort(sortedComponents);

		return sortedComponents;
	}

	public boolean isExcludedComponent(Component component) {
		return (!component.getModule().startsWith(AUI_PREFIX) ||
				_componentExcluded.contains(component.getName()));
	}

	private void _create() throws Exception {
		_createXML();
	}

	private void _createXML() {
		ArrayList<Component> components = getComponents();

		Document doc = DocumentFactory.getInstance().createDocument();
		Element root = doc.addElement("alloy");

		for (Component component : components) {
			Element componentNode = root.addElement("component");

			componentNode.addAttribute("name", component.getName());
			componentNode.addAttribute("module", component.getModule());
			componentNode.addAttribute("namespace", component.getNamespace());
			componentNode.addAttribute("bodyContent", String.valueOf(
				component.isBodyContent()));

			Element attributesNode = componentNode.addElement("attributes");
			Element eventsNode = componentNode.addElement("events");

			for (Attribute attribute : component.getAttributes()) {
				Element attributeNode = attributesNode.addElement("attribute");

				attributeNode.addAttribute("name", attribute.getName());
				attributeNode.addAttribute("type", attribute.getJavaType());
			}

			for (Attribute event : component.getEvents()) {
				Element eventNode = eventsNode.addElement("event");

				eventNode.addAttribute("name", event.getName());
				eventNode.addAttribute("type", event.getJavaType());
			}
		}

		try{
			FileOutputStream fos = new FileOutputStream(_componentXML);

			OutputFormat format = OutputFormat.createPrettyPrint();

			format.setEncoding(UTF_8);

			XMLWriter writer = new XMLWriter(fos, format);

			writer.write(doc);
			writer.flush();
		}
		catch(IOException e) {
			e.printStackTrace();
		}
	}

	private ArrayList<Attribute> _getComponentAttributes(
		String className, String attributeType) {

		Set<Attribute> attributes = new HashSet<Attribute>();

		ArrayList<String> hierarchy = getComponentHierarchy(className);

		try{
			for (String parentClass : hierarchy) {
				JSONObject componentJSON = JSONUtil.getJSONObject(
					_classMapJSON, parentClass);

				if (componentJSON == null) {
					continue;
				}

				JSONObject typeJSON = JSONUtil.getJSONObject(
					componentJSON, attributeType);

				if (typeJSON == null) {
					continue;
				}

				Iterator<String> it = typeJSON.keys();

				while (it.hasNext()) {
					String attributeName = it.next();

					JSONObject attributeJSON = JSONUtil.getJSONObject(
						typeJSON, attributeName);

					String type = GetterUtil.getString(
						JSONUtil.getString(attributeJSON, "type"),
						"String");

					boolean required = GetterUtil.getBoolean(
						JSONUtil.getString(attributeJSON, "required"));

					Attribute attribute = new Attribute(
						attributeName, type, required);

					attributes.add(attribute);
				}
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}

		ArrayList<Attribute> sortedAttributes =
			new ArrayList<Attribute>(attributes);

		Collections.sort(sortedAttributes);

		return sortedAttributes;
	}

	private ArrayList<String> _getComponentHierarchy(
		String className, ArrayList<String> hierarchy) {

		try{
			JSONObject componentJSON =
				JSONUtil.getJSONObject(_classMapJSON, className);

			if (componentJSON != null) {
				hierarchy.add(className);

				if (componentJSON.has("extends")) {
					String extendClass = componentJSON.getString("extends");

					_getComponentHierarchy(extendClass, hierarchy);
				}
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}

		return hierarchy;
	}

	private static final String AUI_PREFIX = "aui-";
	private static final String UTF_8 = "UTF-8";
	private static final String _DEFAULT_NAMESPACE = "alloy";

	private JSONObject _classMapJSON;
	private List<String> _componentExcluded;
	private String _componentJSON;
	private String _componentXML;
	private File _fileJSON;
	private File _fileXML;
	private JSONObject _json;

}
