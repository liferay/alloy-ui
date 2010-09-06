package com.liferay.alloy.tools.tagbuilder;

import java.io.*;
import java.util.*;

import com.liferay.alloy.tools.model.Component;
import com.liferay.alloy.tools.model.Attribute;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.alloy.util.xml.SAXReaderUtil;

import com.liferay.alloy.util.FileUtil;
import com.liferay.portal.freemarker.FreeMarkerUtil;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

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

	public TagBuilder(
			String componentsXML, String componentsExtXML, String templatesDir,
			String javaOutputDir, String javaOutputPackage,	String jspDir,
			String jspOutputDir, String tldDir)
		throws Exception {

		_componentsExtXML = Arrays.asList(StringUtil.split(componentsExtXML));
		_componentsXML = componentsXML;
		_templatesDir = templatesDir;
		_javaOutputDir = javaOutputDir;
		_javaOutputPackage = javaOutputPackage;
		_jspDir = jspDir;
		_jspOutputDir = jspOutputDir;
		_tldDir = tldDir;

		_tplTld = _templatesDir + "tld.ftl";
		_tplTag = _templatesDir + "tag.ftl";
		_tplTagBase = _templatesDir + "tag_base.ftl";
		_tplJsp = _templatesDir + "jsp.ftl";
		_tplInitJsp = _templatesDir + "init_jsp.ftl";
		_tplStartJsp = _templatesDir + "start_jsp.ftl";

		_componentsExtDoc = new ArrayList<Document>();

		_componentsDoc = SAXReaderUtil.read(new File(_componentsXML));

		for (String componentExtXML : _componentsExtXML) {
			File extFile = new File(componentExtXML);

			if (extFile.exists()) {
				_componentsExtDoc.add(SAXReaderUtil.read(extFile));
			}
		}

		_create();
	}

	public static void main(String[] args) throws Exception {
		String componentsXML = System.getProperty("tagbuilder.components.xml");
		String componentsExtXML = System.getProperty("tagbuilder.components.ext.xml");
		String templatesDir = System.getProperty("tagbuilder.templates.dir");
		String javaOutputDir = System.getProperty("tagbuilder.java.output.dir");
		String javaOutputPackage = System.getProperty("tagbuilder.java.output.package");
		String jspDir = System.getProperty("tagbuilder.jsp.dir");
		String jspOutputDir = System.getProperty("tagbuilder.jsp.output.dir");
		String tldDir = System.getProperty("tagbuilder.tld.dir");

		new TagBuilder(
			componentsXML, componentsExtXML, templatesDir, javaOutputDir,
			javaOutputPackage, jspDir, jspOutputDir, tldDir);
	}

	public Map<String, Object> getDefaultTemplateContext() {
		Map<String, Object> context = new HashMap<String, Object>();

		context.put("authors", AUTHORS);
		context.put("jspDir", _jspDir);
		context.put("packagePath", _javaOutputPackage);

		return context;
	}

	public String getJavaOutputBaseDir(Component component) {
		StringBuilder sb = new StringBuilder();

		sb.append(getJavaOutputDir(component));
		sb.append(_BASE);
		sb.append(StringPool.SLASH);

		return sb.toString();
	}

	public String getJavaOutputDir(Component component) {
		StringBuilder sb = new StringBuilder();

		sb.append(_javaOutputDir);
		sb.append(component.getNamespace());
		sb.append(StringPool.SLASH);

		return sb.toString();
	}

	public String getJspDir(Component component) {
		StringBuilder sb = new StringBuilder();

		sb.append(_jspDir);
		sb.append(component.getNamespace());
		sb.append(StringPool.SLASH);

		return sb.toString();
	}

	public String getJspOutputDir(Component component) {
		StringBuilder sb = new StringBuilder();

		sb.append(_jspOutputDir);
		sb.append(component.getNamespace());
		sb.append(StringPool.SLASH);

		return sb.toString();
	}

	public Map<String, Object> getTemplateContext(Component component) {
		Map<String, Object> context = getDefaultTemplateContext();

		String jspRelativePath = getJspDir(component).concat(
			component.getUncamelizedName(StringPool.UNDERLINE));

		context.put("component", component);
		context.put("namespace", component.getAttributeNamespace());
		context.put("jspRelativePath", jspRelativePath);

		return context;
	}

	private void _create() throws Exception {
		List<Component> components = _getAllComponents();

		for (Component component : components) {
			Map<String, Object> context = getTemplateContext(component);

			_createBaseTag(component, context);
			_createPageJSP(component, context);
			_createTag(component, context);
		}

		_createTld();
	}

	private void _createBaseTag(
			Component component, Map<String, Object> context)
		throws Exception {

		StringBuilder sb = new StringBuilder();

		sb.append(getJavaOutputBaseDir(component));
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
		String path = getJspOutputDir(component).concat(pathName);

		String contentJsp = _processTemplate(_tplJsp, context);
		String contentInitJsp = _processTemplate(_tplInitJsp, context);

		File initFile = new File(path.concat(_INIT_PAGE));
		File initExtFile = new File(path.concat(_INIT_EXT_PAGE));

		_writeFile(initFile, contentInitJsp);
		_writeFile(initExtFile, StringPool.BLANK, false);

		if (component.isBodyContent()) {
			String contentStart = _processTemplate(_tplStartJsp, context);

			File startFile = new File(path.concat(_START_PAGE));
			File endFile = new File(path.concat(_END_PAGE));

			_writeFile(startFile, contentStart, false);
			_writeFile(endFile, contentJsp, false);
		}
		else {
			File pageFile = new File(path.concat(_PAGE));

			_writeFile(pageFile, contentJsp, false);
		}
	}

	private void _createTag(
			Component component, Map<String, Object> context)
		throws Exception {

		StringBuilder sb = new StringBuilder();

		sb.append(getJavaOutputDir(component));
		sb.append(component.getSafeName());
		sb.append(_CLASS_SUFFIX);

		String content = _processTemplate(_tplTag, context);

		File tagFile = new File(sb.toString());

		_writeFile(tagFile, content, false);
	}

	private void _createTld() throws Exception {
		Map<String, Object> context = getDefaultTemplateContext();

		List<Document> documents = new ArrayList<Document>();
		documents.add(_componentsDoc);
		documents.addAll(_componentsExtDoc);

		for (Document doc : documents) {
			Element root = doc.getRootElement();
			String shortName = GetterUtil.getString(
				root.attributeValue("short-name"), _DEFAULT_TAGLIB_SHORT_NAME);

			String uri = GetterUtil.getString(
				root.attributeValue("uri"), _DEFAULT_TAGLIB_URI);

			String version = GetterUtil.getString(
				root.attributeValue("tlib-version"), _DEFAULT_TAGLIB_VERSION);

			context.put("alloyComponent", shortName.equals(_DEFAULT_NAMESPACE));
			context.put("shortName", shortName);
			context.put("uri", uri);
			context.put("version", version);
			context.put("components", _getComponents(doc));

			String content = _processTemplate(_tplTld, context);

			String tldFilePath = _tldDir.concat(
				shortName).concat(_TLD_EXTENSION);

			File tldFile = new File(tldFilePath);

			Document outputDoc = SAXReaderUtil.read(content);

			if (tldFile.exists()) {
				outputDoc = _mergeTlds(SAXReaderUtil.read(tldFile), outputDoc);
			}

			_writeXML(tldFile, outputDoc);
		}
	}

	private List<Component> _getAllComponents() throws Exception {
		Document doc = SAXReaderUtil.createDocument();
		Element root = _componentsDoc.getRootElement().createCopy();

		for (Document extDoc : _componentsExtDoc) {
			List<Element> extComponents =
				extDoc.getRootElement().elements("component");

			for (Element extComponent : extComponents) {
				root.add(extComponent.createCopy());
			}
		}

		doc.add(root);

		return _getComponents(doc);
	}

	private List<Attribute> _getAttributes(Element componentNode) {
		return _getAttributes(componentNode, "attributes", "attribute");
	}

	private List<Attribute> _getAttributes(
		Element componentNode, String group, String nodeName) {

		List<Element> nodes = Collections.EMPTY_LIST;

		List<Attribute> attributes = new ArrayList<Attribute>();

		Element node = componentNode.element(group);

		if (node != null) {
			nodes = node.elements(nodeName);
		}

		for (Element attributeNode : nodes) {
			String name = attributeNode.elementText("name");
			String type = GetterUtil.getString(
				attributeNode.elementText("type"), _DEFAULT_TYPE);

			String inputType = GetterUtil.getString(
				attributeNode.elementText("inputType"), type);

			String outputType = GetterUtil.getString(
				attributeNode.elementText("outputType"), type);

			String defaultValue = attributeNode.elementText("defaultValue");
			String description = attributeNode.elementText("description");
			boolean required = GetterUtil.getBoolean(
				attributeNode.elementText("required"));

			attributes.add(
				new Attribute(name, inputType, outputType, defaultValue,
				description, required));
		}

		return attributes;
	}

	private List<Component> _getComponents(Document doc) throws Exception {
		List<Component> components = new ArrayList<Component>();

		List<Element> allComponentNodes =
			doc.getRootElement().elements("component");

		for (Element node : allComponentNodes) {
			String namespace = GetterUtil.getString(
				node.attributeValue("namespace"), _DEFAULT_NAMESPACE);

			String name = node.attributeValue("name");
			boolean alloyComponent = GetterUtil.getBoolean(
				node.attributeValue("alloyComponent"));

			String module = GetterUtil.getString(
				node.attributeValue("module"));

			boolean bodyContent = GetterUtil.getBoolean(
				node.attributeValue("bodyContent"));

			Component component = new Component(
				namespace, name, alloyComponent, module, bodyContent,
				_getAttributes(node), _getPrefixedEvents(node));

			components.add(component);
		}

		return components;
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

	private Document _mergeTlds(Document doc1, Document doc2) {
		Document doc = SAXReaderUtil.createDocument();

		doc.setRootElement(doc1.getRootElement().createCopy());

		List<Element> tags = doc2.getRootElement().elements("tag");

		for (Element tag : tags) {
			doc.getRootElement().add(tag.createCopy());
		}

		return doc;
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

	private void _writeXML(File xmlFile, Document doc) {
		try {
			XMLWriter writer = new XMLWriter(
				new FileOutputStream(xmlFile),
				OutputFormat.createPrettyPrint());

			writer.write(doc);
			writer.flush();

			System.out.println("Writing " + xmlFile.getPath());
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static final String _AFTER = "after";
	private static final String _BASE = "base";
	private static final String _BASE_CLASS_PREFIX = "Base";
	private static final String _CLASS_SUFFIX = "Tag.java";
	private static final String _DEFAULT_NAMESPACE = "alloy";
	private static final String _DEFAULT_TAGLIB_SHORT_NAME = "alloy";
	private static final String _DEFAULT_TAGLIB_URI = "http://alloy.liferay.com/tld/alloy";
	private static final String _DEFAULT_TAGLIB_VERSION = "1.0";
	private static final String _DEFAULT_TYPE = "java.lang.Object";
	private static final String _END_PAGE = "/end.jsp";
	private static final String _INIT_EXT_PAGE = "/init-ext.jsp";
	private static final String _INIT_PAGE = "/init.jsp";
	private static final String _ON = "on";
	private static final String _PAGE = "/page.jsp";
	private static final String _START_PAGE = "/start.jsp";
	private static final String _TLD_EXTENSION = ".tld";

	private Document _componentsDoc;
	private List<Document> _componentsExtDoc;
	private List<String> _componentsExtXML;
	private String _componentsXML;
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