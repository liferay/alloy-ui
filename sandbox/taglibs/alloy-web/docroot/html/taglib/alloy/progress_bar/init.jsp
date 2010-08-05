<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:progress-bar:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:progress-bar:scopedAttributes");

java.lang.Boolean _destroyed = (java.lang.Boolean)request.getAttribute("alloy:progress-bar:destroyed");
java.lang.Integer _height = (java.lang.Integer)request.getAttribute("alloy:progress-bar:height");
java.lang.Boolean _initialized = (java.lang.Boolean)request.getAttribute("alloy:progress-bar:initialized");
java.lang.String _label = (java.lang.String)request.getAttribute("alloy:progress-bar:label");
java.lang.Integer _max = (java.lang.Integer)request.getAttribute("alloy:progress-bar:max");
java.lang.Integer _min = (java.lang.Integer)request.getAttribute("alloy:progress-bar:min");
java.lang.String _orientation = (java.lang.String)request.getAttribute("alloy:progress-bar:orientation");
java.lang.Number _ratio = (java.lang.Number)request.getAttribute("alloy:progress-bar:ratio");
java.lang.String _statusNode = (java.lang.String)request.getAttribute("alloy:progress-bar:statusNode");
java.lang.Number _step = (java.lang.Number)request.getAttribute("alloy:progress-bar:step");
java.lang.String _textNode = (java.lang.String)request.getAttribute("alloy:progress-bar:textNode");
java.lang.Integer _progressbarValue = (java.lang.Integer)request.getAttribute("alloy:progress-bar:progressbarValue");
java.lang.String _afterDestroy = (java.lang.String)request.getAttribute("alloy:progress-bar:afterDestroy");
java.lang.String _afterDestroyedChange = (java.lang.String)request.getAttribute("alloy:progress-bar:afterDestroyedChange");
java.lang.String _afterHeightChange = (java.lang.String)request.getAttribute("alloy:progress-bar:afterHeightChange");
java.lang.String _afterInit = (java.lang.String)request.getAttribute("alloy:progress-bar:afterInit");
java.lang.String _afterInitializedChange = (java.lang.String)request.getAttribute("alloy:progress-bar:afterInitializedChange");
java.lang.String _afterLabelChange = (java.lang.String)request.getAttribute("alloy:progress-bar:afterLabelChange");
java.lang.String _afterMaxChange = (java.lang.String)request.getAttribute("alloy:progress-bar:afterMaxChange");
java.lang.String _afterMinChange = (java.lang.String)request.getAttribute("alloy:progress-bar:afterMinChange");
java.lang.String _afterOrientationChange = (java.lang.String)request.getAttribute("alloy:progress-bar:afterOrientationChange");
java.lang.String _afterRatioChange = (java.lang.String)request.getAttribute("alloy:progress-bar:afterRatioChange");
java.lang.String _afterStatusNodeChange = (java.lang.String)request.getAttribute("alloy:progress-bar:afterStatusNodeChange");
java.lang.String _afterStepChange = (java.lang.String)request.getAttribute("alloy:progress-bar:afterStepChange");
java.lang.String _afterTextNodeChange = (java.lang.String)request.getAttribute("alloy:progress-bar:afterTextNodeChange");
java.lang.String _afterValueChange = (java.lang.String)request.getAttribute("alloy:progress-bar:afterValueChange");
java.lang.String _onDestroy = (java.lang.String)request.getAttribute("alloy:progress-bar:onDestroy");
java.lang.String _onDestroyedChange = (java.lang.String)request.getAttribute("alloy:progress-bar:onDestroyedChange");
java.lang.String _onHeightChange = (java.lang.String)request.getAttribute("alloy:progress-bar:onHeightChange");
java.lang.String _onInit = (java.lang.String)request.getAttribute("alloy:progress-bar:onInit");
java.lang.String _onInitializedChange = (java.lang.String)request.getAttribute("alloy:progress-bar:onInitializedChange");
java.lang.String _onLabelChange = (java.lang.String)request.getAttribute("alloy:progress-bar:onLabelChange");
java.lang.String _onMaxChange = (java.lang.String)request.getAttribute("alloy:progress-bar:onMaxChange");
java.lang.String _onMinChange = (java.lang.String)request.getAttribute("alloy:progress-bar:onMinChange");
java.lang.String _onOrientationChange = (java.lang.String)request.getAttribute("alloy:progress-bar:onOrientationChange");
java.lang.String _onRatioChange = (java.lang.String)request.getAttribute("alloy:progress-bar:onRatioChange");
java.lang.String _onStatusNodeChange = (java.lang.String)request.getAttribute("alloy:progress-bar:onStatusNodeChange");
java.lang.String _onStepChange = (java.lang.String)request.getAttribute("alloy:progress-bar:onStepChange");
java.lang.String _onTextNodeChange = (java.lang.String)request.getAttribute("alloy:progress-bar:onTextNodeChange");
java.lang.String _onValueChange = (java.lang.String)request.getAttribute("alloy:progress-bar:onValueChange");
%>

<%@ include file="init-ext.jsp" %>

<%
if (_destroyed != null) {
	scopedAttributes.put("destroyed", _destroyed);
}

if (_height != null) {
	scopedAttributes.put("height", _height);
}

if (_initialized != null) {
	scopedAttributes.put("initialized", _initialized);
}

if (_label != null) {
	scopedAttributes.put("label", _label);
}

if (_max != null) {
	scopedAttributes.put("max", _max);
}

if (_min != null) {
	scopedAttributes.put("min", _min);
}

if (_orientation != null) {
	scopedAttributes.put("orientation", _orientation);
}

if (_ratio != null) {
	scopedAttributes.put("ratio", _ratio);
}

if (_statusNode != null) {
	scopedAttributes.put("statusNode", _statusNode);
}

if (_step != null) {
	scopedAttributes.put("step", _step);
}

if (_textNode != null) {
	scopedAttributes.put("textNode", _textNode);
}

if (_progressbarValue != null) {
	scopedAttributes.put("progressbarValue", _progressbarValue);
}

if (_afterDestroy != null) {
	scopedAttributes.put("afterDestroy", _afterDestroy);
}

if (_afterDestroyedChange != null) {
	scopedAttributes.put("afterDestroyedChange", _afterDestroyedChange);
}

if (_afterHeightChange != null) {
	scopedAttributes.put("afterHeightChange", _afterHeightChange);
}

if (_afterInit != null) {
	scopedAttributes.put("afterInit", _afterInit);
}

if (_afterInitializedChange != null) {
	scopedAttributes.put("afterInitializedChange", _afterInitializedChange);
}

if (_afterLabelChange != null) {
	scopedAttributes.put("afterLabelChange", _afterLabelChange);
}

if (_afterMaxChange != null) {
	scopedAttributes.put("afterMaxChange", _afterMaxChange);
}

if (_afterMinChange != null) {
	scopedAttributes.put("afterMinChange", _afterMinChange);
}

if (_afterOrientationChange != null) {
	scopedAttributes.put("afterOrientationChange", _afterOrientationChange);
}

if (_afterRatioChange != null) {
	scopedAttributes.put("afterRatioChange", _afterRatioChange);
}

if (_afterStatusNodeChange != null) {
	scopedAttributes.put("afterStatusNodeChange", _afterStatusNodeChange);
}

if (_afterStepChange != null) {
	scopedAttributes.put("afterStepChange", _afterStepChange);
}

if (_afterTextNodeChange != null) {
	scopedAttributes.put("afterTextNodeChange", _afterTextNodeChange);
}

if (_afterValueChange != null) {
	scopedAttributes.put("afterValueChange", _afterValueChange);
}

if (_onDestroy != null) {
	scopedAttributes.put("onDestroy", _onDestroy);
}

if (_onDestroyedChange != null) {
	scopedAttributes.put("onDestroyedChange", _onDestroyedChange);
}

if (_onHeightChange != null) {
	scopedAttributes.put("onHeightChange", _onHeightChange);
}

if (_onInit != null) {
	scopedAttributes.put("onInit", _onInit);
}

if (_onInitializedChange != null) {
	scopedAttributes.put("onInitializedChange", _onInitializedChange);
}

if (_onLabelChange != null) {
	scopedAttributes.put("onLabelChange", _onLabelChange);
}

if (_onMaxChange != null) {
	scopedAttributes.put("onMaxChange", _onMaxChange);
}

if (_onMinChange != null) {
	scopedAttributes.put("onMinChange", _onMinChange);
}

if (_onOrientationChange != null) {
	scopedAttributes.put("onOrientationChange", _onOrientationChange);
}

if (_onRatioChange != null) {
	scopedAttributes.put("onRatioChange", _onRatioChange);
}

if (_onStatusNodeChange != null) {
	scopedAttributes.put("onStatusNodeChange", _onStatusNodeChange);
}

if (_onStepChange != null) {
	scopedAttributes.put("onStepChange", _onStepChange);
}

if (_onTextNodeChange != null) {
	scopedAttributes.put("onTextNodeChange", _onTextNodeChange);
}

if (_onValueChange != null) {
	scopedAttributes.put("onValueChange", _onValueChange);
}

%>

<alloy:createConfig
	excludeAttributes="var,javaScriptAttributes"
	tagPageContext="<%= pageContext %>"
	tagDynamicAttributes="<%= dynamicAttributes %>"
	tagScopedAttributes="<%= scopedAttributes %>"
	var="options"
/>