package com.liferay.alloy.tools.tagbuilder;

import com.liferay.alloy.tools.model.Attribute;
import com.liferay.alloy.tools.model.Component;
import com.liferay.portal.freemarker.FreeMarkerUtil;
import com.liferay.portal.kernel.util.FileUtil;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.kernel.util.StringUtil;
import com.liferay.portal.kernel.xml.Document;
import com.liferay.portal.kernel.xml.Element;
import com.liferay.portal.kernel.xml.SAXReaderUtil;
import com.liferay.portal.util.FileImpl;
import com.liferay.portal.xml.SAXReaderImpl;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <a href="TagBuilder.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 */
public class TagBuilder {

	public TagBuilder(
			String componentsXML, String componentsExtXML, String templatesDir,
			String javaOutputDir, String javaOutputPackage,	String jspDir,
			String jspOutputDir, String jspCommonInitPath,
			String jspCommonInitOutputDir, String tldDir)
		throws Exception {

		if (SAXReaderUtil.getSAXReader() == null) {
			(new SAXReaderUtil()).setSAXReader(new SAXReaderImpl());
		}

		_componentsExtXML = Arrays.asList(StringUtil.split(componentsExtXML));
		_componentsXML = componentsXML;
		_templatesDir = templatesDir;
		_javaOutputDir = javaOutputDir;
		_javaOutputPackage = javaOutputPackage;
		_jspDir = jspDir;
		_jspOutputDir = jspOutputDir;
		_jspCommonInitPath = jspCommonInitPath;
		_jspCommonInitOutputDir = jspCommonInitOutputDir;
		_tldDir = tldDir;

		_tplTld = _templatesDir + "tld.ftl";
		_tplTag = _templatesDir + "tag.ftl";
		_tplTagBase = _templatesDir + "tag_base.ftl";
		_tplCommonInitJsp = _templatesDir + "common_init_jsp.ftl";
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
		String jspCommonInitOutputDir = System.getProperty("tagbuilder.jsp.common.init.output.dir");
		String jspCommonInitPath = System.getProperty("tagbuilder.jsp.common.init.path");
		String jspOutputDir = System.getProperty("tagbuilder.jsp.output.dir");
		String tldDir = System.getProperty("tagbuilder.tld.dir");

		new TagBuilder(
			componentsXML, componentsExtXML, templatesDir, javaOutputDir,
			javaOutputPackage, jspDir, jspOutputDir, jspCommonInitPath,
			jspCommonInitOutputDir,  tldDir);
	}

	public Map<String, Object> getDefaultTemplateContext() {
		Map<String, Object> context = new HashMap<String, Object>();

		context.put("authors", AUTHORS);
		context.put("jspCommonInitPath", _jspCommonInitPath);
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
		sb.append(component.getPackage());
		sb.append(StringPool.SLASH);

		return sb.toString();
	}

	public String getJspDir(Component component) {
		StringBuilder sb = new StringBuilder();

		sb.append(_jspDir);
		sb.append(component.getPackage());
		sb.append(StringPool.SLASH);

		return sb.toString();
	}

	public String getJspOutputDir(Component component) {
		StringBuilder sb = new StringBuilder();

		sb.append(_jspOutputDir);
		sb.append(component.getPackage());
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

		_createCommonInitJSP();
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

	private void _createCommonInitJSP() throws Exception {
		Map<String, Object> context = getDefaultTemplateContext();

		String contentCommonInitJsp = _processTemplate(_tplCommonInitJsp, context);

		File commonInitFile = new File(_jspCommonInitOutputDir);
		_writeFile(commonInitFile, contentCommonInitJsp, false);
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

			_writeFile(tldFile, outputDoc.asXML());
		}
	}

	private List<Component> _getAllComponents() throws Exception {
		Document doc = SAXReaderUtil.createDocument();
		Element root = _componentsDoc.getRootElement().createCopy();

		for (Document extDoc : _componentsExtDoc) {
			Document componentsDoc = extDoc;
			Element extRoot = componentsDoc.getRootElement();

			String extDefaultPackage = extRoot.attributeValue("short-name");
			List<Element> allExtComponentNodes = extRoot.elements("component");

			// Set package on each extNode to not inherit the shot-name from the original document
			for (Element extNode : allExtComponentNodes) {
				String extComponentPackage = GetterUtil.getString(
					extNode.attributeValue("package"), extDefaultPackage);

				extNode.addAttribute("package", extComponentPackage);
			}

			Document parentDoc = _getComponentsDoc(
				extDoc.getRootElement().attributeValue("extends"));

			if (parentDoc != null) {
				componentsDoc = _mergeAttributes(extDoc, parentDoc);
			}

			List<Element> extComponents =
				componentsDoc.getRootElement().elements("component");

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

	private Element _getComponentNode(Document doc, String name) {
		List<Element> components = doc.getRootElement().elements(_COMPONENT);

		for (Element component : components) {
			if (component.attributeValue("name").equals(name)) {
				return component;
			}
		}

		return null;
	}

	private List<Component> _getComponents(Document doc) throws Exception {
		List<Component> components = new ArrayList<Component>();
		Element root = doc.getRootElement();

		String defaultPackage = root.attributeValue("short-name");
		List<Element> allComponentNodes = root.elements("component");

		for (Element node : allComponentNodes) {
			String componentPackage = GetterUtil.getString(
				node.attributeValue("package"), defaultPackage);

			String name = node.attributeValue("name");

			boolean alloyComponent = GetterUtil.getBoolean(
				node.attributeValue("alloyComponent"));

			String module = GetterUtil.getString(
				node.attributeValue("module"));

			String parentClass = GetterUtil.getString(
				node.attributeValue("parentClass"), _DEFAULT_PARENT_CLASS);

			boolean bodyContent = GetterUtil.getBoolean(
				node.attributeValue("bodyContent"));

			Component component = new Component(
				componentPackage, name, alloyComponent, module, bodyContent,
				_getAttributes(node), _getPrefixedEvents(node));

			component.setParentClass(parentClass);

			components.add(component);
		}

		return components;
	}

	private Document _getComponentsDoc(String name) {
		List<Document> documents = new ArrayList<Document>();
		documents.add(_componentsDoc);
		documents.addAll(_componentsExtDoc);

		for (Document doc : documents) {
			Element root = doc.getRootElement();

			if (root.attributeValue("short-name").equals(name)) {
				return doc;
			}
		}

		return null;
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

	private Document _mergeAttributes(Document doc1, Document doc2) {
		Element doc1Root = doc1.getRootElement();

		Element docRoot = doc1Root.createCopy();
		docRoot.clearContent();

		Document doc = SAXReaderUtil.createDocument();
		doc.setRootElement(docRoot);

		List<Element> doc1Components = doc1Root.elements(_COMPONENT);

		for (Element doc1Component : doc1Components) {
			String name = doc1Component.attributeValue("name");

			Element doc2Component = _getComponentNode(doc2, name);

			if (doc2Component != null) {
				List<Element> doc2Attributes = doc2Component.element(
					_ATTRIBUTES).elements(_ATTRIBUTE);

				for (Element doc2Attribute : doc2Attributes) {
					doc1Component.element(_ATTRIBUTES).add(
						doc2Attribute.createCopy());
				}

				List<Element> doc2Events = doc2Component.element(
					_EVENTS).elements(_EVENT);

				for (Element doc2Event : doc2Events) {
					doc1Component.element(_EVENTS).add(doc2Event.createCopy());
				}
			}

			doc.getRootElement().add(doc1Component.createCopy());
		}

		return doc;
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
		if (FileUtil.getFile() == null) {
			(new FileUtil()).setFile(new FileImpl());
		}

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

	public static final String[] AUTHORS = new String[] {
		"Eduardo Lundgren", "Bruno Basto", "Nathan Cavanaugh"
	};

	private static final String _AFTER = "after";
	private static final String _ATTRIBUTE = "attribute";
	private static final String _ATTRIBUTES = "attributes";
	private static final String _BASE = "base";
	private static final String _BASE_CLASS_PREFIX = "Base";
	private static final String _CLASS_SUFFIX = "Tag.java";
	private static final String _COMPONENT = "component";
	private static final String _DEFAULT_NAMESPACE = "alloy";
	private static final String _DEFAULT_PARENT_CLASS = "com.liferay.taglib.util.IncludeTag";
	private static final String _DEFAULT_TAGLIB_SHORT_NAME = "alloy";
	private static final String _DEFAULT_TAGLIB_URI = "http://alloy.liferay.com/tld/alloy";
	private static final String _DEFAULT_TAGLIB_VERSION = "1.0";
	private static final String _DEFAULT_TYPE = "java.lang.Object";
	private static final String _END_PAGE = "/end.jsp";
	private static final String _EVENT = "event";
	private static final String _EVENTS = "events";
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
	private String _jspCommonInitPath;
	private String _jspCommonInitOutputDir;
	private String _templatesDir;
	private String _tldDir;
	private String _tplCommonInitJsp;
	private String _tplInitJsp;
	private String _tplJsp;
	private String _tplStartJsp;
	private String _tplTag;
	private String _tplTagBase;
	private String _tplTld;

}