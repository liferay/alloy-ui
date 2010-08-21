<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:progress-bar:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:progress-bar:scopedAttributes");

String uniqueId = StringPool.BLANK;
String srcNode = StringPool.BLANK;

boolean useMarkup = GetterUtil.getBoolean((java.io.Serializable)dynamicAttributes.get("useMarkup"));

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();
	
	scopedAttributes.put("srcNode", StringPool.POUND.concat(uniqueId));
}

java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:destroyed"));
java.lang.Integer _height = GetterUtil.getInteger((java.lang.String)request.getAttribute("alloy:progress-bar:height"));
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.String)request.getAttribute("alloy:progress-bar:initialized"));
java.lang.String _label = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:label"));
java.lang.Integer _max = GetterUtil.getInteger((java.lang.String)request.getAttribute("alloy:progress-bar:max"));
java.lang.Integer _min = GetterUtil.getInteger((java.lang.String)request.getAttribute("alloy:progress-bar:min"));
java.lang.String _orientation = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:orientation"));
java.lang.Number _ratio = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:progress-bar:ratio"));
java.lang.String _statusNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:statusNode"));
java.lang.Number _step = GetterUtil.getNumber((java.lang.String)request.getAttribute("alloy:progress-bar:step"));
java.lang.String _textNode = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:textNode"));
java.lang.Integer _progressbarValue = GetterUtil.getInteger((java.lang.String)request.getAttribute("alloy:progress-bar:progressbarValue"));
java.lang.String _afterDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterDestroy"));
java.lang.String _afterDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterDestroyedChange"));
java.lang.String _afterHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterHeightChange"));
java.lang.String _afterInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterInit"));
java.lang.String _afterInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterInitializedChange"));
java.lang.String _afterLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterLabelChange"));
java.lang.String _afterMaxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterMaxChange"));
java.lang.String _afterMinChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterMinChange"));
java.lang.String _afterOrientationChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterOrientationChange"));
java.lang.String _afterRatioChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterRatioChange"));
java.lang.String _afterStatusNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterStatusNodeChange"));
java.lang.String _afterStepChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterStepChange"));
java.lang.String _afterTextNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterTextNodeChange"));
java.lang.String _afterValueChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:afterValueChange"));
java.lang.String _onDestroy = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onDestroy"));
java.lang.String _onDestroyedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onDestroyedChange"));
java.lang.String _onHeightChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onHeightChange"));
java.lang.String _onInit = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onInit"));
java.lang.String _onInitializedChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onInitializedChange"));
java.lang.String _onLabelChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onLabelChange"));
java.lang.String _onMaxChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onMaxChange"));
java.lang.String _onMinChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onMinChange"));
java.lang.String _onOrientationChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onOrientationChange"));
java.lang.String _onRatioChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onRatioChange"));
java.lang.String _onStatusNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onStatusNodeChange"));
java.lang.String _onStepChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onStepChange"));
java.lang.String _onTextNodeChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onTextNodeChange"));
java.lang.String _onValueChange = GetterUtil.getString((java.lang.String)request.getAttribute("alloy:progress-bar:onValueChange"));
%>

<%@ include file="init-ext.jsp" %>

<%
if (request.getAttribute("alloy:progress-bar:destroyed") != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (request.getAttribute("alloy:progress-bar:height") != null) {
	scopedAttributes.put("height", _height);
}

if (request.getAttribute("alloy:progress-bar:initialized") != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (request.getAttribute("alloy:progress-bar:label") != null) {
	scopedAttributes.put("label", _label);
}

if (request.getAttribute("alloy:progress-bar:max") != null) {
	scopedAttributes.put("max", _max);
}

if (request.getAttribute("alloy:progress-bar:min") != null) {
	scopedAttributes.put("min", _min);
}

if (request.getAttribute("alloy:progress-bar:orientation") != null) {
	scopedAttributes.put("orientation", _orientation);
}

if (request.getAttribute("alloy:progress-bar:ratio") != null) {
	scopedAttributes.put("ratio", _ratio);
}

if (request.getAttribute("alloy:progress-bar:statusNode") != null) {
	scopedAttributes.put("statusNode", _statusNode);
}

if (request.getAttribute("alloy:progress-bar:step") != null) {
	scopedAttributes.put("step", _step);
}

if (request.getAttribute("alloy:progress-bar:textNode") != null) {
	scopedAttributes.put("textNode", _textNode);
}

if (request.getAttribute("alloy:progress-bar:progressbarValue") != null) {
	scopedAttributes.put("progressbarValue", _progressbarValue);
}

if (request.getAttribute("alloy:progress-bar:afterDestroy") != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (request.getAttribute("alloy:progress-bar:afterDestroyedChange") != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (request.getAttribute("alloy:progress-bar:afterHeightChange") != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (request.getAttribute("alloy:progress-bar:afterInit") != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (request.getAttribute("alloy:progress-bar:afterInitializedChange") != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (request.getAttribute("alloy:progress-bar:afterLabelChange") != null) {
	scopedAttributes.put("afterLabelChange", _afterLabelChange);
}

if (request.getAttribute("alloy:progress-bar:afterMaxChange") != null) {
	scopedAttributes.put("afterMaxChange", _afterMaxChange);
}

if (request.getAttribute("alloy:progress-bar:afterMinChange") != null) {
	scopedAttributes.put("afterMinChange", _afterMinChange);
}

if (request.getAttribute("alloy:progress-bar:afterOrientationChange") != null) {
	scopedAttributes.put("afterOrientationChange", _afterOrientationChange);
}

if (request.getAttribute("alloy:progress-bar:afterRatioChange") != null) {
	scopedAttributes.put("afterRatioChange", _afterRatioChange);
}

if (request.getAttribute("alloy:progress-bar:afterStatusNodeChange") != null) {
	scopedAttributes.put("afterStatusNodeChange", _afterStatusNodeChange);
}

if (request.getAttribute("alloy:progress-bar:afterStepChange") != null) {
	scopedAttributes.put("afterStepChange", _afterStepChange);
}

if (request.getAttribute("alloy:progress-bar:afterTextNodeChange") != null) {
	scopedAttributes.put("afterTextNodeChange", _afterTextNodeChange);
}

if (request.getAttribute("alloy:progress-bar:afterValueChange") != null) {
	scopedAttributes.put("afterValueChange", _afterValueChange);
}

if (request.getAttribute("alloy:progress-bar:onDestroy") != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (request.getAttribute("alloy:progress-bar:onDestroyedChange") != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (request.getAttribute("alloy:progress-bar:onHeightChange") != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (request.getAttribute("alloy:progress-bar:onInit") != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (request.getAttribute("alloy:progress-bar:onInitializedChange") != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (request.getAttribute("alloy:progress-bar:onLabelChange") != null) {
	scopedAttributes.put("onLabelChange", _onLabelChange);
}

if (request.getAttribute("alloy:progress-bar:onMaxChange") != null) {
	scopedAttributes.put("onMaxChange", _onMaxChange);
}

if (request.getAttribute("alloy:progress-bar:onMinChange") != null) {
	scopedAttributes.put("onMinChange", _onMinChange);
}

if (request.getAttribute("alloy:progress-bar:onOrientationChange") != null) {
	scopedAttributes.put("onOrientationChange", _onOrientationChange);
}

if (request.getAttribute("alloy:progress-bar:onRatioChange") != null) {
	scopedAttributes.put("onRatioChange", _onRatioChange);
}

if (request.getAttribute("alloy:progress-bar:onStatusNodeChange") != null) {
	scopedAttributes.put("onStatusNodeChange", _onStatusNodeChange);
}

if (request.getAttribute("alloy:progress-bar:onStepChange") != null) {
	scopedAttributes.put("onStepChange", _onStepChange);
}

if (request.getAttribute("alloy:progress-bar:onTextNodeChange") != null) {
	scopedAttributes.put("onTextNodeChange", _onTextNodeChange);
}

if (request.getAttribute("alloy:progress-bar:onValueChange") != null) {
	scopedAttributes.put("onValueChange", _onValueChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes,useMarkup"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>