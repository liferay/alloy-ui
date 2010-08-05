package com.liferay.alloy.tools.tagbuilder;

import java.io.File;
import java.io.IOException;
import java.util.*;

import com.liferay.alloy.tools.model.Component;
import com.liferay.alloy.tools.model.Attribute;
import com.liferay.alloy.util.StringUtil;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.StringPool;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.liferay.alloy.util.FileUtil;
import com.liferay.portal.freemarker.FreeMarkerUtil;

/**
 * <a href="TagBuilder.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 */
public class TagBuilder {

	public static final String[] AUTHORS = new String[] {
		"Eduardo Lundgren", "Bruno Basto", "Nathan Cavanaugh"
	};

	public TagBuilder(String componentsXML, String templatesDir,
			String javaOutputDir, String javaOutputBaseDir,
			String javaOutputPackage, String javaOutputBasePackage,
			String jspDir, String jspOutputDir, String tldDir)
		throws Exception {

		_componentsXML = componentsXML;
		_templatesDir = templatesDir;
		_javaOutputDir = javaOutputDir;
		_javaOutputBaseDir = javaOutputBaseDir;
		_javaOutputPackage = javaOutputPackage;
		_javaOutputBasePackage = javaOutputBasePackage;
		_jspDir = jspDir;
		_jspOutputDir = jspOutputDir;
		_tldDir = tldDir;

		_tplTld = _templatesDir + "tld.ftl";
		_tplTag = _templatesDir + "tag.ftl";
		_tplTagBase = _templatesDir + "tag_base.ftl";
		_tplJsp = _templatesDir + "jsp.ftl";
		_tplInitJsp = _templatesDir + "init_jsp.ftl";
		_tplStartJsp = _templatesDir + "start_jsp.ftl";

		_create();
	}

	public static void main(String[] args) throws Exception {
		String componentsXML = System.getProperty("tagbuilder.components.xml");
		String templatesDir = System.getProperty("tagbuilder.templates.dir");
		String javaOutputDir = System.getProperty("tagbuilder.java.output.dir");
		String javaOutputBaseDir = System.getProperty("tagbuilder.java.output.base.dir");
		String javaOutputPackage = System.getProperty("tagbuilder.java.output.package");
		String javaOutputBasePackage = System.getProperty("tagbuilder.java.output.base.package");
		String jspDir = System.getProperty("tagbuilder.jsp.dir");
		String jspOutputDir = System.getProperty("tagbuilder.jsp.output.dir");
		String tldDir = System.getProperty("tagbuilder.tld.dir");

		new TagBuilder(
			componentsXML, templatesDir, javaOutputDir, javaOutputBaseDir,
			javaOutputPackage, javaOutputBasePackage, jspDir, jspOutputDir,
			tldDir);
	}

	public Map<String, Object> getDefaultTemplateContext() {
		Map<String, Object> context = new HashMap<String, Object>();

		context.put("authors", AUTHORS);
		context.put("jspDir", _jspDir);
		context.put("packagePath", _javaOutputBasePackage);
		context.put("packageBasePath", _javaOutputBasePackage);
		context.put("packagePath", _javaOutputPackage);

		return context;
	}

	public Map<String, Object> getTemplateContext(Component component) {
		Map<String, Object> context = getDefaultTemplateContext();

		String jspRelativePath = _jspDir.concat(
			component.getUncamelizedName(StringPool.UNDERLINE));

		context.put("component", component);
		context.put("namespace", component.getAttributeNamespace());
		context.put("jspRelativePath", jspRelativePath);

		return context;
	}

	private void _create() throws Exception {
		List<Component> components = _getComponents();

		for (Component component : components) {
			Map<String, Object> context = getTemplateContext(component);

			_createBaseTag(component, context);
			_createPageJSP(component, context);
			_createTag(component, context);
		}

		_createTld(components, getDefaultTemplateContext());
	}

	private void _createBaseTag(
			Component component, Map<String, Object> context)
		throws Exception {

		StringBuilder sb = new StringBuilder();

		sb.append(_javaOutputBaseDir);
		sb.append(_BASE_CLASS_PREFIX);
		sb.append(component.getSafeName());
		sb.append(_CLASS_SUFFIX);

		String content = _processTemplate(_tplTagBase, context);

		File tagFile = new File(sb.toString());

		_writeFile(tagFile, content);
	}

	private void _createPageJSP(
			Component component, Map<String, Object> context)
		throws Exception {

		String pathName = component.getUncamelizedName(StringPool.UNDERLINE);
		String path = _jspOutputDir.concat(pathName);

		String contentJsp = _processTemplate(_tplJsp, context);
		String contentInitJsp = _processTemplate(_tplInitJsp, context);

		_writeFile(new File(path.concat(_INIT_PAGE)), contentInitJsp);
		_writeFile(
			new File(path.concat(_INIT_EXT_PAGE)), StringPool.BLANK, false);

		if (component.isBodyContent()) {
			String contentStart = _processTemplate(_tplStartJsp, context);

			_writeFile(new File(path.concat(_START_PAGE)), contentStart, false);

			_writeFile(new File(path.concat(_END_PAGE)), contentJsp, false);
		}
		else {
			_writeFile(new File(path.concat(_PAGE)), contentJsp, false);
		}
	}

	private void _createTag(
			Component component, Map<String, Object> context)
		throws Exception {

		StringBuilder sb = new StringBuilder();

		sb.append(_javaOutputDir);
		sb.append(component.getSafeName());
		sb.append(_CLASS_SUFFIX);

		String content = _processTemplate(_tplTag, context);

		File tagFile = new File(sb.toString());

		_writeFile(tagFile, content);
	}

	private void _createTld(
			List<Component> components, Map<String, Object> context)
		throws Exception {

		context.put("components", components);

		String content = _processTemplate(_tplTld, context);

		File tagFile = new File(_tldDir.concat(_ALLOY_TLD));

		_writeFile(tagFile, content);
	}

	private List<Attribute> _getAttributes(Element componentNode) {
		return _getAttributes(componentNode, "attributes", "attribute");
	}

	private List<Attribute> _getAttributes(
		Element componentNode, String group, String node) {

		Element attributesNode = componentNode.element(group);
		List<Element> attributesNodes = attributesNode.elements(node);

		List<Attribute> attributes = new ArrayList<Attribute>();

		for (Element attributeNode : attributesNodes) {
			String name = attributeNode.attributeValue("name");
			String type = attributeNode.attributeValue("type");
			boolean required = GetterUtil.getBoolean(
				attributeNode.attributeValue("required"));

			attributes.add(new Attribute(name, type, required));
		}

		return attributes;
	}

	private List<Component> _getComponents() throws Exception {
		List<Component> components = new ArrayList<Component>();

		try {
			File file = new File(_componentsXML);

			SAXReader reader = new SAXReader();
			Document doc = reader.read(file);
			Element root = doc.getRootElement();

			List<Element> componentNodes = root.elements("component");

			for (Element node : componentNodes) {
				String namespace = GetterUtil.getString(
					node.attributeValue("namespace"), _DEFAULT_NAMESPACE);

				String name = node.attributeValue("name");
				String module = node.attributeValue("module");

				boolean bodyContent = GetterUtil.getBoolean(
					node.attributeValue("bodyContent"));

				Component component = new Component(
					namespace, name, module, bodyContent,
					_getAttributes(node), _getPrefixedEvents(node));

				components.add(component);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}

		return components;
	}

	private List<Attribute> _getEvents(Element componentNode) {
		return _getAttributes(componentNode, "events", "event");
	}

	private String _getJspDir(Component component, String page) {
		String componentName = StringUtil.uncamelize(
			component.getSafeName(), StringPool.UNDERLINE);

		return _jspDir.concat(componentName).concat(page);
	}

	private List<Attribute> _getPrefixedEvents(Element componentNode) {
		List<Attribute> afterEvents = _getAttributes(
			componentNode, "events", "event");

		List<Attribute> onEvents = _getAttributes(
			componentNode, "events", "event");

		List<Attribute> prefixedEvents = new ArrayList<Attribute>();

		for (Attribute event : afterEvents) {
			String name = _AFTER.concat(
				org.apache.commons.lang.StringUtils.capitalize(
					event.getSafeName()));

			event.setName(name);

			prefixedEvents.add(event);
		}

		for (Attribute event : onEvents) {
			String name = _ON.concat(
				org.apache.commons.lang.StringUtils.capitalize(
					event.getSafeName()));

			event.setName(name);

			prefixedEvents.add(event);
		}

		return prefixedEvents;
	}

	private String _processTemplate(String name, Map<String, Object> context)
		throws Exception {

		return com.liferay.portal.kernel.util.StringUtil.replace(
			FreeMarkerUtil.process(name, context), '\r', StringPool.BLANK);
	}

	private void _writeFile(File file, String content) {
		_writeFile(file, content, true);
	}

	private void _writeFile(File file, String content, boolean overwrite) {
		try {
			if (overwrite || !file.exists()) {
				String oldContent = StringPool.BLANK;

				if (file.exists()) {
					oldContent = FileUtil.read(file);
				}

				if (!file.exists() || !content.equals(oldContent)) {
					System.out.println("Writing " + file);

					FileUtil.write(file, content);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private static final String _AFTER = "after";
	private static final String _ALLOY_TLD = "alloy.tld";
	private static final String _BASE_CLASS_PREFIX = "Base";
	private static final String _CLASS_SUFFIX = "Tag.java";
	private static final String _DEFAULT_NAMESPACE = "alloy";
	private static final String _END_PAGE = "/end.jsp";
	private static final String _INIT_EXT_PAGE = "/init-ext.jsp";
	private static final String _INIT_PAGE = "/init.jsp";
	private static final String _ON = "on";
	private static final String _PAGE = "/page.jsp";
	private static final String _START_PAGE = "/start.jsp";

	private String _componentsXML;
	private String _javaOutputBaseDir;
	private String _javaOutputBasePackage;
	private String _javaOutputDir;
	private String _javaOutputPackage;
	private String _jspDir;
	private String _jspOutputDir;
	private String _templatesDir;
	private String _tldDir;
	private String _tplInitJsp;
	private String _tplJsp;
	private String _tplStartJsp;
	private String _tplTag;
	private String _tplTagBase;
	private String _tplTld;

}
