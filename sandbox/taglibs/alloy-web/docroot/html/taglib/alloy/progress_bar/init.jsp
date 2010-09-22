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
java.lang.String NAMESPACE = "alloy:progress-bar:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:progress-bar:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:progress-bar:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.lang.String _cssClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:cssClass"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:progress-bar:destroyed"), false);
java.lang.Boolean _disabled = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:progress-bar:disabled"), false);
java.lang.Boolean _focused = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:progress-bar:focused"), false);
java.lang.Integer _height = GetterUtil.getInteger(String.valueOf(request.getAttribute("alloy:progress-bar:height")), 25);
java.lang.String _hideClass = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:hideClass"), "aui-helper-hidden");
java.lang.String _progressbarId = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:progressbarId"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:progress-bar:initialized"), false);
java.lang.String _label = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:label"));
java.lang.Integer _max = GetterUtil.getInteger(String.valueOf(request.getAttribute("alloy:progress-bar:max")), 100);
java.lang.Integer _min = GetterUtil.getInteger(String.valueOf(request.getAttribute("alloy:progress-bar:min")), 0);
java.lang.String _orientation = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:orientation"), "horizontal");
java.lang.Number _ratio = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:progress-bar:ratio")), 0);
java.lang.Object _render = (java.lang.Object)request.getAttribute("alloy:progress-bar:render");
java.lang.Boolean _rendered = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:progress-bar:rendered"), false);
java.lang.String _statusNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:statusNode"));
java.lang.Number _step = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:progress-bar:step")), 0);
java.util.HashMap _strings = JSONFactoryUtil.getHashMap(GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:progress-bar:strings")));
java.lang.Number _tabIndex = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:progress-bar:tabIndex")), 0);
java.lang.String _textNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:textNode"));
java.lang.Integer _progressbarValue = GetterUtil.getInteger(String.valueOf(request.getAttribute("alloy:progress-bar:progressbarValue")), 0);
java.lang.Boolean _visible = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:progress-bar:visible"), true);
java.lang.Object _width = (java.lang.Object)request.getAttribute("alloy:progress-bar:width");
java.lang.Object _afterBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterBoundingBoxChange");
java.lang.Object _afterContentBoxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterContentBoxChange");
java.lang.Object _afterCssClassChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterCssClassChange");
java.lang.Object _afterDestroy = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterDestroy");
java.lang.Object _afterDestroyedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterDestroyedChange");
java.lang.Object _afterDisabledChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterDisabledChange");
java.lang.Object _afterFocusedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterFocusedChange");
java.lang.Object _afterHeightChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterHeightChange");
java.lang.Object _afterHideClassChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterHideClassChange");
java.lang.Object _afterIdChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterIdChange");
java.lang.Object _afterInit = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterInit");
java.lang.Object _afterInitializedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterInitializedChange");
java.lang.Object _afterLabelChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterLabelChange");
java.lang.Object _afterMaxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterMaxChange");
java.lang.Object _afterMinChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterMinChange");
java.lang.Object _afterOrientationChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterOrientationChange");
java.lang.Object _afterRatioChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterRatioChange");
java.lang.Object _afterRenderChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterRenderChange");
java.lang.Object _afterRenderedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterRenderedChange");
java.lang.Object _afterSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterSrcNodeChange");
java.lang.Object _afterStatusNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterStatusNodeChange");
java.lang.Object _afterStepChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterStepChange");
java.lang.Object _afterStringsChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterStringsChange");
java.lang.Object _afterTabIndexChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterTabIndexChange");
java.lang.Object _afterTextNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterTextNodeChange");
java.lang.Object _afterValueChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterValueChange");
java.lang.Object _afterVisibleChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterVisibleChange");
java.lang.Object _afterContentUpdate = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterContentUpdate");
java.lang.Object _afterRender = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterRender");
java.lang.Object _afterWidthChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:afterWidthChange");
java.lang.Object _onBoundingBoxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onBoundingBoxChange");
java.lang.Object _onContentBoxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onContentBoxChange");
java.lang.Object _onCssClassChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onCssClassChange");
java.lang.Object _onDestroy = (java.lang.Object)request.getAttribute("alloy:progress-bar:onDestroy");
java.lang.Object _onDestroyedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onDestroyedChange");
java.lang.Object _onDisabledChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onDisabledChange");
java.lang.Object _onFocusedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onFocusedChange");
java.lang.Object _onHeightChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onHeightChange");
java.lang.Object _onHideClassChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onHideClassChange");
java.lang.Object _onIdChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onIdChange");
java.lang.Object _onInit = (java.lang.Object)request.getAttribute("alloy:progress-bar:onInit");
java.lang.Object _onInitializedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onInitializedChange");
java.lang.Object _onLabelChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onLabelChange");
java.lang.Object _onMaxChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onMaxChange");
java.lang.Object _onMinChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onMinChange");
java.lang.Object _onOrientationChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onOrientationChange");
java.lang.Object _onRatioChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onRatioChange");
java.lang.Object _onRenderChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onRenderChange");
java.lang.Object _onRenderedChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onRenderedChange");
java.lang.Object _onSrcNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onSrcNodeChange");
java.lang.Object _onStatusNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onStatusNodeChange");
java.lang.Object _onStepChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onStepChange");
java.lang.Object _onStringsChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onStringsChange");
java.lang.Object _onTabIndexChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onTabIndexChange");
java.lang.Object _onTextNodeChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onTextNodeChange");
java.lang.Object _onValueChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onValueChange");
java.lang.Object _onVisibleChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onVisibleChange");
java.lang.Object _onContentUpdate = (java.lang.Object)request.getAttribute("alloy:progress-bar:onContentUpdate");
java.lang.Object _onRender = (java.lang.Object)request.getAttribute("alloy:progress-bar:onRender");
java.lang.Object _onWidthChange = (java.lang.Object)request.getAttribute("alloy:progress-bar:onWidthChange");

_updateOptions(options, "boundingBox", _boundingBox);
_updateOptions(options, "contentBox", _contentBox);
_updateOptions(options, "cssClass", _cssClass);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "disabled", _disabled);
_updateOptions(options, "focused", _focused);
_updateOptions(options, "height", _height);
_updateOptions(options, "hideClass", _hideClass);
_updateOptions(options, "progressbarId", _progressbarId);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "label", _label);
_updateOptions(options, "max", _max);
_updateOptions(options, "min", _min);
_updateOptions(options, "orientation", _orientation);
_updateOptions(options, "ratio", _ratio);
_updateOptions(options, "render", _render);
_updateOptions(options, "rendered", _rendered);
_updateOptions(options, "srcNode", _srcNode);
_updateOptions(options, "statusNode", _statusNode);
_updateOptions(options, "step", _step);
_updateOptions(options, "strings", _strings);
_updateOptions(options, "tabIndex", _tabIndex);
_updateOptions(options, "textNode", _textNode);
_updateOptions(options, "progressbarValue", _progressbarValue);
_updateOptions(options, "visible", _visible);
_updateOptions(options, "width", _width);
_updateOptions(options, "afterBoundingBoxChange", _afterBoundingBoxChange);
_updateOptions(options, "afterContentBoxChange", _afterContentBoxChange);
_updateOptions(options, "afterCssClassChange", _afterCssClassChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterDisabledChange", _afterDisabledChange);
_updateOptions(options, "afterFocusedChange", _afterFocusedChange);
_updateOptions(options, "afterHeightChange", _afterHeightChange);
_updateOptions(options, "afterHideClassChange", _afterHideClassChange);
_updateOptions(options, "afterIdChange", _afterIdChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterLabelChange", _afterLabelChange);
_updateOptions(options, "afterMaxChange", _afterMaxChange);
_updateOptions(options, "afterMinChange", _afterMinChange);
_updateOptions(options, "afterOrientationChange", _afterOrientationChange);
_updateOptions(options, "afterRatioChange", _afterRatioChange);
_updateOptions(options, "afterRenderChange", _afterRenderChange);
_updateOptions(options, "afterRenderedChange", _afterRenderedChange);
_updateOptions(options, "afterSrcNodeChange", _afterSrcNodeChange);
_updateOptions(options, "afterStatusNodeChange", _afterStatusNodeChange);
_updateOptions(options, "afterStepChange", _afterStepChange);
_updateOptions(options, "afterStringsChange", _afterStringsChange);
_updateOptions(options, "afterTabIndexChange", _afterTabIndexChange);
_updateOptions(options, "afterTextNodeChange", _afterTextNodeChange);
_updateOptions(options, "afterValueChange", _afterValueChange);
_updateOptions(options, "afterVisibleChange", _afterVisibleChange);
_updateOptions(options, "afterContentUpdate", _afterContentUpdate);
_updateOptions(options, "afterRender", _afterRender);
_updateOptions(options, "afterWidthChange", _afterWidthChange);
_updateOptions(options, "onBoundingBoxChange", _onBoundingBoxChange);
_updateOptions(options, "onContentBoxChange", _onContentBoxChange);
_updateOptions(options, "onCssClassChange", _onCssClassChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onDisabledChange", _onDisabledChange);
_updateOptions(options, "onFocusedChange", _onFocusedChange);
_updateOptions(options, "onHeightChange", _onHeightChange);
_updateOptions(options, "onHideClassChange", _onHideClassChange);
_updateOptions(options, "onIdChange", _onIdChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onLabelChange", _onLabelChange);
_updateOptions(options, "onMaxChange", _onMaxChange);
_updateOptions(options, "onMinChange", _onMinChange);
_updateOptions(options, "onOrientationChange", _onOrientationChange);
_updateOptions(options, "onRatioChange", _onRatioChange);
_updateOptions(options, "onRenderChange", _onRenderChange);
_updateOptions(options, "onRenderedChange", _onRenderedChange);
_updateOptions(options, "onSrcNodeChange", _onSrcNodeChange);
_updateOptions(options, "onStatusNodeChange", _onStatusNodeChange);
_updateOptions(options, "onStepChange", _onStepChange);
_updateOptions(options, "onStringsChange", _onStringsChange);
_updateOptions(options, "onTabIndexChange", _onTabIndexChange);
_updateOptions(options, "onTextNodeChange", _onTextNodeChange);
_updateOptions(options, "onValueChange", _onValueChange);
_updateOptions(options, "onVisibleChange", _onVisibleChange);
_updateOptions(options, "onContentUpdate", _onContentUpdate);
_updateOptions(options, "onRender", _onRender);
_updateOptions(options, "onWidthChange", _onWidthChange);
%>

<%@ include file="init-ext.jsp" %>