<%@ page import="java.io.Serializable"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.Locale"%>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.Set"%>
<%@ page import="com.liferay.alloy.util.PropsValues"%>
<%@ page import="com.liferay.alloy.util.GetterUtil" %>
<%@ page import="com.liferay.alloy.util.JSONFactoryUtil"%>
<%@ page import="com.liferay.alloy.util.MarkupUtil"%>
<%@ page import="com.liferay.alloy.util.StringUtil"%>
<%@ page import="com.liferay.portal.kernel.servlet.taglib.aui.ScriptData"%>
<%@ page import="com.liferay.portal.kernel.util.StringBundler"%>
<%@ page import="com.liferay.portal.kernel.util.StringPool" %>
<%@ page import="com.liferay.portal.kernel.util.Validator"%>
<%@ page import="org.json.JSONObject" %>
<%@ page import="org.json.JSONArray" %>

<%!
public static void _updateOptions(Map<String, Object> options, String key, Object value) {
	if ((options != null) && options.containsKey(key)) {
		options.put(key, value);
	}
}
%>

<%
java.lang.String NAMESPACE = "alloy:tree-view-dd:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view-dd:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:tree-view-dd:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.lang.String _checkContainerEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:checkContainerEl"));
java.lang.String _checkEl = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:checkEl"));
java.lang.String _checkName = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:checkName"), "tree-node-check");
java.lang.Boolean _checked = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:tree-view-dd:checked"), false);
java.util.ArrayList _children = JSONFactoryUtil.getArrayList(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view-dd:children"), "[]"));
java.lang.String _container = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:container"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:tree-view-dd:destroyed"), false);
java.lang.String _dropAction = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:dropAction"));
java.lang.String _helper = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:helper"));
java.util.HashMap _index = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view-dd:index"), "{}"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:tree-view-dd:initialized"), false);
java.util.HashMap _io = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:tree-view-dd:io")));
java.lang.Object _lastSelected = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:lastSelected");
java.lang.Number _lastY = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:tree-view-dd:lastY")), 0);
java.lang.Object _nodeContent = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:nodeContent");
java.lang.Number _scrollDelay = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:tree-view-dd:scrollDelay")), 100);
java.lang.String _type = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:tree-view-dd:type"), "file");
java.lang.Object _afterCheckContainerElChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterCheckContainerElChange");
java.lang.Object _afterCheckElChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterCheckElChange");
java.lang.Object _afterCheckNameChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterCheckNameChange");
java.lang.Object _afterCheckedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterCheckedChange");
java.lang.Object _afterChildrenChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterChildrenChange");
java.lang.Object _afterContainerChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterContainerChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterDestroyedChange");
java.lang.Object _afterDropActionChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterDropActionChange");
java.lang.Object _afterHelperChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterHelperChange");
java.lang.Object _afterIndexChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterIndexChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterInitializedChange");
java.lang.Object _afterIoChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterIoChange");
java.lang.Object _afterLastSelectedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterLastSelectedChange");
java.lang.Object _afterLastYChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterLastYChange");
java.lang.Object _afterNodeContentChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterNodeContentChange");
java.lang.Object _afterScrollDelayChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterScrollDelayChange");
java.lang.Object _afterTypeChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:afterTypeChange");
java.lang.Object _onCheckContainerElChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onCheckContainerElChange");
java.lang.Object _onCheckElChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onCheckElChange");
java.lang.Object _onCheckNameChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onCheckNameChange");
java.lang.Object _onCheckedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onCheckedChange");
java.lang.Object _onChildrenChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onChildrenChange");
java.lang.Object _onContainerChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onContainerChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onDestroyedChange");
java.lang.Object _onDropActionChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onDropActionChange");
java.lang.Object _onHelperChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onHelperChange");
java.lang.Object _onIndexChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onIndexChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onInitializedChange");
java.lang.Object _onIoChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onIoChange");
java.lang.Object _onLastSelectedChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onLastSelectedChange");
java.lang.Object _onLastYChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onLastYChange");
java.lang.Object _onNodeContentChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onNodeContentChange");
java.lang.Object _onScrollDelayChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onScrollDelayChange");
java.lang.Object _onTypeChange = (java.lang.Object)request.getAttribute("alloy:tree-view-dd:onTypeChange");

_updateOptions(options, "checkContainerEl", _checkContainerEl);
_updateOptions(options, "checkEl", _checkEl);
_updateOptions(options, "checkName", _checkName);
_updateOptions(options, "checked", _checked);
_updateOptions(options, "children", _children);
_updateOptions(options, "container", _container);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "dropAction", _dropAction);
_updateOptions(options, "helper", _helper);
_updateOptions(options, "index", _index);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "io", _io);
_updateOptions(options, "lastSelected", _lastSelected);
_updateOptions(options, "lastY", _lastY);
_updateOptions(options, "nodeContent", _nodeContent);
_updateOptions(options, "scrollDelay", _scrollDelay);
_updateOptions(options, "type", _type);
_updateOptions(options, "afterCheckContainerElChange", _afterCheckContainerElChange);
_updateOptions(options, "afterCheckElChange", _afterCheckElChange);
_updateOptions(options, "afterCheckNameChange", _afterCheckNameChange);
_updateOptions(options, "afterCheckedChange", _afterCheckedChange);
_updateOptions(options, "afterChildrenChange", _afterChildrenChange);
_updateOptions(options, "afterContainerChange", _afterContainerChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterDropActionChange", _afterDropActionChange);
_updateOptions(options, "afterHelperChange", _afterHelperChange);
_updateOptions(options, "afterIndexChange", _afterIndexChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterIoChange", _afterIoChange);
_updateOptions(options, "afterLastSelectedChange", _afterLastSelectedChange);
_updateOptions(options, "afterLastYChange", _afterLastYChange);
_updateOptions(options, "afterNodeContentChange", _afterNodeContentChange);
_updateOptions(options, "afterScrollDelayChange", _afterScrollDelayChange);
_updateOptions(options, "afterTypeChange", _afterTypeChange);
_updateOptions(options, "onCheckContainerElChange", _onCheckContainerElChange);
_updateOptions(options, "onCheckElChange", _onCheckElChange);
_updateOptions(options, "onCheckNameChange", _onCheckNameChange);
_updateOptions(options, "onCheckedChange", _onCheckedChange);
_updateOptions(options, "onChildrenChange", _onChildrenChange);
_updateOptions(options, "onContainerChange", _onContainerChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onDropActionChange", _onDropActionChange);
_updateOptions(options, "onHelperChange", _onHelperChange);
_updateOptions(options, "onIndexChange", _onIndexChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onIoChange", _onIoChange);
_updateOptions(options, "onLastSelectedChange", _onLastSelectedChange);
_updateOptions(options, "onLastYChange", _onLastYChange);
_updateOptions(options, "onNodeContentChange", _onNodeContentChange);
_updateOptions(options, "onScrollDelayChange", _onScrollDelayChange);
_updateOptions(options, "onTypeChange", _onTypeChange);
%>

<%@ include file="init-ext.jsp" %>