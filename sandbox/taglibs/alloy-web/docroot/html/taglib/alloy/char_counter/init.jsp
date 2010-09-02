<%@ include file="/html/taglib/alloy/init.jsp" %>

<%
java.lang.String NAMESPACE = "alloy:char-counter:";

Map<String, Object> dynamicAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:dynamicAttributes");
Map<String, Object> scopedAttributes = (Map<String, Object>)request.getAttribute("alloy:char-counter:scopedAttributes");

Map<String, Object> options = new HashMap<String, Object>();

options.putAll(scopedAttributes);
options.putAll(dynamicAttributes);

%>

<%@ include file="/html/taglib/alloy/init-alloy.jsp" %>

<%
java.lang.Object _counter = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:counter"));
java.lang.Boolean _destroyed = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:char-counter:destroyed"), false);
java.lang.Boolean _initialized = GetterUtil.getBoolean((java.lang.Boolean)request.getAttribute("alloy:char-counter:initialized"), false);
java.lang.Object _input = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:input"));
java.lang.Number _maxLength = GetterUtil.getNumber(String.valueOf(request.getAttribute("alloy:char-counter:maxLength")), 2147483647);
java.lang.Object _afterCounterChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:afterCounterChange"));
java.lang.Object _afterDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:afterDestroy"));
java.lang.Object _afterDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:afterDestroyedChange"));
java.lang.Object _afterInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:afterInit"));
java.lang.Object _afterInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:afterInitializedChange"));
java.lang.Object _afterInputChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:afterInputChange"));
java.lang.Object _afterMaxLengthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:afterMaxLengthChange"));
java.lang.Object _onCounterChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:onCounterChange"));
java.lang.Object _onDestroy = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:onDestroy"));
java.lang.Object _onDestroyedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:onDestroyedChange"));
java.lang.Object _onInit = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:onInit"));
java.lang.Object _onInitializedChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:onInitializedChange"));
java.lang.Object _onInputChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:onInputChange"));
java.lang.Object _onMaxLengthChange = GetterUtil.getObject((java.lang.Object)request.getAttribute("alloy:char-counter:onMaxLengthChange"));

_updateOptions(options, "counter", _counter);
_updateOptions(options, "destroyed", _destroyed);
_updateOptions(options, "initialized", _initialized);
_updateOptions(options, "input", _input);
_updateOptions(options, "maxLength", _maxLength);
_updateOptions(options, "afterCounterChange", _afterCounterChange);
_updateOptions(options, "afterDestroy", _afterDestroy);
_updateOptions(options, "afterDestroyedChange", _afterDestroyedChange);
_updateOptions(options, "afterInit", _afterInit);
_updateOptions(options, "afterInitializedChange", _afterInitializedChange);
_updateOptions(options, "afterInputChange", _afterInputChange);
_updateOptions(options, "afterMaxLengthChange", _afterMaxLengthChange);
_updateOptions(options, "onCounterChange", _onCounterChange);
_updateOptions(options, "onDestroy", _onDestroy);
_updateOptions(options, "onDestroyedChange", _onDestroyedChange);
_updateOptions(options, "onInit", _onInit);
_updateOptions(options, "onInitializedChange", _onInitializedChange);
_updateOptions(options, "onInputChange", _onInputChange);
_updateOptions(options, "onMaxLengthChange", _onMaxLengthChange);
%>

<%@ include file="init-ext.jsp" %>